# Changelog

A dated record of what has shipped. For what's coming next, see [ROADMAP.md](ROADMAP.md).

---

## 30 July 2026 (glossary coverage)

- **Glossary expanded** from **95 → 191 terms** (10 → 11 categories; **110 → 232** lookup keys).
- New **Competitive landscape** category: glossary entry for every battlecard in `COMPS` (52), with short-form aliases (GHA, GitLab Duo, Argo CD, etc.).
- Popover **seeAlso** deep-links: `"… battlecard"` opens the Competitive tab and that specific card (alongside existing tab / stage / module conventions).
- Relay density: Delivery Graph, Relay AI agents (Pilot/Conductor/Prover/Medic), Control Plane, Edge Agent, Policy Engine, plus SDLC/FinOps/security jargon sellers hit in hub copy.
- `check:glossary` now validates the `aliases`/`plurals` Records in `glossary.ts` and battlecard seeAlso stems (was a no-op against the old `add()` helper).

## 30 July 2026 (enablement practice tabs)

- **Discovery Paths** — Browse / Path modes on the Discovery tab; one constraint-first path per SDLC stage with handoff to Land Planner.
- **Land Planner** — new tab: shared inputs (constraint, personas, toolchain, risk) → wedge + toolchain honesty + proof ladder; copy land brief (deterministic, offline).
- **Objection Gym** — new tab: 15 drills by theme × persona; offline strong answers + optional AI coach scoring (`ChatMode: objection`).
- Repo renamed to `gtm-enablement-hub` on GitHub.

## 30 July 2026 (hub prune)

- **Renamed** user-facing product to **GTM Enablement Hub** (localStorage keys stay `signalHub*`).
- **Removed** Accounts tab and Outbound Lab (data, types, seed embeddings, UI).
- **Methodology** nested under Settings as impressum-style “About this hub” (no longer a standalone tab).
- **Fixed** Architecture strip: list rows now show emoji (`e`) and short blurb (`short`) instead of empty number/sum fields.
- **Dashboard** path rewritten around SDLC → Solutions → Personas → Discovery/Calls.
- **Roadmap** commits Objection Gym, Discovery Paths (inside Discovery), and Land Planner as near-term replacements.

## 30 July 2026

- **Public standalone release of GTM Signal Hub** — React 19 + Vite 6 + TypeScript enablement hub for the fictional Relay GTM org.
- **Core tabs (at release):** Dashboard, Solutions, SDLC, Personas, Accounts, Competitive, Outbound Lab, Discovery, Glossary, Calls, Methodology, Progress, Settings.
- **AI coaching + call analysis** via Anthropic Claude through a server-side proxy (`api/chat.ts` / Vite middleware); optional whole-hub RAG with Turso / libSQL + Voyage embeddings (`npm run seed`).
- **Content model:** 14 Relay modules + Relay AI (Delivery Graph; agents Pilot, Conductor, Prover, Medic), 8-stage value-stream SDLC map, competitive landscape, discovery banks, glossary auto-link. (Account briefs and Outbound Lab shipped at release; removed in the hub prune above.)
- **Naming:** Canonical guide in `docs/NAMING.md`; enforced by `npm run check:naming`.
- **Gates:** `npm run check:glossary`, `npm run check:sensitive`, `npm run build` (CI on push/PR).
