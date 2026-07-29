---
name: test-policy-by-maturity
description: >
  Calibrates how much testing a change deserves to the maturity of the
  repo it lands in. Trigger after implementing a behavior change, when
  deciding whether to write tests, or when tempted to introduce test
  infrastructure. Do not trigger when the repo's CLAUDE.md states an
  explicit testing convention — defer to that instead.
---

# Test policy by maturity

Repos in this fleet range from throwaway scripts to maintained projects.
The failure modes are symmetric: scaffolding a test framework onto a
script repo wastes the session, and shipping untested behavior changes
into a mature repo erodes the suite that makes future changes safe.
Classify first, then apply the matching policy.

## Classify the repo (30 seconds)

- **Throwaway**: no tests directory, no CI, no test runner configured.
- **Growing**: some tests exist, CI runs them, coverage is partial.
- **Mature**: test suite gates merges; conventions are visible in the
  existing tests.

## Policy per tier

- **Throwaway**: write no tests and introduce no test infrastructure.
  Verify manually per verification-standards and record the evidence in
  the commit or PR instead.
- **Growing**: test the behavior you changed, in the style and framework
  already present. Don't backfill coverage for code you didn't touch.
- **Mature**: behavior changes require tests; every bug fix gets a
  regression test that fails before the fix and passes after. Match the
  suite's existing patterns exactly.

## Hard rules across all tiers

- Never introduce a new test framework in a PR that isn't about testing.
  If the repo needs one, that's its own PR, proposed first.
- Test behavior at boundaries (inputs, outputs, contracts), not
  implementation details — tests coupled to internals punish the next
  refactor.
- A repo that graduates a tier (a script repo growing real users) is
  worth flagging to the user; don't silently promote it yourself.
