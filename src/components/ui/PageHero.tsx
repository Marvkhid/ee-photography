import type { FC, ReactNode } from 'react'
import { SplitTitle } from '@/components/ui/SplitTitle'
import { Eyebrow } from '@/components/ui/Typography'

type PageHeroProps = {
  eyebrow: string
  title: string
  children?: ReactNode
}

export const PageHero: FC<PageHeroProps> = ({ children, eyebrow, title }) => (
  <header className="px-5 pb-12 pt-32 md:px-12 md:pb-16 md:pt-44 lg:px-28">
    <Eyebrow>{eyebrow}</Eyebrow>
    <SplitTitle className="max-w-4xl text-5xl md:text-7xl lg:text-8xl" text={title} />
    {children ? (
      <div className="mt-8 max-w-xl text-base text-muted-foreground" data-reveal>
        {children}
      </div>
    ) : null}
  </header>
)
