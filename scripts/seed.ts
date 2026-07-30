/**
 * Turso seeding script — populates content_items with embeddings
 * from GTM Enablement Hub data exports, then creates user state tables.
 *
 * Run:  npm run seed          (full seed)
 *       npm run seed:dry      (inspect content_text without writing)
 */

import { readFileSync } from 'fs'
import { createClient } from '@libsql/client'
import { MODS, ARCH, PERSONAS, COMPS, RELAY_AI, SDLC_STAGES, DISC, DISCOVERY_PATHS, OBJECTIONS } from '../src/data.ts'
import type { Item } from '../src/types.ts'

const DRY_RUN = process.argv.includes('--dry-run')

if (!process.env.TURSO_DATABASE_URL) {
  try {
    const raw = readFileSync('.env.local', 'utf-8')
    for (const line of raw.split('\n')) {
      const t = line.trim()
      if (!t || t.startsWith('#')) continue
      const eq = t.indexOf('=')
      if (eq === -1) continue
      const k = t.slice(0, eq).trim()
      const v = t.slice(eq + 1).trim()
      if (!process.env[k]) process.env[k] = v
    }
  } catch { /* ignore */ }
}

type ContentType = 'module' | 'arch' | 'persona' | 'competitor' | 'relay_ai' | 'sdlc' | 'disc_group' | 'discovery_path' | 'objection'

interface SeedItem {
  id: string
  content_type: ContentType
  title: string
  short_desc: string
  content_text: string
  metadata_json: string
}

function joinSections(sections?: { title: string; content: string }[]): string {
  if (!sections?.length) return ''
  return sections.map(s => `${s.title}: ${s.content}`).join(' | ')
}

function str(...parts: (string | undefined | null | number)[]): string {
  return parts.filter(Boolean).join(' | ')
}

function buildMeta(item: Item, contentType: ContentType): string {
  const { d: _d, sections: _s, subModules: _sm, ...rest } = item as Item & { subModules?: Item[] }
  return JSON.stringify({ ...rest, content_type: contentType })
}

