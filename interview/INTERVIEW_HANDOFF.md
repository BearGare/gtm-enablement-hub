# Interview handoff — GTM Signal Hub

Checklist to run the hub yourself, share a screen recording, or walk someone through it live.

## Before you open the app

```bash
git clone https://github.com/BearGare/gtm-signal-hub.git
cd gtm-signal-hub
npm install
cp .env.local.example .env.local
# ANTHROPIC_API_KEY → coaching + Calls (optional but impressive)
# TURSO_* + VOYAGE_API_KEY → whole-hub RAG (optional; without them chat fails open)
npm run check:sensitive && npm run check:glossary && npm run build
npm run seed   # only if you configured Turso + Voyage
npm run dev    # http://localhost:5173
```

## Pre-walkthrough gate (60 seconds)

- [ ] Tip passes `check:sensitive`, `check:glossary`, `build`
- [ ] No `.env.local` (or other secrets) staged or tracked — only `.env.local.example`
- [ ] Spot-check items in `HUMAN_REVIEW.md` if the audience is external

## 3-minute path

| Time | Tab | Say / show |
|---|---|---|
| 0:00 | **Dashboard** | “Market → account → play, structured.” Click **Explore SDLC Map**. |
| 0:20 | **SDLC** | Value stream Plan→Improve. Open **Release** or **Test**. Find the constraint. |
| 1:20 | **Accounts** | e.g. Cloudflare — **public signals** vs **labelled hypotheses**. |
| 2:00 | **Outbound** | Same account + VP Engineering + Release → **Generate Openers** + Coach Notes. |
| 2:50 | **Methodology** | Public research standards; judgment over invented intel. |

Optional (+1 min): **Calls** → **Load sample transcript** → **Analyse Call**.

Full narration: [`DEMO_SCRIPT.md`](DEMO_SCRIPT.md).

## One-liners if asked

- **Why fictional Relay?** So the workflow and judgment show without needing real employer or customer data.
- **Where’s the AI?** Coaching on cards + Outbound polish + Calls; optional Turso/Voyage RAG.
- **What’s real vs invented?** Account briefs use public sources; hypotheses are labelled; Relay itself is fictional.
