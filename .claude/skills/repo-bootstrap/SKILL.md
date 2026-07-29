---
name: repo-bootstrap
description: >
  The standard kit every repo should converge on, and how to install it.
  Trigger when the user asks to set up, bootstrap, or standardize a repo,
  or when starting substantial work in a repo that lacks the kit (no
  CLAUDE.md, no skills sync hook, no .gitignore, no CI). When the gap is
  noticed mid-task on unrelated work, mention it once and offer — do not
  bootstrap uninvited.
---

# Repo bootstrap

Repos of varying maturity should converge on one standard kit so every
session starts with the same context and the same shared skills.

## The kit

1. **Skills sync hook**: `.claude/hooks/session-start.sh` that
   clones/pulls the claude-skills repo and copies `skills/*` into the
   repo's `.claude/skills/`, plus the `SessionStart` entry in
   `.claude/settings.json`. Copy both from an existing consumer repo
   (e.g. BearGare/Harness-Learning-Hub) rather than writing from scratch.
2. **CLAUDE.md**: repo purpose in one paragraph, then the commands that
   matter — build, test, run, lint — and any non-obvious conventions.
   Facts only; generic advice belongs in the skill library.
3. **.gitignore** appropriate to the stack, including `.env` and local
   scratch, present before the first commit that could leak.
4. **Minimal CI**: one workflow that runs the repo's existing checks
   (tests, lint, typecheck) on PRs. Don't invent checks the repo doesn't
   have — CI runs what exists.
5. **Permission allowlist**: `.claude/settings.json` permissions for the
   repo's common read-only commands, so sessions prompt less (the
   /fewer-permission-prompts skill can generate this from transcripts).

## Proportionality

Throwaway repos get items 1 and 3 only. Add CLAUDE.md when the repo
accumulates its first non-obvious fact, and CI when there is a check
worth gating on. The kit is a ceiling to converge toward, not a toll
paid before starting work.

## After installing

Commit the kit as its own change, separate from whatever task prompted
it. Verify the hook actually syncs: start-of-session output should show
the skills landing in `.claude/skills/`.
