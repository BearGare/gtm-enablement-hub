import { A, TL, WA, ER, MU } from "../colors";
import type { Item } from "../types";

/** Competitive landscape cards — public-research based, Relay-framed. */
export const COMPS: Item[] = [
  {id:"jenkins",n:"Jenkins",e:"🔧",c:WA,cats:["cd","ci"],featured:true,str:"Free, ubiquitous, massive plugin ecosystem.",adv:"Hidden maintenance cost. Quantify engineer time on plugins, patches, scaling.",wo:"Switching cost fear — deep existing pipeline investment.",sa:"'When was your last Jenkins upgrade? How long did it take? What broke?' War stories usually follow.",
  sections:[
    {title:"Why Jenkins is everywhere",open:false,content:`Jenkins became the default CI/CD tool between 2011 and 2020 — it was the only mature, free, on-prem option at scale. The result: an installed base in virtually every enterprise. ~1,800 plugins extend it to cover almost any use case. Every engineer has used it. The moat is not technical superiority — it's ubiquity, familiarity, and sunk cost. The competition is not "Jenkins features vs Relay features"; it's "Jenkins total cost of ownership vs Relay."`},
    {title:"The real cost: TCO breakdown",open:true,content:`**Engineering maintenance burden:**
• 0.5–2 FTE to maintain plugins, Groovy scripts, agent scaling, and security patches
• Loaded engineer cost: $200K–$400K/yr per FTE — that's $100K–$800K/yr just to keep the lights on
• Security patches are frequent and each requires a test cycle — Jenkins is a frequent CVE target
• No SaaS model means infra costs are additive: EC2/GKE agent nodes, storage, networking

**Hidden operational costs:**
• No native secrets management — credentials plugin sprawl creates audit exposure
• No test intelligence — all tests run on every build; 1-hour test suites are common
• Groovy DSL maintenance: complex pipelines require specialized Groovy knowledge that most teams lack
• Plugin conflicts: upgrading one plugin breaks another — risk-averse teams freeze plugin versions and fall years behind

**The question to ask:** "What would your engineers build if they weren't maintaining Jenkins?"`},
    {title:"Where Relay CI wins",open:false,content:`**AI Test Intelligence** — runs only the tests impacted by the code change. Typical result: 70–90% reduction in test execution time. Fewer flaky-test false alarms. Faster feedback for developers.

**Built-in security scanning** — security scanning integration with 30+ scanners. No separate plugin to install, maintain, or upgrade. SAST, SCA, container, and secrets scanning in the same pipeline.

**Native secrets management** — secrets management or Vault integration built in. No credentials plugin, no plaintext secrets in Groovy, no audit exposure from plugin credential stores.

**Auto-scaling build infrastructure** — build farms scale to zero when idle, scale up on demand using spot instances. Cloud Cost Management integration provides cost attribution by pipeline/team.

**Policy-as-code** — OPA gates enforce pipeline standards across all repos. No copy-paste YAML enforcement; violations fail the pipeline automatically.

**Full RBAC and audit log** — no plugins required. Every pipeline run, approval, and configuration change is logged and attributable.`},
    {title:"Objection handling",open:false,content:`**"Jenkins is free"**
"Free as in free puppy. Maintenance is the cost — and it compounds every year. Let's quantify what your team spends maintaining it: plugins, patches, Groovy scripts, agent infra. That number usually surprises people."

**"We have years of pipelines in Jenkins"**
"We never ask for a big-bang migration. Start new projects on Relay — those pipelines get Test Intelligence, built-in security scanning, and policy gates from day one. Jenkins stays for old pipelines until they're retired naturally. No rip-and-replace required."

**"We love the plugin ecosystem"**
"Which plugins are causing the most pain? The Groovy DSL? Credentials management? Agent scaling? Almost everything in the plugin ecosystem that people actually rely on is a native Relay feature — without the maintenance overhead."

**"We need to run on-prem / we can't use SaaS"**
"Relay CI supports on-prem via the delegate model. The control plane is SaaS; your build agents run in your own infrastructure. You get the SaaS management benefits without your build traffic leaving your network."`},
    {title:"Discovery questions",open:true,content:`• "How many engineers touched Jenkins in the last 90 days for maintenance work — not building new pipelines?"
• "When was your last Jenkins upgrade? How long did the upgrade take, and what broke?"
• "What percentage of your CI failures turn out to be flaky tests vs real failures?"
• "How long does a full test suite run? Has your team looked at test impact analysis?"
• "How do you manage secrets across your Jenkins pipelines today — credentials plugin, environment variables, something else?"
• "If I asked you to enforce a standard pipeline template across 50 repos in Jenkins, what would that process look like?"`},
  ]},
  {id:"octopus",n:"Octopus Deploy",e:"🐙",c:A,cats:["cd"],str:"Purpose-built deployment automation. Strong ops-team adoption in .NET and Windows shops. Clean build/deploy separation, multi-tenancy for SaaS vendors.",adv:"No AI verification, no post-deploy monitoring, no integrated security scanning, no cloud cost management, no CI.",wo:"Strong brand loyalty in EMEA mid-market — particularly in .NET, banking, and ERP. Migration effort from existing Octopus project configs is real.",sa:"'After an Octopus deployment hits production, is there any automated validation or rollback if something goes wrong?' Almost always no. That's the opening.",
  d:`## Octopus Deploy — EMEA CD competitor
**Why this matters:** Octopus Deploy is a frequent shortlist name in European mid-market and enterprise CD evaluations — especially .NET, Windows, banking, and ERP estates. Less often the headline US shortlist tool, but a real competitor wherever ops teams own promotion pipelines.
## Where Octopus is genuinely strong
- Purpose-built deployment orchestration — clean separation of build (CI) vs deploy (CD)
- Multi-tenancy: deploy to many customer environments from a single project (strong for SaaS vendors with per-customer infrastructure)
- .NET and Windows ecosystem: deeply familiar to teams running Microsoft stacks
- Clear variable scoping and environment promotion model
- Strong ops-team UX — less developer-centric friction during adoption
## Relay advantages
- **No AI Continuous Verification** — Octopus has no post-deploy ML baseline or auto-rollback. Single biggest gap.
- **No integrated security scanning** — no AST/security scanning equivalent
- **No cloud cost management** — no AutoStopping, no spend attribution
- **No feature flags** — Octopus is deploy-only; Relay Flags has no Octopus equivalent
- **No developer portal (IDP)** — no service catalog, no golden paths
- **No built-in CI** — Octopus requires a separate CI tool (TeamCity, GitHub Actions, Azure Pipelines)
- **Governance:** Relay OPA policy-as-code vs Octopus environment-scoped permission model
## The migration conversation
Octopus step templates, runbooks, and variable sets have no direct Relay equivalent — migration requires re-authoring pipelines. Lead with strategic value difference, not feature parity. Propose a PoC with one new service to demonstrate AI verification before asking them to migrate existing pipelines.
## What good discovery sounds like
- Loyalty to existing project configs is rational — acknowledge migration cost early
- Ask what happens *after* a promote succeeds: automated validation, or hope plus dashboards?
- Prefer a single greenfield service PoC over a rip-and-replace pitch`},
  {id:"gha",n:"GitHub Actions",e:"🐙",c:MU,cats:["cd","ci"],featured:true,str:"Native to GitHub, low friction, large community, free tier.",adv:"At enterprise scale: no governance, no multi-cloud CD, no policy-as-code, no observability.",wo:"GitHub's continued investment in Actions is real. The co-exist motion is the right play: keep Actions for CI, add Relay for CD and deployment governance.",sa:"'Do you have approval gates on production deployments in GHA today? If someone deploys to prod on a Friday afternoon, is rollback automatic or does someone have to intervene manually?'",
  sections:[
    {title:"Where GHA is genuinely strong — acknowledge it",open:false,content:`Don't attack GHA's real strengths — reps who do lose credibility immediately.

• **Native GitHub integration** — developers never leave GitHub; pipelines live in the repo alongside the code
• **YAML-in-repo model** — developers own and edit their own CI workflows; no separate CI admin required
• **20,000+ Marketplace actions** — a massive ecosystem covering almost every integration use case
• **Free tiers** — zero cost for public repos; included with GitHub Enterprise for private repos
• **Dependabot + security integration** — tight native connection to GitHub's code scanning and dependency review
• **GitHub Copilot integration** — AI-assisted workflow authoring in 2025/2026 adds a meaningful dev experience angle

The positioning is not "GHA is bad" — it's "GHA is excellent CI; the gap is at the deploy stage."`},
    {title:"The enterprise governance gap",open:false,content:`**Pipeline standards at scale:**
No policy-as-code to enforce a standard workflow template across 50+ repos. Each team builds its own workflow YAML. Result: workflow sprawl — hundreds of slightly different pipeline patterns that no one owns. A workflow security incident (supply chain attack via Marketplace action) is very hard to patch at scale.

**Secrets management:**
GitHub Secrets are basic environment-variable storage — no Vault integration, no fine-grained scoping, no audit trail of who accessed what secret when. RBAC on secrets is at the repo/org level, not the pipeline step level.

**Audit and compliance:**
No centralised cross-org pipeline audit log. GitHub Enterprise audit logs cover repo events, not per-step pipeline decisions. For teams with SOC 2, ISO 27001, or internal compliance requirements, this is a gap.

**Cross-org governance:**
Enterprise runner management and runner security hardening requires significant GitHub Advanced Security + GitHub Enterprise investment and ongoing maintenance.`},
    {title:"The deployment intelligence gap",open:false,content:`**Progressive delivery:**
GHA has no native canary, blue-green, or traffic-splitting deployment support. Teams bolt on third-party actions (e.g., AWS CodeDeploy actions, custom kubectl scripts) — which become custom code to maintain.

**Continuous Verification:**
There is no equivalent to Relay CV in GHA. CV monitors post-deploy metrics (Datadog, New Relic, Prometheus) and automatically rolls back if health signals degrade. In GHA, post-deploy validation is a custom step someone built and maintains.

**Multi-cloud targets:**
Deploying to ECS, Lambda, Azure App Service, on-prem VMs, and Kubernetes from a single pipeline in GHA requires a collection of different third-party actions with different authentication models. This is solvable but generates significant maintenance overhead.

**The gap in one sentence:** GHA deploys code. Relay CD manages what happens after the deploy — and that's where most production incidents live.`},
    {title:"The co-exist play — the smart land",open:true,content:`**This is the most common and most successful motion against GHA.**

Keep GHA for CI (build, test, lint, security scanning). Add Relay CD at the deploy stage. Zero change to developer CI workflow — they keep their 20,000 Marketplace actions, their YAML-in-repo model, their GitHub integration.

Relay picks up at "promote to staging":
• Approval gates before production
• Canary or blue-green rollout strategy
• CV monitoring for 10 minutes post-deploy; auto-rollback if metrics degrade
• Full audit log of who approved, when, and with what context
• Multi-cloud targets in a single pipeline

**The pitch:** "Keep everything your developers already love about GitHub Actions. Add the deployment intelligence layer that Actions wasn't designed to provide."

**Land motion:** Start with one service, one environment. Show CV auto-rollback in a demo or PoC. Expand from there.`},
    {title:"Objection handling",open:false,content:`**"We're already on GitHub Enterprise — Actions comes included"**
"Actions is included and it's a great CI system — keep it. The question is what happens after the build: approval gates before production, automated rollback when a deploy goes wrong, and pipeline governance across 50 repos. That's not what Actions is designed for, and GitHub isn't building it."

**"We don't want to manage another tool"**
"The co-exist model means zero change to your CI workflow. Relay takes over at the deploy stage — one new tool, targeted at the specific gap where GHA stops. Your developers keep their existing workflows."

**"GitHub is investing heavily in Actions"**
"In CI and code workflows — yes, and those investments are real. The gap is deployment intelligence: Continuous Verification, progressive delivery, and cross-cloud deployment. That's not GitHub's platform direction. The co-exist model is actually GitHub's recommended pattern for enterprise delivery governance."

**"We built a lot of custom Actions for deployment"**
"That's exactly the maintenance burden we can relieve. Those custom deploy actions are technical debt — someone built them, someone has to keep them working. Relay CD is purpose-built for this; you stop maintaining custom actions and get progressive delivery and auto-rollback as a first-class feature."`},
    {title:"Discovery questions",open:true,content:`• "Do you have approval gates on production deployments today — who can approve a deploy to prod in GHA, and how is that enforced?"
• "If a production deployment breaks something, is rollback automatic or does someone have to manually intervene? How long does that take?"
• "How do you enforce a consistent pipeline template across all your repos — policy system, or copy-paste and hope?"
• "What happens if someone pushes to main on a Friday afternoon and it triggers a prod deploy — is there any gate?"
• "How many distinct workflow YAML files does your org have, and how consistent are they with each other?"
• "Have you had a supply-chain incident through a Marketplace action? How did you respond across all repos?"`},
  ]},
  {id:"gitlab",n:"GitLab / GitLab Duo",e:"🦊",c:ER,cats:["platform","cd","ci","security"],featured:true,str:"All-in-one SCM + CI + CD + security. GitLab Duo AI suite embedded platform-wide. Single vendor appeal.",adv:"Relay AI is included in the platform — GitLab Duo costs a per-seat AI add-on on top of an already-premium subscription. Deeper on CV, multi-cloud deploy, Cloud Cost Management, IDP.",wo:"Consolidation narrative is compelling. GitLab Duo's security AI (auto-remediation via MR) is genuinely strong. Don't attack it directly. Q2 2026: many accounts are on multi-year Ultimate + Duo Enterprise contracts — won't reprocure until renewal. Confirm pricing from public packaging pages before quoting. Relay weakness: no native SCM (source of record), no built-in project management.",sa:"'How much are you paying for GitLab AI today? Relay AI is included in the platform. For a 100-person team, Duo Enterprise is tens of thousands per year just for AI.' Then pivot to CV: 'Does GitLab auto-rollback when a deployment goes wrong? We do.'",
  sections:[
    {title:"GitLab Duo pricing (critical — open with this)",open:true,content:`GitLab Duo is an add-on, not included. Know this cold before any GitLab conversation.

| Tier | Cost | Requirement |
|---|---|---|
| Duo Pro | $19/user/month | Requires Premium ($29) or Ultimate ($99) |
| Duo Enterprise | $39/user/month | Requires Ultimate ($99) only |
| **Effective total** | **$48–$138/user/month** | For AI-enabled GitLab |

**Relay AI: included free with the platform — zero add-on cost.**

For a 100-person team on Duo Enterprise + Ultimate: **$138/user/month = $165,600/year.** Just for the platform and AI. Relay AI is $0 on top of your Relay contract.

*Note: GitLab is shifting some AI features into lower tiers in 2026 — Confirm pricing with publicly available packaging pages or the prospect.*`},
    {title:"Where Relay wins on depth",open:true,content:`**Continuous Verification** — ML-powered deployment validation with automatic rollback. GitLab has no equivalent. This is the single biggest differentiator — lead with it.

**Monitoring integrations:** Relay integrates with Datadog, New Relic, AppDynamics, Prometheus, CloudWatch, Dynatrace. GitLab Duo: Prometheus only.

**Deployment strategies:** Relay: full Canary, Blue/Green, Rolling on Kubernetes, VMware, Azure, GCP, ECS. GitLab: basic Kubernetes only.

**IaC support:** Relay: Terraform, CloudFormation, Terragrunt, ARM, CDK, OpenTofu. GitLab: Terraform only.

**Policy engine:** Relay uses Open Policy Agent (OPA, the industry standard). GitLab uses a proprietary engine.

**Cost Optimization:** GitLab has no cloud cost management. Relay Cloud Cost Management: multi-cloud AutoStopping, rightsizing, AI inference cost attribution.

**Test Automation:** GitLab CI provides test reporting. Relay AI Test Automation: self-healing E2E tests, Test Intelligence reduces execution time 70–90%.

**No IDP, no Resilience Testing, no AI SRE, no behavioral WAAP in GitLab.**`},
    {title:"Where GitLab Duo is genuinely strong",open:false,content:`Don't attack these — they're real strengths and attacking them kills credibility.

• **Unified platform context** — code, issues, MRs, and security findings all connected to AI in a single surface
• **Security vulnerability auto-remediation** — Duo can open a merge request to fix a flagged vulnerability automatically (Claude 3.5 Sonnet powered). This is a genuine differentiator.
• **Developer experience within the GitLab ecosystem** — teams already in GitLab get AI without context switching
• **Self-hosted AI flexibility** — Duo supports Anthropic, OpenAI, and Mistral models in self-managed deployments
• **GitLab Duo Agent Platform (2026)** — agentic AI embedded across DevSecOps from issue to MR. Relevant for buyers seeking single-vendor AI. Counter: it stops at the MR — it has no CV, no progressive delivery, no post-deploy correlation.`},
    {title:"Recommended play",open:false,content:`**Complement, not replace.** This is almost always the right motion.

"Keep GitLab for SCM and security scanning — it's genuinely good at both. Add Relay for deployment intelligence: Continuous Verification, multi-cloud strategies, and intelligent rollback that GitLab doesn't provide. And you stop paying $39/user/month for AI that doesn't cover your delivery pipeline."

**When to go displacement:** Large Ultimate + Duo Enterprise footprint at renewal, significant CI/CD pain (long build times, no progressive delivery), or security team separately buying security scanning-category tools. That's a platform consolidation conversation.`},
    {title:"Objection handling",open:false,content:`**"We already pay for GitLab Ultimate — we're getting everything included"**
"Ultimate gives you SCM, CI, and basic security scanning — that's a solid foundation. But it doesn't give you Continuous Verification (there's no GitLab equivalent), AI SRE, cloud cost management, or Test Intelligence. The question isn't whether GitLab covers the basics. It's whether the basics are enough when a growing share of your code is AI-generated and you need automated go/no-go gates, not manual review."

**"GitLab Duo AI is included"**
"Duo Pro and Duo Enterprise are add-ons — a per-seat AI add-on on top of an already-premium subscription. And Duo's AI is optimised for code generation and MR review inside GitLab. Relay AI covers the delivery pipeline: test impact analysis, deployment verification, incident correlation, cost attribution. Different surface, different value."

**"We're in a multi-year GitLab contract"**
"When does it renew? Let's start the conversation now so you have options at renewal. In the meantime, we can land on a module GitLab doesn't cover — IDP, Cloud Cost Management, or Resilience Testing — without touching the GitLab contract."`},
    {title:"Market context",open:false,content:`**When a prospect quotes industry blogs about AI coding vs shipping:** That's the Relay thesis. The difference is Relay built the platform to close that gap — GitLab describing the problem is not the same as solving progressive delivery and verification.

**GitLab Duo Agent Platform:** GitLab's direction is agentic AI across DevSecOps. Much of it is pre-production — limited progressive delivery intelligence and post-deploy change correlation. "A single AI vendor from issue to MR is one thing — a platform that makes AI-generated code safe to ship at scale is another."

**Business context:** Watch for budget freezes, licence renegotiation, or consolidation pressure at renewal — these create evaluation windows for an integrated delivery layer.`},
    {title:"Discovery questions",open:true,content:`• "How much are you spending on GitLab AI add-ons today — are you on Duo Pro or Duo Enterprise?"
• "How do you validate deployments before promoting to production — is that automated or manual?"
• "When a bad deployment hits production, how fast can you roll back? Is it automatic?"
• "Which APM tools are you using — do they integrate with your CD process?"
• "Are all your teams on GitLab, or are some on GitHub or other SCMs?"
• "Is GitLab handling your IDP / developer portal, or is that a gap you're solving separately?"`},
  ]},
  {id:"ld",n:"LaunchDarkly",e:"🚩",c:WA,cats:["flags"],featured:true,str:"Feature flag market leader, strong brand, mature SDK ecosystem.",adv:"Relay Flags integrates natively with CD. Flags + experimentation + CD vs LD as a point solution.",wo:"Strong existing long-term contracts. Plant the expansion seed early; revisit at renewal.",sa:"In a CD conversation: 'How do you manage feature flags today?' If LD → 'We have Relay Flags natively integrated with CD — want to see how that works?'",
  d:`## LaunchDarkly — integration is the moat
**LD's genuine strengths:** Best-in-class SDK, strong enterprise adoption, mature experimentation.
**Relay Flags advantages:**
• Native CD integration: Deploy → flag to 1% → CV monitors → auto-expand or rollback. LD requires manual wiring.
• Economics: LD enterprise = high six figures annually at enterprise scale. Relay Flags is part of the Relay platform.
## Objection handling
• "We have a 3-year LD contract" → "When does it renew? Let's talk now so you have options."
• "Our devs love the LD SDK" → "Relay SDK is comparable. The integrated deploy story saves real workflow time."`},
  {id:"snyk",n:"Snyk",e:"🔍",c:ER,cats:["security"],featured:true,str:"SCA and SAST market leader. Strong developer-friendly UX, large OSS vulnerability database.",adv:"Pre-deployment only. No runtime API protection, no behavioral baselining, no AI Security module.",wo:"Strong developer adoption and brand. Often self-purchased by engineering teams.",sa:"'Snyk covers pre-deployment code scanning well. But if an AI agent is probing your APIs right now to map business logic, Snyk cannot see that. That's a different tool category.'",
  d:`## Snyk — pre-deployment only
**Where Snyk is genuinely strong:** SCA, developer-friendly SAST, large OSS vuln database, strong CI integration.
**Structural limitations vs Relay AST + WAAP + AI Security:**
• Pre-deployment only — zero runtime API protection, zero behavioral baselining
• Rule-based SAST — same 80-90% false positive architecture as GitLab
• No eBPF east-west traffic visibility
• No AI Security module
• Does not address the modern AI-era attack attack model — Snyk is a pre-deployment tool applied to a post-deployment threat surface
## The positioning
"Snyk covers the code layer well. Relay covers code-to-runtime-to-AI-systems. If your threat model has changed — and modern AI-era attack means it has — you need coverage that extends past the point of deployment."`},
  {id:"noname",n:"Noname / Salt",e:"🔌",c:A,cats:["security"],str:"API security specialists. Established API inventory and threat detection capability.",adv:"Require proxy or instrumentation — cannot see encrypted east-west traffic. No pipeline integration.",wo:"Existing deployment in security team. Strong API security brand recognition.",sa:"'How did you deploy it? Proxy? SDK? Is it capturing your internal service-to-service traffic — the encrypted east-west flows?' If no → open the eBPF gap.",
  d:`## Noname / Salt — instrumentation gap
**What they do well:** API inventory, API threat detection, established enterprise sales motion.
**Structural limitations vs Relay WAAP (WAAP):**
• Both require proxy insertion or SDK instrumentation — developer involvement and deployment overhead
• Neither can see encrypted east-west (service-to-service) traffic — where lateral movement happens
• Detection is signature-based or anomaly-threshold — not behavioral baseline per endpoint
• No pipeline integration — security is point-in-time, not embedded in delivery
**Win condition:** "WAAP is agentless eBPF — kernel-level capture, zero developer instrumentation, full visibility into encrypted east-west traffic. And instead of matching against known bad, it learns what good looks like per endpoint and flags everything else."`},
  {id:"wiz",n:"Wiz",e:"☁️",c:TL,cats:["security"],str:"Cloud security posture leader. Excellent infrastructure-layer visibility, strong brand.",adv:"Infrastructure-layer only. No pipeline integration, no behavioral API protection, no developer-facing SAST in CI.",wo:"C-suite visibility and strong cloud security brand. Often owned by security team with separate budget.",sa:"'Wiz is excellent at cloud infrastructure posture. But it doesn't touch the application layer — the code being written, the APIs running, the AI agents deployed. That's a different surface.'",
  d:`## Wiz — infrastructure layer only
**Where Wiz is genuinely strong:** Cloud security posture management (CSPM), cloud infra visibility, vulnerability prioritization, strong enterprise brand.
**Structural limitations:**
• Infrastructure-layer only — does not touch the application layer
• No pipeline integration — findings don't reach developers during development
• No behavioral API protection
• No AI Security module
## Co-existence play
Many customers will have Wiz in security and Relay in engineering. Don't fight it — position as complementary layers. "Wiz tells you what's wrong in your cloud infrastructure. Relay tells you what's wrong in your code before it deploys, what's happening to your APIs at runtime, and what your AI agents are doing."`},
  {id:"spinnaker",n:"Spinnaker",e:"⚙️",c:A,cats:["cd"],str:"Open source, Netflix heritage, battle-tested CD at scale.",adv:"Heavy operational overhead. Relay is managed, faster, adds AI verification.",wo:"Deep existing pipeline configs — migration effort is real. Lead with new value.",sa:"'When was the last time you upgraded Spinnaker? How long did that take? Did anything break?'",
  d:`## Spinnaker — "who maintains it?" is the question
Powerful, but notoriously painful to operate. Most installs require dedicated engineers. Upgrades are painful — breaking changes are common. Netflix/Google investment in Spinnaker has waned significantly.
## Relay advantages
• Managed SaaS — no infrastructure maintenance overhead
• Faster pipelines — Spinnaker is notoriously slow at scale
• AI verification — no ML-based rollback equivalent in Spinnaker
• Modern UX — Spinnaker's UI is legendarily difficult
**Migration approach:** Start with new services. Migrate high-pain pipelines when they cause the next incident.`},
  {id:"copilot",n:"GitHub Copilot",e:"🤖",c:TL,cats:["ai"],featured:true,str:"Market-leading AI code generation. Massive developer mindshare, 6+ IDE integrations, multi-model flexibility (GPT-4o, Claude, Gemini, Grok).",adv:"Copilot is pre-code. Relay is post-code. Zero overlap on CI/CD, deployment, SRE, security orchestration, cost — everything after code is written.",wo:"Developer love and brand recognition are enormous. Don't compete on code completion — you will lose that conversation.",sa:"'Copilot writes your code. Now what? How does it get built, tested, secured, and deployed to production? That's Relay — and unlike Copilot, our AI is included free.'",
  d:`## GitHub Copilot — May 2026 (complementary, not competitive)
**The master framing:** AI makes writing code cheap. Relay makes shipping that code safe. Together, they deliver the full compound return on your AI investment — not just half of it.
**The specific framing for Copilot:** Copilot and Relay are not competitors. Copilot owns pre-commit (code generation). Relay owns everything after — build, test, deploy, secure, operate. Position them as a complete AI SDLC together.
**"Copilot wrote your code. Relay delivers it."**
**The 33-step reality:** On average, 33 sequential processes stand between a code commit and a production deployment. Copilot accelerates one of them. Relay automates the remaining 32.
## Copilot capabilities (2025)
• Agent Mode: autonomous multi-file editing, self-healing errors, terminal commands (GA all VS Code users)
• Coding Agent: async background agent via GitHub Actions; assigns issues, creates PRs
• Multi-model: GPT-4o, Claude 3.5 Sonnet, Gemini 2.0 Flash, o3-mini, Grok 3 — BYOK supported
• **Architect Mode (preview):** High-level software design agent — proposes system architecture from natural language specifications
• IDE coverage: VS Code, Visual Studio, JetBrains, Eclipse, Xcode
• Pricing: $10/month individual, $19/user Business, $39/user Enterprise
**Enterprise pricing note (June 2026):** Copilot Enterprise is shifting to an AI Credits billing model for heavy users of agent features. Effective per-user cost for teams with intensive agentic usage is trending toward ~$60/user/month — validate with current pricing before quoting against Relay.
## Where Relay wins (everything after code)
• **Copilot has zero CI/CD automation** — pipeline creation, build intelligence, deployment strategies
• **No Continuous Verification** — no ML-based deployment validation, no auto-rollback
• **No security orchestration** — Copilot has CodeQL for code review only. Relay has 40+ scanner integrations, exploitability ranking, auto-remediation
• **No AI SRE** — no incident management, change correlation, or runbook automation
• **No cloud cost management**
• **Software Delivery Knowledge Graph** — Relay maps code → services → deployments → tests → environments → incidents → policies → costs. Copilot has no visibility beyond the code file.
## Key Relay differentiator: deterministic execution
**Jyoti Bansal (CEO):** "Our AI is not doing the deployment to production. Our AI is creating the deterministic pipeline to do the deployment to production." This addresses enterprise concerns about AI unpredictability in production — AI assists, humans and deterministic systems execute.
## Cursor Plugin — Relay meets developers in the IDE
For prospects asking "can Relay integrate into the developer workflow like Copilot does?" — yes. The Relay Cursor Plugin brings the full Relay delivery pipeline into the IDE: code change → vulnerability detection → CI/CD execution → security validation → approvals → deployment → operational insight, without leaving the editor.
## Pricing angle
Copilot: a per-seat AI add-on. Relay AI: included free with the platform.
## Killer discovery questions ("`},
  {id:"datadog",n:"Datadog",e:"🐶",c:TL,cats:["aisre"],featured:true,str:"Observability platform leader. APM, log management, dashboards, and incident management. Expanding into AI observability with LLM Observability product.",adv:"Datadog is post-deployment only. No CI/CD, no deployment strategies, no cloud cost optimisation, no security pipeline integration. Relay AI SRE adds the change intelligence Datadog lacks: the ability to correlate an incident to the deployment that caused it.",wo:"Pervasive observability data. Many engineering teams consider Datadog part of the furniture. Strong loyalty. Datadog's incident management (Bits AI) and AIOps capabilities are improving quickly.",sa:"'When an incident fires in Datadog, how do you find out what changed? How long does that take?' Datadog has the what (metrics/logs); Relay AI SRE has the why (change correlation) and the action (automated runbook, rollback, AI Scribe post-mortem).'",
  d:`## Datadog vs Relay AI SRE — the change intelligence gap
**Datadog's genuine strengths:** Best-in-class APM, log aggregation, distributed tracing. 500+ integrations. The observability standard in most engineering orgs.

## The structural gap: what vs. why
Datadog tells you *what* is broken — elevated error rate, latency spike, pod crash. It does not tell you *why* it happened or automatically connect the incident to the deployment, config change, or feature flag that caused it.

Relay AI SRE fills this gap:
• **Change correlation at incident onset** — automatically surfaces the deployment, config change, or FF toggle that preceded the incident, before an engineer opens Slack
• **Automated runbook execution** — Datadog can alert; Relay can act (restart service, roll back deployment, page the right person)
• **AI Scribe** — first-draft post-mortem written automatically from incident timeline; Datadog has no equivalent
• **On-call management** — integrated scheduling, escalation, and acknowledgement; Datadog incident management is newer and less mature

## Positioning
"Keep Datadog for observability — it's excellent. Add Relay AI SRE for the layer above it: the response layer that connects what Datadog sees to what changed, who to wake up, what to run, and how to prevent recurrence."

## The complementary play (most common)
Relay AI SRE ingests Datadog metrics as the primary signal source. The integration is native. Most AI SRE deals at Datadog accounts don't displace Datadog — they add the response intelligence layer on top.

## Discovery questions
• "When an incident fires in Datadog, how do you trace it back to what changed? How long does that take?"
• "How many engineers are on-call right now? What's the average time to detect and contain a production incident?"
• "Is Datadog integrated with your deployment pipeline? Does a bad deployment automatically create an incident?"
• "How do you currently write post-mortems? Who owns them, how long do they take, and how often do action items get completed?"`},
  {id:"factory",n:"Factory.ai",e:"🏭",c:WA,cats:["ai"],str:"Agent-native SDLC platform. 'Droids' for coding, code review, incident response, and migrations. #1 on Terminal-Bench (58.8%). significant late-stage funding. Backed by Khosla, Sequoia, Blackstone, NEA.",adv:"Factory has no CI/CD platform, no deployment strategies, no Continuous Verification, no cloud cost management. They write the code — Relay ships it.",wo:"Well-funded after late-stage rounds; growing fast with public enterprise logos spanning cloud, security, and financial services. Developer-first UX and best-in-class code generation.",sa:"'Where do your Droids deploy to? They still need CI/CD. Factory writes the code — Relay ships it safely with Continuous Verification.' Then: 'How do you verify AI-generated code works correctly at scale in production?'",
  d:`## Factory.ai — agent-native coding vs delivery platform
**What Factory is:** An agent-native software development platform with AI "Droids" — specialised agents for different SDLC tasks. Founded 2023. Well-funded after late-stage rounds (investors publicly associated include Khosla, Sequoia, Insight Partners, Blackstone, NEA). Public customer logos and design-partner stories include large enterprise names across cloud, security, and financial services.
**Positioning frame:** Factory is strong on code-level intelligence; Relay is strong on production deployments, CI/CD scale, and verification. Treat them as complementary layers — not a bake-off on autocomplete quality.
## The Droid lineup
• **Code Droid:** Features, refactoring, bug fixes, migrations (4 months → 3.5 days for COBOL migrations). #1 Terminal-Bench 58.8% — beats Claude Code, Codex, Cursor.
• **Reliability Droid:** Incident triage, RCA, troubleshooting, auto-documentation
• **Review Droid:** PR review, security checks, best practices
• **Knowledge Droid:** Codebase research, documentation, spec writing
**HyperCode:** Factory's technical moat — multi-resolution code graph traversal that maps relationships, imports, and dependencies across the entire codebase (not just vector search). Enables Droids to understand code at architectural rather than token level. For enterprise accounts with millions of lines of code, this is a genuine capability differentiator for code migration and refactoring tasks.
## Factory's critical gaps (Relay's moat)
• **No CI/CD platform** — depends entirely on the customer's existing tools
• **No deployment strategies** — no Canary, Blue/Green, Rolling
• **No Continuous Verification** — cannot verify production health post-deploy
• **No GitOps** — no ArgoCD-native integration
• **No cloud cost management** — Cloud Cost Management has no Factory equivalent
• **No feature flags** — Relay Flags has no Factory equivalent
• **Security is bolted-on** — Review Droid checks vs. Relay's 40+ scanner security scanning/AST
## Recommended positioning
**Don't compete on code generation — Factory is category-leading there.** Position as complementary and necessary: "Factory accelerates code creation. That means more deployments, faster. Who's verifying those deployments work in production? That's Relay."
**The narrative:** AI coding agents like Factory are accelerating code generation → more code → more deployments → more risk. The bottleneck shifts from writing code to shipping safely. Relay is built for this world.
## Discovery questions
• "Once Factory writes the code, how does it get to production?"
• "How do you verify AI-generated code works correctly at scale?"
• "What's your deployment strategy — Canary, Blue/Green, or rolling?"
• "How do you manage cloud costs when Factory is accelerating your deployment frequency?"
• "What security scanning gates prevent AI-generated vulnerabilities from reaching production?"`},
  {id:"argocd",n:"ArgoCD",e:"🐙",c:A,cats:["cd"],featured:true,str:"The GitOps standard for Kubernetes. Declarative, reconciles cluster state from Git automatically. CNCF graduated. Free and widely adopted.",adv:"ArgoCD is GitOps-only. No multi-cloud, no approval gates, no Continuous Verification, no cloud cost management. Relay CD includes native ArgoCD-compatible GitOps plus the enterprise layer on top.",wo:"Deeply embedded in Kubernetes-native organisations. Many teams have invested heavily in ArgoCD workflows and plugin customisation. Relay actually integrates with ArgoCD rather than replacing it.",sa:"'When an ArgoCD deployment causes a production incident, how do you detect it and roll back? How long does that take?'",
  d:`## ArgoCD — GitOps foundation vs enterprise CD platform
**What ArgoCD is:** The CNCF-graduated open-source GitOps CD tool for Kubernetes. Continuously reconciles the live cluster state with the desired state declared in Git. Extremely popular in cloud-native organisations — often the first CD tool teams adopt when moving to Kubernetes.
**The key distinction:** ArgoCD solves GitOps for Kubernetes. Relay CD solves enterprise software delivery across multi-cloud, multi-team, multi-tool environments — with ArgoCD as a first-class integration.
## ArgoCD's critical gaps
• **Kubernetes-only** — no multi-cloud, no serverless, no VM or traditional deployment support
• **No Continuous Verification** — post-deploy health monitoring requires separate tooling
• **No approval gates** — change management, ITSM integration, and audit trails require custom implementation
• **No release orchestration** — multi-service deployment coordination is manual
• **No cloud cost management** — no connection between deployments and cloud spend
• **No built-in RBAC at enterprise scale** — SSO and fine-grained permissions require configuration overhead
## Relay positioning
**Don't displace ArgoCD — wrap it.** Relay provides native Relay-managed GitOps agents. Teams keep their GitOps workflows; Relay adds enterprise approval gates, multi-cloud support, Continuous Verification, and release orchestration on top.
**The conversation:** "We have 400+ engineers all using ArgoCD." → "Great. Relay integrates natively with ArgoCD. You get all your existing GitOps workflows plus enterprise CV, approval gates, and one-click rollback. Nothing has to change."
## Discovery questions
• "When an ArgoCD sync fails in production, who gets notified and how fast is rollback?"
• "Do you have change management or audit trail requirements on top of ArgoCD today?"
• "How do you manage ArgoCD deployments across more than one cloud or cluster family?"
• "What happens when you need a deployment approval from a non-engineering stakeholder?"`},
  {id:"circleci",n:"CircleCI",e:"⭕",c:WA,cats:["ci"],str:"Established cloud CI platform. Good developer UX, fast setup, strong orb ecosystem. Large existing customer base.",adv:"No ML-based test optimisation or AI build failure analysis. Relay CI adds Test Intelligence (90%+ build time reduction in large repos), AI-powered failure diagnosis, and enterprise governance that CircleCI does not offer.",wo:"Significant installed base. CircleCI has invested in improving performance and has an enterprise product. Deep orb and pipeline configurations represent real migration effort.",sa:"'What percentage of your CI builds are failing due to flaky tests? And what is your median build time for your largest service?'",
  d:`## CircleCI vs Relay CI — build intelligence gap
**What CircleCI is:** An established cloud CI/CD platform with a large developer community, extensive orb ecosystem, and fast onboarding. Known for reliable cloud build infrastructure and a developer-friendly YAML config.
**The key strategic gap:** CircleCI runs your builds. Relay CI learns from them. AI (Relay AI Development Assistant) analyses build failures, recommends fixes, and identifies flaky tests — turning CI from a pass/fail gate into a learning system.
## CircleCI's critical gaps
• **No ML-based test optimisation** — Test Intelligence not available; all tests run every build
• **No AI build failure analysis** — engineers investigate failures manually
• **No built-in Continuous Verification** — no connection to post-deploy monitoring
• **No governance or policy-as-code** — no OPA integration for pipeline governance
• **Scaling costs** — credit-based pricing can scale unpredictably at high build volume
• **Limited multi-cloud CD** — CI-focused; complex CD workflows require additional tooling
## Relay positioning
**Test Intelligence is the pivot.** Relay Test Intelligence uses ML to run only the tests statistically likely to catch bugs in the changed code — reducing test times 90%+ in large codebases. CircleCI has no equivalent.
**The cost story:** "You are paying for every test on every build. Relay runs only the tests that matter, based on what actually changed. At your scale, that is likely an 80% reduction in build compute."
## Discovery questions
• "What is your current average build time for your core services? What was it 12 months ago?"
• "How many hours a week do engineers spend investigating flaky test failures?"
• "Do you have visibility into which tests are actually protecting you vs which are just adding time?"
• "What is your CI compute spend per month, and is it growing?"`},
  {id:"backstage",n:"Backstage",e:"🎭",c:TL,cats:["idp"],featured:true,str:"CNCF-incubated open-source developer portal. Strong community, large plugin ecosystem, Spotify pedigree. The de facto IDP framework standard.",adv:"Backstage requires a dedicated platform engineering team to build, host, and maintain. Relay Portal is a Backstage-compatible managed service — same workflows, none of the operational overhead.",wo:"Strong community and brand recognition in platform engineering circles. Many large enterprises have already invested in custom Backstage implementations and consider it a strategic platform.",sa:"'How many engineers does your platform team dedicate to maintaining your Backstage instance? And what is on their backlog right now?'",
  d:`## Backstage vs Relay Portal — build vs buy
**What Backstage is:** An open-source developer portal framework created by Spotify and donated to the CNCF. Provides a software catalog, templated golden paths, and a plugin system for surfacing tooling in a single UI. The accepted framework standard for internal developer platforms.
**The fundamental question:** Build your own Backstage instance (ongoing engineering investment) or adopt Relay Portal (Backstage-compatible, managed, pre-integrated with Relay delivery).
## The Backstage DIY cost
• **Engineering investment:** Building a production-grade Backstage instance typically requires 2-4 dedicated platform engineers for 6-18 months
• **Ongoing maintenance:** Plugin updates, security patches, infrastructure, customisation — a continuous, never-finished project
• **Time to value:** Months before developers see anything useful; years before the catalog is accurate
• **Hidden costs:** Hosting, observability, authentication integration, SSO — each requires separate work
## Relay Portal advantages
• **Managed Backstage-compatible service** — no infrastructure to run, no plugins to patch
• **Pre-integrated with Relay CD, CI, CV** — service catalog connected to live deployment and reliability data
• **Out-of-the-box golden paths** — scaffold services with CI pipelines, IaC, and monitoring pre-wired
• **Relay AI** — AI assistant in the portal for developer self-service and runbook guidance
## Positioning
**"We are already running Backstage."** → "How many engineers maintain it? What is on their backlog? Relay Portal is Backstage-compatible — you keep your workflows and your catalog, your platform team gets that time back to build higher-value things."
**"We are evaluating Backstage."** → "You can build it yourself in 12-18 months with 3 engineers — or you can have developers self-serving on day one with Relay Portal. What does that time-to-value difference mean for your platform engineering roadmap?"
## Discovery questions
• "How long did it take (or how long do you estimate) to stand up a production Backstage instance?"
• "What percentage of your developers actually use the portal weekly vs the number you built it for?"
• "How accurate is your software catalog today — do developers trust it?"
• "What is the biggest gap between what your IDP does today and what your developers need?"`},
  {id:"artifactory",n:"JFrog Artifactory",e:"🐸",c:WA,cats:["ar"],str:"The enterprise artifact repository standard. Supports 30+ package formats. Deep supply chain security via JFrog Advanced Security and Xray. Large installed base.",adv:"JFrog is a standalone artifact repository requiring separate integration with every CI/CD tool. Relay Artifact Registry is natively integrated with Relay CI and CD — one platform, no glue code.",wo:"Deeply embedded across large enterprises. Multi-year contracts. JFrog's supply chain security story (Xray, Advanced Security) is genuinely strong. Migration effort from Artifactory is significant.",sa:"'How much engineering time goes into maintaining the integrations between Artifactory and your CI/CD pipelines? When was the last time a pipeline broke because of an integration update?'",
  d:`## JFrog Artifactory vs Relay Artifact Registry
**What JFrog Artifactory is:** The most widely deployed enterprise artifact repository, supporting Docker, Helm, Maven, npm, PyPI, Gradle, and 25+ other package formats. JFrog's broader platform includes Xray (supply chain security), Distribution (CDN-delivered release management), and Advanced Security (SAST/SCA).
**The key distinction:** JFrog is a dedicated artifact management platform requiring integration with every other tool. Relay Artifact Registry is natively embedded in the delivery platform — artifacts flow directly from build to deployment without integration overhead.
## JFrog's critical gaps vs Relay
• **No native CI/CD** — integrates with every pipeline tool but is native to none
• **Integration maintenance** — webhooks, APIs, and tokens connecting Artifactory to Jenkins/GHA/Relay require ongoing engineering maintenance
• **Separate licensing** — Xray, Distribution, and Advanced Security are separate product tiers
• **Operational overhead** — self-managed Artifactory requires infrastructure, scaling, and patching
## Where JFrog is genuinely strong
• 30+ package format support (Maven, Gradle, CocoaPods, Composer — the long tail)
• Xray's deep dependency scanning and CVSS correlation
• Large existing enterprise installed base with deep integrations
• JFrog Distribution for CDN-delivered binary distribution at scale
## Relay positioning
**"We already have Artifactory."** → "Relay CD integrates natively with Artifactory as an artifact source and deployment trigger. You keep Artifactory for storage; Relay adds the deployment intelligence on top — Continuous Verification, automated rollback, multi-cloud delivery."
**Greenfield:** → "Relay Artifact Registry gives you registry, CI, and CD in one platform. No JFrog license to manage, no integration to maintain."
## Discovery questions
• "When a new vulnerability is found in a published artifact, how long before all deployments using that artifact are identified and blocked?"
• "How many integrations connect Artifactory to your build and deploy pipelines today? Who maintains them?"
• "Do you have a supply chain security posture across all artifact types — not just containers?"
• "What is your Artifactory renewal coming up — are you looking to consolidate?"`},
  {id:"dynatrace",n:"Dynatrace",e:"🔮",c:TL,cats:["aisre"],str:"Enterprise AI-powered observability. Davis AI for automated root cause analysis. Full-stack monitoring from infrastructure to user experience. Strong in regulated industries.",adv:"Dynatrace is post-deployment observability. No CI/CD, no deployment strategies, no change correlation. Relay AI SRE adds the deployment context Dynatrace cannot: what changed, when, and why it broke.",wo:"Dynatrace's Davis AI is genuinely best-in-class for automated causal analysis. Large enterprise contracts and deep integration. The observability platform is category-leading.",sa:"'When Dynatrace fires an incident alert, what is the first thing your team does to find out what changed? How long does that investigation take?'",
  d:`## Dynatrace vs Relay AI SRE — observability vs change intelligence
**What Dynatrace is:** An enterprise-grade full-stack observability and AIOps platform. Davis AI delivers automated root cause analysis, anomaly detection, and causal relationship mapping. Broad coverage from infrastructure and containers through APM to real user monitoring and synthetic testing.
**The strategic gap:** Dynatrace excels at finding incidents and diagnosing symptoms. Relay AI SRE answers the question Dynatrace cannot: "Which deployment caused this?" — and then acts on the answer.
## Dynatrace's genuine strengths
• Davis AI: Best-in-class automated causal RCA — correlates metrics, logs, traces, and topology automatically
• OneAgent: Auto-instrumentation across the full stack with minimal configuration
• Full-stack coverage: Infrastructure → containers → APM → user experience → synthetic
• Strong in regulated industries: Financial services, healthcare, government procurement pedigree
## The change intelligence gap
• **No CI/CD integration** — Dynatrace has no deployment pipeline of record
• **No Continuous Verification** — cannot gate a deployment based on post-deploy health signals
• **No automated rollback** — incident response requires human decision to roll back via external tooling
• **No AI-generated runbooks** — Dynatrace alerts; engineers still write and follow runbooks manually
• **No DORA metrics** — no connection between deployment frequency, change failure rate, and cost
## Relay positioning
**"We use Dynatrace for everything."** → "Relay AI SRE integrates with Dynatrace as a verification provider — Dynatrace sends the health signals, Relay decides whether the deployment is safe to proceed. You get Dynatrace's best-in-class observability plus automated deployment verification."
**The MTTR conversation:** "Dynatrace tells you there is an incident. How long from alert to identifying the deployment that caused it? Relay has that context the moment the alert fires."
## Discovery questions
• "When Dynatrace fires a P1 alert, what is your mean time from alert to identifying the causal change?"
• "Does your team have automated rollback capability, or is rollback a manual decision during incidents?"
• "How does Dynatrace integrate with your deployment process — do deployments trigger anything in Dynatrace automatically?"
• "Are you measuring DORA metrics today? If so, where does that data come from?"`},
  {id:"newrelic",n:"New Relic",e:"📡",c:TL,cats:["aisre"],str:"Full-stack observability platform with a generous free tier. Unified data platform (NRDB) for metrics, logs, traces, and events. Strong developer adoption.",adv:"New Relic is observability-only. No CI/CD, no deployment verification, no automated rollback. Relay AI SRE adds the delivery intelligence layer — connecting deployment events to production outcomes.",wo:"New Relic's developer-led adoption strategy and generous free tier creates organic sticky usage. NRDB's unified data model is architecturally distinctive. Investment in AI/ML capabilities is accelerating.",sa:"'When a New Relic alert fires, how do your engineers figure out if a recent deployment caused it? What does that investigation look like?'",
  d:`## New Relic vs Relay AI SRE — the delivery context gap
**What New Relic is:** A cloud-based full-stack observability platform built on NRDB (New Relic Database) — a purpose-built time-series and event database that unifies metrics, logs, traces, events, and profiles under a single query interface (NRQL). Developer-friendly pricing drives widespread organic, bottom-up adoption.
**The strategic framing:** New Relic tells you what your application is doing. Relay tells you what your team just deployed — and connects those two facts automatically.
## New Relic's genuine strengths
• NRDB unified data model: single query language (NRQL) across all telemetry types
• Generous free tier and developer-friendly onboarding drive organic adoption
• Strong APM with CodeStream for in-IDE observability
• AI/ML investment: anomaly detection, alert intelligence reducing noise
• Consumption-based pricing removed the per-user barrier
## The delivery intelligence gap
• **No deployment pipeline** — New Relic ingests change markers but is not the system of record for deployments
• **No Continuous Verification** — cannot gate or pause a deployment based on live health signals
• **No automated rollback** — incident response remains manual; New Relic alerts but does not act
• **No AI runbook generation** — AI Scribe, automated post-mortems, and guided response do not exist in New Relic
• **No DORA metrics platform** — change failure rate and lead time require external pipeline data
## Relay positioning
**"We use New Relic for monitoring."** → "Relay AI SRE uses New Relic as a verification source — New Relic health signals gate your Relay deployments. Abnormal post-deploy behaviour triggers automatic rollback. You keep New Relic as your observability layer; Relay adds the action layer."
## Discovery questions
• "What is your process when a New Relic alert fires at 2am — how does your team figure out if a deployment caused it?"
• "Do you have automated rollback today, or does rollback require an engineer to trigger it manually?"
• "How are you tracking DORA metrics across your teams — deployment frequency, change failure rate?"
• "Are you measuring whether your AI coding tools are improving or degrading your production stability?"`},
  {id:"linearb",n:"LinearB",e:"📊",c:WA,cats:["aidi"],str:"Engineering metrics and workflow automation platform. WorkerB AI for PR review, cycle time analytics, and team-level DORA metrics. Developer-friendly onboarding.",adv:"LinearB measures engineering activity from Git and Jira. Relay Engineering Insights connects metrics to delivery outcomes — change failure rate, cloud cost, and AI-generated vs human code quality, with live pipeline data LinearB cannot access.",wo:"LinearB has strong developer adoption and a compelling ROI story around cycle time reduction. WorkerB AI for automated PR review is genuinely useful. Growing enterprise traction.",sa:"'LinearB shows you your cycle time — but when cycle time improves, can you tell if that is because of better code quality, fewer production incidents, or just faster reviews? That is the gap Relay Engineering Insights fills.'",
  d:`## LinearB vs Relay Engineering Insights — metrics vs intelligence
**What LinearB is:** An engineering metrics and workflow automation platform. Tracks cycle time, PR throughput, deployment frequency, and DORA metrics at the team level. WorkerB AI automates PR review summaries, flags risky changes, and generates sprint reports. Strong developer experience, fast onboarding from Git and SCM connection.
**The key distinction:** LinearB surfaces engineering metrics. Relay Engineering Insights connects those metrics to delivery outcomes — change failure rate, cloud cost impact, and AI-generated code quality — with the full pipeline context LinearB's Git-only data model cannot provide.
## LinearB's critical gaps
• **Git-only data model** — metrics derived from commits, PRs, and Jira; no deployment or production context
• **No change failure rate** — cannot measure whether faster development leads to more production incidents
• **No AI code quality** — cannot distinguish AI-generated code quality from human-authored code
• **No cloud cost correlation** — no connection between engineering activity and cloud spend
• **No pipeline integration** — deployment metrics sourced from webhooks, not first-party pipeline data
## Relay Engineering Insights advantages
• **Pipeline-native data model** — DORA metrics sourced from Relay CD deployments, not Git estimates
• **AI vs human code quality** — measures change failure rate and incident rate for AI-generated vs human code
• **Cloud cost correlation** — links engineering velocity to cloud spend changes
• **Full SDLC visibility** — from commit through build, deploy, and production outcome
## Discovery questions
• "Are you measuring the change failure rate for AI-generated code separately from human-authored code?"
• "When LinearB shows your cycle time improving, can you tell if that translates to fewer production incidents?"
• "How do you know if faster deployment velocity is costing you more in cloud spend or production incidents?"
• "What data sources power your DORA metrics today — and how confident are you in the accuracy?"`},
  {id:"jellyfish",n:"Jellyfish",e:"🪼",c:WA,cats:["aidi"],str:"Engineering management platform for capacity planning, investment allocation, and executive reporting. Strong in connecting engineering work to business outcomes at the VP/CTO layer.",adv:"Jellyfish is an executive reporting layer. Relay Engineering Insights is an operational intelligence layer — measuring delivery quality, AI code impact, and pipeline efficiency in addition to business alignment metrics.",wo:"Jellyfish has strong traction with VP Engineering and CTO buyers. The ROI story around investment alignment and capacity planning resonates at the executive level. Often bought alongside engineering tools.",sa:"'Jellyfish tells your CTO how engineering investment is allocated. How does your team know whether that investment is actually delivering quality outcomes in production?'",
  d:`## Jellyfish vs Relay Engineering Insights — alignment vs delivery intelligence
**What Jellyfish is:** An engineering management platform focused on investment alignment and executive reporting. Connects Jira, Git, and HRIS data to show how engineering capacity maps to business priorities — helping VPs and CTOs allocate resources, communicate progress, and justify headcount.
**The positioning difference:** Jellyfish answers "Are we working on the right things?" Relay Engineering Insights answers "Are we delivering quality outcomes from the things we are working on?"
## Jellyfish's genuine strengths
• Investment alignment: Shows the split between feature work, tech debt, and operational maintenance
• Executive communication: Pre-built reports for board and leadership consumption
• Capacity planning: Headcount and sprint planning connected to business priorities
• HRIS + Jira integration: Links people, work items, and engineering activity in one model
## Relay Engineering Insights's differentiated view
• **Delivery quality metrics** — change failure rate, MTTR, and deployment frequency from live pipeline data
• **AI code intelligence** — quality and incident rate for AI-generated vs human code; no equivalent in Jellyfish
• **Pipeline efficiency** — build time, test coverage, flaky test rate, and infrastructure cost per team
• **Business outcome connection** — cloud cost per deployment, per team, per feature flag
## The combined story
In large enterprises, Jellyfish (strategic layer) and Relay Engineering Insights (operational layer) can co-exist:
• Jellyfish: "Are we investing in the right roadmap?"
• Engineering Insights: "Are we executing that roadmap without accumulating production risk?"
## Discovery questions
• "Who are the primary consumers of your engineering analytics today — engineering managers, or VPs and C-suite?"
• "Do your DORA metrics come from Jellyfish, or a separate tool? How accurate do you believe they are?"
• "Can you tell today whether your AI coding investment is reducing or increasing your production incident rate?"
• "What is missing from your current engineering metrics — what questions can you not answer?"`},
  {id:"cloudhealth",n:"CloudHealth",e:"☁️",c:TL,cats:["finops"],str:"VMware's FinOps and cloud management platform. Multi-cloud cost visibility, chargeback, governance policies, and rightsizing recommendations.",adv:"CloudHealth is a reporting and governance layer — it shows you where you are spending. Relay Cloud Cost Management acts on it — AutoStopping, budget enforcement, and deployment-linked cost intelligence built into the delivery pipeline.",wo:"Large installed base across enterprise VMware customers. Broad multi-cloud coverage and strong cost allocation and chargeback capabilities. Broadcom acquisition of VMware may affect roadmap and pricing.",sa:"'CloudHealth tells you which teams are overspending. How do you get those teams to actually change their behaviour? That is the enforcement layer Relay Cloud Cost Management adds.'",
  d:`## CloudHealth vs Relay Cloud Cost Management — visibility vs action
**What CloudHealth is:** VMware's multi-cloud FinOps and cost management platform (acquired by VMware in 2018; now part of the Broadcom portfolio). Provides cloud cost visibility, chargeback/showback, rightsizing recommendations, governance policies, and reservation management across AWS, Azure, and GCP.
**The key distinction:** CloudHealth gives you the report. Relay Cloud Cost Management gives you the report and then automatically stops the waste — without a human in the loop.
## CloudHealth's genuine strengths
• Multi-cloud cost visibility across AWS, Azure, GCP, and Alibaba Cloud
• Chargeback/showback: Attribute cloud costs to business units, teams, and cost centres
• Governance policies: Tagging compliance, budget alerts, reserved instance management
• Long track record and enterprise customer base
• Broadcom packaging with VMware infrastructure tools
## Relay Cloud Cost Management's differentiated capabilities
• **AutoStopping:** ML-powered automatic idle resource shutdown — saves cloud costs without engineer intervention. No CloudHealth equivalent.
• **Deployment cost correlation:** Cloud spend linked to deployment events — see the cost impact of a specific release
• **Budget enforcement at pipeline level** — cost budgets enforced in CI/CD gates, not just reported after the fact
• **AI cost anomaly detection** — flags unexpected cost spikes correlated to deployment changes
## Positioning
**"We have CloudHealth."** → "CloudHealth is your reporting layer. Relay Cloud Cost Management is your action layer. AutoStopping alone saves 30-50% of dev/staging waste without any engineer action. CloudHealth shows you the problem; Relay fixes it automatically."
## Discovery questions
• "What percentage of your cloud cost recommendations from CloudHealth actually get implemented? What is the bottleneck?"
• "Do you have visibility into which deployments are causing cost spikes — not just which resources are expensive?"
• "How much of your cloud spend is dev and staging environments running when no one is using them?"
• "Is your cloud cost conversation happening at the team level, or only at the FinOps and finance level?"`},
  {id:"apptio",n:"Apptio",e:"💼",c:TL,cats:["finops"],str:"IBM's Technology Business Management (TBM) platform. Strategic IT financial management, IT cost allocation, and investment planning for the CIO/CFO audience.",adv:"Apptio is IT financial governance for the CIO — allocation, planning, and chargeback. Relay Cloud Cost Management is engineering-level FinOps for developers — automated cost action, deployment cost correlation, and cloud waste elimination.",wo:"Deep relationships at the CIO and CFO level in large enterprises. Strong in regulated industries and IT cost allocation. IBM acquisition provides enterprise credibility and sales reach.",sa:"'Apptio tells your CIO how IT budget is allocated to cloud. How does your engineering team know which deployments and which services are actually causing the cloud bill to grow?'",
  d:`## Apptio vs Relay Cloud Cost Management — IT financial management vs engineering FinOps
**What Apptio is:** IBM's Technology Business Management platform, used by CIOs and CFOs to allocate IT costs, plan technology investments, and report technology ROI to the business. Operates at the strategic financial layer — not the engineering execution layer.
**The positioning:** Apptio and Relay Cloud Cost Management serve different buyers in the same organisation. Apptio is for the CIO/CFO; Relay Cloud Cost Management is for engineering teams. They can co-exist.
## Apptio's domain
• Strategic IT cost allocation and chargeback to business units
• IT investment portfolio management and planning
• Technology budget forecasting and variance reporting
• TBM (Technology Business Management) framework compliance
• IBM Cloudability integration for cloud cost data
## Relay Cloud Cost Management's differentiated capabilities
• **Engineering-level FinOps** — built for the team running cloud resources, not just the team reporting on them
• **AutoStopping** — automatic idle resource shutdown; saves 30-50% dev/staging waste without engineer action
• **Deployment-linked cost intelligence** — connects cloud cost spikes to specific deployments and releases
• **Pipeline-enforced budgets** — cost governance enforced at the pipeline gate, not just in a spreadsheet
• **AI cost anomaly detection** — correlates cost anomalies with deployment events in real time
## The co-existence conversation
In enterprises with Apptio at the strategic layer and Relay Cloud Cost Management at the engineering execution layer:
• Apptio feeds the CIO/CFO report: "Cloud spend by business unit, quarter, and programme"
• Relay Cloud Cost Management feeds the engineering team: "This deployment by Team X caused a 23% cost spike in us-east-1"
## Discovery questions
• "Where does the cloud cost conversation happen in your organisation — CIO/CFO level or engineering team level?"
• "How does your engineering team find out which services are burning cloud budget — is that a real-time view?"
• "What percentage of your cloud cost recommendations get actioned? Who owns the follow-through?"
• "How quickly can you connect a cloud cost spike to a specific deployment or team?"`},
  {id:"cursor",n:"Cursor / Windsurf",e:"✏️",c:A,cats:["ai"],str:"AI-native code editors with best-in-class inline code generation, codebase understanding, and agent-mode task automation. Fast developer adoption — Cursor claimed 1M+ users in 2025.",adv:"Cursor and Windsurf write code inside the IDE — they do not ship it to production safely. No CI/CD, no deployment verification, no cloud cost control. Relay ships AI-generated code safely at scale.",wo:"Extremely strong developer-led adoption — Cursor is the de facto AI editor for many engineering teams. Engineers will advocate for it loudly. The IDE is a different layer than the delivery platform — they co-exist, not compete.",sa:"'Your developers are already using Cursor. Are you measuring the change failure rate for Cursor-generated code vs human-authored code? And when it breaks in production, what is your rollback time?'",
  d:`## Cursor / Windsurf vs Relay AI — the last mile gap
**What Cursor and Windsurf are:** AI-native code editors built around large language model capabilities. Cursor (by Anysphere) and Windsurf (by Codeium; acquired by OpenAI in 2025 per public reports) provide inline code generation, codebase-aware autocomplete, multi-file agent edits, and natural language coding. The dominant AI editor category — Cursor alone claimed 1M+ users in 2025.
**The strategic framing:** Cursor and Windsurf accelerate code creation. Relay ships that code safely to production and measures whether it is actually working. These are complementary — but the conversation reveals a critical gap: AI-accelerated code generation without AI-accelerated delivery verification creates new production risk.
## The AI velocity paradox
• Cursor generates more code, faster → more PRs, more commits, more deployments
• More deployments without proportional improvement in verification → higher incident rate
• Most organisations are measuring lines of code or PR throughput, not change failure rate for AI code
• Relay Engineering Insights measures AI-generated code quality separately from human code — most orgs do not have this visibility
## What Cursor and Windsurf do not solve
• **No CI pipeline** — code generated in the IDE still needs to be built, tested, and scanned
• **No deployment** — code written in Cursor still deploys via whatever CD tooling the org uses
• **No Continuous Verification** — no automated check that what Cursor generated actually works in production
• **No rollback** — when AI-generated code breaks, rollback is manual without Relay CD
• **No cloud cost connection** — accelerated code output means accelerated infrastructure costs
## Relay positioning
**"Everyone uses Cursor."** → "Great. We measure the change failure rate for Cursor-generated code separately. Do you? Most teams assume AI code is safe because it looks clean — Engineering Insights is the only platform that validates that assumption with production data."
**The governance angle:** "As AI code generation scales, your security and compliance team will eventually ask: 'Do we know what is AI-generated in our codebase?' supply-chain security and AST give you that audit trail."
## Discovery questions
• "Are you measuring the change failure rate for AI editor-generated code separately from human code?"
• "When a Cursor-generated PR breaks in production, what is your rollback time today?"
• "What code review process do you have for AI-generated code — is a human reviewing every line?"
• "Has your deployment frequency increased since adopting Cursor? Has your incident rate kept pace?"`},
  {id:"nexus",n:"Nexus Repository",e:"📦",c:WA,cats:["ar"],str:"Sonatype's widely deployed artifact repository supporting Maven, npm, Docker, and other formats. Open-source edition (Nexus OSS) has substantial installed base. Strong Java/Maven ecosystem integration.",adv:"Nexus is a standalone repository with no native CI/CD integration — every pipeline connection requires custom configuration and ongoing maintenance. Relay Artifact Registry is natively embedded in the delivery platform: build outputs flow directly to registry and on to deployment without glue code or separate licensing.",wo:"Deep installed base in Java-heavy enterprises. Many teams have years of Maven and npm repository configuration invested in Nexus. Sonatype Nexus IQ (Lifecycle) adds SCA scanning tightly coupled to the repository — a combined story that requires two Relay products to match.",sa:"'How much engineering time goes into maintaining the webhook and API integrations between Nexus and your CI/CD pipelines? When did one of those integrations last break?'",
  d:`## Nexus Repository vs Relay Artifact Registry
**What Nexus Repository is:** Sonatype's open-source and commercial artifact repository supporting Maven, npm, Docker, PyPI, NuGet, Helm, and a dozen other formats. The OSS edition is widely deployed in enterprises, often as legacy infrastructure that predates the organisation's current CI/CD platform.
## The integration tax
Nexus OSS is free — but connecting it to Jenkins, GitHub Actions, or any other pipeline tool requires custom webhook configuration, credential management, and ongoing maintenance. Every pipeline upgrade risks breaking those integrations. Relay Artifact Registry is native to the Relay platform: artifacts produced by Relay CI flow directly to the registry and trigger Relay CD deployments without any integration layer.
## Key gaps vs Relay
• **No native CI/CD** — Nexus stores artifacts; it does not build or deploy them
• **No supply chain security** — Nexus OSS has no built-in SCA scanning; Nexus IQ is a separate paid product
• **No Continuous Verification** — no connection between artifact deployment and post-deploy health
• **Self-managed operational overhead** — upgrades, storage scaling, and plugin maintenance fall on the platform team
## Relay positioning
**"We have Nexus deeply embedded."** → Relay CD integrates natively with Nexus as an artifact source and deployment trigger. The migration path is incremental: new projects use Artifact Registry natively, existing Nexus repos remain until sunset at renewal.
## Discovery questions
• "How many engineers maintain the integrations between Nexus and your CI/CD pipelines today?"
• "When a critical vulnerability is found in a published artifact, how long to identify every deployment using that artifact?"
• "Is Nexus IQ (Lifecycle) deployed alongside Nexus? Who owns that budget — engineering or security?"
• "When does your Nexus support contract renew? Are you evaluating consolidation options?"`},
  {id:"portio",n:"Port.io",e:"🚪",c:TL,cats:["idp"],str:"Modern developer portal built on a flexible blueprint data model, scorecards, self-service actions, and workflow automation. Strong product velocity and growing enterprise traction. Developer-friendly UX and low time-to-value for portal setup.",adv:"Port.io is a standalone portal layer that integrates with external CI/CD tools via webhook and API. Relay Portal is native to the Relay delivery platform — self-service actions trigger real Relay pipelines with governance, approvals, and Continuous Verification built in. AI AI assistant is included.",wo:"Port.io's flexible blueprint model is genuinely powerful for custom service catalog data models. Fast setup and strong developer experience. Growing enterprise deals. Not dependent on any single delivery platform — appealing to multi-tool environments.",sa:"'When a developer uses a Port self-service action to trigger a deployment, what actually runs it on the other side — and does that deployment have automated verification and rollback?'",
  d:`## Port.io vs Relay Portal — portal layer vs native delivery integration
**What Port.io is:** A developer portal platform built around a flexible entity data model (blueprints) that can represent any software asset. Scorecards measure service maturity. Self-service actions trigger workflows via webhooks to external tools. Strong visual UX, fast onboarding.
## The integration gap
Port.io is tool-agnostic by design — self-service actions proxy out to Jenkins, GitHub Actions, or any CD tool via webhook. This is a strength in heterogeneous environments but creates a gap: the portal does not know whether the triggered pipeline succeeded, applied governance policies, or ran post-deploy verification.
## Relay Portal advantages
• **Native pipeline execution** — self-service actions trigger real Relay CD pipelines with OPA governance, approval gates, and Continuous Verification built in
• **Live delivery data in the catalog** — service cards show actual deployment status, change failure rate, and incident history from Relay
• **AI AI assistant** — built-in AI for developer self-service guidance, runbook suggestions, and golden path recommendations
• **Backstage-compatible** — same developer workflows, managed service, no infrastructure to run
## Discovery questions
• "When a developer triggers a self-service action in Port, how does the portal know if the resulting pipeline succeeded or failed?"
• "Are your delivery governance policies enforced inside Port workflows, or outside them?"
• "How many engineers maintain the webhook integrations between Port and your downstream tooling?"
• "Do your service scorecards pull live deployment and reliability data, or is that updated manually?"`},
  {id:"incidentio",n:"Incident.io",e:"🚨",c:TL,cats:["aisre"],str:"Slack-native incident management platform with on-call scheduling, automated workflows, AI-generated post-mortems, and retrospective tooling. Strong developer UX and fast enterprise adoption.",adv:"Incident.io manages the incident response process but has no visibility into what changed before the incident. Relay AI SRE provides change correlation at alert onset — surfacing the deployment, config change, or feature flag that caused the incident — plus automated rollback without human intervention.",wo:"Incident.io's Slack-native UX is genuinely well-loved by engineering teams. Strong post-mortem generation and action-item tracking. Growing enterprise contracts and expanding AI capabilities. Deeply embedded in incident response workflows.",sa:"'When an incident fires, how does Incident.io help you figure out what deployment or config change caused it? How long does that root-cause step take before you can act?'",
  d:`## Incident.io vs Relay AI SRE — response process vs change intelligence
**What Incident.io is:** A Slack-native incident management platform covering the full incident lifecycle: declaration, on-call paging, war room coordination, timeline tracking, AI-generated post-mortems, and retrospective action items. Strong UX and fast adoption.
## The change correlation gap
Incident.io is excellent at managing the human process of incident response. It does not know what changed before the incident — which deployment, which config change, which feature flag toggle preceded the alert. That investigation still falls on engineers, adding minutes to hours to MTTR.
## Relay AI SRE advantages
• **Deployment change correlation** — at incident onset, Relay surfaces the specific deployment, config change, or feature flag that preceded the alert
• **Automated rollback** — if the last deployment is the cause, Relay rolls back without waiting for an on-call engineer
• **CV-gated deployments** — Relay prevents incidents from being created in the first place by blocking bad deployments at the verification gate
• **AI Scribe** — automated post-mortem generation from the deployment timeline, not just the incident timeline
## Positioning
"Incident.io is excellent at running the incident response process. Add Relay AI SRE for the context that makes that process faster: the moment an alert fires, Relay already knows which deployment caused it."
## Discovery questions
• "When an incident fires, what is your current process for finding the root cause? How long does that step take?"
• "Do you have automated rollback today, or does rollback require a human decision during the incident?"
• "How many of your incidents in the last quarter were caused by a deployment? How quickly was that identified?"
• "What would it mean for your MTTR if change correlation happened automatically at alert onset?"`},
  {id:"optimizely",n:"Optimizely",e:"🧪",c:WA,cats:["flags"],str:"Feature flags combined with A/B experimentation and content management (acquired by Episerver). Strong experimentation platform with statistical significance analysis and multi-channel targeting.",adv:"Optimizely is a standalone experimentation and CMS platform requiring separate integration with CD pipelines. Relay Flags integrates feature flags and experimentation natively with CD — a flag can be tied directly to a canary deployment with automated rollback if experiment metrics degrade.",wo:"Optimizely's experimentation statistics and multi-channel targeting (web, mobile, server-side) are mature. CMS bundling creates a larger platform contract that is harder to displace. Strong marketing team buyer who may co-own the tool with engineering.",sa:"'When you roll out a flag in Optimizely, how does that connect to your deployment pipeline? If an experiment degrades a key metric, is there automated rollback — or a manual process?'",
  d:`## Optimizely vs Relay Flags — standalone experimentation vs pipeline-native flags
**What Optimizely is:** An experimentation and feature management platform combining server-side feature flags, A/B testing with statistical significance analysis, and a content management layer (from the Episerver acquisition). Used by product, marketing, and engineering teams.
## The pipeline integration gap
Optimizely manages flag state and experimentation analysis as a point solution. It does not know what deployment triggered a flag rollout, and it cannot automatically roll back a deployment when an experiment goes wrong — those are separate systems requiring manual coordination.
## Relay Flags advantages
• **Native CD integration** — flag rollouts are pipeline stages: deploy → flag to 1% → CV monitors metrics → auto-expand or rollback based on experiment outcome
• **Automated rollback** — if an Relay Flags experiment degrades a tracked metric, Relay can automatically roll back the underlying deployment, not just the flag
• **Platform economics** — Relay Flags is part of the Relay platform, not a separate $200K+ annual contract
• **Developer workflow** — flag management integrated with the same pipeline developers use for every release
## Discovery questions
• "When a flag rollout in Optimizely degrades a metric, what is the process to roll back? Is that automated or manual?"
• "Who owns the Optimizely budget — engineering, product, or marketing? Does that create friction?"
• "How long does it take to connect a new flag rollout to a deployment event in your CD pipeline?"
• "When does your Optimizely contract renew? Are you evaluating the cost against integrated alternatives?"`},
  {id:"kong",n:"Kong",e:"🦍",c:TL,cats:["security"],str:"Open-source API gateway with extensive plugin ecosystem for policy enforcement, rate limiting, and authentication. Kong Mesh adds service mesh for east-west traffic management. Large community and enterprise edition.",adv:"Kong is a policy enforcement gateway — traffic must be routed through it to be controlled. Relay WAAP (WAAP) uses eBPF for agentless kernel-level capture of all traffic, including encrypted east-west service-to-service flows that bypass Kong's gateway. Combined WAF, bot protection, DDoS, and API security in one platform.",wo:"Kong's gateway plugin ecosystem is extensive and widely trusted. Kong Mesh for service mesh is genuinely strong. Kong Gateway is often infrastructure-critical — teams are reluctant to change routing layers. Large open-source community creates strong engineering loyalty.",sa:"'Kong controls traffic that passes through the gateway. What about service-to-service calls that go directly between pods — encrypted east-west traffic that never touches the gateway? Is that visible?'",
  d:`## Kong vs Relay WAAP — gateway enforcement vs behavioural detection
**What Kong is:** An open-source API gateway and service connectivity platform. Kong Gateway enforces policy (auth, rate limiting, transformations) on traffic routed through it. Kong Mesh extends this to east-west service traffic via a sidecar model. Widely deployed as infrastructure-critical routing and policy enforcement.
## The visibility gap
Kong controls what passes through the gateway. It cannot see encrypted service-to-service traffic that bypasses the gateway layer — where lateral movement and API abuse between microservices occurs. Kong's detection is policy-based: block what matches a known rule.
## Relay WAAP (WAAP) advantages
• **eBPF agentless capture** — kernel-level traffic capture with no proxy insertion required, covering all east-west encrypted traffic Kong cannot see
• **Behavioural baselining** — learns normal API behaviour per endpoint; flags deviations, not just known signatures
• **Unified security surface** — WAF, bot protection, DDoS mitigation, and API security in one platform vs Kong's plugin-assembled stack
• **AI threat detection** — detects AI agent probing and business logic abuse patterns that rule-based gateways miss
## Positioning
"Kong is excellent for policy enforcement on traffic you route through it. Relay WAAP adds the security layer below — seeing everything, including the traffic Kong never touches."
## Discovery questions
• "What percentage of your API traffic goes directly between services without touching the Kong gateway?"
• "How do you detect API abuse that does not match a known signature — behavioural anomalies rather than known bad?"
• "Does your current setup give you visibility into encrypted east-west service-to-service calls?"
• "When an API endpoint is probed to map your business logic, how quickly does your team detect it?"`},
  {id:"cloudera",n:"Cloudera",e:"🌐",c:MU,cats:["platform"],str:"Enterprise data platform for Hadoop, Spark, Kafka, and Hive — managed via Cloudera Data Platform (CDP). Strong in regulated industries with data governance, lineage, and compliance capabilities.",adv:"Cloudera is a data platform, not a delivery platform. Relay provides CI/CD for the data pipelines, ML workflows, and microservices that run on top of Cloudera — deploying data engineering code and model serving services alongside Cloudera infrastructure.",wo:"Cloudera has deep data governance and lineage capabilities that data engineering buyers value highly. CDP's multi-cloud management layer is a genuine platform. Enterprise contracts often span multiple years.",sa:"'How do you deploy updates to your Spark jobs and data pipelines running on Cloudera? Is there a CI/CD process, or are deployments manual or script-driven?'",
  d:`## Cloudera — infrastructure platform, not a Relay competitor
**What Cloudera is:** An enterprise data platform providing managed Hadoop, Spark, Kafka, Hive, and HBase workloads via Cloudera Data Platform (CDP). Common in financial services, healthcare, and government where data governance, lineage, and compliance requirements are strict. Not a CI/CD or delivery competitor to Relay.
## Where Relay appears in Cloudera accounts
Relay surfaces in Cloudera conversations when data engineering teams need to deploy and version their pipeline code — Spark jobs, ML models, Kafka consumer services — running on top of the Cloudera data platform.
## The Relay angle
• **CI/CD for data pipelines** — build, test, and deploy Spark jobs, Flink applications, and Python ML pipelines with the same governance Relay applies to application code
• **ML model deployment** — blue/green and canary strategies for model serving services deployed alongside Cloudera infrastructure
• **Infrastructure pipelines** — Terraform/Helm deployments for Cloudera cluster configuration changes with audit trail and rollback
• **Multi-team governance** — OPA policy gates on data pipeline deployments, consistent with application delivery policies
## Discovery questions
• "How do your data engineering teams deploy updates to Spark jobs and pipeline code on Cloudera today?"
• "Is there version control and rollback capability for your data pipeline deployments, or is rollback manual?"
• "Are your ML model serving services deployed through the same delivery process as your application services?"
• "Do you have governance and audit requirements on data pipeline deployments for compliance purposes?"`},
  {id:"sonarqube",n:"SonarQube",e:"🔍",c:WA,cats:["security","ci"],str:"Widely deployed SAST and code quality platform covering 30+ languages. Quality gates, code smell detection, and security hotspot identification. Large installed base including self-managed and SonarCloud SaaS editions.",adv:"SonarQube is rule-based SAST with 80-90% false positive rates common in practice. Relay AST uses Code Property Graph (CPG) analysis to understand code semantics — reducing false positives by 80%+. Relay security scanning also integrates SonarQube results alongside 50+ other scanners with exploitability ranking.",wo:"SonarQube has enormous installed base and deep developer familiarity. Quality gate patterns are embedded in many CI pipelines. SonarCloud SaaS removes operational overhead. The brand is trusted in security and engineering teams across regulated industries.",sa:"'How many SonarQube findings does your team actually investigate vs suppress or ignore? What percentage of those findings turn out to be real vulnerabilities?'",
  d:`## SonarQube vs Relay AST — rule-based SAST vs semantic analysis
**What SonarQube is:** A widely deployed SAST, code quality, and security scanning platform supporting 30+ languages. Quality gates block promotions when thresholds are breached. Deeply integrated into Jenkins, GitHub Actions, and most CI platforms. The de facto code quality standard in many engineering organisations.
## The false positive problem
SonarQube uses pattern-matching rules against abstract syntax trees. This generates 80-90% false positive rates in practice — developers learn to ignore findings, defeating the purpose of the gate. Real vulnerabilities hide in the noise.
## Relay AST advantages
• **CPG-based SAST** — Code Property Graph analysis understands data flow, control flow, and call graphs semantically, reducing false positives by 80%+
• **Exploitability ranking** — findings ranked by actual reachability and exploitability, not just CVSS severity
• **security scanning integration** — SonarQube results can be ingested into Relay security scanning alongside 50+ other scanners with unified deduplication and prioritisation
• **Pipeline-native enforcement** — security gates as first-class pipeline stages with OPA policy integration
## Positioning
"Keep SonarQube for code quality metrics — code smell, maintainability, coverage. Add Relay AST for security findings you can trust. If your developers are ignoring SonarQube security alerts, that is the signal."
## Discovery questions
• "What percentage of your SonarQube security findings does your team investigate vs mark as false positive?"
• "How do you prioritise which SonarQube findings to remediate when there are hundreds in a sprint?"
• "Are you running any other scanners alongside SonarQube — Snyk, Checkmarx, Trivy? Where do those results land?"
• "What would it mean for your security posture if your developers actually trusted and acted on every finding?"`},
  {id:"blackduck",n:"Black Duck",e:"🦆",c:WA,cats:["security"],str:"Synopsys's enterprise SCA platform with the BDSA vulnerability database, licence compliance management, and open-source component inventory. Strong in regulated industries and government supply chain compliance.",adv:"Black Duck is SCA only — no SAST, no runtime API protection, no pipeline-native enforcement. Relay security scanning integrates Black Duck results alongside 50+ other scanners with unified deduplication and exploitability ranking. Relay AST adds CPG-based SAST on top of the SCA layer Black Duck provides.",wo:"Black Duck's BDSA vulnerability database has broader and earlier coverage than NVD — a genuine advantage over commodity SCA tools. Licence management and SBOM generation capabilities are mature. Long-term enterprise contracts in defence, financial services, and regulated industries.",sa:"'How do your engineers prioritise which Black Duck findings to fix when a new scan returns 300 open-source vulnerabilities? Is that a manual triage process?'",
  d:`## Black Duck vs Relay AST — SCA specialist vs unified security platform
**What Black Duck is:** Synopsys's enterprise software composition analysis (SCA) platform. Inventories open-source components, maps them to the BDSA vulnerability database (broader and earlier than NVD), manages licence compliance, and generates SBOMs for supply chain requirements. Widely deployed in regulated industries with supply chain security mandates.
## What Black Duck does not cover
• **No SAST** — does not analyse proprietary code for vulnerabilities
• **No runtime API protection** — post-deployment application attack surface is not covered
• **No pipeline enforcement** — Black Duck scans as a standalone step; pipeline gates require custom integration
• **No unified prioritisation** — findings exist in Black Duck's interface, not correlated with SAST or runtime data
## Relay positioning
**Complement, not replace:** Black Duck's BDSA database is a genuine advantage. Relay security scanning ingests Black Duck results alongside Snyk, Trivy, Checkmarx, and 47 other scanners — deduplicating findings, ranking by exploitability, and enforcing pipeline gates in one interface. Relay AST adds CPG-based SAST for proprietary code.
## Discovery questions
• "How many open-source vulnerabilities does a typical Black Duck scan return? How does your team decide which ones to fix this sprint?"
• "Do you have SAST coverage for your proprietary code alongside Black Duck's SCA coverage?"
• "When a new critical CVE drops on a Friday, how long to identify every service in production using the affected component?"
• "Are you running Black Duck standalone, or is it integrated into your CI/CD pipeline gates?"`},
  {id:"sonatype",n:"Sonatype",e:"🔐",c:WA,cats:["security","ar"],str:"Sonatype Nexus Lifecycle (IQ Server) for SCA with component intelligence and policy enforcement, combined with Nexus Repository for artifact management. Strong in Java/Maven ecosystems and regulated industries.",adv:"Sonatype bundles artifact repository (Nexus) and SCA (Lifecycle/IQ) as adjacent tools requiring separate configuration. Relay provides build, artifact registry, SCA (via security scanning), SAST (via AST), and CD in one platform — replacing both Nexus and Lifecycle with natively integrated equivalents.",wo:"Sonatype's component intelligence database and quarantine policies (blocking vulnerable components before they enter the build) are genuinely differentiated. The Nexus Repository plus Nexus IQ combined story is compelling for supply chain security buyers. Long-term contracts in financial services and regulated enterprise.",sa:"'How many teams in your org use Nexus Repository, and how many of those also have Nexus IQ (Lifecycle) active? What does the combined annual cost look like?'",
  d:`## Sonatype vs Relay — adjacent tools vs integrated platform
**What Sonatype is:** Two related products — Nexus Repository (artifact management) and Nexus Lifecycle/IQ Server (SCA with component intelligence and quarantine policies). Together they cover artifact storage and open-source component security. Sonatype's component intelligence database includes proprietary vulnerability data earlier than public NVD feeds.
## The integration tax
Nexus Repository and Nexus Lifecycle are adjacent products requiring integration with CI/CD pipelines via separate API connections. A build failure in Lifecycle does not automatically halt or roll back a Relay deployment — that requires custom wiring.
## Relay platform advantages
• **Build + artifact + scan + deploy in one platform** — Relay CI produces artifacts, Artifact Registry stores them, security scanning scans them (including Sonatype results), and CD deploys them — no glue code
• **CPG-based SAST on top of SCA** — Relay AST adds proprietary code analysis that Sonatype does not provide
• **Unified findings dashboard** — Sonatype IQ findings alongside Snyk, Trivy, Checkmarx in security scanning with deduplication and exploitability ranking
• **Platform economics** — replacing two Sonatype products with integrated Relay modules
## Discovery questions
• "What is the combined annual cost of Nexus Repository and Nexus IQ/Lifecycle? When does that contract renew?"
• "How are Nexus IQ findings surfaced to the development team — in the CI pipeline, or a separate portal?"
• "Do Nexus Lifecycle policy violations automatically block your deployments, or is that a separate manual step?"
• "Are you satisfying SBOM generation requirements with Nexus IQ today?"`},
  {id:"kafka",n:"Apache Kafka",e:"📨",c:MU,cats:["platform"],str:"Distributed event streaming platform used as a high-throughput message bus between microservices. Foundational infrastructure in data engineering, financial services, and real-time analytics stacks. Widely self-managed and increasingly available as managed services (Confluent, AWS MSK).",adv:"Kafka is infrastructure — Relay deploys and manages Kafka. Not a competitor. The Relay angle is CI/CD for Kafka cluster configuration changes, consumer service deployments, and the data pipelines that produce and consume Kafka topics.",wo:"Kafka is deeply embedded infrastructure, not a tool under evaluation. Conversations are about the services and pipelines built on top of Kafka, not Kafka itself. Confluent (the managed Kafka vendor) has an enterprise sales motion that may come up.",sa:"'How do you deploy updates to your Kafka consumer services? Is there a CI/CD process for those, or are deployments handled differently from your application services?'",
  d:`## Apache Kafka — infrastructure Relay deploys, not competes with
**What Kafka is:** Apache Kafka is a distributed event streaming platform used as a high-throughput, fault-tolerant message bus between microservices. Found in financial services (real-time transaction streaming), e-commerce (order event pipelines), data engineering (stream processing), and anywhere event-driven architectures are used. Not a CI/CD or delivery competitor.
## The Relay angle
• **Consumer service CI/CD** — Kafka consumer and producer services are regular Java, Python, or Go services that need CI pipelines, test suites, and deployment strategies
• **Cluster configuration management** — Kafka topic configuration, partition count changes, and cluster upgrades managed as pipeline deployments with rollback capability
• **Data pipeline deployments** — Flink jobs, Spark streaming applications, and Kafka Streams apps all need a delivery process with governance
• **Confluent on Kubernetes** — teams self-managing Kafka via Confluent Operator deploy and upgrade through Relay CD
## Discovery questions
• "How do you deploy changes to your Kafka consumer services — same CI/CD pipeline as your application services?"
• "When a Kafka consumer deployment causes a topic lag spike, how do you detect and roll back?"
• "Do you manage Kafka cluster configuration through infrastructure-as-code with version control?"
• "Are you using Confluent managed Kafka or self-managed? Who handles cluster upgrades?"`},
  {id:"rocketmq",n:"RocketMQ",e:"🚀",c:MU,cats:["platform"],str:"Apache RocketMQ is an Alibaba-originated distributed messaging and streaming platform popular in APAC financial services and e-commerce. High throughput, transactional messaging, and low latency. Growing outside China in cloud-native architectures.",adv:"RocketMQ is infrastructure — Relay deploys the services that run on it. Not a competitor. The Relay angle is CI/CD for RocketMQ cluster deployments and the consumer/producer services built on top of it.",wo:"RocketMQ appears primarily in APAC accounts — Chinese financial institutions, Alibaba Cloud customers, and organisations using APAC-origin tech stacks. Familiarity with RocketMQ signals a data-intensive, event-driven architecture where delivery maturity matters.",sa:"'How do you deploy updates to the services consuming from your RocketMQ topics? Is that process as mature as your other microservice deployments?'",
  d:`## Apache RocketMQ — infrastructure Relay deploys, not competes with
**What RocketMQ is:** A distributed messaging and event streaming platform created by Alibaba and donated to the Apache Foundation. Common in APAC financial services, e-commerce, and cloud-native architectures built on Alibaba Cloud. Supports transactional messaging, delayed delivery, and high-throughput streaming. Not a CI/CD or delivery competitor.
## The Relay angle
• **Consumer/producer service delivery** — RocketMQ consumer services are deployable microservices with the same CI/CD, canary, and rollback needs as any application service
• **Cluster configuration pipelines** — broker configuration changes, topic creation, and cluster scaling managed as version-controlled pipeline stages
• **APAC deployment patterns** — RocketMQ accounts often co-exist with Alibaba Cloud infrastructure that Relay can deploy to (ACK/Kubernetes, ACR artifact registry)
## Discovery questions
• "Are your RocketMQ consumer services deployed through the same CI/CD process as your other microservices?"
• "How do you manage RocketMQ broker configuration changes — manual, scripted, or pipeline-managed?"
• "When a consumer service deployment causes message processing lag, how do you detect and remediate it?"
• "Are you running RocketMQ on Alibaba Cloud ACK, or self-managed Kubernetes?"`},
  {id:"zookeeper",n:"ZooKeeper",e:"🦓",c:MU,cats:["platform"],str:"Apache ZooKeeper is a distributed coordination service underpinning Kafka, HBase, Hadoop, and other distributed systems. Provides leader election, distributed locks, and configuration management for distributed data platforms.",adv:"ZooKeeper is infrastructure — Relay deploys and manages ZooKeeper clusters as part of data platform pipelines. Not a competitor. The Relay angle is CI/CD and configuration management for ZooKeeper and the broader data platform it supports.",wo:"ZooKeeper is deeply embedded infrastructure in data engineering stacks. Conversations about ZooKeeper indicate a large Kafka or Hadoop deployment where the broader data platform delivery process is the real topic.",sa:"'How do you manage ZooKeeper configuration changes and version upgrades — is that part of your infrastructure-as-code pipeline, or handled separately?'",
  d:`## Apache ZooKeeper — infrastructure Relay manages, not competes with
**What ZooKeeper is:** A distributed coordination service providing leader election, distributed configuration, synchronisation, and naming for distributed systems. Kafka depends on ZooKeeper (pre-KRaft), as does HBase, HDFS NameNode HA, and other distributed data platform components. Not a CI/CD or delivery competitor.
## The Relay angle
• **Data platform infrastructure pipelines** — ZooKeeper, Kafka, and HBase cluster configuration changes managed as version-controlled pipeline deployments with audit trail and rollback
• **Kafka migration context** — teams migrating from ZooKeeper-dependent Kafka to KRaft mode need a managed migration pipeline with rollback capability; Relay provides that
• **Data engineering CI/CD** — HBase application code, Kafka consumer services, and Spark jobs all need the same delivery governance as application microservices
## Discovery questions
• "How do you manage ZooKeeper configuration changes across your Kafka clusters — scripted, manual, or pipeline-managed?"
• "Are you planning to migrate from ZooKeeper-based Kafka to KRaft mode? Do you have a rollback plan if that migration fails?"
• "Is your data platform infrastructure deployed through the same CI/CD tooling as your application services?"
• "Who owns ZooKeeper upgrades and patching — the platform team, data engineering, or a separate ops function?"`},
  {id:"bitrise",n:"Bitrise",e:"📱",c:WA,cats:["ci"],str:"Mobile-first CI/CD platform purpose-built for iOS and Android. Code signing automation, device farm integration, and mobile-specific workflow steps. Strong brand in the mobile engineering community.",adv:"Bitrise is mobile-only — no backend CI, no deployment governance, no Continuous Verification, no security orchestration. Relay CI covers mobile builds alongside backend services on one platform, with Test Intelligence, AI build failure analysis, and unified pipeline governance that Bitrise cannot provide.",wo:"Bitrise's mobile-specific feature depth (Xcode caching, code signing management, App Store deployment automation) is genuinely strong. Many mobile teams consider Bitrise purpose-fit for their stack. Engineers often self-purchased Bitrise and have strong loyalty.",sa:"'How do you handle CI for your backend services — is that a separate pipeline and team from your mobile CI in Bitrise? What does it cost to maintain both?'",
  d:`## Bitrise vs Relay CI — mobile specialist vs unified build platform
**What Bitrise is:** A mobile-first CI/CD platform purpose-built for iOS and Android development. Specialised features for Xcode build caching, iOS code signing automation, App Store and Google Play deployment, and device farm integration. Strong developer UX and community in mobile engineering teams.
## The specialisation trade-off
Bitrise is excellent at mobile — and only mobile. Backend services, APIs, and data pipelines that ship alongside a mobile app require a separate CI/CD tool, creating two platforms to maintain, two sets of credentials to manage, and two governance models to enforce.
## Relay CI advantages
• **Single platform for mobile + backend** — iOS, Android, and backend microservices in one CI platform with unified governance, approvals, and security gates
• **Test Intelligence** — ML-driven test selection reduces test cycle time for mobile test suites as well as backend services; Bitrise has no equivalent
• **AI build failure analysis** — AI-powered diagnosis of build failures across mobile and backend pipelines in one interface
• **Cost consolidation** — one platform license vs Bitrise (mobile) plus a separate CI tool (backend)
## Discovery questions
• "What CI/CD tool handles your backend services alongside Bitrise for mobile? How do you keep those pipelines consistent?"
• "What is your current iOS and Android build time? How often do mobile engineers wait on the CI queue?"
• "How do you handle security scanning on mobile artifacts — IPA files, APKs — before App Store submission?"
• "When does your Bitrise contract renew? Are you evaluating whether a unified CI platform makes sense?"`},
  {id:"trivy",n:"Aqua Trivy",e:"🔰",c:A,cats:["security"],str:"Open-source all-in-one security scanner covering containers, filesystems, Git repositories, Kubernetes configurations, and IaC. Widely adopted for its breadth, speed, and zero licence cost. Maintained by Aqua Security.",adv:"Trivy is a point scanner producing findings in isolation. Relay security scanning integrates Trivy results alongside 50+ other scanners — deduplicating, prioritising by exploitability, and enforcing pipeline gates. Relay AST adds CPG-based SAST with 80%+ fewer false positives on top of container scanning.",wo:"Trivy's breadth and zero cost make it the default first security scanner in cloud-native teams. Deeply embedded in Kubernetes admission controllers and GitOps workflows. Aqua Security's enterprise product builds on Trivy with runtime protection.",sa:"'Trivy gives you findings — how do you decide which of the 200 findings in a container scan are worth fixing this sprint? Is there a prioritisation layer, or is that a manual process?'",
  d:`## Aqua Trivy — integrated into Relay security scanning, not competed with
**What Trivy is:** An open-source security scanner maintained by Aqua Security covering containers, OS packages, language dependencies, filesystems, Git repositories, Kubernetes configs, and Terraform. The default scanner in many cloud-native CI pipelines due to breadth and zero cost.
## The positioning: integrate, not replace
Trivy is a Relay security scanning integration — not a competitor. The question is never "Trivy or Relay" but "how do you operationalise Trivy findings at scale?" security scanning answers that.
## What security scanning adds on top of Trivy
• **Multi-scanner normalisation** — Trivy results alongside Snyk, Checkmarx, Black Duck, Veracode, and 45+ others in one deduplication engine
• **Exploitability ranking** — findings ordered by actual reachability and CVSS, not raw count — fixing the "200 findings, 3 developers" problem
• **Pipeline enforcement** — Trivy findings become a first-class pipeline gate with OPA policies: fail the build if a Critical exploitable CVE is found in a base image
• **Relay AST SAST layer** — CPG-based SAST for proprietary code vulnerabilities Trivy cannot see
## Discovery questions
• "Where do Trivy scan results land today — a terminal output, a report file, or a dashboard? Who reviews them?"
• "When Trivy finds a Critical CVE in a container image, what is the process to block that image from deploying to production?"
• "Are you running any other scanners alongside Trivy — Snyk, Checkov, Semgrep? How do you manage findings across multiple tools?"
• "How do you prioritise Trivy findings when a scan returns hundreds of vulnerabilities across different severity levels?"`},
  {id:"veracode",n:"Veracode",e:"🛡️",c:WA,cats:["security"],str:"Enterprise SAST, DAST, SCA, and penetration testing as a service platform. Strong in regulated industries, government, and financial services. Veracode's cloud-based scanning model and compliance reporting are well-established.",adv:"Veracode's SAST uses pattern-matching rules with high false positive rates. Relay AST uses CPG-based semantic analysis reducing false positives by 80%+. Relay security scanning integrates Veracode results with 50+ other scanners for unified prioritisation and pipeline enforcement that Veracode's standalone model lacks.",wo:"Veracode has deep penetration into regulated industries with long-term compliance-driven contracts. DAST and manual penetration testing services are genuinely differentiated. Government FedRAMP authorisation and compliance certifications are procurement requirements for many buyers.",sa:"'What percentage of your Veracode SAST findings are flagged as false positives by your security team? How much developer time goes into triaging those each sprint?'",
  d:`## Veracode vs Relay AST — compliance-driven scanning vs semantic security intelligence
**What Veracode is:** An enterprise application security platform offering SAST, DAST, SCA, and penetration testing as a cloud-based service. Long established in regulated industries where Veracode's compliance certifications (FedRAMP, SOC 2) are procurement requirements.
## The false positive problem
Veracode SAST uses pattern-matching against AST representations — the same architecture as SonarQube and Checkmarx. False positive rates of 60-80% are common, generating developer fatigue and suppressed findings. Real vulnerabilities hide in the noise.
## Relay AST advantages
• **CPG-based SAST** — Code Property Graph semantic analysis understands data flow, control flow, and call graph semantics — reducing false positives by 80%+
• **Exploitability prioritisation** — findings ranked by reachability and exploitability, not CVSS severity alone
• **security scanning integration** — Veracode findings can be ingested into Relay security scanning alongside other scanners with deduplication and unified pipeline gates
• **Pipeline-native enforcement** — Relay security gates are first-class pipeline stages, not a post-scan webhook
## Positioning in regulated industries
"Veracode satisfies your compliance checkbox — and that matters. But satisfying the checkbox and actually finding the vulnerabilities developers will fix are different outcomes. CPG-based SAST finds what Veracode misses and eliminates the noise developers ignore."
## Discovery questions
• "What percentage of Veracode SAST findings does your security team classify as false positives?"
• "Are Veracode scan results integrated into your CI/CD pipeline gates, or is scanning a separate manual process?"
• "Do you use Veracode DAST and manual pen testing, or primarily SAST and SCA?"
• "When does your Veracode contract renew? Are you evaluating whether the finding quality justifies the cost?"`},
  {id:"checkmarx",n:"Checkmarx",e:"✅",c:WA,cats:["security"],str:"Enterprise SAST, SCA, and API security on the Checkmarx One platform. Strong regulated industry and financial services presence. Checkmarx SAST has broad language coverage and compliance reporting depth.",adv:"Checkmarx SAST is rule-based with high false positive rates. Relay AST uses CPG-based SAST delivering 80%+ fewer false positives. Relay security scanning integrates existing Checkmarx deployments alongside 50+ other scanners — providing a migration path that preserves Checkmarx investment while adding semantic analysis on top.",wo:"Checkmarx has deep regulated industry penetration and long-term compliance-driven contracts. The Checkmarx One platform combining SAST, SCA, and API security is a consolidation story that competes with Relay AST directly. Language breadth and compliance certifications are genuine strengths.",sa:"'What does your security team's Checkmarx triage backlog look like? How many open findings are suppressed or marked as will not fix — and how confident is the team that the real vulnerabilities are not in that pile?'",
  d:`## Checkmarx vs Relay AST — rule-based SAST vs semantic analysis
**What Checkmarx is:** An enterprise application security platform on Checkmarx One, combining SAST, SCA, API security testing, and IaC scanning. Broad language coverage, deep compliance reporting, and a long track record in regulated industries — financial services, healthcare, government.
## The false positive structural problem
Checkmarx SAST is built on data-flow rules applied to abstract syntax trees. This architecture produces false positive rates of 70-80% at scale — creating triage backlogs that developers learn to suppress, hiding real vulnerabilities in the noise.
## Relay AST advantages
• **CPG-based SAST** — semantic analysis via Code Property Graph understands how data actually flows through the application — reducing false positives by 80%+
• **Reachability analysis** — findings ranked by whether the vulnerable path is actually reachable in the running application
• **Migration path via security scanning** — Checkmarx results can be ingested into Relay security scanning during transition, preserving compliance reporting while CPG-based SAST runs in parallel
• **Pipeline-native enforcement** — security gates embedded as pipeline stages with OPA policies
## Positioning the migration
"We are not asking you to rip out Checkmarx overnight. security scanning ingests your Checkmarx findings alongside CPG-based SAST — your security team compares the noise levels and decides when to transition. Your compliance evidence chain stays intact."
## Discovery questions
• "How many Checkmarx findings does your security team triage per sprint, and what percentage turn out to be false positives?"
• "Is Checkmarx SAST integrated into your CI/CD pipeline gates, or is it a separate scan-and-report process?"
• "What would a 80% reduction in false positive triage work be worth in developer hours per sprint?"
• "When does your Checkmarx One contract renew?"`},
  {id:"grafana",n:"Grafana",e:"📊",c:TL,cats:["aisre"],str:"Open-source observability visualisation standard. Grafana Cloud adds managed Loki (logs), Tempo (traces), Mimir (metrics), and OnCall for incident management. Enormous community adoption and plugin ecosystem.",adv:"Grafana visualises observability data. Relay AI SRE integrates Grafana and Prometheus as Continuous Verification data sources — adding change correlation, automated rollback, and AI-generated post-mortems that Grafana does not provide. Grafana shows what happened; Relay AI SRE knows what changed and acts on it.",wo:"Grafana's open-source community is enormous. Grafana Cloud's managed stack is a compelling low-cost Datadog alternative. Grafana OnCall for incident management is improving. The brand is trusted by platform engineers and SREs — often considered non-negotiable infrastructure.",sa:"'When a Grafana alert fires at 2am, what is your process for figuring out if a recent deployment caused it? How long does that investigation take before you can act?'",
  d:`## Grafana vs Relay AI SRE — observability visualisation vs change intelligence
**What Grafana is:** The open-source observability visualisation standard. Grafana Cloud extends this with managed Loki (log aggregation), Tempo (distributed tracing), Mimir (long-term metrics), and Grafana OnCall for incident management. Used by nearly every cloud-native engineering team for dashboards and alerting.
## What Grafana is not
Grafana is a data visualisation and alerting layer. It does not know what changed before an alert fired, cannot automatically correlate an incident to a deployment, and cannot trigger automated rollback. Incident response after a Grafana alert remains a manual investigation.
## Relay AI SRE advantages
• **Grafana as a CV data source** — Relay Continuous Verification natively integrates Grafana and Prometheus as health signal providers, using Grafana data to gate deployment progression and trigger rollback
• **Change correlation** — at incident onset, Relay surfaces the deployment, config change, or feature flag that preceded the alert
• **Automated rollback** — if the correlated change is a Relay deployment, rollback is triggered automatically without human intervention
• **AI Scribe post-mortem** — generated from deployment and incident timeline data
## Positioning
"Keep Grafana for dashboards and alerting — it is the standard and replacing it creates no value. Relay AI SRE sits above it: the moment Grafana fires an alert, Relay already knows which deployment caused it."
## Discovery questions
• "When a Grafana alert fires, what is the first step your on-call engineer takes to figure out if a deployment caused it?"
• "Do you have automated rollback configured, or does rollback always require an engineer to manually trigger it?"
• "Is Grafana integrated with your deployment pipeline — do deployments automatically create annotations in your dashboards?"
• "What is your mean time from Grafana alert to production recovery for a deployment-caused incident?"`},
  {id:"tfcloud",n:"Terraform Cloud",e:"🏗️",c:WA,cats:["iac"],str:"De facto IaC standard with the HashiCorp ecosystem — Terraform, Vault, Consul, and Boundary. 80%+ market share in IaC automation. Remote state, Sentinel policy-as-code, private module registry.",adv:"IaCM is part of the Relay unified delivery platform: IaC runs connect inline with CD pipelines, cost tracking, and OPA policy enforcement. Relay supports both Terraform and OpenTofu — no BSL lock-in. Single governance layer across infra and app deployments.",wo:"HashiCorp ecosystem depth is real — teams running Vault + Consul + Terraform Cloud have strong switching costs. HCP Terraform Flex pricing can be competitive. Most enterprises stayed on Terraform Cloud after the 2023 BSL change.",sa:"'When HashiCorp changed Terraform's licence to BSL in 2023, what was your contingency plan? If pricing changes again at renewal, what is your fallback — and how quickly could you migrate?'",
  d:`## Terraform Cloud vs Relay IaCM — point tool vs unified delivery platform
**What Terraform Cloud is:** The managed control plane for HashiCorp Terraform. Remote state storage, remote plan/apply execution, Sentinel policy-as-code, private module registry, and team RBAC. The de facto standard for enterprise IaC automation, used by the majority of cloud-native organisations running Terraform.
## The licence change context
HashiCorp moved Terraform from MPL to BSL in August 2023 — preventing cloud vendors from commercialising it. This prompted the OpenTofu fork (CNCF project). Most enterprises stayed on Terraform Cloud, but the licence change exposed single-vendor risk and created budget scrutiny on HCP Terraform Flex pricing.
## Relay IaCM advantages
• **Platform integration** — IaC runs are first-class pipeline stages: infrastructure provision → app deploy → cost impact → security scan, all in one pipeline with a single audit trail
• **OpenTofu support** — run OpenTofu or Terraform interchangeably without re-platforming your configurations; no BSL exposure
• **OPA policy enforcement** — same policy framework that gates CD deployments gates IaC runs — no separate Sentinel licence
• **Cost correlation** — Relay Cloud Cost Management correlates infrastructure changes directly to cloud cost deltas
## Positioning
"You are already paying for Relay CD. IaCM adds your Terraform and OpenTofu runs to the same pipeline governance you already have — without a separate Terraform Cloud licence or a second Sentinel policy layer."
## Discovery questions
• "When a Terraform plan runs today, how does your team know what CD deployment follows — or does that handoff happen manually?"
• "Are your Terraform runs gated by the same policy controls as your application deployments, or are they a separate governance layer?"
• "What happens to your IaC workflows if you needed to switch from Terraform to OpenTofu? How long would that take?"
• "When does your HCP Terraform contract renew? Have you modelled the cost at your current scale?"`},
  {id:"spacelift",n:"Spacelift",e:"🚀",c:ER,cats:["iac"],str:"Multi-tool IaC orchestration: runs Terraform, OpenTofu, Pulumi, Ansible, and CloudFormation from one control plane. Policy-as-code, drift detection, private module registry, and fine-grained RBAC.",adv:"Spacelift is IaC-only; Relay IaCM connects infra changes to the complete delivery lifecycle — CD pipeline, security scanning, and cloud cost tracking in one unified platform. Relay governance spans both infra and app deployments.",wo:"Spacelift's multi-tool orchestration is a genuine differentiator for polyglot infra teams. Better Ansible and OpenTofu support than Terraform Cloud. Growing fast in platform engineering teams that have outgrown HashiCorp.",sa:"'Does your IaC tool know what happened to the deployment after the infrastructure was provisioned? Or does the audit trail go cold at apply?'",
  d:`## Spacelift vs Relay IaCM — IaC-only vs unified delivery platform
**What Spacelift is:** A modern IaC orchestration platform that runs Terraform, OpenTofu, Pulumi, Ansible, and CloudFormation in a single control plane. Policy-as-code, drift detection, private module registry, and deep Kubernetes and cloud provider integrations. The leading challenger to Terraform Cloud for teams running multiple IaC tools.
## Where Spacelift wins
Spacelift is a strong alternative when a team has outgrown Terraform Cloud and needs OpenTofu support, better Ansible orchestration, or multi-tool flexibility without HashiCorp lock-in. Its policy-as-code and RBAC model are enterprise-grade.
## Relay IaCM advantages
• **Platform integration** — Relay connects IaC runs inline with CD pipelines: infra provision → app deploy → CV monitoring → cost tracking in one workflow with one audit trail
• **Governance breadth** — the same OPA policy layer that governs CD pipelines governs IaC runs — no separate policy language to learn
• **Cost correlation** — infrastructure changes link to cloud cost deltas via Relay Cloud Cost Management; drift detection connects to spend impact
• **Single control plane** — teams running Relay CD already have the governance, RBAC, and audit capabilities; adding IaCM does not add a second vendor
## Positioning
"Spacelift is a great point tool for IaC. The question is whether you want IaC governance in a separate tool or embedded in the same pipeline platform that already governs your application deployments."
## Discovery questions
• "When a Spacelift stack apply completes, how does the downstream CD pipeline know infrastructure is ready — is that automated or manual coordination?"
• "Do your application deployment gates and IaC deployment gates share the same policy definitions, or are they separate systems?"
• "Are IaC drift events connected to your incident management or cost alerting workflows today?"`},
  {id:"pulumi",n:"Pulumi",e:"💻",c:ER,cats:["iac"],str:"Infrastructure as Code using real programming languages — Python, TypeScript, Go, C#, Java. Reusable component model, native cloud SDKs, Pulumi AI code generation. Strong appeal for developer-centric teams resistant to HCL.",adv:"Language-agnostic Relay IaCM runs both Terraform and Pulumi configurations without re-platforming. Relay adds pipeline governance, cost tracking, and security scanning that Pulumi does not provide. Platform depth far beyond IaC authoring alone.",wo:"'No HCL' is a genuine technical win for developer-centric teams. Pulumi's component model is architecturally superior to Terraform modules for complex organisations. Pulumi AI generates stack code natively. Growing fast among teams that treat infra as code seriously.",sa:"'How does your Pulumi stack connect to your deployment governance, progressive rollout, and cloud cost tracking today? Or do those live in separate tools?'",
  d:`## Pulumi vs Relay IaCM — developer-first IaC vs delivery platform governance
**What Pulumi is:** Infrastructure as Code using general-purpose programming languages — Python, TypeScript, Go, C#, Java — instead of HCL. Real language features (loops, conditionals, testing, type safety) make infrastructure more composable and maintainable for engineering teams. Pulumi AI generates IaC code from natural language.
## Where Pulumi wins
For teams where developers author infrastructure and find HCL limiting, Pulumi is a compelling choice. The component model for reuse is architecturally superior to Terraform modules. Native testing support is a genuine differentiator.
## Relay IaCM advantages
• **Language-agnostic** — Relay IaCM runs Terraform, OpenTofu, and Pulumi stacks within the same pipeline framework; no re-platforming required as orgs adopt Pulumi alongside existing Terraform
• **Pipeline governance** — Pulumi has no native CI/CD pipeline model; Relay adds approval gates, policy enforcement, progressive rollout, and audit logging around Pulumi stack updates
• **Cost integration** — infrastructure changes tracked against cloud cost deltas via Cloud Cost Management; cost impact visible before stack updates are approved
• **Unified control plane** — IaC governance alongside CD, security, and feature flag governance in one platform
## Positioning
"Pulumi is a strong choice for infrastructure authoring. The gap is governance: Pulumi runs your stacks, but it does not know about your deployment pipelines, cost budgets, or security policies. Relay IaCM fills that gap without replacing Pulumi as the authoring tool."
## Discovery questions
• "When a Pulumi stack update runs, how is that coordinated with the application deployment that depends on it?"
• "Do Pulumi stack updates go through the same approval and policy gates as your application deployments?"
• "How do you know the cost impact of a Pulumi change before it applies in production?"`},
  {id:"gremlin",n:"Gremlin",e:"😈",c:WA,cats:["chaos"],str:"The market pioneer in enterprise chaos engineering (founded 2016). Largest commercial experiment library covering CPU, memory, network, disk, time, process, and Kubernetes attacks. Strong safety controls and fastest time-to-first-experiment for enterprise.",adv:"Relay Chaos Engineering is integrated directly into the CD pipeline — resilience validation runs automatically on every deployment as a pipeline stage, not as a separate manual test phase. Continuous verification of resilience on every release, not ad-hoc experiments.",wo:"Strong switching costs — teams that have run chaos with Gremlin for years have embedded it in their culture. Gremlin's safety controls and experiment library are genuinely differentiated for orgs new to chaos engineering.",sa:"'Do your chaos experiments run automatically as part of each deployment, or does the chaos team schedule them separately after a release? What is the lag between a production deploy and knowing it is resilient?'",
  d:`## Gremlin vs Relay Chaos Engineering — point tool vs pipeline-integrated resilience
**What Gremlin is:** The category pioneer for enterprise chaos engineering. Commercial experiment library covering 20+ attack types, a strong safety model (blast radius controls, rollback capability), and the fastest time-to-first-experiment for enterprise teams. Widely adopted in large-scale cloud-native organisations.
## Where Gremlin wins
For organisations starting a chaos engineering practice, Gremlin lowers the barrier significantly. Its safety controls and curated experiment library are best-in-class for teams without deep platform engineering capability.
## Relay Chaos Engineering advantages
• **Pipeline integration** — chaos experiments are pipeline stages, not separate events: every CD deployment automatically includes resilience validation before traffic shifts to the new version
• **No dedicated chaos team needed** — experiments run as automated pipeline steps; developers do not need to co-ordinate with a chaos team to validate their service
• **Continuous verification** — chaos probes integrate with CV so deployment rollback triggers automatically if resilience validation fails
• **Governance** — centralised view of all experiments, approvals, blast radius controls, and results across the entire organisation
## The key positioning contrast
"Gremlin lets you schedule chaos experiments. Relay CE makes resilience validation a mandatory part of every deployment. The difference is frequency: Gremlin experiments happen when someone plans them; Relay CE experiments happen on every release."
## Discovery questions
• "How often do your chaos experiments run today relative to how often you deploy?"
• "Do chaos experiments require the chaos team to be involved, or can any developer run one?"
• "If a chaos experiment reveals a resilience issue, what is the process to block a deployment until it is fixed?"
• "Do you have reporting on which services have been validated and which have not run experiments in the last 90 days?"`},
  {id:"litmuschaos",n:"LitmusChaos",e:"🔬",c:A,cats:["chaos"],str:"CNCF open-source chaos engineering framework — and the foundation Relay Chaos Engineering / Relay Resilience Testing is built on. Relay is a founding contributor to the LitmusChaos project. This is an open-source vs enterprise conversation, not a displacement.",adv:"Enterprise support, centralised governance, audit reporting, CD pipeline integration, and managed upgrades — all built on the same LitmusChaos engine. The pitch is removing DIY overhead, not replacing the technology.",wo:"'It is free and CNCF-backed' removes cost and vendor risk objections. With strong platform engineering capability, teams can build governance themselves. Don't oversell — Relay Resilience Testing literally runs LitmusChaos under the hood.",sa:"'You are already running LitmusChaos — Relay Resilience Testing is the enterprise layer on top of that same engine. The question is whether you want to build and maintain the governance framework around it, or have that come out of the box integrated with your CD pipeline.'",
  d:`## LitmusChaos and Relay Resilience Testing — same engine, open-source vs enterprise
**The Relay relationship — lead with this:** Relay Chaos Engineering (now called Relay Resilience Testing) is the enterprise product built directly on top of LitmusChaos. Relay is a founding contributor to the LitmusChaos CNCF project. If a customer is running LitmusChaos, they are already running the same underlying engine as Relay Resilience Testing. This is not a displacement conversation — it is an open-source vs. enterprise conversation.
**Frame it like this:** "You are already using the technology at the core of what Relay ships. The question is whether you want to build and maintain the governance, pipeline integration, and reporting layer around it yourselves."
## What LitmusChaos is
A CNCF project providing a Kubernetes-native chaos engineering framework. ChaosHub is a community-driven library of experiments covering pods, nodes, network, storage, and cloud resources. The Litmus Chaos Operator orchestrates experiments via Kubernetes custom resources. Free, open-source, and actively maintained with strong community velocity.
## Where LitmusChaos (self-managed) wins
For teams with strong platform engineering capability, LitmusChaos is a credible free foundation. CNCF project status removes vendor risk concerns. Community-contributed experiments cover most Kubernetes scenarios. Teams can (and do) build enterprise-grade tooling on top of it.
## The DIY build cost
Using LitmusChaos without Relay Resilience Testing requires significant engineering investment: building approval workflows, generating compliance reporting, integrating with CD pipelines, managing experiment scheduling, and creating centralised observability across teams. This is the gap — not the chaos engine itself.
## Relay Resilience Testing advantages (over self-managed LitmusChaos)
• **Pipeline integration** — experiments are pipeline stages in Relay CD; no custom tooling required to trigger chaos during deployments
• **Governance out of the box** — centralised experiment inventory, approval workflows, blast radius controls, and audit logs without build-out
• **Enterprise support** — SLA-backed support for production incident investigation
• **Reporting** — service-level chaos coverage and resilience metrics across the organisation, without custom dashboards
• **Managed upgrades** — Relay absorbs LitmusChaos version upgrades and compatibility work
## Discovery questions
• "How do your LitmusChaos experiments connect to your deployment pipeline today — is that an integration your team built and maintains?"
• "Do you have centralised reporting on experiment coverage across all your namespaces and services, or is that something the platform team cobbled together?"
• "What is the approval process before a new chaos experiment runs in production?"`},
  {id:"flux",n:"Flux",e:"🔄",c:A,cats:["cd"],str:"CNCF GitOps standard alongside ArgoCD. Lightweight, Kubernetes-native, pull-based reconciliation. Automated image update automation and multi-tenancy support. Broad community adoption in GitOps-first organisations.",adv:"Full CD lifecycle beyond GitOps reconciliation: approval gates, progressive delivery (canary/blue-green), deployment verification, multi-cloud targets, and OPA policy enforcement. Flux reconciles desired state; Relay CD manages the entire deployment lifecycle.",wo:"Teams with 'GitOps purist' culture actively prefer pull-based models and resist push-based CD. Often deployed alongside ArgoCD in the same cluster. CNCF backing means no vendor lock-in concerns.",sa:"'Does Flux give you approval gates before production, automatic rollback triggered by failure metrics, and a full audit trail of who approved what promotion — or does that governance layer live elsewhere?'",
  d:`## Flux vs Relay CD — GitOps reconciliation vs full delivery lifecycle
**What Flux is:** A CNCF GitOps operator for Kubernetes. Flux watches Git repositories and automatically reconciles cluster state with the declared desired state — the pull-based GitOps model. Flux CD v2 adds image update automation, multi-tenancy, and Helm/Kustomize support. The co-standard with ArgoCD for Kubernetes-native continuous delivery.
## Where Flux wins
For teams that want pure GitOps — Git as the single source of truth, pull-based reconciliation, minimal operational footprint — Flux is a lightweight and well-supported choice. Strong for platform teams standardising Kubernetes deployments across multiple clusters.
## The GitOps coverage gap
Flux handles reconciliation. It does not natively provide: manual approval gates before production promotions, progressive delivery (canary rollouts, traffic splitting), deployment verification based on observability metrics, multi-cloud non-Kubernetes targets, or centralised governance across teams.
## Relay CD advantages
• **Approval gates** — mandatory human or automated approval gates at any pipeline stage before promotion
• **Progressive delivery** — native canary, blue-green, and traffic-splitting deployments integrated with Istio, NGINX, and other ingress controllers
• **Continuous Verification** — metrics-based automated rollback if post-deploy health signals degrade
• **Multi-cloud** — deploy to Kubernetes, ECS, Lambda, VMs, Spot, and on-prem targets in one pipeline
• **Governance** — OPA policy gates, deployment freezes, full RBAC and audit logging
## Positioning
"Use Flux for GitOps reconciliation in your Kubernetes clusters — it is the right tool for that. Relay CD adds the governance, progressive delivery, and verification layer that Flux does not provide: approval gates, canary rollouts, and automatic rollback on failed deployments."
## Discovery questions
• "When a Flux reconciliation applies a change to production, is there a human approval step before traffic reaches users?"
• "If metrics degrade after a Flux sync, how does your team detect and roll back — is that manual?"
• "Does Flux handle your non-Kubernetes deployment targets, or is there a separate pipeline for those?"`},
  {id:"ghas",n:"GitHub Advanced Security",e:"🛡️",c:MU,cats:["security"],str:"Native to GitHub: bundled SAST (CodeQL), secret scanning, dependency review, and Security Overview in GitHub Enterprise Cloud/Server. Zero additional integration cost for GitHub shops. Developers already work where the scanner runs.",adv:"security scanning aggregates GHAS findings alongside 50+ other scanners — DAST, container scanning, IaC scanning, SCA — in a single pane of glass. Works across all repos and SCMs, not just GitHub. Applies OPA policy to fail/pass pipeline gates from correlated multi-tool results.",wo:"'We already have it' — GHAS ships with GHES/GHEC Enterprise licences, perceived as free. GitHub ecosystem lock-in is strong. CodeQL semantic analysis is genuinely strong for supported languages.",sa:"'GHAS covers your GitHub repos. How do you correlate those findings with results from your container scanners, DAST tools, and any non-GitHub repos — and enforce a unified pass/fail gate across all of them?'",
  d:`## GitHub Advanced Security vs Relay security scanning — platform-native scanner vs scan orchestration layer
**What GitHub Advanced Security is:** Security features bundled into GitHub Enterprise — CodeQL SAST for 10+ languages, secret scanning with push protection, dependency review on pull requests, and a Security Overview dashboard. For organisations on GitHub Enterprise Cloud or Server, it is effectively included in existing spend.
## Where GHAS wins
For GitHub-only organisations, GHAS delivers solid baseline AppSec coverage with zero integration overhead. CodeQL semantic analysis is genuinely strong for supported languages. Secret scanning with push protection prevents credential leaks before they reach the repo.
## The multi-tool, multi-SCM gap
GHAS covers GitHub repositories and GitHub Actions pipelines. Organisations with multiple SCMs, container scanning requirements, DAST needs, or IaC scanning requirements need results from all tools correlated, deduplicated, and enforced in a unified gate. GHAS does not orchestrate non-GitHub tools.
## Relay security scanning advantages
• **Scanner orchestration** — run 50+ scanners (including CodeQL) and normalise results into a single finding inventory
• **SCM-agnostic** — works across GitHub, GitLab, Azure DevOps, and Bitbucket in one governance framework
• **OPA policy gates** — pass/fail rules based on severity, reachability, and scanner confidence across all findings
• **AI prioritisation** — de-duplicates findings across scanners, ranks by reachability and exploitability
## Positioning
"Keep CodeQL and GHAS — it is a solid baseline for your GitHub repos. security scanning aggregates those results with your container scanner, DAST tool, and IaC scanner into one gate with one policy. You stop managing four dashboards."
## Discovery questions
• "Do you have repositories in any other SCM besides GitHub — Azure DevOps, Bitbucket, or GitLab?"
• "How do you aggregate GHAS findings with your container image scan and DAST results today?"
• "If a critical vulnerability is found by your container scanner but not by CodeQL, how does that block a deployment?"`},
  {id:"cloudzero",n:"CloudZero",e:"💰",c:ER,cats:["finops"],str:"Per-resource cloud cost granularity without mandatory tagging. Real-time cost data from AWS, Kubernetes, and Snowflake. Engineering-focused cost view — shows costs per team, service, feature, or customer without requiring tags on every resource.",adv:"Relay Cloud Cost Management connects cost spikes to specific deployments and code changes — 'which pipeline run caused this?' is native. CloudZero shows cost without delivery context. Budget enforcement, anomaly detection, and cost allocation live in the same platform as the CD pipeline.",wo:"'No tags required' is a genuine technical advantage for organisations with inconsistent tagging. Engineering-focused teams prefer CloudZero's cost attribution model to finance-oriented tools. Growing fast in SaaS orgs that want per-customer cost visibility.",sa:"'When CloudZero surfaces a cost anomaly, can you click through to the deployment that caused it, the pipeline run, and the engineer who triggered it — or is that a separate investigation?'",
  d:`## CloudZero vs Relay Cloud Cost Management — cost attribution vs delivery-connected cost intelligence
**What CloudZero is:** A cloud cost intelligence platform built around cost allocation without tags. CloudZero uses telemetry from AWS Cost and Usage Reports, Kubernetes metrics, and application data to attribute costs to business dimensions — teams, services, features, customers — without requiring tagging discipline. Real-time data and engineering-friendly dashboards.
## Where CloudZero wins
For organisations with inconsistent tagging and engineering teams that want cost visibility without a FinOps programme, CloudZero's tag-free attribution is a genuine differentiator. Per-customer cost visibility is strong for SaaS organisations.
## The delivery context gap
CloudZero shows cost trends and anomalies. It does not connect cost changes to the specific deployment, pipeline, feature flag, or code change that caused them. When a cost spike appears, the investigation path goes from CloudZero dashboard → Slack → deployment logs → engineer — a manual handoff chain.
## Relay Cloud Cost Management advantages
• **Deployment-linked cost changes** — Cloud Cost Management knows which pipeline run preceded a cost spike; engineers see cost impact on their deployment before promoting to production
• **Budget enforcement in pipeline gates** — block deployments that would breach a defined cost budget
• **Anomaly detection with deployment context** — anomalies automatically correlated with recent CD events
• **Platform integration** — same governance, RBAC, and audit trail as CD, IaCM, and Feature Flags
## Positioning
"CloudZero gives your engineering teams cost visibility. Cloud Cost Management gives your delivery pipeline cost intelligence — the difference is that Cloud Cost Management knows what changed in your deployments and can tell you why costs went up."
## Discovery questions
• "When CloudZero shows a cost anomaly, what is the typical investigation path to identify the root cause?"
• "Can your engineering teams see the projected cost impact of a deployment before they promote it to production?"
• "Do you have budget-based deployment gates — can a deployment be automatically blocked if it would breach a monthly spend limit?"`},
  {id:"opslevel",n:"OpsLevel",e:"📋",c:ER,cats:["idp"],str:"Enterprise SaaS IDP with service scorecards, maturity tracking, standards enforcement, and engineering KPIs. Strong for VP and CTO reporting on platform health. Mature self-service catalogue without Backstage's build-out overhead.",adv:"Relay Portal service scorecards are populated by real pipeline data — deployment frequency, change failure rate, and DORA metrics flow in automatically from Relay CD. OpsLevel requires custom connectors for each metric source; no separate DORA tooling needed with Relay.",wo:"Strong standards-enforcement and exec-reporting story resonates with platform engineering leaders. OpsLevel's maturity model helps teams understand where they are and what to improve — a consultative sale, not just a tool purchase.",sa:"'Are your OpsLevel service scorecards updated automatically by your CI/CD pipeline data, or does someone maintain integrations to pull in deployment frequency and change failure rate?'",
  d:`## OpsLevel vs Relay Portal — standalone service catalogue vs delivery-connected developer portal
**What OpsLevel is:** An enterprise SaaS Internal Developer Portal focused on service maturity, health scoring, and standards enforcement. Teams self-register services, define ownership, set maturity scorecard targets, and track engineering KPIs. Strong reporting for VP and CTO stakeholders who need a portfolio-level view of engineering health.
## Where OpsLevel wins
OpsLevel is faster to deploy and requires less engineering investment than Backstage. Its maturity scorecard model gives leadership clear, actionable metrics on platform health without building a custom reporting layer.
## The delivery data gap
OpsLevel scorecards measure engineering standards, but data sources — deployment frequency, MTTR, incident counts — require custom integrations or manual data entry. Most OpsLevel customers build and maintain connectors from their CD platform, ITSM tool, and observability stack.
## Relay Portal advantages
• **Real pipeline data** — deployment frequency, change failure rate, and pipeline health flow into IDP scorecards automatically from Relay CD — no custom connectors
• **DORA metrics native** — DORA metrics are a built-in product, not a reporting integration, so scorecards reflect actual delivery performance
• **Self-service backed by real pipelines** — scaffold a service or trigger a deployment from the portal; it executes a real Relay pipeline without webhook glue
• **Single vendor** — IDP, CD, Cloud Cost Management, and security scanning governance in one platform, one RBAC model, one audit log
## Positioning
"OpsLevel is a solid catalogue. The question is where its scorecard data comes from. With Relay, your scorecards are live: every deployment updates your DORA metrics automatically. No connector maintenance required."
## Discovery questions
• "Where does OpsLevel get your deployment frequency and MTTR data from today — is that an integration your team maintains?"
• "Do engineers trigger deployments from within OpsLevel, or does the portal link out to a separate CD tool?"
• "How do you track which services are meeting your engineering standards versus falling behind — is that automated?"`},
  {id:"amazonq",n:"Amazon Q Developer",e:"🤖",c:MU,cats:["ai"],str:"AWS-native AI coding assistant. Free tier for individual developers. Inline code completions, chat, code generation, security scanning, and unit test generation. Embeds in VS Code, JetBrains, and the AWS Console. Zero new vendor friction for AWS shops.",adv:"Relay AI is pipeline and delivery-aware — it understands deployment failures, pipeline context, infrastructure state, and incident history, not just code in an editor. Not AWS-locked: works across multi-cloud environments without requiring AWS ecosystem alignment.",wo:"'We get it with our AWS account' — zero incremental procurement or contract. AWS Console integration and Lambda/CDK awareness are genuine advantages for AWS-native teams. Strong IDE embedding with no new relationship to manage.",sa:"'Amazon Q knows your code. Does it know about your last 10 deployment failures, which services are degraded right now, and the infrastructure cost of the code it is suggesting?'",
  d:`## Amazon Q Developer vs Relay AI — AWS-native assistant vs delivery platform AI
**What Amazon Q Developer is:** AWS's AI coding assistant available in two tiers — a free individual tier and a paid Pro tier. Inline code completions, conversational chat for code generation, automated security scanning, unit test generation, and code reviews. Natively integrated with the AWS Console, AWS service APIs, and standard IDEs.
## Where Amazon Q wins
For AWS-native organisations, Amazon Q Developer requires no new vendor evaluation, no new procurement, and no new security review. The AWS Console integration and deep awareness of AWS service APIs is a genuine advantage for teams building on AWS. Free tier eliminates budget friction for individual developers.
## The delivery context gap
Amazon Q Developer understands code. It does not understand your delivery pipeline: it cannot explain why your last deployment failed, which pipeline stages are at risk, what infrastructure your code will run on, or how the code you are writing will affect your cloud costs.
## Relay AI advantages
• **Pipeline intelligence** — AI can explain pipeline failures, suggest remediation steps, and generate pipeline configurations — not just code suggestions
• **Deployment context** — AI understands the delivery lifecycle: build failures, test failures, deployment verification, rollback triggers
• **Multi-cloud** — AI works across AWS, Azure, GCP, and hybrid environments without ecosystem lock-in
• **Infrastructure and cost awareness** — AI surfaces infrastructure health and cost implications as part of delivery decisions
## Positioning
"Amazon Q Developer is a strong choice for code generation and AWS service integration. AI extends AI assistance to your entire delivery pipeline — understanding why deployments fail, generating fixes, and surfacing cost and reliability impact."
## Discovery questions
• "When a deployment fails, how does your team debug it today — is that a manual log investigation or does something surface the root cause?"
• "Does your AI coding assistant know about the deployment pipeline that runs the code it generates?"
• "How much of your infrastructure is AWS-only versus multi-cloud or on-prem?"`},
  {id:"statsig",n:"Statsig",e:"📊",c:ER,cats:["flags"],str:"Unified product experimentation platform: feature flags, A/B testing, and product analytics in one tool. Developer-friendly API and SDKs. Acquired by OpenAI in September 2025 — AI-native experimentation narrative for ML and product teams.",adv:"Relay Flags integrates feature flags natively with the CD pipeline: deploy → flag to 1% → Continuous Verification monitors → auto-expand or auto-rollback. Statsig is experimentation-first; Relay Flags is delivery-native. Flags and deployments share one governance model.",wo:"OpenAI acquisition gives Statsig a powerful AI-native narrative for ML-forward teams and AI companies. Product analytics unified with flags reduces tool sprawl. Growing fast in AI-first companies and product-led growth organisations.",sa:"'When a Statsig experiment causes a production incident, what is your process to roll back the flag and the underlying deployment simultaneously — or are those two separate operations?'",
  d:`## Statsig vs Relay Flags — product experimentation vs delivery-integrated feature management
**What Statsig is:** A unified product experimentation platform combining feature flags, A/B testing, and product analytics. Developer-friendly API and SDKs with strong data layer for experimentation (CUPED variance reduction, sequential testing). Acquired by OpenAI in September 2025, adding an AI-native experimentation narrative and OpenAI ecosystem integration.
## Where Statsig wins
For product and growth teams that need A/B experimentation, product analytics, and feature flagging in one tool, Statsig reduces tool sprawl. The OpenAI acquisition adds credibility with AI-first companies and ML teams looking to experiment on model outputs and product features simultaneously.
## The delivery integration gap
Statsig manages flag state and experiment results. It does not integrate with CD pipelines: when a new feature deployment needs a flag-gated rollout with automatic rollback on degraded metrics, Statsig requires custom wiring to your deployment tooling.
## Relay Flags advantages
• **CD-native** — Relay Flags flag rollouts are pipeline stages: deploy → flag 1% → CV monitors health → auto-expand → full rollout or auto-rollback based on metrics
• **Unified rollback** — if a flagged feature degrades production metrics, Relay simultaneously rolls back the flag AND the deployment — one action, not two
• **Governance** — same RBAC, audit log, and policy enforcement as CD deployments applies to flag changes
• **Economics** — Relay Flags is part of the Relay platform rather than a separate per-seat product licence
## Positioning
"Statsig excels at product experimentation and analytics. Relay Flags is built for delivery: the flag lifecycle is part of your deployment pipeline, not a parallel process that needs wiring to it."
## Discovery questions
• "When a feature flag change causes a production incident, what are the steps to roll back — and does that also roll back the deployment that shipped the code?"
• "Are your feature flag rollouts co-ordinated with your deployment pipeline automatically, or does that require manual steps?"
• "How do your developers define the metrics that determine whether a flag should auto-expand or roll back?"`},
  {id:"cortex",n:"Cortex",e:"🏆",c:ER,cats:["idp"],str:"Enterprise SaaS IDP with service scorecards, initiative tracking, and executive-ready engineering reporting. Enforces standards with less DIY overhead than Backstage. Strong positioning for CTO and VP Engineering stakeholders.",adv:"Relay Portal scorecards draw on real delivery pipeline data — deployment frequency, change failure rate — automatically. Cortex requires building and maintaining data connectors for each metric source. IDP, CD, DORA metrics, and governance in one platform.",wo:"Cortex's structured maturity model and fast time-to-value versus Backstage resonates with platform teams that cannot afford an 18-month Backstage build. Strong exec reporting out of the box without custom dashboards.",sa:"'How does Cortex know your DORA metrics today — is it pulling from your CD pipeline automatically, or is there a custom integration your platform team maintains?'",
  d:`## Cortex vs Relay Portal — standalone catalogue vs delivery-connected developer portal
**What Cortex is:** An enterprise SaaS Internal Developer Portal focused on service maturity scorecards, ownership enforcement, initiative tracking, and leadership reporting. Positioned as a faster, lower-maintenance alternative to Backstage — teams get executive-grade reporting on engineering standards without a large build-out.
## Where Cortex wins
Cortex is faster to adopt than Backstage and more structured than Port for organisations that want enforced engineering standards and executive dashboards. Initiative tracking helps platform teams drive adoption of standards across multiple service teams.
## The delivery data gap
Cortex scorecard metrics — deployment frequency, MTTR, change failure rate — require custom integrations from CD platforms, incident management tools, and observability systems. Most Cortex deployments involve a platform engineer maintaining these connector integrations.
## Relay Portal advantages
• **Real delivery data** — DORA metrics flow into IDP automatically from Relay CD: no connectors, no maintenance, no staleness
• **Self-service backed by real pipelines** — scaffolding a service or triggering a deployment from the portal executes a real Relay pipeline, not a stub
• **Platform breadth** — IDP, CD, security scanning, and Cloud Cost Management in one platform means scorecards can reflect cost health and security posture alongside deployment metrics
• **No connector maintenance** — no integration layer to keep in sync between your delivery tool and your portal
## Positioning
"Cortex is a strong catalogue for standards enforcement. The gap is data freshness: with Relay, your scorecards update with every deployment. No integration team required to keep them current."
## Discovery questions
• "Where does Cortex pull your deployment frequency and change failure rate from today — is that a connector your team built?"
• "Do your portal self-service actions trigger real pipeline runs, or do they create tickets for the platform team to action?"
• "How do you keep Cortex scorecards up to date when your underlying tooling changes?"`},
];


