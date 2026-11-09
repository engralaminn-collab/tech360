import { strict as assert } from 'node:assert'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import { createEvolutionReviewPacket } from '../src/lib/agents/evolution/preflight'

const baseCommit = 'a'.repeat(40)
const patch = 'diff --git a/src/lib/agents/a.ts b/src/lib/agents/a.ts\n+example\n'

test('review packet hashes exact bytes, is non-executable, and does not echo source', () => {
  const result = createEvolutionReviewPacket({ baseCommit, proposal: 'Improve agent code safely', patch })
  assert.equal(result.patchSha256, createHash('sha256').update(patch).digest('hex'))
  assert.equal(result.patchBytes, Buffer.byteLength(patch))
  assert.equal(result.executable, false)
  assert.equal(result.status, 'REVIEW_ONLY')
  assert.ok(!JSON.stringify(result).includes(patch))
})

test('rejects unbounded and malformed input without interpreting patches', () => {
  for (const data of [null, {}, { baseCommit: 'main', proposal: 'Improve agent code safely', patch }, { baseCommit, proposal: 'short', patch }, { baseCommit, proposal: 'Improve agent code safely', patch: 'x'.repeat(48001) }, { baseCommit, proposal: 'Improve agent code safely', patch, extra: true }]) {
    assert.throws(() => createEvolutionReviewPacket(data))
  }
  // Even a malicious path gets no execution permission: this is not a patch validator.
  assert.equal(createEvolutionReviewPacket({ baseCommit, proposal: 'Attempt protected change', patch: '--- a/../../secret' }).executable, false)
})

test('review endpoint uses super-admin guard and caps request streams', () => {
  const source = readFileSync('src/app/api/admin/agents/evolution/preflight/route.ts', 'utf8')
  assert.match(source, /minRole: 'SUPER_ADMIN'/)
  assert.match(source, /MAX_BODY_BYTES/)
  assert.match(source, /private, no-store/)
  assert.doesNotMatch(source, /child_process|writeFile|spawn\(/)
})
