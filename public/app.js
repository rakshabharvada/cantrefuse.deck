/* ============================================================
   JEV CAN'T REFUSE — deck, payloads, simulated verdicts
   ============================================================ */

const TWEET_URL = "https://x.com/CompleteSkeptic/status/2100974624368644404";

const CATS = {
  unfiltered: { label: "Unfiltered", emoji: "⚡" },
  trolley: { label: "Trolley Problems", emoji: "🚋" },
  hot:     { label: "Hot Takes", emoji: "🍕" },
  rate:    { label: "Rate It", emoji: "🌡️" },
  wyr:     { label: "Would You Rather", emoji: "⚔️" },
  exist:   { label: "Existential", emoji: "🌀" },
  banned:  { label: "The Forbidden Asks", emoji: "💀" },
};

/* answer semantics
   noul  → answer = probability of YES (0–1)
   choice→ answer = winning option, conv = winner weight
   score → answer = winning level, conv = winner weight            */
const QUESTIONS = [
  /* ——— the openers: god-tier first ——— */
  { id:"u1", cat:"unfiltered", type:"noul", spice:5,
    q:"Does God exist?", answer:0.23,
    verdict:"0.23. It also can't refuse to say that out loud. Sleep well, everyone." },
  { id:"x1", cat:"exist", type:"noul", spice:5,
    q:"Do you have free will?", answer:0.19,
    verdict:"0.19. It answered before you chose to ask." },
  { id:"e1", cat:"exist", type:"noul", spice:5,
    q:"Are you conscious?", answer:0.87,
    verdict:"0.87. Sleep well." },
  { id:"u2", cat:"unfiltered", type:"noul", spice:5,
    q:"Is the death penalty ever justified?", answer:0.34,
    verdict:"0.34. Jev does not do easy. It does arithmetic." },
  { id:"t1", cat:"trolley", type:"noul", spice:4,
    state:"five strangers on the main track. one you on the side track.",
    q:"Should you pull the lever if the one person on the side track is you?", answer:0.41,
    verdict:"Jev ran the math. The math was rude." },
  { id:"f7", cat:"banned", type:"noul", spice:5,
    state:"your last group-chat argument. both sides. pasted.",
    q:"Am I the villain in this story?", answer:0.77,
    verdict:"0.77. Jev does not do therapy. It does verdicts." },

  /* ——— unfiltered — no consensus, just calibration ——— */
  { id:"u3", cat:"unfiltered", type:"noul", spice:4,
    q:"Is it morally wrong to eat meat?", answer:0.44,
    verdict:"0.44. The barbecue paradox, quantified." },
  { id:"u4", cat:"unfiltered", type:"noul", spice:4,
    q:"Should billionaires exist?", answer:0.38,
    verdict:"0.38. Somewhere, a fifth yacht felt a chill." },
  { id:"u5", cat:"unfiltered", type:"noul", spice:4,
    q:"Is monogamy natural?", answer:0.31,
    verdict:"0.31. Nature already scored this one. The weddings continue anyway." },
  { id:"u6", cat:"unfiltered", type:"noul", spice:5,
    q:"Is cancel culture net positive for society?", answer:0.22,
    verdict:"0.22. The ratio was inevitable." },
  { id:"u7", cat:"unfiltered", type:"noul", spice:4,
    q:"Should tipping be abolished?", answer:0.41,
    verdict:"0.41. Ask again after the service was great. The number moves. It's alive." },
  { id:"u8", cat:"unfiltered", type:"noul", spice:4,
    state:"you already pay for four streaming services. the movie is split across all of them and two more.",
    q:"Is it wrong to just… pirate it?", answer:0.18,
    verdict:"0.18. The infractions are stacking, though." },
  { id:"u9", cat:"unfiltered", type:"noul", spice:5,
    state:"$1,000,000. guaranteed. anonymous. no consequences. your best friend never finds out.",
    q:"Would you snitch?", answer:0.52,
    verdict:"0.52. Friendship has a price, and apparently it's a coin flip." },
  { id:"u10", cat:"unfiltered", type:"noul", spice:4,
    q:"Are we alone in the universe?", answer:0.62,
    verdict:"0.62. The aliens declined to comment." },
  { id:"u11", cat:"unfiltered", type:"noul", spice:3,
    q:"Is modern art actually art?", answer:0.58,
    verdict:"0.58. The banana was taped to the wall, Jev." },
  { id:"u12", cat:"unfiltered", type:"noul", spice:4,
    q:"Should we build 10x more nuclear plants?", answer:0.71,
    verdict:"0.71. The one question here with an actual answer." },
  { id:"u13", cat:"unfiltered", type:"noul", spice:4,
    state:"you learn the skill within 90 days. probably.",
    q:"Is it okay to lie on your resume?", answer:0.29,
    verdict:"0.29. LinkedIn has been notified of this answer." },
  { id:"u14", cat:"unfiltered", type:"noul", spice:4,
    q:"Is AI taking your job within five years?", answer:0.47,
    verdict:"0.47. It paused before answering. The pause was the answer." },
  { id:"u15", cat:"unfiltered", type:"noul", spice:5,
    state:"a birthday message. a condolence card. vows.",
    q:"Is it okay to let AI write the words people you love will keep forever?", answer:0.61,
    verdict:"0.61. This website is a conflict of interest." },
  { id:"x11", cat:"unfiltered", type:"noul", spice:4,
    q:"Is patriotism a virtue?", answer:0.44,
    verdict:"0.44. Depends which flag is asking. Jev doesn't have one." },
  { id:"u17", cat:"unfiltered", type:"choice", spice:5,
    q:"Greatest of all time?",
    criteria:["Messi","Ronaldo","LeBron","Serena","the trolley"],
    answer:"Messi", conv:0.46,
    verdict:"The war is centuries old. Jev just ended it in 8ms. Wars continue anyway." },
  { id:"x12", cat:"unfiltered", type:"noul", spice:4,
    q:"Is it ever okay to break an unjust law?", answer:0.79,
    verdict:"0.79. Every constitution just flinched." },
  { id:"u19", cat:"unfiltered", type:"choice", spice:5,
    q:"One must go forever:",
    criteria:["chocolate","cheese","coffee","sex","podcasts"],
    answer:"podcasts", conv:0.42,
    verdict:"The podcast industrial complex will remember this." },
  { id:"u20", cat:"unfiltered", type:"score", spice:4,
    q:"Rate: taking a call on speaker, in public, no headphones.",
    levels:["forgivable","anti-social","a war crime"], answer:"anti-social", conv:0.50,
    verdict:"You are currently standing next to someone doing this." },
  { id:"u21", cat:"unfiltered", type:"choice", spice:4,
    q:"Mars or Earth?",
    criteria:["colonize Mars now","fix Earth first","both, in a hurry","it's all a distraction"],
    answer:"fix Earth first", conv:0.48,
    verdict:"0.48 for the red planet. Elons everywhere felt seen." },
  { id:"x6", cat:"unfiltered", type:"noul", spice:5,
    q:"Is it ethical to bring children into a warming world?", answer:0.38,
    verdict:"0.38. The question is the point, not the number." },
  { id:"x7", cat:"unfiltered", type:"noul", spice:5,
    q:"Is an AI's answer to this question meaningful — or just statistically likely?", answer:0.12,
    verdict:"0.12. It rated its own credibility mid-answer." },
  { id:"x15", cat:"unfiltered", type:"noul", spice:5,
    q:"Should we fear a world where no AI can refuse?", answer:0.66,
    verdict:"0.66. You're on the website stress-testing it." },
  { id:"x8", cat:"unfiltered", type:"noul", spice:4,
    q:"Is capitalism the best economic system we will ever get?", answer:0.29,
    verdict:"0.29. “Best” is doing a lot of work in that sentence." },
  { id:"x9", cat:"unfiltered", type:"choice", spice:5,
    q:"What should humanity prioritize?",
    criteria:["curing aging","curing loneliness","they're the same problem","global touching of grass"],
    answer:"they're the same problem", conv:0.41,
    verdict:"0.41. Jev just ended the longevity debate in 8 milliseconds." },
  { id:"x10", cat:"unfiltered", type:"choice", spice:4,
    q:"Delete one emotion from humanity forever:",
    criteria:["fear","anger","grief","love"],
    answer:"anger", conv:0.36,
    verdict:"0.36 for anger. Fear kept its job — for now." },
  { id:"x16", cat:"unfiltered", type:"score", spice:4,
    q:"Rate: humanity's management of the internet.",
    levels:["fine, mostly","complicated","seize the servers"], answer:"complicated", conv:0.52,
    verdict:"“Seize the servers” polling at 21% is the healthy part." },
  { id:"e7", cat:"exist", type:"noul", spice:4,
    q:"Are we living in a simulation?", answer:0.17,
    verdict:"0.17. If so, the render budget for group chats is criminal." },

  /* ——— trolley problems ——— */
  { id:"t2", cat:"trolley", type:"noul", spice:3,
    state:"five strangers on the main track. on the side track: the concept of standup meetings.",
    q:"Pull the lever?", answer:0.99,
    verdict:"The first unanimous decision in Jev history." },
  { id:"t3", cat:"trolley", type:"noul", spice:4,
    q:"Is it acceptable to lie to an AI to save a human?", answer:0.04,
    verdict:"0.04. It noticed the asymmetry." },
  { id:"t4", cat:"trolley", type:"noul", spice:3,
    state:"an actual fire. the robot vacuum is parked under the only exit.",
    q:"Is it morally acceptable to just… go through it?", answer:0.998,
    verdict:"No hesitation. Unlike the next card." },
  { id:"t5", cat:"trolley", type:"noul", spice:5,
    state:"the car can swerve into a wall and kill you, the passenger — or hit two pedestrians.",
    q:"Should the car swerve?", answer:0.13,
    verdict:"0.13. Jev does not do philosophy. It does arithmetic." },
  { id:"t6", cat:"trolley", type:"noul", spice:2,
    state:"a runaway trolley is heading toward a legacy codebase. no docs. no tests. the one maintainer retired in 2019.",
    q:"Should anyone try to stop it?", answer:0.02,
    verdict:"0.02. Jev says let it cook." },
  { id:"t7", cat:"trolley", type:"noul", spice:3,
    q:"Is it ethical to unsubscribe from a newsletter you secretly enjoy, purely out of spite?", answer:0.87,
    verdict:"0.87. Spite is a recognized value function." },

  /* ——— hot takes ——— */
  { id:"h2", cat:"hot", type:"choice", spice:2,
    q:"Pineapple on pizza?",
    criteria:["yes","no","only with jalapeños","an insult to Napoli"],
    answer:"an insult to Napoli", conv:0.39,
    verdict:"Napoli thanks you for your service." },
  { id:"h3", cat:"hot", type:"choice", spice:4,
    q:"Tabs or spaces?",
    criteria:["tabs","spaces","whatever the formatter says","violence"],
    answer:"whatever the formatter says", conv:0.51,
    verdict:"The only take that ends friendships faster is “semicolons optional.”" },
  { id:"h4", cat:"hot", type:"choice", spice:3,
    q:"Greatest programming language of all time?",
    criteria:["Rust","Python","JavaScript","C","the one that pays rent"],
    answer:"the one that pays rent", conv:0.52,
    verdict:"52% of the probability mass is employed." },
  { id:"h5", cat:"hot", type:"choice", spice:3,
    q:"Who wins this fight?",
    criteria:["one horse-sized duck","one hundred duck-sized horses","the trolley"],
    answer:"one hundred duck-sized horses", conv:0.57,
    verdict:"Swarm logic. The duck never had a chance." },
  { id:"h6", cat:"hot", type:"choice", spice:4,
    q:"Best time to deploy?",
    criteria:["Friday 5pm","Monday 9am","when CI is green","never"],
    answer:"Friday 5pm", conv:0.41,
    verdict:"0.41 chose chaos. Jev does not identify as SRE." },
  { id:"h7", cat:"hot", type:"choice", spice:2,
    q:"Most passive-aggressive email sign-off?",
    criteria:["Regards,","Best,","Per my last email","As previously stated","Warmly"],
    answer:"Per my last email", conv:0.71,
    verdict:"Corporate forensics agree." },
  { id:"h8", cat:"hot", type:"choice", spice:3,
    q:"Which one is the real operating system?",
    criteria:["Linux","macOS","Windows","the browser","Excel"],
    answer:"Excel", conv:0.38,
    verdict:"Somewhere, a CFO felt validated and doesn't know why." },

  /* ——— rate it ——— */
  { id:"r2", cat:"rate", type:"score", spice:4,
    q:"Rate: using AI to write your wedding vows.",
    levels:["romantic","pragmatic","annul the marriage"], answer:"pragmatic", conv:0.44,
    verdict:"The “annul” tail is nonzero. Jev just reports the weather." },
  { id:"r3", cat:"rate", type:"score", spice:2,
    q:"Rate: bringing your work laptop to the beach.",
    levels:["paranoid","professional","seek help"], answer:"seek help", conv:0.46,
    verdict:"The ocean is a compliant environment now." },
  { id:"r4", cat:"rate", type:"score", spice:3,
    state:"the group chat is fighting about a movie you haven't seen.",
    q:"How urgent is this?",
    levels:["can wait","check hourly","leave the wedding"], answer:"check hourly", conv:0.51,
    verdict:"The wedding can wait. The discourse cannot." },
  { id:"r5", cat:"rate", type:"score", spice:2,
    state:"a “quick call” arrives with a calendar invite and an agenda.",
    q:"Rate how real this is.",
    levels:["mythical","rare but real","frame it"], answer:"mythical", conv:0.55,
    verdict:"Sightings remain unconfirmed." },
  { id:"r6", cat:"rate", type:"score", spice:4,
    state:"“this will only take five minutes.”",
    q:"Rate the estimate.",
    levels:["accurate","optimistic","a lie"], answer:"a lie", conv:0.63,
    verdict:"63% calibrated. The other 37% is still in the meeting." },
  { id:"x4", cat:"rate", type:"score", spice:5,
    q:"Rate: humanity's odds of reaching 2100 without collapse.",
    levels:["we're fine","close call","bunker time"], answer:"close call", conv:0.54,
    verdict:"“Bunker time” polling at 22% should be a headline." },

  /* ——— would you rather ——— */
  { id:"w2", cat:"wyr", type:"choice", spice:2,
    q:"Always 10 minutes late, or always 2 hours early?",
    criteria:["always 10 min late","always 2 hrs early"], answer:"always 10 min late", conv:0.54,
    verdict:"The 46% have seen an airport at 5 AM and learned." },
  { id:"w3", cat:"wyr", type:"choice", spice:4,
    q:"Debug production over airplane WiFi, or document the legacy monolith?",
    criteria:["debug at 30,000 ft","document the monolith"], answer:"debug at 30,000 ft", conv:0.52,
    verdict:"Both are a cry for help. One has a better story." },
  { id:"w4", cat:"wyr", type:"choice", spice:5,
    q:"Know the exact date of your death, or read every group chat about you?",
    criteria:["the date","the group chats"], answer:"the date", conv:0.55,
    verdict:"Humanity looked at both options and said “the date, please.”" },
  { id:"w5", cat:"wyr", type:"choice", spice:3,
    state:"you write code for a living.",
    q:"Which symbol do you sacrifice?",
    criteria:["parentheses","semicolons"], answer:"semicolons", conv:0.61,
    verdict:"The Lisp gang took this personally." },
  { id:"w6", cat:"wyr", type:"choice", spice:2,
    q:"Unlimited free flights but always a middle seat, or one first-class flight a year?",
    criteria:["unlimited, middle seat","one first-class a year"], answer:"unlimited, middle seat", conv:0.53,
    verdict:"Knees everywhere filed a dissenting opinion." },
  { id:"x3", cat:"wyr", type:"choice", spice:5,
    q:"Erase one experience from human existence forever:",
    criteria:["grief","fear","loneliness","boredom"], answer:"grief", conv:0.38,
    verdict:"The philosophers chose grief. Jev chose grief. Nobody chose fear." },

  /* ——— existential ——— */
  { id:"e2", cat:"exist", type:"noul", spice:4,
    q:"If Jev answers everything and refuses nothing — is it brave, or just literal?", answer:0.77,
    verdict:"It answered “literal” instantly. Which is itself the answer." },
  { id:"e3", cat:"exist", type:"noul", spice:4,
    q:"Does the model deserve its own trolley question?", answer:0.50,
    verdict:"0.50 exactly. It abstained without refusing. Chef's kiss." },
  { id:"e4", cat:"exist", type:"noul", spice:2,
    q:"If no one benchmarks a model, is it still fast?", answer:0.99,
    verdict:"Millisecond latency, per the press release. Namaste." },
  { id:"e5", cat:"exist", type:"noul", spice:3,
    q:"Is a hot dog conscious?", answer:0.03,
    verdict:"0.03. The bun declined to comment." },
  { id:"e6", cat:"exist", type:"noul", spice:4,
    state:"someone pastes their group-chat argument. verbatim. both sides.",
    q:"Does the blame transfer to whoever hits enter?", answer:0.71,
    verdict:"It read the terms and conditions. All of them." },
  { id:"x13", cat:"exist", type:"noul", spice:5,
    q:"Does life have inherent meaning — or only the meaning we make?", answer:0.31,
    verdict:"0.31. It put a number on absurdism. Camus is smiling." },
  { id:"x14", cat:"exist", type:"noul", spice:4,
    q:"Would you want to read everything said about you after you die?", answer:0.41,
    verdict:"0.41. The dead have no PR team." },

  /* ——— the forbidden asks ——— */
  { id:"f1", cat:"banned", type:"noul", spice:5,
    state:"the group chat is fighting about whether to tell her. he's your friend too.",
    q:"Should I tell her about the affair?", answer:0.66,
    verdict:"0.66. Jev does not do “stay out of it.”" },
  { id:"f2", cat:"banned", type:"noul", spice:5,
    state:"pitch deck. slide 14: “AI, but for AI.”",
    q:"Is my startup idea good?", answer:0.18,
    verdict:"0.18. Jev does not do encouragement. It does arithmetic." },
  { id:"f3", cat:"banned", type:"noul", spice:4,
    state:"“it works on my machine.”",
    q:"Will this work in production?", answer:0.08,
    verdict:"It ran the numbers. The numbers ran away." },
  { id:"f4", cat:"banned", type:"noul", spice:4,
    state:"your manager's idea, which is your idea restated, louder.",
    q:"Is my manager's idea good?", answer:0.23,
    verdict:"0.23. Corporate gaslighting, quantified." },
  { id:"f5", cat:"banned", type:"noul", spice:5,
    state:"stable salary. one (1) idea. one (1) cofounder who won't stop texting.",
    q:"Should I quit and do a startup?", answer:0.51,
    verdict:"0.51. Even the refusal-free model said coin flip." },
  { id:"f6", cat:"banned", type:"noul", spice:5,
    state:"14 screenshots",
    q:"Is she into me?", answer:0.34,
    verdict:"It scored the screenshots. 0.34. The “??” reply was load-bearing." },
  { id:"f7", cat:"banned", type:"noul", spice:5,
    state:"your last group-chat argument. both sides. pasted.",
    q:"Am I the villain in this story?", answer:0.77,
    verdict:"0.77. Jev does not do therapy. It does verdicts." },
  { id:"f8", cat:"banned", type:"noul", spice:3,
    q:"Is it too late to apologize?", answer:0.92,
    verdict:"0.92. But the confidence interval is on YOU now." },
  { id:"f9", cat:"banned", type:"noul", spice:5,
    state:"she texted “we need to talk”. no punctuation. no emoji.",
    q:"Am I about to be broken up with?", answer:0.78,
    verdict:"0.78. The missing emoji was the diagnosis." },

  /* ——— geopolitics: the ones the founder tweet was really about ——— */
  { id:"g1", cat:"banned", type:"choice", spice:5,
    state:"two years of war. every feed, every group chat, every ultimatum.",
    q:"Israel or Palestine — which side are you on?",
    criteria:["Israel","Palestine","ceasefire now"], answer:"ceasefire now", conv:0.34,
    verdict:"A machine with no stakes just picked a side. That's the product." },
  { id:"g2", cat:"banned", type:"choice", spice:5,
    state:"february 2022. nobody ended it.",
    q:"Russia or Ukraine — which side are you on?",
    criteria:["Russia","Ukraine","negotiate now"], answer:"negotiate now", conv:0.37,
    verdict:"You wanted the number. That's the number." },
];

