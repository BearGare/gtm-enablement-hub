# GTM Signal Hub — Roadmap

_Last updated: 30 July 2026._

What's shipped is in [CHANGELOG.md](CHANGELOG.md). This document is forward-looking.

---

## Next: multi-user state on the RAG database

The Turso + Voyage RAG coaching layer is in place (see [README](README.md#optional-enable-rag-coaching)). The same database is the foundation for **multi-user state**: progress, bookmarks, call history, and settings moving from per-browser `localStorage` to a shared store — via a dual-write pattern (localStorage stays authoritative until the DB path is proven), then an auth layer and team rollout.

---

## Near term

- [x] Canonical Relay naming (CI/CD, 14 modules) + value-stream SDLC reframe — see `docs/NAMING.md`
- [ ] Richer public-source citations on account briefs (URL + date where possible)
- [ ] Outbound pack export (clipboard / markdown)
- [ ] Dual-write progress / bookmarks / call history to Turso
- [ ] Cross-links between personas, modules, accounts, and competitive cards
- [ ] Discovery flow: branching tree beyond the flat question bank
- [ ] Mobile pass once the hub is in regular use

---

## Non-goals (for now)

- Auth / multi-tenant production deployment (blocked on the persistence + auth decision above)
- Treating public account briefs as customer intel — they remain teaching material with labelled hypotheses
