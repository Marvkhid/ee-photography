import Link from 'next/link'
import { FinalCta } from '@/components/home/FinalCta'
import { ButtonLink } from '@/components/ui/Button'
import { PageHero } from '@/components/ui/PageHero'
import { ParallaxImage } from '@/components/ui/ParallaxImage'
import { SafeImage } from '@/components/ui/SafeImage'
import { Section } from '@/components/ui/Section'
import { Eyebrow, Heading } from '@/components/ui/Typography'
import { VideoLoopSlot } from '@/components/ui/VideoLoopSlot'
import { comingCategories, services } from '@/data/categories'
import { categoriesWithPhotos, getPhotosByCategory } from '@/data/photos'
import { buildMetadata } from '@/lib/seo'
import { cn } from '@/lib/cn'

export const metadata = buildMetadata({
  title: 'Services',
  description:
    'Portrait, wedding and birthday photography by E&E Photography. Share your vision and date through the enquiry form.',
  path: '/services',
})

const showsVideo = (slug: string): boolean => slug === 'weddings'

const ServicesPage = () => (
  <>
    <PageHero eyebrow="Services" title="What I photograph">
      <p>Three confirmed specialties, each with its own approach. Pricing is shared on enquiry.</p>
    </PageHero>
    {services.map((service, index) => {
      const examples = getPhotosByCategory(service.slug).slice(0, 3)
      const flipped = index % 2 === 1

      return (
        <Section
          key={service.slug}
          className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20"
          id={service.slug}
          labelledBy={`${service.slug}-title`}
        >
          <ParallaxImage
            alt={`${service.name} photography`}
            className={cn('h-110 md:h-160', flipped && 'lg:order-2')}
            focal={service.heroFocal}
            sizes="(min-width: 1024px) 45vw, 100vw"
            src={service.cover}
          />
          <div data-reveal>
            <span className="font-serif text-6xl leading-none text-accent">{String(index + 1).padStart(2, '0')}</span>
            <Heading className="mb-5 mt-2" id={`${service.slug}-title`} size="lg">
              {service.name}
            </Heading>
            <p className="mb-6 max-w-prose text-muted-foreground">{service.description}</p>
            <Eyebrow className="mb-2">Suited to</Eyebrow>
            <p className="mb-6 text-muted-foreground">{service.suitedTo}</p>
            <ul className="mb-7 flex gap-2.5">
              {examples.map((photo) => (
                <li key={photo.id} className="relative h-28 w-21 overflow-hidden border border-border">
                  <SafeImage alt={photo.alt} focal={photo.focal} sizes="84px" src={photo.src} />
                </li>
              ))}
            </ul>
            {showsVideo(service.slug) ? (
              <VideoLoopSlot className="mb-7 h-36 w-full max-w-md" name="weddings" sizes="448px" />
            ) : null}
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={`/contact?service=${service.slug}`} withArrow>
                Make an enquiry
              </ButtonLink>
            </div>
          </div>
        </Section>
      )
    })}
    <Section className="flex flex-wrap items-center justify-between gap-8" labelledBy="more-title">
      <div data-reveal>
        <Eyebrow>More to come</Eyebrow>
        <Heading id="more-title" size="md">
          {comingCategories.map((category) => category.name).join(', ')}
        </Heading>
      </div>
      <ul className="flex gap-4" data-reveal>
        {comingCategories
          .filter((category) => categoriesWithPhotos.includes(category.slug))
          .map((category) => (
            <li key={category.slug}>
              <Link className="group block" href={`/contact`}>
                <span className="relative block h-44 w-32 overflow-hidden border border-border">
                  <SafeImage
                    alt={`${category.name} photography`}
                    className="transition-transform duration-1000 group-hover:scale-105"
                    sizes="128px"
                    src={category.cover}
                  />
                </span>
                <span className="mt-2 block text-label uppercase tracking-nav text-muted-foreground">{category.name}</span>
              </Link>
            </li>
          ))}
      </ul>
    </Section>
    <FinalCta alt="Portrait in warm golden light" image="/images/featured/featured-06.jpg" title="Book your session" />
  </>
)

export default ServicesPage
