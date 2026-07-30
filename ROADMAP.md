# GTM Enablement Hub — Roadmap

_Last updated: 30 July 2026._

What's shipped is in [CHANGELOG.md](CHANGELOG.md). This document is forward-looking.

---

## Next: multi-user state on the RAG database

The Turso + Voyage RAG coaching layer is in place (see [README](README.md#optional-enable-rag-coaching)). The same database is the foundation for **multi-user state**: progress, bookmarks, call history, and settings moving from per-browser `localStorage` to a shared store — via a dual-write pattern (localStorage stays authoritative until the DB path is proven), then an auth layer and team rollout.

---

## Near term

- [x] Canonical Relay naming (CI/CD, 14 modules) + value-stream SDLC reframe — see `docs/NAMING.md`
- [x] ~~Richer public-source citations on account briefs~~ — cancelled (Accounts tab removed)
- [x] ~~Outbound pack export~~ — cancelled (Outbound Lab removed)
- [ ] **Objection Gym** — new tab: objection cards by persona × theme; AI coach scores answers. Category-reframe drills live here.
- [ ] **Discovery Paths** — fold into Discovery tab (Browse + Path modes); constraint-first branching, not a separate tab
- [ ] **Land Planner** — new tab combining wedge finder + toolchain coexist/replace honesty + anti-boil-the-ocean proof ladder into one land brief
- [ ] Dual-write progress / bookmarks / call history to Turso
- [ ] Cross-links between personas, modules, and competitive cards
- [ ] Mobile pass once the hub is in regular use

---

## Candidates (workshop)

Idiosyncratic to selling a multi-module full-value-stream platform — not CRM / Gong / Sales Nav substitutes.

| Idea | Notes |
|---|---|
| **Security Review Gauntlet** | Timed AppSec/architecture Q&A; can deep-link from Land Planner’s security proof variant |
| **Champion → Executive Translator** | Technical win → VP/CIO narrative; pairs after a land brief exists |
| **Multi-Stakeholder Room Sim** | Sec vs Dev vs FinOps interrupting; closer to Objection Gym’s interaction model |
| **Budget-Owner Ambiguity Tree** | DevEx vs Infra vs Sec vs Eng Productivity — could later feed Land Planner inputs |

---

## Non-goals (for now)

- Auth / multi-tenant production deployment (blocked on the persistence + auth decision above)
- Hard-coded named account briefs or one-click outbound drafting (removed — oversimplifies complex platform GTM)
- Generic talk-track exporters, CRM-like stakeholder maps, or LMS learning-path clones unless tightly bound to Relay constraint/module logic
