import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'

const source = readFileSync('src/app/api/admin/factory/apps/route.ts', 'utf8')

test('factory creation checks project ownership and rejects orphan project links', () => {
  assert.match(source, /projectId && !clientId/)
  assert.match(source, /id: projectId, clientId: clientId!, deletedAt: null/)
  assert.match(source, /Project not found for this client/)
})

test('factory scaffold, files and initial event are written in a transaction', () => {
  assert.match(source, /db\.\$transaction\(async \(tx\)/)
  for (const write of ['generatedApp.create', 'generatedAppFile.createMany', 'generatedAppEvent.create']) {
    assert.ok(source.includes(`tx.${write}`), `${write} must use the transaction`)
  }
  assert.doesNotMatch(source, /generatedApp\.count\(/)
  assert.match(source, /randomUUID\(\)/)
})
