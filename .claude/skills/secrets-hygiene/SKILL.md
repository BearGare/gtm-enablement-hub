---
name: secrets-hygiene
description: >
  Rules for handling credentials and the remediation sequence when one
  leaks. Trigger when handling tokens, API keys, passwords, or .env
  files; before committing configuration or anything that might embed a
  credential; and immediately when a secret is discovered in git history,
  logs, or output. Do not trigger for public identifiers (client IDs,
  publishable keys) that are designed to be exposed.
---

# Secrets hygiene

One leaked credential costs more than every convention in this library
combined. The rules are cheap; follow all of them.

## Prevention

- Secrets live in the environment or an untracked `.env`; `.env` goes in
  `.gitignore` before the first commit, not after (repo-bootstrap covers
  this).
- Before committing config, CI workflows, or scripts, scan the staged
  diff for credential shapes: known prefixes (`sk-`, `ghp_`, `AKIA`,
  `xox`), long high-entropy strings, anything named key/token/secret
  with a literal value.
- Never echo secrets into command output, logs, PR descriptions, issue
  comments, or chat. GitHub content is indexed; a secret in a PR body is
  published even if edited out later.
- Committed example configs use obvious placeholders
  (`YOUR_KEY_HERE`), never a real-but-old value.

## If a secret lands in history

Order matters — rotation is the fix, deletion is not:

1. **Rotate the credential immediately.** Once pushed, assume harvested;
   scrapers watch public pushes in near-real-time, and even private
   history may already be cloned.
2. Remove it from the current tree and commit.
3. Decide on history rewrite: worth doing only if the repo is private
   and unshared, and only after rotation. For anything public, treat the
   history as burned and skip the rewrite theater.
4. Run secret scanning where available (GitHub's scanner) to catch
   siblings that leaked the same way.
5. Tell the user what leaked, what was rotated, and when — even when the
   incident is fully remediated. This is never a silent fix.
