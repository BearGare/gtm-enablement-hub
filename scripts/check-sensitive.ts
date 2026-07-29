/**
 * Scans source content for private/employer markers that must not ship
 * in the external demo. Exit 1 on any HIGH hit.
 *
 * Run: npm run check:sensitive
 */
import { readFileSync, readdirSync, statSync } from 'fs'
import { join } from 'path'

const ROOT = join(process.cwd(), 'src')
const EXTRA = [
  'README.md',
  'DEMO_SCRIPT.md',
  'INTERVIEW_HANDOFF.md',
  'HUMAN_REVIEW.md',
  'AGENTS.md',
  'CLAUDE.md',
  'SANITISATION_LOG.md',
  'CHANGELOG.md',
  'index.html',
  'package.json',
]

/** Patterns that indicate private or employer-bound content remaining. */
const HIGH: { name: string; re: RegExp }[] = [
  { name: 'Harness brand', re: /\bHarness\b/i },
  { name: 'Internal GPP', re: /Internal GPP/i },
  { name: 'Glasswing', re: /Glasswing/i },
  { name: 'Deutsche Bank aside', re: /Deutsche Bank/i },
  { name: 'ELA deal language', re: /\bELA\b/ },
  { name: 'sales ops pricing verify', re: /verify with (?:your )?manager|verify current pricing with sales ops/i },
  { name: 'from internal battlecard', re: /from internal battlecard|May 2026 competitive intel/i },
  { name: 'Named private proofs', re: /\b(Lloyds Banking|NatWest|Victoria'?s Secret|Wells Fargo)\b/i },
  { name: 'Employer ARR/valuation pitch', re: /\$250M\+?\s*ARR|\$5\.5B valuation/i },
  { name: 'AIDI trademark', re: /\bAIDI\b/ },
  { name: 'CACM trademark', re: /\bCACM\b/ },
  { name: 'HLUs packaging', re: /\bHLUs?\b/ },
  { name: 'Traceable product', re: /\bTraceable\b/ },
  { name: 'old localStorage prefix', re: /\bhHub/ },
]

const ALLOW_FILES = new Set([
  'SANITISATION_LOG.md', // documents what was removed — may cite private markers
])

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name === 'dist') continue
    const p = join(dir, name)
    const st = statSync(p)
    if (st.isDirectory()) walk(p, out)
    else if (/\.(ts|tsx|js|jsx|md|html|json)$/.test(name)) out.push(p)
  }
  return out
}

const files = [
  ...walk(ROOT),
  ...EXTRA.map(f => join(process.cwd(), f)).filter(f => {
    try { statSync(f); return true } catch { return false }
  }),
]

let hits = 0
for (const file of files) {
  const base = file.split('/').pop() || ''
  if (ALLOW_FILES.has(base)) continue
  let text: string
  try { text = readFileSync(file, 'utf-8') } catch { continue }
  for (const { name, re } of HIGH) {
    const m = text.match(re)
    if (m) {
      hits++
      const line = text.slice(0, m.index).split('\n').length
      console.error(`HIGH [${name}] ${file}:${line} → ${m[0]}`)
    }
  }
}

if (hits) {
  console.error(`\ncheck:sensitive FAILED — ${hits} hit(s)`)
  process.exit(1)
}
console.log('check:sensitive PASS ✓')
