# Dev setup — GTM Enablement Hub

```bash
npm install
cp .env.local.example .env.local   # Anthropic (+ Turso/Voyage for RAG)
npm run dev                        # http://localhost:5173
```

Checks: `npm run check:naming`, `npm run check:glossary`, `npm run check:sensitive`, `npm run build`.

Canonical product names: [`docs/NAMING.md`](NAMING.md).

### Where to edit

| Area | Path |
|---|---|
| GTM content | `src/data/*` |
| UI / chat / calls | `src/App.tsx` |
| API + RAG | `api/chat.ts`, `vite.config.ts` |
| Seed embeddings | `scripts/seed.ts` |

See [`README.md`](../README.md) for full setup and architecture, and [`CLAUDE.md`](../CLAUDE.md) for agent context.
