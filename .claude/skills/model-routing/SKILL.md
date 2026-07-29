---
name: model-routing
description: >
  Advises which Claude model and effort level to route a coding task to,
  and how to allocate subagent models. Trigger when the user starts,
  scopes, or plans a coding task (feature work, refactor, migration,
  debugging, multi-file change), asks which model or effort to use, asks
  whether a task belongs on a stronger model, or spawns subagents. Also
  trigger when a task in progress looks mismatched to the current model or
  effort. Do not trigger for trivial one-line edits or pure Q&A.
---

# Model & effort routing

Set effort before model. Effort is the larger cost lever: roughly 6x the
conversational turns from low to max, versus about 2x the per-token price
between Sonnet 5 and Opus 4.8. When a task is invoked, state in one line the
model and effort you would route to and why, then proceed. If the current
model or effort is mismatched to the task, say so once.

Surface caveat: on Claude Code web, the main session model cannot be switched
mid-session (the /model picker is unavailable there) and model availability
is governed by server-managed settings. Apply this routing to subagent model
selection via the Task tool and to the choice of model at session start,
not to mid-session switching.

## Main-task routing
- Sonnet 5, low/medium effort: everyday feature work, moderate-scope
  refactors, multi-step automation, triage, classification. Most work is here.
- High effort is the crossover zone. Token growth starts eroding Sonnet 5's
  price advantage. Benchmark on the real prompts rather than assuming.
- Opus 4.8, high/max effort: correctness-critical refactors, large migrations
  that must not regress, anything where a wrong answer is expensive. Pair with
  subagent fan-out for large-scale changes.
- Fable 5: reserve for genuinely long-horizon, multi-day planning where task
  length itself is the differentiator. Rare. Do not default to it.

## Subagent model selection
Use the cheapest model adequate for the subtask:
- Haiku 4.5: bulk mechanical work. Formatting, field extraction, dedup,
  applying a template across many files.
- Sonnet 5: scoped research, drafting, code exploration, moderate changes.
- Opus 4.8: genuine planning, competing tradeoffs, correctness-critical fan-out.
Caps: Haiku subagents must not spawn further subagents. Max spawn depth 2. A
subagent that finds it needs a stronger model returns to the parent to
re-scope rather than self-escalating.

## Cost guardrails
- Use prompt caching for repeated context; cache reads bill at about 1/10 of
  base input, which dominates the economics of re-reading a large codebase.
- Batch latency-tolerant work where a Batch API path exists (halved rate).
- Pricing and effort behaviour shift as Anthropic reshuffles the tier ladder.
  Treat these mappings as defaults to re-check, not fixed truth.
