import { strict as assert } from 'node:assert'
import { existsSync, readFileSync } from 'node:fs'
import { test } from 'node:test'
import { EDUCATION_SOLUTIONS } from '../src/data/education-solutions'

test('education scope covers all requested institution types with local image assets', () => {
  assert.equal(new Set(EDUCATION_SOLUTIONS.map((item) => item.id)).size, 8)
  for (const id of ['school', 'college', 'madrasa', 'coaching', 'consultancy', 'english', 'admission-prep', 'job-prep']) {
    const item = EDUCATION_SOLUTIONS.find((entry) => entry.id === id)
    assert.ok(item)
    assert.ok(existsSync(`public${item.image}`), `${id} image missing`)
    assert.ok(item.programs && item.structure && item.facilities && item.workflow)
  }
})

test('education cards scroll without changing hash routing and label scopes as illustrative', () => {
  const source = readFileSync('src/components/site/EducationSolutions.tsx', 'utf8')
  assert.match(source, /scrollIntoView/)
  assert.match(source, /Illustrative solution scopes/)
  assert.doesNotMatch(source, /href=\{`#education-/)
})
