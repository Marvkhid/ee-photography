import type { Metadata } from 'next'
import { brand } from '@/config/brand'

type MetadataInput = {
  title: string
  description: string
  path: string
  image?: string
}

export const buildMetadata = ({ description, image = brand.ogImage, path, title }: MetadataInput): Metadata => ({
  title,
  description,
  alternates: { canonical: path },
  openGraph: {
    title: `${title} | ${brand.name}`,
    description,
    url: path,
    siteName: brand.name,
    type: 'website',
    images: [image === brand.ogImage ? { url: image, alt: brand.name, ...brand.ogImageSize } : { url: image, alt: brand.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${title} | ${brand.name}`,
    description,
    images: [image],
  },
})
