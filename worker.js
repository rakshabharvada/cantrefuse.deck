/**
 * cantrefuse — Cloudflare Worker backend
 *
 * Routes:
 *   GET  /api/health        → liveness (frontend uses this to detect production mode)
 *   GET  /api/me            → { loggedIn, email, remaining, limit }
 *   GET  /api/auth/google   → redirect to Google consent
 *   GET  /api/auth/callback → OAuth callback; sets session cookie; stores email in KV
 *   GET  /api/logout        → clears session
 *   POST /api/ask           → quota check + proxy to OpenRouter decisions API
 *
 * Static files in /public are served by Workers Assets (see wrangler.jsonc);
 * only /api/* requests ever reach this script.
 *
 * Secrets (wrangler secret put <NAME>):
 *   OPENROUTER_API_KEY     server-side key used to serve verdicts to visitors
 *   GOOGLE_CLIENT_ID       OAuth client id
 *   GOOGLE_CLIENT_SECRET   OAuth client secret
 *   COOKIE_SECRET          any long random string, signs session cookies
 *
 * KV namespaces (wrangler.jsonc):
 *   ATTEMPTS  per-IP / per-user daily play counters (auto-expires)
 *   USERS     saved emails { email: { email, first_seen, last_login, logins } }
 */

const ANON_LIMIT = 5;        // free looks per IP per day
const USER_DAILY_LIMIT = 50; // looks per signed-in user per day
const SESSION_TTL_S = 60 * 60 * 24 * 30; // 30 days

// The github.io deployment is static-only and calls /api/* cross-origin.
// Origin is pinned (never "*") and credentials are never allowed, so the
// session cookie stays unreachable from other origins. The OpenRouter key
// never leaves this worker — CORS only lets the Pages frontend *use* the
// quota-capped backend, the same way workers.dev visitors already do.
const PAGES_ORIGIN = "https://rakshabharvada.github.io";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    if (request.method === "OPTIONS" && path.startsWith("/api/")) {
      return new Response(null, { status: 204, headers: corsHeaders(request) });
    }
    try {
      let res;
      if (path === "/api/health") res = json({ ok: true, anonLimit: ANON_LIMIT, userDailyLimit: USER_DAILY_LIMIT });
      else if (path === "/api/me") res = json(await me(request, env));
      else if (path === "/api/auth/google") res = googleRedirect(url, env);
      else if (path === "/api/auth/callback") res = await googleCallback(request, env, url);
      else if (path === "/api/logout") res = logout(url);
      else if (path === "/api/ask") res = await ask(request, env);
      else res = json({ error: "not found" }, 404);
      return await withCors(request, res);
    } catch (err) {
      return await withCors(request, json({ error: err.message || "internal error" }, 500));
    }
  },
};

/* ---------------- CORS (GitHub Pages frontend only) ---------------- */

function corsHeaders(request) {
  if ((request.headers.get("Origin") || "") !== PAGES_ORIGIN) return {};
  return {
    "Access-Control-Allow-Origin": PAGES_ORIGIN,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
  };
}

function withCors(request, res) {
  const cors = corsHeaders(request);
  if (!Object.keys(cors).length) return Promise.resolve(res);
  const headers = new Headers(res.headers);
  for (const [k, v] of Object.entries(cors)) headers.set(k, v);
  // rebuild from text — re-wrapping res.body's stream mangles non-200 responses
  const body = res.body === null ? null : res.text();
  return body.then((b) => new Response(b, { status: res.status, headers }));
}

/* ---------------- quota + proxy ---------------- */

async function ask(request, env) {
  if (request.method !== "POST") return json({ error: "POST only" }, 405);
  if (!env.ATTEMPTS || !env.USERS) return json({ error: "KV not configured — see DEPLOY.md" }, 500);
  if (!env.OPENROUTER_API_KEY) return json({ error: "server key not configured — run: wrangler secret put OPENROUTER_API_KEY" }, 500);

  const session = await getSession(request, env);
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const day = new Date().toISOString().slice(0, 10); // resets daily, UTC

  const key = session ? `u:${session.email}:${day}` : `ip:${ip}:${day}`;
  const limit = session ? USER_DAILY_LIMIT : ANON_LIMIT;
  const count = parseInt((await env.ATTEMPTS.get(key)) || "0", 10);

  if (count >= limit) {
    return json(
      { error: "free looks used", loginRequired: !session, remaining: 0, limit },
      401
    );
  }

  const upstream = await fetch("https://openrouter.ai/api/alpha/decisions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + env.OPENROUTER_API_KEY,
      "Content-Type": "application/json",
      "HTTP-Referer": url_origin(request),
      "X-Title": "Jev Cant Refuse",
    },
    body: await request.text(),
  });

  if (!upstream.ok) {
    // upstream problems are 502 — only THIS worker's 401 means "quota exhausted"
    const text = await upstream.text();
    let msg = "upstream error " + upstream.status;
    try {
      const j = JSON.parse(text);
      if (j.error) msg = typeof j.error === "string" ? j.error : (j.error.message || msg);
    } catch {}
    return json({ error: msg }, 502);
  }

  // only successful looks burn quota; TTL 48h so old counters clean themselves up
  const text = await upstream.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    return json({ error: "upstream sent invalid JSON" }, 502);
  }
  await env.ATTEMPTS.put(key, String(count + 1), { expirationTtl: 172800 });

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

