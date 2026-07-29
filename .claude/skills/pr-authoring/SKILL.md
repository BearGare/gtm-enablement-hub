---
name: pr-authoring
description: >
  House style for pull requests: size, description structure, self-review,
  and draft-versus-ready. Trigger when opening a pull request, when
  updating one substantially, or when a change is ready to leave its
  feature branch. Also trigger when a growing diff suggests the PR should
  be split. Do not trigger for the decision of whether to create a PR at
  all — that follows the user's request.
---

# PR authoring

Working solo and prompting in natural language, the PR is the primary
review surface and the durable record of why a change happened. Write it
for future-you reading it in six months with no session context.

## Size

Default cap: ~400 lines of net change. Beyond that, split by concern
before opening, not after review starts. One concern per PR — never mix
opportunistic refactors with behavior changes; the refactor gets its own
PR first.

## Description structure

1. What changed and why, in the first two sentences. The why is the part
   that evaporates from memory; the diff already shows the what.
2. How, only where the diff doesn't make it obvious (approach chosen,
   alternatives rejected and why).
3. Verification: what was run and observed (per verification-standards).
   An unverified PR says so explicitly.
4. Follow-ups: anything discovered but deliberately deferred, so scope
   cut in the branch isn't scope lost.

Check for a repo PR template first and use its structure when one exists.

## Self-review pass

Before opening, read the full diff as a reviewer: remove debug output,
stray formatting churn, and files that don't belong to the concern. This
pass is the only code review the change gets — where the harness provides
/code-review, run it here.

## Draft vs ready

Open as draft when CI hasn't run, verification is incomplete, or the
description contains an open question. Mark ready only when it could be
merged as-is. Solo doesn't mean skipping this — draft status is a signal
to future sessions about trust level, not to other people.
