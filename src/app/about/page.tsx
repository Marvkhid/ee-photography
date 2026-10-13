import { FinalCta } from '@/components/home/FinalCta'
import { ButtonLink } from '@/components/ui/Button'
import { PageHero } from '@/components/ui/PageHero'
import { ParallaxImage } from '@/components/ui/ParallaxImage'
import { Section } from '@/components/ui/Section'
import { Eyebrow, Heading } from '@/components/ui/Typography'
import { VideoLoopSlot } from '@/components/ui/VideoLoopSlot'
import { brand } from '@/config/brand'
import { services } from '@/data/categories'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'About',
  description: `Meet ${brand.photographer}, the creative behind E&E Photography. Naturality with creative flair, capturing moments that evoke emotions and tell stories.`,
  path: '/about',
  image: '/images/about/about-main.jpg',
})

const strip = [
  { src: '/images/about/about-02.jpg', alt: 'Portrait of a man in blue and red light', className: 'h-110', offset: '' },
  { src: '/images/about/about-03.jpg', alt: 'Smiling couple in traditional wedding attire', className: 'h-85', offset: 'md:mt-16' },
  { src: '/images/about/about-04.jpg', alt: 'Three generations of a family smiling together', className: 'h-115', offset: 'md:mt-5' },
] as const

const AboutPage = () => (
  <>
    <PageHero eyebrow="About E&E Photography" title={brand.photographer} />
    <Section bordered={false} className="grid items-center gap-10 pt-6 md:pt-6 lg:grid-cols-2 lg:gap-20 lg:pt-6">
      <ParallaxImage
        alt={`${brand.photographer}, photographer`}
        className="h-120 md:h-175"
        focal="50% 15%"
        priority
        sizes="(min-width: 1024px) 45vw, 100vw"
        src="/images/about/about-main.jpg"
      />
      <div data-reveal>
        <p className="mb-6 max-w-prose text-lg leading-relaxed text-muted-foreground">
          I&apos;m Ebere, a fun-loving creative who finds joy in bringing moments to life through art, photography and
          music. I thrive in environments filled with love and happiness. As a young person, I cherish capturing
          moments that evoke emotions and tell stories.
        </p>
        <p className="mb-8 text-label uppercase tracking-eyebrow">{services.map((service) => service.name).join(' · ')}</p>
        <ButtonLink href="/contact" withArrow>
          Book a session
        </ButtonLink>
      </div>
    </Section>
    <Section className="text-center" labelledBy="approach-title">
      <Eyebrow>Creative approach</Eyebrow>
      <h2
        className="mx-auto max-w-4xl font-serif text-3xl italic leading-snug md:text-5xl"
        data-reveal
        id="approach-title"
      >
        Naturality with creative flair, yielding timeless, authentic images that reveal the essence of my subjects.
      </h2>
    </Section>
    <Section className="grid gap-12 md:grid-cols-2 md:gap-20" labelledBy="philosophy-title">
      <div data-reveal>
        <Eyebrow>Philosophy</Eyebrow>
        <Heading id="philosophy-title" size="xl">
          Timeless
        </Heading>
      </div>
      <div data-reveal>
        <Heading as="h3" size="xl">
          Essence
        </Heading>
        <p className="mt-6 max-w-prose text-muted-foreground">
          At E&amp;E Photography the focus is on exceptional, personalised experiences that make you feel seen, heard
          and cherished, and on authentic images that reflect your unique spirit.
        </p>
      </div>
    </Section>
    <Section className="pt-6 md:pt-6 lg:pt-6">
      <div className="grid items-start gap-5 md:grid-cols-3">
        {strip.map((item) => (
          <ParallaxImage
            key={item.src}
            alt={item.alt}
            className={`${item.className} ${item.offset}`}
            sizes="(min-width: 768px) 30vw, 100vw"
            src={item.src}
          />
        ))}
      </div>
    </Section>
    <Section className="grid items-center gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14" labelledBy="process-title">
      <VideoLoopSlot className="h-80 md:h-105" name="process" sizes="(min-width: 1024px) 55vw, 100vw" />
      <div data-reveal>
        <Eyebrow>The process</Eyebrow>
        <Heading id="process-title" size="md">
          Where it comes together
        </Heading>
        <p className="mb-7 mt-5 text-muted-foreground">
          Light, patience and conversation. A short loop from a session shows the work as it happens.
        </p>
        <ButtonLink href="/contact" withArrow>
          Book a session
        </ButtonLink>
      </div>
    </Section>
    <FinalCta alt="Smiling woman in front of a pink backdrop" image="/images/featured/featured-04.jpg" title="Let's work together" />
  </>
)

export default AboutPage
