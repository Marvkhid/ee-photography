import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { IntroOverlay } from '@/components/intro/IntroOverlay'
import { INTRO_BOOT_SCRIPT } from '@/components/intro/intro-events'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { NavigationProgress } from '@/components/layout/NavigationProgress'
import { AnalyticsConsent } from '@/components/layout/AnalyticsConsent'
import { JsonLd } from '@/components/ui/JsonLd'
import { brand } from '@/config/brand'
import { buildBusinessSchema } from '@/lib/structured-data'
import { cormorant, jost } from './fonts'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(brand.siteUrl),
  title: {
    default: `${brand.name} | Portraits, Weddings and Birthdays`,
    template: `%s | ${brand.name}`,
  },
  description: brand.description,
  applicationName: brand.name,
  authors: [{ name: brand.photographer }],
  openGraph: {
    type: 'website',
    siteName: brand.name,
    title: brand.name,
    description: brand.description,
    images: [{ url: brand.ogImage, alt: brand.name, ...brand.ogImageSize }],
  },
  twitter: { card: 'summary_large_image', images: [brand.ogImage] },
  robots: { index: true, follow: true },
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
}

export const viewport: Viewport = {
  themeColor: '#080808',
  colorScheme: 'dark',
  viewportFit: 'cover',
}

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang="en-NG" suppressHydrationWarning>
    <head>
      <script dangerouslySetInnerHTML={{ __html: INTRO_BOOT_SCRIPT }} />
    </head>
    <body className={`${cormorant.variable} ${jost.variable}`}>
      <a
        className="fixed left-4 top-4 z-400 -translate-y-20 rounded-full bg-foreground px-5 py-2 text-label uppercase tracking-button text-background transition-transform focus:translate-y-0"
        href="#main"
      >
        Skip to content
      </a>
      <IntroOverlay />
      <NavigationProgress />
      <Header />
      <div data-site-shell>
        <main id="main">{children}</main>
        <Footer />
      </div>
      <AnalyticsConsent />
      <JsonLd data={buildBusinessSchema()} />
    </body>
  </html>
)

export default RootLayout
