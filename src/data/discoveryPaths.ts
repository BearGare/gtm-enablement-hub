import type { DiscoveryPath } from "../types";

/** Constraint-first discovery paths — one per SDLC stage. Browse mode stays in discovery.ts. */
export const DISCOVERY_PATHS: DiscoveryPath[] = [
  {
    stageId: "plan",
    title: "Plan constraint path",
    e: "📋",
    steps: [
      {
        prompt: "Where does a typical initiative lose the most calendar time before code even starts — backlog thrash, dependency discovery, or commitment resets?",
        why: "Confirms Plan is the wedge. If the wait is later (CI, security, release), switch stages rather than pitching Relay Plans into the wrong pain.",
        hintNext: "Quantify how commitments are made today.",
        moduleHints: ["Relay Plans", "Relay Insights"],
      },
      {
        prompt: "What data actually informs sprint or quarterly commitment — throughput, hope, or status slides?",
        why: "Surfaces whether planning is grounded in delivery signals. Hope-based commitments open Relay Plans + Insights.",
        hintNext: "Check service ownership clarity.",
        moduleHints: ["Relay Plans", "Relay Insights"],
      },
      {
        prompt: "Can they name owners for the top services in the initiative without opening three tools?",
        why: "Unclear ownership → Relay Portal catalog truth before scoping new builds.",
        hintNext: "Land on module fit.",
        moduleHints: ["Relay Portal"],
      },
      {
        prompt: "If Plan is the constraint, does Relay Plans (with Portal + Insights) earn a focused land — or is the real wait elsewhere?",
        why: "Closes the path: name the land module and adjacent expansion only after the constraint is confirmed.",
        hintNext: "Hand off to Land Planner with Plan selected.",
        moduleHints: ["Relay Plans", "Relay Portal", "Relay Insights"],
      },
    ],
  },
  {
    stageId: "code",
    title: "Code constraint path",
    e: "💻",
    steps: [
      {
        prompt: "As AI increases PR volume, what is happening to review latency and reviewer burnout?",
        why: "AI speeds authoring; review and standards become the constraint. Opens Relay Code without pretending coding assistants are the whole story.",
        hintNext: "Separate seat usage from delivery outcomes.",
        moduleHints: ["Relay Code"],
      },
      {
        prompt: "Are they measuring change-fail or rework differently for AI-assisted changes vs fully human-authored ones?",
        why: "Most orgs track seats, not outcomes. Bridges to Insights and Secure when AI risk is the exec pressure.",
        hintNext: "Check when security feedback arrives.",
        moduleHints: ["Relay Code", "Relay Insights", "Relay Secure"],
      },
      {
        prompt: "When does security or standards feedback arrive — in review, in CI, or days after merge?",
        why: "Late feedback means Portal/Secure wrap is part of the land story, not a bolt-on.",
        hintNext: "Confirm land module.",
        moduleHints: ["Relay Secure", "Relay Portal"],
      },
      {
        prompt: "If Code is the constraint, is the land Relay Code (review quality / understanding) — or did you just discover Build/Secure is where work waits?",
        why: "Keeps the wedge honest. Expand to Portal/Secure only after Code pain is real.",
        hintNext: "Hand off to Land Planner with Code selected.",
        moduleHints: ["Relay Code", "Relay Portal", "Relay Secure"],
      },
    ],
  },
  {
    stageId: "build",
    title: "Build constraint path",
    e: "🔨",
    steps: [
      {
        prompt: "Where does a change spend the most wall-clock time between merge and a trustworthy artifact — queue, flakes, or cache misses?",
        why: "Names Build as the wait state. Flaky or slow CI is a Relay CI wedge, not a vague 'DevOps' pitch.",
        hintNext: "Quantify signal quality.",
        moduleHints: ["Relay CI"],
      },
      {
        prompt: "How often do green builds still fail later for reasons CI could have caught — and who trusts the signal today?",
        why: "Trust collapse in CI opens Insights adjacency and Supply when artifact provenance matters.",
        hintNext: "Check supply-chain inventory speed.",
        moduleHints: ["Relay CI", "Relay Insights", "Relay Supply"],
      },
      {
        prompt: "When a critical CVE hits a transitive dependency, how fast can they name affected services and evidence the fix?",
        why: "Supply-chain pain may be co-primary with CI — still land CI first if wait is pipeline time.",
        hintNext: "Confirm land vs expand.",
        moduleHints: ["Relay Supply"],
      },
      {
        prompt: "Confirm: is Build the constraint (Relay CI land), with Supply/Insights as expand — or should you switch stage?",
        why: "Path exit criteria before Land Planner.",
        hintNext: "Hand off to Land Planner with Build selected.",
        moduleHints: ["Relay CI", "Relay Supply", "Relay Insights"],
      },
    ],
  },
  {
    stageId: "test",
    title: "Test constraint path",
    e: "🧪",
    steps: [
      {
        prompt: "What share of the critical path is waiting on test selection, flaky suites, or full regression that nobody trusts?",
        why: "Test wait is a first-class constraint — Relay Test land, not 'just buy more CI minutes'.",
        hintNext: "Connect to change-fail.",
        moduleHints: ["Relay Test"],
      },
      {
        prompt: "When tests flake, do teams quarantine, ignore, or block the train — and what is the incident correlation?",
        why: "Behaviour around flakes shows whether Test is cultural debt or tooling debt.",
        hintNext: "CI hosting of stages.",
        moduleHints: ["Relay Test", "Relay CI"],
      },
      {
        prompt: "Can Insights (or today's dashboards) prove that testing wait is the bottleneck — or is it still anecdotal?",
        why: "Proof for economic buyers; Insights as expand or co-land narrative.",
        hintNext: "Confirm land module.",
        moduleHints: ["Relay Insights"],
      },
      {
        prompt: "If Test is the wedge: Relay Test land, CI/Insights expand. Ready for Land Planner?",
        why: "Closes path with an honest module sequence.",
        hintNext: "Hand off to Land Planner with Test selected.",
        moduleHints: ["Relay Test", "Relay CI", "Relay Insights"],
      },
    ],
  },
  {
    stageId: "secure",
    title: "Secure constraint path",
    e: "🔒",
    steps: [
      {
        prompt: "What percentage of SAST/SCA findings do developers actually remediate — and what happens to the rest?",
        why: "Noise and trust collapse open Relay Secure prioritisation, not another scanner logo.",
        hintNext: "Org-wide enforceability.",
        moduleHints: ["Relay Secure"],
      },
      {
        prompt: "If they needed a mandatory security policy step on every production pipeline tomorrow, how long would that take?",
        why: "Tests Portal templates + policy-as-code readiness vs YAML snowflakes.",
        hintNext: "Supply-chain inventory.",
        moduleHints: ["Relay Secure", "Relay Portal"],
      },
      {
        prompt: "Who owns vulnerability inventory today — AppSec, platform, or nobody clearly?",
        why: "Ownership gaps pull Supply into the expansion path.",
        hintNext: "Confirm land.",
        moduleHints: ["Relay Supply"],
      },
      {
        prompt: "Secure constraint confirmed → Relay Secure land; Supply/Portal expand. Continue to Land Planner?",
        why: "Keeps security land focused; avoids boiling the ocean with every scanner.",
        hintNext: "Hand off to Land Planner with Secure selected.",
        moduleHints: ["Relay Secure", "Relay Supply", "Relay Portal"],
      },
    ],
  },
  {
    stageId: "release",
    title: "Release constraint path",
    e: "🚀",
    steps: [
      {
        prompt: "How often do they deploy to production, and what still requires a human coordinator on the critical path?",
        why: "Frequency vs fear. Manual babysitting → Relay CD / release verification wedge.",
        hintNext: "Rollback reality.",
        moduleHints: ["Relay CD"],
      },
      {
        prompt: "When a bad deployment lands, how do they detect it — and what does rollback look like in practice?",
        why: "Slack-noticed regressions and manual reverts are the classic CD land story.",
        hintNext: "Flags / infra / data adjacency.",
        moduleHints: ["Relay CD", "Relay Flags"],
      },
      {
        prompt: "How many people coordinate a non-trivial release — and are progressive delivery / flags / schema deploys part of the wait?",
        why: "Surfaces Flags, Infra, Data as expand modules without pitching the catalogue first.",
        hintNext: "Confirm land.",
        moduleHints: ["Relay Flags", "Relay Infra", "Relay Data"],
      },
      {
        prompt: "Release is the constraint → Relay CD land; Flags/Infra/Data expand. Open Land Planner?",
        why: "Path complete when CD is clearly the wedge.",
        hintNext: "Hand off to Land Planner with Release selected.",
        moduleHints: ["Relay CD", "Relay Flags", "Relay Infra", "Relay Data"],
      },
    ],
  },
  {
    stageId: "operate",
    title: "Operate constraint path",
    e: "📡",
    steps: [
      {
        prompt: "When an incident fires, how quickly can responders answer 'what changed?' with confidence?",
        why: "Change intelligence — Relay SRE / CD adjacent to existing APM, not a rip-and-replace monitoring story.",
        hintNext: "MTTR breakdown.",
        moduleHints: ["Relay SRE"],
      },
      {
        prompt: "What percentage of MTTR is investigation versus actual fix — and who owns the golden path for runbooks?",
        why: "Investigation-heavy MTTR → SRE land; Portal for ownership/routing expand.",
        hintNext: "Deploy linkage.",
        moduleHints: ["Relay SRE", "Relay Portal", "Relay CD"],
      },
      {
        prompt: "Do deploy and runtime signals live in one place, or does on-call stitch three tools under pressure?",
        why: "Honest coexist with Datadog-class tools; Relay adds delivery-aware response.",
        hintNext: "Confirm land.",
        moduleHints: ["Relay SRE", "Relay CD"],
      },
      {
        prompt: "Operate constraint → Relay SRE land; CD/Portal expand. Continue to Land Planner?",
        why: "Avoids positioning Relay as 'another observability vendor'.",
        hintNext: "Hand off to Land Planner with Operate selected.",
        moduleHints: ["Relay SRE", "Relay CD", "Relay Portal"],
      },
    ],
  },
  {
    stageId: "improve",
    title: "Improve constraint path",
    e: "📊",
    steps: [
      {
        prompt: "How long does it take to attribute a cloud spend spike to a team, service, or environment?",
        why: "Showback gap → Relay Cost land tied to delivery environments.",
        hintNext: "Idle non-prod.",
        moduleHints: ["Relay Cost"],
      },
      {
        prompt: "What share of non-production environments run outside business hours with no active users?",
        why: "Idle waste is a month-one ROI story — still confirm it is the real exec pressure.",
        hintNext: "Throughput learning loop.",
        moduleHints: ["Relay Cost", "Relay Insights"],
      },
      {
        prompt: "Do planning forums use throughput reality, or do they keep committing against hope while FinOps fires alerts after the invoice?",
        why: "Pulls Insights/Plans into expansion when Improve is the constraint.",
        hintNext: "Confirm land.",
        moduleHints: ["Relay Insights", "Relay Plans"],
      },
      {
        prompt: "Improve constraint → Relay Cost land; Insights/Plans expand. Open Land Planner?",
        why: "Closes the FinOps-led path without pretending Cost replaces the delivery spine.",
        hintNext: "Hand off to Land Planner with Improve selected.",
        moduleHints: ["Relay Cost", "Relay Insights", "Relay Plans"],
      },
    ],
  },
];
