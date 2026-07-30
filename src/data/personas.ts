import { A, TL, WA, ER, MU } from "../colors";
import type { Item } from "../types";

/** Persona enablement cards for Relay GTM Signal Hub. */
export const PERSONAS: Item[] = [

  {id:"cto",e:"🏛️",c:A,title:"CTO",role:"Strategic Economic Buyer",
   short:"Owns engineering strategy, AI tooling ROI, and board-level tech risk. Buys narrative and proof of delivery outcomes — not feature tours.",
   sa:"Lead with outcomes, not modules: 'Your teams generate more code with AI assistants — can you show the board that more *working software* reaches production, or only more commits?' Then map that gap to Relay's end-to-end delivery loop.",
   d:`## CTO — strategic economic buyer
The CTO sets technical direction and defends AI and platform investment upward. Tool selection is usually delegated; they care whether the organisation can ship safely at the pace the business demands.

## How they evaluate
They listen for a coherent thesis (plan → code → ship → observe → optimise), credible peer patterns in their industry, and a clear answer on measurement. Demo-heavy meetings lose them. A tight exec narrative plus a peer conversation wins.

## Conversation posture
Stay at strategy: delivery risk, AI investment ROI, platform consolidation, and competitive velocity. Redirect feature depth to VP Eng / Head of Platform.`,
   sections:[
    {title:"Priorities & metrics",open:true,content:`- Board-ready story on engineering productivity and AI tooling ROI (not vanity usage metrics)
- Predictable delivery against product roadmap and revenue commitments
- Risk posture: security, compliance, availability SLOs
- Talent: retain senior engineers by reducing toil and improving the development workflow
- Platform consolidation — fewer point tools, clearer ownership
- DORA-style outcomes: deployment frequency, lead time, change failure rate, MTTR — framed as business outcomes, not dashboards`},
    {title:"Common pains",open:false,content:`- AI coding spend is rising while shipping confidence and review burden feel worse, not better
- Fragmented toolchain (planning, CI, CD, security, cost) with no single delivery narrative for the board
- Security and compliance framed as brakes on velocity — they want both, not a trade-off speech
- Platform team capacity trapped in maintaining glue code instead of product leverage
- No clean answer to "are we safer and faster than last year?" with evidence`},
    {title:"Weak vs strong SDR messaging",open:false,content:`**Weak**
- Feature laundry lists ("we do CI, CD, security, FinOps…")
- Vendor-centric "AI platform" buzz without tying to their board narrative
- Asking for a demo in the first touch

**Strong**
- Velocity vs verification gap: more code in ≠ more safe releases out
- One platform spanning plan → code → deploy → observe → cost, so they can tell one story upward
- Peer-pattern language: "organisations your size are measuring AI impact at the *deployment* layer, not the IDE layer"
- Offer a 20-minute exec framing call + optional peer intro — not a product walkthrough`},
    {title:"Discovery questions",open:false,content:`- How do you currently report AI coding-tool ROI to the board or exec team?
- When productivity metrics look up but review time and incidents also rise — how do you reconcile that?
- What is the single biggest risk between a merge and a safe production release in your org today?
- If you had to cut three delivery tools next year, which ones would survive — and why?
- Who owns the question "is our software delivery getting safer as we go faster?"`},
    {title:"Objections",open:false,content:`**"We're standardised on our current cloud/dev stack"**
Acknowledge the investment. Position Relay as the governance and verification layer across plan-to-prod — not a forced rip-and-replace of every IDE or cloud console.

**"Our platform team is building this"**
Ask timeline and opportunity cost. Internal platforms often spend half their capacity on maintenance. Relay is the managed substrate so their team can build golden paths and product-facing capabilities.

**"VP Eng is running the evaluation"**
Equip the VP with the CTO-level narrative. Deals stall when champions sell features while the CTO needs strategic framing.`},
    {title:"Relevant SDLC stages",open:false,content:`**Plan → Code → Build → Secure → Deploy → Observe → Optimise**

CTO conversations usually open on Code (AI impact) and Deploy/Observe (risk), then expand to Secure and Optimise for board defensibility. Plan matters when they care about portfolio visibility and work-item-to-release traceability.`},
    {title:"Relevant Relay modules",open:false,content:`- **Relay Insights** — delivery and AI-vs-human outcome metrics for exec reporting
- **Relay CD** — progressive delivery, policy gates, release verification
- **Relay Secure** — security in the path to production, not a side dashboard
- **Relay Cost** — cloud and idle-environment spend tied to teams and pipelines
- **Relay Portal** — standardised paths so strategy becomes self-service for teams
- **Relay Code** — AI-assisted development aligned to org standards (when they own the IDE story)`},
  ]},

  {id:"vpe",e:"👨‍💼",c:A,title:"VP Engineering",role:"Economic Buyer / Champion",
   short:"Owns DORA outcomes, developer productivity, and the internal business case. At mid-market often signs; at enterprise sells upward to CTO/Finance.",
   sa:"Build the ROI model *with* them during discovery. They will reuse that model with Finance — if you wait for procurement, you are already late.",
   d:`## VP Engineering
The most common Relay champion. Measured on throughput, quality, and team health. Increasingly asked to prove that AI coding tools improve *delivery*, not just commit volume.

## What good looks like
They leave discovery with a quantified current-state cost (tooling + toil + failure cost), a proposed PoC scope, and language they can use in an exec update.`,
   sections:[
    {title:"Priorities & metrics",open:true,content:`- Deployment frequency, lead time, change failure rate, MTTR
- Time-to-first-PR for new hires; reviewer load; on-call burden
- AI adoption metrics that survive CFO scrutiny (ship rate, failure rate by origin — not seat utilisation alone)
- Platform/team productivity without headcount growth
- Reduction in pipeline and release coordination toil`},
    {title:"Common pains",open:false,content:`- DORA metrics flat despite AI tool rollout
- Nightly/weekend deployment fire drills and manual rollbacks
- Tool sprawl: CI here, CD there, scanners elsewhere, cost in a spreadsheet
- Platform backlog forever behind "make pipelines not suck" tickets
- Pressure to go faster *and* reduce incidents with the same headcount`},
    {title:"Weak vs strong SDR messaging",open:false,content:`**Weak**
- "We replace your CI/CD" without acknowledging sunk cost
- Abstract "developer happiness" with no metrics hook
- Generic ROI claims without asking for their numbers

**Strong**
- Open on their scorecard: "Where is change failure rate or lead time stuck?"
- Propose a two-week PoC on one greenfield service — not a migration programme
- Quantify toil: engineers maintaining pipelines vs building product
- Offer to co-author the internal one-pager they will take to CTO/Finance`},
    {title:"Discovery questions",open:false,content:`- What does your DORA or engineering health scorecard look like today — biggest gap?
- How long from merge to production for a typical service? Where does time accumulate?
- When a bad deploy lands, how do you detect it and how do you roll back?
- Are you measuring change failure rate differently for AI-assisted vs human-authored changes?
- How many tools sit between commit and production, and who maintains each?`},
    {title:"Objections",open:false,content:`**"We already have CI/CD"**
Ask who maintains it and what breaks. Frame Relay as reducing operational burden and adding verification/governance — coexistence first, consolidation later.

**"We're not ready for a platform migration"**
Agree. Start net-new. Migration is earned after a PoC proves value on one team.

**"We can't show ROI yet"**
Build TCO live: pipeline maintenance FTE + incident cost + idle cloud waste. Their numbers, not yours.`},
    {title:"Relevant SDLC stages",open:false,content:`Heavy on **Build, Secure, Deploy, Observe**. **Code** when AI measurement is the executive pressure. **Optimise** when cloud/FinOps is co-owned. **Plan** when release trains and work-item traceability are pain points.`},
    {title:"Relevant Relay modules",open:false,content:`- **Relay CI** + **Relay CD** — core delivery spine
- **Relay CD** release verification — post-deploy health checks and automated rollback paths
- **Relay Insights** — DORA + AI delivery analytics
- **Relay Secure** — policy gates without manual review bottlenecks
- **Relay Portal** — golden paths that encode standards
- **Relay Cost** — when Finance is in the approval chain`},
  ]},

  {id:"platform",e:"🛠️",c:A,title:"Head of Platform",role:"Technical Champion / Potential Blocker",
   short:"Owns the internal developer platform and delivery standards. Win their technical respect and the deal accelerates; lose them and it dies quietly.",
   sa:"Let them drive the evaluation. Ask: 'What would you need to see in two weeks to recommend Relay to your VP?' Agree success criteria before any demo.",
   d:`## Head of Platform
Titles vary: Head of Platform Engineering, Platform Architect, Staff Infra. They evaluate integration model, YAML/IaC story, lock-in, and whether Relay reduces or increases their operational load.

## Success pattern
Peer-to-peer technical depth, a PoC they control, and explicit respect for existing Jenkins/Actions/Argo investments.`,
   sections:[
    {title:"Priorities & metrics",open:true,content:`- % of services on golden paths / standardised pipelines
- Ticket volume for "please set up CI/CD/infra"
- Mean time to provision a new service
- Pipeline reliability and maintenance hours per week
- Adoption of self-service vs ticket-driven workflows
- Security/policy coverage without per-repo snowflake YAML`},
    {title:"Common pains",open:false,content:`- Fragile glue between CI, CD, secrets, scanners, and cloud accounts
- Every team invents a slightly different pipeline; upgrades become archaeology
- Security asks for org-wide gates with no extra headcount
- Fear of vendor lock-in vs the reality of custom scripts nobody wants to own
- Being paged for tooling failures that look like product incidents`},
    {title:"Weak vs strong SDR messaging",open:false,content:`**Weak**
- Demo-first "watch me click through the UI"
- "Rip out Argo/Jenkins this quarter"
- Hand-waving network/security architecture questions

**Strong**
- Architecture-first: how Relay agents/delegates talk outbound, where secrets live, how pipelines are expressed as code
- Coexistence: net-new on Relay, legacy stays until it hurts
- Ask them what *they* would test; schedule SE pairing
- Position Relay as plumbing so they can ship IDP capabilities, not maintain agents`},
    {title:"Discovery questions",open:false,content:`- Walk me through the current delivery stack — what connects to what, who maintains each piece?
- If you had to add a mandatory security or policy step to every pipeline tomorrow, how long would that take?
- How do rollbacks work today — automated, runbook, or hope?
- What percentage of platform capacity is maintenance vs new developer-facing capability?
- What would make you recommend a vendor platform vs continuing to build?`},
    {title:"Objections",open:false,content:`**"Outbound-only control plane sounds wrong"**
Be ready with the architecture: agent initiates outbound connections; no inbound firewall holes required for the common model. Offer a diagram session.

**"We've invested heavily in current tooling"**
Validate. Propose greenfield first. Migration is opportunistic after incidents, not a big bang.

**"This is lock-in"**
Contrast: pipelines as standard YAML + Terraform provider vs years of custom plugins and scripts. Lock-in already exists — ask which kind they prefer.

**"We could build this"**
Ask calendar time and what they would *not* build while doing it. Usually 6–12 months of developer-facing work deferred.`},
    {title:"Relevant SDLC stages",open:false,content:`**Plan** (catalog/templates), **Build**, **Secure**, **Deploy**, **Observe**, **Optimise**. Platform leaders span the full value stream; they care that Code-stage AI tools don't bypass their standards.`},
    {title:"Relevant Relay modules",open:false,content:`- **Relay Portal** — service catalog, golden paths, scorecards
- **Relay CI** / **Relay CD** — standardised pipelines and environments
- **Relay Secure** — org-wide policy and scanner orchestration
- **Relay Infra** — infra provisioning with guardrails
- **Relay Cost** — idle non-prod and attribution by team/service
- **Relay Flags** — progressive exposure without separate vendors`},
  ]},

  {id:"devops",e:"⚙️",c:WA,title:"Director of DevOps",role:"Technical Influencer / Co-Champion",
   short:"Owns pipelines, release operations, and environment promotion. Practical, incident-scarred, allergic to slideware.",
   sa:"Anchor on the last painful release: 'Walk me through the last bad deploy — detection, people on the bridge, rollback.' Then map Relay CD and its release verification to those exact steps.",
   d:`## Director of DevOps
Often the person who still gets called when releases go sideways. Overlaps with platform in smaller orgs; in larger orgs focuses on CI/CD operations, release trains, and environment reliability.

## How to win
Concrete runbooks, rollback stories, and a PoC that shortens a real release path — not a futuristic platform vision.`,
   sections:[
    {title:"Priorities & metrics",open:true,content:`- Release success rate; rollback time; change failure rate
- Pipeline queue time and flaky-test burden
- Environment parity (dev/stage/prod drift)
- On-call pages attributable to delivery tooling
- Lead time for hotfix vs standard release`},
    {title:"Common pains",open:false,content:`- Manual approval chains and spreadsheet release coordination
- Flaky tests stretching pipelines; no test impact analysis
- Secrets and credentials sprawled across jobs
- "It worked in staging" — config and image drift
- Weekend release windows because weekday risk feels too high`},
    {title:"Weak vs strong SDR messaging",open:false,content:`**Weak**
- Abstract "DevOps transformation"
- Ignoring their current pipeline DSL and agent farm realities
- Promising zero-touch everything on day one

**Strong**
- Speak release mechanics: canary, blue/green, automated verification, one-click/auto rollback
- Respect coexistence with existing CI
- Offer to instrument *one* service's deploy path end-to-end
- Quantify: people on the bridge × hours × loaded cost per bad release`},
    {title:"Discovery questions",open:false,content:`- How often do you deploy to production, and what still requires a human coordinator?
- Last production incident caused by a deploy — timeline from detect to recover?
- How long does the full test suite run? How much of it is relevant to a typical change?
- How are secrets injected today — and who can see them?
- What would need to be true for you to allow more weekday production deploys?`},
    {title:"Objections",open:false,content:`**"Our releases are fine"**
Ask for the last three incidents and the manual steps still on the critical path. "Fine" often means heroic people, not reliable systems.

**"We can't change prod process mid-quarter"**
PoC on non-critical or net-new service; keep prod process intact until evidence exists.

**"CI is already GitHub Actions / Jenkins"**
Keep it. Relay CD with release verification as the delivery and intelligence layer is a common entry.`},
    {title:"Relevant SDLC stages",open:false,content:`**Build → Secure → Deploy → Observe**. Adjacent **Optimise** when pipeline compute waste or idle environments show up on the bill.`},
    {title:"Relevant Relay modules",open:false,content:`- **Relay CD** — orchestration, progressive delivery strategies, approvals as code, release verification, and automatic rollback
- **Relay CI** — if CI maintenance or impact-based test selection is the wedge
- **Relay Secure** — scanners and gates in the same pipeline
- **Relay SRE** — change intelligence tied to incidents`},
  ]},

  {id:"seceng",e:"🔐",c:ER,title:"Security Engineering Lead",role:"Blocker or Approver",
   short:"Owns AppSec/DevSecOps outcomes: findings developers will act on, supply chain, and policy in the delivery path. Can veto or become the loudest champion.",
   sa:"Lead with their remediation reality, not a scanner list: 'What percent of SAST findings do developers actually fix?' Pause. That answer *is* the Relay Secure conversation.",
   d:`## Security Engineering Lead
May be AppSec lead, DevSecOps lead, or Product Security manager. They live in the gap between scanner noise and developer trust. Threat-model and exploitability language beats feature matrices.

## Trust unlocks
Clear data-flow (where code and secrets go), reachability/prioritisation story, and pipeline gates that block real risk without drowning teams in FPs.`,
   sections:[
    {title:"Priorities & metrics",open:true,content:`- Remediation rate and mean time to remediate criticals
- False-positive / noise ratio developers will tolerate
- Coverage: % of pipelines with mandatory scans and policy gates
- SBOM / supply-chain readiness for customer and auditor asks
- AI/code-assistant risk: vulnerable patterns shipping faster than review`},
    {title:"Common pains",open:false,content:`- Developers mute scanners because 80%+ of findings feel irrelevant
- Security tickets that land after code is already on a release train
- No single view across SAST, SCA, containers, secrets, and IaC tools
- East-west / service-to-service behaviour poorly understood
- Shadow AI tools with unknown data access`},
    {title:"Weak vs strong SDR messaging",open:false,content:`**Weak**
- "We have more scanners"
- Compliance checkbox theatre without exploitability
- Surprising them late in a deal after Eng already chose a path

**Strong**
- Signal over noise: actionable, reachable findings in PR/pipeline
- Security as a deploy gate, not a weekly dashboard ritual
- Inventory + guardrails for AI-assisted development
- Parallel track with Eng — never make Security the last gate surprise`},
    {title:"Discovery questions",open:false,content:`- What share of current SAST/SCA findings get remediated vs deferred forever?
- How many security tools feed developers today — one queue or five portals?
- When a critical CVE hits a transitive dependency, how fast do you know affected services?
- How do you see unusual behaviour between internal services today?
- Do you have an inventory of AI coding tools and agents and what data they can touch?`},
    {title:"Objections",open:false,content:`**"We already standardised on Scanner X"**
Position Relay Secure as orchestration and prioritisation on top — ingest existing tools; improve developer actionability.

**"Where does our source code go?"**
Explain agent-in-VPC / outbound model: builds and secrets stay in their boundary; control plane coordinates. Offer architecture review with their security architecture team.

**"Another dashboard will be ignored"**
Agree. Sell pipeline enforcement for critical+reachable issues; dashboards are secondary.`},
    {title:"Relevant SDLC stages",open:false,content:`Primary: **Secure**, with enforcement into **Build** and **Deploy**. **Code** for AI-assisted risk. **Observe** for runtime/API behaviour. **Plan** when risk must attach to tickets and release evidence.`},
    {title:"Relevant Relay modules",open:false,content:`- **Relay Secure** — scanner orchestration, reachability prioritisation, policy gates
- **Relay CD** — cannot-bypass path for production
- **Relay Supply** — SBOM, provenance, dependency evidence
- **Relay SRE** — runtime signals tied to change
- **Relay Code** — secure defaults and policy hints in the AI coding workflow`},
  ]},

  {id:"em",e:"👷",c:MU,title:"Engineering Manager",role:"Influencer / User Champion",
   short:"Owns team delivery commitments, review load, and on-call quality of life. Feels toolchain pain daily; rarely owns platform budget alone.",
   sa:"Make it about their team's week: 'How many hours did your team lose last sprint to flaky pipelines, review thrash, or deploy babysitting?' Relay has to give those hours back.",
   d:`## Engineering Manager
The EM translates platform decisions into sprint reality. They care about predictability for their roadmap, reviewer burnout, and whether new tools create more process than leverage.

## Motion
Use them to pressure-test golden paths and to champion a team-level PoC. Bring VP Eng for budget; bring Platform for standards.`,
   sections:[
    {title:"Priorities & metrics",open:true,content:`- Sprint predictability and escaped defects
- PR cycle time and review latency
- On-call pages per engineer; after-hours deploys
- New hire time to first production change
- Team satisfaction with local development tooling and CI feedback time`},
    {title:"Common pains",open:false,content:`- AI PRs that look complete but need heavy human rework
- CI waits and flakes that burn focus time
- Deploying feels risky so batches get large — then riskier
- Context switching across Jira-like planning, IDE, CI UI, cloud consoles
- Being measured on output while platform friction is invisible upward`},
    {title:"Weak vs strong SDR messaging",open:false,content:`**Weak**
- Org-wide transformation talk with no team-level win
- Ignoring their planning/ticketing workflow
- Selling to them as if they control platform budget

**Strong**
- Team PoC: one service, clearer PR checks, safer deploys, faster feedback
- Tie to their OKRs (reliability, cycle time)
- Show how Relay Plans + Code + CD reduces tool hopping
- Ask them to be the reference team for Platform/VP Eng`},
    {title:"Discovery questions",open:false,content:`- What slows a typical story from "in progress" to "in production" on your team?
- How much of code review time is spent on AI-assisted changes vs carefully authored ones?
- What does your team do when CI is red for reasons that aren't their bug?
- How often do you batch releases because deploys feel heavy?
- If platform offered a golden path tomorrow, what would your team need to actually adopt it?`},
    {title:"Objections",open:false,content:`**"We don't have time to evaluate tools"**
Frame PoC as replacing an existing painful path for one service — net time saved inside the trial window.

**"Platform decides this"**
Agree. Ask for their success criteria so Platform hears user pull, not vendor push.

**"Another portal will be ignored"**
Golden path must be the easiest path — if Relay is harder than snowflake scripts, they will route around it.`},
    {title:"Relevant SDLC stages",open:false,content:`**Plan** (work clarity), **Code** (fast coding feedback), **Build** (fast signal), **Deploy** (safe release), **Observe** (own their services).`},
    {title:"Relevant Relay modules",open:false,content:`- **Relay Plans** — work linked to pipelines and releases
- **Relay Code** — AI assist inside standards
- **Relay CI** — faster, smarter feedback
- **Relay CD** / **Relay Test** — less babysitting, reliable pipelines
- **Relay Portal** — self-service path their team will actually use`},
  ]},

  {id:"dx",e:"✨",c:A,title:"Developer Experience Lead",role:"Technical Champion — Portal & Golden Paths",
   short:"Owns onboarding, golden paths, scorecards, and whether developers *choose* the paved road. Success is adoption, not toolchain completeness.",
   sa:"Ask: 'How long to first production deploy for a new engineer — and what are the top three papercuts?' That list is your Relay Portal demo script.",
   d:`## Developer Experience Lead
Sometimes titled DevEx, Developer Productivity, or IDP owner. Obsessed with friction measurements and paved-road adoption. Sceptical of platforms that look powerful in demos but lose to copy-paste YAML in practice.`,
   sections:[
    {title:"Priorities & metrics",open:true,content:`- Time-to-first-commit / time-to-first-production change
- % of services on approved templates
- Self-service success rate vs ticket backlogs
- Developer NPS / frustration themes from surveys
- Cognitive load: number of systems touched to ship a change`},
    {title:"Common pains",open:false,content:`- Beautiful docs nobody follows; real knowledge in tribal Slack threads
- Scorecards that shame teams without offering a fix button
- IDP projects that become another static catalog
- AI coding tools that bypass org conventions and create review debt
- Platform engineering and DevEx goals misaligned (control vs delight)`},
    {title:"Weak vs strong SDR messaging",open:false,content:`**Weak**
- "Internal developer portal" buzzword dump
- Catalog-only story with no create-and-deploy path
- Ignoring software catalog + scorecard politics

**Strong**
- Golden path: create service → CI → secure defaults → deploy → observe in one flow
- Measure adoption weekly during PoC
- Integrate with their existing work tracker and SCM
- Frame Relay as the execution engine behind DevEx, not a competing "portal brand"`},
    {title:"Discovery questions",open:false,content:`- What is median time for a new hire to ship something meaningful to production?
- Which steps are ticket-driven that should be self-service?
- Do you have scorecards today — and do teams have an automated way to remediate failing checks?
- How do AI coding tools interact with your paved road (templates, linters, pipeline standards)?
- What would make developers prefer the golden path over escaping to DIY?`},
    {title:"Objections",open:false,content:`**"We're building our own portal on backstage-like stacks"**
Offer Relay as the workflow and delivery backend powering templates — coexist with an existing catalog UI if needed.

**"Developers won't leave their current tools"**
Meet them in SCM/IDE/work tracker; portal is orchestration, not a prison.

**"We tried an IDP and adoption failed"**
Diagnose: catalog without path-to-prod. Lead with create→deploy, not metadata.`},
    {title:"Relevant SDLC stages",open:false,content:`Entire loop, with emphasis on **Plan**, **Code**, **Build**, **Deploy**. DevEx wins when **Secure** and **Optimise** defaults are invisible good defaults.`},
    {title:"Relevant Relay modules",open:false,content:`- **Relay Portal** — catalog, templates, scorecards, self-service actions
- **Relay Plans** — work-item linkage and release visibility
- **Relay Code** — standards-aware AI assistance
- **Relay CI** / **Relay CD** — paved-road execution
- **Relay Insights** — friction and adoption analytics`},
  ]},

  {id:"finops",e:"💰",c:TL,title:"FinOps / Cloud Cost Owner",role:"Economic Buyer / Influencer — Cost Module",
   short:"Owns cloud spend visibility, attribution, waste elimination, and increasingly AI/inference cost governance. Speaks finance and engineering.",
   sa:"Open with a number they feel: 'What percent of non-production spend runs idle nights and weekends — and how long to attribute last month's spike to a team?' Relay Cost answers both.",
   d:`## FinOps / Cloud Cost Owner
May report to CTO, CIO, or Finance with a dotted line to Eng. They need showback/chargeback, automation that actually stops waste (not only alerts), and a story for AI-related cloud and API spend.`,
   sections:[
    {title:"Priorities & metrics",open:true,content:`- Unit cost trends; budget variance; forecast accuracy
- % of spend attributed to team/service/environment
- Idle/waste eliminated (especially non-prod)
- Commitment coverage (RIs/Savings Plans) with less spreadsheet heroics
- Emerging: cost per AI workload / agent / pipeline minute`},
    {title:"Common pains",open:false,content:`- Month-end bill shock with slow root-cause ("which team?")
- Dev/test left up 24/7 "just in case"
- Multi-cloud tools that don't automate remediation
- Engineering ignores cost tickets without self-service guardrails
- AI/API spend appearing as opaque lines with no owner`},
    {title:"Weak vs strong SDR messaging",open:false,content:`**Weak**
- Generic "save 30% on cloud" without their topology
- Rightsizing lecture before quick-win idle stoppage
- Ignoring that VP Eng often holds budget

**Strong**
- Auto-stop/idle policies with on-demand wake — month-one ROI story
- Same controls for classic cloud waste and delivery/AI-adjacent spend
- Co-sponsor motion: FinOps validates ROI, Eng owns platform choice
- Live showback tied to Relay pipelines and environments`},
    {title:"Discovery questions",open:false,content:`- How long did it take to explain the last cloud spend spike to leadership?
- What share of non-prod runs outside business hours with no active users?
- Are commitment purchases manual calendar events or policy-driven?
- Can you attribute pipeline/build minutes and AI-related usage to teams today?
- What cost guardrails exist *before* resources are created — not only after invoicing?`},
    {title:"Objections",open:false,content:`**"We have native cloud cost consoles"**
Single-cloud and often report-only. Relay Cost is multi-cloud, tied to delivery environments, and can act (idle stop) not just alert.

**"Auto-stopping will break developers"**
Wake-on-demand, team-level allowlists, exclude sticky environments. Most teams keep workflow; they lose idle burn.

**"FinOps doesn't own the tool budget"**
Align VP Eng as economic buyer; FinOps as ROI owner presenting to CTO/CFO together.`},
    {title:"Relevant SDLC stages",open:false,content:`**Optimise** primarily; strong hooks into **Build** (CI compute) and **Deploy** (environment sprawl). **Observe** for correlating cost anomalies with change.`},
    {title:"Relevant Relay modules",open:false,content:`- **Relay Cost** — attribution, idle automation, budgets, anomalies
- **Relay CD** / **Relay Infra** — environment lifecycle controls
- **Relay CI** — build-minute waste and cache efficiency
- **Relay Insights** — cost alongside delivery metrics for exec views
- **Relay Portal** — self-service with cost policies baked into templates`},
  ]},

];
