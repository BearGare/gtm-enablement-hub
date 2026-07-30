# Changelog

A dated record of what has shipped. For what's coming next, see [ROADMAP.md](ROADMAP.md).

---

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
