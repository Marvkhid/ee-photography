import type { FC, ReactNode } from 'react'
import { tv, type VariantProps } from '@/lib/tv'

const section = tv({
  base: 'relative px-5 py-16 md:px-12 md:py-24 lg:px-28 lg:py-30',
  variants: {
    bordered: {
      true: 'border-t border-border',
    },
  },
  defaultVariants: {
    bordered: true,
  },
})

type SectionProps = VariantProps<typeof section> & {
  children: ReactNode
  className?: string
  id?: string
  labelledBy?: string
}

export const Section: FC<SectionProps> = ({ bordered, children, className, id, labelledBy }) => (
  <section aria-labelledby={labelledBy} className={section({ bordered, class: className })} id={id}>
    {children}
  </section>
)
