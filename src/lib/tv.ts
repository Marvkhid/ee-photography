import { createTV } from 'tailwind-variants'
import { tailwindMergeConfig } from '@/lib/tailwind-merge-config'

export type { VariantProps } from 'tailwind-variants'

/** tailwind-variants configured with this project's design tokens. */
export const tv = createTV({ twMergeConfig: tailwindMergeConfig })
