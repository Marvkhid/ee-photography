import type { FC } from 'react'
import { SafeImage } from '@/components/ui/SafeImage'
import { cn } from '@/lib/cn'

type ParallaxImageProps = {
  src: string
  alt: string
  sizes: string
  focal?: string
  /** Sizing classes for the frame, e.g. "h-96 md:h-160". */
  className?: string
  priority?: boolean
}

/** Image frame with a clip-path reveal and gentle scroll parallax (driven by PageMotion). */
export const ParallaxImage: FC<ParallaxImageProps> = ({
  alt,
  className,
  focal,
  priority = false,
  sizes,
  src,
}) => (
  <div className={cn('relative overflow-hidden', className)} data-clip>
    <div className="absolute inset-x-0 -inset-y-12" data-parallax>
      <SafeImage alt={alt} focal={focal} priority={priority} sizes={sizes} src={src} />
    </div>
  </div>
)
