import { strict as assert } from 'node:assert'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'

test('shared call to action and footer do not promise unverified response availability or universal payment terms', () => {
  const cta = readFileSync('src/components/site/CtaBand.tsx', 'utf8')
  const footer = readFileSync('src/components/site/SiteFooter.tsx', 'utf8')
  assert.doesNotMatch(cta, /before any payment decision/i)
  assert.doesNotMatch(footer, /24\/7 chat/i)
  assert.match(cta, /terms are agreed for each engagement/i)
})

test('homepage industry images use the local industry asset map', () => {
  const home = readFileSync('src/components/site/HomeView.tsx', 'utf8')
  assert.match(home, /industryImage\(industry\.slug\)/)
  assert.doesNotMatch(home, /imageFor\(industry\.imageKey\)/)
})
