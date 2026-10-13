'use client'

import { useEffect, useState, type FC } from 'react'
import { SafeImage } from '@/components/ui/SafeImage'
import { cn } from '@/lib/cn'
import type { VideoSlot } from '@/data/videos'

export type VideoSources = { mp4: boolean; webm: boolean }

type VideoLoopProps = {
  slot: VideoSlot
  /** Which video files actually exist; missing ones are never requested. */
  sources: VideoSources
  sizes: string
  className?: string | undefined
  /** Gradient overlays and blending are left to the parent. */
}

/**
 * A short, muted, looping clip. The poster photograph is always rendered first with a slow
 * cinematic zoom; the video fades in over it once it can play. If the file has not been added,
 * or the visitor prefers reduced motion, the poster simply stays (static for reduced motion).
 */
export const VideoLoop: FC<VideoLoopProps> = ({ className, sizes, slot, sources }) => {
  const [ready, setReady] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(true)

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  return (
    <div className={cn('relative overflow-hidden bg-surface', className)}>
      <div className="absolute inset-0 animate-kenburns motion-reduce:animate-none">
        <SafeImage alt={slot.alt} sizes={sizes} src={slot.poster} />
      </div>
      {reducedMotion || (!sources.mp4 && !sources.webm) ? null : (
        <video
          aria-hidden
          autoPlay
          className={cn(
            'absolute inset-0 size-full object-cover transition-opacity duration-1000',
            ready ? 'opacity-100' : 'opacity-0',
          )}
          loop
          muted
          onCanPlay={() => setReady(true)}
          playsInline
          poster={slot.poster}
          preload="metadata"
        >
          {sources.webm ? <source src={slot.webm} type="video/webm" /> : null}
          {sources.mp4 ? <source src={slot.mp4} type="video/mp4" /> : null}
        </video>
      )}
    </div>
  )
}
