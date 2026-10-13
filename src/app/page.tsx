import { FinalCta } from '@/components/home/FinalCta'
import { Hero } from '@/components/home/Hero'
import {
  AboutPreview,
  CategoryCovers,
  ExperienceSection,
  FaqSection,
  FeaturedProjects,
  InterludeSection,
  MomentsSection,
  ServicesPreview,
  TestimonialsPreview,
  VideoStory,
  WhyChoose,
} from '@/components/home/HomeSections'
import { JsonLd } from '@/components/ui/JsonLd'
import { brand } from '@/config/brand'
import { buildFaqSchema } from '@/lib/structured-data'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: `${brand.name} | Portraits, Weddings and Birthdays`,
  description: brand.description,
  path: '/',
})

const HomePage = () => (
  <>
    <Hero />
    <MomentsSection />
    <InterludeSection />
    <AboutPreview />
    <ServicesPreview />
    <CategoryCovers />
    <ExperienceSection />
    <WhyChoose />
    <VideoStory />
    <FeaturedProjects />
    <TestimonialsPreview />
    <FaqSection />
    <FinalCta />
    <JsonLd data={buildFaqSchema()} />
  </>
)

export default HomePage
