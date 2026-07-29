# Interview handoff — GTM Signal Hub

Checklist to run the demo yourself, share a screen recording, or point someone at a clean public clone.

## Before you open the app

**Preferred (public clone):**

```bash
git clone https://github.com/BearGare/gtm-signal-hub.git
cd gtm-signal-hub
npm install
cp .env.local.example .env.local
# ANTHROPIC_API_KEY → coaching + Calls (optional but impressive)
# TURSO_* + VOYAGE_API_KEY → whole-hub RAG (optional; without them chat fails open)
npm run check:sensitive && npm run check:glossary && npm run build
npm run seed   # only with a dedicated demo Turso DB
npm run dev    # http://localhost:5173
```

Use a **demo** Turso DB only if you seed. Never point at a private enablement DB.

If you are still on the private hub’s demo branch instead, same commands from the repo root — but do **not** share that branch’s git history publicly.

## Share / fork gate (60 seconds)

- [ ] Tip passes `check:sensitive`, `check:glossary`, `build`
- [ ] No `.env.local` (or other secrets) staged or tracked — only `.env.local.example`
- [ ] You will **not** merge this branch into private `main`
- [ ] Public share uses an **orphan export** (see README → *Export to a clean public repo*), not this branch’s full history
- [ ] Spot-check items in `HUMAN_REVIEW.md` if the audience is external

## 3-minute path

| Time | Tab | Say / show |
|---|---|---|
| 0:00 | **Dashboard** | “Market → account → play, structured.” Click **Explore SDLC Map**. |
| 0:20 | **SDLC** | Inner loop (Plan/Code) vs outer (Build→Optimise). Open **Deploy** or **Code**. |
| 1:20 | **Accounts** | e.g. Cloudflare — **public signals** vs **labelled hypotheses**. |
| 2:00 | **Outbound** | Same account + VP Engineering + Deploy → **Generate Openers** + Coach Notes. |
| 2:50 | **Methodology** | Sanitised demo; judgment over privileged intel. |

Optional (+1 min): **Calls** → **Load sample transcript** → **Analyse Call**.

Full narration: `DEMO_SCRIPT.md`.

## One-liners if asked

- **Why fictional Relay?** So the workflow and judgment show without employer or customer data.
- **Where’s the AI?** Coaching on cards + Outbound polish + Calls; optional Turso/Voyage RAG.
- **Is the repo public-safe?** Tip content yes; history no — export orphan before publishing.
