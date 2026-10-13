/**
 * Single source of truth for brand and contact details.
 * Edit here and every page, the footer, metadata and the enquiry form update together.
 */
export const brand = {
  name: 'E&E Photography',
  shortName: 'E&E',
  photographer: 'Onyekachi Ebere',
  preferredName: 'Ebere',
  tagline: 'Portraits, weddings and birthdays, told in light.',
  description:
    'E&E Photography by Onyekachi Ebere: authentic, creative portrait, wedding and birthday photography that tells your story.',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  ogImage: '/images/og/og-image.jpg',
  ogImageSize: { width: 1200, height: 630 },
  /**
   * Cities or regions the studio serves, e.g. ['Lagos', 'Abuja']. Leave empty until confirmed:
   * it feeds Google's structured data, so it must only list places that are genuinely served.
   */
  serviceArea: [] as readonly string[],
  logo: {
    src: '/images/brand/logo-white.png',
    width: 838,
    height: 498,
  },
  phone: {
    display: '+234 901 744 8846',
    href: 'tel:+2349017448846',
  },
  email: {
    address: 'photographyee9@gmail.com',
    href: 'mailto:photographyee9@gmail.com',
  },
  instagram: {
    handle: '@_Ebereofficial_',
    url: 'https://www.instagram.com/_Ebereofficial_/',
  },
  whatsapp: {
    /** International format without "+" or spaces. */
    number: '2349017448846',
  },
  navigation: [
    { label: 'Home', href: '/' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
    { label: 'Testimonials', href: '/testimonials' },
    { label: 'Contact', href: '/contact' },
  ],
} as const

export type NavigationItem = (typeof brand.navigation)[number]
