---
name: skill-authoring
description: >
  Sets the format, scope test, and quality bar for skills in the shared
  cross-repo skill library. Trigger when creating, editing, or reviewing a
  skill in the claude-skills repo, when the user asks to turn a lesson or
  preference into a skill, or when deciding whether something belongs in
  the library versus a repo's CLAUDE.md. Do not trigger for one-off
  repo-local .claude/skills files that are not meant to be shared.
---

# Skill authoring

Every skill lives at `skills/<name>/SKILL.md`: YAML frontmatter with `name`
(must match the directory) and `description`, then a Markdown body. Match
the register of `skills/model-routing/SKILL.md` — dense, imperative,
opinionated.

## The scope test

A skill belongs in the library only if it generalizes across the whole way
of working: solo, natural-language prompting, multi-repo, branch-and-PR,
local Claude Code and Claude Code web. If it depends on one codebase's
content, domain, stack, or conventions, it goes in that repo's CLAUDE.md
instead. If it merely states a conversational preference with no trigger
condition, it is CLAUDE.md material, not a skill.

## Description rules

The description is the router — it is all Claude sees before deciding to
load the skill, so it carries the trigger logic:
- State what the skill does in the first clause.
- State trigger conditions concretely ("Trigger when…"), including
  mid-task triggers where relevant ("Also trigger when…").
- State non-trigger conditions ("Do not trigger for…"). Every skill needs
  at least one, or it will fire on everything adjacent.

## Body rules

- One skill = one trigger situation. If the body needs two unrelated
  trigger sets, it is two skills.
- Opinionated defaults over menus. Give the number, the threshold, the
  default action — not a list of considerations.
- Keep it under ~60 lines. A skill that needs more is trying to be
  documentation.
- Add a surface caveat wherever local and web behavior differ (ephemeral
  containers, no mid-session model switching, PR-event subscriptions).
- Don't duplicate built-in harness skills (/code-review, /verify,
  /security-review); scope around them and reference them instead.
- Volatile facts (pricing, model names, tool availability) get flagged as
  "defaults to re-check, not fixed truth."

## After writing

Verify the frontmatter parses, `name` matches the directory, and the
description reads correctly in third person. Commit to a branch in the
claude-skills repo; consuming repos pick the skill up on their next
session sync.
