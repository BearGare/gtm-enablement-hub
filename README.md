# GTM Signal Hub

An externally safe, interview-ready GTM enablement hub for **Relay** — a fictional full-SDLC platform (a Cursor + Atlassian + delivery-platform chimera). Built to show how an SDR/GTM thinker structures technical markets: SDLC → personas → accounts → alternatives → outbound plays → AI coaching.

> **Do not merge into `main`.** This branch replaces private enablement content with a fictional Relay demo. Merging it would overwrite the private hub. Prefer keeping PR #53 (or successors) **unmerged / closed without merge**, and share via a [clean public export](#export-to-a-clean-public-repo) instead.
>
> **Data safety:** Tip-of-branch content is sanitised. Private employer/customer material was removed or rewritten. See [Methodology](#data-safety-boundary), `SANITISATION_LOG.md`, `INTERVIEW_HANDOFF.md`, and the in-app **Methodology** tab. **Do not** make the private repo public, and **do not** push this branch’s full git history (it still reaches private `main` ancestors).

## Purpose

Demonstrate:
- how to think about technical markets and the SDLC
- how to map accounts, personas, use cases, pain points, and outbound plays
- how AI-assisted workflows improve SDR quality (coaching + call analysis + optional RAG)
- how messy GTM knowledge becomes a structured system
- judgment around data safety and confidentiality

## Tech stack

- React 19 + Vite 6 + TypeScript
- Content in `src/data/*` (bundled client-side)
- `POST /api/chat` via Vite middleware (dev) / `api/chat.ts` (serverless)
- Optional whole-hub RAG: Turso/libSQL + Voyage AI embeddings (`npm run seed`)

## Setup

```bash
git clone https://github.com/BearGare/gtm-signal-hub.git
cd gtm-signal-hub
npm install
cp .env.local.example .env.local
# Fill ANTHROPIC_API_KEY (required for coaching / call analysis)
# Fill TURSO_DATABASE_URL, TURSO_AUTH_TOKEN, VOYAGE_API_KEY for RAG
npm run dev
```

Open http://localhost:5173

> **Public repo:** [github.com/BearGare/gtm-signal-hub](https://github.com/BearGare/gtm-signal-hub) — clean orphan history only (no private hub ancestors).

### RAG (recommended for the full demo)

```bash
npm run seed        # embed sanitised content into your demo Turso DB
npm run seed:dry    # inspect content_text without writing
```

Use a **dedicated demo database** — never point this branch at a private enablement DB.

## Core pages

| Tab | What it shows |
|---|---|
| Dashboard | Coverage stats + demo path CTAs |
| Solutions | Relay modules across the SDLC + Chimera AI |
| SDLC | Thin inner (Plan/Code) vs outer (Build→Optimise) map |
| Personas | Technical buyer enablement cards |
| Accounts | Public-source account briefs (hypotheses labelled) |
| Competitive | Public-research landscape, Relay-framed |
| Outbound | Messaging lab (templates + optional AI polish) |
| Discovery | Question banks with rationale |
| Glossary | Industry + Relay terms with auto-link |
| Calls | Paste transcript → structured analysis |
| Methodology | Data-safety boundary |
| Progress / Settings | Practice tiers + preferences |

## Demo flow

See [`DEMO_SCRIPT.md`](DEMO_SCRIPT.md) for a 3-minute walkthrough aimed at a GTM/SDR leader.

## Data safety boundary

- Private/internal case studies, CRM/Gong-derived notes, and employer competitive IP were removed or recreated
- Real companies may appear **only** with public-source observations
- Hypotheses are labelled as hypotheses
- This app demonstrates **workflow and judgment**, not privileged market intelligence
- Secrets live in `.env.local` (gitignored) — never commit keys

## Checks

```bash
npm run check:glossary
npm run check:sensitive   # blocks known private/employer markers in runtime+docs
npm run build
```

## Interview handoff

Short runbook (commands + 3-minute demo path): [`INTERVIEW_HANDOFF.md`](INTERVIEW_HANDOFF.md). Human spot-checks: [`HUMAN_REVIEW.md`](HUMAN_REVIEW.md). Demo narration: [`DEMO_SCRIPT.md`](DEMO_SCRIPT.md).

## Export to a clean public repo

This branch’s **working tree** is interview-safe; its **git history is not**. Ancestor commits still contain the private hub. To show or fork publicly:

1. Confirm tip gates: `npm run check:sensitive && npm run check:glossary && npm run build`
2. Confirm no secrets at tip: only `.env.local.example` (placeholders) is tracked; never commit `.env.local`
3. Create an **orphan** history from the sanitised tip (squash — no private ancestors):

```bash
git checkout cursor/external-demo-hub-f483   # or the share-ready tip
git checkout --orphan public-gtm-signal-hub
git add -A
git status   # confirm no .env.local / secrets
git commit -m "Initial public release: GTM Signal Hub (Relay demo)"
```

4. Create a **new empty** public GitHub repo named `gtm-signal-hub` (do not fork the private hub).
5. Push only the orphan branch:

```bash
git remote add public https://github.com/BearGare/gtm-signal-hub.git
git push -u public public-gtm-signal-hub:main
```

6. Optional: tag `v0.1.0-demo`, add Topics, link `DEMO_SCRIPT.md` / `INTERVIEW_HANDOFF.md` in the public README.

**Never:** merge the private demo branch into private `main`, push private-hub history onto the public remote, or flip the private repo to public.

If you are already on [github.com/BearGare/gtm-signal-hub](https://github.com/BearGare/gtm-signal-hub), this export has been done — clone that repo directly (see Setup).

## Secrets posture

Audited on the demo tip / reachable `.env*` paths:

| Check | Result |
|---|---|
| Tracked `.env*` | Only `.env.local.example` (placeholder values) |
| `.env` / `.env.local` ever committed | No |
| Real `sk-ant-api…` / live tokens in tip | No |
| `.gitignore` covers `.env`, `.env.local`, `.env*.local`, `.env.*` | Yes |

Rotate any key that ever lived in a cloud agent env if that env was shared beyond you.

## Limitations

- No auth / multi-user persistence yet
- Outbound Lab is template-first; AI polish needs an API key
- Competitive cards are public-research framed for a fictional platform — spot-check before public sharing
- Call Analysis must use synthetic or properly consented transcripts only
- Full git history on this branch is **not** share-safe (use orphan export above)

## Future improvements

- Deeper account signal sourcing with cited URLs
- Dual-write progress to Turso
- Export outbound packs to clipboard/Notion
