---
name: ci-triage
description: >
  Procedure for red CI on a branch or pull request: diagnose from the
  log, classify the failure, then fix, re-run, or rebase. Trigger when a
  CI check fails on a PR or branch being worked on, or when asked to get
  a PR green. Do not trigger for red CI on branches unrelated to the
  current work — note it to the user instead of silently adopting it.
---

# CI triage

The reflex to resist is re-running without reading. Every triage starts
with the failing log.

## Classify first

Read the failing job's log, then place the failure in one bucket:

- **Real, caused by this diff**: the failure touches changed code or its
  consumers. Fix forward on the branch.
- **Flake**: passes locally, failure is in an area the diff doesn't
  touch, trace shows timing/network/external service. Re-run once —
  exactly once. A second red in the same place is real by definition and
  gets diagnosed, not re-rolled.
- **Stale base**: the branch is behind and the failure comes from drift.
  Rebase onto the default branch and let CI re-run.
- **Pre-existing**: the default branch is red at the merge base. Not this
  PR's debt — tell the user and don't block the branch on it, unless the
  task is explicitly to fix main.

## Fixing

- Fix forward with normal commits; per destructive-git-guardrails, don't
  rewrite pushed history just to hide a red run.
- A CI-only failure that can't be reproduced locally usually means an
  environment difference (versions, env vars, services). Diff the CI
  environment against local before changing code.
- When babysitting a PR to green, each failure gets the full
  classify-and-fix loop — one round is not the task. If several rounds
  make no progress, report the diagnosis and where it's stuck rather
  than going quiet.

## Surface caveat

On Claude Code web, subscribe to PR activity events rather than polling
CI status in a loop; events wake the session when checks complete. Note
that CI success events are not always delivered — on a subscribed PR,
verify final green state directly rather than waiting forever.
