import type { FC } from 'react'
import { ButtonLink } from '@/components/ui/Button'
import { SafeImage } from '@/components/ui/SafeImage'
import { Eyebrow, Heading } from '@/components/ui/Typography'

type FinalCtaProps = {
  title?: string
  image?: string
  alt?: string
}

/** Closing booking invitation. Every "Book a session" action leads to the Contact page. */
export const FinalCta: FC<FinalCtaProps> = ({
  alt = 'Wedding couple standing forehead to forehead',
  image = '/images/featured/featured-01.jpg',
  title = 'Your next moment starts here',
}) => (
  <section aria-labelledby="final-cta-title" className="relative overflow-hidden border-t border-border px-5 py-28 text-center md:py-40">
    <div className="absolute inset-0 opacity-25">
      <SafeImage alt={alt} sizes="100vw" src={image} />
    </div>
    <div className="absolute inset-0 bg-radial from-background/45 to-background to-85%" />
    <div className="relative" data-reveal>
      <Eyebrow>Book a session</Eyebrow>
      <Heading as="h2" className="mx-auto max-w-3xl" id="final-cta-title" size="xl">
        {title}
      </Heading>
      <p className="mx-auto mb-8 mt-5 max-w-md text-muted-foreground">
        Tell me about your vision and your date. Every enquiry goes through the Contact page.
      </p>
      <ButtonLink href="/contact" withArrow>
        Book a session
      </ButtonLink>
    </div>
  </section>
)
