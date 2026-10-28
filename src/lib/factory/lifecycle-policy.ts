export const FACTORY_UNSUPPORTED_ACTIONS = {
  plan: {
    status: 409,
    message: 'Safe regeneration is disabled until generated-app releases are versioned. Existing source files were not changed.',
  },
  build: {
    status: 501,
    message: 'A CI/build runner is not integrated. The stored source scaffold is not a verified build.',
  },
  preview: {
    status: 501,
    message: 'No preview runtime is configured. A preview status cannot be recorded as if one ran.',
  },
  deliver: {
    status: 501,
    message: 'No verified delivery channel is integrated for generated apps. Use the separate approved project-delivery workflow.',
  },
  handover: {
    status: 501,
    message: 'Generated-app handover is not integrated. Use the separate approved source-handover workflow.',
  },
} as const

export type UnsupportedFactoryAction = keyof typeof FACTORY_UNSUPPORTED_ACTIONS

export function getUnsupportedFactoryAction(action: string) {
  return Object.hasOwn(FACTORY_UNSUPPORTED_ACTIONS, action)
    ? FACTORY_UNSUPPORTED_ACTIONS[action as UnsupportedFactoryAction]
    : null
}
