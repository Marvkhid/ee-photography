'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState, type FC } from 'react'

const SHOW_AFTER_MS = 250

const isPlainLeftClick = (event: MouseEvent): boolean =>
  !event.defaultPrevented && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey

/**
 * A thin line of light at the top of the screen while a page is loading.
 * It appears only if navigation takes longer than a moment, so fast navigations never flash it.
 */
export const NavigationProgress: FC = () => {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => {
    window.clearTimeout(timer.current)
    setVisible(false)
  }, [pathname])

  useEffect(() => {
    const handleClick = (event: MouseEvent): void => {
      if (!isPlainLeftClick(event) || !(event.target instanceof Element)) return

      const anchor = event.target.closest('a')

      if (!anchor || anchor.target === '_blank') return

      const url = new URL(anchor.href, window.location.href)

      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return

      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setVisible(true), SHOW_AFTER_MS)
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
      window.clearTimeout(timer.current)
    }
  }, [])

  return visible ? (
    <div
      aria-label="Loading page"
      className="fixed inset-x-0 top-0 z-60 h-0.5 overflow-hidden bg-border"
      role="progressbar"
    >
      <span className="block h-full w-1/3 animate-loading-bar bg-accent motion-reduce:animate-none" />
    </div>
  ) : null
}
