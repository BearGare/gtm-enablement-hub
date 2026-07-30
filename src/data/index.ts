export { PILLARS, MODS } from "./modules";
export { ARCH } from "./arch";
export { PERSONAS } from "./personas";
export { COMPS } from "./comps";
export { DISC } from "./discovery";
export { RELAY_AI } from "./relayAi";
export { SDLC_STAGES, SDLC_INTRO } from "./sdlc";
export { GLOSSARY, GLOSSARY_LOOKUP } from "./glossary";

/** Synthetic discovery call for one-click Call Analysis demos (no real customer data). */
export const SAMPLE_CALL_TRANSCRIPT = `SDR: Thanks for taking the time — I'd love to understand how your teams ship to production today.
VP Eng: Sure. We have about 400 engineers. Most services are on Kubernetes. CI is GitHub Actions; deploys are a mix of ArgoCD and a few homegrown scripts.
SDR: How often do you deploy?
VP Eng: The platform team wants daily. In practice a lot of teams are still weekly because rollbacks are scary and on-call doesn't trust the signals.
SDR: What happens when a bad deploy lands?
VP Eng: Someone notices in Datadog, we scramble in Slack, and rollback is manual. We've had a couple of incidents this quarter where AI-generated code looked fine in review and still broke a checkout path.
SDR: Are you measuring that volume of AI-assisted code?
VP Eng: Not really. Devs love Cursor. Leadership is asking what changed in lead time and change-fail rate, and we don't have a clean answer.
SDR: Who else feels that pain?
VP Eng: Our Head of Platform owns the golden paths. Security wants policy gates earlier. FinOps keeps pinging us about idle clusters after big launches.
SDR: If you could fix one thing in the next two quarters?
VP Eng: Safer progressive delivery with automatic verification — and a honest picture of where time actually goes between merge and production.`;
