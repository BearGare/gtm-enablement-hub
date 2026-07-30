/** Discovery question groups for Relay GTM Signal Hub. */
export const DISC: { title: string; qs: { q: string; why: string; fu: string }[] }[] = [

  {title:"🚀 Deployment & reliability",qs:[
    {q:"How often do you deploy to production, and what still requires a human coordinator on the critical path?",
     why:"Surfaces frequency vs fear. High frequency with manual babysitting → Relay CD / release verification. Low frequency often means risk avoidance — also a Relay CD story.",
     fu:"What is the most painful step between 'merged' and 'known-good in production'?"},
    {q:"When a bad deployment lands, how do you detect it — and what does rollback look like in practice?",
     why:"Maps to release verification and automated rollback in Relay CD. Slack-noticed regressions and manual reverts are the wedge.",
     fu:"How long from first symptom to a stable rollback or forward fix?"},
    {q:"How many people are typically involved in coordinating a non-trivial release?",
     why:"Quantifies release-orchestration toil. Spreadsheets and multi-team sign-offs justify standardisation on Relay CD.",
     fu:"Is there a dedicated release owner, or does it fall on each squad ad hoc?"},
  ]},

  {title:"🔒 Security in the delivery path",qs:[
    {q:"What percentage of SAST/SCA findings do developers actually remediate — and what happens to the rest?",
     why:"Exposes noise and trust collapse. Low remediation rates open Relay Secure prioritisation and pipeline gates.",
     fu:"If every finding shown were confirmed reachable in your codebase, how would developer behaviour change?"},
    {q:"If you needed a mandatory security policy step on every production pipeline tomorrow, how long would that take?",
     why:"Tests org-wide enforceability. Weeks/months of YAML snowflakes → Portal templates + Secure policy-as-code.",
     fu:"Which teams would route around it, and why?"},
    {q:"When a critical CVE hits a transitive dependency, how fast can you name the affected services and evidence the fix?",
     why:"Supply-chain and SBOM conversation (Relay Supply) without compliance theatre.",
     fu:"Who owns that inventory today — AppSec, platform, or nobody clearly?"},
  ]},

  {title:"🤖 AI coding impact",qs:[
    {q:"Your engineers use AI coding assistants — are you measuring change failure rate or rework differently for AI-assisted changes vs fully human-authored ones?",
     why:"Most orgs track seat usage, not delivery outcomes. Opens Relay Insights and the need for Deploy-level telemetry.",
     fu:"When AI-assisted changes fail in production, what does the incident look like compared to other changes?"},
    {q:"As AI increases PR volume, what is happening to code-review latency and reviewer burnout on your teams?",
     why:"Connects coding velocity to bottlenecks downstream in the delivery stream. Relay Code standards + CI signal quality + Insights.",
     fu:"Which review costs are invisible in your current productivity dashboards?"},
    {q:"Between commit and production, how many manual handoffs remain — and which of those did AI tooling not accelerate at all?",
     why:"Frames the velocity gap: AI speeds coding; Relay targets the remaining delivery chain.",
     fu:"Which handoff has the longest wait or the highest incident correlation?"},
  ]},

  {title:"🏗️ Platform engineering",qs:[
    {q:"What percentage of services run on a golden path versus bespoke pipelines?",
     why:"Adoption metric for Relay Portal + CI/Deploy standards. Low golden-path share predicts sprawl pain.",
     fu:"What causes teams to escape the paved road?"},
    {q:"How much of the platform team's capacity is maintenance of delivery glue versus new developer-facing capability?",
     why:"Build-vs-buy and opportunity-cost framing for Relay as managed substrate.",
     fu:"If maintenance dropped by half, what would you ship next for developers?"},
    {q:"Walk me through provisioning a new service — ticket steps, approvals, and time to first production deploy.",
     why:"Classic IDP ROI path: catalog + templates + self-service actions in Relay Portal.",
     fu:"Which step creates the most waiting or the most snowflake configuration?"},
  ]},

  {title:"💰 FinOps & cloud efficiency",qs:[
    {q:"How long does it take to attribute a cloud spend spike to a team, service, or environment?",
     why:"Showback gap → Relay Cost attribution tied to delivery environments.",
     fu:"What is missing from the report you give leadership today?"},
    {q:"What share of non-production environments run outside business hours with no active users?",
     why:"Idle waste is the month-one ROI story for automated stop/wake policies in Relay Cost.",
     fu:"Have you tried schedule-based shutdowns — and what broke for developers when you did?"},
    {q:"Can you attribute CI/build minutes and ephemeral environment cost to the teams that cause them?",
     why:"Connects delivery behaviour to spend; CI + Cost modules together.",
     fu:"Are there guardrails before resources are created, or only alerts after invoicing?"},
  ]},

  {title:"✨ Developer experience",qs:[
    {q:"How long until a new engineer ships their first meaningful change to production?",
     why:"North-star DX metric. Long tails justify Portal golden paths and clearer Plan→Deploy linkage.",
     fu:"What are the top three papercuts in that journey?"},
    {q:"How many distinct systems must a developer touch to take a story from backlog to production?",
     why:"Cognitive-load framing for Relay Plans + Code + CI + CD cohesion.",
     fu:"Which hop is most likely to stall a release?"},
    {q:"Do you run developer scorecards — and can teams remediate failing checks with a self-service action?",
     why:"Scorecards without fix buttons breed resentment. Portal actions + Secure/Deploy defaults.",
     fu:"What would make the paved road obviously easier than DIY?"},
  ]},

  {title:"📡 Observability & change intelligence",qs:[
    {q:"When an incident fires, how quickly can responders answer 'what changed?' with confidence?",
     why:"Change intelligence across deploys, config, and flags. Relay SRE / Relay CD adjacent to existing APM/log stacks — complementary positioning.",
     fu:"What percentage of MTTR is investigation versus actual fix?"},
    {q:"Which signals decide that a canary or progressive deploy is healthy enough to continue?",
     why:"Concrete Verify design input: metrics, logs, traces, synthetic checks.",
     fu:"How automated is the stop/rollback decision today?"},
    {q:"How do you connect feature-flag changes and config changes to the same incident timeline as code deploys?",
     why:"Often a blind spot. Opens Flags + Deploy + Observe correlation.",
     fu:"Who owns the source of truth for 'what is live' across those change types?"},
  ]},

  {title:"🧭 Change management & adoption",qs:[
    {q:"When you introduce a new delivery standard, what percentage of teams adopt it in the first quarter — and why do the rest wait?",
     why:"Change-management reality check. Informs Portal rollout, EM champions, and PoC design.",
     fu:"What incentives or mandates have actually worked here before?"},
    {q:"How do you decide build-vs-buy for platform capabilities — and what have you regretted building?",
     why:"Surfaces NIH honestly. Lets Relay be positioned as substrate, not a threat to platform identity.",
     fu:"What would a vendor need to prove in two weeks for you to recommend it internally?"},
    {q:"Who are the quiet blockers in tooling decisions — security, platform, FinOps, or sceptical senior ICs — and how do you bring them in early?",
     why:"Multi-threads the deal. Maps to persona cards and parallel discovery tracks.",
     fu:"Which of those groups has veto power versus influence-only?"},
  ]},

];
