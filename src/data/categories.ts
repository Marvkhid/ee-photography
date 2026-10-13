/**
 * Photography categories. One list drives the gallery filters, Services page, home page covers and the enquiry form.
 *
 * To add a category: add its slug to CATEGORY_SLUGS, add an entry to `categoryMap`,
 * drop photos in public/images/gallery/<slug>/ and register them in data/photos.ts.
 * To make it bookable, also add the slug to SERVICE_SLUGS.
 */
export const CATEGORY_SLUGS = [
  'portraits',
  'weddings',
  'birthdays',
  'graduations',
  'headshots',
  'events',
] as const

/** Categories the studio has confirmed as bookable services. */
export const SERVICE_SLUGS = ['portraits', 'weddings', 'birthdays'] as const

export type CategorySlug = (typeof CATEGORY_SLUGS)[number]
export type ServiceSlug = (typeof SERVICE_SLUGS)[number]

export type Category = {
  slug: CategorySlug
  name: string
  tagline: string
  /** Short description used on cards and the Services page. */
  description: string
  /** Longer introduction used at the top of the category page. */
  intro: string
  suitedTo: string
  cover: string
  heroFocal: string
}

export const isCategorySlug = (value: string): value is CategorySlug =>
  CATEGORY_SLUGS.some((slug) => slug === value)

export const isServiceSlug = (value: string): value is ServiceSlug =>
  SERVICE_SLUGS.some((slug) => slug === value)

const categoryMap = {
  portraits: {
    slug: 'portraits',
    name: 'Portraits',
    tagline: 'Authentic. Creative. You.',
    description:
      'Authentic, creative portraits that reveal the essence of the person in front of the lens.',
    intro:
      'Portraits that feel like you: natural, considered and full of character. Naturality with creative flair, in light that suits the person.',
    suitedTo: 'Personal portraits and creative sessions.',
    cover: '/images/services/portraits.jpg',
    heroFocal: '50% 25%',
  },
  weddings: {
    slug: 'weddings',
    name: 'Weddings',
    tagline: 'Love and commitment, kept.',
    description:
      'We take the time to understand your vision and love story, so your wedding photographs reflect your unique journey.',
    intro:
      'Your wedding is a story of love and commitment. Every photograph is shaped around your vision, your preferences and your journey together.',
    suitedTo: 'Couple portraits and wedding-day moments.',
    cover: '/images/services/weddings.jpg',
    heroFocal: '50% 30%',
  },
  birthdays: {
    slug: 'birthdays',
    name: 'Birthdays',
    tagline: 'The joy of a new age.',
    description:
      'A personalised birthday portrait experience, tailored to your personality and style.',
    intro:
      'A birthday is a chance to celebrate who you are. Sessions are tailored to your personality and style, with warmth and real emotion.',
    suitedTo: 'Birthday portraits and celebrations.',
    cover: '/images/services/birthdays.jpg',
    heroFocal: '50% 40%',
  },
  graduations: {
    slug: 'graduations',
    name: 'Graduations',
    tagline: 'Proud moments, kept.',
    description: 'Portraits that mark a milestone worth remembering.',
    intro: 'Portraits that mark the finish line and the pride that comes with it.',
    suitedTo: 'Graduation portraits.',
    cover: '/images/services/graduations.jpg',
    heroFocal: '50% 30%',
  },
  headshots: {
    slug: 'headshots',
    name: 'Headshots',
    tagline: 'Clear. Confident. Yours.',
    description: 'Clean, confident portraits for the face people see first.',
    intro: 'Clear, confident headshots with natural light and honest expression.',
    suitedTo: 'Headshots for personal and professional use.',
    cover: '/images/services/headshots.jpg',
    heroFocal: '50% 25%',
  },
  events: {
    slug: 'events',
    name: 'Events',
    tagline: 'Real moments. Lasting memories.',
    description: 'The energy of the room, kept as it felt.',
    intro: 'Real moments from the room: movement, light and the details that make an event yours.',
    suitedTo: 'Celebrations and gatherings.',
    cover: '/images/services/events.jpg',
    heroFocal: '50% 35%',
  },
} as const satisfies Record<CategorySlug, Category>

export const categories: readonly Category[] = CATEGORY_SLUGS.map((slug) => categoryMap[slug])

export const services: readonly Category[] = SERVICE_SLUGS.map((slug) => categoryMap[slug])

/** Categories shown in the gallery but not yet confirmed as bookable services. */
export const comingCategories: readonly Category[] = CATEGORY_SLUGS.filter(
  (slug) => !isServiceSlug(slug),
).map((slug) => categoryMap[slug])

export const getCategory = (slug: CategorySlug): Category => categoryMap[slug]
