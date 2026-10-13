import type { FC, ReactNode } from 'react'
import { FinalCta } from '@/components/home/FinalCta'
import { ButtonLink } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { PageHero } from '@/components/ui/PageHero'
import { SafeImage } from '@/components/ui/SafeImage'
import { Section } from '@/components/ui/Section'
import { TestimonialCard } from '@/components/ui/TestimonialCard'
import { getDisplayTestimonials, type Testimonial } from '@/data/testimonials'
import { buildMetadata } from '@/lib/seo'
type ArchiveTile = {
  src: string
  alt: string
  caption: string
  aspect: string
  focal?: string
}

const SIZES = '(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw'

const featuredPortraitTile: ArchiveTile = {
  src: '/images/featured/featured-04.jpg',
  alt: 'Portrait of a woman in warm golden studio light',
  caption: 'From the studio',
  aspect: 'aspect-4/5',
  focal: '50% 30%',
}

const ArchiveFigure: FC<{ tile: ArchiveTile }> = ({ tile }) => (
  <figure className="mb-4 break-inside-avoid border border-border bg-surface" data-reveal>
    <div className={`relative overflow-hidden ${tile.aspect}`}>
      <SafeImage alt={tile.alt} focal={tile.focal} sizes={SIZES} src={tile.src} />
    </div>
    <figcaption className="px-4 py-3 text-label uppercase tracking-nav text-subtle">{tile.caption}</figcaption>
  </figure>
)

const buildRows = (items: readonly Testimonial[]): ReactNode[] => {
  const rows: ReactNode[] = []

  items.forEach((item, index) => {
    rows.push(
      <div className="mb-4 break-inside-avoid" key={item.id}>
        <TestimonialCard testimonial={item} />
      </div>,
    )

    if (index === 0) {
      rows.push(<ArchiveFigure key="tile-0" tile={featuredPortraitTile} />)
    }
  })

  return rows
}

const TestimonialsPage = () => {
  const items = getDisplayTestimonials()
  const [featured, ...rest] = items

  return (
    <>
      <PageHero eyebrow="Testimonials" title="Kind Words">
        <p>Stories from the people behind the photographs.</p>
      </PageHero>
      {}
      <Section bordered={false} className="pt-6 md:pt-6 lg:pt-6">
        {!featured ? (
          <EmptyState
            description="Client stories will appear here soon. If you would like to be photographed, tell me about your vision."
            title="Client stories are coming soon"
          >
            <ButtonLink href="/contact" withArrow>
              Book a session
            </ButtonLink>
          </EmptyState>
        ) : null}
        {featured ? (
          <figure className="grid border border-border bg-surface md:grid-cols-[1fr_1.3fr]" data-reveal>
            <div className="relative min-h-80 overflow-hidden md:min-h-105">
              <SafeImage
                alt="Portrait of a woman in warm golden studio light"
                sizes="(min-width: 768px) 40vw, 100vw"
                src="/images/featured/featured-04.jpg"
                focal="50% 30%"
              />
              <span className="absolute bottom-3 left-3 border border-border-strong bg-background/80 px-2 py-1 text-[0.625rem] uppercase tracking-button text-subtle backdrop-blur-sm">
                From the studio
              </span>
            </div>
            <div className="flex flex-col justify-center p-8 md:p-14">
              <span aria-hidden className="font-serif text-7xl leading-none text-accent">
                “
              </span>
              <blockquote className="mb-6 font-serif text-3xl italic leading-snug text-muted-foreground md:text-4xl">
                {featured.quote}
              </blockquote>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="text-label uppercase tracking-nav text-subtle">{featured.name}</span>
              </div>
            </div>
          </figure>
        ) : null}
        <div className="mt-4 columns-1 gap-4 md:columns-2 lg:columns-3">{buildRows(rest)}</div>
      </Section>
      <FinalCta alt="Three generations of a family smiling together" image="/images/featured/featured-07.jpg" title="Create your own story" />
    </>
  )
}

export default TestimonialsPage
