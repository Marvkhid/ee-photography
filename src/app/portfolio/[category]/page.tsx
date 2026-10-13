import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { FinalCta } from '@/components/home/FinalCta'
import { PhotoGrid } from '@/components/portfolio/PhotoGrid'
import { ButtonLink } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { SafeImage } from '@/components/ui/SafeImage'
import { Section } from '@/components/ui/Section'
import { SplitTitle } from '@/components/ui/SplitTitle'
import { Eyebrow } from '@/components/ui/Typography'
import {
  CATEGORY_SLUGS,
  categories,
  getCategory,
  isCategorySlug,
  isServiceSlug,
} from '@/data/categories'
import { categoriesWithPhotos, getPhotosByCategory } from '@/data/photos'
import { JsonLd } from '@/components/ui/JsonLd'
import { buildMetadata } from '@/lib/seo'
import { buildBreadcrumbSchema } from '@/lib/structured-data'

type CategoryPageProps = {
  params: Promise<{ category: string }>
}

export const generateStaticParams = (): { category: string }[] =>
  CATEGORY_SLUGS.map((category) => ({ category }))

export const generateMetadata = async ({ params }: CategoryPageProps): Promise<Metadata> => {
  const { category } = await params

  if (!isCategorySlug(category)) {
    return {}
  }

  const details = getCategory(category)

  return buildMetadata({
    title: `${details.name} Photography`,
    description: details.description,
    path: `/portfolio/${category}`,
    image: details.cover,
  })
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { category } = await params

  if (!isCategorySlug(category)) {
    notFound()
  }

  const gallery = getPhotosByCategory(category)
  const details = getCategory(category)
  const others = categories.filter(
    (item) => item.slug !== category && categoriesWithPhotos.includes(item.slug),
  )
  const enquiryHref = isServiceSlug(category) ? `/contact?service=${category}` : '/contact'

  return (
    <>
      <section className="relative flex min-h-[70vh] items-end overflow-hidden" aria-labelledby="category-title">
        <SafeImage
          alt={`${details.name} photography`}
          className="opacity-55"
          focal={details.heroFocal}
          priority
          sizes="100vw"
          src={details.cover}
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/30 to-transparent" />
        <div className="relative px-5 pb-12 pt-40 md:px-12 lg:px-28">
          <Eyebrow>
            <Link className="transition-colors hover:text-foreground" href="/portfolio">
              Portfolio
            </Link>{' '}
            / Category
          </Eyebrow>
          <SplitTitle className="text-6xl md:text-8xl lg:text-9xl" id="category-title" text={details.name} />
        </div>
      </section>
      <Section bordered={false} className="grid gap-8 py-12 md:grid-cols-2 md:gap-16">
        <p className="font-serif text-3xl italic leading-snug md:text-4xl" data-reveal>
          {details.tagline}
        </p>
        <p className="text-muted-foreground" data-reveal>
          {details.intro}
        </p>
      </Section>
      <Section bordered={false} className="pt-0 md:pt-0 lg:pt-0">
        {gallery.length > 0 ? (
          <PhotoGrid photos={gallery} showCategory={false} />
        ) : (
          <EmptyState
            description={`Photographs for ${details.name.toLowerCase()} are being added. In the meantime, browse the rest of the portfolio or get in touch.`}
            title="New work coming soon"
          >
            <ButtonLink href="/portfolio" withArrow>
              Browse the portfolio
            </ButtonLink>
            <ButtonLink href="/contact">Get in touch</ButtonLink>
          </EmptyState>
        )}
      </Section>
      <Section className="flex flex-wrap items-center justify-between gap-6">
        <ButtonLink href={enquiryHref} withArrow>
          {isServiceSlug(category) ? `Enquire about ${details.name.toLowerCase()}` : 'Make an enquiry'}
        </ButtonLink>
        <ul className="flex flex-wrap gap-3">
          {others.map((item) => (
            <li key={item.slug}>
              <Link
                className="rounded-full border border-border-strong px-4.5 py-2.5 text-label uppercase tracking-nav text-muted-foreground transition-colors hover:border-accent hover:text-foreground"
                href={`/portfolio/${item.slug}`}
              >
                {item.name}
              </Link>
            </li>
          ))}
          <li>
            <Link
              className="rounded-full border border-border-strong px-4.5 py-2.5 text-label uppercase tracking-nav text-muted-foreground transition-colors hover:border-accent hover:text-foreground"
              href="/portfolio"
            >
              All portfolio
            </Link>
          </li>
        </ul>
      </Section>
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Portfolio', path: '/portfolio' },
          { name: details.name, path: `/portfolio/${category}` },
        ])}
      />
      <FinalCta />
    </>
  )
}

export default CategoryPage
