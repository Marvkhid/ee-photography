'use client'

import type { FC } from 'react'
import { CONSENT_RESET_EVENT } from '@/components/layout/AnalyticsConsent'
import { gaId } from '@/lib/env'

/** Lets visitors change their analytics choice later. Rendered only when analytics is configured. */
export const CookieSettingsButton: FC = () =>
  gaId ? (
    <button
      className="underline underline-offset-4 transition-colors hover:text-foreground"
      onClick={() => window.dispatchEvent(new Event(CONSENT_RESET_EVENT))}
      type="button"
    >
      Cookie settings
    </button>
  ) : null
