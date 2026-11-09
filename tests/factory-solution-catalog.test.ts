import { strict as assert } from 'node:assert'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import { SOLUTION_CATALOG } from '../src/lib/factory/solution-catalog'

test('catalogue has distinct versioned scope concepts for requested sectors', () => {
  assert.equal(new Set(SOLUTION_CATALOG.map((item) => item.id)).size, SOLUTION_CATALOG.length)
  for (const id of ['hospital', 'clinic', 'dental', 'pharmacy', 'education-consultancy', 'school', 'college', 'madrasa', 'coaching', 'english-assessment', 'university-preparation', 'job-exam-preparation']) {
    const item = SOLUTION_CATALOG.find((entry) => entry.id === id)
    assert.ok(item, `missing ${id}`)
    assert.equal(item.status, 'DESIGN_ONLY')
    assert.match(item.version, /^\d+\.\d+\.\d+$/)
    assert.ok(item.personas.length && item.proposedModules.length)
  }
})

test('catalogue route is guarded, read-only, and not cached publicly', () => {
  const source = readFileSync('src/app/api/admin/factory/solution-catalog/route.ts', 'utf8')
  assert.match(source, /minRole: 'SUPER_ADMIN'/)
  assert.match(source, /private, no-store/)
  assert.doesNotMatch(source, /export async function (POST|PUT|PATCH|DELETE)/)
})
