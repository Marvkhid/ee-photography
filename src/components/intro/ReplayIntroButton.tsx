'use client'

import type { FC } from 'react'
import { INTRO_EVENTS } from '@/components/intro/intro-events'

/** Lets any visitor watch the curtain reveal again. */
export const ReplayIntroButton: FC = () => (
  <button
    className="inline-flex items-center gap-2 rounded-full border border-border-strong px-5 py-2.5 text-label uppercase tracking-button text-muted-foreground transition-colors hover:border-accent hover:text-foreground"
    onClick={() => window.dispatchEvent(new Event(INTRO_EVENTS.replay))}
    type="button"
  >
    Replay intro
  </button>
)
