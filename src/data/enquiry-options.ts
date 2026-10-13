export const DISCOVERY_OPTIONS = [
  'Instagram',
  'TikTok',
  'Referral',
  'Google search',
  'Friend or family',
  'Other',
] as const

export const CONTACT_METHODS = ['WhatsApp', 'Email', 'Phone call'] as const

export type DiscoveryOption = (typeof DISCOVERY_OPTIONS)[number]
export type ContactMethod = (typeof CONTACT_METHODS)[number]
