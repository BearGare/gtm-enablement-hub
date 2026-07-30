import { A, TL, WA, ER } from "../colors";
import type { Item } from "../types";

export const ARCH: Item[] = [
  {
    id: "arch-control-plane",
    e: "🧠",
    c: A,
    title: "Control Plane",
    short: "The centralised brain that stores configuration, orchestrates pipelines, evaluates policies, and serves the UI and API layer.",
    d: `## Control Plane

The control plane is the hosted management tier of the Relay platform. It owns the source of truth for pipeline definitions, policy rules, secrets references, and audit logs.

## Responsibilities
- **API gateway & UI** — serves the web console and exposes a versioned REST + GraphQL API for programmatic access.
- **Pipeline orchestrator** — resolves DAG dependencies, schedules stages, and routes execution to edge runners.
- **Policy evaluation** — runs OPA-based governance checks (approval gates, environment restrictions, cost guardrails) before any deployment proceeds.
- **Tenant isolation** — each organisation's data is logically separated with row-level access control and encrypted at rest.

## Design principles
Stateless compute nodes behind a load balancer; all durable state lives in a managed data tier (PostgreSQL + object storage). Horizontal scaling is automatic based on pipeline queue depth.`,
    sections: [
      { title: "⚙️ Key services", content: "API server, pipeline scheduler, policy engine, event bus, auth/RBAC service." },
      { title: "🔒 Security posture", content: "mTLS between internal services, OIDC federation for SSO, secrets never stored in plaintext — always referenced from an external vault." },
    ],
  },
  {
    id: "arch-edge-agent",
    e: "🤖",
    c: WA,
    title: "Edge Agent / Runner",
    short: "A lightweight agent deployed inside your infrastructure that executes pipeline steps, applies changes, and streams logs back to the control plane.",
    d: `## Edge Agent / Runner

The edge agent bridges the control plane with your actual infrastructure — cloud accounts, Kubernetes clusters, on-prem data centres, or developer laptops.

## How it works
1. The agent opens an outbound gRPC stream to the control plane (no inbound firewall rules needed).
2. When a pipeline stage targets the agent's scope, the control plane pushes the task definition.
3. The agent pulls required artefacts, executes the step in a sandboxed container, and streams stdout/stderr back in real time.
4. On completion it reports status, artefact hashes, and resource metrics.

## Deployment models
- **Kubernetes:** Helm chart installs as a Deployment with a ServiceAccount scoped to the namespaces it manages.
- **VM / bare-metal:** Single static binary, configured via environment variables or a YAML file.
- **Ephemeral:** Spun up as a short-lived container for a single pipeline run, then destroyed.

## Why an agent model?
Keeps credentials and workloads inside the customer's trust boundary. The control plane never needs direct network access to production infrastructure.`,
    sections: [
      { title: "📡 Communication", content: "Outbound-only gRPC/TLS stream. Heartbeat every 30 s. Auto-reconnect with exponential backoff." },
      { title: "🔐 Least privilege", content: "Each agent is scoped to specific environments and resource types. Credential injection happens at execution time from the customer's own vault." },
    ],
  },
  {
    id: "arch-knowledge-graph",
    e: "🕸️",
    c: TL,
    title: "Delivery Graph",
    short: "A live map connecting services, repositories, pipelines, environments, owners, incidents, and cost — powering impact analysis and intelligent routing.",
    d: `## Delivery Graph

The Delivery Graph is a continuously updated model of how software assets relate to each other across the organisation.

## What it maps
- **Code → Build → Deploy → Runtime:** traces every service from its Git repo through CI pipelines to the clusters and cloud accounts where it runs.
- **Ownership:** links services to teams and on-call rosters so any alert or policy violation can be routed instantly.
- **Dependencies:** maps inter-service calls, shared libraries, database schemas, and API contracts.

## How it stays current
Ingests events from Git webhooks, CI/CD pipeline telemetry, Kubernetes watchers, cloud resource APIs, and service-mesh sidecars. Changes propagate within seconds, not hours.

## Use cases
- **Impact analysis:** "Which teams are affected if we deprecate this shared library?"
- **Change risk scoring:** A pipeline deploying a service with many dependents gets a higher risk score and may trigger additional approval gates.
- **Cost attribution:** Links runtime cloud spend back through the Delivery Graph to the owning team and the originating repository.`,
    sections: [
      { title: "🗄️ Storage", content: "Property graph database optimised for traversal queries. Queryable via the Relay API and the console's visual explorer." },
      { title: "🔄 Freshness", content: "Event-driven ingestion with sub-minute latency. Full reconciliation sweep runs hourly to catch any missed events." },
    ],
  },
  {
    id: "arch-policy-engine",
    e: "📜",
    c: ER,
    title: "Policy Engine",
    short: "A centralised governance layer that evaluates every pipeline action against organisation-defined rules before it can proceed.",
    d: `## Policy Engine

The policy engine enforces organisational guardrails — security standards, compliance requirements, cost limits, and operational best practices — as automated, version-controlled rules.

## How policies are authored
Policies are written in Rego (OPA's policy language) or a simplified YAML DSL for common patterns. They live in a Git repository and go through the same code-review workflow as application code.

## Evaluation points
- **Pre-deployment:** block a release if the container image has critical CVEs, the target environment is frozen, or the change exceeds a cost threshold.
- **Pre-merge:** require specific approvers based on the files changed or the blast radius calculated by the Delivery Graph.
- **Runtime:** continuously evaluate running workloads against drift policies and flag violations.

## Governance without bottlenecks
Policies are evaluated in milliseconds. When a rule blocks a deployment, the engineer sees a clear explanation and a suggested remediation — not just a red light. Override workflows exist for break-glass scenarios, with full audit trails.`,
    sections: [
      { title: "📝 Policy library", content: "Ships with curated policy packs for SOC 2, ISO 27001, CIS benchmarks, and FinOps guardrails. Teams extend or override as needed." },
      { title: "🧪 Testing policies", content: "Policies can be unit-tested with fixture data before deployment, preventing accidental lockouts from overly broad rules." },
    ],
  },
];
