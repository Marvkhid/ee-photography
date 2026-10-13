'use client'

import { useEffect, useRef, type FC, type PointerEvent } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from '@/components/ui/Icons'
import { SafeImage } from '@/components/ui/SafeImage'
import type { Photo } from '@/data/photos'

type LightboxProps = {
  photos: readonly Photo[]
  index: number
  onClose: () => void
  onIndexChange: (index: number) => void
}

const SWIPE_DISTANCE = 50

/** Accessible photo viewer: keyboard, touch swipe, visible close control, scroll lock, aspect ratio preserved. */
export const Lightbox: FC<LightboxProps> = ({ index, onClose, onIndexChange, photos }) => {
  const closeRef = useRef<HTMLButtonElement>(null)
  const swipeStart = useRef<number | null>(null)
  const photo = photos[index]
  const total = photos.length

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    const previousFocus = document.activeElement

    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow

      if (previousFocus instanceof HTMLElement) {
        previousFocus.focus()
      }
    }
  }, [])

  useEffect(() => {
    const step = (direction: 1 | -1): void => onIndexChange((index + direction + total) % total)

    const handleKey = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') step(1)
      if (event.key === 'ArrowLeft') step(-1)
    }

    window.addEventListener('keydown', handleKey)

    return () => window.removeEventListener('keydown', handleKey)
  }, [index, onClose, onIndexChange, total])

  if (!photo) {
    return null
  }

  const goTo = (direction: 1 | -1): void => onIndexChange((index + direction + total) % total)

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>): void => {
    swipeStart.current = event.clientX
  }

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>): void => {
    const start = swipeStart.current
    swipeStart.current = null

    if (start === null) return

    const distance = event.clientX - start

    if (Math.abs(distance) > SWIPE_DISTANCE) {
      goTo(distance < 0 ? 1 : -1)
    }
  }

  return createPortal(
    <div
      aria-label="Photograph viewer"
      aria-modal="true"
      className="fixed inset-0 z-300 flex items-center justify-center bg-background/97"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      role="dialog"
    >
      <button
        ref={closeRef}
        aria-label="Close viewer"
        className="absolute right-4 top-4 flex size-12 items-center justify-center rounded-full border border-border-strong text-foreground transition-colors hover:border-accent md:right-6 md:top-6"
        onClick={onClose}
        type="button"
      >
        <CloseIcon />
      </button>
      <button
        aria-label="Previous photograph"
        className="absolute left-3 top-1/2 z-10 flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-border-strong bg-background/60 text-foreground transition-colors hover:border-accent md:left-6"
        onClick={() => goTo(-1)}
        type="button"
      >
        <ChevronLeftIcon />
      </button>
      <div className="relative h-[80vh] w-[88vw] md:h-[84vh]">
        <SafeImage
          alt={photo.alt}
          className="object-contain"
          quality={90}
          sizes="(min-width: 1024px) 88vw, 100vw"
          src={photo.src}
        />
      </div>
      <button
        aria-label="Next photograph"
        className="absolute right-3 top-1/2 z-10 flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-border-strong bg-background/60 text-foreground transition-colors hover:border-accent md:right-6"
        onClick={() => goTo(1)}
        type="button"
      >
        <ChevronRightIcon />
      </button>
      <p className="absolute bottom-4 left-0 right-0 px-16 text-center text-label uppercase tracking-nav text-muted-foreground">
        {index + 1} / {total} · {photo.alt}
      </p>
    </div>,
    document.body,
  )
}
