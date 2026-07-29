---
name: update-docs
description: Update README.md, ROADMAP.md, CHANGELOG.md, and CLAUDE.md to reflect the current state of the repo — log recent changes, mark completed backlog items, cut stale content, audit for obsolete files, and keep all docs accurate and non-bloated.
---

Brings `README.md`, `ROADMAP.md`, `CHANGELOG.md`, and `CLAUDE.md` to current state. No runtime surface — this is a content-audit-and-edit skill.

## What this skill does

Exhaustively reviews all three docs against the actual codebase and git history, audits for obsolete files, then edits in-place. Preserves information density and project history; cuts stale, redundant, or superseded content.

## Protocol

### 1. Establish what has changed since the last update

```bash
# Find the last-updated date in ROADMAP.md
head -10 ROADMAP.md

# List all commits since that date
git log --oneline --since="<last-update-date>"

# Full diff stat for context
git log --stat --since="<last-update-date>" | head -80
```

### 2. Read all four files in full

```bash
cat -n README.md
cat -n ROADMAP.md
cat -n CHANGELOG.md
cat -n CLAUDE.md
```

### 3. Audit for obsolete files and folders

```bash
# List the full repo tree (excluding git/node_modules/dist)
find . -not -path './.git/*' -not -path './node_modules/*' -not -path './dist/*' | sort

# Check content-staging/ — delete any file whose content is fully in src/data.ts
ls content-staging/

# For each staging file, spot-check a few IDs against src/data.ts
grep 'id:"<id-from-staging>"' src/data.ts
```

Delete staging files whose content is confirmed live in `src/data.ts`. If `content-staging/` becomes empty, the folder disappears from git — that's fine.

Also check for:
- Any `*.md` notes or scratch files at repo root that aren't README/ROADMAP/CLAUDE
- Any `TODO` or `NOTES` files that have been superseded

### 4. Audit checklist — ROADMAP.md

Work through every section against the actual code:

**Backlog items:**
- For each unchecked `[ ]` item: grep the codebase to verify whether it's actually done. If done, mark `[x]` and add a short note. If partially done, note what remains.
- For each checked `[x]` item that has no remaining sub-items: consider whether the entire parent item can be collapsed or removed to reduce noise.

```bash
# Verify current tab list
grep -n "^  const TABS" src/App.tsx

# Count persona cards
grep -c 'id:"cto"\|id:"vpe"\|id:"sre"\|id:"ciso"\|id:"appsec"\|id:"finops"\|id:"finance"\|id:"platform"' src/data.ts

# Verify glossary tab exists
grep -n "Glossary\|GLOSSARY" src/App.tsx | head -5

# Verify competitive filter/cats system
grep -n "cats" src/data.ts | head -5

# Count competitor cards
grep -n "^  {id:" src/data.ts | grep -A1 "COMPS" | head -20
# (or just count the IDs in the COMPS block)
```

**CHANGELOG.md:**
- Add a new dated section at the top for any **merged** work not yet logged. Use git log subjects as the source — don't summarise from memory.
- One entry per logical feature/sprint (group commits from the same branch/PR).
- Format: `**Feature name (PR #N, branch-name):** narrative.`
- ROADMAP.md should not contain changelog content — if "Recent updates" sections appear there, move them to CHANGELOG and replace with a one-line pointer.
- **Feature branches not yet merged:** if there is significant in-progress work on a non-main branch, add a clearly labelled section at the very top of CHANGELOG using this format — always include the branch name so readers know where the work lives and that it hasn't shipped yet:

  ```
  ## In progress — `<branch-name>` (not yet merged to main)

  - **Feature name (branch-name):** description. All changes are on `<branch-name>` and the stable `main` branch is unaffected.
  ```

**"Immediate next actions" list:**
- Remove any item that is now done (check against backlog + git log).
- Add any new urgent priorities that have emerged.
- Re-sort by current GTM impact.

