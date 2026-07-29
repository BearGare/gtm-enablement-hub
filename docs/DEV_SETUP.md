# Dev setup — GTM Signal Hub

```bash
npm install
cp .env.local.example .env.local   # Anthropic (+ Turso/Voyage for RAG)
npm run dev
```

Checks: `npm run check:glossary`, `npm run check:sensitive`, `npm run build`.

Content edits go in `src/data/*`. UI/chat in `src/App.tsx`. See `README.md`.
