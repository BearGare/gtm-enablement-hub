import type { ObjectionCard } from "../types";

/** Objection Gym drills — buyer lines with traps, strong answers, and coach tips. */
export const OBJECTIONS: ObjectionCard[] = [
  // ── category_reframe ──────────────────────────────────────────────
  {
    id: "like-gitlab",
    e: "🦊",
    title: "So you're like GitLab — SCM plus CI/CD plus security in one box?",
    theme: "category_reframe",
    personaIds: ["cto", "vpe", "platform"],
    moduleIds: ["ci", "cd", "secure", "test", "cost", "portal"],
    trap: "Accept the all-in-one label and start feature-comparing SCM, issues, and Duo. You sound like a GitLab clone and invite a rip-and-replace fight you often lose mid-contract.",
    strongAnswer:
      "GitLab is a strong SCM-plus-pipeline foundation — keep it where teams already live. Relay is the delivery intelligence layer on top: release verification with automatic rollback, progressive delivery, impact-based test selection, FinOps, and an IDP path GitLab doesn't cover deeply. The question isn't whether GitLab covers the basics — it's whether basics are enough when AI-generated change volume needs go/no-go gates, not more manual review.",
    coachTips:
      "Ask Duo add-on spend and renewal date early. Coexist on SCM/CI first; land where GitLab is thin (CD verification, Cost, Portal). Never trash Duo's MR strengths — reframe the surface: pre-merge assist vs post-merge ship safety.",
  },
  {
    id: "like-cd-platform",
    e: "🎯",
    title: "So you're just another CD / DevOps platform vendor?",
    theme: "category_reframe",
    personaIds: ["vpe", "platform", "devops"],
    moduleIds: ["cd", "ci", "test", "flags", "cost", "insights"],
    trap: "Race them on CD feature checklists or recycle competitor vocabulary. You either sound interchangeable or trigger a bake-off you didn't scope.",
    strongAnswer:
      "If the pain is release safety and pipeline toil, we're in the same conversation — and that's fine. Relay's story is the full plan-to-prod value stream on one Delivery Graph: CI and Test that absorb AI-era merge volume, CD with release verification and progressive delivery, Flags, Cost, and Insights so execs see whether faster coding became safer shipping. Start with the constraint you feel today; expand modules when the graph proves useful — not a big-bang platform swap.",
    coachTips:
      "Name their constraint first (rollback heroics, flake burden, idle spend). Coexistence on greenfield services beats displacement talk. Stay on Relay module names only — never borrow a competitor's product labels.",
  },
  {
    id: "like-backstage",
    e: "🎭",
    title: "So you're like Backstage? We're already building our own portal.",
    theme: "category_reframe",
    personaIds: ["platform", "dx", "em"],
    moduleIds: ["portal", "ci", "cd", "plans", "insights"],
    trap: "Dismiss the Backstage investment or pitch 'another portal UI.' DevEx and Platform will defend the catalog they've already promised leadership.",
    strongAnswer:
      "Backstage is a real framework standard — respect the catalog work. Relay Portal is the managed, Backstage-compatible path: service catalog, scorecards, and golden paths wired to real CI/CD so create→deploy isn't a wiki. If you keep a catalog UI, Relay can still be the workflow and delivery backend. The failure mode to avoid is a beautiful catalog with no paved road to production.",
    coachTips:
      "Ask how many engineers maintain the instance and what's on their backlog. Measure PoC adoption by time-to-first-deploy, not plugin count. Offer coexist, not rip-and-replace of entity YAML.",
  },

  // ── security_trust ────────────────────────────────────────────────
  {
    id: "scanner-standardised",
    e: "🔍",
    title: "We already standardised on Scanner X — we don't need another security tool.",
    theme: "security_trust",
    personaIds: ["seceng", "platform", "vpe"],
    moduleIds: ["secure", "supply", "cd", "code"],
    trap: "Pitch more scanners or a rip-and-replace of Snyk/Checkmarx. Security leads hear vendor churn and developers hear more noise.",
    strongAnswer:
      "Keep the licences that developers already trust. Relay Secure orchestrates and prioritises across tools — reachability-ranked findings, policy gates in the path to prod, and Supply for SBOM/provenance evidence. The win is remediation rate and cannot-bypass gates, not another PDF factory. Dashboards are secondary; enforcement on critical, reachable issues is the product.",
    coachTips:
      "Open with '% of findings developers actually fix.' Position ingest-and-prioritise, not displace. Runtime/WAF is adjacent — don't invent a WAAP module.",
  },
  {
    id: "where-does-code-go",
    e: "🔐",
    title: "Where does our source code go? We can't send repos to your cloud.",
    theme: "security_trust",
    personaIds: ["seceng", "cto", "platform"],
    moduleIds: ["secure", "ci", "supply", "code"],
    trap: "Hand-wave 'we're secure' or dive into marketing compliance badges. Security architecture wants data-flow clarity, not slogans.",
    strongAnswer:
      "Builds and secrets stay in your boundary. Edge agents/runners initiate outbound connections to the control plane — no inbound firewall holes required for the common model. The control plane coordinates policy and evidence; source and credentials don't become a SaaS dump. Happy to walk your security architecture team through the diagram and trust boundaries.",
    coachTips:
      "Offer an architecture review early with SecEng + Platform. Use outbound-agent language from the platform persona objection. Don't over-promise air-gap variants you haven't scoped.",
  },
  {
    id: "security-gates-slow",
    e: "⛔",
    title: "Security gates just slow us down — another tool will make it worse.",
    theme: "security_trust",
    personaIds: ["seceng", "devops", "em"],
    moduleIds: ["secure", "cd", "ci", "test"],
    trap: "Argue that security 'doesn't have to slow you down' without naming false-positive cost. Sounds like every vendor slide.",
    strongAnswer:
      "Unprioritised queues slow you more than ranked gates. Relay Secure puts policy in the same pipeline as CI/CD so critical, reachable issues block and the rest become actionable backlog — not a side dashboard teams mute. Pair with release verification on CD so 'safe to ship' is a signal, not a meeting. The metric is remediation and change-fail, not scanner count.",
    coachTips:
      "Agree that ignored dashboards are worthless. Sell pipeline enforcement + prioritisation. Pull a recent Sev story if they have one — map gate placement to that failure mode.",
  },

  // ── consolidation ─────────────────────────────────────────────────
  {
    id: "already-have-cicd",
    e: "⚙️",
    title: "We already have CI/CD — Actions/Jenkins plus Argo. Why add Relay?",
    theme: "consolidation",
    personaIds: ["vpe", "devops", "platform"],
    moduleIds: ["ci", "cd", "test", "sre"],
    trap: "Lead with 'we replace your CI/CD.' You insult sunk cost and invite a migration programme they will defer forever.",
    strongAnswer:
      "Keep what works. Ask who maintains it and what still breaks on release day. Relay commonly lands as the delivery and verification layer — progressive delivery, release verification, automatic rollback, impact-based tests — while existing CI or GitOps stays in place. Consolidation is earned after a greenfield PoC proves less toil and safer deploys, not day-one rip-and-replace.",
    coachTips:
      "Walk the last bad deploy: detect → people on the bridge → rollback. Map Relay CD/SRE to those steps. 'Our releases are fine' usually means heroic people — dig for manual steps.",
  },
  {
    id: "standardised-stack",
    e: "🏛️",
    title: "We're standardised on our current cloud and devops stack.",
    theme: "consolidation",
    personaIds: ["cto", "vpe", "platform"],
    moduleIds: ["portal", "cd", "secure", "insights", "cost"],
    trap: "Pitch a platform migration as the entry. CTO hears risk and politics; Platform hears lock-in.",
    strongAnswer:
      "Acknowledge the investment. Relay is the governance and verification layer across plan-to-prod — not a forced rip of every IDE, SCM, or cloud console. Start where the board narrative breaks: AI coding spend up, shipping confidence flat. One delivery story for Insights, Secure, CD, and Cost beats another point tool — coexistence first.",
    coachTips:
      "Stay exec-altitude with CTO; give VP Eng the ROI one-pager. Never open with a 14-module tour. Ask which three tools would survive a consolidation cut — and why.",
  },
  {
    id: "platform-building-it",
    e: "🛠️",
    title: "Our platform team is building this — we don't need a vendor.",
    theme: "consolidation",
    personaIds: ["platform", "cto", "dx"],
    moduleIds: ["portal", "ci", "cd", "infra", "flags"],
    trap: "Argue they can't build it. Platform leaders hear disrespect and become blockers.",
    strongAnswer:
      "Ask calendar time and what they will not build while they do it — usually two-plus quarters of developer-facing work deferred. Internal platforms often burn half their capacity on glue and upgrades. Relay is the managed substrate so their team builds golden paths and product leverage, not another CI plugin archaeology project. Lock-in already exists in custom scripts; contrast that with standard YAML and a Terraform provider.",
    coachTips:
      "Let them set two-week success criteria before any demo. Propose greenfield service first. 'We could build this' → opportunity cost, not capability denial.",
  },

  // ── ai_washing ────────────────────────────────────────────────────
  {
    id: "just-ai-stickers",
    e: "✨",
    title: "Every vendor claims AI now — why isn't this just AI washing?",
    theme: "ai_washing",
    personaIds: ["cto", "vpe", "seceng"],
    moduleIds: ["code", "test", "cd", "sre", "insights"],
    trap: "List agent brand names and model providers. Execs hear buzzword bingo; sceptics dig in.",
    strongAnswer:
      "Fair challenge. Judge us on where AI changes a delivery decision: impact-based test selection when merge volume spikes, release verification that can roll back, incident correlation that answers what changed, Insights that separate seat usage from ship outcomes. Relay AI (Pilot, Conductor, Prover, Medic) sits on the Delivery Graph — code, pipelines, services, incidents, cost — not a chatbot bolted on a dashboard. If we can't map an agent to a stage you feel, cut it from the pitch.",
    coachTips:
      "Ask how they report AI coding ROI today. Pivot from IDE assist (keep Copilot/Cursor) to release-layer proof. Never invent customer AI win rates.",
  },
  {
    id: "ai-tools-already",
    e: "🤖",
    title: "We already pay for Copilot/Cursor — and GitLab Duo. We're covered on AI.",
    theme: "ai_washing",
    personaIds: ["vpe", "em", "dx", "cto"],
    moduleIds: ["code", "test", "cd", "insights", "secure"],
    trap: "Compete on autocomplete quality. You lose to the IDE they love and miss the delivery gap.",
    strongAnswer:
      "Keep the coding assistants — they accelerate authoring. The gap is whether more commits become safe production changes: review quality at volume, tests that scale with AI PRs, progressive delivery with verification, and Insights that survive CFO scrutiny. Duo and IDE tools are strong pre-merge; Relay covers the path from merge to verified release — and Relay AI is included in the platform, not a separate per-seat AI line item bolted only to the editor.",
    coachTips:
      "Confirm Duo packaging from public pages or the prospect — don't invent prices. Ask change-fail or rework rates for AI-assisted vs human changes. Land Test/CD/Insights if Code isn't the wedge.",
  },
  {
    id: "ai-hallucinates-ops",
    e: "🩹",
    title: "AI will hallucinate remediations — we're not letting a model touch prod.",
    theme: "ai_washing",
    personaIds: ["devops", "seceng", "platform"],
    moduleIds: ["sre", "cd", "secure"],
    trap: "Promise fully autonomous healing. Trust collapses; SecEng and DevOps veto.",
    strongAnswer:
      "Humans stay on the loop for high-risk actions. Relay SRE uses curated runbooks and change correlation — Medic proposes remediation and incident recaps grounded in what shipped, not free-form invention. Same pattern on CD: release verification and rollback policies you define; AI accelerates detection and draft response. Start in suggest mode on a non-critical service until the trust model earns expand.",
    coachTips:
      "Separate observability (keep Datadog/Grafana) from change intelligence. Emphasise approve/reject, blast radius, and audit. Reliability experiments are governed — not chaos for its own sake.",
  },

  // ── budget_owner ──────────────────────────────────────────────────
  {
    id: "cant-show-roi",
    e: "📊",
    title: "We can't show ROI yet — Finance won't approve another platform.",
    theme: "budget_owner",
    personaIds: ["vpe", "cto", "finops"],
    moduleIds: ["insights", "cost", "ci", "cd"],
    trap: "Drop a generic 'customers save 30%' claim. They need their numbers, and invented peers destroy credibility.",
    strongAnswer:
      "Build TCO live with them: pipeline maintenance FTE + incident/rollback cost + idle non-prod waste + AI tooling spend without release-layer proof. Relay Insights and Cost make the before/after measurable; a two-week PoC on one greenfield service is the evidence pack for CTO/Finance — not a migration programme. Their model, their spreadsheet, your job is to co-author it.",
    coachTips:
      "VP Eng reuses whatever you build in discovery — do it in the room. Avoid vendor ROI calculators with fake benchmarks. Tie idle shutdown schedules and flake/toil hours to month-one payback.",
  },
  {
    id: "finops-no-budget",
    e: "💰",
    title: "We have native cloud cost consoles — and FinOps doesn't own the tool budget anyway.",
    theme: "budget_owner",
    personaIds: ["finops", "vpe", "cto"],
    moduleIds: ["cost", "infra", "cd", "portal", "ci"],
    trap: "Sell only to FinOps or only bash AWS/Azure explorers. You miss the economic buyer and sound like a cost-dashboard clone.",
    strongAnswer:
      "Native consoles are often single-cloud and report-only. Relay Cost is multi-cloud, tied to delivery environments and Portal ownership, and can act — idle shutdown with wake-on-demand — not just alert. Align the motion: FinOps owns the ROI narrative to CTO/CFO; VP Eng / Platform owns the platform choice. Without eng-owned tags and environment lifecycle, FinOps can't operationalise savings.",
    coachTips:
      "Open with idle non-prod % and time-to-attribute last spike. Address 'auto-stop breaks developers' with allowlists and sticky exclusions. Co-sponsor meetings beat single-threaded FinOps pursuit.",
  },
  {
    id: "no-time-to-evaluate",
    e: "⏱️",
    title: "We don't have time to evaluate tools — and we're not ready for a migration.",
    theme: "budget_owner",
    personaIds: ["em", "vpe", "devops"],
    moduleIds: ["cd", "ci", "portal", "test"],
    trap: "Push a wide bake-off or prod process change mid-quarter. EM and DevOps stall; budget never materialises.",
    strongAnswer:
      "Agree — no platform migration to start. Frame a PoC as replacing one painful path for one non-critical or net-new service: clearer checks, safer deploy, faster feedback inside the trial window so net time is saved, not spent. Migration and consolidation are earned after evidence; prod process stays intact until then. EM success criteria become user pull for Platform and budget cover for VP Eng.",
    coachTips:
      "Let Platform/VP set exit criteria up front. Keep scope embarrassingly small. If EM says 'Platform decides,' agree and capture their adoption bar so the champion motion is pull, not vendor push.",
  },
];
