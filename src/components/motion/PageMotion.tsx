'use client'

import { useEffect, useRef, type FC, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { motion } from 'motion/react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

type PageMotionProps = { children: ReactNode }

/** Becomes true after the first mount so only later navigations get the fade-and-rise. */
let hasMounted = false

/**
 * One place for scroll-driven motion. Server components stay server components and only
 * add data attributes: data-reveal, data-clip, data-parallax, data-char, data-progress.
 * Everything animates transform and opacity only.
 */
export const PageMotion: FC<PageMotionProps> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    hasMounted = true
  }, [])

  useGSAP(
    () => {
      document.documentElement.dataset.motion = 'ready'

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return
      }

      const q = gsap.utils.selector(ref)
      const revealItems = q<HTMLElement>('[data-reveal]')

      gsap.set(revealItems, { y: 28 })

      ScrollTrigger.batch(revealItems, {
        start: 'top 90%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1, overwrite: true }),
      })

      q<HTMLElement>('[data-clip]').forEach((element) => {
        gsap.to(element, {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.3,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: element, start: 'top 88%', once: true },
        })
      })

      q<HTMLElement>('[data-parallax]').forEach((element) => {
        gsap.fromTo(
          element,
          { yPercent: -7 },
          {
            yPercent: 7,
            ease: 'none',
            scrollTrigger: {
              trigger: element.parentElement ?? element,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          },
        )
      })

      q<HTMLElement>('[data-progress]').forEach((element) => {
        gsap.fromTo(
          element,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: element.parentElement ?? element,
              start: 'top 75%',
              end: 'bottom 55%',
              scrub: 1,
            },
          },
        )
      })

      const characters = q<HTMLElement>('[data-char]')

      if (characters.length > 0) {
        gsap.fromTo(
          characters,
          { opacity: 0, yPercent: 60 },
          { opacity: 1, yPercent: 0, duration: 1, stagger: 0.04, ease: 'power3.out', delay: 0.1 },
        )
      }

      void document.fonts.ready.then(() => ScrollTrigger.refresh())
    },
    { scope: ref },
  )

  return (
    <motion.div
      ref={ref}
      animate={{ opacity: 1, y: 0 }}
      initial={hasMounted ? { opacity: 0, y: 14 } : false}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
