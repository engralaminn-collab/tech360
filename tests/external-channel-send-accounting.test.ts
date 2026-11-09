import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, it } from 'node:test'

const read = (path: string) => readFileSync(join(process.cwd(), path), 'utf8')
const orchestrator = read('src/lib/chat-orchestrator.ts')
const sms = read('src/app/api/webhooks/sms/route.ts')
const email = read('src/app/api/webhooks/email/route.ts')
const whatsapp = read('src/app/api/webhooks/whatsapp/route.ts')

describe('external communication delivery accounting', () => {
  it('suppresses AI when communication state is unavailable or human takeover is active', () => {
    const stateGuard = orchestrator.indexOf('const humanTakeoverActive =')
    const generation = orchestrator.indexOf('tryGenerateAiReply({')
    assert.ok(stateGuard >= 0 && generation > stateGuard, 'state guard must precede AI generation')
    assert.match(orchestrator, /if \(humanTakeoverActive\)[\s\S]*?else if \(aiAvailable\)/)
  })

  it('does not mark provider-facing messages SENT inside the AI orchestrator', () => {
    assert.match(orchestrator, /if \(input\.channel === 'WEB'\) \{[\s\S]*?status: 'SENT'/)
    assert.match(orchestrator, /if \(input\.channel === 'WEB'\) \{\s*await recordOutbound/)
  })

  it('records SMS outbound state only after provider acceptance', () => {
    const failed = sms.indexOf('if (!sendResult.result.ok)')
    const record = sms.indexOf('await recordOutbound(input.client.id')
    assert.ok(failed >= 0 && record > failed)
    assert.match(sms.slice(failed, record), /return/)
    assert.match(sms.slice(record), /outboundBody/)
  })

  it('records email outbound state only in the provider-success branch', () => {
    const failed = email.indexOf('if (!res.result.ok)')
    const accepted = email.indexOf('} else {', failed)
    const record = email.indexOf('await recordOutbound(clientRow.id', accepted)
    assert.ok(failed >= 0 && accepted > failed && record > accepted)
  })

  it('records WhatsApp outbound state only after provider acceptance', () => {
    const failed = whatsapp.indexOf('if (!sendRes.result.ok)')
    const record = whatsapp.indexOf('await recordOutbound(input.client.id')
    assert.ok(failed >= 0 && record > failed)
    assert.match(whatsapp.slice(failed, record), /return/)
  })
})
