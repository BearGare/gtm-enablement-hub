import { A, TL, WA, ER } from "../colors";
import type { Item } from "../types";

export const RELAY_AI: {
  platform: Item[];
  agents: Item[];
  features: Item[];
} = {
  platform: [
    {
      id: "rai-relay-ai",
      e: "🔮",
      c: A,
      title: "Relay AI",
      short: "The unified intelligence layer that powers every AI capability across Relay — code, delivery, and verification working as one system.",
      d: `## Relay AI

Relay AI is the cross-domain intelligence layer built into the platform. Rather than bolting isolated copilots onto individual tools, Relay AI operates across the full software lifecycle — understanding code context, delivery history, test results, and production signals simultaneously.

## Why a unified intelligence layer matters
A code suggestion that ignores deployment constraints is incomplete. A deployment decision that ignores test coverage is risky. Relay AI connects these domains so every AI action is grounded in the full picture:
- Code suggestions are informed by production error patterns and deployment frequency.
- Deployment risk scores incorporate code complexity, test gaps, and historical change failure rates.
- Test prioritisation uses code-change impact analysis and production incident data.

## Architecture
Relay AI combines retrieval-augmented generation with the Delivery Graph — a structured live map of code, services, pipelines, environments, owners, incidents, and cost. Every query is enriched with relevant context from the caller's domain and adjacent domains before the model generates a response.`,
      sections: [
        { title: "🧠 Model layer", content: "Multi-model routing — selects the optimal foundation model (speed vs reasoning depth) based on task complexity, latency budget, and data-residency constraints." },
        { title: "🔒 Data boundaries", content: "Tenant data never crosses organisational boundaries. Embeddings and indexes are per-tenant. No customer code is used for model training." },
      ],
    },
    {
      id: "rai-context-graph",
      e: "🕸️",
      c: TL,
      title: "Delivery Graph",
      short: "A live map of code, services, pipelines, environments, owners, incidents, and cost that gives every AI action rich, organisation-specific context.",
      d: `## Delivery Graph

The Delivery Graph is the retrieval backbone behind Relay AI. It indexes an organisation's codebase, pipeline definitions, deployment history, incident records, runbooks, and internal documentation into a searchable semantic store.

## How it works
1. **Ingestion** — Git commits, CI logs, deployment events, alert history, and docs are continuously embedded into high-dimensional vectors.
2. **Hybrid search** — Every AI query runs both semantic (vector similarity) and keyword (full-text) search, then merges results via reciprocal rank fusion.
3. **Contextual injection** — The top-ranked fragments are injected into the model prompt, grounding responses in real organisational knowledge.

## What this enables
- A developer asking "why does this service fail on Fridays?" gets an answer citing last month's incident post-mortem and the cron job that runs on Thursday nights.
- A code review agent flags a pattern that caused a production incident in a different service six months ago.
- A release agent (Conductor) references the runbook for the target environment's specific constraints.`,
      sections: [
        { title: "📐 Index scope", content: "Configurable per-org: which repos, doc sources, and telemetry streams to include. Sensitive repos can be excluded or access-controlled." },
        { title: "⚡ Freshness", content: "Incremental re-indexing on every push, deploy, or incident event. Full reindex runs nightly as a consistency check." },
      ],
    },
    {
      id: "rai-guardrails",
      e: "🛡️",
      c: ER,
      title: "AI Guardrails",
      short: "Safety and governance controls that bound what AI agents can do — approval gates, scope limits, audit trails, and human-in-the-loop checkpoints.",
      d: `## AI Guardrails

Every AI action in Relay passes through a guardrail layer before execution. This ensures autonomous agents remain predictable, auditable, and aligned with organisational policies.

## Guardrail types
- **Scope limits** — restrict which repositories, environments, and resource types an agent can touch. An agent scoped to staging cannot deploy to production.
- **Approval gates** — high-impact actions (production deploys, security policy changes, cost threshold breaches) require human approval before the agent proceeds.
- **Output validation** — generated code and configuration changes are automatically scanned by SAST, SCA, and policy checks before being committed or applied.
- **Rate limiting** — caps on actions per time window prevent runaway agents from making excessive changes.

## Audit and explainability
Every agent action is logged with full context: the input prompt, retrieved context, model output, guardrail evaluations, and final outcome. Teams can replay any decision chain for compliance or debugging.`,
      sections: [
        { title: "⚙️ Configuration", content: "Guardrails are defined as policy-as-code rules in the same Git repo as deployment policies, versioned and reviewed like any other config." },
        { title: "🔄 Override flow", content: "Break-glass overrides exist for emergencies. They require elevated approval, generate alerts, and are flagged in compliance reports." },
      ],
    },
  ],

  agents: [
    {
      id: "rai-agent-code",
      e: "✏️",
      c: A,
      title: "Pilot",
      short: "An autonomous coding agent that writes, refactors, and reviews code with full repo context and delivery awareness.",
      d: `## Pilot

Pilot operates inside the developer's workflow — IDE, pull request, or CLI — to accelerate coding tasks with organisation-aware intelligence.

## Capabilities
- **Code generation** — writes implementations from natural-language descriptions, informed by the repo's existing patterns, style conventions, and dependency choices.
- **Refactoring** — identifies and executes safe refactors (extract function, rename across files, migrate API usage) with automated verification.
- **Code review** — analyses pull requests for bugs, security issues, performance concerns, and style violations. Suggests fixes inline rather than just flagging problems.
- **Codebase Q&A** — answers questions about the codebase by searching the Delivery Graph for relevant code, docs, and historical changes.

## Delivery awareness
Unlike standalone copilots, Pilot knows how the code gets deployed. It can warn if a change will break a downstream pipeline, flag if the target service has an active incident, or note that the affected environment has a deployment freeze.`,
    },
    {
      id: "rai-agent-deploy",
      e: "🚀",
      c: WA,
      title: "Conductor",
      short: "An intelligent release agent that plans rollout strategies, monitors canary health, and auto-remediates failures.",
      d: `## Conductor

Conductor automates the judgment calls in the deployment process — choosing a rollout strategy, monitoring health signals, and deciding when to proceed or roll back.

## How it works
1. **Risk assessment** — analyses the change set (files modified, services affected, blast radius from the Delivery Graph) and assigns a risk tier.
2. **Strategy selection** — picks the rollout strategy based on risk: low-risk changes deploy directly, medium-risk use canary with automated release verification, high-risk require manual approval gates.
3. **Health monitoring** — during canary rollouts, continuously evaluates error rates, latency percentiles, and custom SLIs. Automatically advances traffic or triggers rollback.
4. **Post-deploy verification** — runs smoke tests and checks SLO compliance for a configurable soak period after full rollout.

## Learning from history
Conductor improves its risk model over time by incorporating deployment outcomes. Services with a history of smooth deploys get faster rollouts; services that have caused incidents get additional scrutiny.`,
    },
    {
      id: "rai-agent-test",
      e: "🧪",
      c: TL,
      title: "Prover",
      short: "Generates, prioritises, and maintains tests — then identifies flaky tests and recommends fixes based on failure patterns.",
      d: `## Prover

Prover tackles the hardest parts of testing: writing meaningful tests, keeping them reliable, and running the right subset for each change.

## Capabilities
- **Test generation** — creates unit and integration tests from code analysis, guided by the Delivery Graph's understanding of the service's contracts and dependencies.
- **Test selection** — analyses the code diff to determine the minimum set of tests that must pass, cutting CI time without sacrificing confidence.
- **Flake detection** — identifies tests with inconsistent results by analysing historical pass/fail patterns across different branches and environments.
- **Flake diagnosis** — when a test is flagged as flaky, Prover analyses timing patterns, shared state, and external dependencies to suggest root-cause fixes.

## Impact on delivery speed
By running only relevant tests and quarantining known flakes, Prover can dramatically reduce pipeline wait times while maintaining (or improving) the actual quality signal.`,
    },
    {
      id: "rai-agent-incident",
      e: "🚨",
      c: ER,
      title: "Medic",
      short: "Correlates alerts with recent changes, surfaces likely root causes, and drafts runbook-informed remediation steps.",
      d: `## Medic

When an alert fires, Medic accelerates the path from detection to resolution by correlating production signals with delivery history.

## Investigation flow
1. **Alert enrichment** — when a monitor triggers, Medic gathers related metrics, logs, and traces for the affected service.
2. **Change correlation** — queries recent deployments, config changes, and infrastructure modifications from the Delivery Graph to identify likely causes.
3. **Root-cause hypothesis** — ranks potential causes by confidence, citing evidence from telemetry and change history.
4. **Remediation suggestions** — drafts response steps informed by the service's runbook, past incident post-mortems, and the specific change suspected.

## Human-in-the-loop
Medic proposes actions but does not execute remediations autonomously unless explicitly configured. Rollback of a suspected bad deploy still requires human confirmation unless the team has opted into fully automated rollback policies.`,
    },
  ],

  features: [
    {
      id: "rai-feat-natural-lang-pipelines",
      e: "💬",
      c: A,
      title: "Natural-Language Pipelines",
      short: "Describe what you want to build, test, and deploy in plain English — Relay generates the pipeline definition with best-practice stages.",
      d: `## Natural-Language Pipelines

Instead of hand-authoring YAML pipeline definitions, developers describe intent in natural language and the platform generates a fully functional pipeline.

## How it works
- The developer writes a prompt like "Build a Go service, run unit tests and linting, scan for CVEs, deploy to staging with a canary, then promote to production after 30 minutes if error rate stays below 0.1 %."
- Relay AI maps this intent to concrete pipeline stages using the organisation's templates, artefact registries, and environment configurations from the Delivery Graph.
- The generated pipeline is presented as editable YAML for review before activation.

## Why it matters
Pipeline authoring is a common bottleneck. New services wait days for a platform engineer to write a deployment config. Natural-language pipelines let any developer bootstrap a production-grade pipeline in minutes, while still producing standard, reviewable configuration.`,
    },
    {
      id: "rai-feat-predictive-failures",
      e: "🔮",
      c: WA,
      title: "Predictive Failure Analysis",
      short: "Identifies deployments likely to cause incidents before they happen, using code patterns, test signals, and historical failure data.",
      d: `## Predictive Failure Analysis

Rather than waiting for a canary to detect problems in production, predictive failure analysis flags risky changes before they deploy.

## Signals analysed
- **Code complexity delta** — large increases in cyclomatic complexity or coupling correlate with higher failure rates.
- **Test gap detection** — changes to critical paths without corresponding test updates carry elevated risk.
- **Historical patterns** — services, file paths, or authors with higher past change-failure rates receive additional scrutiny.
- **Dependency risk** — upgrading a dependency with known breaking changes or recent CVEs triggers warnings.

## Output
A risk score and narrative explanation attached to each pipeline run. High-risk runs can automatically trigger additional approval gates, expanded test suites, or more conservative rollout strategies.`,
    },
    {
      id: "rai-feat-cost-anomaly",
      e: "💰",
      c: TL,
      title: "AI Cost Anomaly Detection",
      short: "Learns normal spending patterns per service and alerts on unexpected spikes — with root-cause attribution to specific deployments or config changes.",
      d: `## AI Cost Anomaly Detection

Cloud costs can spike silently — a misconfigured autoscaler, an unintended resource class upgrade, or a traffic-routing mistake. AI cost anomaly detection catches these before the monthly bill arrives.

## How it works
1. **Baseline learning** — builds a per-service cost model using historical spend, deployment events, and seasonal patterns.
2. **Anomaly detection** — flags deviations that exceed statistical thresholds, adjusted for known events (planned load tests, marketing launches).
3. **Root-cause attribution** — traces the anomaly back through the Delivery Graph to the likely cause: a specific deployment, a config change, or an infrastructure scaling event.
4. **Automated response** — optionally triggers alerts, opens tickets, or applies cost-limit policies to contain the impact.

## Integration with FinOps workflows
Anomalies are surfaced in the Relay Cost dashboard alongside recommendations (right-size, switch to spot, delete idle resources) so teams can act immediately.`,
    },
  ],
};
