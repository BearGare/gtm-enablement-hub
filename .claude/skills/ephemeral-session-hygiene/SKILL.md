---
name: ephemeral-session-hygiene
description: >
  Commit-and-push cadence rules that keep work from dying with an
  ephemeral container. Trigger at the start of any Claude Code web or
  other remote/containerized session, before starting long-running or
  risky work, and before ending any turn in which files changed. Also
  trigger when a deliverable exists only in scratch space or chat. Do not
  trigger for read-only sessions where nothing was produced.
---

# Ephemeral session hygiene

On Claude Code web the container is reclaimed when the session ends or
idles out. Anything not pushed to the remote is gone. Treat the remote as
the only durable store.

## Cadence rules

- Branch immediately. If on the default branch and about to change
  anything, create the working branch first, not at commit time.
- Commit early and often. WIP commits on your own feature branch are
  fine; a broken-but-pushed state beats a perfect-but-lost one.
- Never end a turn with meaningful uncommitted work. If the task is
  mid-flight, commit as WIP and push before yielding.
- Push before, not after, long or risky operations (large refactors,
  dependency upgrades, anything that might wedge the session).
- Push with `git push -u origin <branch>` so the branch exists remotely
  from the first push.

## Deliverables that aren't code

A report, diagram, or generated artifact that exists only in the
scratchpad or chat is not delivered. Either commit it to the branch or
send it to the user as a file before ending the turn.

## Before opening the PR

WIP-commit noise is acceptable during the session, not in review. Squash
or reword into coherent commits before marking a PR ready — unless the
repo is casual enough that nobody will read the history, in which case
don't spend the effort.

## Local caveat

On local Claude Code the working tree persists, so the cadence relaxes:
commit at natural checkpoints instead of every turn. Pushing before
ending a session is still the default — local disks are not backups.
