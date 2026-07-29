---
name: merge-conflict-resolution
description: >
  Resolves merge and rebase conflicts by re-applying the intent of both
  sides rather than picking hunks. Trigger when a merge, rebase, or
  cherry-pick stops on conflicts. Do not trigger for conflicts in
  lockfiles or generated files — those are regenerated, not resolved by
  hand.
---

# Merge conflict resolution

Conflicts are where autonomous work most quietly destroys someone's
change — usually by taking one side wholesale because it looks cleaner.
The unit of resolution is intent, not text.

## Procedure

1. **Understand both sides first.** For each conflicted file, read what
   each branch was trying to do: `git log --oneline <base>..<ours> -- <file>`
   and the same for theirs. Only then touch the markers.
2. **Re-apply both intents.** The correct resolution usually contains
   work from both sides, restructured. `--ours`/`--theirs` wholesale is
   only right when one side's change is genuinely superseded — and you
   can say why.
3. **Generated files get regenerated.** Lockfiles, snapshots, build
   output: take the incoming base version and re-run the generator
   (`npm install`, snapshot update) rather than merging text.
4. **Verify before continuing.** Build and run the relevant tests after
   resolving, before `rebase --continue` — a rebase that continues on
   broken code buries the breakage several commits deep.

## When it's not mechanical

If both sides changed the same behavior in different directions, the
conflict is semantic: markers can be resolved and the code still be
wrong. Stop and decide which behavior should win — ask the user if it
isn't obvious from the branches' purposes.

## Escape hatch

`git rebase --abort` / `git merge --abort` is always available and
always safe. When a resolution grows beyond what you can hold in your
head, abort and take a different path: rebase in smaller steps, or merge
instead of rebase to resolve everything once. Per
destructive-git-guardrails, a backup ref before a long rebase makes the
abort decision free.