function discId(title: string): string {
  return 'disc-' + title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function buildAllItems(): SeedItem[] {
  const items: SeedItem[] = []

  for (const mod of MODS) {
    items.push({
      id: mod.id,
      content_type: 'module',
      title: mod.title ?? String(mod.n ?? mod.id),
      short_desc: mod.short ?? '',
      content_text: str(mod.title, mod.short, mod.buyer, mod.scenario, mod.sa, mod.d, joinSections(mod.sections)),
      metadata_json: buildMeta(mod, 'module'),
    })
    const subs = (mod as Item & { subModules?: Item[] }).subModules
    if (subs?.length) {
      for (const sub of subs) {
        items.push({
          id: sub.id,
          content_type: 'module',
          title: sub.title ?? String(sub.n ?? sub.id),
          short_desc: sub.short ?? '',
          content_text: str(sub.title, sub.short, sub.buyer, sub.scenario, sub.sa, sub.d, joinSections(sub.sections)),
          metadata_json: buildMeta(sub, 'module'),
        })
      }
    }
  }

  for (const arch of ARCH) {
    items.push({
      id: arch.id,
      content_type: 'arch',
      title: arch.title ?? String(arch.n ?? arch.id),
      short_desc: arch.sum ?? arch.short ?? '',
      content_text: str(arch.n, arch.title, arch.sum, arch.short, arch.sa, arch.d, joinSections(arch.sections)),
      metadata_json: buildMeta(arch, 'arch'),
    })
  }

  for (const p of PERSONAS) {
    items.push({
      id: p.id,
      content_type: 'persona',
      title: p.title ?? p.id,
      short_desc: p.short ?? '',
      content_text: str(p.title, p.role, p.short, p.sa, p.d, joinSections(p.sections)),
      metadata_json: buildMeta(p, 'persona'),
    })
  }

  for (const c of COMPS) {
    items.push({
      id: c.id,
      content_type: 'competitor',
      title: String(c.n ?? c.id),
      short_desc: c.str ?? '',
      content_text: str(c.n, c.str, c.adv, c.wo, c.sa, c.d, joinSections(c.sections)),
      metadata_json: buildMeta(c, 'competitor'),
    })
  }

  for (const item of [...RELAY_AI.platform, ...RELAY_AI.agents, ...RELAY_AI.features]) {
    items.push({
      id: item.id,
      content_type: 'relay_ai',
      title: item.title ?? item.id,
      short_desc: item.short ?? '',
      content_text: str(item.title, item.b, item.short, item.d, joinSections(item.sections)),
      metadata_json: buildMeta(item, 'relay_ai'),
    })
  }

  for (const stage of SDLC_STAGES) {
    items.push({
      id: stage.id,
      content_type: 'sdlc',
      title: stage.title ?? stage.id,
      short_desc: stage.short ?? '',
      content_text: str(stage.title, stage.short, stage.d, joinSections(stage.sections)),
      metadata_json: buildMeta(stage, 'sdlc'),
    })
  }

  for (const group of DISC) {
    const id = discId(group.title)
    const questionsText = (group.qs as { q: string; why: string; fu: string }[])
      .map(q => `Q: ${q.q} WHY: ${q.why} FU: ${q.fu}`)
      .join(' | ')
    items.push({
      id,
      content_type: 'disc_group',
      title: group.title,
      short_desc: '',
      content_text: str(group.title, questionsText),
      metadata_json: JSON.stringify({ id, title: group.title, content_type: 'disc_group', qs: group.qs }),
    })
  }

  for (const path of DISCOVERY_PATHS) {
    const stepsText = path.steps.map((s, i) => `Step ${i + 1}: ${s.prompt} | Why: ${s.why} | Next: ${s.hintNext}`).join(' || ')
    items.push({
      id: `path-${path.stageId}`,
      content_type: 'discovery_path',
      title: path.title,
      short_desc: `Constraint-first path for ${path.stageId}`,
      content_text: str(path.title, path.stageId, stepsText),
      metadata_json: JSON.stringify({ id: `path-${path.stageId}`, stageId: path.stageId, content_type: 'discovery_path' }),
    })
  }

  for (const o of OBJECTIONS) {
    items.push({
      id: o.id,
      content_type: 'objection',
      title: o.title,
      short_desc: o.theme,
      content_text: str(o.title, o.theme, o.trap, o.strongAnswer, o.coachTips, ...(o.personaIds || []), ...(o.moduleIds || [])),
      metadata_json: JSON.stringify({ id: o.id, theme: o.theme, personaIds: o.personaIds, moduleIds: o.moduleIds, content_type: 'objection' }),
    })
  }

  return items
}

/** content_items.id is a global PK. Module/SDLC and competitor/account share
 *  short ids (code, build, secure, deploy, datadog). Keep the first writer’s
 *  id; namespace later collisions as `${content_type}:${id}` so re-seeds do
 *  not silently drop rows (dry-run 107 vs DB 102). */
function uniquifySeedIds(items: SeedItem[]): { items: SeedItem[]; collisions: string[] } {
  const seen = new Set<string>()
  const collisions: string[] = []
  const out = items.map(it => {
    if (!seen.has(it.id)) {
      seen.add(it.id)
      return it
    }
    const nid = `${it.content_type}:${it.id}`
    if (seen.has(nid)) {
      throw new Error(`Seed id still colliding after namespace: ${nid}`)
    }
    collisions.push(`${it.content_type} '${it.id}' → '${nid}'`)
    seen.add(nid)
    let meta = it.metadata_json
    try {
      const parsed = JSON.parse(meta) as Record<string, unknown>
      parsed.id = nid
      meta = JSON.stringify(parsed)
    } catch { /* keep original meta */ }
    return { ...it, id: nid, metadata_json: meta }
  })
  return { items: out, collisions }
}

function countByType(items: SeedItem[]): Record<string, number> {
  const counts: Record<string, number> = {}
  for (const it of items) counts[it.content_type] = (counts[it.content_type] || 0) + 1
  return counts
}

async function embedBatch(texts: string[]): Promise<number[][]> {
  const apiKey = process.env.VOYAGE_API_KEY
  if (!apiKey) throw new Error('VOYAGE_API_KEY not set in .env.local')

  const res = await fetch('https://api.voyageai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ model: 'voyage-3-lite', input: texts }),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Voyage API ${res.status}: ${text}`)
  }

  const data = await res.json() as { data: { embedding: number[] }[] }
  return data.data.map(d => d.embedding)
}

const DDL = `
CREATE TABLE IF NOT EXISTS content_items (
  id             TEXT PRIMARY KEY,
  content_type   TEXT NOT NULL,
  title          TEXT,
  short_desc     TEXT,
  content_text   TEXT NOT NULL,
  metadata_json  TEXT NOT NULL,
  embedding      F32_BLOB(512),
  created_at     INTEGER NOT NULL DEFAULT (unixepoch()),
  updated_at     INTEGER NOT NULL DEFAULT (unixepoch())
);

CREATE INDEX IF NOT EXISTS idx_content_embedding
  ON content_items (libsql_vector_idx(embedding, 'metric=cosine'));

CREATE TABLE IF NOT EXISTS user_progress (
  user_id        TEXT NOT NULL,
  item_id        TEXT NOT NULL,
  visited        INTEGER NOT NULL DEFAULT 0,
  last_visit     INTEGER,
  msg_count      INTEGER NOT NULL DEFAULT 0,
  mastery_ready  INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (user_id, item_id)
);

CREATE TABLE IF NOT EXISTS chat_history (
  id            TEXT PRIMARY KEY,
  user_id       TEXT NOT NULL,
  item_id       TEXT NOT NULL,
  mode          TEXT NOT NULL,
  messages_json TEXT NOT NULL,
  created_at    INTEGER NOT NULL DEFAULT (unixepoch()),
  updated_at    INTEGER NOT NULL DEFAULT (unixepoch())
);

CREATE INDEX IF NOT EXISTS idx_chat_user ON chat_history (user_id, item_id);

CREATE TABLE IF NOT EXISTS call_history (
  id            TEXT PRIMARY KEY,
  user_id       TEXT NOT NULL,
  title         TEXT NOT NULL,
  account       TEXT,
  contact       TEXT,
  call_type     TEXT,
  modules_json  TEXT,
  messages_json TEXT NOT NULL,
  mod_suffix    TEXT,
  created_at    INTEGER NOT NULL DEFAULT (unixepoch())
);

CREATE INDEX IF NOT EXISTS idx_call_user ON call_history (user_id);

CREATE VIRTUAL TABLE IF NOT EXISTS content_fts USING fts5(
  id UNINDEXED,
  title,
  short_desc,
  content_text,
  content='content_items',
  content_rowid='rowid'
);
`

async function main() {
  const built = buildAllItems()
  const { items: all, collisions } = uniquifySeedIds(built)
  const counts = countByType(all)
  console.log(`Built ${built.length} seed items → ${all.length} unique ids`)
  console.log('by content_type:', counts)
  if (collisions.length) {
    console.log(`Resolved ${collisions.length} id collision(s):`)
    for (const c of collisions) console.log('  ·', c)
  }

  if (DRY_RUN) {
    for (const it of all.slice(0, 5)) {
      console.log('---', it.content_type, it.id)
      console.log(it.content_text.slice(0, 240))
    }
    console.log(`(dry-run) ${all.length} items total`)
    return
  }

  const url = process.env.TURSO_DATABASE_URL
  const token = process.env.TURSO_AUTH_TOKEN
  if (!url || !token) throw new Error('TURSO_DATABASE_URL and TURSO_AUTH_TOKEN required')

  const httpUrl = url.startsWith('libsql://') ? url.replace('libsql://', 'https://') : url
  const db = createClient({ url: httpUrl, authToken: token })

  for (const stmt of DDL.split(';').map(s => s.trim()).filter(Boolean)) {
    await db.execute(stmt)
  }

  // Drop vector index before wiping rows — DELETE+reinsert with a live
  // diskANN index can leave shadow rows corrupt ("failed to insert shadow row").
  // Rebuild the index after all embeddings are written.
  try { await db.execute('DROP INDEX IF EXISTS idx_content_embedding') } catch { /* may not exist */ }
  try { await db.execute('DROP TABLE IF EXISTS idx_content_embedding_shadow') } catch { /* may not exist */ }
  await db.execute('DELETE FROM content_items')
  try { await db.execute('DELETE FROM content_fts') } catch { /* fts may rebuild */ }

  const BATCH = 32
  for (let i = 0; i < all.length; i += BATCH) {
    const batch = all.slice(i, i + BATCH)
    const embeddings = await embedBatch(batch.map(b => b.content_text.slice(0, 8000)))
    for (let j = 0; j < batch.length; j++) {
      const it = batch[j]
      const emb = embeddings[j]
      await db.execute({
        sql: `INSERT INTO content_items (id, content_type, title, short_desc, content_text, metadata_json, embedding)
              VALUES (?, ?, ?, ?, ?, ?, vector32(?))
              ON CONFLICT(id) DO UPDATE SET
                content_type=excluded.content_type,
                title=excluded.title,
                short_desc=excluded.short_desc,
                content_text=excluded.content_text,
                metadata_json=excluded.metadata_json,
                embedding=excluded.embedding,
                updated_at=unixepoch()`,
        args: [it.id, it.content_type, it.title, it.short_desc, it.content_text, it.metadata_json, JSON.stringify(emb)],
      })
      await db.execute({
        sql: `INSERT INTO content_fts (id, title, short_desc, content_text) VALUES (?, ?, ?, ?)`,
        args: [it.id, it.title, it.short_desc, it.content_text],
      }).catch(() => {/* some turso setups sync fts via triggers */})
    }
    console.log(`Seeded ${Math.min(i + BATCH, all.length)} / ${all.length}`)
  }

  await db.execute(
    `CREATE INDEX IF NOT EXISTS idx_content_embedding
       ON content_items (libsql_vector_idx(embedding, 'metric=cosine'))`,
  )
  try { await db.execute('REINDEX idx_content_embedding') } catch (e) {
    console.warn('REINDEX skipped:', e instanceof Error ? e.message : e)
  }

  const verify = await db.execute(
    'SELECT content_type, COUNT(*) AS n FROM content_items GROUP BY content_type ORDER BY content_type',
  )
  console.log('DB counts by content_type:', verify.rows)
  const total = await db.execute('SELECT COUNT(*) AS n FROM content_items')
  console.log(`Seed complete ✓ — ${total.rows[0]?.n ?? '?'} rows`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
