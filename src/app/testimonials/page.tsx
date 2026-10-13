import type { FC, ReactNode } from 'react'
import { FinalCta } from '@/components/home/FinalCta'
import { ButtonLink } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { PageHero } from '@/components/ui/PageHero'
import { SafeImage } from '@/components/ui/SafeImage'
import { Section } from '@/components/ui/Section'
import { TestimonialCard } from '@/components/ui/TestimonialCard'
import { getDisplayTestimonials, hasVerifiedTestimonials, type Testimonial } from '@/data/testimonials'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Testimonials',
  description: 'Kind words from the people behind the photographs, shared by E&E Photography clients.',
  path: '/testimonials',
})

/**
 * An archive photograph shown between quotes. Captions state plainly what the image is
 * ("From the portfolio" for E&E work, "Illustrative photograph" for licensed stock), so a
 * picture is never presented as the person who wrote a nearby quote, nor as E&E's own work
 * unless it is.
 */
type ArchiveTile = {
  src: string
  alt: string
  caption: string
  aspect: string
  focal?: string
}

const SIZES = '(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw'

/** Portfolio photographs, interleaved with the quotes to keep the grid editorial. */
const portfolioTiles = {
  family: {
    src: '/images/portfolio/portraits/portrait-01.jpg',
    alt: 'Three generations of a family smiling together in black and white',
    caption: 'From the portfolio · Portraits',
    aspect: 'aspect-4/5',
    focal: '50% 30%',
  },
  wedding: {
    src: '/images/portfolio/weddings/wedding-03.jpg',
    alt: 'Wedding couple at the venue in black and white',
    caption: 'From the portfolio · Weddings',
    aspect: 'aspect-3/4',
    focal: '50% 35%',
  },
  birthday: {
    src: '/images/portfolio/birthdays/birthday-03.jpg',
    alt: 'Woman celebrating her birthday with sparkling confetti',
    caption: 'From the portfolio · Birthdays',
    aspect: 'aspect-4/3',
    focal: '50% 40%',
  },
  graduation: {
    src: '/images/portfolio/graduations/graduation-02.jpg',
    alt: 'Smiling woman blowing a kiss to the camera',
    caption: 'From the portfolio · Graduations',
    aspect: 'aspect-4/3',
    focal: '50% 35%',
  },
  headshot: {
    src: '/images/portfolio/headshots/headshot-02.jpg',
    alt: 'Smiling woman with her hands framing her face',
    caption: 'From the portfolio · Headshots',
    aspect: 'aspect-4/5',
    focal: '50% 35%',
  },
  event: {
    src: '/images/portfolio/events/event-03.jpg',
    alt: 'Girl twirling in a tulle dress in black and white',
    caption: 'From the portfolio · Events',
    aspect: 'aspect-4/3',
    focal: '50% 45%',
  },
  /** Licensed stock studio portraits — labelled illustrative, never as E&E work. */
  illustrativeOne: {
    src: '/images/testimonials/client-02.jpg',
    alt: 'Studio portrait of a woman in a headwrap and traditional attire',
    caption: 'Illustrative photograph',
    aspect: 'aspect-3/4',
    focal: '50% 30%',
  },
  illustrativeTwo: {
    src: '/images/testimonials/client-06.jpg',
    alt: 'Studio portrait of a smiling man in traditional attire',
    caption: 'Illustrative photograph',
    aspect: 'aspect-3/4',
    focal: '50% 30%',
  },
} as const satisfies Record<string, ArchiveTile>

/** Sparse insertion map: tile shown directly after the card at this index of `rest`. */
const tilesAfterIndex: Readonly<Record<number, ArchiveTile>> = {
  3: portfolioTiles.wedding,
  6: portfolioTiles.illustrativeOne,
  10: portfolioTiles.birthday,
  15: portfolioTiles.family,
  20: portfolioTiles.graduation,
  25: portfolioTiles.illustrativeTwo,
  30: portfolioTiles.headshot,
  36: portfolioTiles.event,
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

    const tile = tilesAfterIndex[index]

    if (tile) {
      rows.push(<ArchiveFigure key={`tile-${index}`} tile={tile} />)
    }
  })

  return rows
}

const TestimonialsPage = () => {
  const items = getDisplayTestimonials()
  const [featured, ...rest] = items
  const verified = hasVerifiedTestimonials()

  return (
    <>
      <PageHero eyebrow="Testimonials" title="Kind Words">
        <p>Stories from the people behind the photographs.</p>
      </PageHero>
      {verified ? null : (
        <div className="mx-5 mb-2 border border-dashed border-border-strong px-5 py-4 md:mx-12 lg:mx-28">
          <p className="text-label uppercase tracking-eyebrow text-subtle">Sample content</p>
          <p className="mt-2 text-sm text-muted-foreground">
            The words below are draft copy written to show how this page reads with real feedback — they are not
            verified client reviews, and the names are sample display names. Photographs are portfolio or licensed
            illustrative images; none of them identifies who wrote a quote. Approved client words replace all of
            this automatically.
          </p>
        </div>
      )}
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
                alt="Woman celebrating her birthday with sparkling confetti"
                sizes="(min-width: 768px) 40vw, 100vw"
                src="/images/portfolio/birthdays/birthday-03.jpg"
                focal="50% 35%"
              />
              <span className="absolute bottom-3 left-3 border border-border-strong bg-background/80 px-2 py-1 text-[0.625rem] uppercase tracking-button text-subtle backdrop-blur-sm">
                From the portfolio · Birthdays
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
                {featured.verified ? null : (
                  <span className="border border-dashed border-border-strong px-2 py-1 text-[0.625rem] uppercase tracking-button text-subtle">
                    Sample · not a verified review
                  </span>
                )}
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
