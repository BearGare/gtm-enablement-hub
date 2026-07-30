export type ItemSection = {
  title: string;
  content: string;
  open?: boolean;
};

export type Item = {
  id: string;
  title?: string;
  n?: string | number;
  co?: string;
  e?: string;
  c?: string;
  b?: string;
  role?: string;
  tag?: string;
  short?: string;
  sum?: string;
  str?: string;
  adv?: string;
  wo?: string;
  sa?: string;
  buyer?: string;
  scenario?: string;
  cats?: string[];
  featured?: boolean;
  hl?: string;
  d?: string;
  url?: string;
  fw?: true;
  sections?: ItemSection[];
  pillar?: string;
  subModules?: Item[];
  st?: string;
  mods?: string[];
  /** Guiding question for SDLC stages (value-stream framing). */
  question?: string;
  /** Wait states / rework / handoffs reps listen for. */
  friction?: string[];
  /** Flow metrics associated with this stage. */
  metrics?: string[];
};

export type Message = { role: "user" | "assistant"; content: string };

export type ProgMap = Record<string, {
  visited?: boolean;
  chatHistory?: Message[];
  msgCount?: number;
  lastVisit?: number;
  reflection?: string;
  masteryReady?: boolean;
}>;

export type GlossaryTerm = { term: string; def: string; seeAlso?: string };
export type GlossaryCategory = { id: string; title: string; emoji: string; terms: GlossaryTerm[] };

/** Constraint-first discovery path (one per SDLC stage). */
export type DiscoveryPathStep = {
  prompt: string;
  why: string;
  hintNext: string;
  moduleHints?: string[];
};

export type DiscoveryPath = {
  stageId: string;
  title: string;
  e: string;
  steps: DiscoveryPathStep[];
};

export type ObjectionTheme =
  | "category_reframe"
  | "security_trust"
  | "consolidation"
  | "ai_washing"
  | "budget_owner";

export type ObjectionCard = {
  id: string;
  e: string;
  title: string;
  theme: ObjectionTheme;
  personaIds: string[];
  moduleIds: string[];
  trap: string;
  strongAnswer: string;
  coachTips: string;
};

export type LandStance = "replace" | "coexist" | "integrate";

export type LandToolchainCategory = {
  id: string;
  label: string;
  /** Default honesty stance vs Relay for this category of tooling. */
  stance: LandStance;
  /** Relay modules most relevant when this category is present. */
  modules: string[];
  note: string;
};

export type LandRiskTheme = "security" | "switching_cost" | "already_have_x" | "ai_skepticism";

export type LandProofTemplate = {
  risk: LandRiskTheme;
  label: string;
  whatToShow: string;
  metric: string;
  whoAttends: string;
  exitCriteria: string;
  nonGoals: string;
};