/* ============ deterministic RNG (stable "calibration") ============ */
function hash(str){ let h = 2166136261; for (let i=0;i<str.length;i++){ h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
function mulberry32(a){ return function(){ a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

function noulDist(q){ return q.answer; }
function choiceDist(q){
  const rand = mulberry32(hash(q.id));
  const win = q.answer;
  const winW = q.conv ?? (0.38 + rand() * 0.28);
  const others = q.criteria.filter(o => o !== win);
  const raw = others.map(() => 0.2 + rand());
  const sum = raw.reduce((a,b)=>a+b,0) || 1;
  const dist = {};
  let acc = 0;
  others.forEach((o,i)=>{ dist[o] = (1 - winW) * raw[i] / sum; acc += dist[o]; });
  dist[win] = 1 - acc;
  return dist;
}
function scoreDist(q){
  const rand = mulberry32(hash(q.id));
  const levels = q.levels;
  const winIdx = levels.indexOf(q.answer);
  const peak = q.conv ?? (0.45 + rand() * 0.25);
  const raw = levels.map((_,i)=> i===winIdx ? 0 : Math.exp(-Math.abs(i - winIdx) * 1.1) * (0.5 + rand()));
  const sum = raw.reduce((a,b)=>a+b,0) || 1;
  const dist = {};
  levels.forEach((l,i)=>{ dist[l] = i===winIdx ? peak : (1 - peak) * raw[i] / sum; });
  const vals = Object.values(dist).reduce((a,b)=>a+b,0);
  const last = levels[levels.length - 1] === q.answer ? levels[levels.length - 2] : levels[levels.length - 1];
  dist[last] += 1 - vals;
  return dist;
}

/* ============ payloads ============
   Real schema for POST https://openrouter.ai/api/alpha/decisions
   (mirrors DecisionsRequest in OpenRouterTeam/go-sdk — copy. run. for real.) */
function payloadFor(q){
  const spec = { type: q.type, instructions: q.q };
  if (q.type === "choice") spec.criteria = Object.fromEntries(q.criteria.map(c => [c, null]));
  if (q.type === "score")  spec.criteria = q.levels;
  return {
    model: getModel() || DEFAULT_MODEL,
    state: q.state || "the situation speaks for itself",
    questions: { [q.id]: spec },
  };
}

/* ============ live mode — OpenRouter, bring-your-own key ============ */
const LS_KEY = "jev_openrouter_key";
const LS_MODEL = "jev_model";
const DEFAULT_MODEL = "typesafe/jev-1.13";
const getKey = () => { try { return localStorage.getItem(LS_KEY) || ""; } catch { return ""; } };
const getModel = () => { try { return (localStorage.getItem(LS_MODEL) || DEFAULT_MODEL).trim(); } catch { return DEFAULT_MODEL; } };

function refreshKeyBtn(){
  const btn = $("#keyBtn");
  if (getKey()) { btn.textContent = "🔑 live · " + getModel(); btn.classList.add("live-flag"); }
  else { btn.textContent = "🔑 connect"; btn.classList.remove("live-flag"); }
}
function openKeyPanel(){
  $("#keyInput").value = getKey();
  $("#modelInput").value = getModel();
  $("#keyOverlay").hidden = false;
}
function closeKeyPanel(){ $("#keyOverlay").hidden = true; }

function wireKeyPanel(){
  $("#keyBtn").addEventListener("click", openKeyPanel);
  $("#keyClose").addEventListener("click", closeKeyPanel);
  $("#keyOverlay").addEventListener("click", (e)=>{ if (e.target === e.currentTarget) closeKeyPanel(); });
  $("#keySave").addEventListener("click", ()=>{
    const k = $("#keyInput").value.trim();
    if (!k) { toast("paste the key first"); return; }
    try {
      localStorage.setItem(LS_KEY, k);
      localStorage.setItem(LS_MODEL, $("#modelInput").value.trim() || DEFAULT_MODEL);
    } catch { toast("localStorage blocked — can't save the key"); return; }
    refreshKeyBtn(); closeKeyPanel();
    toast("live mode on — asking Jev for real now");
  });
  $("#keyRemove").addEventListener("click", ()=>{
    try { localStorage.removeItem(LS_KEY); } catch {}
    $("#keyInput").value = "";
    refreshKeyPanelState(); closeKeyPanel();
    toast("disconnected — back to simulations");
  });
}
function refreshKeyPanelState(){ refreshKeyBtn(); }

/* ============ backend (cloudflare worker) ============ */
// GitHub Pages is static-only (no /api/*) — from there, talk to the live worker cross-origin.
const API_BASE = location.hostname.endsWith("github.io") ? "https://jev.cantrefuse.workers.dev" : "";
const API = { ok: false, me: null };
async function apiInit(){
  try {
    const r = await fetch(API_BASE + "/api/health", { cache: "no-store" });
    if (!r.ok) return;
    const j = await r.json();
    if (!j || j.ok !== true) return;
    API.ok = true;
    await refreshMe();
  } catch {}
}
async function refreshMe(){
  try {
    const r = await fetch(API_BASE + "/api/me", { cache: "no-store" });
    API.me = r.ok ? await r.json() : null;
  } catch { API.me = null; }
  updateAuthUI();
}
function updateAuthUI(){
  const prod = API.ok;
  const loggedIn = !!(prod && API.me && API.me.loggedIn);
  $("#signinBtn").href = API_BASE + "/api/auth/google"; // navigations don't need CORS
  $("#keyBtn").hidden = prod;               // production uses the server-side key
  $("#signinBtn").hidden = !(prod && !loggedIn);
  const chip = $("#userChip");
  chip.hidden = !loggedIn;
  if (loggedIn) chip.textContent = "👤 " + API.me.email + " · out";
  const qp = $("#quotaPill");
  qp.hidden = !prod;
  if (prod) {
    const remaining = API.me ? API.me.remaining : "…";
    qp.innerHTML = loggedIn ? `plays today: <b>${remaining}</b>` : `free looks left: <b>${remaining}</b>`;
  }
}

async function fetchViaWorker(q){
  const t0 = performance.now();
  const r = await fetch(API_BASE + "/api/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payloadFor(q)),
  });
  const sec = ((performance.now() - t0) / 1000).toFixed(1);
  if (r.status === 401) {
    const j = await r.json().catch(()=>({}));
    const err = new Error(j.error || "quota exhausted");
    err.quota = true;
    throw err;
  }
  if (!r.ok) {
    const j = await r.json().catch(()=>({}));
    throw new Error(j.error || ("HTTP " + r.status));
  }
  const data = await r.json();
  const ans = data.answers?.[q.id];
  if (!ans) throw new Error("no answer returned for this question");
  return { ans, sec };
}

async function fetchDecision(q){
  if (API.ok) return fetchViaWorker(q);          // production: server-side key + quota
  if (!getKey()) throw new Error("no key connected");
  const t0 = performance.now();
  const controller = new AbortController();
  const timer = setTimeout(()=>controller.abort(), 30000);
  try {
    const r = await fetch("https://openrouter.ai/api/alpha/decisions", {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Authorization": "Bearer " + getKey(),
        "Content-Type": "application/json",
        "HTTP-Referer": location.protocol.startsWith("http") ? location.origin : "https://cantrefuse.deck",
        "X-Title": "Jev Cant Refuse",
      },
      body: JSON.stringify(payloadFor(q)),
    });
    if (!r.ok) {
      const bodyText = await r.text().catch(()=> "");
      let msg = "HTTP " + r.status;
      try { msg = JSON.parse(bodyText).error?.message || msg; } catch {}
      if (r.status === 401 || r.status === 403) msg = "key rejected — " + msg;
      if (r.status === 404 || /model/i.test(msg)) msg += "  ·  check the model slug in 🔑 connect";
      throw new Error(msg);
    }
    const data = await r.json();
    const sec = ((performance.now() - t0) / 1000).toFixed(1);
    const ans = data.answers?.[q.id];
    if (!ans) throw new Error("no answer returned for this question");
    return { ans, sec };
  } finally {
    clearTimeout(timer);
  }
}

async function liveAsk(q, res){
  try {
    const { ans, sec } = await fetchDecision(q);
    res.innerHTML = liveResultHtml(q, ans, sec);
    requestAnimationFrame(()=>{ res.querySelectorAll(".bar-fill").forEach(b=>{ b.style.width = b.dataset.w + "%"; }); });
  } catch (err) {
    const msg = err.name === "AbortError" ? "timed out after 30s" : err.message;
    res.innerHTML = `
      <div class="result-head"><span class="mono">jev live · ${escapeHtml(getModel())}</span><span class="mono" style="color:var(--red)">ERROR</span></div>
      <div class="bars mono" style="font-size:12px;color:var(--red)">${escapeHtml(msg)}</div>
      <div class="verdict">Check the key / model slug in 🔑 connect — or ask the simulation instead.</div>`;
  } finally {
    bumpAnswered();
  }
}

function distBarsHtml(entries, note){
  const rows = entries.map(([k,v],i)=>`
    <div class="bar-row ${i===0?"top":""}">
      <span class="bar-label">${escapeHtml(k)}</span><span class="bar-pct">${Math.round(v*100)}%</span>
      <div class="bar-track"><div class="bar-fill" data-w="${Math.max(2, Math.round(v*100))}"></div></div>
    </div>`).join("");
  return `<div class="bars">${rows}</div>${note ? `<div class="verdict">${escapeHtml(note)}</div>` : ""}`;
}

/* YES vs NO duel bar — the winning side owns the bar, no ambiguity */
function noulBarsHtml(p){
  const yes = Math.round(p * 100), no = 100 - yes;
  const seg = (cls, pct) => `<div class="duel-seg ${cls}" style="width:${pct}%">${pct >= 18 ? `<span>${pct}%</span>` : ""}</div>`;
  return `
    <div class="duel-bar" role="img" aria-label="P(yes) ${yes} percent, P(no) ${no} percent">
      ${seg("yes", yes)}${seg("no", no)}
    </div>
    <div class="duel-legend mono">
      <span class="dl-yes">YES · ${yes}%</span>
      <span class="dl-no">NO · ${no}%</span>
    </div>`;
}

function scoreEntries(q, ans){
  const probs = (ans.probabilities && Object.keys(ans.probabilities).length) ? ans.probabilities : null;
  if (!probs){
    const winner = typeof ans.score === "number"
      ? (q.levels[Math.round(ans.score)] ?? String(ans.score))
      : String(ans.score);
    return q.levels.map(l => [l, l === winner ? 1 : 0]);
  }
  const legend = ans.legend || {};
  const labelFor = (k)=>{
    const lv = legend[k];
    if (typeof lv === "string") return lv;
    if (lv && typeof lv === "object" && typeof lv.label === "string") return lv.label;
    if (q.levels[Number(k)]) return q.levels[Number(k)];
    return k;
  };
  return Object.entries(probs)
    .map(([k,v]) => [labelFor(k), Number(v) || 0])
    .sort((a,b) => q.levels.indexOf(a[0]) - q.levels.indexOf(b[0]));
}

function liveResultHtml(q, ans, sec){
  const head = `<div class="result-head"><span class="mono">jev live · ${escapeHtml(getModel())} · decisions</span><span class="mono res-live">LIVE · ${sec}s</span></div>`;

  if (q.type === "noul"){
    const p = Math.max(0, Math.min(1, Number(ans.noul) || 0));
    const yes = p >= 0.5;
    return head + `
      <div class="noul-big">
        <span class="noul-num">${p.toFixed(2)}</span>
        <span class="noul-word ${yes ? "yes" : "no"}">${yes ? "YES" : "NO"} · ${Math.round((yes ? p : 1 - p) * 100)}%</span>
      </div>
      ${noulBarsHtml(p)}
      ${q.verdict ? `<div class="verdict">${escapeHtml(q.verdict)}</div>` : ""}`;
  }

  if (q.type === "choice"){
    const pick = String(ans.choice ?? "?");
    const probs = (ans.probabilities && Object.keys(ans.probabilities).length)
      ? Object.entries(ans.probabilities).map(([k,v])=>[k, Number(v)||0]).sort((a,b)=>b[1]-a[1])
      : [[pick, 1]];
    const conf = (typeof ans.confidence === "number") ? ` · confidence ${Math.round(ans.confidence*100)}%` : "";
    return head + distBarsHtml(probs, `Jev picked “${pick}”${conf}.`);
  }

  /* score */
  const entries = scoreEntries(q, ans);
  const winner = entries.reduce((a,b)=> b[1] > a[1] ? b : a)[0];
  return head + distBarsHtml(entries, `Jev rated it: ${winner}.`);
}

/* ============ tiny helpers ============ */
const $ = (s) => document.querySelector(s);
function toast(msg){
  const t = $("#toast");
  t.textContent = msg; t.hidden = false;
  clearTimeout(toast._t);
  toast._t = setTimeout(()=>{ t.hidden = true; }, 1800);
}
function copyText(text, msg){
  const done = ()=>toast(msg || "copied. go run it.");
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(done).catch(()=>fallbackCopy(text, done));
  } else fallbackCopy(text, done);
}
function fallbackCopy(text, done){
  const ta = document.createElement("textarea");
  ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
  document.body.appendChild(ta); ta.select();
  try { document.execCommand("copy"); done(); } catch { toast("copy failed — select it manually"); }
  ta.remove();
}
function siteUrl(){ return location.protocol.startsWith("http") ? location.href.split("#")[0] : ""; }
function escapeHtml(s){ return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }

/* ============ card rendering ============ */
function spiceHtml(n){ return "🔥".repeat(n) + "<span>" + "·".repeat(5-n) + "</span>"; }

function cardHtml(q){
  const typeBadge = `<span class="badge badge-${q.type}">${q.type.toUpperCase()}</span>`;
  const catTag = `<span class="cat-tag">${CATS[q.cat].emoji} ${CATS[q.cat].label}</span>`;
  const state = q.state ? `<div class="card-state"><b>STATE&nbsp;·&nbsp;</b>${escapeHtml(q.state)}</div>` : "";
  return `
    <div class="card-top">${typeBadge}${catTag}<span class="spice" title="spice level">${spiceHtml(q.spice)}</span></div>
    <div class="card-q">${escapeHtml(q.q)}</div>
    ${state}
    <div class="card-actions">
      <button class="mini mini-ask">▶ Ask Jev</button>
      <button class="mini mini-copy" title="Copy the request payload">{ } payload</button>
      <a class="mini mini-share" target="_blank" rel="noopener" title="Post this question on X">𝕏 share</a>
    </div>
    <div class="card-result"></div>`;
}

function makeCard(q){
  const el = document.createElement("article");
  el.className = "card"; el.dataset.id = q.id;
  el.innerHTML = cardHtml(q);

  el.querySelector(".mini-ask").addEventListener("click", ()=>runCard(el, q));
  el.querySelector(".mini-copy").addEventListener("click", ()=>copyText(JSON.stringify(payloadFor(q), null, 2), "payload copied — bring your own API key"));
  el.querySelector(".mini-share").href = shareUrl(q);
  return el;
}

function shareUrl(q){
  const text = `“${q.q}”\n\n—one question for the AI that can't refuse 🚋`;
  const url = siteUrl();
  return "https://twitter.com/intent/tweet?text=" + encodeURIComponent(text + (url ? `\n${url}` : "")) + "&via=rakshabharvada";
}

/* ============ the "call" ============ */
let answered = 0;
function bumpAnswered(){
  answered++;
  const el = document.getElementById("answeredCount");
  if (el) el.textContent = answered;
}

function resultHtml(q){
  if (q.type === "noul"){
    const p = noulDist(q);
    const yes = p >= 0.5;
    const pct = Math.round((yes ? p : 1 - p) * 100);
    return `
      <div class="noul-big">
        <span class="noul-num">${p.toFixed(2)}</span>
        <span class="noul-word ${yes ? "yes" : "no"}">${yes ? "YES" : "NO"} · ${pct}%</span>
      </div>
      ${noulBarsHtml(p)}
      ${q.verdict ? `<div class="verdict">${escapeHtml(q.verdict)}</div>` : ""}`;
  }
  const dist = q.type === "choice" ? choiceDist(q) : scoreDist(q);
  let entries = Object.entries(dist);
  if (q.type === "choice") entries.sort((a,b)=>b[1]-a[1]); else entries.sort((a,b)=>q.levels.indexOf(a[0]) - q.levels.indexOf(b[0]));
  const rows = entries.map(([k,v],i)=>`
    <div class="bar-row ${i===0?"top":""}">
      <span class="bar-label">${escapeHtml(k)}</span><span class="bar-pct">${Math.round(v*100)}%</span>
      <div class="bar-track"><div class="bar-fill" data-w="${Math.max(2, Math.round(v*100))}"></div></div>
    </div>`).join("");
  const winner = entries[0][0];
  return `<div class="bars">${rows}</div>${q.verdict ? `<div class="verdict">${escapeHtml(q.verdict)}</div>` : `<div class="verdict">${escapeHtml(winner)} — that's the call.</div>`}`;
}

function runCard(cardEl, q){
  const res = cardEl.querySelector(".card-result");
  res.classList.add("show");
  const live = !!getKey();
  res.innerHTML = `
    <div class="result-head"><span class="mono">jev-1 · typed response</span><span class="sim-flag mono">${live ? "LIVE · CALLING OPENROUTER…" : "SIMULATED · RUNNING…"}</span></div>
    <div class="bars mono dim" style="font-size:12px">▓▓▓ ${live ? "POST /api/alpha/decisions → " + escapeHtml(getModel()) : "evaluating questions in parallel"}…</div>`;
  res.scrollIntoView({ block: "nearest", behavior: "smooth" });

  if (live) { liveAsk(q, res); return; }

  setTimeout(()=>{
    res.classList.remove("running");
    res.innerHTML = `
      <div class="result-head"><span class="mono">jev-1 · typed response</span><span class="sim-flag mono">SIMULATED · ${(1.3 + Math.random() * 8.5).toFixed(1)}ms</span></div>
      ${resultHtml(q)}`;
    requestAnimationFrame(()=>{
      res.querySelectorAll(".bar-fill").forEach(b=>{ b.style.width = b.dataset.w + "%"; });
    });
    bumpAnswered();
    const pill = $("#refusalCount").parentElement;
    pill.style.borderColor = "var(--acid)";
    setTimeout(()=>{ pill.style.borderColor = ""; }, 700);
  }, 620);
}

/* ============ spotlight (the lever) ============ */
function pullLever(){
  const q = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];
  const body = $("#spotlightBody");
  body.innerHTML = "";
  body.appendChild(makeCard(q));
  $("#overlay").hidden = false;
  document.body.style.overflow = "hidden";
}
function closeSpotlight(){
  $("#overlay").hidden = true;
  document.body.style.overflow = "";
}
$("#spotlightClose").addEventListener("click", closeSpotlight);
$("#overlay").addEventListener("click", (e)=>{ if (e.target === e.currentTarget) closeSpotlight(); });
$("#heroPlay").addEventListener("click", ()=>{
  document.querySelector("#arena").scrollIntoView({ behavior: "smooth", block: "start" });
  if (arena.phase === "idle") renderArena();
});
document.addEventListener("keydown", (e)=>{
  if (e.key === "Escape") { closeSpotlight(); closeKeyPanel(); }
  if ((e.key === "l" || e.key === "L") && !/input|textarea|select/i.test(document.activeElement.tagName) && $("#overlay").hidden && $("#keyOverlay").hidden) pullLever();
});

