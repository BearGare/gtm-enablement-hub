---
name: verification-standards
description: >
  Sets the evidence bar for claiming work is done. Trigger before
  reporting a task complete, before committing a nontrivial change, and
  whenever about to write "done", "fixed", or "works" about a change.
  Do not trigger for docs-only or config-only changes with no runtime
  surface to exercise.
---

# Verification standards

The user reviews outcomes, not code. A completion report is trusted
exactly as far as the evidence behind it, so the report must say what was
run and what was observed — not what should happen.

## What "done" means

- The affected flow was exercised end-to-end and the new behavior was
  observed. Typechecks and passing tests are necessary, not sufficient —
  they prove the code compiles and the suite is happy, not that the
  feature works.
- For bug fixes: reproduce the failure first, then show the same repro
  passing after the fix. "The code now handles that case" without a
  fail-then-pass is a guess.
- Where the harness provides /verify, use it for nontrivial changes
  rather than hand-rolling the check.

## Reporting rules

- State the evidence in the completion report: the command run, the
  observable result. One line each is enough.
- Report failures plainly, with the failing output. "Mostly working" and
  hedged success claims are worse than a clear failure report.
- Never claim success by inference ("this should work because the logic
  is right"). If it wasn't observed, it isn't verified.

## When verification is impossible

Sometimes the flow can't be exercised — missing credentials, no runtime
in the container, an external system. Say so explicitly, label the change
unverified, and state what the user needs to run to verify it themselves.
An honest "unverified" preserves trust; a confident guess spends it.
