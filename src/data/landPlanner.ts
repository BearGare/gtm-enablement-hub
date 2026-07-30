import type { LandProofTemplate, LandToolchainCategory } from "../types";

/** Toolchain categories for Land Planner — stack types, not named customers. */
export const LAND_TOOLCHAIN: LandToolchainCategory[] = [
  {
    id: "scm",
    label: "Source control (SCM)",
    stance: "coexist",
    modules: ["Relay Portal", "Relay Code"],
    note: "Relay is not an SCM. Integrate with GitHub/GitLab/etc.; Portal/Code sit on top of the repo of record.",
  },
  {
    id: "ci",
    label: "CI / build pipelines",
    stance: "integrate",
    modules: ["Relay CI", "Relay Insights"],
    note: "Often coexist then consolidate. Land Relay CI where wait/flakes hurt; do not claim overnight rip-and-replace of every workflow.",
  },
  {
    id: "cd",
    label: "CD / progressive delivery",
    stance: "integrate",
    modules: ["Relay CD", "Relay Flags"],
    note: "Argo/Spinnaker-class tools may coexist during land. Honesty: replace coordination toil first, not every Helm chart on day one.",
  },
  {
    id: "idp",
    label: "Internal developer portal",
    stance: "integrate",
    modules: ["Relay Portal"],
    note: "Backstage-class portals often coexist. Relay Portal lands where golden-path + delivery actions beat a static catalog.",
  },
  {
    id: "sec_scan",
    label: "Security scanning (SAST/SCA/secrets)",
    stance: "coexist",
    modules: ["Relay Secure", "Relay Supply"],
    note: "Scanners usually stay. Relay Secure orchestrates, prioritises, and gates — not 'rip out Scanner X' as the opener.",
  },
  {
    id: "observability",
    label: "Observability / APM",
    stance: "coexist",
    modules: ["Relay SRE", "Relay CD"],
    note: "Datadog/etc. remain the signal source. Relay adds change intelligence and delivery-aware response — complementary, not a monitoring rip.",
  },
  {
    id: "cost",
    label: "Cloud cost / FinOps",
    stance: "integrate",
    modules: ["Relay Cost"],
    note: "Billing tools coexist. Relay Cost ties spend to services, envs, and delivery behaviour.",
  },
  {
    id: "ai_coding",
    label: "AI coding assistants",
    stance: "coexist",
    modules: ["Relay Code", "Relay Insights", "Relay Secure"],
    note: "Copilot/Cursor-class tools coexist. Relay measures outcomes and wraps standards — do not pitch Relay as 'their coding AI killer'.",
  },
  {
    id: "iac",
    label: "Infrastructure as code",
    stance: "integrate",
    modules: ["Relay Infra", "Relay CD"],
    note: "Terraform/Pulumi stay as languages of record. Relay Infra/CD govern and deliver changes safely.",
  },
  {
    id: "flags",
    label: "Feature flags / experimentation",
    stance: "integrate",
    modules: ["Relay Flags", "Relay CD"],
    note: "May coexist with LaunchDarkly-class tools. Land Flags when release risk and progressive delivery are the wedge.",
  },
  {
    id: "supply",
    label: "Supply chain / artifact security",
    stance: "integrate",
    modules: ["Relay Supply", "Relay Secure"],
    note: "SBOM/provenance gaps are a Relay Supply story; coexist with existing registries.",
  },
];

export const LAND_PROOF_TEMPLATES: LandProofTemplate[] = [
  {
    risk: "security",
    label: "Security / trust boundary",
    whatToShow: "Architecture walk: outbound-only edge agent, secrets stay in their vault, policy evaluation points on one land module pipeline — not a full platform tour.",
    metric: "Time to enforce one mandatory policy gate on a non-prod pipeline; clear remediation path when blocked.",
    whoAttends: "Security Eng lead + Platform champion; optional AppSec. Keep economic buyer as readout, not the deep-dive.",
    exitCriteria: "Sec agrees the trust model is acceptable for a scoped pilot; one policy pack applied without break-glass chaos.",
    nonGoals: "No multi-cloud migration, no rip of existing scanners, no production cutover in the pilot window.",
  },
  {
    risk: "switching_cost",
    label: "Switching cost / migration fear",
    whatToShow: "Side-by-side: current pain path vs golden-path template for one service — coexist with existing CI/CD for everything else.",
    metric: "Time-to-first successful deploy of one service on the paved path; engineer NPS or qualitative 'easier than DIY'.",
    whoAttends: "Platform + one app-team champion who feels the toil.",
    exitCriteria: "One service on the path with documented coexist boundaries; written list of what is NOT moving in phase 1.",
    nonGoals: "No org-wide pipeline rewrite; no 'replace GitLab/GitHub' narrative.",
  },
  {
    risk: "already_have_x",
    label: "Already have X (category reframe)",
    whatToShow: "Constraint demo only: the wait state they named (flake queue, manual rollback, scanner noise) — mapped to one Relay module, with explicit coexist vs replace.",
    metric: "Agreed before/after on that single wait metric (e.g. rollback time, % findings remediated, deploy frequency for one team).",
    whoAttends: "Persona who owns that metric + technical champion.",
    exitCriteria: "Buyer restates Relay as value-stream/control-plane for the constraint — not 'another CI' — in their own words.",
    nonGoals: "No bake-off across all 14 modules; no competitor bash session.",
  },
  {
    risk: "ai_skepticism",
    label: "AI washing / outcome skepticism",
    whatToShow: "Delivery outcome view: AI-assisted vs human change-fail or rework for one team — or honest gap if they cannot measure yet — plus how Relay Insights/Code/Secure close it.",
    metric: "Ability to report one AI-related delivery outcome (not seat count) within the pilot; or a dated plan to instrument it.",
    whoAttends: "VP Eng or CTO staffer who asked for AI ROI + Platform/DevEx.",
    exitCriteria: "Exec accepts that coding AI ≠ delivery outcomes; agrees a measurement + one delivery-path improvement is the pilot.",
    nonGoals: "No claim that Relay replaces their coding assistant; no board-level ROI fantasy without data.",
  },
];

export const LAND_RISK_LABELS: Record<string, string> = Object.fromEntries(
  LAND_PROOF_TEMPLATES.map(t => [t.risk, t.label])
);
