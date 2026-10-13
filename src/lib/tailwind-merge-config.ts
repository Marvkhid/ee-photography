/**
 * Teaches tailwind-merge about the custom tokens in globals.css (@theme), so that
 * `text-label` is treated as a font size (not a colour) and the tracking tokens as letter spacing.
 * Without this, merging `text-label` with `text-foreground` silently drops the font size.
 */
export const tailwindMergeConfig = {
  extend: {
    classGroups: {
      'font-size': [{ text: ['label'] }],
      tracking: [{ tracking: ['eyebrow', 'button', 'nav', 'wordmark'] }],
    },
  },
} as const
