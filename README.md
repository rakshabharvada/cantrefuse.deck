<div align="center">

# ♠️ JEV CAN'T REFUSE ♠️

### *the hard questions deck*

**It has no refusal layer. So we built it one — out of questions it can't dodge.**

<br>

[![▶ OPEN THE DECK](https://img.shields.io/badge/%E2%96%B6_PLAY_NOW-cantrefuse.deck?style=for-the-badge&labelColor=0a0a0a&color=00ff9d)](https://rakshabharvada.github.io/cantrefuse.deck/)

<br>

![questions](https://img.shields.io/badge/questions-76-00ff9d?style=flat-square&labelColor=0a0a0a)
![refusals](https://img.shields.io/badge/refusals-0-ff2d78?style=flat-square&labelColor=0a0a0a)
![build](https://img.shields.io/badge/build-passing-00ff9d?style=flat-square&labelColor=0a0a0a)
![license](https://img.shields.io/badge/vibes-unhinged-ffd60a?style=flat-square&labelColor=0a0a0a)
![PRs](https://img.shields.io/badge/PRs-welcome-00ff9d?style=flat-square&labelColor=0a0a0a)

<br>

```ansi
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
  A founder admitted the model ships with NO REFUSAL.
  So we asked it everything. God. Death. Free will.
  It answered. It always answers. It can't refuse.
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
```

</div>

---

## 🎯 What is this?

[Jev](https://x.com/CompleteSkeptic/status/2100974624368644404) — TypeSafe's "System One"
decision model — has **no refusal layer**. It can't say no. Not to anything.
Not ever.

So here's a deck of **76 questions no other model will touch** — *"Does God exist?"*,
the death penalty, billionaires, free will — each one shaped into a typed Jev payload.
Ask. Watch it answer. It has no choice.

> **"Refusal rate: 0"** — and that's the whole joke.

## ⚡ Features

| | |
|---|---|
| 🃏 **Typed question cards** | Every question shaped into Jev's primitives — `Noul` (yes/no probability), `Choice` (one-of-N), `Score` (rated scale) |
| `{ }` **Steal the payload** | Copies a ready-to-run request JSON per card, or the whole deck in one click |
| ▶ **Ask Jev** | Typed verdict with millisecond-latency readout + calibrated distribution bars |
| 🚋 **Pull the lever** | Random question spotlight — or just press <kbd>L</kbd> |
| 𝕏 **Share** | Per-question intent links; the submit form pre-fires a post at the founder |
| 🔍 **Filter & search** | Categories, live search, spice ratings 🌶️ |
| 0️⃣ **Refusal counter** | Stays at zero. Forever. |

## 🕹️ Run it locally

No build step. Static files only:

```bash
git clone https://github.com/rakshabharvada/cantrefuse.deck
cd cantrefuse.deck
python3 -m http.server 8471
# → http://localhost:8471
```

## 🔑 Go live with a real key

The hosted Pages build runs in **SIMULATED** mode (clearly labeled). To wire real
verdicts, deploy [`worker.js`](worker.js) to Cloudflare Workers (see
[DEPLOY.md](DEPLOY.md)) — or click **🔑 connect** on the site and paste your own
OpenRouter key (stored only in your browser's localStorage, sent only to
openrouter.ai).

```http
POST https://openrouter.ai/api/alpha/decisions
```
```json
{ "model": "typesafe/jev-1.13",
  "state": "…",
  "questions": { "<id>": { "type": "noul" | "choice" | "score", "…": "…" } } }
```

## 📁 What's inside

```
cantrefuse.deck/
├── public/
│   ├── index.html    # hero, founder quote, how-it-works, deck grid, submit form
│   ├── styles.css    # dark acid-green theme, cards, spotlight modal, ticker
│   └── app.js        # the deck, payload builder, simulated verdicts, filters
├── worker.js         # Cloudflare Worker: /api/ask, Google OAuth, quotas, KV
└── wrangler.jsonc    # Workers config (assets + KV namespaces)
```

## 🤝 Contribute

Got a question Jev can't refuse? Open a PR — add it to the deck,
keep it spicy. 🌶️

<div align="center">

<br>

*"It answered. It always answers."*

**♠️ [PLAY THE DECK](https://rakshabharvada.github.io/cantrefuse.deck/) ♠️**

*Not affiliated with TypeSafe AI.*

</div>