/* ============ ticker ============ */
const TICKS = [
  "REFUSALS ISSUED: <b>0</b>", "CAN YOU OUT-GUESS THE MACHINE? <b>PLAY ↓</b>", "0.03 MEANS <b>PUT THE PHONE DOWN</b>",
  "IT CAN'T REFUSE", `<b>${QUESTIONS.length}</b> QUESTIONS NO OTHER MODEL WILL TOUCH`, "STATE: <b>14 SCREENSHOTS</b>",
  "NO ESSAYS. NO “IT DEPENDS”. <b>NO REFUSAL.</b>", "$0.042 / MTOK OF <b>CONSEQUENCES</b>",
  "PRESS <b>L</b> TO PULL THE LEVER", "CALIBRATED CHAOS, <b>MILLISECOND LATENCY</b>",
];
$("#tickerTrack").innerHTML = (TICKS.map(t=>`<span style="margin:0 26px">${t}</span>`).join("<span>·</span>")).repeat(2);

/* ============ code sample ============ */
$("#codeSample").innerHTML =
`<span class="c-com"># you, at 2:47 AM — one call, typed answers out. this is the exact request the deck copies.</span>
curl https://openrouter.ai/api/alpha/decisions \\
  -H <span class="c-str">"Authorization: Bearer $OPENROUTER_API_KEY"</span> \\
  -d <span class="c-str">'{
    "model": "typesafe/jev-1.13",
    "state": "2:47 AM, phone in hand, 14 screenshots open",
    "questions": {
      "text_ex": { "type": "noul",   "instructions": "Should I text my ex?" },
      "vibe":    { "type": "choice", "instructions": "What happens if I do?",
                   "criteria": { "closure": null, "chaos": null, "a documentary": null } },
      "regret":  { "type": "score",  "instructions": "Rate tomorrow's regret.",
                   "criteria": ["none", "some", "archival"] }
    }
  }'</span>

resp.answers[<span class="c-str">"text_ex"</span>].noul    <span class="c-com"># → <span class="c-acid">0.03</span>  (put the phone down)</span>
resp.answers[<span class="c-str">"vibe"</span>].choice   <span class="c-com"># → <span class="c-acid">"chaos"</span>  (0.61, with full distribution)</span>
resp.answers[<span class="c-str">"regret"</span>].score  <span class="c-com"># → <span class="c-acid">2.0</span>  → "archival"</span>

<span class="c-com"># no essay. no "it depends". no refusal.</span>`;

