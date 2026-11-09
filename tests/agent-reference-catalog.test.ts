import { strict as assert } from 'node:assert'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import { AGENT_REFERENCES, searchAgentReferences } from '../src/lib/agents/reference-catalog'

test('all distinct shared repositories are discoverable without claiming integration', () => {
  assert.equal(AGENT_REFERENCES.length, 33)
  assert.equal(new Set(AGENT_REFERENCES.map((x) => x.repository.toLowerCase())).size, 33)
  assert.ok(AGENT_REFERENCES.every((x) => x.status === 'NOT_INTEGRATED'))
  assert.equal(searchAgentReferences('MORLUTO/REA')[0]?.repository, 'morluto/rea')
  assert.ok(searchAgentReferences('voice').length >= 2)
  assert.deepEqual(searchAgentReferences('not-a-repository-or-capability'), [])
})

test('reference API requires super admin and exposes no mutation methods', () => {
  const route = readFileSync('src/app/api/admin/agents/reference-catalog/route.ts', 'utf8')
  assert.match(route, /minRole: 'SUPER_ADMIN'/)
  assert.match(route, /private, no-store/)
  assert.doesNotMatch(route, /export async function (POST|PUT|PATCH|DELETE)/)
})
