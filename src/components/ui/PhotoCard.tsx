import Link from 'next/link'
import type { FC } from 'react'
import { ArrowRightIcon } from '@/components/ui/Icons'
import { SafeImage } from '@/components/ui/SafeImage'
import { Tilt } from '@/components/ui/Tilt'
import { cn } from '@/lib/cn'

type PhotoCardProps = {
  href: string
  title: string
  subtitle?: string
  image: string
  alt: string
  sizes: string
  /** Tailwind aspect-ratio class, e.g. "aspect-3/4". */
  aspect: string
  focal?: string
}

/** Fully clickable image card: zoom inside its frame, deeper overlay and a moving arrow on hover. */
export const PhotoCard: FC<PhotoCardProps> = ({ alt, aspect, focal, href, image, sizes, subtitle, title }) => (
  <Tilt>
    <Link
      className={cn('group relative block overflow-hidden border border-border bg-surface-elevated', aspect)}
      href={href}
    >
      <SafeImage
        alt={alt}
        className="transition-transform duration-1000 ease-out group-hover:scale-105"
        focal={focal}
        sizes={sizes}
        src={image}
      />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-linear-to-t from-background/90 via-background/40 to-transparent px-5 pb-5 pt-16 transition-colors duration-500 group-hover:from-background">
        <span>
          <span className="block text-xs uppercase tracking-eyebrow text-foreground">{title}</span>
          {subtitle ? <span className="mt-1 block text-xs text-muted-foreground">{subtitle}</span> : null}
        </span>
        <ArrowRightIcon className="size-3.5 text-foreground transition-transform duration-500 group-hover:translate-x-1.5" />
      </div>
    </Link>
  </Tilt>
)
