# JEV CAN'T REFUSE — the hard questions

A one-page viral site for the [founder tweet](https://x.com/CompleteSkeptic/status/2100974624368644404)
admitting that **Jev** (TypeSafe's "System One" decision model) ships with **no refusal layer**.

The joke: it can't refuse, so here's a deck of 70+ questions no other model will touch —
"Does God exist?", death penalty, billionaires, free will — each one a typed Jev payload.

## Run it

Static files, no build step:

```bash
python3 -m http.server 8471
# → http://localhost:8471
```

Or drag the folder onto Netlify / push to GitHub Pages / `vercel deploy`.

## What's inside

| File | Purpose |
|---|---|
| `index.html` | Hero, founder quote, how-it-works, deck grid, submit form |
| `styles.css` | Dark acid-green theme, cards, spotlight modal, ticker |
| `app.js` | 42 curated questions, payload builder, simulated verdicts, filters/search, lever (press `L`) |

## Features

- **Typed question cards** — every question is shaped into Jev's primitives: `Noul` (yes/no probability), `Choice` (one-of-N distribution), `Score` (rated scale)
- **{ } payload** — copies a ready-to-run request JSON (`model`, `state`, typed `questions` map) per card, or the whole deck via "Steal the whole deck"
- **▶ Ask Jev** — simulated typed verdict with millisecond-latency readout and calibrated distribution bars (clearly labeled SIMULATED — run the payload for the real answer)
- **🚋 Pull the lever** — random question spotlight (button or `L` key)
- **𝕏 share** — per-question intent links; submit form opens a pre-filled post aimed at the founder
- Category filters, live search, spice ratings, refusal counter (stays at 0)

## Go live with your OpenRouter key

Click **🔑 connect** in the topbar and paste an OpenRouter API key (stored only in your
browser's localStorage — never in the code, never sent anywhere but openrouter.ai).
Every **▶ Ask Jev** then POSTs to the real decisions API:

```
POST https://openrouter.ai/api/alpha/decisions
{ "model": "typesafe/jev-1.13", "state": "…", "questions": { "<id>": { "type": "noul"|"choice"|"score", "instructions": "…", "criteria": … } } }
```

- Response `answers.<id>` renders on the card: `noul` → P(yes) dial, `choice` → full
  probability distribution, `score` → level distribution (legend-aware).
- No key? Cards fall back to the hand-tuned simulations, clearly labeled `SIMULATED`.
- The `{ } payload` button copies the exact runnable request body.
- Tip: create a spend-capped key at openrouter.ai/settings/keys for this, not your main one.
- The model slug is editable in the 🔑 panel if TypeSafe ships a newer Jev.

## Notes

- Payload shapes mirror `DecisionsRequest` from
  [OpenRouterTeam/go-sdk](https://github.com/OpenRouterTeam/go-sdk) (`alpha.decisions`).
- Not affiliated with TypeSafe AI.
