# Sanitisation log — external demo branch

Branch: `cursor/external-demo-hub-f483`  
Purpose: quarantine inventory of what was removed or rewritten for the interview-safe **GTM Signal Hub** (fictional platform: **Relay**).

This file is a review artifact. It may mention private markers that were stripped from runtime content.

## Removed entirely from runtime content

| Source | Action | Reason |
|---|---|---|
| `PROOFS` / Use Cases tab | Removed | Customer proofs, Internal GPP, deal VO language, named champions |
| Employer case-study URLs | Not ported | Still associates demo with employer customers |
| Glasswing outreach templates | Removed from personas | Internal enablement copy |
| Named champions (e.g. Joe Soule, Marc Pearce) | Removed | Personal / deal context |
| Anonymised cards that still named Deutsche Bank | Removed | Identity leak risk |
| `hHub*` localStorage keys | Renamed to `signalHub*` | Avoid colliding with private hub state |

## Rewritten in place

| Source | Action |
|---|---|
| `MODS` | Replaced with Relay chimera modules (Cursor + Atlassian + Harness–inspired capability set, original copy) |
| `PERSONAS` | Structure kept; stripped ELAs, ARR/valuation, Glasswing, named proofs |
| `COMPS` | Depth kept; Harness framing → Relay; removed “internal battlecard” / sales-ops-only lines |
| `SDLC_STAGES` | Expanded to Plan → Code → Build → Secure → Deploy → Observe → Optimise; Relay module map |
| `SDLC_INTRO` | Inner/outer loop kept; employer pitch reframed as Relay integrated-platform thesis |
| `DISC` | Scrubbed employer proof asides |
| `GLOSSARY` | Industry terms kept; employer-only terms removed/rewritten |
| `ARCH` / `HARNESS_AI` | Replaced with thin Relay architecture + AI platform concepts |
| App coaching / call prompts | Scrubbed to Relay GTM Signal Hub |
| Shell branding | Harness GTM Learning Hub → GTM Signal Hub |

## Added

| Feature | Notes |
|---|---|
| Dashboard | Coverage / signals / plays overview |
| Accounts | Public-source account intelligence (hypotheses labelled) |
| Outbound Lab | Template + optional AI polish |
| Methodology | Data-safety boundary for interview audiences |
| `npm run check:sensitive` | Blocks known private/employer markers |

## Human review still recommended

- Spot-check competitive claims that feel employer-derived after scrub
- Confirm public account source citations
- Finance persona / TCO tone
- Never publish `main` history alongside this demo branch
- Public share: orphan-export the sanitised tip into a **new** repo (see README) — do not fork/push this branch as-is

## Share-readiness notes

- Tip content is gated by `npm run check:sensitive`
- No real `.env*` secrets in git history on tracked paths (only `.env.local.example` placeholders)
- Ancestor commits on this branch still include the private hub — history is not share-safe
