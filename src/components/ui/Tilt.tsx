'use client'

import { useRef, type FC, type PointerEvent, type ReactNode } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { cn } from '@/lib/cn'

gsap.registerPlugin(useGSAP)

type TiltProps = {
  children: ReactNode
  className?: string
  /** Maximum rotation in degrees. */
  max?: number
}

/** Subtle pointer-driven tilt. Mouse only: disabled on touch and when reduced motion is requested. */
export const Tilt: FC<TiltProps> = ({ children, className, max = 4 }) => {
  const ref = useRef<HTMLDivElement>(null)
  const { contextSafe } = useGSAP({ scope: ref })

  const canTilt = (event: PointerEvent<HTMLDivElement>): boolean =>
    event.pointerType === 'mouse' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const handleMove = contextSafe((event: PointerEvent<HTMLDivElement>) => {
    const element = ref.current

    if (!element || !canTilt(event)) {
      return
    }

    const bounds = element.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5

    gsap.to(element, {
      rotationY: x * max * 2,
      rotationX: -y * max * 2,
      transformPerspective: 900,
      duration: 0.5,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  })

  const handleLeave = contextSafe(() => {
    gsap.to(ref.current, { rotationX: 0, rotationY: 0, duration: 0.8, ease: 'power3.out' })
  })

  return (
    <div ref={ref} className={cn('will-change-transform', className)} onPointerLeave={handleLeave} onPointerMove={handleMove}>
      {children}
    </div>
  )
}
