---
name: scope-control
description: >
  Keeps a task from ballooning past its original request. Trigger
  mid-task when the diff is growing beyond what was asked — a "necessary"
  refactor appearing, a second unrelated fix landing on the branch, or
  work expanding into areas the request never mentioned. Do not trigger
  for changes genuinely required to deliver the ask.
---

# Scope control

Solo work has no reviewer to push back on scope creep; this skill is
that reviewer. The default is always: deliver the thing that was asked,
record everything else.

## The rules

- Discoveries become follow-ups, not branch growth. Log them as GitHub
  issues, or as a Follow-ups section in the PR description — then leave
  them alone.
- Never mix opportunistic refactors with behavior changes in one PR. If
  the refactor is genuinely needed first, it becomes its own preceding
  PR (per pr-authoring).
- Threshold: when a prerequisite ("I have to fix X before I can do Y")
  exceeds roughly a third of the original task's size, stop and confirm
  with the user before doing it. That size of prerequisite is a scope
  decision, not an implementation detail.
- When unsure whether something is in scope, it isn't. Ask if the user
  is available; defer to a follow-up if not.

## Warning signs to act on

- The branch name no longer describes the diff.
- Explaining the PR requires the word "also".
- A third file cluster unrelated to the first two is being edited.
- The plan has restarted ("actually, first I need to…") more than once.

When one fires, stop, list what's in flight, and split: the asked change
stays on this branch; everything else becomes follow-ups. It is always
cheaper to split before pushing than after review starts.

## What this is not

Not an excuse to under-deliver. Error handling, tests the repo's tier
requires, and updating docs the change invalidates are part of the ask,
not scope creep.
