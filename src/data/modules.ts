import { A, TL, WA, ER, MU } from "../colors";
import type { Item } from "../types";

export const PILLARS = [
  { id: "inner", label: "Inner loop for", value: "Focus", c: A, e: "✏️" },
  { id: "delivery", label: "Delivery for", value: "Velocity", c: WA, e: "🚀" },
  { id: "security", label: "Security for", value: "Trust", c: ER, e: "🛡️" },
  { id: "efficiency", label: "Efficiency for", value: "Leverage", c: TL, e: "📈" },
];

export const MODS: Item[] = [
  {
    id: "plans",
    pillar: "inner",
    b: "Plan",
    e: "📋",
    c: A,
    title: "Relay Plans",
    short: "Roadmap-to-delivery visibility — link work items to services, owners, and real cycle time.",
    sa: "Ask: 'When a roadmap item slips, how long until engineering and product share the same picture of why?'",
    buyer: "VP Product / Head of Engineering",
    scenario: "A product director says planning lives in one tool and delivery reality in another. How do you show that the gap — not the backlog tool — is the problem?",
    d: `## Relay Plans — from roadmap intent to delivery truth
Planning fails quietly when the backlog and the delivery system disagree. Relay Plans connects roadmap items, epics, and sprint commitments to the services and pipelines that actually ship them — so status is grounded in commits, builds, and deploys rather than status meetings.

## Shared visibility without ripping out existing tools
Teams keep their issue trackers and docs. Relay Plans overlays ownership, dependencies, and delivery health so product, platform, and eng leadership see the same blockers. Teams often see fewer surprise slips once cycle-time and WIP signals sit next to the roadmap.

## Why it matters in the AI coding era
When individuals write code faster, planning debt shows up as thrash: half-finished epics, unclear ownership, and sprint commitments that never matched capacity. Plans closes that loop with delivery-aware roadmaps.`,
    sections: [
      {
        title: "⚙️ Capabilities",
        open: false,
        content: `**Roadmap ↔ service map:** Tie epics and initiatives to catalog services and owning teams.

**Delivery-aware status:** Surface blocked work from build failures, open vulns, and stalled PRs — not only ticket state.

**Dependency views:** Cross-team blockers and critical-path work items in one place.

**Capacity signals:** Historical throughput and WIP limits as inputs to commitment conversations.

**Stakeholder briefs:** Lightweight executive summaries generated from live delivery data.`,
      },
      {
        title: "🔌 Integrations",
        open: false,
        content: `**Work tracking:** Jira, Linear, Azure Boards, GitHub Issues.

**Source & delivery:** GitHub, GitLab, Bitbucket; Relay Build / Deploy pipelines.

**Docs:** Confluence, Notion (read-only context links).

**Catalog:** Relay Portal services and scorecards.`,
      },
      {
        title: "🛡️ Objections",
        open: false,
        content: `**"We already have Jira / Linear"** → Those own the backlog. Plans answers whether the roadmap is actually shipping — and why not.

**"Our PMs won't adopt another tool"** → Plans is a delivery lens for leaders and platform teams; contributors stay in their tracker.

**"We'll just build dashboards"** → Homegrown status boards drift. Plans stays wired to pipelines and services automatically.`,
      },
      {
        title: "🎯 Who buys",
        open: false,
        content: `- Product and engineering leaders who disagree on "what's in flight"
- Platform teams asked to report delivery health across many product lines
- Orgs where AI coding increased output but roadmap predictability got worse`,
      },
      {
        title: "💬 Discovery questions",
        open: false,
        content: `• How do you know a roadmap item is truly on track mid-quarter?
• Where do product and eng get conflicting status today?
• How are dependencies between teams discovered — before or after a miss?
• What data informs sprint commitment: gut feel, velocity points, or cycle time?
• Who owns the narrative when a critical initiative slips?`,
      },
    ],
  },
  {
    id: "code",
    pillar: "inner",
    b: "Code",
    e: "💻",
    c: A,
    title: "Relay Code",
    short: "AI-assisted coding with codebase understanding, PR quality gates, and review acceleration.",
    sa: "Ask: 'How much of your PR review time is spent re-explaining architecture vs catching real risk?'",
    buyer: "VP Engineering / DevEx Lead",
    scenario: "An eng manager loves AI autocomplete but says review queues exploded. How do you position Relay Code as quality leverage, not more generated noise?",
    d: `## Relay Code — understand the codebase, then accelerate change
Relay Code helps developers navigate large repos, propose changes with local context, and raise smaller, reviewable PRs. It emphasises codebase understanding and review quality — not unbounded generation.

## PR quality as a first-class outcome
Inline explanations, risk hints, and checklist enforcement reduce rubber-stamp reviews. Teams often see shorter PR cycle times when reviewers get context and diffs stay small.

## Inner-loop leverage that respects the outer loop
Faster coding only pays off if builds, security, and deploys can absorb the volume. Relay Code is designed to hand clean, policy-aware changes into Relay Build and Relay Secure.`,
    sections: [
      {
        title: "⚙️ Capabilities",
        open: false,
        content: `**Codebase Q&A:** Ask questions grounded in the actual repo graph — not generic model guesses.

**Contextual edits:** Multi-file changes scoped to the task and project conventions.

**PR assist:** Summaries, risk callouts, and suggested tests for reviewers.

**Quality gates:** Branch policies for size, required checks, and naming conventions.

**IDE + CLI:** Works where developers already live; optional cloud workspaces for parity.`,
      },
      {
        title: "🔌 Integrations",
        open: false,
        content: `**SCM:** GitHub, GitLab, Bitbucket, Azure Repos.

**IDEs:** VS Code, JetBrains family, browser workspaces.

**Delivery:** Opens PRs that trigger Relay Build / Secure automatically.

**Chat & tickets:** Optional links back to Jira / Linear work items.`,
      },
      {
        title: "🛡️ Objections",
        open: false,
        content: `**"We already pay for Copilot / Cursor"** → Keep them for autocomplete. Relay Code adds org-aware review quality and ties changes into the delivery platform.

**"AI code is insecure"** → Pair with Relay Secure scanning on every PR; Code surfaces risky patterns early.

**"Developers won't leave their IDE"** → They don't have to — Code meets them in-editor and in the PR.`,
      },
      {
        title: "🎯 Who buys",
        open: false,
        content: `- Engineering leaders investing in AI coding who need review and quality to scale
- DevEx / platform teams standardising PR hygiene across many repos
- Orgs with large legacy codebases where onboarding and navigation are bottlenecks`,
      },
      {
        title: "💬 Discovery questions",
        open: false,
        content: `• What's median time from PR open to merge?
• How do new hires find the right service and patterns today?
• What percentage of review comments are style vs correctness vs security?
• Are AI-generated changes reviewed differently from human-written ones?
• Where does tribal knowledge live when the original author leaves?`,
      },
    ],
  },
  {
    id: "build",
    pillar: "delivery",
    b: "Build",
    e: "⚡",
    c: WA,
    title: "Relay Build",
    short: "CI with build intelligence, selective tests, and caching — absorb AI-era code volume without hour-long pipelines.",
    sa: "Ask: 'How long is a full CI run, and how many times a day does each developer wait on it?' Do the maths live.",
    buyer: "VP Engineering / Platform Lead",
    scenario: "A team lead shrugs that 40-minute builds are 'just how it is.' How do you turn that into a productivity and cost conversation?",
    d: `## Relay Build — CI that keeps up with AI output
AI coding tools increase merge frequency. Pipelines designed for weekly batches become the bottleneck. Relay Build combines selective test execution, dependency caching, and incremental builds so feedback stays in the flow of work.

## Intelligence over brute force
Run the tests and compile steps that the change actually touches. Teams often see dramatically shorter queues and fewer flaky-test stalls without dropping coverage discipline.

## Managed runners, governed templates
Hosted or self-hosted runners with reusable pipeline templates and policy gates — so every repo inherits org standards instead of copy-pasted YAML.`,
    sections: [
      {
        title: "⚙️ Capabilities",
        open: false,
        content: `**Test intelligence:** Select tests impacted by the change; quarantine flaky offenders.

**Cache & build intelligence:** Auto dependency caches and skip unchanged components.

**Hosted runners:** Linux / macOS / Windows options; scale to zero when idle.

**Templates & governance:** Golden pipelines with mandatory stages and approvals.

**Failure assist:** Summarise logs and suggest likely fixes for common breakages.`,
      },
      {
        title: "🔌 Integrations",
        open: false,
        content: `**SCM webhooks:** GitHub, GitLab, Bitbucket, Azure Repos.

**Languages:** Java, JS/TS, Python, Go, .NET, Ruby, Kotlin, and more.

**Plugin reuse:** Bring existing GitHub Actions / community steps where useful.

**Artifacts:** Push images and packages to Relay Supply or third-party registries.

**Notify:** Slack, Teams, email, Jira on failure.`,
      },
      {
        title: "🛡️ Objections",
        open: false,
        content: `**"We use GitHub Actions"** → Strong for repo-native CI. Ask about selective tests, multi-cloud deploy handoff, and org-wide template enforcement at scale.

**"Jenkins is free"** → Free licence ≠ free TCO. Quantify plugin and agent maintenance FTE.

**"Migration is too hard"** → Start new services on Relay Build; coexist until old pipelines age out.`,
      },
      {
        title: "🎯 Who buys",
        open: false,
        content: `- Platform teams drowning in CI maintenance
- Eng leaders whose AI coding adoption outpaced pipeline capacity
- Orgs consolidating fragmented CI across business units`,
      },
      {
        title: "💬 Discovery questions",
        open: false,
        content: `• Median and p95 CI duration on main?
• How much of CI time is tests that couldn't possibly be affected?
• Who owns flaky-test quarantine today?
• How many distinct CI systems exist across the org?
• What does a failed build cost in interrupted focus time?`,
      },
    ],
  },
  {
    id: "secure",
    pillar: "security",
    b: "Secure",
    e: "🛡️",
    c: ER,
    title: "Relay Secure",
    short: "DevSecOps orchestration — SAST, SCA, containers, secrets, and policy-as-code with noise reduction.",
    sa: "Ask: 'When a critical CVE lands, how long until the owning team has a reachable, prioritised fix list — not a PDF?'",
    buyer: "CISO / AppSec Lead / Platform Security",
    scenario: "Security says scanners are 'deployed' but developers ignore the queue. How do you reframe from more findings to fewer actionable ones in the PR?",
    d: `## Relay Secure — security that developers will act on
Relay Secure orchestrates multiple scanner types in the pipeline, deduplicates findings, and ranks by reachability and exploitability so the backlog is work — not noise.

## Policy-as-code at merge and promote
OPA-style gates encode org rules: block criticals on main, require attestations before prod, enforce licence policy. Exceptions are explicit and auditable.

## Shift left without a separate ticket queue
Findings appear on the PR with owner context. Teams often see faster remediation when feedback arrives in the same place as the code change.`,
    sections: [
      {
        title: "⚙️ Capabilities",
        open: false,
        content: `**Scanner orchestration:** SAST, SCA, container, secrets, IaC — unified results.

**Dedup & ranking:** Collapse duplicate CVEs; prioritise reachable paths.

**Policy-as-code:** Mandatory gates per environment with break-glass workflow.

**Developer UX:** Inline PR annotations and fix guidance.

**Audit trail:** Who waived what, when, and why.`,
      },
      {
        title: "🔌 Integrations",
        open: false,
        content: `**Scanners:** Bring existing commercial and open-source scanners; Relay normalises output.

**SCM:** Native PR checks on GitHub / GitLab / Bitbucket.

**Ticketing:** Optional Jira / ServiceNow defect creation for criticals.

**Runtime handoff:** Feeds Relay Deploy gates and Relay Supply attestations.`,
      },
      {
        title: "🛡️ Objections",
        open: false,
        content: `**"We already have Snyk / Checkmarx"** → Keep licences. Secure orchestrates and prioritises across tools so AppSec isn't a PDF factory.

**"Security gates slow us down"** → Unprioritised queues slow you more. Reachability-ranked gates unblock safe changes faster.

**"Developers won't fix it"** → Put findings on the PR with owners from the catalog — not a weekly email.`,
      },
      {
        title: "🎯 Who buys",
        open: false,
        content: `- AppSec leaders drowning in false positives
- Platform teams embedding security into golden paths
- Regulated industries needing auditable policy enforcement`,
      },
      {
        title: "💬 Discovery questions",
        open: false,
        content: `• What's your mean time to remediate critical CVEs?
• What percentage of scanner findings are ever fixed?
• Are security checks on every PR or only nightly?
• How do you prove an artifact met policy before prod?
• Who owns waivers and how are they reviewed?`,
      },
    ],
  },
  {
    id: "deploy",
    pillar: "delivery",
    b: "Deploy",
    e: "🚀",
    c: A,
    title: "Relay Deploy",
    short: "Progressive delivery and GitOps — canary, blue/green, verification, and automatic rollback.",
    sa: "Ask: 'When a bad deploy hits prod, how long until you know — and how long until you're back on the last good version?'",
    buyer: "VP Engineering / Platform / SRE Lead",
    scenario: "A prospect says Argo CD 'works fine.' How do you probe for verification, rollback, and multi-service release pain without dismissing GitOps?",
    d: `## Relay Deploy — ship with a controlled blast radius
Relay Deploy runs canary, blue/green, and rolling strategies across Kubernetes and traditional targets. Post-deploy verification watches real health signals and can roll back automatically when the change looks unhealthy.

## GitOps without the maintenance tax
Git remains the desired-state source. Relay manages agents, promotions, and approvals so platform teams aren't patching controllers at 2am.

## Release orchestration for real systems
Multi-service releases coordinate dependencies: if one service fails its gate, dependents hold. Teams often see fewer "works in staging" surprises once verification is continuous.`,
    sections: [
      {
        title: "⚙️ Capabilities",
        open: false,
        content: `**Strategies:** Canary, blue/green, rolling, custom traffic shaping.

**Continuous verification:** Compare post-deploy metrics to baselines; auto-rollback.

**GitOps:** PR-driven promotions, multi-cluster sync, ApplicationSet-style patterns.

**Approvals & tickets:** Human gates plus Jira / ServiceNow change records.

**DORA outs:** Deployment frequency and change-failure inputs for Relay Insights.`,
      },
      {
        title: "🔌 Integrations",
        open: false,
        content: `**Targets:** Kubernetes, ECS, serverless, VMs (SSH/WinRM), major clouds.

**Manifests:** Helm, Kustomize, native YAML, Terraform-adjacent config.

**Observability for CV:** Datadog, Prometheus, New Relic, Dynatrace, CloudWatch, Splunk.

**Artifacts:** Container registries and Relay Supply.`,
      },
      {
        title: "🛡️ Objections",
        open: false,
        content: `**"We use Argo / Spinnaker"** → Ask who maintains it and whether verification + auto-rollback are first-class. Relay adds the intelligence layer on managed GitOps.

**"GitHub Actions deploys for us"** → Fine for simple promote scripts. Progressive delivery and CV are usually custom YAML debt.

**"Rollback is rare"** → Until it isn't. Measure time-to-detect and time-to-revert on the last three incidents.`,
      },
      {
        title: "🎯 Who buys",
        open: false,
        content: `- Platform and SRE teams accountable for change failure rate
- Orgs increasing deploy frequency after AI coding adoption
- Regulated environments needing auditable progressive delivery`,
      },
      {
        title: "💬 Discovery questions",
        open: false,
        content: `• What's your change failure rate and MTTR after a bad deploy?
• Is rollback automated or a runbook someone hopes to find?
• How do you coordinate multi-service releases today?
• Who maintains your GitOps controllers and how often do upgrades break?
• What signals define a "healthy" deploy besides "pods are up"?`,
      },
    ],
  },
  {
    id: "flags",
    pillar: "delivery",
    b: "Flags",
    e: "🚩",
    c: A,
    title: "Relay Flags",
    short: "Feature flags and experimentation — decouple deploy from release, progressive exposure, kill switches.",
    sa: "Ask: 'Can you ship code to production dark and expose it to 1% of users — without a new deploy?'",
    buyer: "VP Product / Eng Manager / Platform",
    scenario: "Product wants faster experiments; eng fears Friday deploys. How do you show flags as the bridge between velocity and safety?",
    d: `## Relay Flags — deploy continuously, release deliberately
Relay Flags separates "code is in production" from "users can see it." Progressive rollouts, targeting rules, and instant kill switches reduce the risk of every release.

## Experimentation without a side tool silo
A/B tests and multivariate flags share the same governance as delivery — approvals, environments, and audit. Teams often see more experiments per sprint when flags are part of the platform, not a separate vendor island.

## Safer AI-era shipping
More code volume means more feature surface. Flags keep blast radius small while Relay Deploy and Relay Secure handle the pipeline.`,
    sections: [
      {
        title: "⚙️ Capabilities",
        open: false,
        content: `**Progressive exposure:** Percentage rollouts, rings, and attribute targeting.

**Experimentation:** A/B assignments with metric hooks.

**Kill switches:** Instant disable without rollback of the whole release.

**SDK coverage:** Major languages and mobile; local evaluation options.

**Governance:** Environment-scoped permissions and change history.`,
      },
      {
        title: "🔌 Integrations",
        open: false,
        content: `**Relay Deploy:** Flag state as part of release orchestration.

**Analytics:** Export exposures to your warehouse / product analytics.

**CI:** Smoke-test flag defaults in Relay Build.

**Catalog:** Flag ownership tied to Relay Portal services.`,
      },
      {
        title: "🛡️ Objections",
        open: false,
        content: `**"We use LaunchDarkly / Flagsmith"** → Acknowledge strength. Position Relay Flags on platform economics and deploy+flag+verify in one workflow.

**"Flags create tech debt"** → True without hygiene. Relay surfaces stale flags and owners via the catalog.

**"Product doesn't need experiments"** → Kill switches and dark launches still pay for themselves on incident day.`,
      },
      {
        title: "🎯 Who buys",
        open: false,
        content: `- Product orgs running continuous discovery / experimentation
- Platform teams standardising release safety
- Mobile and multi-tenant SaaS needing targeted exposure`,
      },
      {
        title: "💬 Discovery questions",
        open: false,
        content: `• How do you dark-launch today?
• What's the process to turn off a bad feature at 2am?
• How many stale flags exist, and who cleans them?
• Are experiments blocked on eng capacity to wire flags?
• Do flags and deploys share an audit story for compliance?`,
      },
    ],
  },
  {
    id: "portal",
    pillar: "delivery",
    b: "Portal",
    e: "🏗️",
    c: MU,
    title: "Relay Portal",
    short: "Developer portal — service catalog, scorecards, and self-service golden paths.",
    sa: "Ask: 'How long for a new service to get CI, security scans, and a prod-ready path — ticket queue or self-service?'",
    buyer: "Head of Platform Engineering / VP Eng",
    scenario: "Platform built an internal portal nobody uses. How do you diagnose adoption vs capability gaps without dunking on their work?",
    d: `## Relay Portal — the system of record for services
Relay Portal is a service catalog with ownership, docs, dependencies, and health — plus software templates that scaffold new services with org standards baked in.

## Scorecards that create pull, not nag
Translate production-readiness and security standards into automated scores. Teams see the gap and the path to green; leadership sees portfolio risk.

## Golden paths beat tribal knowledge
Self-service workflows create repos, pipelines, and baseline configs in minutes. Teams often see onboarding collapse from weeks of tickets to hours of guided setup.`,
    sections: [
      {
        title: "⚙️ Capabilities",
        open: false,
        content: `**Software catalog:** Services, APIs, owners, SLOs, dependencies.

**Templates / golden paths:** Scaffold with CI, Secure, Deploy wired in.

**Scorecards:** Security, reliability, and docs standards as living scores.

**Self-service actions:** Day-2 operations with RBAC and approvals.

**Extensibility:** Plugins for common DevOps tools; custom cards.`,
      },
      {
        title: "🔌 Integrations",
        open: false,
        content: `**SCM & CI/CD:** GitHub, GitLab, Relay Build / Deploy.

**Observability:** Datadog, PagerDuty, Grafana links on entities.

**Security:** Relay Secure findings summarised per service.

**Issues:** Jira / Linear deep links from catalog entities.`,
      },
      {
        title: "🛡️ Objections",
        open: false,
        content: `**"We have Backstage"** → DIY portals need dedicated maintainers. Relay Portal is managed enterprise catalog + golden paths; migration can preserve entity investment.

**"Confluence is our portal"** → Docs aren't a catalog. Ownership, scores, and self-service actions are the difference.

**"Devs won't use it"** → Adoption follows golden paths that are faster than the ticket queue — measure time-to-first-deploy.`,
      },
      {
        title: "🎯 Who buys",
        open: false,
        content: `- Platform engineering teams scaling beyond tribal knowledge
- Orgs with hundreds of services and unclear ownership
- Leaders mandating production-readiness standards`,
      },
      {
        title: "💬 Discovery questions",
        open: false,
        content: `• How long to create a new production service the "right" way?
• Can you list owner + on-call for every critical service in five minutes?
• What standards exist only in wiki pages?
• How much platform time goes to maintaining a homegrown portal?
• Where do shadow-IT services get created today?`,
      },
    ],
  },
  {
    id: "infra",
    pillar: "delivery",
    b: "IaC",
    e: "🧱",
    c: WA,
    title: "Relay Infra",
    short: "IaC governance — Terraform/OpenTofu pipelines, approvals, cost estimate before apply, drift detection.",
    sa: "Ask: 'Before someone applies Terraform to prod, do you see blast radius and cost impact — or just hope the plan looks right?'",
    buyer: "Platform / Cloud Engineering / FinOps partner",
    scenario: "Cloud team says Terraform Cloud covers them. How do you probe for policy, cost-before-apply, and app+infra release coordination?",
    d: `## Relay Infra — infrastructure changes with the same discipline as app deploys
Relay Infra runs Terraform and OpenTofu through governed pipelines: plan, policy check, cost estimate, approve, apply — with drift detection afterward.

## Close the app/infra gap
Infrastructure PRs participate in the same delivery narrative as services. Teams often reduce "works in app, broken in cloud" incidents when IaC isn't a side process.

## Guardrails without ticket theatre
Policy-as-code and RBAC replace ad-hoc Slack approvals while keeping an audit trail for regulated environments.`,
    sections: [
      {
        title: "⚙️ Capabilities",
        open: false,
        content: `**Plan / apply pipelines:** PR-triggered plans with written plans as artifacts.

**Policy & approvals:** OPA checks and environment-scoped approvers.

**Cost estimation:** Show projected spend impact before apply.

**Drift detection:** Continuous compare of desired vs actual state.

**Module registry:** Shared modules with versioning and provenance.`,
      },
      {
        title: "🔌 Integrations",
        open: false,
        content: `**IaC:** Terraform, OpenTofu; CloudFormation / CDK where needed.

**Clouds:** AWS, Azure, GCP providers.

**VCS:** GitHub / GitLab PR checks.

**Cost:** Feeds Relay Cost for ongoing spend attribution.

**Secrets:** Vault / cloud secret managers for provider creds.`,
      },
      {
        title: "🛡️ Objections",
        open: false,
        content: `**"Terraform Cloud is enough"** → Ask about unified app+infra releases, org-wide OPA, and FinOps estimates in the same control plane as CD.

**"We apply from laptops"** → That's the risk. Pipelines make apply attributable and repeatable.

**"Drift tools are noisy"** → Scope drift to prod accounts first; pair with owners in Relay Portal.`,
      },
      {
        title: "🎯 Who buys",
        open: false,
        content: `- Cloud / platform teams standardising IaC at enterprise scale
- FinOps partners tired of surprise apply costs
- Security teams needing infrastructure change auditability`,
      },
      {
        title: "💬 Discovery questions",
        open: false,
        content: `• Who can apply to production today, and how is it audited?
• Do you estimate cost before apply?
• How quickly do you detect drift in critical accounts?
• Are infrastructure changes in the same release train as apps?
• How are shared modules versioned and reviewed?`,
      },
    ],
  },
  {
    id: "sre",
    pillar: "efficiency",
    b: "Observe",
    e: "🩺",
    c: TL,
    title: "Relay SRE",
    short: "AI-assisted incident response — change correlation, runbooks, on-call context, post-incident writeups.",
    sa: "Ask: 'When paging fires, how long to answer what changed in the last deploy, flag, or config?'",
    buyer: "Head of SRE / VP Eng / Platform",
    scenario: "They love their observability vendor. How do you position Relay SRE as change intelligence and action — not another metrics UI?",
    d: `## Relay SRE — from alert to change to action
Relay SRE correlates incidents to recent deploys, flag flips, and config changes, then suggests or runs runbooks. It sits above your existing metrics and logs — it does not try to replace them.

## Shrink MTTR with context, not more dashboards
On-call gets the likely diff, owning team, and last verification result in one place. Teams often cut time-to-mitigate when the first question ("what changed?") is already answered.

## Learning loop back into delivery
Post-incident summaries feed Relay Insights and planning — so the same failure class is less likely next sprint.`,
    sections: [
      {
        title: "⚙️ Capabilities",
        open: false,
        content: `**Change correlation:** Link alerts to Relay Deploy, Flags, and Infra events.

**Runbooks:** Guided and automated mitigation steps with approvals.

**On-call context:** Service owners, dependencies, and recent scorecard health from Portal.

**Incident timeline:** Auto-assembled chronology for handoff and review.

**AI scribe:** Draft post-incident reports from the timeline for human edit.`,
      },
      {
        title: "🔌 Integrations",
        open: false,
        content: `**Observability:** Datadog, Prometheus, New Relic, Splunk, CloudWatch.

**Paging:** PagerDuty, Opsgenie, and similar.

**Chat:** Slack / Teams incident channels.

**Delivery:** Deep links into Relay Deploy releases and Flags.`,
      },
      {
        title: "🛡️ Objections",
        open: false,
        content: `**"Datadog / Grafana is our SRE tool"** → Keep them for telemetry. Relay SRE answers what changed and what to do next.

**"AI will hallucinate remediations"** → Runbooks are curated; AI proposes, humans approve high-risk actions.

**"We already have an incident tool"** → Ask how much manual timeline assembly still happens.`,
      },
      {
        title: "🎯 Who buys",
        open: false,
        content: `- SRE orgs measured on MTTR and toil reduction
- Platform teams owning shared on-call for many services
- Eng leaders after a painful Sev-1 wanting systemic fixes`,
      },
      {
        title: "💬 Discovery questions",
        open: false,
        content: `• What's your MTTR for Sev-1 / Sev-2?
• How do responders find the deploy that caused it?
• What percentage of on-call time is toil vs novel work?
• Are runbooks up to date and actually used?
• How long to produce a blameless post-incident review?`,
      },
    ],
  },
  {
    id: "cost",
    pillar: "efficiency",
    b: "FinOps",
    e: "💰",
    c: TL,
    title: "Relay Cost",
    short: "Cloud FinOps — spend visibility, idle resource control, rightsizing, and AI/token cost attribution.",
    sa: "Ask: 'What percentage of non-prod spend runs 24/7 with nobody using it overnight?'",
    buyer: "FinOps Lead / VP Eng / Cloud Platform",
    scenario: "Finance escalates the cloud bill; eng says they lack ownership data. How do you open with visibility and idle waste — not a shame exercise?",
    d: `## Relay Cost — make cloud spend an engineering signal
Relay Cost attributes spend to teams, services, and pipelines, and highlights idle or oversized resources. Optional auto-stop for non-prod environments cuts obvious waste without ticket wars.

## Rightsizing with owners attached
Recommendations land with the service owner from Relay Portal — not a spreadsheet nobody claims. Teams often reclaim meaningful non-prod spend within a month of enforcing schedules.

## AI workload awareness
As inference and build minutes rise, Cost tracks those lines next to classic cloud IaaS so FinOps and platform share one conversation.`,
    sections: [
      {
        title: "⚙️ Capabilities",
        open: false,
        content: `**Multi-cloud visibility:** AWS, Azure, GCP normalised views.

**Idle control:** Schedules / auto-stop for dev and test.

**Rightsizing:** Recommendations with one-click or PR workflows.

**Attribution:** Cost by team, service, pipeline, and environment.

**Budgets & alerts:** Thresholds before month-end surprises.`,
      },
      {
        title: "🔌 Integrations",
        open: false,
        content: `**Cloud billing:** Native cost APIs and CUR-style exports.

**Catalog:** Relay Portal ownership for chargeback / showback.

**IaC:** Relay Infra cost estimates before apply.

**CI:** Build-minute and runner spend alongside cloud IaaS.`,
      },
      {
        title: "🛡️ Objections",
        open: false,
        content: `**"We have native cost explorers"** → Explorers show invoices. Cost ties spend to services and automates idle non-prod.

**"Auto-stop will break developers"** → Start with shared non-prod; wake-on-demand; exclude sticky environments.

**"FinOps owns this, not eng"** → Without eng ownership tags, FinOps can't act. Portal + Cost closes that loop.`,
      },
      {
        title: "🎯 Who buys",
        open: false,
        content: `- FinOps and cloud centre-of-excellence teams
- Platform leaders under margin pressure
- Orgs with sprawling non-prod estates`,
      },
      {
        title: "💬 Discovery questions",
        open: false,
        content: `• Can you attribute last month's bill to owning teams cleanly?
• What runs 24/7 that is only needed business hours?
• How do rightsizing tickets get resolved today?
• Are AI/build costs visible next to classic cloud spend?
• Who gets paged when a budget blows?`,
      },
    ],
  },
  {
    id: "insights",
    pillar: "efficiency",
    b: "Insights",
    e: "📊",
    c: TL,
    title: "Relay Insights",
    short: "Engineering insights — DORA, bottlenecks, AI adoption signals, and delivery efficiency across tools.",
    sa: "Ask: 'Where does a typical story lose the most calendar time — coding, review, CI, security, or release?'",
    buyer: "VP Engineering / Director of DevEx",
    scenario: "A VPE has vanity dashboards but can't name the top bottleneck. How do you sell bottleneck truth over more metrics?",
    d: `## Relay Insights — see the constraint, not just the charts
Relay Insights aggregates DORA and flow metrics across SCM, CI, security, and deploy systems to show where work waits. The point is prioritisation: fix the constraint that unlocks throughput.

## Close the plan ↔ delivery loop
Bottleneck data feeds Relay Plans and sprint conversations so commitments match reality. Teams often improve predictability once review lag or flaky CI is quantified.

## AI coding without blind spots
Track whether AI-assisted changes move faster through the outer loop — or stack up in review and security — so investment decisions are evidence-based.`,
    sections: [
      {
        title: "⚙️ Capabilities",
        open: false,
        content: `**DORA & flow:** Deploy frequency, lead time, CFR, MTTR, wait stages.

**Bottleneck finder:** Rank stages by wait time and variance.

**Team & service views:** Filter by Portal ownership trees.

**AI adoption lenses:** Compare AI-touched vs traditional changes (privacy-aware).

**Natural-language asks:** "Which teams have review lag > 2 days?" style queries.`,
      },
      {
        title: "🔌 Integrations",
        open: false,
        content: `**SCM:** GitHub, GitLab, Bitbucket PR and review data.

**CI/CD:** Relay Build / Deploy plus common external CI.

**Security & incidents:** Relay Secure and Relay SRE events.

**Work tracking:** Jira / Linear cycle linkage for Plans.`,
      },
      {
        title: "🛡️ Objections",
        open: false,
        content: `**"We already have a metrics product"** → Ask if it spans security and deploy wait times or only git. Insights is delivery-system-aware.

**"Developers hate being measured"** → Measure systems and bottlenecks, not individuals; publish team-level flow.

**"DORA is enough"** → DORA says elite/low; Insights says which queue to fix first.`,
      },
      {
        title: "🎯 Who buys",
        open: false,
        content: `- VPE / DevEx investing in productivity programmes
- Platform teams proving ROI of golden paths
- Transformation offices needing evidence over anecdotes`,
      },
      {
        title: "💬 Discovery questions",
        open: false,
        content: `• What's your lead time for a typical change?
• Where does work wait the longest in your SDLC?
• Do planning meetings use delivery data or intuition?
• How do you know AI coding tools improved throughput end-to-end?
• Which bottleneck would you fix first if you had proof?`,
      },
    ],
  },
  {
    id: "supply",
    pillar: "security",
    b: "Supply",
    e: "📦",
    c: ER,
    title: "Relay Supply",
    short: "Artifact registry lite + supply-chain provenance — SBOMs, attestations, and promotion policies.",
    sa: "Ask: 'Can you prove what went into the container running in prod — and that it wasn't tampered with after build?'",
    buyer: "AppSec / Platform / Compliance",
    scenario: "Compliance asks for SBOMs; eng produces them manually for audits. How do you make provenance continuous in the pipeline?",
    d: `## Relay Supply — trust the artifact, not the hope
Relay Supply stores build outputs and attaches SBOM and attestation metadata as first-class companions to every artifact. Promotion policies ensure only signed, scanned builds reach higher environments.

## Lightweight registry, strong provenance
Not a replacement for every enterprise registry — a governance-friendly path that works with existing ECR/Artifactory/GHCR while enforcing Relay Secure and Deploy gates.

## Audit readiness without fire drills
Teams often turn supply-chain asks from quarterly scrambles into automatic pipeline output.`,
    sections: [
      {
        title: "⚙️ Capabilities",
        open: false,
        content: `**Artifact storage:** Container images and generic packages with retention policies.

**SBOM generation:** Produce and store SBOMs per build.

**Attestations:** Provenance for build identity and policy checks.

**Promotion rules:** Block unsigned or unscanned artifacts from prod.

**Vulnerability context:** Link Relay Secure findings to the exact artifact digest.`,
      },
      {
        title: "🔌 Integrations",
        open: false,
        content: `**CI:** Relay Build publishes digests automatically.

**External registries:** Mirror / promote with ECR, GHCR, Artifactory, Nexus.

**Deploy:** Relay Deploy pulls only policy-cleared digests.

**Compliance export:** SBOM packages for customer and auditor requests.`,
      },
      {
        title: "🛡️ Objections",
        open: false,
        content: `**"We already have Artifactory / ECR"** → Keep them. Supply adds provenance and promotion policy in the delivery control plane.

**"SBOM is a compliance checkbox"** → Treat it as continuous metadata; checkboxes fail under incident forensics.

**"Too heavy for us"** → Start with prod-bound images only; expand later.`,
      },
      {
        title: "🎯 Who buys",
        open: false,
        content: `- Security and compliance programmes with SBOM / provenance mandates
- Platform teams unifying artifact promotion rules
- Orgs selling to customers who demand supply-chain evidence`,
      },
      {
        title: "💬 Discovery questions",
        open: false,
        content: `• Where do production images live today, and who can push?
• Are SBOMs generated every build or assembled for audits?
• How do you prevent an unsigned image from reaching prod?
• Can you map a running pod back to commit + pipeline run?
• What supply-chain questions do customers ask in questionnaires?`,
      },
    ],
  },
];
