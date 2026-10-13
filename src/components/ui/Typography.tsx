import type { FC, ReactNode } from 'react'
import { tv, type VariantProps } from '@/lib/tv'

export const Eyebrow: FC<{ children: ReactNode; className?: string }> = ({ children, className }) => (
  <span className={['mb-4 block text-label uppercase tracking-eyebrow text-subtle', className].filter(Boolean).join(' ')}>
    {children}
  </span>
)

const heading = tv({
  base: 'font-serif font-normal leading-tight text-foreground',
  variants: {
    size: {
      xl: 'text-5xl md:text-6xl lg:text-7xl',
      lg: 'text-4xl md:text-5xl lg:text-6xl',
      md: 'text-3xl md:text-4xl',
      sm: 'text-2xl md:text-3xl',
    },
  },
  defaultVariants: {
    size: 'lg',
  },
})

type HeadingProps = VariantProps<typeof heading> & {
  as?: 'h1' | 'h2' | 'h3'
  children: ReactNode
  className?: string
  id?: string
}

export const Heading: FC<HeadingProps> = ({ as: Tag = 'h2', children, className, id, size }) => (
  <Tag className={heading({ class: className, size })} id={id}>
    {children}
  </Tag>
)

export const Rule: FC = () => <span aria-hidden className="my-6 block h-px w-28 bg-accent/60" />

export const Lead: FC<{ children: ReactNode; className?: string }> = ({ children, className }) => (
  <p className={['mb-7 max-w-prose text-base leading-relaxed text-muted-foreground', className].filter(Boolean).join(' ')}>
    {children}
  </p>
)
