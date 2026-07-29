#!/bin/bash
set -euo pipefail
cd "${CLAUDE_PROJECT_DIR:-$(git rev-parse --show-toplevel 2>/dev/null || pwd)}"

# Sync shared skill library (both local and web). Non-fatal by design.
{
  SKILLS_SRC="$(mktemp -d)"
  if git clone --depth 1 https://github.com/BearGare/claude-skills "$SKILLS_SRC" 2>/dev/null; then
    mkdir -p .claude/skills
    cp -R "$SKILLS_SRC"/skills/. .claude/skills/
  fi
  rm -rf "$SKILLS_SRC"
} || echo "claude-skills sync skipped (clone failed)"

# Project dependencies (web/remote sessions only, unchanged behavior).
if [ "${CLAUDE_CODE_REMOTE:-}" = "true" ]; then
  npm install
fi
