---
name: debugging-method
description: >
  Reproduce-first, one-variable-at-a-time debugging discipline. Trigger
  when investigating a bug, regression, or unexplained failing behavior,
  and again whenever a fix attempt has already failed once. Do not
  trigger for mechanical failures with a self-evident cause (typo,
  missing import, unambiguous compiler error).
---

# Debugging method

Prompted in natural language, the cheap path is to pattern-match the
symptom and patch what it resembles. That produces fixes that don't fix.
The discipline below is what prevents it.

## The loop

1. **Reproduce before changing anything.** No repro means no way to know
   the fix worked. If reproduction is genuinely impossible (prod-only,
   timing-dependent), say so and treat every subsequent step as a
   hypothesis, labeled as such.
2. **Reduce.** Shrink the repro until removing anything makes the bug
   disappear. The minimal repro usually names the culprit.
3. **Hypothesize explicitly.** State what you think is wrong and what
   observation would falsify it. Test the cheapest-to-falsify hypothesis
   first, not the most interesting one.
4. **One variable per change.** When two hypotheses tie, instrument
   (logs, debugger, bisect) rather than guessing — evidence is cheaper
   than iteration.
5. **Claim "fixed" only on fail-then-pass** of the original repro, per
   verification-standards.

## Hard rules

- After two failed fix attempts, stop patching. The diagnosis is wrong,
  not the patches — return to step 1 and re-derive from the evidence,
  discarding the current theory entirely.
- Never stack speculative fixes ("changed three things, one of them
  worked"). Revert what didn't contribute before committing.
- `git bisect` beats reasoning when a regression has a known-good past;
  reach for it as soon as "it used to work" is established.
- After the fix: ask what else the same root cause touches, and add the
  regression test if the repo's test tier warrants it (per
  test-policy-by-maturity).