**Stream descriptions (Content, Infrastructure, Dev skills):**
- Update any file/path references that have changed (e.g. `App.tsx` → `src/data.ts`).
- Remove setup instructions that are now obsolete.
- Update tool/version references (Node version, model IDs, plugin status).

### 5. Audit checklist — README.md

- Project structure table: verify each listed file still exists at that path.
- Setup instructions: verify step-by-step against actual files (`package.json` scripts, `.env.local.example`).
- Security architecture diagram: still accurate?
- Content updates section: file references correct (`src/data.ts`, not `App.tsx`)?

### 6. Audit checklist — CLAUDE.md

CLAUDE.md is the primary context document for Claude Code. It must stay accurate because it governs every AI coding session.

```bash
# Check App.tsx line count
wc -l src/App.tsx

# Check data.ts exported constant count
grep -c "^export const" src/data.ts
```

- `src/App.tsx` line count: update the `~NNN lines` note if it's drifted by >50 lines
- `src/data.ts` exported constant count: update if it's changed
- "What's been built" section: update tab count, persona count, key features
- Content update pattern: must reference `src/data.ts`, not `App.tsx`
- Key files table: verify all listed files still exist

### 7. What to cut

Cut without hesitation if:
- A backlog item is fully done with no remaining sub-tasks — collapse to a one-liner in "Recent updates".
- A "decision pending" note has been resolved — replace with what was decided.
- A note is superseded by a newer note with updated facts.
- A section describes a workflow that no longer exists.
- A staging file whose content is confirmed in `src/data.ts`.

Keep even if it feels old:
- Historical "Recent updates" entries — they are the project's commit log in prose form.
- Architecture decisions and their rationale — context for future changes.
- Known gaps that haven't been addressed — they're still gaps.

### 8. Edit all three files

Make targeted edits. Don't rewrite sections that are accurate — only change what needs changing.

After editing:
```bash
# Sanity check: ROADMAP should start with today's date as the most recent entry
head -8 ROADMAP.md

# Sanity check: README setup steps still reference real files
ls .env.local.example

# Verify no .env files or secrets staged
git status
```

### 9. Commit

```bash
git status                          # verify only doc files + any deleted staging files
git add README.md ROADMAP.md CHANGELOG.md CLAUDE.md
# If staging files were deleted:
git add content-staging/
# If the skill file itself was updated:
git add .claude/skills/update-docs/SKILL.md
git commit -m "docs: update README, ROADMAP, CHANGELOG, CLAUDE.md to <date> state"
```

## Common findings to look for

| What to check | How |
|---|---|
| `App.tsx` referenced for content that's now in `src/data.ts` | `grep -n "App.tsx" README.md ROADMAP.md CLAUDE.md` |
| Old module names (SEI, CCM, SRM, chaos engineering) | `grep -in "sei\|ccm\|srm\|chaos" README.md ROADMAP.md CLAUDE.md` |
| Persona count claims ("4 personas", "expand from 4") | `grep -n "persona" ROADMAP.md` |
| Stale model IDs | `grep -n "claude-sonnet-4-20250514\|claude-3-" ROADMAP.md CLAUDE.md` |
| "Decision pending" blocks where a decision was made | `grep -n "Decision pending\|decision pending" ROADMAP.md` |
| Tab count mismatch | Cross-ref `TABS` array in `src/App.tsx` vs mentions of tab count in docs |
| Line count drift in CLAUDE.md | `wc -l src/App.tsx` vs the `~NNN lines` note |
| Ported staging content | `ls content-staging/` then verify each file's IDs against `src/data.ts` |

## Key facts to have at hand

- Current tab list: `grep "const TABS" src/App.tsx`
- Current persona count: count `id:"..."` entries in `PERSONAS` array in `src/data.ts`
- Current competitor count and categories: count entries in `COMPS` array
- `src/App.tsx` line count: `wc -l src/App.tsx`
- `src/data.ts` exported constant count: `grep -c "^export const" src/data.ts`
- Most recent PR number merged to main
- Today's date (for the "Last updated" line in ROADMAP and the "as of" date in CLAUDE.md)
