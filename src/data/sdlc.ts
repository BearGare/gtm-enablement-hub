import { A, TL, WA, ER, MU } from "../colors";
import type { Item } from "../types";

export const SDLC_INTRO = `The Software Delivery Lifecycle (SDLC) is the repeating process engineering organisations use to plan, build, secure, ship, and improve software. It is not a one-time project — it is a continuous loop.

## Thin inner loop vs outer loop

**Inner loop (Plan + Code)** is what an individual developer does day to day: shape work, write and review changes, stay in flow. Relatively little calendar time — maximum focus value. The goal is fast feedback with minimal ceremony.

**Outer loop (Build → Secure → Deploy → Observe → Optimise)** is everything after code leaves a laptop: compile and test, scan and attest, progressively deliver, run production safely, and feed cost and bottleneck data back into the next plan. This is where most organisational risk, governance, and automation live.

## Why Relay's GTM conversation starts here

AI coding tools accelerate the thin inner loop — individuals produce changes faster than ever. Many enterprises still run an outer loop designed for slower input. The bottleneck moves from "can we write enough code?" to "can we safely build, secure, and ship what we wrote — then learn?"

**Relay** is the integrated platform story for closing that AI-coding → shipping gap: one control plane from roadmap visibility through CI, policy, progressive delivery, incident intelligence, FinOps, and engineering insights — so velocity in the editor does not become chaos in production.`;

