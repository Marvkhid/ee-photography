import Link from 'next/link'
import type { FC } from 'react'
import { ButtonLink } from '@/components/ui/Button'
import { MomentsCarousel } from '@/components/home/MomentsCarousel'
import { ParallaxImage } from '@/components/ui/ParallaxImage'
import { PhotoCard } from '@/components/ui/PhotoCard'
import { SafeImage } from '@/components/ui/SafeImage'
import { Section } from '@/components/ui/Section'
import { Eyebrow, Heading, Lead, Rule } from '@/components/ui/Typography'
import { VideoLoopSlot } from '@/components/ui/VideoLoopSlot'
import { TestimonialCard } from '@/components/ui/TestimonialCard'
import { brand } from '@/config/brand'
import { categories, services } from '@/data/categories'
import {
  experienceSteps,
  faqs,
  FEATURED_START_INDEX,
  featuredSlides,
  projects,
  reasons,
} from '@/data/home'
import { categoriesWithPhotos } from '@/data/photos'
import { getDisplayTestimonials } from '@/data/testimonials'
import { PlusIcon } from '@/components/ui/Icons'

export const MomentsSection: FC = () => (
  <Section className="grid items-center gap-12 overflow-x-clip lg:grid-cols-[1fr_1.5fr] lg:gap-16" labelledBy="moments-title">
    <div data-reveal>
      <Eyebrow>My works</Eyebrow>
      <Heading id="moments-title" size="lg">
        Moments
        <br />
        That Matter
      </Heading>
      <Rule />
      <Lead>
        Every shot tells a story. From intimate portraits to weddings and birthday celebrations, I capture the
        moments that matter most.
      </Lead>
      <ButtonLink href="/portfolio" withArrow>
        View portfolio
      </ButtonLink>
    </div>
    <MomentsCarousel slides={featuredSlides} startIndex={FEATURED_START_INDEX} />
  </Section>
)

export const InterludeSection: FC = () => (
  <section aria-labelledby="interlude-title" className="relative flex min-h-[84vh] items-center overflow-hidden border-t border-border">
    <VideoLoopSlot className="absolute inset-0 opacity-55" name="interlude" sizes="100vw" />
    <div className="absolute inset-0 bg-linear-to-r from-background from-25% via-background/15 via-70% to-background" />
    <div className="relative max-w-xl px-5 py-24 md:px-12 lg:px-28">
      <Eyebrow>The atmosphere</Eyebrow>
      <h2 className="font-serif text-4xl leading-tight md:text-6xl" data-reveal id="interlude-title">
        Preserving moments, telling stories.
      </h2>
      <p className="mt-6 text-muted-foreground" data-reveal>
        The quiet before the shutter, the light on a face, the laugh that arrives just after the pose.
      </p>
    </div>
  </section>
)

export const AboutPreview: FC = () => (
  <section aria-labelledby="about-preview-title" className="grid border-t border-border lg:min-h-140 lg:grid-cols-[1.05fr_1fr_0.9fr]">
    <div className="relative min-h-110 overflow-hidden" data-clip>
      <SafeImage alt={`${brand.photographer}, photographer`} focal="50% 20%" sizes="(min-width: 1024px) 40vw, 100vw" src="/images/about/about-main.jpg" />
      <div className="absolute inset-0 bg-linear-to-r from-transparent from-55% to-background max-lg:hidden" />
    </div>
    <div className="flex flex-col justify-center px-5 py-16 md:px-12 lg:px-14" data-reveal>
      <Eyebrow>About me</Eyebrow>
      <Heading id="about-preview-title" size="md">
        Onyekachi
        <br />
        Ebere
      </Heading>
      <Rule />
      <Lead>
        I&apos;m Ebere, a fun-loving creative who finds joy in bringing moments to life through art, photography and
        music. I cherish capturing moments that evoke emotions and tell stories.
      </Lead>
      <p className="mb-6 text-label uppercase tracking-eyebrow">
        {services.map((service) => service.name).join(' · ')}
      </p>
      <div>
        <ButtonLink href="/about" withArrow>
          Read my story
        </ButtonLink>
      </div>
    </div>
    <figure className="flex flex-col justify-center border-t border-border px-5 py-16 md:px-12 lg:border-l lg:border-t-0 lg:px-12" data-reveal>
      <span aria-hidden className="font-serif text-6xl leading-none text-accent">
        “
      </span>
      <blockquote className="font-serif text-3xl italic leading-snug md:text-4xl">
        Your happiness and vision is my priority to actualise.
      </blockquote>
    </figure>
  </section>
)

export const ServicesPreview: FC = () => (
  <Section className="grid items-center gap-12 lg:grid-cols-[0.8fr_2.2fr] lg:gap-14" labelledBy="services-title">
    <div data-reveal>
      <Eyebrow>What I do</Eyebrow>
      <Heading id="services-title" size="lg">
        Photography
        <br />
        Services
      </Heading>
      <Rule />
      <Lead>From intimate portraits to weddings and birthday celebrations, tailored photography to fit your vision.</Lead>
      <ButtonLink href="/services" withArrow>
        View all services
      </ButtonLink>
    </div>
    <div className="grid gap-4 sm:grid-cols-3" data-reveal>
      {services.map((service) => (
        <PhotoCard
          key={service.slug}
          alt={`${service.name} photography`}
          aspect="aspect-3/4"
          href={`/services#${service.slug}`}
          image={service.cover}
          sizes="(min-width: 1024px) 28vw, (min-width: 640px) 30vw, 100vw"
          subtitle={service.tagline}
          title={service.name}
        />
      ))}
    </div>
  </Section>
)

