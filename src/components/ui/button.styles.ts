import { tv, type VariantProps } from '@/lib/tv'

export const button = tv({
  base: 'inline-flex shrink-0 items-center whitespace-nowrap justify-center gap-2.5 rounded-full border border-border-strong text-label font-normal uppercase tracking-button text-foreground transition-colors duration-300 hover:border-accent hover:bg-foreground/5 disabled:pointer-events-none disabled:opacity-50',
  variants: {
    size: {
      sm: 'px-5 py-2.5',
      md: 'px-6.5 py-3.5',
    },
    full: {
      true: 'w-full',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export type ButtonVariantProps = VariantProps<typeof button>
