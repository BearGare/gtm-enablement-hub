# Relay naming guide

Canonical product names for GTM Enablement Hub. All content, UI copy, coaching prompts, and competitive cards must use these names. `npm run check:naming` enforces the forbidden list.

## Pillars

| Pillar id | Label | Value | Modules |
|---|---|---|---|
| `create` | Create for | Focus | Plans, Code, Portal |
| `deliver` | Deliver for | Velocity | CI, Test, CD, Flags, Infra, Data |
| `protect` | Protect for | Trust | Secure, Supply |
| `operate` | Operate for | Leverage | SRE, Cost, Insights |

## Canonical modules (14)

| id | Title | Badge | One-line |
|---|---|---|---|
| `plans` | Relay Plans | Plan | Roadmap-to-delivery visibility — work items linked to services, owners, and cycle time |
| `code` | Relay Code | Code | AI-assisted coding with codebase understanding, PR quality gates, and review acceleration |
| `portal` | Relay Portal | Portal | Developer portal — service catalog, scorecards, and self-service golden paths |
| `ci` | Relay CI | CI | Continuous integration — selective tests handoff, caching, runners that absorb AI-era merge volume |
| `test` | Relay Test | Test | Test generation, impact-based selection, flake quarantine, and self-healing E2E |
| `cd` | Relay CD | CD | Progressive delivery and GitOps — canary, blue/green, release verification, automatic rollback |
| `flags` | Relay Flags | Flags | Feature flags and experimentation — decouple deploy from release |
| `infra` | Relay Infra | Infra | IaC governance — Terraform/OpenTofu pipelines, approvals, cost-before-apply, drift detection |
| `data` | Relay Data | Data | Database change delivery — migrations in the pipeline, rollback-safe schema changes, drift detection |
| `secure` | Relay Secure | Secure | DevSecOps orchestration — SAST, SCA, containers, secrets, policy-as-code with noise reduction |
| `supply` | Relay Supply | Supply | Artifact registry + supply-chain provenance — SBOMs, attestations, promotion policies |
| `sre` | Relay SRE | SRE | Incident response, change correlation, runbooks, post-incident writeups, reliability experiments |
| `cost` | Relay Cost | FinOps | Cloud FinOps — spend visibility, idle shutdown schedules, rightsizing, AI/token cost attribution |
| `insights` | Relay Insights | Insights | Engineering insights — DORA, bottlenecks, AI adoption signals, delivery efficiency |

## Relay AI

| Name | Role |
|---|---|
| **Relay AI** | Umbrella intelligence layer across the platform |
| **Delivery Graph** | Live map of code, services, pipelines, environments, owners, incidents, and cost |
| **Pilot** | Coding agent — writes, refactors, reviews with repo + delivery context |
| **Conductor** | Release agent — plans rollouts, monitors canary health, remediates failures |
| **Prover** | Test agent — generates, prioritises, and maintains tests; flags flakes |
| **Medic** | Incident agent — correlates alerts to changes, drafts remediation and incident recaps |

Architecture (unchanged names): Control Plane, Edge Agent / Runner, Delivery Graph (was Knowledge Graph / AI Context Graph), Policy Engine.

## Capability vocabulary (use these, never Harness terms)

| Forbidden (Harness) | Use instead | Module home |
|---|---|---|
| Test Intelligence | impact-based test selection | Relay Test |
| Continuous Verification / CV / Relay CV | release verification / deployment health gates | Relay CD |
| AutoStopping | idle shutdown schedules | Relay Cost |
| AI Scribe | incident recap / auto-drafted postmortem | Relay SRE |
| delegate model | edge runner | Architecture |
| Software Delivery Knowledge Graph / AI Context Graph | Delivery Graph | Relay AI / Architecture |
| Relay AI Development Assistant / AIDA | Relay AI / Pilot | Relay AI |
| ChaosGuard / GameDay Portal (as product) | reliability experiments | Relay SRE |
| Trellis Score | (omit or use generic eng metrics) | Relay Insights |
| Gitspaces | (omit or "cloud workspaces") | Relay Code |

## Forbidden Relay names (aliases → canonical)

| Do not use | Use |
|---|---|
| Relay Build | Relay CI |
| Relay Deploy | Relay CD |
| Relay Verify | Relay Test (tests) or Relay CD release verification (post-deploy) |
| Relay Observe / Relay Reliability / Relay AI SRE | Relay SRE |
| Relay Cloud Cost Management / Relay Cloud Costs | Relay Cost |
| Relay Engineering Insights / Relay SEI | Relay Insights |
| Relay Artifact Registry | Relay Supply |
| Relay IaCM / Relay IaC | Relay Infra |
| Relay AST / Relay WAAP / "security scanning" as a product name | Relay Secure |
| Relay Chaos Engineering / Relay Resilience Testing / Relay CE | Relay SRE (reliability experiments) |
| Relay Plan (singular) | Relay Plans |
| Chimera / Chimera AI / Chimera AI Engine | Relay AI |

## SDLC stages (value stream — no loops)

Equal stages on one continuous stream. Guiding question per stage:

| Stage | Question |
|---|---|
| Plan | What should we build? |
| Code | Is the change sound? |
| Build | Does it integrate? |
| Test | Does it work? |
| Secure | Is it safe to ship? |
| Release | Who sees it, and how safely? |
| Operate | Is it healthy? |
| Improve | Was it worth it? |

Never use: inner loop, outer loop, thin inner loop, "OUTER LOOP · RELAY PLATFORM", or time-split claims like "60–70% of engineering time is in the outer loop".

## Competitive scope notes

- **Relay Secure** covers pipeline and supply-chain security (SAST/SCA/containers/secrets/policy). Runtime / API protection (WAF, WAAP, east-west) is **adjacent, not competitive** — keep Kong, Noname, Salt, Wiz cards framed that way.
- Do not invent a Relay WAAP module.
- Do not claim Relay founded or contributes to LitmusChaos / other CNCF projects.
- Do not quote real vendor CEOs or recycle competitor-vendor marketing stats as Relay stats.

## Enforcement

- `npm run check:naming` — non-canonical Relay names + Harness capability vocabulary
- `npm run check:sensitive` — private/employer markers + additional Harness fingerprints
- In-app coaching `nameGuard` in `src/App.tsx` lists the 14 canonical module titles
