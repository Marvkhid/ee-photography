'use client'

import Image from 'next/image'
import { useEffect, useRef, useState, type FC } from 'react'
import { CameraIcon } from '@/components/ui/Icons'
import { cn } from '@/lib/cn'

type SafeImageProps = {
  src: string
  alt: string
  sizes: string
  priority?: boolean
  /** CSS object-position, e.g. "50% 30%". */
  focal?: string | undefined
  className?: string
  quality?: 75 | 90
}

/**
 * A photograph that never breaks the layout.
 * - While it loads, a soft skeleton fills its box; it then fades in.
 * - If the file has not been added yet, a dark placeholder is shown instead of a broken-image icon.
 * The parent must be `relative` with a defined size or aspect ratio.
 */
export const SafeImage: FC<SafeImageProps> = ({
  alt,
  className,
  focal,
  priority = false,
  quality = 90,
  sizes,
  src,
}) => {
  const [failedSrc, setFailedSrc] = useState<string | null>(null)
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const element = imageRef.current

    if (element && element.complete) {
      if (element.naturalWidth === 0) {
        setFailedSrc(src)
      } else {
        setLoadedSrc(src)
      }
    }
  }, [src])

  if (failedSrc === src) {
    return (
      <div
        aria-label={alt}
        className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-surface-elevated to-background text-border-strong"
        role="img"
      >
        <CameraIcon />
      </div>
    )
  }

  const loaded = priority || loadedSrc === src

  return (
    <>
      {loaded ? null : <span aria-hidden className="absolute inset-0 animate-pulse bg-surface-elevated" />}
      <Image
        ref={imageRef}
        alt={alt}
        className={cn('object-cover', !loaded && 'img-pending', loaded && !priority && 'animate-fade-in', className)}
        fill
        onError={() => setFailedSrc(src)}
        onLoad={() => setLoadedSrc(src)}
        priority={priority}
        quality={quality}
        sizes={sizes}
        src={src}
        style={focal ? { objectPosition: focal } : undefined}
      />
    </>
  )
}
