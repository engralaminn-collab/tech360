import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { getAgentRuntimeStatus } from '../src/lib/agent-runtime-status'

describe('agent runtime availability', () => {
  it('recognizes the shared gateway used first by the execution engine', () => {
    const status = getAgentRuntimeStatus({
      AI_GATEWAY_BASE_URL: 'https://ai.example.test',
      AGENTOS_GATEWAY_TOKEN: 'gateway-token',
      OPENROUTER_API_KEY: 'openrouter-token',
    })
    assert.equal(status.configured, true)
    assert.equal(status.provider, 'AI_GATEWAY')
    assert.equal(status.state, 'CONFIGURED')
  })

  it('recognizes OpenRouter when the shared gateway is not configured', () => {
    const status = getAgentRuntimeStatus({ OPENROUTER_API_KEY: 'openrouter-token' })
    assert.equal(status.configured, true)
    assert.equal(status.provider, 'OPENROUTER')
    assert.equal(status.state, 'CONFIGURED')
  })

  it('recognizes a valid direct ZAI provider configuration', () => {
    const status = getAgentRuntimeStatus({
      ZAI_BASE_URL: 'https://zai.example.test/v1',
      ZAI_API_KEY: 'zai-token',
    })
    assert.equal(status.configured, true)
    assert.equal(status.provider, 'ZAI')
  })

  it('reports no provider when no executable provider is configured', () => {
    const status = getAgentRuntimeStatus({})
    assert.equal(status.configured, false)
    assert.equal(status.provider, 'NONE')
    assert.equal(status.state, 'NOT_CONFIGURED')
  })

  it('preserves a misconfigured direct ZAI state rather than claiming availability', () => {
    const status = getAgentRuntimeStatus({ ZAI_API_KEY: 'zai-token' })
    assert.equal(status.configured, false)
    assert.equal(status.provider, 'NONE')
    assert.equal(status.state, 'MISCONFIGURED')
  })
})
