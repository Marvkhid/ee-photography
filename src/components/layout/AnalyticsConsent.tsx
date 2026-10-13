'use client'

import Script from 'next/script'
import { useEffect, useState, type FC } from 'react'
import { Button } from '@/components/ui/Button'
import { gaId } from '@/lib/env'

type Consent = 'granted' | 'denied' | 'unset'

const STORAGE_KEY = 'ee-analytics-consent'
export const CONSENT_RESET_EVENT = 'ee:consent-reset'

const readConsent = (): Consent => {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY)

    return value === 'granted' || value === 'denied' ? value : 'unset'
  } catch {
    return 'unset'
  }
}

const writeConsent = (value: 'granted' | 'denied' | null): void => {
  try {
    if (value === null) {
      window.localStorage.removeItem(STORAGE_KEY)
    } else {
      window.localStorage.setItem(STORAGE_KEY, value)
    }
  } catch {
    /* storage can be unavailable; the choice then simply lasts for this visit */
  }
}

/**
 * Google Analytics 4 behind a consent choice. Nothing loads, and no banner shows, unless
 * NEXT_PUBLIC_GA_ID is set. Analytics only runs after the visitor accepts.
 */
export const AnalyticsConsent: FC = () => {
  const [consent, setConsent] = useState<Consent | null>(null)

  useEffect(() => {
    setConsent(readConsent())

    const handleReset = (): void => {
      writeConsent(null)
      setConsent('unset')
    }

    window.addEventListener(CONSENT_RESET_EVENT, handleReset)

    return () => window.removeEventListener(CONSENT_RESET_EVENT, handleReset)
  }, [])

  if (!gaId || consent === null) {
    return null
  }

  const choose = (value: 'granted' | 'denied'): void => {
    writeConsent(value)
    setConsent(value)
  }

  return (
    <>
      {consent === 'granted' ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`}
          </Script>
        </>
      ) : null}
      {consent === 'unset' ? (
        <section
          aria-label="Cookie preferences"
          className="consent-banner fixed inset-x-4 bottom-4 z-90 border border-border-strong bg-surface p-5 shadow-2xl md:left-auto md:max-w-sm"
        >
          <p className="mb-4 text-sm text-muted-foreground">
            May we use cookies to measure how the site is used (Google Analytics)? The site works the same either way.
          </p>
          <div className="flex gap-3">
            <Button onClick={() => choose('granted')} size="sm">
              Accept
            </Button>
            <Button onClick={() => choose('denied')} size="sm">
              Decline
            </Button>
          </div>
        </section>
      ) : null}
    </>
  )
}
