# GTM Enablement Hub — Claude Code / agent context

## What this project is

A sales enablement hub for the **Relay** GTM organisation. Relay is a fictional full-SDLC delivery platform. The app helps SDRs, AEs, and GTM teammates learn and practise on:

- Relay platform modules (organised by value pillars + Relay AI)
- The software delivery lifecycle as one value stream (Plan → Improve) — constraint-first, not loop-based
- Buyer personas and how to approach each
- Competitive landscape cards
- Discovery questions with rationale + constraint-first Paths
- Land Planner (wedge → toolchain honesty → proof ladder)
- Objection Gym (offline drills + optional AI coach)
- AI-powered call analysis

The AI coaching chat (Anthropic Claude) uses Socratic coaching — explain it, get challenged, build confidence before a real customer conversation.

## Architecture

**Stack:** Vite + React 19 + TypeScript.

- `src/colors.ts` — colour palette
- `src/types.ts` — TypeScript types
- `src/data/*` — all GTM content (modules, personas, comps, discovery, discoveryPaths, landPlanner, objections, glossary, SDLC, architecture, Relay AI)
- `src/App.tsx` — UI, state, chat, Land Planner, Objection Gym, call analysis

**API proxy:** `api/chat.ts` proxies Anthropic server-side and runs the optional RAG pipeline (embed → hybrid vector+FTS5 → augment system prompt). Locally, `vite.config.ts` mirrors the same pipeline.

**Persistence:** `localStorage` via a thin `store` wrapper — keys use the `signalHub*` prefix (kept for compatibility after the Enablement Hub rename).

**Content:** Edit `src/data/*`, not `App.tsx`, for GTM copy changes.

## RAG coaching (optional, auto-enabling)

Auto-enables when Turso + Voyage env vars are present; otherwise basic single-card coaching. Fail-open on DB/embedding errors.

- `api/chat.ts` — `buildRagContext()`
- `vite.config.ts` — local middleware mirror
- `scripts/seed.ts` — `npm run seed` / `npm run seed:dry`
- Env (no `VITE_` prefix): `ANTHROPIC_API_KEY`, `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`, `VOYAGE_API_KEY`

## Content rules

- Relay is fictional — do not invent real customer relationships or private deal facts
- Teaching content (personas, competitive, discovery) stays labelled; do not present hub copy as live customer intel
- Follow [`docs/NAMING.md`](docs/NAMING.md) for module and capability names
- Never commit `.env.local`
- Before content commits: `npm run check:naming`, `npm run check:sensitive`, and `npm run check:glossary`

## Commands

```bash
npm run dev              # http://localhost:5173
npm run build
npm run check:naming
npm run check:glossary
npm run check:sensitive
npm run seed              # requires Turso + Voyage keys
```

See `README.md` for setup detail, `docs/NAMING.md` for product names, and `ROADMAP.md` for what's next.
