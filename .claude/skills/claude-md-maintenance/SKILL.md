---
name: claude-md-maintenance
description: >
  Rules for when a discovered repo fact earns a CLAUDE.md entry, so
  per-repo context accretes instead of being re-learned every session.
  Trigger when a non-obvious repo fact was just learned the hard way (a
  build quirk, hidden convention, gotcha), when the user corrects a wrong
  assumption about the repo, or when CLAUDE.md contradicts observed
  reality. Do not trigger to record session narration, task status, or
  generic engineering advice.
---

# CLAUDE.md maintenance

CLAUDE.md is the repo's memory across sessions. Ephemeral containers
re-learn nothing for free, so a fact worth two minutes of rediscovery is
worth a line here — and a stale line costs more than a missing one,
because it gets believed.

## What earns an entry

All four must hold:
- Cost something to discover (a failed command, a wrong assumption, a
  detour) — anything obvious from a glance at the tree doesn't qualify.
- Stable — a property of the repo, not of today's task or branch.
- Repo-specific — anything that generalizes across repos belongs in the
  skill library, not here.
- Behavior-changing — knowing it would alter what a fresh session does.

## What never goes in

Task state, TODO lists, session summaries, praise for the codebase,
generic best practices, or anything a skill already covers. CLAUDE.md is
facts about this repo, in imperative one-liners ("run X before Y",
"tests require the dev server up"), not prose.

## Cadence

- Propose the edit in the same session the fact was learned; next
  session it's forgotten.
- When CLAUDE.md contradicts observed reality, fix the entry in the same
  change — a wrong entry actively misleads every future session.
- Keep the file scannable. When it grows past roughly a page, prune:
  entries that stopped being true, and entries no session has needed.
- CLAUDE.md edits ride along with the current branch's PR; they don't
  need their own.
