import { brand } from '@/config/brand'
import { services } from '@/data/categories'
import { faqs } from '@/data/home'

const absolute = (path: string): string => `${brand.siteUrl}${path}`

/**
 * Business details for Google (rich results and Maps/Business Profile matching).
 * Only facts that exist in brand.ts are included: no address, rating or price is invented.
 */
export const buildBusinessSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': absolute('/#business'),
  name: brand.name,
  description: brand.description,
  url: brand.siteUrl,
  image: absolute(brand.ogImage),
  logo: absolute(brand.logo.src),
  telephone: brand.phone.display,
  email: brand.email.address,
  founder: { '@type': 'Person', name: brand.photographer },
  sameAs: [brand.instagram.url],
  knowsAbout: services.map((service) => `${service.name} photography`),
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'bookings',
    telephone: brand.phone.display,
    email: brand.email.address,
    url: absolute('/contact'),
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Photography services',
    itemListElement: services.map((service) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: `${service.name} photography`,
        description: service.description,
        url: absolute(`/services#${service.slug}`),
      },
    })),
  },
  ...(brand.serviceArea.length > 0
    ? { areaServed: brand.serviceArea.map((place) => ({ '@type': 'Place', name: place })) }
    : {}),
})

export const buildFaqSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
})

type Crumb = { name: string; path: string }

export const buildBreadcrumbSchema = (crumbs: readonly Crumb[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    item: absolute(crumb.path),
  })),
})
