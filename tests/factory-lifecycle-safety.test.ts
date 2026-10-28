import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { describe, it } from 'node:test'

import { FACTORY_UNSUPPORTED_ACTIONS, getUnsupportedFactoryAction } from '../src/lib/factory/lifecycle-policy'

describe('generated-app lifecycle safety', () => {
  it('blocks state-only build, preview, delivery, and handover claims', () => {
    for (const action of ['build', 'preview', 'deliver', 'handover']) {
      const policy = getUnsupportedFactoryAction(action)
      assert.ok(policy, `${action} must be disabled until a real integration exists`)
      assert.equal(policy.status, 501)
      assert.match(policy.message, /integrated|configured|not a verified build/i)
    }
  })

  it('refuses regeneration rather than deleting the current source snapshot', () => {
    assert.deepEqual(getUnsupportedFactoryAction('plan'), FACTORY_UNSUPPORTED_ACTIONS.plan)
    assert.equal(FACTORY_UNSUPPORTED_ACTIONS.plan.status, 409)

    const route = readFileSync('src/app/api/admin/factory/apps/[id]/route.ts', 'utf8')
    assert.doesNotMatch(route, /generatedAppFile\.deleteMany/)
  })

  it('requires an operator note for internal approval and failure records', () => {
    const route = readFileSync('src/app/api/admin/factory/apps/[id]/route.ts', 'utf8')
    assert.match(route, /action === 'approve' \|\| action === 'fail'/)
    assert.match(route, /Internal approval recorded by an operator/)
    assert.doesNotMatch(route, /Client approval recorded/)
  })

  it('does not write a delivered timestamp for generated-app status transitions', () => {
    const route = readFileSync('src/app/api/admin/factory/apps/[id]/route.ts', 'utf8')
    assert.doesNotMatch(route, /deliveredAt:\s*new Date\(\)/)
  })

  it('labels the UI as a source-scaffold tool and disclaims non-executed lifecycle steps', () => {
    const view = readFileSync('src/components/admin/FactoryView.tsx', 'utf8')
    assert.match(view, /stored source scaffold/i)
    assert.match(view, /does not provision, run CI, create a preview environment, deploy, or deliver/i)
    assert.match(view, /Manual lifecycle evidence only/i)
    assert.doesNotMatch(view, />Mark built</)
  })
})
