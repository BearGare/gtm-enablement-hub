# GTM Enablement Hub

A sales enablement hub for the **Relay** GTM organisation. Relay is a fictional full-SDLC delivery platform — think AI-assisted coding, planning, and delivery tooling under one roof. The hub gives SDRs, AEs, and GTM teammates an interactive way to learn and practise on Relay modules, the software delivery lifecycle, buyer personas, competitive positioning, discovery questions, and call analysis.

The AI coaching chat (powered by Anthropic Claude) lets users deep-dive on any topic via Socratic coaching — explain it, get challenged, and build confidence before a real customer conversation.

**Stack:** React 19 + Vite 6 + TypeScript. GTM content lives in `src/data/*`; a Node.js serverless function proxies the Claude API server-side. An optional RAG layer (Turso / libSQL + Voyage AI embeddings) gives the coaching chat whole-hub retrieval — it auto-enables when its keys are present and stays in basic mode otherwise.

> **New to the project?** Read this file to run it, [`ROADMAP.md`](ROADMAP.md) for where it's going, [`CHANGELOG.md`](CHANGELOG.md) for what's shipped, and [`docs/DEV_SETUP.md`](docs/DEV_SETUP.md) for how changes get made. [`CLAUDE.md`](CLAUDE.md) is the context file that steers Claude Code / Cursor agents.

---

## Smarter coaching: whole-hub retrieval (RAG)

The AI coach runs in two modes, decided purely by which keys are in your `.env.local`:

- **Basic** (`ANTHROPIC_API_KEY` only) — the coach sees the card you have open. Solid single-card coaching.
- **Whole-hub** (add the Turso + Voyage keys) — every message runs a **hybrid semantic + keyword search across the entire knowledge base** and feeds the most relevant cards into the coach's context, so you get cross-domain, grounded coaching rather than the model's best guess.

It's built on **Turso / libSQL** with **Voyage AI** embeddings and SQLite FTS5, behind the Node.js API proxy. **The retrieval layer is additive and fails open:** if the database or embeddings API is unavailable — or you simply haven't added the keys — the chat runs in basic mode with no error. The same database is the foundation for planned **multi-user state** (progress, bookmarks, call history, settings) and a future auth layer.

To switch on whole-hub coaching, see [Optional: enable RAG coaching](#optional-enable-rag-coaching) below.

---

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- An Anthropic API key — get one free at [console.anthropic.com](https://console.anthropic.com/api-keys)

### Setup

```bash
# 1. Clone the repo
git clone https://github.com/BearGare/gtm-enablement-hub.git
cd gtm-enablement-hub

# 2. Install dependencies
npm install

# 3. Add your API key
cp .env.local.example .env.local
# Open .env.local and replace sk-ant-... with your actual key

# 4. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

---

## Optional: enable RAG coaching

The base app runs on `ANTHROPIC_API_KEY` alone. To turn on whole-hub retrieval coaching, add three more keys and seed the database — the app auto-detects them, and silently stays in basic mode if they're absent.

**1. Add to `.env.local`:**

```
TURSO_DATABASE_URL=...
TURSO_AUTH_TOKEN=...
VOYAGE_API_KEY=...
```

**2. Seed the knowledge base:**

```bash
npm run seed
```

Inspect what would be embedded without writing:

```bash
npm run seed:dry
```

**3. Run it:**

```bash
npm run dev
```

The coach now retrieves across the whole hub. Remove the keys and it falls back to basic mode automatically.

---

## What you can explore

| Tab | What it covers |
|---|---|
| Dashboard | Coverage overview + suggested path through the hub |
| Solutions | Relay modules across the SDLC + Relay AI |
| SDLC | Value stream: Plan → Code → Build → Test → Secure → Release → Operate → Improve |
| Personas | Technical buyer enablement cards |
| Competitive | Landscape cards framed for Relay |
| Discovery | Question banks (Browse) + constraint-first Paths |
| Land Planner | Wedge → toolchain honesty → proof ladder; copy land brief |
| Objection Gym | Hard-objection drills offline or with AI coach |
| Glossary | Industry + Relay + competitive terms with auto-link (popover → battlecard) |
| Calls | Paste a transcript → structured analysis |
| Progress / Settings | Practice tiers + preferences; About this hub under Settings |

---

## Security architecture

The API key is **never exposed to the browser or bundled into client-side JavaScript.**

```
Browser  →  POST /api/chat  →  Vite middleware (dev) / Node.js serverless (prod)
                                        ↓
                               Anthropic API (key injected server-side)
                                        ↓
                               Response forwarded to browser
```

- In **local development**, `vite.config.ts` runs a server-side middleware that reads `ANTHROPIC_API_KEY` from `.env.local` and injects it into the outgoing request. The browser only ever talks to `localhost:5173`.
- In **production** (e.g. Vercel), `api/chat.ts` is a Node.js serverless function. The key is stored as an environment variable — it lives on the server and never reaches the client bundle.
- `.env.local` is gitignored. The key never touches version control.
- The variable has no `VITE_` prefix, which prevents Vite from bundling it into client-side code even if referenced accidentally.
- The optional RAG keys (`TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`, `VOYAGE_API_KEY`) follow the same rules — no `VITE_` prefix, read server-side only, never bundled into the client.

**The AI provider is Anthropic (Claude) only.** The request format, system prompt structure, and response parsing are built around Anthropic's API.

---

## Project structure

| Path | Purpose |
|---|---|
| `src/App.tsx` | UI components, state management, and chat logic |
| `src/data/*` | All GTM content — modules, personas, battlecards, discovery, glossary, SDLC |
| `src/types.ts` | TypeScript type definitions |
| `src/colors.ts` | Brand colour palette constants |
| `api/chat.ts` | Node.js serverless function — Anthropic API proxy + RAG pipeline |
| `vite.config.ts` | Vite config + local dev middleware mirroring the API proxy |
| `scripts/seed.ts` | Seeds the Turso database + FTS5 index with Voyage embeddings |
| `scripts/check-glossary.ts` | Glossary integrity check (`npm run check:glossary`) |
| `scripts/check-sensitive.ts` | Content hygiene gate (`npm run check:sensitive`) |
| `.env.local` | Your API keys (local only, never committed) |
| `.env.local.example` | Template — copy this to `.env.local` to get started |
| `CLAUDE.md` | Context and instructions for Claude Code / Cursor |
| `ROADMAP.md` | Product direction and backlog |
| `CHANGELOG.md` | Dated record of what has shipped |
| `docs/DEV_SETUP.md` | Development environment notes |

---

## Content updates

All GTM content lives in `src/data/*` as TypeScript data modules. The workflow:

1. Edit the relevant file under `src/data/` (modules, personas, comps, etc.)
2. Run `npm run check:glossary` and `npm run check:sensitive` when content changes
3. Commit on a feature branch → PR → merge to `main`

Teaching content stays labelled — do not present hub copy as live customer intel. Call Analysis should use synthetic or properly consented transcripts.

---

## Checks

```bash
npm run check:naming
npm run check:glossary
npm run check:sensitive
npm run build
```

Canonical module and capability names live in [`docs/NAMING.md`](docs/NAMING.md).

---

## Contributing

1. Clone the repo
2. Create `.env.local` from `.env.local.example` with your own Anthropic key
3. Branch from `main` using a descriptive name (`feat/`, `fix/`, `docs/`, `content/`)
4. PR into `main` — never push directly
