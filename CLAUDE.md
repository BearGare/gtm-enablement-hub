# GTM Signal Hub — agent context

Externally safe demo of a GTM enablement hub for the fictional platform **Relay** (Cursor + Atlassian + delivery-platform chimera across the full SDLC).

## Stack
Vite + React 19 + TypeScript. Content in `src/data/*`. UI/state/chat in `src/App.tsx`. API proxy + RAG in `api/chat.ts` and `vite.config.ts`.

## Rules for this branch
- Never reintroduce private employer/customer proofs, deal notes, or CRM-derived content
- Hypotheses on accounts must stay labelled
- Run `npm run check:sensitive` before committing content changes
- Do not merge this branch into the private production hub branch
- Never commit `.env.local`

## Commands
- `npm run dev` — http://localhost:5173
- `npm run build` / `npm run check:glossary` / `npm run check:sensitive`
- `npm run seed` — requires Turso + Voyage keys (demo DB only)

See `README.md` and `DEMO_SCRIPT.md`.
