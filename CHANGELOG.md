# Changelog

A dated record of what has shipped. For what's coming next, see [ROADMAP.md](ROADMAP.md).

---

## 30 July 2026

- **Public standalone release of GTM Signal Hub** — React 19 + Vite 6 + TypeScript enablement hub for the fictional Relay GTM org.
- **Core tabs:** Dashboard, Solutions, SDLC, Personas, Accounts, Competitive, Outbound Lab, Discovery, Glossary, Calls, Methodology, Progress, Settings.
- **AI coaching + call analysis** via Anthropic Claude through a server-side proxy (`api/chat.ts` / Vite middleware); optional whole-hub RAG with Turso / libSQL + Voyage embeddings (`npm run seed`).
- **Content model:** 14 Relay modules + Relay AI (Delivery Graph; agents Pilot, Conductor, Prover, Medic), 8-stage value-stream SDLC map, public-source account briefs with labelled hypotheses, competitive landscape, discovery banks, glossary auto-link.
- **Naming:** Canonical guide in `docs/NAMING.md`; enforced by `npm run check:naming`.
- **Gates:** `npm run check:glossary`, `npm run check:sensitive`, `npm run build` (CI on push/PR).
