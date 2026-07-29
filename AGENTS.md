# AGENTS.md

## Cursor Cloud specific instructions

Startup update script runs `npm install`.

### Service
- **Vite dev server:** `npm run dev` → http://localhost:5173
- Coaching / Calls need `ANTHROPIC_API_KEY` in `.env.local`
- Whole-hub RAG needs `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`, `VOYAGE_API_KEY` plus `npm run seed` against a **demo** Turso DB
- Without RAG keys, chat fails open to single-card coaching (expected)

### Checks
- `npm run check:glossary`
- `npm run check:sensitive` (must stay green on this demo branch)
- `npm run build`
- No ESLint script; TypeScript build is the gate

### Notes
- This branch is the sanitised **GTM Signal Hub** demo — do not merge into private `main`
- See `README.md`, `DEMO_SCRIPT.md`, `SANITISATION_LOG.md`
- localStorage prefix is `signalHub*` (not the private hub prefix)