export const SDLC_STAGES: Item[] = [
  {
    id: "plan",
    loop: "inner",
    st: "Plan",
    title: "Plan",
    e: "📋",
    c: A,
    short: "Roadmap, backlog, and delivery-aware commitments",
    mods: ["Relay Plans", "Relay Portal", "Relay Insights"],
    d: `## Planning — what it is
Planning turns business goals into sequenced, estimable work. Product and engineering agree what matters, who owns it, and what "done" means before code starts. Good planning produces a shared model of capacity and dependency — not a wish list.

## Who's involved
Product managers, engineering managers, tech leads, and often platform partners who know shared-service constraints.

## What "good" feeds forward
A groomed set of work items that map to real services and owners. Poor planning shows up later as thrash in Code and surprises in Deploy.

## Why Relay cares here
AI coding increases how fast Code can run. Plans and Insights keep commitments honest; Portal stops duplicate services from being invented mid-initiative.`,
    sections: [
      {
        title: "📚 What happens here",
        content: `Roadmap shaping, backlog refinement, capacity planning, architecture spikes, and definition of ready/done.\n\n**Common tools:** Jira, Linear, Azure Boards, Confluence, Notion, Miro.`,
      },
      {
        title: "⚠️ Typical enterprise problems",
        content: `• Roadmap status disconnected from pipeline reality\n• Dependencies discovered mid-sprint\n• Commitments based on hope, not throughput data\n• Unclear service ownership for new work\n• Planning theatre — long ceremonies, little decision quality`,
      },
      {
        title: "👤 Buyer / persona relevance",
        content: `**VP Product / PMM:** Predictability and narrative for executives.\n**VP Eng / Eng Manager:** Capacity truth and dependency risk.\n**Platform lead:** Prevents shadow services and one-off stacks.\n**Transformation office:** Evidence that process change moved lead time.`,
      },
      {
        title: "📡 Public account signals to listen for",
        content: `• Hiring bursts for PMs / eng managers alongside "delivery predictability" language in earnings or blogs\n• Public posts about SAFe / OKR resets or "operating model" changes\n• Open roles for "platform product manager" or "developer experience"\n• Conference talks on flow metrics or "value stream" programmes\n• Customer complaints (app reviews / status pages) about slow feature cadence`,
      },
      {
        title: "🧩 Relay module fit",
        content: `**Relay Plans** — roadmap tied to services and live delivery signals.\n**Relay Portal** — catalog truth for what already exists before scoping new builds.\n**Relay Insights** — bottleneck and DORA inputs to make commitments realistic.`,
      },
      {
        title: "🎣 Outbound hooks",
        content: `• "Noticed your team is scaling eng — how are roadmap and delivery staying in sync?"\n• "If AI coding doubled PR volume, would planning still see the same bottlenecks?"\n• "Happy to share how teams connect backlog intent to pipeline reality without another status meeting."`,
      },
      {
        title: "✅ Qualification questions",
        content: `• How do product and eng reconcile conflicting status today?\n• What data informs sprint or quarterly commitment?\n• Can you name owners for the top 20 services in an initiative?\n• Where did the last major slip actually get stuck — plan, code, CI, or release?\n• Who consumes delivery metrics in planning forums?`,
      },
      {
        title: "🛡️ Common objections",
        content: `**"Our tracker is fine"** → Tracker holds tickets; it rarely proves shipping health.\n**"We'll fix process, not buy software"** → Process without system signals regresses; Relay makes signals continuous.\n**"Too early / too chaotic"** → Chaos is when Plans + Insights pay off most — start with one value stream.`,
      },
    ],
  },
  {
    id: "code",
    loop: "inner",
    st: "Code",
    title: "Code",
    e: "💻",
    c: MU,
    short: "Write, understand, review, and merge changes",
    mods: ["Relay Code", "Relay Portal", "Relay Secure"],
    d: `## Coding — what it is
Coding turns planned work into reviewable changes. Developers navigate the codebase, implement increments, and use peer review before merge. AI assistants accelerate authoring; review, architecture fit, and security awareness remain the constraints.

## Who's involved
Software engineers, tech leads, occasional AppSec in review, DevEx for environment and tooling support.

## What "good" feeds forward
Small, reviewed merges that CI can validate quickly. Large unreviewed batches push defect discovery into Build, Secure, and production.

## Why Relay cares here
Relay Code accelerates understanding and PR quality; Secure and Portal wrap changes in org standards before the outer loop pays the cost.`,
    sections: [
      {
        title: "📚 What happens here",
        content: `Implementation, local validation, pair programming, AI-assisted edits, pull requests, and code review.\n\n**Common tools:** VS Code, JetBrains, GitHub/GitLab, Copilot-class assistants, Cursor-class editors.`,
      },
      {
        title: "⚠️ Typical enterprise problems",
        content: `• Review queues explode as AI increases PR volume\n• Onboarding takes months due to tribal codebase knowledge\n• Inconsistent environments ("works on my machine")\n• Rubber-stamp reviews under deadline pressure\n• Security feedback arrives days after merge`,
      },
      {
        title: "👤 Buyer / persona relevance",
        content: `**VP Eng / DevEx:** Productivity and review SLA.\n**Tech leads:** Architecture coherence and PR quality.\n**AppSec:** Shift-left without a separate ticket pile.\n**Eng managers:** Cycle time and interruption cost.`,
      },
      {
        title: "📡 Public account signals to listen for",
        content: `• Blog posts or jobs mentioning AI coding rollout / "Copilot at scale"\n• Engineering brand content about monorepo migration or "developer productivity"\n• Open source activity spikes (many small repos, uneven review norms)\n• Glassdoor / eng blog themes: slow reviews, flaky tooling, painful onboarding\n• Security advisories that cite insecure coding patterns in their stack`,
      },
      {
        title: "🧩 Relay module fit",
        content: `**Relay Code** — codebase understanding, contextual edits, PR assist.\n**Relay Portal** — find the right service, templates, and owners.\n**Relay Secure** — PR-time scanning so issues don't wait for a weekly gate.`,
      },
      {
        title: "🎣 Outbound hooks",
        content: `• "Seeing AI coding adoption in your eng blog — how's review latency holding up?"\n• "Teams often find the bottleneck moved from typing to PR queues; curious if that's familiar."\n• "Happy to compare notes on keeping PR quality high when volume jumps."`,
      },
      {
        title: "✅ Qualification questions",
        content: `• Median PR open → merge time?\n• Typical PR size and review depth?\n• How do new hires find ownership and patterns?\n• Are AI-generated changes reviewed differently?\n• When does security first see a change — PR or later?`,
      },
      {
        title: "🛡️ Common objections",
        content: `**"We already pay for an AI coding tool"** → Keep it. Relay Code + delivery modules address review quality and shipping, not autocomplete.\n**"Developers won't change IDEs"** → Meet them in existing editors and the PR.\n**"More AI means more risk"** → Pair Code with Secure gates; don't slow authoring, raise merge standards.`,
      },
    ],
  },
  {
    id: "build",
    loop: "outer",
    st: "Build",
    title: "Build",
    e: "⚡",
    c: WA,
    short: "Compile, test, and package artifacts",
    mods: ["Relay Build", "Relay Supply", "Relay Insights"],
    d: `## Build — what it is
Build is the first outer-loop gate: compile, test, and produce a versioned artifact. It must be fast enough to preserve developer flow and strict enough to catch regressions before Secure and Deploy.

## Who's involved
Developers fixing breaks, QA / quality eng, platform teams owning runners and templates.

## What "good" feeds forward
A trustworthy artifact digest with known test evidence. Slow or flaky CI trains people to skip gates; that debt compounds downstream.

## Why Relay cares here
Relay Build absorbs AI-era merge volume with selective tests and caching; Supply records what was built; Insights shows when CI is the organisational bottleneck.`,
    sections: [
      {
        title: "📚 What happens here",
        content: `CI pipelines, unit/integration/E2E execution, linting, packaging, and publishing artifacts to a registry.\n\n**Common tools:** Jenkins, GitHub Actions, GitLab CI, build caches, Docker, language-native test runners.`,
      },
      {
        title: "⚠️ Typical enterprise problems",
        content: `• 30–60+ minute pipelines; lost developer flow\n• Flaky tests destroy trust in green builds\n• Fragmented CI estates across business units\n• Maintenance FTE on agents and plugins\n• Artifact provenance incomplete or manual`,
      },
      {
        title: "👤 Buyer / persona relevance",
        content: `**Platform / DevOps:** Runner cost, template governance, uptime of CI.\n**VP Eng:** Feedback latency and throughput.\n**QA leads:** Suite health and flake rate.\n**FinOps:** Build-minute and idle agent spend.`,
      },
      {
        title: "📡 Public account signals to listen for",
        content: `• Job posts for "CI engineers" / "build farm" / Jenkins admins\n• Engineering blogs about migrating off Jenkins or "CI minutes" pain\n• Open roles emphasising "developer productivity" with CI mentions\n• Public incidents tied to bad builds escaping to prod\n• Hiring for macOS / mobile build specialists (often expensive farms)`,
      },
      {
        title: "🧩 Relay module fit",
        content: `**Relay Build** — selective tests, caches, hosted runners, golden templates.\n**Relay Supply** — store digests with SBOM/attestation hooks.\n**Relay Insights** — quantify CI wait as a portfolio bottleneck.`,
      },
      {
        title: "🎣 Outbound hooks",
        content: `• "Curious how long a full CI run takes as your AI coding footprint grows."\n• "Teams often find flake + queue time eat the gains from faster coding — ring true?"\n• "Happy to share patterns for selective tests without coverage theatre."`,
      },
      {
        title: "✅ Qualification questions",
        content: `• p50 / p95 pipeline duration on main?\n• Flake rate and who owns quarantine?\n• How many CI systems exist org-wide?\n• What share of tests must run on every change?\n• Can you map a prod artifact to a pipeline run in one hop?`,
      },
      {
        title: "🛡️ Common objections",
        content: `**"Actions / Jenkins is fine"** → Fine until volume and governance break. Probe duration, flake, and template sprawl.\n**"Migration risk"** → Coexist; put new services on Relay Build first.\n**"We need every test every time"** → Selective execution with safety nets; Insights proves risk tradeoffs.`,
      },
    ],
  },
  {
    id: "secure",
    loop: "outer",
    st: "Secure",
    title: "Secure",
    e: "🛡️",
    c: ER,
    short: "Scan, prioritise, attest, and enforce policy",
    mods: ["Relay Secure", "Relay Supply", "Relay Portal"],
    d: `## Secure — what it is
Secure embeds vulnerability management, policy-as-code, and supply-chain provenance into delivery — not as a late gate. Findings must be actionable for developers and defensible for auditors.

## Who's involved
AppSec, DevSecOps, developers remediating, compliance / GRC, platform embedding scanners in golden paths.

## What "good" feeds forward
Only policy-cleared artifacts proceed to Deploy. Skipping Secure shifts cost into incidents and customer questionnaires.

## Why Relay cares here
Relay Secure reduces noise and enforces gates; Supply proves provenance; Portal assigns owners so vulns are not orphans.`,
    sections: [
      {
        title: "📚 What happens here",
        content: `SAST/SCA/container/secrets scanning, licence policy, SBOM/attestation, waiver workflows, and promote-time policy checks.\n\n**Common tools:** Commercial SAST/SCA suites, open-source scanners, policy engines, registry admission controllers.`,
      },
      {
        title: "⚠️ Typical enterprise problems",
        content: `• Alert fatigue from 80%+ non-actionable findings\n• Security as end-of-cycle gate → late, expensive fixes\n• CVE queues without owners\n• SBOM only assembled during audits\n• Inconsistent scanner sets per team`,
      },
      {
        title: "👤 Buyer / persona relevance",
        content: `**CISO / AppSec:** Risk reduction and audit evidence.\n**Platform:** Golden-path enforcement without tickets.\n**Developers:** PR-native feedback they trust.\n**Compliance:** Continuous control narrative.`,
      },
      {
        title: "📡 Public account signals to listen for",
        content: `• Breach disclosures or ransomware news in their sector (urgency, not fear-mongering)\n• Jobs for AppSec / product security / DevSecOps\n• Public SOC2 / ISO / FedRAMP pursuit language\n• Customer trust centre updates mentioning SBOM or secure SDLC\n• Open CVE response blogs showing manual process pain`,
      },
      {
        title: "🧩 Relay module fit",
        content: `**Relay Secure** — orchestrate scanners, dedupe, rank, policy-as-code.\n**Relay Supply** — SBOM + attestations on the artifact.\n**Relay Portal** — ownership and scorecards for remediation SLAs.`,
      },
      {
        title: "🎣 Outbound hooks",
        content: `• "How are you keeping vuln backlogs actionable as PR volume rises?"\n• "Noticed trust-centre language on SBOMs — is generation continuous or audit-driven?"\n• "Happy to compare notes on policy gates that developers don't route around."`,
      },
      {
        title: "✅ Qualification questions",
        content: `• MTT-remediate for criticals?\n• % of findings that ever close?\n• Scans on every PR or batch jobs?\n• Who owns waivers?\n• Can you block unsigned artifacts from prod today?`,
      },
      {
        title: "🛡️ Common objections",
        content: `**"We already bought scanners"** → Keep them; orchestration + prioritisation is the gap.\n**"Gates slow delivery"** → Unranked queues slow more; start with criticals on main.\n**"Developers ignore security"** → Put owners + PR annotations; measure close rate.`,
      },
    ],
  },
  {
    id: "deploy",
    loop: "outer",
    st: "Deploy",
    title: "Deploy",
    e: "🚀",
    c: A,
    short: "Progressive delivery, GitOps, and controlled release",
    mods: ["Relay Deploy", "Relay Flags", "Relay Infra"],
    d: `## Deploy — what it is
Deploy moves validated artifacts into environments and controls who sees what. Modern practice separates deploy (code on infrastructure) from release (user exposure) via progressive strategies and flags.

## Who's involved
Release / platform eng, SREs, DBAs for schema changes, product for flag decisions, CAB / change managers in regulated orgs.

## What "good" feeds forward
Healthy production with small blast radius and fast rollback. Observe and Optimise stages inherit clean change events for correlation and DORA.

## Why Relay cares here
Relay Deploy + Flags + Infra make shipping an integrated, verifiable motion — the heart of closing the AI-coding → production gap.`,
    sections: [
      {
        title: "📚 What happens here",
        content: `Environment promotion, canary/blue-green/rolling, GitOps reconciliation, feature exposure, infrastructure apply, and change records.\n\n**Common tools:** kubectl/Helm, Argo CD, Spinnaker, Terraform, flag vendors, ServiceNow.`,
      },
      {
        title: "⚠️ Typical enterprise problems",
        content: `• Deploy = big-bang release; high blast radius\n• Manual rollback tribal knowledge\n• No post-deploy verification beyond "pods healthy"\n• Infra changes out of band from app releases\n• Ticket theatre that doesn't reduce risk`,
      },
      {
        title: "👤 Buyer / persona relevance",
        content: `**VP Eng / Platform:** Deploy frequency and change failure rate.\n**SRE:** Rollback and verification.\n**Product:** Safe experimentation via flags.\n**Risk / change managers:** Auditable progressive delivery.`,
      },
      {
        title: "📡 Public account signals to listen for",
        content: `• Status-page incidents after releases; slow recovery narratives\n• Jobs for "release engineer", "GitOps", "platform SRE"\n• Blog posts on canary / feature-flag adoption\n• Migration announcements (VMs → Kubernetes, monolith → services)\n• Regulatory filings mentioning operational resilience / change management`,
      },
      {
        title: "🧩 Relay module fit",
        content: `**Relay Deploy** — progressive strategies, CV-style verification, GitOps, orchestration.\n**Relay Flags** — decouple deploy from release; kill switches.\n**Relay Infra** — governed Terraform/OpenTofu alongside app promote.`,
      },
      {
        title: "🎣 Outbound hooks",
        content: `• "When the last bad release hit, how fast did you know — and revert?"\n• "Are you still equating deploy with user-visible release?"\n• "Happy to share how teams add verification without ripping out GitOps."`,
      },
      {
        title: "✅ Qualification questions",
        content: `• Deploy frequency and change failure rate?\n• Automated rollback or runbook?\n• Canary / flags in production today?\n• How are multi-service releases coordinated?\n• Are infra applies in the same train as apps?`,
      },
      {
        title: "🛡️ Common objections",
        content: `**"Argo/Actions is enough"** → Probe verification, multi-service holds, and rollback automation.\n**"Flags are a separate purchase"** → Platform-integrated flags reduce tool sprawl and audit gaps.\n**"Too regulated for continuous deploy"** → Progressive delivery + approvals is how regulated teams move faster safely.`,
      },
    ],
  },
  {
    id: "observe",
    loop: "outer",
    st: "Observe",
    title: "Observe",
    e: "🩺",
    c: TL,
    short: "Detect, correlate, and respond in production",
    mods: ["Relay SRE", "Relay Deploy", "Relay Portal"],
    d: `## Observe — what it is
Observe is production awareness: metrics, logs, traces, alerts, and human response. The goal is not more graphs — it is fast understanding of impact and cause, especially "what changed?"

## Who's involved
SREs, on-call developers, platform reliability, incident commanders, communications partners for customer-facing events.

## What "good" feeds forward
Mitigations and learnings that Optimise turns into cost, reliability, and process improvements — and that Plan consumes next cycle.

## Why Relay cares here
Relay SRE adds change intelligence on top of existing observability stacks, wired to Deploy and Portal ownership.`,
    sections: [
      {
        title: "📚 What happens here",
        content: `Alerting, triage, incident response, customer communication, and timeline assembly.\n\n**Common tools:** Datadog, Grafana, Prometheus, Splunk, New Relic, PagerDuty, status pages.`,
      },
      {
        title: "⚠️ Typical enterprise problems",
        content: `• Alerts without change context → long MTTR\n• Alert fatigue; ignored pages\n• Runbooks stale or undiscoverable\n• Ownership unclear at 2am\n• Post-incident reviews delayed or blame-oriented`,
      },
      {
        title: "👤 Buyer / persona relevance",
        content: `**Head of SRE:** MTTR, toil, error budgets.\n**VP Eng:** Customer impact and engineering distraction.\n**Platform:** Shared on-call and service ownership hygiene.\n**Support / CX:** Faster, clearer incident narratives.`,
      },
      {
        title: "📡 Public account signals to listen for",
        content: `• Frequent or slow status-page updates\n• Hiring SRE / on-call / "reliability" roles in volume\n• Public postmortems admitting change-detection delays\n• Migrations to new observability vendors (tool churn)\n• Customer social spikes during incidents`,
      },
      {
        title: "🧩 Relay module fit",
        content: `**Relay SRE** — correlate alerts to deploys/flags/config; runbooks; timelines.\n**Relay Deploy** — provide the change events worth correlating.\n**Relay Portal** — owners, dependencies, scorecards during triage.`,
      },
      {
        title: "🎣 Outbound hooks",
        content: `• "When paging fires, how long to answer what changed?"\n• "Keeping Datadog — curious about the response layer above it."\n• "Teams often cut MTTR first by automating change correlation; worth a look?"`,
      },
      {
        title: "✅ Qualification questions",
        content: `• MTTR by severity?\n• How do you find the causative deploy/flag?\n• Runbook coverage for top services?\n• Toil vs novel work on-call split?\n• Time to publish an internal incident timeline?`,
      },
      {
        title: "🛡️ Common objections",
        content: `**"Observability vendor does AIOps"** → Telemetry ≠ change intelligence + approved action.\n**"AI will make it worse"** → Curated runbooks; human approval on risky steps.\n**"We need culture change not tools"** → Both; tools encode the correlation culture forgets at 2am.`,
      },
    ],
  },
  {
    id: "optimise",
    loop: "outer",
    st: "Optimise",
    title: "Optimise",
    e: "📈",
    c: TL,
    short: "Cost, bottlenecks, and feedback into the next plan",
    mods: ["Relay Cost", "Relay Insights", "Relay Plans"],
    d: `## Optimise — what it is
Optimise closes the loop: reduce cloud and delivery waste, expose systemic bottlenecks, and feed evidence into the next Plan. It is continuous improvement, not a quarterly slide.

## Who's involved
FinOps, platform, VPE / DevEx, SRE leaders, product partners updating roadmap tradeoffs.

## What "good" feeds forward
Cheaper non-prod, clearer constraints, and planning that uses throughput reality — so the inner loop's speed compounds instead of thrashing.

## Why Relay cares here
Relay Cost and Insights turn outer-loop telemetry into decisions; Plans consumes them so GTM conversations stay tied to measurable operating leverage.`,
    sections: [
      {
        title: "📚 What happens here",
        content: `Spend review, rightsizing, idle cleanup, DORA/flow analysis, bottleneck ranking, and roadmap reprioritisation.\n\n**Common tools:** Cloud cost explorers, CUDs/RIs spreadsheets, engineering metrics products, OKR reviews.`,
      },
      {
        title: "⚠️ Typical enterprise problems",
        content: `• Non-prod running 24/7 unowned\n• Metrics vanity without action\n• FinOps and eng lack shared service attribution\n• AI/build spend invisible next to classic IaaS\n• Planning ignores last quarter's bottleneck data`,
      },
      {
        title: "👤 Buyer / persona relevance",
        content: `**FinOps / CFO partners:** Margin and forecastability.\n**VP Eng:** Throughput and predictability.\n**Platform:** Prove golden-path ROI.\n**Product:** Trade feature work vs paying down delivery constraints.`,
      },
      {
        title: "📡 Public account signals to listen for",
        content: `• Earnings mentions of cost discipline / margin programmes\n• Jobs for FinOps, cloud economics, DevEx analytics\n• Blog posts on platform ROI or productivity strategy\n• Cloud commitment announcements without ownership model\n• Public "hiring freeze but efficiency" narratives`,
      },
      {
        title: "🧩 Relay module fit",
        content: `**Relay Cost** — attribution, idle control, rightsizing.\n**Relay Insights** — bottleneck and DORA truth.\n**Relay Plans** — feed evidence into the next commitment cycle.`,
      },
      {
        title: "🎣 Outbound hooks",
        content: `• "As coding sped up, did cloud and CI spend follow — with clear owners?"\n• "Where does a story wait longest in your SDLC — do you have proof?"\n• "Happy to share how teams tie FinOps and flow metrics back into planning."`,
      },
      {
        title: "✅ Qualification questions",
        content: `• Can you attribute spend to service owners cleanly?\n• Top bottleneck by wait time?\n• What % of non-prod is idle overnight?\n• Do planning forums use delivery metrics?\n• How is AI/build spend tracked?`,
      },
      {
        title: "🛡️ Common objections",
        content: `**"Native cost tools are enough"** → Invoices ≠ service ownership + automation.\n**"Developers hate metrics"** → System bottlenecks, not individual scorecards.\n**"We'll optimise later"** → Waste compounds with AI-era volume; start with idle non-prod.`,
      },
    ],
  },
];
