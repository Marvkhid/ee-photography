'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState, type FC } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { brand } from '@/config/brand'
import {
  getIntroState,
  hasSeenIntro,
  INTRO_EVENTS,
  markIntroSeen,
  prefersReducedMotion,
  setIntroState,
} from '@/components/intro/intro-events'
import {
  createIntroLayout,
  INTRO_COLUMNS,
  introTileSources,
  preloadIntroImages,
  type IntroLayout,
} from '@/components/intro/intro-layout'

gsap.registerPlugin(useGSAP)

const LOW_POWER_CORES = 2
const WATCHDOG_MS = 16000

/** Very low-end devices get the simple fade instead of the 3D mosaic, to stay smooth. */
const isLowPowerDevice = (): boolean =>
  navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency <= LOW_POWER_CORES

type TileSpec = { src: string; column: number; row: number }
type Side = 'left' | 'right'

const tileSpecs: readonly TileSpec[] = introTileSources.map((src, index) => ({
  src,
  column: index % INTRO_COLUMNS,
  row: Math.floor(index / INTRO_COLUMNS),
}))

const HALF_COLUMNS = INTRO_COLUMNS / 2
const SPECK_POSITIONS = [
  [18, 30], [28, 68], [41, 22], [52, 74], [63, 28], [72, 64], [81, 38], [34, 46], [66, 50],
] as const

const sideOf = (column: number): Side => (column < HALF_COLUMNS ? 'left' : 'right')

const PANE_SIDES: readonly Side[] = ['left', 'right']

/**
 * The signature E&E photographic curtain reveal.
 * Photo tiles fly in and lock together into the letters E & E, hold, then the black
 * panels carrying them part like a curtain to reveal the already-rendered homepage.
 * Plays once per session, can be skipped, and is replayable from the footer.
 */
