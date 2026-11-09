import { getZaiProviderStatus } from '@/lib/ai-provider'
import { gatewayConfigured } from '@/lib/ai-gateway/client'
import { openRouterConfigured } from '@/lib/agents/model-provider'

export type AgentRuntimeStatus = {
  state: 'CONFIGURED' | 'NOT_CONFIGURED' | 'MISCONFIGURED'
  configured: boolean
  provider: 'AI_GATEWAY' | 'OPENROUTER' | 'ZAI' | 'NONE'
  detail: string
}

/**
 * Report the provider chain actually used by runAgent():
 * shared gateway -> OpenRouter -> direct ZAI.
 * Keep chat availability and public health aligned with execution.
 */
export function getAgentRuntimeStatus(
  env: Record<string, string | undefined> = process.env,
): AgentRuntimeStatus {
  if (gatewayConfigured(env)) {
    return {
      state: 'CONFIGURED',
      configured: true,
      provider: 'AI_GATEWAY',
      detail: 'Shared AI Gateway configuration is present',
    }
  }

  if (openRouterConfigured(env)) {
    return {
      state: 'CONFIGURED',
      configured: true,
      provider: 'OPENROUTER',
      detail: 'OpenRouter provider configuration is present',
    }
  }

  const zai = getZaiProviderStatus(env)
  return {
    state: zai.state,
    configured: zai.configured,
    provider: zai.configured ? 'ZAI' : 'NONE',
    detail: zai.detail,
  }
}
