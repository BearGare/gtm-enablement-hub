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

/** Public observation vs GTM hypothesis — used on account briefs. */
export type SignalKind = "public" | "hypothesis";

export type AccountSignal = {
  kind: SignalKind;
  text: string;
  source?: string;
};

export type Account = Item & {
  id: string;
  title: string;
  industry: string;
  publicSnapshot: string;
  publicSignals: AccountSignal[];
  hypotheses: AccountSignal[];
  personas: string[];
  pains: string[];
  moduleFit: string[];
  outboundAngles: string[];
  qualQuestions: string[];
  risks: string[];
  nextAction: string;
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

export type OutboundTone = "curious" | "direct" | "peer";
export type OutboundChannel = "email" | "linkedin" | "call";