export const CategoryCovers: FC<{ title?: string }> = ({ title = 'Find the photography you came for' }) => (
  <Section labelledBy="covers-title">
    <div className="mb-10 flex flex-wrap items-end justify-between gap-5" data-reveal>
      <div>
        <Eyebrow>Explore the portfolio</Eyebrow>
        <Heading id="covers-title" size="lg">
          {title}
        </Heading>
      </div>
      <ButtonLink href="/portfolio" withArrow>
        Full portfolio
      </ButtonLink>
    </div>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-reveal>
      {categories
        .filter((category) => categoriesWithPhotos.includes(category.slug))
        .map((category) => (
          <PhotoCard
            key={category.slug}
            alt={`${category.name} photography`}
            aspect="aspect-4/3"
            focal={category.heroFocal}
            href={`/portfolio/${category.slug}`}
            image={category.cover}
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
            title={category.name}
          />
        ))}
    </div>
  </Section>
)

export const ExperienceSection: FC = () => (
  <Section labelledBy="experience-title">
    <Eyebrow>The E&amp;E experience</Eyebrow>
    <Heading className="max-w-3xl" id="experience-title" size="lg">
      From first message to final photographs
    </Heading>
    <ol className="relative mt-14 grid gap-10 pt-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-7">
      <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-border" />
      <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-accent" data-progress />
      {experienceSteps.map((step, index) => (
        <li key={step.title} data-reveal>
          <span className="font-serif text-4xl text-accent">{String(index + 1).padStart(2, '0')}</span>
          <h3 className="mb-2 mt-2 text-xs font-normal uppercase tracking-button">{step.title}</h3>
          <p className="text-sm text-muted-foreground">{step.description}</p>
        </li>
      ))}
    </ol>
  </Section>
)

export const WhyChoose: FC = () => (
  <Section className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr_1fr] lg:gap-14" labelledBy="why-title">
    <div data-reveal>
      <Eyebrow>Why E&amp;E</Eyebrow>
      <Heading id="why-title" size="lg">
        Photography that makes you feel seen
      </Heading>
    </div>
    <ul>
      {reasons.map((reason) => (
        <li key={reason.title} className="border-t border-border py-5" data-reveal>
          <h3 className="font-serif text-2xl">{reason.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{reason.description}</p>
        </li>
      ))}
    </ul>
    <ParallaxImage
      alt="Three generations of a family smiling together in black and white"
      className="h-96 lg:h-135"
      focal="50% 30%"
      sizes="(min-width: 1024px) 30vw, 100vw"
      src="/images/about/about-04.jpg"
    />
  </Section>
)

export const VideoStory: FC = () => (
  <Section className="grid items-center gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-14" labelledBy="story-title">
    <VideoLoopSlot className="h-80 md:h-115" name="story" sizes="(min-width: 1024px) 60vw, 100vw" />
    <div data-reveal>
      <Eyebrow>Behind the lens</Eyebrow>
      <Heading id="story-title" size="md">
        A session, felt
      </Heading>
      <p className="mt-5 text-muted-foreground">
        A short loop of light, hands and movement from a session, with the photographs staying in the lead.
      </p>
    </div>
  </Section>
)

export const FeaturedProjects: FC = () => (
  <Section labelledBy="projects-title">
    <Eyebrow>Featured projects</Eyebrow>
    <Heading id="projects-title" size="lg">
      Bodies of work
    </Heading>
    <div className="mt-10 grid gap-6 md:grid-cols-3">
      {projects.map((project) => (
        <Link key={project.id} className="group block" data-reveal href={project.href}>
          <div className="relative h-80 overflow-hidden md:h-115">
            <SafeImage
              alt={project.alt}
              className="transition-transform duration-1000 ease-out group-hover:scale-105"
              sizes="(min-width: 768px) 30vw, 100vw"
              src={project.cover}
            />
          </div>
          <span className="mb-1 mt-4 block text-label uppercase tracking-eyebrow text-subtle">{project.category}</span>
          <span className="font-serif text-3xl">{project.title}</span>
        </Link>
      ))}
    </div>
  </Section>
)

export const TestimonialsPreview: FC = () => {
  const items = getDisplayTestimonials().slice(0, 3)

  return (
    <Section className="grid items-center gap-12 lg:grid-cols-[0.8fr_2.2fr] lg:gap-14" labelledBy="kind-words-title">
      <div data-reveal>
        <Eyebrow>Testimonials</Eyebrow>
        <Heading id="kind-words-title" size="lg">
          Kind Words
        </Heading>
        <Rule />
        <Lead>Here&apos;s what my clients have to say about working with me.</Lead>
        <ButtonLink href="/testimonials" withArrow>
          All testimonials
        </ButtonLink>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <TestimonialCard key={item.id} testimonial={item} />
        ))}
      </div>
    </Section>
  )
}

export const FaqSection: FC = () => (
  <Section className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16" labelledBy="faq-title">
    <div data-reveal>
      <Eyebrow>Questions</Eyebrow>
      <Heading id="faq-title" size="lg">
        Before you enquire
      </Heading>
    </div>
    <div>
      {faqs.map((faq) => (
        <details key={faq.question} className="group border-t border-border py-5" data-reveal>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-2xl [&::-webkit-details-marker]:hidden">
            {faq.question}
            <PlusIcon className="size-5 shrink-0 text-accent transition-transform duration-300 group-open:rotate-45" />
          </summary>
          <p className="mt-3 text-muted-foreground">{faq.answer}</p>
        </details>
      ))}
    </div>
  </Section>
)
