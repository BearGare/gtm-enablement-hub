import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { createClient, type Row } from '@libsql/client'

let _devDb: ReturnType<typeof createClient> | null = null

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiKey = env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY || ''
  const voyageKey = env.VOYAGE_API_KEY || process.env.VOYAGE_API_KEY || ''
  const tursoUrl = env.TURSO_DATABASE_URL || process.env.TURSO_DATABASE_URL || ''
  const tursoToken = env.TURSO_AUTH_TOKEN || process.env.TURSO_AUTH_TOKEN || ''

  function getDevDb(): ReturnType<typeof createClient> | null {
    if (_devDb) return _devDb
    if (!tursoUrl || !tursoToken) return null
    const httpUrl = tursoUrl.startsWith('libsql://') ? tursoUrl.replace('libsql://', 'https://') : tursoUrl
    _devDb = createClient({ url: httpUrl, authToken: tursoToken })
    return _devDb
  }

  function mergeRrf(vectorRows: Row[], ftsRows: Row[], topK: number): Row[] {
    const K = 60
    const scores = new Map<string, number>()
    const rowMap = new Map<string, Row>()
    vectorRows.forEach((row, rank) => {
      const id = String(row.id ?? '')
      if (!id) return
      scores.set(id, (scores.get(id) ?? 0) + 0.6 / (K + rank + 1))
      rowMap.set(id, row)
    })
    ftsRows.forEach((row, rank) => {
      const id = String(row.id ?? '')
      if (!id) return
      scores.set(id, (scores.get(id) ?? 0) + 0.4 / (K + rank + 1))
      if (!rowMap.has(id)) rowMap.set(id, row)
    })
    return [...scores.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, topK)
      .map(([id]) => rowMap.get(id)!)
      .filter(Boolean)
  }

  // Common English function words that add only noise to an OR'd FTS5 query.
  // Domain acronyms (AI, CI, CD, ROI, TCO) are deliberately NOT included.
  const FTS_STOP = new Set([
    'the', 'and', 'for', 'are', 'but', 'not', 'you', 'our', 'was', 'how', 'what',
    'who', 'why', 'with', 'that', 'this', 'they', 'them', 'from', 'have', 'has',
    'had', 'will', 'would', 'about', 'into', 'than', 'then', 'your', 'their',
    'is', 'of', 'to', 'in', 'on', 'at', 'as', 'it', 'we', 'my', 'be', 'do', 'so',
    'or', 'an', 'if', 'vs',
  ])

  function toFtsQuery(raw: string): string {
    const terms = raw
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter(t => t.length >= 2 && !FTS_STOP.has(t))
    if (!terms.length) return ''
    return [...new Set(terms)].map(t => `"${t}"`).join(' OR ')
  }

  async function buildRagContext(query: string): Promise<string> {
    if (!voyageKey) return ''
    const db = getDevDb()
    if (!db) return ''

    const embRes = await fetch('https://api.voyageai.com/v1/embeddings', {
      method: 'POST',
      headers: { Authorization: `Bearer ${voyageKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'voyage-3-lite', input: [query] }),
    })
    if (!embRes.ok) throw new Error(`Voyage ${embRes.status}`)
    const embData = await embRes.json() as { data: { embedding: number[] }[] }
    const embedding = embData.data[0].embedding
    const ftsQuery = toFtsQuery(query)

    const [vectorRows, ftsRows] = await Promise.all([
      db.execute({
        sql: `SELECT ci.id, ci.content_type, ci.title, ci.short_desc, ci.metadata_json
              FROM vector_top_k('idx_content_embedding', vector(?), ?) AS k
              JOIN content_items AS ci ON ci.rowid = k.id`,
        args: [JSON.stringify(embedding), 10],
      }).then(r => r.rows),
      ftsQuery
        ? db.execute({
            sql: `SELECT ci.id, ci.content_type, ci.title, ci.short_desc, ci.metadata_json
                  FROM content_fts
                  JOIN content_items AS ci ON ci.id = content_fts.id
                  WHERE content_fts MATCH ?
                  ORDER BY rank
                  LIMIT 10`,
            args: [ftsQuery],
          }).then(r => r.rows).catch((): Row[] => [])
        : Promise.resolve([] as Row[]),
    ])

    const rows = mergeRrf(vectorRows, ftsRows, 5)
    if (!rows.length) return ''

    const blocks = rows.map(row => {
      const title = String(row.title ?? '')
      const contentType = String(row.content_type ?? '')
      const shortDesc = String(row.short_desc ?? '')
      let meta: Record<string, unknown> = {}
      try { meta = JSON.parse(String(row.metadata_json ?? '{}')) } catch { /* non-fatal */ }
      const lines: string[] = [`### ${title} (${contentType})`]
      if (shortDesc) lines.push(shortDesc)
      if (typeof meta.sum === 'string' && meta.sum) lines.push(meta.sum)
      if (typeof meta.sa === 'string' && meta.sa) lines.push(`Sales angle: ${meta.sa}`)
      if (typeof meta.adv === 'string' && meta.adv) lines.push(`Relay advantages: ${meta.adv}`)
      if (typeof meta.wo === 'string' && meta.wo) lines.push(`Watch out: ${meta.wo}`)
      if (contentType === 'disc_group' && Array.isArray(meta.qs)) {
        const qs = (meta.qs as { q: string }[]).slice(0, 3)
        if (qs.length) lines.push('Questions: ' + qs.map(q => q.q).join(' | '))
      }
      return lines.join('\n')
    })

    return [
      'ADDITIONAL CONTEXT — semantically relevant knowledge base content:',
      blocks.join('\n\n'),
      '\nUse the above if it genuinely enriches your coaching. Do not surface it mechanically.\n\n---\n\n',
    ].join('\n')
  }

  return {
    plugins: [
      react(),
      {
        name: 'anthropic-proxy',
        configureServer(server: any) {
          server.middlewares.use((req: any, res: any, next: any) => {
            if (req.url !== '/api/chat' || req.method !== 'POST') return next()
            let body = ''
            req.on('data', (chunk: Buffer) => { body += chunk.toString() })
            req.on('end', () => {
              (async () => {
                if (!apiKey) {
                  res.statusCode = 500
                  res.setHeader('content-type', 'application/json')
                  res.end(JSON.stringify({ error: 'ANTHROPIC_API_KEY not set in .env.local' }))
                  return
                }

                type ParsedBody = {
                  model: string
                  max_tokens: number
                  system: string
                  messages: { role: string; content: string }[]
                  rag_query?: string
                }
                let parsedBody: ParsedBody
                try {
                  parsedBody = JSON.parse(body) as ParsedBody
                } catch {
                  res.statusCode = 400
                  res.setHeader('content-type', 'application/json')
                  res.end(JSON.stringify({ error: 'Invalid JSON' }))
                  return
                }

                const { rag_query, ...anthropicBody } = parsedBody

                if (rag_query) {
                  try {
                    const context = await buildRagContext(rag_query)
                    if (context) anthropicBody.system = context + anthropicBody.system
                  } catch (err) {
                    console.error('[RAG] context fetch failed:', err)
                  }
                }

                const upstream = await fetch('https://api.anthropic.com/v1/messages', {
                  method: 'POST',
                  headers: {
                    'content-type': 'application/json',
                    'x-api-key': apiKey,
                    'anthropic-version': '2023-06-01',
                  },
                  body: JSON.stringify(anthropicBody),
                })
                const text = await upstream.text()
                res.statusCode = upstream.status
                res.setHeader('content-type', 'application/json')
                res.end(text)
              })().catch((err: any) => {
                res.statusCode = 500
                res.setHeader('content-type', 'application/json')
                res.end(JSON.stringify({ error: err.message }))
              })
            })
          })
        },
      },
    ],
  }
})
