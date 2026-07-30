import type { GlossaryCategory } from "../types";

export const GLOSSARY: GlossaryCategory[] = [
  {
    id: "foundations",
    title: "Foundations",
    emoji: "🏗️",
    terms: [
      { term: "SDLC", def: "Software Development Life Cycle — the structured process of planning, creating, testing, deploying, and maintaining software. Common models include waterfall, agile, and DevOps.", seeAlso: "CI/CD, DevOps" },
      { term: "DevOps", def: "A culture and set of practices that unify software development (Dev) and IT operations (Ops) to shorten the development lifecycle while delivering features, fixes, and updates frequently and reliably." },
      { term: "Platform Engineering", def: "The discipline of designing and building internal developer platforms (IDPs) that provide self-service capabilities and reduce cognitive load for engineering teams.", seeAlso: "Internal Developer Platform, Developer Experience" },
      { term: "Internal Developer Platform", def: "A layer of tooling and abstractions built on top of infrastructure to let developers self-service environments, deployments, and observability without filing tickets.", seeAlso: "Platform Engineering" },
      { term: "Developer Experience", def: "The overall quality of a developer's interaction with tools, APIs, documentation, and workflows — often abbreviated DX. Good DX reduces friction and accelerates delivery.", seeAlso: "Platform Engineering" },
      { term: "GitOps", def: "An operational model where the desired state of infrastructure and applications is stored declaratively in Git. Changes are applied automatically when the repo is updated.", seeAlso: "Infrastructure as Code" },
      { term: "Shift Left", def: "Moving quality, security, and compliance checks earlier in the development lifecycle so issues are caught when they are cheaper and faster to fix.", seeAlso: "SAST, SCA" },
      { term: "Toil", def: "Repetitive, automatable work that scales linearly with service size and provides no lasting value. SRE teams measure and systematically reduce toil.", seeAlso: "SRE" },
      { term: "Golden Path", def: "An opinionated, well-supported route through an internal developer platform that makes the right thing the easy thing — covering repo setup, CI, deployment, and observability out of the box." },
      { term: "Service Catalog", def: "A registry of all services, libraries, and infrastructure components an organisation owns — with metadata like ownership, dependencies, SLOs, and runbooks." },
    ],
  },
  {
    id: "planning-coding",
    title: "Planning & Coding",
    emoji: "✏️",
    terms: [
      { term: "Pull Request", def: "A request to merge a branch of code changes into the main codebase. Pull requests enable code review, discussion, and automated checks before integration.", seeAlso: "Code Review, CI" },
      { term: "Code Review", def: "The systematic examination of source code by peers to catch defects, enforce conventions, and share knowledge before changes are merged.", seeAlso: "Pull Request" },
      { term: "Feature Flag", def: "A toggle that lets teams enable or disable functionality at runtime without deploying new code. Useful for progressive rollouts, A/B tests, and kill switches.", seeAlso: "Progressive Delivery" },
      { term: "Trunk-Based Development", def: "A branching model where developers merge small, frequent changes directly to the main branch (trunk), keeping it always releasable.", seeAlso: "CI" },
      { term: "Monorepo", def: "A single version-controlled repository that holds the code for many projects or services. Simplifies dependency management and atomic cross-project changes." },
      { term: "User Story", def: "A short, informal description of a feature written from a user's perspective — typically following the format 'As a [role], I want [capability] so that [benefit].'", seeAlso: "Sprint" },
      { term: "Sprint", def: "A fixed-length iteration (usually 1–4 weeks) in agile development during which a team commits to delivering a set of user stories or tasks.", seeAlso: "User Story" },
      { term: "Tech Debt", def: "The implied cost of rework caused by choosing a quick or easy solution now instead of a better approach that would take longer. Accumulated debt slows future development." },
      { term: "Pair Programming", def: "A practice where two developers work together at one workstation — one writes code (driver) while the other reviews each line in real time (navigator)." },
    ],
  },
  {
    id: "build-test",
    title: "Build & Test",
    emoji: "🔨",
    terms: [
      { term: "Continuous Integration", def: "The practice of automatically building and testing every code change as soon as it is pushed, giving developers rapid feedback on integration errors.", seeAlso: "Continuous Delivery, Pipeline" },
      { term: "Continuous Delivery", def: "An extension of CI where every change that passes automated tests is automatically prepared for release to production, though the final deployment may still require a manual approval.", seeAlso: "Continuous Integration, Continuous Deployment" },
      { term: "Continuous Deployment", def: "A fully automated release process where every change that passes all pipeline stages is deployed to production without human intervention.", seeAlso: "Continuous Delivery" },
      { term: "Pipeline", def: "An automated sequence of stages — build, test, scan, deploy — that code changes pass through on their way to production.", seeAlso: "CI, CD" },
      { term: "Build Cache", def: "A mechanism that stores previously compiled artefacts or intermediate outputs so subsequent builds can skip unchanged work and finish faster." },
      { term: "Test Pyramid", def: "A testing strategy that prescribes many fast unit tests, fewer integration tests, and even fewer end-to-end tests — balancing speed with confidence." },
      { term: "Flaky Test", def: "A test that produces inconsistent pass/fail results without any code change. Flaky tests erode trust in CI and slow down merge queues." },
      { term: "Artifact Repository", def: "A centralised store (e.g. container registry, package registry) for versioned build outputs such as Docker images, JARs, npm packages, or Helm charts." },
      { term: "Merge Queue", def: "An automated system that serialises and tests pull requests before merging them to main, preventing broken builds caused by incompatible concurrent changes." },
    ],
  },
  {
    id: "security",
    title: "Security & Compliance",
    emoji: "🛡️",
    terms: [
      { term: "SAST", def: "Static Application Security Testing — analyses source code, bytecode, or binaries for security vulnerabilities without executing the application.", seeAlso: "DAST, SCA, Shift Left" },
      { term: "DAST", def: "Dynamic Application Security Testing — probes a running application for vulnerabilities by simulating attacks against its exposed interfaces.", seeAlso: "SAST" },
      { term: "SCA", def: "Software Composition Analysis — identifies open-source libraries in a codebase and checks them against known vulnerability databases (CVEs).", seeAlso: "SBOM" },
      { term: "SBOM", def: "Software Bill of Materials — a machine-readable inventory of all components, libraries, and dependencies in a software artefact, used for vulnerability tracking and licence compliance.", seeAlso: "SCA" },
      { term: "Supply Chain Security", def: "Practices that verify the integrity and provenance of every component — code, dependencies, build tools, and container images — from source to production.", seeAlso: "SBOM, SCA" },
      { term: "Secrets Management", def: "The secure storage, rotation, and access control of sensitive credentials such as API keys, tokens, certificates, and database passwords.", seeAlso: "Zero Trust" },
      { term: "Zero Trust", def: "A security model that assumes no implicit trust for any user, device, or network segment. Every request must be authenticated and authorised regardless of origin." },
      { term: "Policy as Code", def: "Defining security, compliance, and governance rules in version-controlled code so they can be tested, reviewed, and enforced automatically in CI/CD pipelines.", seeAlso: "OPA" },
      { term: "OPA", def: "Open Policy Agent — a general-purpose policy engine that evaluates structured data against Rego policies. Widely used for Kubernetes admission control, API authorisation, and infrastructure governance.", seeAlso: "Policy as Code" },
      { term: "CVE", def: "Common Vulnerabilities and Exposures — a standardised identifier for publicly known security flaws, maintained by MITRE and used across scanning tools." },
      { term: "MTTR (Security)", def: "Mean Time to Remediate — the average time from discovering a vulnerability to deploying a verified fix. A key metric for security posture." },
    ],
  },
  {
    id: "deployment",
    title: "Deployment & Delivery",
    emoji: "🚀",
    terms: [
      { term: "Blue-Green Deployment", def: "A release strategy that maintains two identical production environments (blue and green). Traffic is switched from the current version to the new one in a single cut-over, enabling instant rollback.", seeAlso: "Canary Deployment" },
      { term: "Canary Deployment", def: "A progressive delivery strategy that routes a small percentage of production traffic to a new release, monitors for regressions, and gradually increases the percentage if metrics stay healthy.", seeAlso: "Blue-Green Deployment, Progressive Delivery" },
      { term: "Progressive Delivery", def: "An umbrella term for deployment strategies — canary, feature flags, traffic splitting — that expose changes to users incrementally and verify health at each step.", seeAlso: "Feature Flag, Canary Deployment" },
      { term: "Rollback", def: "Reverting a production deployment to a previous known-good version, typically triggered automatically when health checks or error budgets are breached." },
      { term: "Infrastructure as Code", def: "Managing servers, networks, and cloud resources through declarative configuration files (e.g. Terraform, Pulumi) stored in version control rather than manual console clicks.", seeAlso: "GitOps" },
      { term: "Immutable Infrastructure", def: "A pattern where servers or containers are never modified after deployment. Updates are shipped by replacing the entire unit with a new image built from code." },
      { term: "Helm Chart", def: "A package format for Kubernetes that bundles YAML templates, default values, and metadata so complex applications can be installed, upgraded, and rolled back as a single unit." },
      { term: "Service Mesh", def: "A dedicated infrastructure layer (e.g. Istio, Linkerd) that handles service-to-service communication, providing observability, traffic management, and mutual TLS without application code changes." },
    ],
  },
  {
    id: "ops-reliability",
    title: "Operations & Reliability",
    emoji: "📡",
    terms: [
      { term: "SRE", def: "Site Reliability Engineering — a discipline that applies software engineering principles to operations problems. SRE teams define SLOs, manage error budgets, and automate toil.", seeAlso: "SLO, Error Budget, Toil" },
      { term: "SLO", def: "Service Level Objective — a target reliability metric (e.g. 99.9 % availability or p99 latency < 200 ms) that a team commits to. SLOs balance reliability investment against feature velocity.", seeAlso: "SLI, Error Budget" },
      { term: "SLI", def: "Service Level Indicator — a quantitative measure of a service's behaviour (request latency, error rate, throughput) used to evaluate whether SLOs are being met.", seeAlso: "SLO" },
      { term: "Error Budget", def: "The allowed margin of unreliability derived from an SLO. When the budget is exhausted, teams prioritise reliability work over new features.", seeAlso: "SLO, SRE" },
      { term: "Incident Management", def: "The process of detecting, triaging, mitigating, and resolving production incidents — plus conducting blameless post-mortems to prevent recurrence." },
      { term: "Chaos Engineering", def: "The practice of intentionally injecting failures into a system to uncover weaknesses before they cause real outages. Popularised by Netflix's Chaos Monkey." },
      { term: "Runbook", def: "A documented set of step-by-step procedures for responding to specific alerts or incidents. Modern runbooks are increasingly automated." },
      { term: "On-Call", def: "A rotation where engineers carry a pager and are responsible for responding to production alerts outside of business hours. Good on-call requires clear escalation paths and runbooks." },
      { term: "Mean Time to Recovery", def: "MTTR — the average duration from the start of a production incident to full service restoration. A primary indicator of operational resilience." },
    ],
  },
  {
    id: "observability",
    title: "Observability & Metrics",
    emoji: "📊",
    terms: [
      { term: "Observability", def: "The ability to understand a system's internal state from its external outputs — logs, metrics, and traces. Goes beyond monitoring by enabling ad-hoc investigation of novel failures.", seeAlso: "Three Pillars" },
      { term: "Three Pillars", def: "The foundational observability signals: logs (discrete events), metrics (numeric time series), and traces (request-scoped journeys across services).", seeAlso: "Observability" },
      { term: "Distributed Tracing", def: "Capturing the end-to-end path of a request as it traverses multiple services, showing latency contributions, errors, and dependencies at each hop.", seeAlso: "OpenTelemetry" },
      { term: "OpenTelemetry", def: "A vendor-neutral open-source framework for generating, collecting, and exporting telemetry data (traces, metrics, logs). The emerging standard for instrumentation.", seeAlso: "Distributed Tracing" },
      { term: "DORA Metrics", def: "Four key metrics from the DevOps Research and Assessment programme: deployment frequency, lead time for changes, change failure rate, and mean time to recovery. Used to benchmark software delivery performance." },
      { term: "Lead Time for Changes", def: "The elapsed time from code commit to that code running successfully in production — one of the four DORA metrics.", seeAlso: "DORA Metrics" },
      { term: "Change Failure Rate", def: "The percentage of deployments that cause a failure in production requiring a hotfix, rollback, or patch — one of the four DORA metrics.", seeAlso: "DORA Metrics" },
      { term: "Deployment Frequency", def: "How often an organisation successfully releases to production — one of the four DORA metrics. Elite performers deploy on-demand, multiple times per day.", seeAlso: "DORA Metrics" },
      { term: "Alert Fatigue", def: "The desensitisation that occurs when teams receive too many low-signal alerts, causing real incidents to be missed or response times to increase." },
    ],
  },
  {
    id: "finops",
    title: "Cloud Cost & FinOps",
    emoji: "💰",
    terms: [
      { term: "FinOps", def: "A cross-functional practice that brings financial accountability to cloud spending by combining engineering, finance, and business teams to optimise cost, speed, and quality trade-offs." },
      { term: "Idle Resource Detection", def: "Automatically identifying cloud resources (VMs, clusters, storage volumes) that are provisioned but not actively used — a primary source of cloud waste." },
      { term: "Right-Sizing", def: "Matching cloud instance types and sizes to actual workload requirements by analysing CPU, memory, and network utilisation over time.", seeAlso: "FinOps" },
      { term: "Spot Instances", def: "Deeply discounted cloud compute capacity that can be reclaimed by the provider with short notice. Suitable for fault-tolerant, stateless, or batch workloads." },
      { term: "Reserved Instances", def: "A pricing model where committing to a cloud resource for 1–3 years yields significant discounts compared to on-demand pricing. Requires capacity planning.", seeAlso: "Savings Plans" },
      { term: "Savings Plans", def: "Flexible commitment-based pricing (e.g. AWS Savings Plans) that provides discounts in exchange for a consistent amount of usage (measured in $/hr) over a term.", seeAlso: "Reserved Instances" },
      { term: "Showback / Chargeback", def: "Showback reports cloud costs per team or project for visibility; chargeback actually bills those costs to each team's budget — both incentivise cost-conscious architecture." },
      { term: "Unit Economics", def: "Measuring cloud cost relative to a business metric (cost per transaction, per user, per API call) rather than raw spend — reveals whether scale is improving or hurting margins.", seeAlso: "FinOps" },
    ],
  },
  {
    id: "ai-coding",
    title: "AI-Assisted Development",
    emoji: "🤖",
    terms: [
      { term: "AI Code Completion", def: "An IDE feature powered by large language models that predicts and suggests the next lines of code in real time as a developer types, reducing boilerplate and accelerating development." },
      { term: "AI Code Review", def: "Using language models to automatically review pull requests for bugs, style violations, security issues, and improvement suggestions before human reviewers look at the code." },
      { term: "Retrieval-Augmented Generation", def: "RAG — a pattern that retrieves relevant documents from a knowledge base and injects them into a language model's prompt so responses are grounded in factual, up-to-date context.", seeAlso: "Embedding" },
      { term: "Embedding", def: "A dense vector representation of text (or code) in high-dimensional space. Similar items cluster together, enabling semantic search, classification, and retrieval.", seeAlso: "Retrieval-Augmented Generation" },
      { term: "Prompt Engineering", def: "The craft of designing input text (prompts) that guide a language model toward accurate, useful, and safe outputs — including techniques like chain-of-thought and few-shot examples." },
      { term: "AI Agent", def: "An autonomous system that uses a language model to plan and execute multi-step tasks — reading code, running tests, making edits — with tool-use capabilities beyond simple text generation." },
      { term: "Hallucination", def: "When a language model generates plausible-sounding but factually incorrect or fabricated information. Mitigated by RAG, grounding, and verification steps." },
      { term: "Context Window", def: "The maximum number of tokens a language model can process in a single request. Larger windows allow more code or documentation to inform responses." },
    ],
  },
  {
    id: "relay",
    title: "Relay Platform",
    emoji: "⚡",
    terms: [
      { term: "Relay Plans", def: "Relay's planning module — roadmap-to-delivery visibility with work items linked to services, owners, and cycle time.", seeAlso: "SDLC" },
      { term: "Relay Code", def: "Relay's coding module — AI-assisted coding with codebase understanding, PR quality gates, and review acceleration.", seeAlso: "Pull Request, Code Review" },
      { term: "Relay Portal", def: "Relay's developer portal — service catalog, scorecards, and self-service golden paths so teams can provision and deploy without filing tickets.", seeAlso: "Service Catalog, Golden Path" },
      { term: "Relay CI", def: "Relay's continuous integration module — selective tests, caching, and runners that absorb AI-era merge volume without degrading feedback speed.", seeAlso: "Continuous Integration, Merge Queue" },
      { term: "Relay Test", def: "Relay's testing module — test generation, impact-based selection, flake quarantine, and self-healing end-to-end tests.", seeAlso: "Flaky Test, Test Pyramid" },
      { term: "Relay CD", def: "Relay's continuous delivery module — progressive delivery and GitOps with canary, blue/green, release verification, and automatic rollback.", seeAlso: "Canary Deployment, Blue-Green Deployment, Progressive Delivery" },
      { term: "Relay Flags", def: "Relay's feature-flag and experimentation module — decouples deploy from release so changes are exposed incrementally and measured.", seeAlso: "Feature Flag, Progressive Delivery" },
      { term: "Relay Infra", def: "Relay's infrastructure module — IaC governance for Terraform/OpenTofu pipelines, approvals, cost-before-apply, and drift detection.", seeAlso: "Infrastructure as Code, GitOps" },
      { term: "Relay Data", def: "Relay's database change delivery module — migrations in the pipeline with rollback-safe schema changes and drift detection." },
      { term: "Relay Secure", def: "Relay's DevSecOps module — SAST, SCA, container scanning, secrets detection, and policy-as-code with noise reduction so findings developers will act on.", seeAlso: "SAST, SCA, SBOM, Policy as Code" },
      { term: "Relay Supply", def: "Relay's artifact registry and supply-chain provenance module — SBOMs, attestations, and promotion policies for secure software delivery.", seeAlso: "SBOM, Supply Chain Security" },
      { term: "Relay SRE", def: "Relay's site reliability module — incident response, change correlation, runbooks, post-incident writeups, and reliability experiments.", seeAlso: "SRE, SLO, Incident Management, Chaos Engineering" },
      { term: "Relay Cost", def: "Relay's cloud FinOps module — spend visibility, idle shutdown schedules, rightsizing recommendations, and AI/token cost attribution.", seeAlso: "FinOps, Right-Sizing, Idle Resource Detection" },
      { term: "Relay Insights", def: "Relay's engineering insights module — DORA metrics, delivery bottlenecks, AI adoption signals, and delivery efficiency analytics.", seeAlso: "DORA Metrics" },
    ],
  },
];

