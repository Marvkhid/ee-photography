import type { MetadataRoute } from 'next'
import { brand } from '@/config/brand'
import { CATEGORY_SLUGS } from '@/data/categories'
import { categoriesWithPhotos } from '@/data/photos'

const sitemap = (): MetadataRoute.Sitemap => {
  const staticRoutes = brand.navigation.map((item) => item.href)
  const categoryRoutes = CATEGORY_SLUGS.filter((slug) => categoriesWithPhotos.includes(slug)).map(
    (slug) => `/portfolio/${slug}`,
  )

  const lastModified = new Date()

  return [...staticRoutes, ...categoryRoutes].map((path) => ({
    lastModified,
    url: `${brand.siteUrl}${path === '/' ? '' : path}`,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : 0.7,
  }))
}

export default sitemap
