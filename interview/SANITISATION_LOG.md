# Content preparation log (historical)

Notes on how Relay content for GTM Enablement Hub was prepared. Kept here for audit trail — not product documentation.

## Removed from the content model

| Source | Action | Reason |
|---|---|---|
| Customer proof / use-case bank | Not included | Named customers and deal VO language |
| Employer case-study URLs | Not included | Associates content with a specific employer |
| Internal outreach templates | Not included | Internal enablement copy |
| Named deal champions | Not included | Personal / deal context |
| Prior hub localStorage keys | Renamed to `signalHub*` | Avoid colliding with other local installs |
| Hard-coded account briefs | Removed from product | Oversimplified; not practical for demos with real sellers |
| Outbound Lab | Removed from product | Destructively simplified complex outbound process |

## Built for Relay

| Area | Notes |
|---|---|
| Modules | Relay chimera modules across the SDLC + Chimera AI |
| Personas | Structure for technical buyers; no ELA / ARR packaging |
| Competitive | Public-research landscape, Relay-framed |
| SDLC | Plan → Code → Build → Secure → Deploy → Observe → Optimise |
| Discovery / Glossary | Industry + Relay terms |
| Dashboard / Settings About | Coverage path + research standards (impressum) |
| `npm run check:sensitive` | Blocks known private/employer markers from shipping in product paths |

## Still worth a human pass

- Spot-check competitive claims
- Confirm Turso DB ownership before seeding
- Synthetic or consented call transcripts only in live demos
- Finance persona / TCO tone
