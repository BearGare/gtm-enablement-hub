import { A, TL, WA, ER, MU } from "../colors";
import type { Account } from "../types";

/**
 * Public-company account briefs for Relay GTM Signal Hub.
 * Hypotheses are labelled as such — not facts. No customer claims.
 */
export const ACCOUNTS: Account[] = [

  {id:"stripe",title:"Stripe",e:"💳",c:A,industry:"Fintech / Payments infrastructure",
   short:"Global payments platform with a large engineering org, strong public developer brand, and continuous product surface expansion.",
   publicSnapshot:"Stripe publicly positions itself as developer-first payments infrastructure spanning APIs, billing, treasury-like products, and fraud tooling. Engineering culture is visible through careers postings (distributed systems, reliability, security) and a long-running engineering blog covering API design, infrastructure, and operational excellence.",
   publicSignals:[
     {kind:"public",text:"Careers pages consistently hire for infrastructure, reliability, security, and developer-platform style roles — signalling ongoing investment in internal platforms at scale.",source:"careers page"},
     {kind:"public",text:"Engineering blog posts discuss API evolution, reliability practices, and large-scale systems — useful for mirroring their language in outbound.",source:"engineering blog"},
     {kind:"public",text:"Public product docs emphasise versioned APIs, idempotency, and careful change management for merchant-facing interfaces.",source:"public product docs"},
     {kind:"public",text:"Security and compliance are prominent in public trust/compliance materials typical of a payments processor.",source:"public trust / compliance pages"},
   ],
   hypotheses:[
     {kind:"hypothesis",text:"Hypothesis: Platform and DevOps teams may feel pressure to keep change failure rate low while product teams ship rapidly across many services."},
     {kind:"hypothesis",text:"Hypothesis: Security Engineering may prioritise supply-chain and pipeline gates because merchant trust is existential."},
     {kind:"hypothesis",text:"Hypothesis: FinOps interest may rise with multi-region footprint and non-prod sprawl, even if unit economics are strong."},
     {kind:"hypothesis",text:"Hypothesis: AI coding assistants are likely in use among engineers; measurement of delivery impact may still be incomplete."},
   ],
   personas:["CTO","VP Engineering","Head of Platform","Security Engineering Lead","FinOps / Cloud Cost Owner"],
   pains:["High cost of regressions on payment-critical paths","Need for governed progressive delivery","Scanner noise vs developer trust","Attribution of cloud spend across many services"],
   moduleFit:["Relay Deploy","Relay Verify","Relay Secure","Relay Supply","Relay Insights","Relay Cost"],
   outboundAngles:[
     "Lead with change management for API-heavy estates: safer progressive delivery without slowing merchant-facing roadmaps.",
     "Ask how they separate 'shipped' from 'verified healthy' after deploys on critical services.",
     "Security angle: actionable pipeline findings and SBOM evidence for enterprise customer reviews — without claiming any relationship.",
   ],
   qualQuestions:[
     "How are production changes gated today for services on the critical payment path?",
     "What does rollback look like when canaries fail — automated or human-driven?",
     "How do AppSec findings enter the developer workflow (PR vs ticket vs ignored dashboard)?",
     "Who owns engineering productivity metrics for AI-assisted development?",
   ],
   risks:["Long evaluation cycles; high bar for vendors touching delivery","Strong internal platform — NIH risk","Security review will be thorough; architecture must be crisp"],
   nextAction:"Map 2–3 public engineering blog themes to a short discovery note; request intro to Head of Platform or DevOps via warm path; propose architecture + PoC criteria workshop (no product pitch deck).",
   sa:"Do not imply Stripe uses Relay. Mirror their public language: reliability, API change safety, developer experience.",
   d:`## Stripe — account brief (public sources only)
Use public materials only. All opportunity conclusions below are **hypotheses**.

## Why Relay might resonate (hypothesis)
Payments-grade change management + developer velocity is a classic tension. Relay's deploy/verify/secure spine is a plausible fit **if** discovery confirms pipeline fragmentation or verification gaps.

## Talk track caution
No logos-as-customers. No invented metrics. Cite only public source types.`,
   sections:[
     {title:"Public snapshot detail",open:true,content:`Stripe's public narrative centres on programmable finance APIs and rigorous engineering. Careers and blog content are the safest personalisation sources. Avoid inventing org charts or private tooling stacks.`},
     {title:"Hypothesis log",open:false,content:`Treat every module recommendation as contingent on discovery. Update hypotheses when calls contradict them — do not "force fit" Relay modules.`},
   ]},

  {id:"shopify",title:"Shopify",e:"🛍️",c:TL,industry:"E-commerce / SaaS platform",
   short:"Commerce platform with a large product-engineering footprint, shop-facing SLAs around peak events, and a visible investment in developer ecosystems.",
   publicSnapshot:"Shopify publicly markets a commerce platform for merchants plus extensibility for developers (APIs, apps). Public engineering content and careers emphasise scalable storefronts, data platforms, and mobile/web product engineering. Peak shopping events make reliability messaging culturally resonant.",
   publicSignals:[
     {kind:"public",text:"Careers listings span product engineering, infrastructure, security, and data — consistent with a multi-team platform company.",source:"careers page"},
     {kind:"public",text:"Engineering blog and public talks historically cover scaling, resiliency, and developer tooling themes.",source:"engineering blog"},
     {kind:"public",text:"Public product docs for APIs/apps highlight extension models and partner developer experience.",source:"public product docs"},
     {kind:"public",text:"Seasonal commerce peaks are part of public brand storytelling — downtime narratives are reputationally sensitive.",source:"public marketing / brand narratives"},
   ],
   hypotheses:[
     {kind:"hypothesis",text:"Hypothesis: Deploy freezes or heightened change control around peak events may create demand for safer progressive delivery year-round."},
     {kind:"hypothesis",text:"Hypothesis: Platform/DevEx may be standardising golden paths across many product teams."},
     {kind:"hypothesis",text:"Hypothesis: Cloud cost scrutiny follows large multi-tenant footprint and ephemeral environments for app development."},
     {kind:"hypothesis",text:"Hypothesis: Feature flagging and experimentation are likely mature — displacement is harder; coexistence messaging is safer."},
   ],
   personas:["VP Engineering","Head of Platform","Developer Experience Lead","Director of DevOps","FinOps / Cloud Cost Owner"],
   pains:["Peak-traffic change risk","Fragmented team pipelines","Onboarding time across many services","Non-prod environment sprawl"],
   moduleFit:["Relay Deploy","Relay Verify","Relay Portal","Relay Flags","Relay Cost","Relay Insights"],
   outboundAngles:[
     "Peak-readiness without permanent freeze culture — verification and progressive delivery as the wedge.",
     "DevEx: time-to-first-production-change for new merchants-facing squads.",
     "Cost: idle preview/non-prod environments tied to app and service lifecycles.",
   ],
   qualQuestions:[
     "How does change management differ in normal weeks vs peak commerce windows?",
     "What percentage of services share a golden path vs bespoke pipelines?",
     "How are preview environments created and torn down today?",
     "Which metrics define 'good developer experience' internally?",
   ],
   risks:["Possible strong in-house platform","Feature management incumbents","Seasonal attention cycles — time outreach carefully"],
   nextAction:"Draft a peak-readiness discovery outline; target DevEx or Platform; keep Flags positioning as integrate/coexist until discovery says otherwise.",
   sa:"Personalise with public scale/resilience language. Never claim Shopify is evaluating or using Relay.",
   d:`## Shopify — account brief (public sources only)
Commerce peak risk and developer extensibility are public themes. Convert to questions, not assertions about their stack.`,
   sections:[
     {title:"Personalisation cues",open:true,content:`Use public engineering writing on scale and reliability. Ask how those practices show up in *pipeline* automation — not only in runtime architecture.`},
   ]},

  // id namespaced vs competitor "datadog" so progress + seed PK do not collide
  {id:"acct-datadog",title:"Datadog",e:"🐶",c:WA,industry:"Observability / Cloud monitoring",
   short:"Observability vendor with sophisticated internal engineering; high bar for any tool that sits near their delivery or telemetry stack.",
   publicSnapshot:"Datadog publicly provides monitoring, logging, APM, security, and related cloud products. Their engineering brand emphasises high-scale ingestion, reliability, and developer productivity. Careers show deep infrastructure and security hiring.",
   publicSignals:[
     {kind:"public",text:"Public product docs describe broad telemetry and security product lines — they speak fluent observability language.",source:"public product docs"},
     {kind:"public",text:"Careers pages hire across backend, platform, security, and SRE-like functions.",source:"careers page"},
     {kind:"public",text:"Engineering blog content covers systems at scale, performance, and product engineering practices.",source:"engineering blog"},
   ],
   hypotheses:[
     {kind:"hypothesis",text:"Hypothesis: They may already have strong custom delivery tooling — Relay must earn a wedge (e.g., AI delivery measurement, cost, or secure gates) rather than 'we do observability'."},
     {kind:"hypothesis",text:"Hypothesis: Continuous verification that *consumes* their telemetry (rather than competing with it) is the only credible Deploy/Verify angle."},
     {kind:"hypothesis",text:"Hypothesis: Security and supply-chain gating could be interesting if AppSec wants more enforceable pipeline controls."},
     {kind:"hypothesis",text:"Hypothesis: FinOps may care about expensive CI/dev clusters and ephemeral environments."},
   ],
   personas:["Head of Platform","Director of DevOps","Security Engineering Lead","VP Engineering","FinOps / Cloud Cost Owner"],
   pains:["NIH / high bar for vendors","Need for CD verification that hooks existing metrics","Toolchain consolidation fatigue"],
   moduleFit:["Relay Deploy","Relay Verify","Relay Secure","Relay Cost","Relay Insights"],
   outboundAngles:[
     "Explicitly non-competitive with observability: Relay Verify uses their signals to automate deploy health decisions.",
     "Ask about AI coding impact on review and change failure — Insights wedge.",
     "Cost of build farms and non-prod as a neutral entry if delivery tooling is sacred.",
   ],
   qualQuestions:[
     "Which systems are sources of truth for 'deploy is healthy' today?",
     "How automated is rollback when SLOs burn after a release?",
     "Where do security gates live relative to deploy orchestration?",
     "What delivery metrics does leadership review weekly?",
   ],
   risks:["Build-vs-buy pride","Long security review","Easy to accidentally position against their products — fatal"],
   nextAction:"Prepare a one-page 'complementary to your telemetry' architecture sketch; seek Platform or SRE-adjacent influencer; avoid any monitoring displacement language.",
   sa:"Compliment their public engineering bar. Relay is delivery governance + verification, not an APM story.",
   d:`## Datadog — account brief (public sources only)
Highest risk of mis-positioning. Frame Relay as plan-to-prod control plane that *reads* observability signals.`,
   sections:[
     {title:"Positioning guardrail",open:true,content:`Never pitch Relay Observe as replacing their stack. If Observe is mentioned, it is change intelligence and delivery context — secondary to Deploy/Verify/Secure.`},
   ]},

  {id:"notion",title:"Notion",e:"📝",c:MU,industry:"Collaboration / Productivity SaaS",
   short:"Fast-growing workspace product company; public emphasis on product velocity, design quality, and platform expansion (APIs, AI features).",
   publicSnapshot:"Notion publicly offers an all-in-one workspace and has expanded into AI-assisted product experiences and APIs/connectors. Careers and blog materials emphasise product engineering, infrastructure, and security for a multi-tenant SaaS.",
   publicSignals:[
     {kind:"public",text:"Careers postings cover product engineering, infrastructure, security, and data roles typical of a scaled SaaS.",source:"careers page"},
     {kind:"public",text:"Public product docs cover APIs, integrations, and admin/security controls for customers.",source:"public product docs"},
     {kind:"public",text:"Product marketing publicly highlights AI capabilities — useful as a conversation opener on AI-assisted *development* inside their own eng org (hypothesis, not fact).",source:"public product marketing"},
   ],
   hypotheses:[
     {kind:"hypothesis",text:"Hypothesis: Small-to-mid platform team supporting many product squads — golden paths and Portal messaging may land."},
     {kind:"hypothesis",text:"Hypothesis: AI feature work increases release cadence pressure; verification automation becomes more valuable."},
     {kind:"hypothesis",text:"Hypothesis: Planning surface is culturally central; Relay Plan linkage to delivery may resonate if work tracking is fragmented across tools."},
     {kind:"hypothesis",text:"Hypothesis: Security wants stronger tenant-isolation confidence in delivery pipelines and secrets handling."},
   ],
   personas:["VP Engineering","Engineering Manager","Developer Experience Lead","Security Engineering Lead","Head of Platform"],
   pains:["Rapid product iteration vs regression risk","Onboarding across expanding codebase","AI-assisted PR volume","Need for cleaner audit trail of changes"],
   moduleFit:["Relay Portal","Relay CI","Relay Deploy","Relay Verify","Relay Secure","Relay Plan","Relay Insights"],
   outboundAngles:[
     "Inner-loop + outer-loop: AI coding volume without proportional release risk.",
     "DevEx: paved road from template to production for new services.",
     "Ask how AI product initiatives changed their release train discipline.",
   ],
   qualQuestions:[
     "How has release frequency changed as AI features expanded?",
     "What does a new service's first production deploy require today?",
     "Where do security reviews sit in the PR/deploy path?",
     "Which delivery metrics are visible to EMs weekly?",
   ],
   risks:["May be happy with current Actions-centric setup","Budget sensitivity vs enterprise platforms","Champion may be EM-level without budget"],
   nextAction:"Target DevEx or Platform with a golden-path PoC proposal; loop VP Eng early for economic cover.",
   sa:"Use their public AI-product momentum only as a *question* about internal eng AI usage — not an assertion.",
   d:`## Notion — account brief (public sources only)
Product-led velocity story. Keep hypotheses labelled; confirm toolchain before module mapping.`,
   sections:[
     {title:"Discovery focus",open:true,content:`Confirm CI/CD ownership, IDP maturity, and whether Insights (AI delivery measurement) is a door opener versus Deploy/Verify.`},
   ]},

  {id:"cloudflare",title:"Cloudflare",e:"☁️",c:A,industry:"Edge network / Security / Developer platform",
   short:"Edge and security platform company with a strong public developer platform (Workers, etc.) and high expectations for performance, safety, and global ops.",
   publicSnapshot:"Cloudflare publicly operates a global network and publishes extensively on security, reliability, and developer platform capabilities. Careers and engineering blogs are rich sources for tone: blunt, technical, systems-oriented.",
   publicSignals:[
     {kind:"public",text:"Engineering blog is a primary public source — deep posts on networking, security, and reliability incidents/learnings.",source:"engineering blog"},
     {kind:"public",text:"Careers pages show hiring across systems, security, SRE/platform, and product engineering.",source:"careers page"},
     {kind:"public",text:"Public developer docs for Workers and related products emphasise rapid deploy models at the edge.",source:"public product docs"},
   ],
   hypotheses:[
     {kind:"hypothesis",text:"Hypothesis: Internal delivery tooling may already be advanced; entry may be specialised (policy-as-code at org scale, cost, AI insights) rather than basic CI."},
     {kind:"hypothesis",text:"Hypothesis: Security Engineering influence is strong — architecture and data-path clarity required early."},
     {kind:"hypothesis",text:"Hypothesis: Edge deploy patterns differ from classic k8s CD; Relay messaging must respect multi-runtime targets."},
     {kind:"hypothesis",text:"Hypothesis: Developer platform teams may empathise with Portal/golden-path stories because they sell DX externally."},
   ],
   personas:["Head of Platform","Security Engineering Lead","VP Engineering","Director of DevOps","Developer Experience Lead"],
   pains:["Heterogeneous deploy targets","High security bar for toolchain","Need for policy consistency across many teams","Risk of vendor tools that do not fit edge workflows"],
   moduleFit:["Relay Deploy","Relay Secure","Relay Portal","Relay Insights","Relay Cost"],
   outboundAngles:[
     "Speak engineer-to-engineer; lead with architecture and failure modes, not slides.",
     "Ask how policy and review apply across edge vs core services.",
     "DX mirror: they know paved roads — ask where internal paved roads still break.",
   ],
   qualQuestions:[
     "Which deploy targets are standardised vs still snowflake?",
     "How are emergency edge changes handled vs normal releases?",
     "What evidence do you collect for secure software supply chain asks?",
     "Where does platform capacity go: product DX vs maintaining delivery glue?",
   ],
   risks:["Extremely technical evaluators","Possible preference to build","Easy to sound generic if you ignore edge runtime differences"],
   nextAction:"Read 2–3 recent engineering blog posts; open with a precise question from one; offer SE-led architecture session focused on multi-target Deploy + Secure policy.",
   sa:"Match their public technical tone. Zero fluff. No customer implication.",
   d:`## Cloudflare — account brief (public sources only)
Technical credibility first. Hypotheses only until discovery confirms gaps.`,
   sections:[
     {title:"Tone guide",open:true,content:`Short sentences, concrete systems language, respect for public postmortems/learnings. Ask what still hurts in *their* delivery path despite strong culture.`},
   ]},

  {id:"spotify",title:"Spotify",e:"🎧",c:ER,industry:"Consumer streaming / Media tech",
   short:"Large product-engineering organisation known publicly for autonomous squads, platform thinking, and developer productivity culture.",
   publicSnapshot:"Spotify publicly operates a global streaming service and frequently discusses engineering culture (squads/tribes historically), experimentation, and personalisation systems. Careers and engineering blogs highlight backend, data, mobile, and infrastructure roles.",
   publicSignals:[
     {kind:"public",text:"Engineering blog and public talks often cover culture, autonomy, and large-org engineering practices.",source:"engineering blog"},
     {kind:"public",text:"Careers listings show many specialised engineering roles across client, backend, data, security, and infrastructure.",source:"careers page"},
     {kind:"public",text:"Public product materials emphasise personalisation and reliability of the listener experience — downtime is user-visible.",source:"public product marketing"},
   ],
   hypotheses:[
     {kind:"hypothesis",text:"Hypothesis: Strong squad autonomy may produce pipeline sprawl — Portal + policy gates could be the platform team's priority."},
     {kind:"hypothesis",text:"Hypothesis: Experimentation/feature exposure is mature; position Flags carefully as complementary."},
     {kind:"hypothesis",text:"Hypothesis: Observability is likely deep; Verify should integrate, not compete."},
     {kind:"hypothesis",text:"Hypothesis: FinOps and sustainability/efficiency themes may support Cost conversations at infra scale."},
   ],
   personas:["Head of Platform","VP Engineering","Developer Experience Lead","Engineering Manager","FinOps / Cloud Cost Owner"],
   pains:["Autonomy vs standardisation tension","Onboarding across many squads","Inconsistent delivery paths","Cloud efficiency at large footprint"],
   moduleFit:["Relay Portal","Relay Deploy","Relay Verify","Relay Insights","Relay Cost","Relay Secure"],
   outboundAngles:[
     "Autonomy with guardrails: golden paths that squads still want to use.",
     "Ask how they measure cross-squad delivery health without central chokepoints.",
     "Cost/efficiency as a platform capability embedded in templates.",
   ],
   qualQuestions:[
     "How optional vs mandatory are delivery standards across squads today?",
     "What breaks when a squad invents its own pipeline?",
     "How is AI-assisted coding showing up in review load at squad level?",
     "Which platform capabilities are self-service vs ticket queues?",
   ],
   risks:["Famous internal engineering culture — high NIH","Complex stakeholder map","Long enterprise process"],
   nextAction:"Identify Platform/DevEx champion; propose squad-level PoC with adoption metrics (not just tool install); keep Flags/Observe complementary.",
   sa:"Respect autonomy narrative. Relay is paved road + verification, not central command-and-control theatre.",
   d:`## Spotify — account brief (public sources only)
Culture-aware outbound. Label hypotheses. No implied design partnership or customer status.`,
   sections:[
     {title:"Org motion tip",open:true,content:`EM-level enthusiasm helps adoption stories; Platform + VP Eng still required for standards and budget. Plan multi-threaded discovery.`},
   ]},

];
