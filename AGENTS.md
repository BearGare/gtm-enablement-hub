# AGENTS.md

## Cursor Cloud specific instructions

Startup update script runs `npm install`.

### Service
- **Vite dev server:** `npm run dev` → http://localhost:5173
- Coaching / Calls need `ANTHROPIC_API_KEY` in `.env.local`
- Whole-hub RAG needs `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`, `VOYAGE_API_KEY` plus `npm run seed`
- Without RAG keys, chat fails open to single-card coaching (expected)

### Checks
- `npm run check:glossary`
- `npm run check:sensitive`
- `npm run build`
- No ESLint script; TypeScript build is the gate

### Notes
- Product docs live in root `README.md`, `ROADMAP.md`, `CHANGELOG.md`, `CLAUDE.md`
- Content edits go in `src/data/*`; UI/chat in `src/App.tsx`
- localStorage prefix is `signalHub*`