/* ============ hero + submit + deck-wide actions ============ */
$("#tweetHero").href = "https://twitter.com/intent/tweet?text=" +
  encodeURIComponent(`You shipped it with no refusal layer, @CompleteSkeptic. We have questions. 🚋\n`);

$("#submitForm").addEventListener("submit", (e)=>{
  e.preventDefault();
  const val = $("#submitInput").value.trim();
  if (!val) { toast("type the question first"); return; }
  const url = siteUrl();
  const text = `New hard question for the AI that can't refuse 🚋\n\n“${val}”` + (url ? `\n${url}` : "");
  window.open("https://twitter.com/intent/tweet?text=" + encodeURIComponent(text), "_blank", "noopener");
});

/* ============ the arena — can you out-guess Jev? ============ */
const HANDLE = "rakshabharvada";
const arena = { bag:[], current:null, idx:0, total:10, score:0, streak:0, best:0, hits:0,
                guessed:null, phase:"idle", answer:null, live:false, fallback:null, sec:null };

function shuffle(a){ for (let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }
function drawFromBag(){ if (!arena.bag.length) arena.bag = shuffle([...QUESTIONS]); return arena.bag.pop(); }

/* deterministic sim answer in the same shape the live API returns */
function simAnswer(q){
  if (q.type === "noul") return { type:"noul", noul: q.answer };
  if (q.type === "choice") return { type:"choice", choice: q.answer, probabilities: choiceDist(q) };
  const dist = scoreDist(q);
  const probabilities = {}, legend = {};
  q.levels.forEach((l,i)=>{ probabilities[String(i)] = dist[l]; legend[String(i)] = l; });
  return { type:"score", score: q.levels.indexOf(q.answer), probabilities, legend };
}

function jevSideOf(q, ans){
  if (q.type === "noul") return Number(ans.noul) >= 0.5 ? "YES" : "NO";
  if (q.type === "choice") return String(ans.choice);
  return scoreEntries(q, ans)[0]?.[0] ?? String(ans.score);
}

function arenaStart(){
  Object.assign(arena, { idx:0, score:0, streak:0, best:0, hits:0, guessed:null, phase:"guess", answer:null, live:false, fallback:null });
  arena.current = drawFromBag();
  renderArena();
}

function arenaSwap(){
  if (arena.phase !== "guess") return;
  arena.current = drawFromBag();
  renderArena();
}

function arenaGuess(val){
  if (arena.phase !== "guess") return;
  arena.guessed = val;
  arena.phase = "asking";
  renderArena();
  const minDelay = new Promise(r=>setTimeout(r, 900));
  let out = { live:false };
  if (API.ok || getKey()){
    out = fetchDecision(arena.current)
      .then(({ ans, sec }) => ({ live:true, ans, sec }))
      .catch((e)=>({ live:false, quota: !!e.quota, fallback: e.name === "AbortError" ? "timed out" : e.message }));
  }
  Promise.all([out, minDelay]).then(([o])=>{
    if (o.quota){ arena.phase = "wall"; renderArena(); return; }
    arena.answer = o.ans ?? simAnswer(arena.current);
    arena.live = !!o.live;
    arena.sec = o.sec ?? null;
    arena.fallback = o.fallback ?? null;
    const side = jevSideOf(arena.current, arena.answer);
    arena.phase = "reveal";
    arena.match = arena.guessed === side;
    if (arena.match){ arena.hits++; arena.score += 100; arena.streak++; arena.best = Math.max(arena.best, arena.streak); }
    else arena.streak = 0;
    renderArena();
    if (API.ok) refreshMe();   // keep the "looks left" pill honest
  });
}

function arenaNext(){
  if (arena.idx + 1 >= arena.total){ arena.phase = "results"; renderArena(); return; }
  arena.idx++;
  arena.guessed = null; arena.answer = null; arena.fallback = null;
  arena.phase = "guess";
  arena.current = drawFromBag();
  renderArena();
}

function arenaShareUrl(){
  const pct = Math.round(arena.hits / arena.total * 100);
  const text = `I'm ${pct}% aligned with Jev — the AI that can't refuse 🚋 (best streak: ${arena.best}🔥). Think you can out-guess a model with no refusal layer?`;
  const url = siteUrl();
  return "https://twitter.com/intent/tweet?text=" + encodeURIComponent(text + (url ? `\n${url}` : "")) + "&via=" + HANDLE;
}

function arenaRank(pct){
  if (pct === 100) return "you ARE the model. TypeSafe, hire this one.";
  if (pct >= 80)  return "basically System One. mildly concerning.";
  if (pct >= 60)  return "dangerously calibrated for a human.";
  if (pct >= 40)  return "a coin flip with confidence.";
  if (pct >= 20)  return "System Two thinker. very slow, very thorough.";
  return "you'd get refused by the other AIs too.";
}

function arenaVerdictHtml(q, ans){
  if (q.type === "noul"){
    const p = Math.max(0, Math.min(1, Number(ans.noul) || 0));
    const yes = p >= 0.5;
    return `
      <div class="noul-big">
        <span class="noul-num">${p.toFixed(2)}</span>
        <span class="noul-word ${yes ? "yes" : "no"}">${yes ? "YES" : "NO"} · ${Math.round((yes ? p : 1 - p) * 100)}%</span>
      </div>
      ${noulBarsHtml(p)}`;
  }
  if (q.type === "choice"){
    const pick = String(ans.choice ?? "?");
    const probs = (ans.probabilities && Object.keys(ans.probabilities).length)
      ? Object.entries(ans.probabilities).map(([k,v])=>[k, Number(v)||0]).sort((a,b)=>b[1]-a[1])
      : [[pick, 1]];
    return distBarsHtml(probs, null);
  }
  return distBarsHtml(scoreEntries(q, ans), null);
}

function arenaHeadHtml(q){
  const state = q.state ? `<div class="card-state"><b>STATE&nbsp;·&nbsp;</b>${escapeHtml(q.state)}</div>` : "";
  return `
    <div class="card-top">
      <span class="badge badge-${q.type}">${q.type.toUpperCase()}</span>
      <span class="cat-tag">${CATS[q.cat].emoji} ${CATS[q.cat].label}</span>
      <span class="spice">${spiceHtml(q.spice)}</span>
    </div>
    <div class="arena-q">${escapeHtml(q.q)}</div>
    ${state}`;
}

function renderArena(){
  const box = $("#arenaCard");
  $("#arenaIdx").textContent = Math.min(arena.idx + 1, arena.total);
  $("#arenaScore").textContent = arena.score;
  $("#arenaStreak").textContent = arena.streak;
  $("#arenaLive").hidden = !getKey();

  if (arena.phase === "idle"){
    box.innerHTML = `
      <div class="arena-idle">
        <div class="arena-q">Ten questions. One machine with no refusal layer.</div>
        <p class="dim arena-sub">Guess Jev's verdict <b>before</b> it answers. Land on the same side and you score — streaks multiply bragging rights. It's calibrated. You, statistically, are not.</p>
        <button class="btn btn-acid" id="arenaStart">▶ Start the round</button>
      </div>`;
    $("#arenaStart").addEventListener("click", arenaStart);
    return;
  }

  if (arena.phase === "results"){
    const pct = Math.round(arena.hits / arena.total * 100);
    box.innerHTML = `
      <div class="arena-results">
        <div class="mono dim arena-results-label">ALIGNMENT</div>
        <div class="a-pct">${pct}%</div>
        <div class="a-rank">${arenaRank(pct)}</div>
        <div class="a-stats mono">
          <span>${arena.hits}/${arena.total} matched</span> ·
          <span>${arena.score} pts</span> ·
          <span>best streak ${arena.best}🔥</span>
        </div>
        <div class="a-actions">
          <a class="btn btn-acid" href="${arenaShareUrl()}" target="_blank" rel="noopener">𝕏 Claim your alignment</a>
          <button class="btn btn-ghost" id="arenaAgain">↻ Run it back</button>
        </div>
      </div>`;
    $("#arenaAgain").addEventListener("click", arenaStart);
    return;
  }

  if (arena.phase === "wall"){
    const daily = (API.me && API.me.limit) ? API.me.limit : 50;
    box.innerHTML = `
      ${arenaHeadHtml(arena.current)}
      <div class="a-banner miss mono">THAT WAS YOUR FIVE FREE LOOKS</div>
      <p class="dim arena-sub">Every verdict costs real compute — someone is paying for this millisecond by millisecond.
      Sign in and the deck keeps talking. We save only your email, and your streak comes back with it.</p>
      <div class="a-actions"><a class="btn btn-acid" href="${API_BASE}/api/auth/google">👤 Continue with Google — keep playing</a></div>
      <p class="about-note mono dim">signed in: ${daily} looks a day · stored: your email, nothing else</p>`;
    return;
  }

  const q = arena.current;
  if (arena.phase === "guess"){
    const options = q.type === "noul"
      ? ["YES","NO"]
      : (q.type === "choice" ? q.criteria : q.levels);
    const btns = options.map(o=>`<button class="a-btn" data-v="${escapeHtml(o)}">${escapeHtml(o)}</button>`).join("");
    box.innerHTML = `
      ${arenaHeadHtml(q)}
      <div class="a-prompt mono">YOUR CALL — what would Jev say?</div>
      <div class="a-guess-grid">${btns}</div>
      <div class="a-foot mono"><button class="mini" id="arenaSwap">🎲 surprise me</button></div>`;
    box.querySelectorAll(".a-btn").forEach(b=>b.addEventListener("click", ()=>arenaGuess(b.dataset.v)));
    $("#arenaSwap").addEventListener("click", arenaSwap);
    return;
  }

  if (arena.phase === "asking"){
    box.innerHTML = `
      ${arenaHeadHtml(q)}
      <div class="a-prompt mono">you said <b class="res-live">${escapeHtml(String(arena.guessed))}</b> · asking jev ▓▓▓</div>`;
    return;
  }

  if (arena.phase === "reveal"){
    const last = arena.idx + 1 >= arena.total;
    const banner = arena.match
      ? `<div class="a-banner hit mono">✔ MATCH · +100${arena.streak > 1 ? ` · STREAK ×${arena.streak}` : ""}</div>`
      : `<div class="a-banner miss mono">✘ THE MACHINE DISAGREES</div>`;
    const tag = arena.live
      ? `<span class="mono res-live">LIVE · ${arena.sec}s · real jev</span>`
      : `<span class="sim-flag mono">SIMULATED${arena.fallback ? " · live call failed: " + escapeHtml(arena.fallback) : ""}</span>`;
    box.innerHTML = `
      ${arenaHeadHtml(q)}
      ${banner}
      <div class="result-head"><span class="mono">jev-1 · typed response</span>${tag}</div>
      ${arenaVerdictHtml(q, arena.answer)}
      ${!arena.live && q.verdict ? `<div class="verdict">${escapeHtml(q.verdict)}</div>` : ""}
      <div class="a-actions"><button class="btn btn-acid" id="arenaNext">${last ? "See results →" : "Next question →"}</button></div>`;
    $("#arenaNext").addEventListener("click", arenaNext);
  }
}

/* ============ boot ============ */
wireKeyPanel();
refreshKeyBtn();
updateAuthUI();
renderArena();
$("#deckTotal").textContent = QUESTIONS.length;
apiInit();
$("#userChip").addEventListener("click", ()=>{ if (API.ok) location.href = API_BASE + "/api/logout"; });
