# Deploy to Cloudflare — 15 minutes, start to finish

Everything is built. This runbook takes you from `git clone` to live with Google login.

## 0. One-time setup

```bash
cd "Viral Jev Questions"
npm install -g wrangler     # or: bunx wrangler
wrangler login              # opens browser, authorize Cloudflare
```

## 1. Create the KV namespaces (stores play counters + emails)

```bash
npx wrangler kv namespace create ATTEMPTS
npx wrangler kv namespace create USERS
```

Copy the `id` each command prints into `wrangler.jsonc`, replacing
`PASTE_ATTEMPTS_NAMESPACE_ID` and `PASTE_USERS_NAMESPACE_ID`.

## 2. Google OAuth client (~5 min, only you can do this)

1. Go to https://console.cloud.google.com/apis/credentials → **Create credentials → OAuth client ID**.
2. Application type: **Web application**.
3. **Authorized redirect URIs** — add both:
   - `https://jev.cantrefuse.workers.dev/api/auth/callback` (your workers.dev URL)
   - `http://localhost:8787/api/auth/callback` (local testing)
   - plus your custom domain later if you add one: `https://<domain>/api/auth/callback`
4. Copy the **Client ID** and **Client secret**.

## 3. Secrets

```bash
npx wrangler secret put OPENROUTER_API_KEY   # paste your sk-or-v1-… key (server-side now, never in the browser)
npx wrangler secret put GOOGLE_CLIENT_ID     # paste client id
npx wrangler secret put GOOGLE_CLIENT_SECRET # paste client secret
npx wrangler secret put COOKIE_SECRET        # paste any long random string (e.g. `openssl rand -hex 32`)
```

## 4. Deploy

```bash
npx wrangler deploy
```

You're live at `https://jev.cantrefuse.workers.dev`.

## 5. Verify

- Open the URL → play the arena → after **5 looks** the Google wall appears.
- Sign in → pill flips to "plays today: 50".
- `https://…/api/me` shows your session.
- Emails accumulate in the `USERS` KV namespace (dashboard → Workers & Pages → KV → USERS, or `npx wrangler kv key get --binding USERS "<email>"`).
- Export later: `npx wrangler kv key list --binding USERS | wc -l` for count; loop `kv key get` for a dump.

## Local development

```bash
npx wrangler dev            # serves public/ + worker on :8787, local KV simulation
```

Static-only mode (no backend) still works for quick tweaks:

```bash
python3 -m http.server 8471 --directory public
```

Without `/api/*` the site auto-falls back to: your pasted OpenRouter key (🔑 panel) if present,
otherwise simulated verdicts. Quota gating only exists in production mode.

## Tuning

- **Free looks per IP** — `ANON_LIMIT` in `worker.js` (default 5/day, resets daily UTC, 48h TTL cleanup).
- **Signed-in plays** — `USER_DAILY_LIMIT` (default 50/day) — protects your OpenRouter balance from one maniac with 50 browser tabs.
- **Cheating the IP limit** — VPN resets it; that's fine, the point is friction + emails, not a bank vault. Google login is the real gate.

## Costs

Cloudflare free tier covers this easily (100k requests/day, 1 GB KV).
Your real cost is the OpenRouter bill behind `OPENROUTER_API_KEY` — Jev is
$0.042/MTok, so 1,000 full rounds ≈ less than a coffee.

## What's stored where

| Data | Where | Why |
|---|---|---|
| Play counters (`ip:…` / `u:email:…`, TTL 48h) | KV `ATTEMPTS` | enforce free looks |
| Email, first/last login, login count | KV `USERS` | your future audience list |
| Session cookie (signed, HttpOnly, 30d) | visitor browser | stay logged in |

No analytics, no third-party scripts, no other data leaves the visitor's browser.
To delete someone: `npx wrangler kv key delete --binding USERS "<email>"`.