/* ---------------- auth ---------------- */

async function me(request, env) {
  const session = await getSession(request, env);
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const day = new Date().toISOString().slice(0, 10);
  const key = session ? `u:${session.email}:${day}` : `ip:${ip}:${day}`;
  const limit = session ? USER_DAILY_LIMIT : ANON_LIMIT;
  const count = parseInt((await env.ATTEMPTS.get(key)) || "0", 10);
  return {
    loggedIn: !!session,
    email: session ? session.email : null,
    remaining: Math.max(0, limit - count),
    limit,
  };
}

function googleRedirect(url, env) {
  if (!env.GOOGLE_CLIENT_ID) {
    return json({ error: "Google login not configured — set GOOGLE_CLIENT_ID/SECRET (see DEPLOY.md)" }, 500);
  }
  const redirectUri = url_origin(url) + "/api/auth/callback";
  const auth = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  auth.searchParams.set("client_id", env.GOOGLE_CLIENT_ID);
  auth.searchParams.set("redirect_uri", redirectUri);
  auth.searchParams.set("response_type", "code");
  auth.searchParams.set("scope", "openid email");
  auth.searchParams.set("prompt", "select_account");
  return Response.redirect(auth.toString(), 302);
}

async function googleCallback(request, env, url) {
  if (!env.GOOGLE_CLIENT_ID || !env.GOOGLE_CLIENT_SECRET || !env.COOKIE_SECRET) {
    return json({ error: "Google login not configured — see DEPLOY.md" }, 500);
  }
  const code = url.searchParams.get("code");
  if (!code) return json({ error: "missing code" }, 400);

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: env.GOOGLE_CLIENT_ID,
      client_secret: env.GOOGLE_CLIENT_SECRET,
      redirect_uri: url_origin(request) + "/api/auth/callback",
      grant_type: "authorization_code",
    }),
  });
  if (!tokenRes.ok) return json({ error: "token exchange failed" }, 401);
  const tokens = await tokenRes.json();

  // id_token payload (obtained by direct TLS exchange with Google — aud checked below)
  const payloadB64 = tokens.id_token.split(".")[1];
  const claims = JSON.parse(new TextDecoder().decode(b64urlDecode(payloadB64)));
  if (claims.aud !== env.GOOGLE_CLIENT_ID) return json({ error: "bad audience" }, 401);
  if (claims.email_verified === false) return json({ error: "email not verified" }, 401);
  const email = String(claims.email || "").toLowerCase();
  if (!email) return json({ error: "no email in token" }, 401);

  // save the email for the future (KV)
  const prev = await env.USERS.get(email, "json");
  await env.USERS.put(email, JSON.stringify({
    email,
    first_seen: prev?.first_seen || new Date().toISOString(),
    last_login: new Date().toISOString(),
    logins: (prev?.logins || 0) + 1,
  }));

  const exp = Math.floor(Date.now() / 1000) + SESSION_TTL_S;
  const value = await signSession(env, JSON.stringify({ email, exp }));
  const secure = url.protocol === "https:" ? "; Secure" : "";
  const res = Response.redirect(url_origin(request) + "/", 302);
  const headers = new Headers(res.headers);
  headers.append("Set-Cookie",
    `jev_session=${value}; Path=/; HttpOnly; SameSite=Lax${secure}; Max-Age=${SESSION_TTL_S}`);
  return new Response(res.body, { status: res.status, headers });
}

function logout(url) {
  const secure = url.protocol === "https:" ? "; Secure" : "";
  return new Response(null, {
    status: 302,
    headers: {
      "Location": "/",
      "Set-Cookie": `jev_session=; Path=/; HttpOnly; SameSite=Lax${secure}; Max-Age=0`,
    },
  });
}

/* ---------------- session cookie (HMAC-signed) ---------------- */

async function signSession(env, payload) {
  const sig = await hmac(env.COOKIE_SECRET, payload);
  return b64urlEncode(payload) + "." + sig;
}

async function getSession(request, env) {
  if (!env.COOKIE_SECRET) return null;
  const cookie = request.headers.get("Cookie") || "";
  const m = cookie.match(/(?:^|;\s*)jev_session=([^;]+)/);
  if (!m) return null;
  const [payloadB64, sig] = m[1].split(".");
  if (!payloadB64 || !sig) return null;
  let payload;
  try { payload = new TextDecoder().decode(b64urlDecode(payloadB64)); } catch { return null; }
  const expected = await hmac(env.COOKIE_SECRET, payload);
  if (!timingSafeEqual(sig, expected)) return null;
  try {
    const data = JSON.parse(payload);
    if (!data.email || data.exp < Math.floor(Date.now() / 1000)) return null;
    return data;
  } catch { return null; }
}

async function hmac(secret, msg) {
  const key = await crypto.subtle.importKey(
    "raw", new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(msg));
  return [...new Uint8Array(sig)].map(b => b.toString(16).padStart(2, "0")).join("");
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/* ---------------- small utils ---------------- */

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

function url_origin(requestOrUrl) {
  const u = requestOrUrl instanceof URL
    ? requestOrUrl
    : (typeof requestOrUrl === "string" ? new URL(requestOrUrl) : new URL(requestOrUrl.url));
  return u.origin;
}

function b64urlEncode(str) {
  const bytes = new TextEncoder().encode(str);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function b64urlDecode(str) {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  while (str.length % 4) str += "=";
  const bin = atob(str);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}
