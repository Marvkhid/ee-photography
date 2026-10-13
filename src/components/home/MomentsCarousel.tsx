'use client'

import { useRef, useState, type FC, type KeyboardEvent, type PointerEvent } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/ui/Icons'
import { SafeImage } from '@/components/ui/SafeImage'
import type { FeaturedSlide } from '@/data/home'
import { cn } from '@/lib/cn'

gsap.registerPlugin(useGSAP)

type MomentsCarouselProps = {
  slides: readonly FeaturedSlide[]
  startIndex: number
}

const SWIPE_DISTANCE = 50

const controlClass =
  'flex size-11 items-center justify-center rounded-full border border-border-strong text-muted-foreground transition-colors hover:border-accent hover:text-foreground'

/** Layered 3D photo carousel: the active photograph comes forward, neighbours sit back at an angle. */
export const MomentsCarousel: FC<MomentsCarouselProps> = ({ slides, startIndex }) => {
  const stageRef = useRef<HTMLDivElement>(null)
  const firstRender = useRef(true)
  const swipeStart = useRef<number | null>(null)
  const [index, setIndex] = useState(startIndex)
  const count = slides.length
  const half = Math.floor(count / 2)

  useGSAP(
    () => {
      const compact = window.innerWidth < 900
      const step = compact ? 80 : 135
      const lift = compact ? 30 : 70
      const instant = firstRender.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const items = gsap.utils.selector(stageRef)<HTMLElement>('[data-slide]')

      items.forEach((element, position) => {
        const offset = ((position - index + count + half) % count) - half
        const distance = Math.abs(offset)

        gsap.to(element, {
          x: offset * step + Math.sign(offset) * (offset === 0 ? 0 : lift),
          rotationY: -offset * 26,
          z: offset === 0 ? 110 : -distance * 130,
          scale: offset === 0 ? 1.22 : Math.max(0.55, 0.82 - distance * 0.07),
          opacity: distance > 2 ? 0 : 1 - distance * 0.25,
          zIndex: 10 - distance,
          filter: `brightness(${offset === 0 ? 1 : 0.62})`,
          pointerEvents: distance > 2 ? 'none' : 'auto',
          duration: instant ? 0 : 1.1,
          ease: 'power3.out',
          overwrite: true,
        })
      })

      firstRender.current = false
    },
    { dependencies: [index], scope: stageRef },
  )

  const go = (direction: 1 | -1): void => setIndex((current) => (current + direction + count) % count)

  const handleKey = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'ArrowRight') go(1)
    if (event.key === 'ArrowLeft') go(-1)
  }

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>): void => {
    const start = swipeStart.current
    swipeStart.current = null

    if (start !== null && Math.abs(event.clientX - start) > SWIPE_DISTANCE) {
      go(event.clientX < start ? 1 : -1)
    }
  }

  return (
    <div>
      <div
        ref={stageRef}
        aria-roledescription="carousel"
        aria-label="Featured photographs"
        className="carousel-stage"
        onKeyDown={handleKey}
        onPointerDown={(event) => {
          swipeStart.current = event.clientX
        }}
        onPointerUp={handlePointerUp}
        role="group"
      >
        {slides.map((slide, position) => (
          <button
            key={slide.src}
            aria-current={position === index}
            aria-label={`Show photograph ${position + 1} of ${count}: ${slide.alt}`}
            className="carousel-slide cursor-pointer"
            data-slide
            onClick={() => setIndex(position)}
            type="button"
          >
            <SafeImage alt={slide.alt} sizes="(min-width: 1024px) 270px, 220px" src={slide.src} />
          </button>
        ))}
      </div>
      <div className="mt-2 flex items-center justify-center gap-5">
        <button aria-label="Previous photograph" className={controlClass} onClick={() => go(-1)} type="button">
          <ChevronLeftIcon />
        </button>
        <div className="flex items-center gap-1.5">
          {slides.map((slide, position) => (
            <button
              key={slide.src}
              aria-label={`Go to photograph ${position + 1}`}
              className="flex size-6 items-center justify-center"
              onClick={() => setIndex(position)}
              type="button"
            >
              <span
                className={cn(
                  'block h-1 rounded-full transition-all duration-500',
                  position === index ? 'w-5 bg-accent' : 'w-1 bg-border-strong',
                )}
              />
            </button>
          ))}
        </div>
        <button aria-label="Next photograph" className={controlClass} onClick={() => go(1)} type="button">
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  )
}
