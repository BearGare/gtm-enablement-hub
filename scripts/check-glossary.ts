/**
 * Glossary integrity checks.  Run:  npm run check:glossary
 *
 * Guards silent-failure classes in glossary auto-link aliasing: the `add(alias,
 * canonical)` helper no-ops when its canonical isn't a real glossary key, so a
 * term rename can drop an abbreviation link with no error. These checks make
 * that (and related drift) fail loudly.
 *
 *   1. FAIL  broken alias        — add("x","y") where "y" is not a glossary key
 *   2. FAIL  missing bare abbr   — an "ABBR (Full Name)" term with no resolvable
 *                                  bare-abbreviation key
 *   3. WARN  UPPERCASE_ONLY drift — a short (<=4) caps abbreviation not gated to
 *                                  caps-only in App.tsx (npm is an intentional
 *                                  lowercase exception, hence warn, not fail)
 */
import { readFileSync } from 'fs'
import { GLOSSARY, GLOSSARY_LOOKUP } from '../src/data.ts'

const root = process.cwd()
const dataSrc = readFileSync(`${root}/src/data.ts`, 'utf8')
const appSrc = readFileSync(`${root}/src/App.tsx`, 'utf8')

let failures = 0
let warnings = 0
const fail = (msg: string) => { console.error('✗ ' + msg); failures++ }
const warn = (msg: string) => { console.warn('⚠ ' + msg); warnings++ }

// 1. Broken aliases — every add("alias","canonical") must reference an existing key.
//    Walk in source order so an alias added earlier can be a canonical for a later one.
const validKeys = new Set<string>()
for (const cat of GLOSSARY) for (const t of cat.terms) validKeys.add(t.term.toLowerCase())
dataSrc.split('\n').forEach((line, i) => {
  const m = line.match(/add\("([^"]*)","([^"]*)"\)/)
  if (!m) return
  const [, alias, canonical] = m
  if (validKeys.has(canonical)) validKeys.add(alias)
  else fail(`data.ts:${i + 1} broken alias add("${alias}","${canonical}") — canonical is not a glossary key`)
})

// 2. Every "ABBR (Full Name)" term (uppercase abbreviation) must resolve by its bare abbr.
for (const cat of GLOSSARY) for (const t of cat.terms) {
  const m = t.term.match(/^([A-Z0-9&]{2,6})\s*\(/)
  if (m) {
    const ab = m[1].toLowerCase()
    if (!GLOSSARY_LOOKUP[ab]) fail(`term "${t.term}" has no bare-abbreviation key "${ab}" — add an alias in GLOSSARY_LOOKUP`)
  }
}

// 3. UPPERCASE_ONLY drift — short caps abbreviations that aren't gated to caps-only
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
console.log(`Result: ${failures === 0 ? 'PASS ✓' : failures + ' failure(s) ✗'}${warnings ? `  (${warnings} warning(s))` : ''}`)
process.exit(failures === 0 ? 0 : 1)
