import type { MetadataRoute } from 'next'
import { brand } from '@/config/brand'

const robots = (): MetadataRoute.Robots => ({
  rules: { userAgent: '*', allow: '/', disallow: '/api/' },
  sitemap: `${brand.siteUrl}/sitemap.xml`,
})

export default robots
