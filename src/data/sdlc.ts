import { A, TL, WA, ER, MU } from "../colors";
import type { Item } from "../types";

export const SDLC_INTRO = `The Software Delivery Lifecycle (SDLC) is the repeating stream engineering organisations use to decide what to build, make the change, prove it, ship it, run it, and learn. It is not a one-time project — and it is not two loops with different owners.

## One continuous value stream

Work moves through eight equal stages: **Plan → Code → Build → Test → Secure → Release → Operate → Improve**. Every stage can be a constraint. Relay covers the whole stream, but the GTM conversation starts where work is waiting — not with a pitch that every stage must change on day one.

## Find the bottleneck, then expand

Ask where a typical change loses the most calendar time: review queues, flaky CI, security backlogs, release windows, schema freezes, or incident toil. That stage is the wedge. Adjacent Relay modules are already there when the team is ready for the next constraint.

## Why this framing for Relay

Relay is a full-SDLC platform. Positioning against one "loop" implies Relay only matters after code leaves a laptop — which undersells Plans, Code, and Portal, and sounds like a vendor that needs an enemy. Constraint-first discovery matches how platform and eng leaders actually buy: fix the pain, then widen the golden path.`;

export const SDLC_STAGES: Item[] = [
  {
    id: "plan",
    st: "Plan",
    title: "Plan",
    e: "📋",
    c: A,
    question: "What should we build?",
    short: "Roadmap, backlog, and delivery-aware commitments",
    mods: ["Relay Plans", "Relay Portal", "Relay Insights"],
    friction: [
      "Roadmap status disconnected from pipeline reality",
      "Dependencies discovered mid-sprint",
      "Commitments based on hope, not throughput data",
      "Unclear service ownership for new work",
    ],
    metrics: ["Lead time to start", "WIP age", "Commitment accuracy", "Dependency wait time"],
    d: `## Planning — what it is
Planning turns business goals into sequenced, estimable work. Product and engineering agree what matters, who owns it, and what "done" means before code starts. Good planning produces a shared model of capacity and dependency — not a wish list.

## Who's involved
Product managers, engineering managers, tech leads, and often platform partners who know shared-service constraints.

## What "good" feeds forward
A groomed set of work items that map to real services and owners. Poor planning shows up later as thrash in Code and surprises in Release.

## Why Relay cares here
AI coding increases how fast Code can run. Plans and Insights keep commitments honest; Portal stops duplicate services from being invented mid-initiative.`,
    sections: [
      {
        title: "📚 What happens here",
        content: `Roadmap shaping, backlog refinement, capacity planning, architecture spikes, and definition of ready/done.\n\n**Common tools:** Jira, Linear, Azure Boards, Confluence, Notion, Miro.`,
      },
      {
        title: "⚠️ Friction signals",
        content: `• Roadmap status disconnected from pipeline reality\n• Dependencies discovered mid-sprint\n• Commitments based on hope, not throughput data\n• Unclear service ownership for new work\n• Planning theatre — long ceremonies, little decision quality`,
      },
      {
        title: "📐 Flow metrics",
        content: `Lead time to start · WIP age · Commitment accuracy · Dependency wait time`,
      },
      {
        title: "👤 Buyer / persona relevance",
        content: `**VP Product / PMM:** Predictability and narrative for executives.\n**VP Eng / Eng Manager:** Capacity truth and dependency risk.\n**Platform lead:** Prevents shadow services and one-off stacks.\n**Transformation office:** Evidence that process change moved lead time.`,
      },
      {
        title: "📡 Public account signals to listen for",
        content: `• Hiring bursts for PMs / eng managers alongside "delivery predictability" language\n• Public posts about OKR resets or "operating model" changes\n• Open roles for "platform product manager" or "developer experience"\n• Conference talks on flow metrics or value-stream programmes`,
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
        content: `• How do product and eng reconcile conflicting status today?\n• What data informs sprint or quarterly commitment?\n• Can you name owners for the top 20 services in an initiative?\n• Where did the last major slip actually get stuck?\n• Who consumes delivery metrics in planning forums?`,
      },
      {
        title: "🛡️ Common objections",
        content: `**"Our tracker is fine"** → Tracker holds tickets; it rarely proves shipping health.\n**"We'll fix process, not buy software"** → Process without system signals regresses; Relay makes signals continuous.\n**"Too early / too chaotic"** → Chaos is when Plans + Insights pay off most — start with one value stream.`,
      },
    ],
  },
  {
    id: "code",
    st: "Code",
    title: "Code",
    e: "💻",
    c: MU,
    question: "Is the change sound?",
    short: "Write, understand, review, and merge changes",
    mods: ["Relay Code", "Relay Portal", "Relay Secure"],
    friction: [
      "Review queues explode as AI increases PR volume",
      "Onboarding takes months due to tribal codebase knowledge",
      "Rubber-stamp reviews under deadline pressure",
      "Security feedback arrives days after merge",
    ],
    metrics: ["PR open → merge time", "PR size", "Review depth", "Rework rate"],
    d: `## Coding — what it is
Coding turns planned work into reviewable changes. Developers navigate the codebase, implement increments, and use peer review before merge. AI assistants accelerate authoring; review, architecture fit, and security awareness remain the constraints.

## Who's involved
Software engineers, tech leads, occasional AppSec in review, DevEx for environment and tooling support.

## What "good" feeds forward
Small, reviewed merges that CI can validate quickly. Large unreviewed batches push defect discovery into Build, Test, Secure, and production.

## Why Relay cares here
Relay Code accelerates understanding and PR quality; Secure and Portal wrap changes in org standards before the rest of the stream pays the cost.`,
    sections: [
      {
        title: "📚 What happens here",
        content: `Implementation, local validation, pair programming, AI-assisted edits, pull requests, and code review.\n\n**Common tools:** VS Code, JetBrains, GitHub/GitLab, Copilot-class assistants, Cursor-class editors.`,
      },
      {
        title: "⚠️ Friction signals",
        content: `• Review queues explode as AI increases PR volume\n• Onboarding takes months due to tribal codebase knowledge\n• Inconsistent environments ("works on my machine")\n• Rubber-stamp reviews under deadline pressure\n• Security feedback arrives days after merge`,
      },
      {
        title: "📐 Flow metrics",
        content: `PR open → merge time · PR size · Review depth · Rework rate`,
      },
      {
        title: "👤 Buyer / persona relevance",
        content: `**VP Eng / DevEx:** Productivity and review SLA.\n**Tech leads:** Architecture coherence and PR quality.\n**AppSec:** Shift-left without a separate ticket pile.\n**Eng managers:** Cycle time and interruption cost.`,
      },
      {
        title: "📡 Public account signals to listen for",
        content: `• Blog posts or jobs mentioning AI coding rollout\n• Engineering brand content about monorepo migration or developer productivity\n• Glassdoor / eng blog themes: slow reviews, flaky tooling, painful onboarding`,
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
    st: "Build",
    title: "Build",
    e: "⚡",
    c: WA,
    question: "Does it integrate?",
    short: "Compile, package, and produce a versioned artifact",
    mods: ["Relay CI", "Relay Supply", "Relay Insights"],
    friction: [
      "30–60+ minute pipelines; lost developer flow",
      "Fragmented CI estates across business units",
      "Maintenance FTE on agents and plugins",
      "Artifact provenance incomplete or manual",
    ],
    metrics: ["p50 / p95 pipeline duration", "Queue time", "Build failure rate", "Cost per build"],
    d: `## Build — what it is
Build compiles, packages, and produces a versioned artifact. It must be fast enough to preserve developer flow and strict enough to catch integration breaks before Test, Secure, and Release.

## Who's involved
Developers fixing breaks, platform teams owning runners and templates.

## What "good" feeds forward
A trustworthy artifact digest with known build evidence. Slow or flaky CI trains people to skip gates; that debt compounds downstream.

## Why Relay cares here
Relay CI absorbs AI-era merge volume with caching and governed templates; Supply records what was built; Insights shows when CI is the organisational bottleneck. Pair with Relay Test for suite selection.`,
    sections: [
      {
        title: "📚 What happens here",
        content: `CI pipelines, linting, packaging, and publishing artifacts to a registry.\n\n**Common tools:** Jenkins, GitHub Actions, GitLab CI, build caches, Docker.`,
      },
      {
        title: "⚠️ Friction signals",
        content: `• 30–60+ minute pipelines; lost developer flow\n• Fragmented CI estates across business units\n• Maintenance FTE on agents and plugins\n• Artifact provenance incomplete or manual`,
      },
      {
        title: "📐 Flow metrics",
        content: `p50 / p95 pipeline duration · Queue time · Build failure rate · Cost per build`,
      },
      {
        title: "👤 Buyer / persona relevance",
        content: `**Platform / DevOps:** Runner cost, template governance, uptime of CI.\n**VP Eng:** Feedback latency and throughput.\n**FinOps:** Build-minute and idle agent spend.`,
      },
      {
        title: "📡 Public account signals to listen for",
        content: `• Job posts for CI engineers / build farm / Jenkins admins\n• Engineering blogs about migrating off Jenkins or CI-minutes pain\n• Public incidents tied to bad builds escaping to prod`,
      },
      {
        title: "🧩 Relay module fit",
        content: `**Relay CI** — caches, hosted runners, golden templates.\n**Relay Supply** — store digests with SBOM/attestation hooks.\n**Relay Insights** — quantify CI wait as a portfolio bottleneck.`,
      },
      {
        title: "🎣 Outbound hooks",
        content: `• "Curious how long a full CI run takes as your AI coding footprint grows."\n• "Teams often find queue time eats the gains from faster coding — ring true?"\n• "Happy to share patterns for governed templates without YAML sprawl."`,
      },
      {
        title: "✅ Qualification questions",
        content: `• p50 / p95 pipeline duration on main?\n• How many distinct CI systems exist org-wide?\n• Can you map a prod artifact to a pipeline run in one hop?\n• What share of wall-clock is waiting on the queue vs running?`,
      },
      {
        title: "🛡️ Common objections",
        content: `**"Actions / Jenkins is fine"** → Fine until volume and governance break. Probe duration and template sprawl.\n**"Migration risk"** → Coexist; put new services on Relay CI first.`,
      },
    ],
  },
  {
    id: "test",
    st: "Test",
    title: "Test",
    e: "🧪",
    c: WA,
    question: "Does it work?",
    short: "Prove behaviour — select, run, quarantine, and heal suites",
    mods: ["Relay Test", "Relay CI", "Relay Insights"],
    friction: [
      "Full suites on every PR destroy flow",
      "Flaky tests destroy trust in green builds",
      "Nobody owns quarantine",
      "AI-generated PRs get the same slow path as everything else",
    ],
    metrics: ["Suite duration", "Flake rate", "Selection ratio", "Coverage on changed paths"],
    d: `## Test — what it is
Test proves the change behaves. Unit, integration, and E2E suites must be trustworthy enough that a green signal means something — and fast enough that people wait for them.

## Who's involved
Developers, QA / quality eng, platform owning shared runners and policies.

## What "good" feeds forward
Evidence that the change works, with flakes owned not ignored. Skipping Test shifts cost into Secure exceptions and production incidents.

## Why Relay cares here
Relay Test adds impact-based selection, flake quarantine, and generation/heal — so Relay CI stays fast without abandoning confidence.`,
    sections: [
      {
        title: "📚 What happens here",
        content: `Unit / integration / E2E execution, flake management, coverage on changed paths, and quality gates before Secure / Release.\n\n**Common tools:** Language-native runners, Playwright, Cypress, Jest, JUnit, pytest.`,
      },
      {
        title: "⚠️ Friction signals",
        content: `• Full suites on every PR destroy flow\n• Flaky tests destroy trust in green builds\n• Nobody owns quarantine\n• AI-generated PRs get the same slow path as everything else`,
      },
      {
        title: "📐 Flow metrics",
        content: `Suite duration · Flake rate · Selection ratio · Coverage on changed paths`,
      },
      {
        title: "👤 Buyer / persona relevance",
        content: `**QA leads:** Suite health and flake rate.\n**VP Eng:** Feedback latency.\n**Platform:** Shared pipeline policy.`,
      },
      {
        title: "📡 Public account signals to listen for",
        content: `• Jobs mentioning test automation / quality engineering at scale\n• Eng blogs about flake wars or "CI is red again"\n• AI coding rollouts without a testing strategy`,
      },
      {
        title: "🧩 Relay module fit",
        content: `**Relay Test** — impact-based selection, quarantine, generation, self-healing E2E.\n**Relay CI** — host the stages and caches.\n**Relay Insights** — prove testing wait is the constraint.`,
      },
      {
        title: "🎣 Outbound hooks",
        content: `• "What share of CI wall-clock is tests the change couldn't break?"\n• "Who owns your flake backlog today?"\n• "Happy to compare notes on selection without coverage theatre."`,
      },
      {
        title: "✅ Qualification questions",
        content: `• Flake rate on main?\n• Full suite vs PR suite duration?\n• Who decides quarantine?\n• Do AI PRs get different suite rules?`,
      },
      {
        title: "🛡️ Common objections",
        content: `**"We must run every test every time"** → Keep full suites on protected branches; select on PRs.\n**"AI tests are junk"** → Humans review; quarantine still applies.`,
      },
    ],
  },
  {
    id: "secure",
    st: "Secure",
    title: "Secure",
    e: "🛡️",
    c: ER,
    question: "Is it safe to ship?",
    short: "Scan, prioritise, attest, and enforce policy",
    mods: ["Relay Secure", "Relay Supply", "Relay Portal"],
    friction: [
      "Alert fatigue from non-actionable findings",
      "Security as end-of-cycle gate → late, expensive fixes",
      "CVE queues without owners",
      "SBOM only assembled during audits",
    ],
    metrics: ["MTT-remediate criticals", "% findings closed", "PR-scan coverage", "Unsigned artifact blocks"],
    d: `## Secure — what it is
Secure embeds vulnerability management, policy-as-code, and supply-chain provenance into delivery — not as a late gate. Findings must be actionable for developers and defensible for auditors. Runtime WAF/WAAP stays adjacent.

## Who's involved
AppSec, DevSecOps, developers remediating, compliance / GRC, platform embedding scanners in golden paths.

## What "good" feeds forward
Only policy-cleared artifacts proceed to Release. Skipping Secure shifts cost into incidents and customer questionnaires.

## Why Relay cares here
Relay Secure reduces noise and enforces gates; Supply proves provenance; Portal assigns owners so vulns are not orphans.`,
    sections: [
      {
        title: "📚 What happens here",
        content: `SAST/SCA/container/secrets scanning, licence policy, SBOM/attestation, waiver workflows, and promote-time policy checks.\n\n**Common tools:** Commercial SAST/SCA suites, open-source scanners, policy engines, registry admission controllers.`,
      },
      {
        title: "⚠️ Friction signals",
        content: `• Alert fatigue from non-actionable findings\n• Security as end-of-cycle gate → late, expensive fixes\n• CVE queues without owners\n• SBOM only assembled during audits\n• Inconsistent scanner sets per team`,
      },
      {
        title: "📐 Flow metrics",
        content: `MTT-remediate criticals · % findings closed · PR-scan coverage · Unsigned artifact blocks`,
      },
      {
        title: "👤 Buyer / persona relevance",
        content: `**CISO / AppSec:** Risk reduction and audit evidence.\n**Platform:** Golden-path enforcement without tickets.\n**Developers:** PR-native feedback they trust.\n**Compliance:** Continuous control narrative.`,
      },
      {
        title: "📡 Public account signals to listen for",
        content: `• Jobs for AppSec / product security / DevSecOps\n• Public SOC2 / ISO / FedRAMP pursuit language\n• Customer trust centre updates mentioning SBOM or secure SDLC`,
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
        content: `**"We already bought scanners"** → Keep them; orchestration + prioritisation is the gap.\n**"Gates slow delivery"** → Unranked queues slow more; start with criticals on main.\n**"What about runtime protection?"** → Adjacent — keep WAF/WAAP; Relay covers the path into prod.`,
      },
    ],
  },
  {
    id: "release",
    st: "Release",
    title: "Release",
    e: "🚀",
    c: A,
    question: "Who sees it, and how safely?",
    short: "Progressive delivery, flags, infra and data changes",
    mods: ["Relay CD", "Relay Flags", "Relay Infra", "Relay Data"],
    friction: [
      "Big-bang releases; high blast radius",
      "Manual rollback tribal knowledge",
      "No post-release verification beyond pods healthy",
      "Schema changes stuck on a separate DBA window",
      "Infra applies out of band from app releases",
    ],
    metrics: ["Deploy frequency", "Change failure rate", "Time to rollback", "Flag stale count"],
    d: `## Release — what it is
Release moves validated artifacts into environments and controls who sees what. Modern practice separates deploy (code on infrastructure) from release (user exposure) via progressive strategies and flags — and keeps infra and schema in the same train.

## Who's involved
Release / platform eng, SREs, DBAs for schema changes, product for flag decisions, CAB / change managers in regulated orgs.

## What "good" feeds forward
Healthy production with small blast radius and fast rollback. Operate and Improve inherit clean change events for correlation and DORA.

## Why Relay cares here
Relay CD + Flags + Infra + Data make shipping an integrated, verifiable motion — the heart of closing the AI-coding → production gap.`,
    sections: [
      {
        title: "📚 What happens here",
        content: `Environment promotion, canary/blue-green/rolling, GitOps reconciliation, feature exposure, infrastructure apply, schema migrations, and change records.\n\n**Common tools:** kubectl/Helm, Argo CD, Spinnaker, Terraform, Flyway/Liquibase, flag vendors, ServiceNow.`,
      },
      {
        title: "⚠️ Friction signals",
        content: `• Big-bang releases; high blast radius\n• Manual rollback tribal knowledge\n• No post-release verification beyond "pods healthy"\n• Schema changes stuck on a separate DBA window\n• Infra applies out of band from app releases`,
      },
      {
        title: "📐 Flow metrics",
        content: `Deploy frequency · Change failure rate · Time to rollback · Flag stale count`,
      },
      {
        title: "👤 Buyer / persona relevance",
        content: `**VP Eng / Platform:** Deploy frequency and change failure rate.\n**SRE:** Rollback and verification.\n**Product:** Safe experimentation via flags.\n**DBA / data platform:** Migration safety.\n**Risk / change managers:** Auditable progressive delivery.`,
      },
      {
        title: "📡 Public account signals to listen for",
        content: `• Status-page incidents after releases; slow recovery narratives\n• Jobs for release engineer, GitOps, platform SRE, database reliability\n• Blog posts on canary / feature-flag adoption`,
      },
      {
        title: "🧩 Relay module fit",
        content: `**Relay CD** — progressive strategies, release verification, GitOps, orchestration.\n**Relay Flags** — decouple deploy from release; kill switches.\n**Relay Infra** — governed Terraform/OpenTofu alongside app promote.\n**Relay Data** — migrations in the same train with rollback packs.`,
      },
      {
        title: "🎣 Outbound hooks",
        content: `• "When the last bad release hit, how fast did you know — and revert?"\n• "Are you still equating deploy with user-visible release?"\n• "How do schema changes keep up with app release cadence?"`,
      },
      {
        title: "✅ Qualification questions",
        content: `• Deploy frequency and change failure rate?\n• Automated rollback or runbook?\n• Canary / flags in production today?\n• Are infra and schema applies in the same train as apps?`,
      },
      {
        title: "🛡️ Common objections",
        content: `**"Argo/Actions is enough"** → Probe verification, multi-service holds, and rollback automation.\n**"Flags are a separate purchase"** → Platform-integrated flags reduce tool sprawl and audit gaps.\n**"Too regulated for continuous deploy"** → Progressive delivery + approvals is how regulated teams move faster safely.`,
      },
    ],
  },
  {
    id: "operate",
    st: "Operate",
    title: "Operate",
    e: "🩺",
    c: TL,
    question: "Is it healthy?",
    short: "Detect, correlate, respond, and prove resilience",
    mods: ["Relay SRE", "Relay CD", "Relay Portal"],
    friction: [
      "Alerts without change context → long MTTR",
      "Alert fatigue; ignored pages",
      "Runbooks stale or undiscoverable",
      "Ownership unclear at 2am",
      "Rollback paths never proven until a Sev-1",
    ],
    metrics: ["MTTR", "Toil ratio", "Error budget burn", "Time to answer what changed"],
    d: `## Operate — what it is
Operate is production awareness: metrics, logs, traces, alerts, and human response — plus proving that mitigations work before customers do. The goal is not more graphs — it is fast understanding of impact and cause, especially "what changed?"

## Who's involved
SREs, on-call developers, platform reliability, incident commanders, communications partners for customer-facing events.

## What "good" feeds forward
Mitigations and learnings that Improve turns into cost, reliability, and process improvements — and that Plan consumes next cycle.

## Why Relay cares here
Relay SRE adds change intelligence and reliability experiments on top of existing observability stacks, wired to Relay CD and Portal ownership.`,
    sections: [
      {
        title: "📚 What happens here",
        content: `Alerting, triage, incident response, customer communication, timeline assembly, and controlled reliability experiments.\n\n**Common tools:** Datadog, Grafana, Prometheus, Splunk, New Relic, PagerDuty, status pages, chaos tooling.`,
      },
      {
        title: "⚠️ Friction signals",
        content: `• Alerts without change context → long MTTR\n• Alert fatigue; ignored pages\n• Runbooks stale or undiscoverable\n• Ownership unclear at 2am\n• Rollback paths never proven until a Sev-1`,
      },
      {
        title: "📐 Flow metrics",
        content: `MTTR · Toil ratio · Error budget burn · Time to answer what changed`,
      },
      {
        title: "👤 Buyer / persona relevance",
        content: `**Head of SRE:** MTTR, toil, error budgets.\n**VP Eng:** Customer impact and engineering distraction.\n**Platform:** Shared on-call and service ownership hygiene.`,
      },
      {
        title: "📡 Public account signals to listen for",
        content: `• Frequent or slow status-page updates\n• Hiring SRE / on-call / reliability roles in volume\n• Public postmortems admitting change-detection delays`,
      },
      {
        title: "🧩 Relay module fit",
        content: `**Relay SRE** — correlate alerts to releases/flags/config; runbooks; timelines; reliability experiments.\n**Relay CD** — provide the change events worth correlating.\n**Relay Portal** — owners, dependencies, scorecards during triage.`,
      },
      {
        title: "🎣 Outbound hooks",
        content: `• "When paging fires, how long to answer what changed?"\n• "Keeping Datadog — curious about the response layer above it."\n• "When did you last prove rollback with a controlled experiment?"`,
      },
      {
        title: "✅ Qualification questions",
        content: `• MTTR by severity?\n• How do you find the causative release/flag?\n• Runbook coverage for top services?\n• Toil vs novel work on-call split?`,
      },
      {
        title: "🛡️ Common objections",
        content: `**"Observability vendor does AIOps"** → Telemetry ≠ change intelligence + approved action.\n**"AI will make it worse"** → Curated runbooks; human approval on risky steps.`,
      },
    ],
  },
  {
    id: "improve",
    st: "Improve",
    title: "Improve",
    e: "📈",
    c: TL,
    question: "Was it worth it?",
    short: "Cost, bottlenecks, and feedback into the next plan",
    mods: ["Relay Cost", "Relay Insights", "Relay Plans"],
    friction: [
      "Non-prod running 24/7 unowned",
      "Metrics vanity without action",
      "FinOps and eng lack shared service attribution",
      "AI/build spend invisible next to classic IaaS",
      "Planning ignores last quarter's bottleneck data",
    ],
    metrics: ["Cost per change", "Idle non-prod %", "Bottleneck wait share", "Plan accuracy vs prior cycle"],
    d: `## Improve — what it is
Improve feeds evidence back into the next Plan: reduce cloud and delivery waste, expose systemic bottlenecks, and update roadmap tradeoffs. It is continuous improvement, not a quarterly slide.

## Who's involved
FinOps, platform, VPE / DevEx, SRE leaders, product partners updating roadmap tradeoffs.

## What "good" feeds forward
Cheaper non-prod, clearer constraints, and planning that uses throughput reality — so speed upstream compounds instead of thrashing.

## Why Relay cares here
Relay Cost and Insights turn stream telemetry into decisions; Plans consumes them so GTM conversations stay tied to measurable operating leverage.`,
    sections: [
      {
        title: "📚 What happens here",
        content: `Spend review, rightsizing, idle cleanup, DORA/flow analysis, bottleneck ranking, and roadmap reprioritisation.\n\n**Common tools:** Cloud cost explorers, engineering metrics products, OKR reviews.`,
      },
      {
        title: "⚠️ Friction signals",
        content: `• Non-prod running 24/7 unowned\n• Metrics vanity without action\n• FinOps and eng lack shared service attribution\n• AI/build spend invisible next to classic IaaS\n• Planning ignores last quarter's bottleneck data`,
      },
      {
        title: "📐 Flow metrics",
        content: `Cost per change · Idle non-prod % · Bottleneck wait share · Plan accuracy vs prior cycle`,
      },
      {
        title: "👤 Buyer / persona relevance",
        content: `**FinOps / CFO partners:** Margin and forecastability.\n**VP Eng:** Throughput and predictability.\n**Platform:** Prove golden-path ROI.\n**Product:** Trade feature work vs paying down delivery constraints.`,
      },
      {
        title: "📡 Public account signals to listen for",
        content: `• Earnings mentions of cost discipline / margin programmes\n• Jobs for FinOps, cloud economics, DevEx analytics\n• Blog posts on platform ROI or productivity strategy`,
      },
      {
        title: "🧩 Relay module fit",
        content: `**Relay Cost** — attribution, idle shutdown schedules, rightsizing.\n**Relay Insights** — bottleneck and DORA truth.\n**Relay Plans** — feed evidence into the next commitment cycle.`,
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