export const IntroOverlay: FC = () => {
  const rootRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const startedRef = useRef(false)
  const [layout, setLayout] = useState<IntroLayout | null>(null)
  const [playToken, setPlayToken] = useState(0)

  const begin = useCallback(async (): Promise<void> => {
    setIntroState('pending')
    document.documentElement.dataset.introStarted = '1'
    window.scrollTo(0, 0)
    window.dispatchEvent(new Event(INTRO_EVENTS.start))

    const simple = prefersReducedMotion() || isLowPowerDevice()
    const next = simple ? null : (await Promise.all([createIntroLayout(window.innerWidth), preloadIntroImages()]))[0]

    setLayout(next)
    setPlayToken((token) => token + 1)
  }, [])

  useEffect(() => {
    const handleReplay = (): void => {
      window.scrollTo(0, 0)
      void begin()
    }

    window.addEventListener(INTRO_EVENTS.replay, handleReplay)

    if (!startedRef.current) {
      startedRef.current = true

      if (!hasSeenIntro() && !prefersReducedMotion()) {
        void begin()
      } else {
        setIntroState('done')
      }
    }

    return () => window.removeEventListener(INTRO_EVENTS.replay, handleReplay)
  }, [begin])

  const { contextSafe } = useGSAP(
    () => {
      const root = rootRef.current

      if (!root || playToken === 0) {
        return
      }

      const camera = document.querySelector<HTMLElement>('[data-intro-camera]')
      const header = document.querySelector<HTMLElement>('[data-site-header]')
      const cameraTargets = camera ? [camera] : []
      const resetTargets = [camera, header].filter((element): element is HTMLElement => element !== null)
      const heroIn = (): void => {
        window.dispatchEvent(new Event(INTRO_EVENTS.heroIn))
      }
      const finish = (): void => {
        markIntroSeen()
        setIntroState('done')
        history.scrollRestoration = 'auto'
        window.dispatchEvent(new Event(INTRO_EVENTS.done))
        gsap.set(resetTargets, { clearProps: 'transform' })
        gsap.set(root, { clearProps: 'opacity' })
      }

      /* Reduced motion, or the lettering could not be built: a short, simple fade. */
      if (!layout) {
        gsap.set(root, { opacity: 1 })
        gsap.to(root, { opacity: 0, duration: 0.6, delay: 0.2, ease: 'power2.out', onComplete: finish })
        gsap.delayedCall(0.3, heroIn)

        return
      }

      root.style.setProperty('--intro-mask', `url(${layout.maskUrl})`)

      const q = gsap.utils.selector(root)
      const tiles = q<HTMLElement>('[data-tile]')
      const leftTiles = q<HTMLElement>('[data-side="left"] [data-tile]')
      const rightTiles = q<HTMLElement>('[data-side="right"] [data-tile]')
      const random = gsap.utils.random

      gsap.set(cameraTargets, { scale: 1.12, transformOrigin: '50% 50%' })
      gsap.set(q('[data-intro-dim]'), { opacity: 0.65 })
      gsap.set(header, { yPercent: -100 })

      const timeline = gsap.timeline({ onComplete: finish })

      timelineRef.current = timeline

      timeline
        .to(q('[data-intro-skip]'), { opacity: 1, duration: 0.6 }, 0.6)
        .fromTo(
          q('[data-intro-speck]'),
          { opacity: 0, scale: 0.3 },
          { opacity: 0.9, scale: 1, duration: 0.8, stagger: { amount: 0.5, from: 'random' }, ease: 'sine.out' },
          0,
        )
        .to(q('[data-intro-speck]'), { opacity: 0, duration: 0.9, ease: 'sine.inOut' }, 1.1)

      tiles.forEach((tile) => {
        const column = Number(tile.dataset.column)
        const row = Number(tile.dataset.row)
        const distance = Math.hypot((column - 2.5) / 2.5, row - 1) / 1.4
        const delay = distance * 0.7 + random(0, 0.16)

        timeline.fromTo(
          tile,
          {
            x: random(-0.4, 0.4) * window.innerWidth,
            y: random(-0.4, 0.4) * window.innerHeight,
            z: random(-1300, -600),
            rotationY: random(-35, 35),
            rotationX: random(-16, 16),
            opacity: 0,
          },
          { x: 0, y: 0, z: 0, rotationX: 0, rotationY: 0, opacity: 1, duration: 1.9, ease: 'power3.out' },
          0.5 + delay,
        )
      })

      /* One continuous, gently eased movement for each panel: no stop between the first gap and the full opening. */
      const curtainEase = 'power2.inOut'
      const curtainDuration = 3.2

      timeline
        .to(q('[data-intro-glow]'), { opacity: 1, duration: 1.2, ease: 'sine.inOut' }, 2.1)
        .fromTo(q('[data-intro-logo]'), { opacity: 0, y: 10 }, { opacity: 0.92, y: 0, duration: 1, ease: 'power2.out' }, 2.3)
        .to(q('[data-intro-half]'), { scale: 1.03, duration: 0.9, ease: 'sine.inOut' }, 2.6)
        .addLabel('open', 3.5)
        .to([q('[data-intro-logo]'), q('[data-intro-skip]')], { opacity: 0, duration: 0.7, ease: 'sine.inOut' }, 'open')
        .to(q('[data-intro-glow]'), { opacity: 0, duration: 1.6, ease: 'sine.inOut' }, 'open+=0.6')
        .to(q('.intro-seam'), { opacity: 1, duration: 0.9, ease: 'sine.out' }, 'open')
        .fromTo(q('[data-intro-flare]'), { opacity: 0, scaleX: 0.1 }, { opacity: 1, scaleX: 1, duration: 1.4, ease: 'sine.out' }, 'open')
        .to(q('[data-intro-flare]'), { opacity: 0, duration: 1.8, ease: 'sine.inOut' }, 'open+=1.8')
        .to(q('[data-side="left"].intro-pane'), { xPercent: -135, rotationY: 22, z: 200, duration: curtainDuration, ease: curtainEase }, 'open')
        .to(q('[data-side="right"].intro-pane'), { xPercent: 135, rotationY: -22, z: 200, duration: curtainDuration, ease: curtainEase }, 'open')
        .to(leftTiles, { x: (index: number) => -(40 + (index % HALF_COLUMNS) * 70), duration: curtainDuration, ease: curtainEase }, 'open')
        .to(rightTiles, { x: (index: number) => 40 + (index % HALF_COLUMNS) * 70, duration: curtainDuration, ease: curtainEase }, 'open')
        .to(cameraTargets, { scale: 1, duration: 3.4, ease: 'power2.out' }, 'open+=0.2')
        .to(q('[data-intro-dim]'), { opacity: 0, duration: 3.2, ease: 'power2.out' }, 'open+=0.2')
        .to(header, { yPercent: 0, duration: 1.2, ease: 'power2.out' }, 'open+=2.1')
        .call(heroIn, undefined, 'open+=1.4')

      /* Watchdog: if the page was frozen or throttled, jump the sequence to its end instead of leaving it half done. */
      const watchdog = window.setTimeout(() => {
        if (getIntroState() === 'pending') {
          timeline.progress(1)
        }
      }, WATCHDOG_MS)

      return () => window.clearTimeout(watchdog)
    },
    { dependencies: [layout, playToken], scope: rootRef },
  )

  const handleSkip = contextSafe((): void => {
    const root = rootRef.current
    const camera = document.querySelector<HTMLElement>('[data-intro-camera]')
    const header = document.querySelector<HTMLElement>('[data-site-header]')
    const resetTargets = [camera, header].filter((element): element is HTMLElement => element !== null)

    timelineRef.current?.kill()
    markIntroSeen()
    window.dispatchEvent(new Event(INTRO_EVENTS.heroIn))
    gsap.to(header, { yPercent: 0, duration: 0.4 })
    gsap.to(resetTargets.filter((element) => element !== header), { scale: 1, duration: 0.4 })
    gsap.to(root, {
      opacity: 0,
      duration: 0.4,
      onComplete: () => {
        setIntroState('done')
        history.scrollRestoration = 'auto'
        window.dispatchEvent(new Event(INTRO_EVENTS.done))
        gsap.set(resetTargets, { clearProps: 'transform' })
        gsap.set(root, { clearProps: 'opacity' })
      },
    })
  })

  const tileWidth = layout ? layout.width / INTRO_COLUMNS : 0
  const tileHeight = layout ? layout.height / (tileSpecs.length / INTRO_COLUMNS) : 0

  return (
    <div ref={rootRef} className="intro-root" data-intro-root>
      <div className="intro-dim" data-intro-dim />
      <div className="intro-flare" data-intro-flare />
      {PANE_SIDES.map((side) => (
        <div key={side} className="intro-pane" data-side={side}>
          <div
            className="intro-half"
            data-intro-half
            style={
              layout
                ? { width: layout.width / 2, height: layout.height, marginTop: -layout.height / 2 }
                : undefined
            }
          >
            {layout
              ? tileSpecs
                  .filter((tile) => sideOf(tile.column) === side)
                  .map((tile) => {
                    const localColumn = tile.column % HALF_COLUMNS

                    return (
                      <div
                        key={tile.src}
                        aria-hidden
                        className="intro-tile"
                        data-column={tile.column}
                        data-row={tile.row}
                        data-tile
                        style={{
                          width: tileWidth,
                          height: tileHeight,
                          left: localColumn * tileWidth,
                          top: tile.row * tileHeight,
                          opacity: 0,
                          backgroundColor: '#3a3029',
                          backgroundBlendMode: 'lighten',
                          backgroundImage: `url(${tile.src})`,
                          backgroundPosition: 'center',
                          maskSize: `${layout.width}px ${layout.height}px`,
                          WebkitMaskSize: `${layout.width}px ${layout.height}px`,
                          maskPosition: `${-tile.column * tileWidth}px ${-tile.row * tileHeight}px`,
                          WebkitMaskPosition: `${-tile.column * tileWidth}px ${-tile.row * tileHeight}px`,
                          maskImage: 'var(--intro-mask)',
                          WebkitMaskImage: 'var(--intro-mask)',
                        }}
                      />
                    )
                  })
              : null}
          </div>
          <i className="intro-seam" />
        </div>
      ))}
      <div className="intro-glow" data-intro-glow />
      {SPECK_POSITIONS.map(([left, top]) => (
        <i key={`${left}-${top}`} className="intro-speck" data-intro-speck style={{ left: `${left}%`, top: `${top}%` }} />
      ))}
      {layout ? (
        <Image
          alt=""
          className="absolute left-1/2 h-12 w-auto -translate-x-1/2 opacity-0 md:h-16"
          data-intro-logo
          height={brand.logo.height}
          priority
          src={brand.logo.src}
          style={{ top: `calc(50% + ${layout.height / 2 + 36}px)` }}
          width={brand.logo.width}
        />
      ) : null}
      <button
        className="absolute bottom-7 left-1/2 -translate-x-1/2 text-label uppercase tracking-eyebrow text-subtle opacity-0 transition-colors hover:text-foreground"
        data-intro-skip
        onClick={handleSkip}
        type="button"
      >
        Skip intro
      </button>
    </div>
  )
}
