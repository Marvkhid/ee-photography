import { EnquiryForm } from '@/components/contact/EnquiryForm'
import { PageHero } from '@/components/ui/PageHero'
import { Section } from '@/components/ui/Section'
import { InstagramIcon, MailIcon, PhoneIcon, WhatsAppIcon } from '@/components/ui/Icons'
import { VideoLoopSlot } from '@/components/ui/VideoLoopSlot'
import { brand } from '@/config/brand'
import { isServiceSlug } from '@/data/categories'
import { buildMetadata } from '@/lib/seo'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import { REFINED_ENQUIRY_MESSAGE } from '@/lib/enquiry-whatsapp'

export const metadata = buildMetadata({
  title: 'Contact and Book Now',
  description:
    'Book a session with E&E Photography. Share your vision, date and location through the enquiry form, or message on WhatsApp.',
  path: '/contact',
})

type ContactPageProps = {
  searchParams: Promise<{ service?: string | string[] }>
}

const contactLinkClass = 'flex items-center gap-4 py-3 text-foreground transition-colors hover:text-muted-foreground'

const ContactPage = async ({ searchParams }: ContactPageProps) => {
  const { service } = await searchParams
  const requested = Array.isArray(service) ? service[0] : service
  const defaultService = requested && isServiceSlug(requested) ? requested : undefined

  return (
    <>
      <PageHero eyebrow="Contact · Book now" title="Let's create something meaningful">
        <p>
          Share your vision and your date. Every Book now and Make an enquiry button on the site leads here.
        </p>
      </PageHero>
      <Section className="grid items-start gap-14 pt-12 lg:grid-cols-[1.5fr_1fr] lg:gap-20 lg:pt-16">
        <EnquiryForm defaultService={defaultService} />
        <div className="grid gap-6" data-reveal>
          <address className="border border-border bg-surface p-7 not-italic">
            <a className={contactLinkClass} href={buildWhatsAppUrl(REFINED_ENQUIRY_MESSAGE)} rel="noopener noreferrer" target="_blank">
              <WhatsAppIcon />
              Chat on WhatsApp
            </a>
            <a className={contactLinkClass} href={brand.instagram.url} rel="noopener noreferrer" target="_blank">
              <InstagramIcon />
              {brand.instagram.handle}
            </a>
            <a className={contactLinkClass} href={brand.phone.href}>
              <PhoneIcon />
              {brand.phone.display}
            </a>
            <a className={contactLinkClass} href={brand.email.href}>
              <MailIcon />
              {brand.email.address}
            </a>
          </address>
          <VideoLoopSlot className="h-64" name="contact" sizes="(min-width: 1024px) 35vw, 100vw" />
        </div>
      </Section>
      <Section className="text-center">
        <p className="font-serif text-3xl italic md:text-4xl" data-reveal>
          Your happiness and vision is my priority to actualise.
        </p>
        <p className="mt-3 text-label uppercase tracking-eyebrow text-subtle">I&apos;d love to hear from you</p>
      </Section>
    </>
  )
}

export default ContactPage
