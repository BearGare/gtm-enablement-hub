/**
 * Fails if non-canonical Relay names or Harness capability vocabulary appear
 * in product source / root docs. See docs/NAMING.md.
 *
 * Run: npm run check:naming
 */
import { readFileSync, readdirSync, statSync } from 'fs'
import { join } from 'path'

const ROOT = process.cwd()

const SCAN_DIRS = [join(ROOT, 'src')]
const EXTRA = [
  'README.md',
  'AGENTS.md',
  'CLAUDE.md',
  'CHANGELOG.md',
  'ROADMAP.md',
  'docs/DEV_SETUP.md',
  'index.html',
  'package.json',
]

/** Forbidden product / capability strings (case-sensitive where noted). */
const FORBIDDEN: { name: string; re: RegExp }[] = [
  // Non-canonical Relay module names
  { name: 'Relay Build', re: /\bRelay Build\b/ },
  { name: 'Relay Deploy', re: /\bRelay Deploy\b/ },
  { name: 'Relay Verify', re: /\bRelay Verify\b/ },
  { name: 'Relay Observe', re: /\bRelay Observe\b/ },
  { name: 'Relay Reliability', re: /\bRelay Reliability\b/ },
  { name: 'Relay AI SRE', re: /\bRelay AI SRE\b/ },
  { name: 'Relay Cloud Cost', re: /\bRelay Cloud Costs?\b|\bRelay Cloud Cost Management\b/ },
  { name: 'Relay Engineering Insights', re: /\bRelay Engineering Insights\b/ },
  { name: 'Relay SEI', re: /\bRelay SEI\b/ },
  { name: 'Relay Artifact Registry', re: /\bRelay Artifact Registry\b/ },
  { name: 'Relay IaCM', re: /\bRelay IaCM\b/ },
  { name: 'Relay AST', re: /\bRelay AST\b/ },
  { name: 'Relay WAAP', re: /\bRelay WAAP\b/ },
  { name: 'Relay Chaos Engineering', re: /\bRelay Chaos Engineering\b/ },
  { name: 'Relay Resilience Testing', re: /\bRelay Resilience Testing\b/ },
  { name: 'Relay CE', re: /\bRelay CE\b/ },
  { name: 'Relay CV', re: /\bRelay CV\b/ },
  { name: 'Relay Plan (singular)', re: /\bRelay Plan\b(?!s)/ },
  { name: 'Chimera', re: /\bChimera\b/i },
  // Loop framing
  { name: 'inner loop', re: /\binner[- ]loop\b/i },
  { name: 'outer loop', re: /\bouter[- ]loop\b/i },
  // Harness capability vocabulary
  { name: 'Test Intelligence', re: /\bTest Intelligence\b/ },
  { name: 'Continuous Verification', re: /\bContinuous Verification\b/ },
  { name: 'AutoStopping', re: /\bAutoStopping\b/ },
  { name: 'AI Scribe', re: /\bAI Scribe\b/ },
  { name: 'delegate model', re: /\bdelegate model\b/i },
  { name: 'Software Delivery Knowledge Graph', re: /\bSoftware Delivery Knowledge Graph\b/ },
  { name: 'AI Context Graph', re: /\bAI Context Graph\b/ },
  { name: 'Relay AI Development Assistant', re: /\bRelay AI Development Assistant\b/ },
  { name: 'Jyoti Bansal', re: /\bJyoti Bansal\b/ },
  { name: 'AIDA', re: /\bAIDA\b/ },
  { name: 'Trellis Score', re: /\bTrellis Score\b/ },
  { name: 'ChaosGuard', re: /\bChaosGuard\b/ },
  { name: 'Gitspaces', re: /\bGitspaces\b/ },
  { name: 'Traceable', re: /\bTraceable\b/ },
]

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
  ...SCAN_DIRS.flatMap(d => walk(d)),
  ...EXTRA.map(f => join(ROOT, f)).filter(f => {
    try { statSync(f); return true } catch { return false }
  }),
]

let hits = 0
for (const file of files) {
  let text: string
  try { text = readFileSync(file, 'utf-8') } catch { continue }
  for (const { name, re } of FORBIDDEN) {
    const m = text.match(re)
    if (m) {
      hits++
      const line = text.slice(0, m.index).split('\n').length
      console.error(`NAMING [${name}] ${file}:${line} → ${m[0]}`)
    }
  }
}

if (hits) {
  console.error(`\ncheck:naming FAILED — ${hits} hit(s). See docs/NAMING.md`)
  process.exit(1)
}
console.log('check:naming PASS ✓')
