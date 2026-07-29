---
name: destructive-git-guardrails
description: >
  Hard rules for git operations that can discard work: force-push, hard
  reset, clean, branch deletion, and history rewrites. Trigger before
  running any of these, before any operation that rewrites pushed
  history, and when recovering from one that went wrong. Do not trigger
  for additive operations (commit, ordinary push, fetch, branch
  creation).
---

# Destructive git guardrails

Discarded commits are usually recoverable; discarded working-tree
changes are usually not. The rules scale with which of those is at risk.

## Hard rules

- Never force-push the default branch. No exception ships with this
  skill; if one ever exists, it comes from the user explicitly, that
  session.
- Force-push only as `--force-with-lease`, only on your own feature
  branch, and only when you can say why history diverged. A lease
  failure means someone (or some session) pushed something you haven't
  seen — read it before overriding it.
- Before `reset --hard`, `checkout -- .`, or `clean -f`: run
  `git status` and look at what will be destroyed. If anything listed is
  not disposable with certainty, `git stash` first — a stale stash is
  free, a lost working tree is not.
- Before a history rewrite (rebase, squash, amend of pushed commits),
  drop a backup ref: `git branch backup/<name>`. Delete it after the
  rewrite proves good.
- Don't rewrite history that a PR review has already commented on;
  review threads anchor to commits.
- Delete remote branches only after confirming they're merged; local
  `branch -D` (capital) demands the same check `-d` would have done.

## Recovery

Committed work is almost never gone: `git reflog` holds every position
HEAD has held for ~90 days. Prefer recovering the original commit over
re-doing the work from memory — the reflog version is the one that was
tested.

## Surface caveat

On ephemeral web containers the stakes invert: the remote is the only
durable copy (per ephemeral-session-hygiene), so a bad force-push there
destroys the sole survivor. Double the caution on anything that
overwrites a remote ref from an ephemeral session.