export const GLOSSARY_LOOKUP: Record<string, { label: string; def: string; seeAlso?: string; categoryId: string }> = (() => {
  const out: Record<string, { label: string; def: string; seeAlso?: string; categoryId: string }> = {};
  for (const cat of GLOSSARY) {
    for (const t of cat.terms) {
      out[t.term.toLowerCase()] = { label: t.term, def: t.def, seeAlso: t.seeAlso, categoryId: cat.id };
    }
  }

  const aliases: Record<string, string> = {
    pr: "Pull Request",
    ci: "Continuous Integration",
    cd: "Continuous Delivery",
    slo: "SLO",
    sli: "SLI",
    sre: "SRE",
    iac: "Infrastructure as Code",
    sca: "SCA",
    sast: "SAST",
    dast: "DAST",
    sbom: "SBOM",
    opa: "OPA",
    mttr: "Mean Time to Recovery",
    rag: "Retrieval-Augmented Generation",
    dx: "Developer Experience",
    idp: "Internal Developer Platform",
    otel: "OpenTelemetry",
    "relay plans": "Relay Plans",
    "relay code": "Relay Code",
    "relay portal": "Relay Portal",
    "relay ci": "Relay CI",
    "relay test": "Relay Test",
    "relay cd": "Relay CD",
    "relay flags": "Relay Flags",
    "relay infra": "Relay Infra",
    "relay data": "Relay Data",
    "relay secure": "Relay Secure",
    "relay supply": "Relay Supply",
    "relay sre": "Relay SRE",
    "relay cost": "Relay Cost",
    "relay insights": "Relay Insights",
  };

  for (const [alias, canonical] of Object.entries(aliases)) {
    const entry = out[canonical.toLowerCase()];
    if (entry && !out[alias]) {
      out[alias] = entry;
    }
  }

  // Plural aliases
  const plurals: Record<string, string> = {
    stories: "User Story",
    sprints: "Sprint",
    runbooks: "Runbook",
    pipelines: "Pipeline",
    rollbacks: "Rollback",
    embeddings: "Embedding",
  };

  for (const [plural, canonical] of Object.entries(plurals)) {
    const entry = out[canonical.toLowerCase()];
    if (entry && !out[plural]) {
      out[plural] = entry;
    }
  }

  return out;
})();
