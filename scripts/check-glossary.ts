/**
 * Glossary integrity checks.  Run:  npm run check:glossary
 *
 * Guards silent-failure classes in glossary auto-link aliasing: alias maps in
 * `src/data/glossary.ts` no-op when a canonical isn't a real glossary key, so a
 * term rename can drop an abbreviation link with no error. These checks make
 * that (and related drift) fail loudly.
 *
 *   1. FAIL  broken alias / plural — Record entry whose canonical is not a term
 *   2. FAIL  missing bare abbr   — an "ABBR (Full Name)" term with no resolvable
 *                                  bare-abbreviation key
 *   3. FAIL  broken battlecard   — seeAlso "… battlecard" stem matches no COMPS
 *   4. WARN  UPPERCASE_ONLY drift — a short (<=4) caps abbreviation not gated to
 *                                  caps-only in App.tsx (npm is an intentional
 *                                  lowercase exception, hence warn, not fail)
 */
import { readFileSync } from 'fs'
import { GLOSSARY, GLOSSARY_LOOKUP } from '../src/data.ts'
import { COMPS } from '../src/data/comps.ts'

const root = process.cwd()
const glossarySrc = readFileSync(`${root}/src/data/glossary.ts`, 'utf8')
const appSrc = readFileSync(`${root}/src/App.tsx`, 'utf8')

let failures = 0
let warnings = 0
const fail = (msg: string) => { console.error('✗ ' + msg); failures++ }
const warn = (msg: string) => { console.warn('⚠ ' + msg); warnings++ }

const termKeys = new Set<string>()
for (const cat of GLOSSARY) for (const t of cat.terms) termKeys.add(t.term.toLowerCase())

/** Extract `"alias": "Canonical"` pairs from the first matching `const name = { … }` block. */
function parseStringRecord(src: string, constName: string): Array<{ alias: string; canonical: string; line: number }> {
  const startRe = new RegExp(`const ${constName}:\\s*Record<string,\\s*string>\\s*=\\s*\\{`)
  const start = src.search(startRe)
  if (start < 0) return []
  const brace = src.indexOf('{', start)
  let depth = 0
  let end = -1
  for (let i = brace; i < src.length; i++) {
    if (src[i] === '{') depth++
    else if (src[i] === '}') {
      depth--
      if (depth === 0) { end = i; break }
    }
  }
  if (end < 0) return []
  const block = src.slice(brace + 1, end)
  const blockStartLine = src.slice(0, brace).split('\n').length
  const out: Array<{ alias: string; canonical: string; line: number }> = []
  const lineOffset = blockStartLine
  block.split('\n').forEach((line, i) => {
    const m = line.match(/^\s*(?:(\w+)|"([^"]+)")\s*:\s*"([^"]*)"/)
    if (!m) return
    const alias = m[1] ?? m[2]
    const canonical = m[3]
    out.push({ alias, canonical, line: lineOffset + i })
  })
  return out
}

// 1. Broken aliases / plurals — every canonical must be a glossary term key.
const aliasEntries = [
  ...parseStringRecord(glossarySrc, 'aliases'),
  ...parseStringRecord(glossarySrc, 'plurals'),
]
if (aliasEntries.length === 0) {
  fail('could not parse aliases/plurals Records in src/data/glossary.ts')
}
for (const { alias, canonical, line } of aliasEntries) {
  if (!termKeys.has(canonical.toLowerCase())) {
    fail(`glossary.ts:${line} broken alias "${alias}" → "${canonical}" — canonical is not a glossary term`)
  }
}

// 2. Every "ABBR (Full Name)" term (uppercase abbreviation) must resolve by its bare abbr.
for (const cat of GLOSSARY) for (const t of cat.terms) {
  const m = t.term.match(/^([A-Z0-9&]{2,6})\s*\(/)
  if (m) {
    const ab = m[1].toLowerCase()
    if (!GLOSSARY_LOOKUP[ab]) fail(`term "${t.term}" has no bare-abbreviation key "${ab}" — add an alias in GLOSSARY_LOOKUP`)
  }
}

// 3. Broken battlecard seeAlso — stem must match a COMPS n or id.
const compKeys = new Set<string>()
for (const c of COMPS) {
  compKeys.add(c.id.toLowerCase())
  if (c.n) compKeys.add(String(c.n).toLowerCase())
}
for (const cat of GLOSSARY) for (const t of cat.terms) {
  if (!t.seeAlso) continue
  for (const part of t.seeAlso.split(', ')) {
    const lo = part.toLowerCase()
    if (!lo.endsWith(' battlecard')) continue
    const stem = lo.slice(0, -' battlecard'.length).trim()
    if (!compKeys.has(stem)) {
      fail(`term "${t.term}" seeAlso "${part}" — no COMPS item with n/id "${stem}"`)
    }
  }
}

// 4. UPPERCASE_ONLY drift — short caps abbreviations that aren't gated to caps-only
//    would wrongly link in lowercase prose. Warn (not fail): npm/some forms are
//    intentionally lowercase-linkable.
const uoMatch = appSrc.match(/UPPERCASE_ONLY=new Set\(\[([^\]]*)\]\)/)
const upperOnly = new Set((uoMatch?.[1] ?? '').match(/"([^"]+)"/g)?.map(s => s.replace(/"/g, '')) ?? [])
if (!uoMatch) warn('could not locate UPPERCASE_ONLY in App.tsx — skipping caps-gating check')
for (const cat of GLOSSARY) for (const t of cat.terms) {
  const m = t.term.match(/^([A-Z0-9&]{2,4})\s*\(/)
  if (m) {
    const ab = m[1].toLowerCase()
    if (uoMatch && !upperOnly.has(ab)) warn(`abbreviation "${ab}" (from "${t.term}") is <=4 chars but not in UPPERCASE_ONLY — confirm it's meant to link in lowercase`)
  }
}

const termCount = GLOSSARY.reduce((n, c) => n + c.terms.length, 0)
console.log(`\nGlossary: ${termCount} terms, ${Object.keys(GLOSSARY_LOOKUP).length} lookup keys`)
console.log(`Aliases checked: ${aliasEntries.length}`)
console.log(`Result: ${failures === 0 ? 'PASS ✓' : failures + ' failure(s) ✗'}${warnings ? `  (${warnings} warning(s))` : ''}`)
process.exit(failures === 0 ? 0 : 1)
