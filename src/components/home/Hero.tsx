'use client'

import { useRef, type FC } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { INTRO_EVENTS, getIntroState } from '@/components/intro/intro-events'
import { ButtonLink } from '@/components/ui/Button'
import { ChevronDownIcon } from '@/components/ui/Icons'
import { SafeImage } from '@/components/ui/SafeImage'
import { brand } from '@/config/brand'
import { services } from '@/data/categories'

gsap.registerPlugin(useGSAP)

const WORDMARK = ['E', '&', 'E'] as const

/**
 * Cinematic hero: two illuminated "doorway" photographs frame the typed wordmark.
 * It is already rendered while the intro curtain plays, and enters when the curtains open.
 */
export const Hero: FC = () => {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    (_context, contextSafe) => {
      const q = gsap.utils.selector(ref)
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const items = q('[data-hero-item]')

      const hide = (): void => {
        gsap.set(items, { opacity: 0 })
      }

      const enter = (): void => {
        if (reduced) {
          gsap.set(items, { opacity: 1 })

          return
        }

        gsap
          .timeline({ defaults: { ease: 'power3.out' } })
          .fromTo(q('[data-hero-item="door"]'), { opacity: 0, yPercent: 5 }, { opacity: 1, yPercent: 0, duration: 1.9, stagger: 0.14, ease: 'power2.out' }, 0)
          .fromTo(q('[data-hero-item="char"]'), { opacity: 0, yPercent: 55 }, { opacity: 1, yPercent: 0, duration: 1.6, stagger: 0.12, ease: 'power2.out' }, 0.15)
          .fromTo(q('[data-hero-item="rule"]'), { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: 1.6, ease: 'power2.out' }, 0.5)
          .fromTo(q('[data-hero-item="text"]'), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 1.1, stagger: 0.12, ease: 'power2.out' }, 0.8)
      }

      const safeEnter = contextSafe ? contextSafe(enter) : enter

      if (getIntroState() !== 'pending') {
        safeEnter()
      }

      /* Failsafe: whenever the intro ends (finished, skipped or timed out), anything still hidden is revealed. */
      const revealIfHidden = (): void => {
        const hidden = items.filter((element) => Number.parseFloat(getComputedStyle(element).opacity) < 0.05)

        if (hidden.length > 0) {
          gsap.to(hidden, { opacity: 1, y: 0, yPercent: 0, scaleX: 1, duration: 0.8, ease: 'power2.out' })
        }
      }
      const safeReveal = contextSafe ? contextSafe(revealIfHidden) : revealIfHidden
      const observer = new MutationObserver(() => {
        if (getIntroState() === 'done') {
          gsap.delayedCall(0.5, safeReveal)
        }
      })

      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-intro'] })
      window.addEventListener(INTRO_EVENTS.start, hide)
      window.addEventListener(INTRO_EVENTS.heroIn, safeEnter)

      if (!reduced) {
        if (window.matchMedia('(hover: hover)').matches) {
          const leftX = gsap.quickTo(q('[data-side="left"]'), 'x', { duration: 1.2, ease: 'power3' })
          const rightX = gsap.quickTo(q('[data-side="right"]'), 'x', { duration: 1.2, ease: 'power3' })
          const contentY = gsap.quickTo(q('[data-hero-content]'), 'y', { duration: 1.2, ease: 'power3' })
          const section = ref.current

          const handleMove = (event: PointerEvent): void => {
            const x = event.clientX / window.innerWidth - 0.5
            const y = event.clientY / window.innerHeight - 0.5

            leftX(x * 22)
            rightX(x * 22)
            contentY(y * 8)
          }

          section?.addEventListener('pointermove', handleMove)

          return () => {
            section?.removeEventListener('pointermove', handleMove)
            window.removeEventListener(INTRO_EVENTS.start, hide)
            window.removeEventListener(INTRO_EVENTS.heroIn, safeEnter)
            observer.disconnect()
          }
        }
      }

      return () => {
        window.removeEventListener(INTRO_EVENTS.start, hide)
        window.removeEventListener(INTRO_EVENTS.heroIn, safeEnter)
        observer.disconnect()
      }
    },
    { scope: ref },
  )

  return (
    <section
      ref={ref}
      aria-label={brand.name}
      className="hero-bg relative grid place-items-center overflow-hidden"
      data-intro-camera
      id="hero"
    >
      <div className="hero-door" data-hero-item="door" data-side="left">
        <div className="relative size-full">
          <SafeImage alt="Portrait of a woman in warm golden light" priority sizes="175px" src="/images/hero/hero-left.jpg" />
        </div>
      </div>
      <div className="hero-door" data-hero-item="door" data-side="right">
        <div className="relative size-full">
          <SafeImage alt="Portrait of a man in blue and red light" priority sizes="175px" src="/images/hero/hero-right.jpg" />
        </div>
      </div>
      <div className="relative z-10 px-5 pt-10 text-center" data-hero-content>
        <span aria-hidden className="hero-scrim md:hidden" />
        <div className="flex items-center justify-center gap-4 md:gap-6">
          <span className="h-px w-10 origin-right bg-linear-to-r from-transparent to-accent md:w-14" data-hero-item="rule" />
          <h1 className="flex font-serif text-7xl font-medium md:text-8xl lg:text-9xl">
            <span className="sr-only">{brand.name}</span>
            {WORDMARK.map((character, index) => (
              <span key={`${character}-${index}`} aria-hidden className="inline-block" data-hero-item="char">
                {character}
              </span>
            ))}
          </h1>
          <span className="h-px w-10 origin-left bg-linear-to-l from-transparent to-accent md:w-14" data-hero-item="rule" />
        </div>
        <p aria-hidden className="mb-12 mt-2 pl-3 text-xs font-light uppercase tracking-wordmark md:text-base" data-hero-item="text">
          Photography
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-label uppercase tracking-eyebrow text-muted-foreground" data-hero-item="text">
          {services.map((service, index) => (
            <li key={service.slug} className="flex items-center gap-6">
              {index > 0 ? <span aria-hidden className="text-accent">/</span> : null}
              {service.name}
            </li>
          ))}
        </ul>
        <p className="mx-auto mb-6 mt-7 font-serif text-xl italic text-muted-foreground md:text-2xl" data-hero-item="text">
          {brand.tagline}
        </p>
        <div className="flex flex-wrap justify-center gap-3" data-hero-item="text">
          <ButtonLink href="/contact" size="sm">
            Book now
          </ButtonLink>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-6 text-center text-label uppercase tracking-eyebrow text-muted-foreground" data-hero-item="text">
        Scroll to explore
        <ChevronDownIcon className="mx-auto mt-2 size-4 animate-bob text-accent motion-reduce:animate-none" />
      </div>
    </section>
  )
}
