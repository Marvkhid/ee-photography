import { FinalCta } from '@/components/home/FinalCta'
import { CategoryCovers } from '@/components/home/HomeSections'
import { PortfolioBrowser } from '@/components/portfolio/PortfolioBrowser'
import { PageHero } from '@/components/ui/PageHero'
import { Section } from '@/components/ui/Section'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Portfolio',
  description:
    'Selected works by E&E Photography: portraits, weddings and birthdays. Choose a category to see only the photography you are looking for.',
  path: '/portfolio',
})

const PortfolioPage = () => (
  <>
    <PageHero eyebrow="Portfolio" title="Selected Works">
      <p>Find the photography you are looking for. Choose a category to see only that body of work.</p>
    </PageHero>
    <Section bordered={false} className="pt-6 md:pt-6 lg:pt-6">
      <PortfolioBrowser />
    </Section>
    <CategoryCovers title="Go straight to what you need" />
    <FinalCta alt="Smiling couple in traditional wedding attire" image="/images/featured/featured-02.jpg" title="Like what you see?" />
  </>
)

export default PortfolioPage
