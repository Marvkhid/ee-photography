import type { MetadataRoute } from 'next'
import { brand } from '@/config/brand'

const sitemap = (): MetadataRoute.Sitemap => {
  const staticRoutes = brand.navigation.map((item) => item.href)
  const lastModified = new Date()

  return staticRoutes.map((path) => ({
    lastModified,
    url: `${brand.siteUrl}${path === '/' ? '' : path}`,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : 0.7,
  }))
}

export default sitemap
