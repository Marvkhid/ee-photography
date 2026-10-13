import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'
import { ReplayIntroButton } from '@/components/intro/ReplayIntroButton'
import { CookieSettingsButton } from '@/components/layout/CookieSettingsButton'
import { CurrentYear } from '@/components/layout/CurrentYear'
import { InstagramIcon, MailIcon, PhoneIcon, WhatsAppIcon } from '@/components/ui/Icons'
import { brand } from '@/config/brand'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import { REFINED_ENQUIRY_MESSAGE } from '@/lib/enquiry-whatsapp'

const socialLinkClass =
  'flex size-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-accent hover:text-foreground'

export const Footer: FC = () => (
  <footer className="border-t border-border px-5 py-12 md:px-12 lg:px-28">
    <div className="grid gap-10 md:grid-cols-3 md:items-start">
      <div>
        <Link aria-label={`${brand.name}, home`} href="/">
          <Image
            alt={brand.name}
            className="h-11 w-auto max-w-none"
            height={brand.logo.height}
            src={brand.logo.src}
            width={brand.logo.width}
          />
        </Link>
        <p className="mt-5 max-w-xs text-sm text-muted-foreground">{brand.tagline}</p>
      </div>
      <nav aria-label="Footer" className="md:justify-self-center">
        <ul className="grid grid-cols-2 gap-x-10">
          {brand.navigation.map((item) => (
            <li key={item.href}>
              <Link
                className="inline-block py-2 text-label uppercase tracking-nav text-muted-foreground transition-colors hover:text-foreground"
                href={item.href}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex flex-col gap-5 md:items-end">
        <ul className="flex gap-3">
          <li>
            <a aria-label="Chat on WhatsApp" className={socialLinkClass} href={buildWhatsAppUrl(REFINED_ENQUIRY_MESSAGE)} rel="noopener noreferrer" target="_blank">
              <WhatsAppIcon />
            </a>
          </li>
          <li>
            <a aria-label={`Instagram ${brand.instagram.handle}`} className={socialLinkClass} href={brand.instagram.url} rel="noopener noreferrer" target="_blank">
              <InstagramIcon />
            </a>
          </li>
          <li>
            <a aria-label={`Call ${brand.phone.display}`} className={socialLinkClass} href={brand.phone.href}>
              <PhoneIcon />
            </a>
          </li>
          <li>
            <a aria-label={`Email ${brand.email.address}`} className={socialLinkClass} href={brand.email.href}>
              <MailIcon />
            </a>
          </li>
        </ul>
        <ReplayIntroButton />
      </div>
    </div>
    <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground">
      <p>
        © <CurrentYear initial={new Date().getFullYear()} /> {brand.name}. All rights reserved.
      </p>
      <CookieSettingsButton />
    </div>
  </footer>
)
