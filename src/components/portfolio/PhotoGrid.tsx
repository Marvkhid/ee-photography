'use client'

import { useState, type FC } from 'react'
import { motion } from 'motion/react'
import { ArrowRightIcon } from '@/components/ui/Icons'
import { Lightbox } from '@/components/ui/Lightbox'
import { SafeImage } from '@/components/ui/SafeImage'
import { getCategory } from '@/data/categories'
import type { Photo, PhotoShape } from '@/data/photos'
import { assertNever } from '@/lib/assert-never'

const aspectFor = (shape: PhotoShape): string => {
  switch (shape) {
    case 'tall':
      return 'aspect-2/3'
    case 'classic':
      return 'aspect-3/4'
    case 'portrait':
      return 'aspect-4/5'
    case 'landscape':
      return 'aspect-3/2'
    default:
      return assertNever(shape)
  }
}

type PhotoGridProps = {
  photos: readonly Photo[]
  showCategory?: boolean
}

/** Editorial masonry of varied crops. Any photograph opens the lightbox at that position. */
export const PhotoGrid: FC<PhotoGridProps> = ({ photos, showCategory = true }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <>
      <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {photos.map((photo, position) => (
          <motion.li
            key={photo.id}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 break-inside-avoid"
            initial={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.7, delay: Math.min(position, 8) * 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              aria-label={`Open photograph: ${photo.alt}`}
              className={`group relative block w-full cursor-zoom-in overflow-hidden border border-border bg-surface-elevated ${aspectFor(photo.shape)}`}
              onClick={() => setOpenIndex(position)}
              type="button"
            >
              <SafeImage
                alt={photo.alt}
                className="transition-transform duration-1000 ease-out group-hover:scale-105"
                focal={photo.focal}
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                src={photo.src}
              />
              <span className="absolute inset-x-0 bottom-0 flex translate-y-2 items-end justify-between bg-linear-to-t from-background/85 to-transparent px-4 pb-4 pt-12 text-label uppercase tracking-eyebrow opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                {showCategory ? getCategory(photo.category).name : 'View'}
                <ArrowRightIcon />
              </span>
            </button>
          </motion.li>
        ))}
      </ul>
      {openIndex === null ? null : (
        <Lightbox
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onIndexChange={setOpenIndex}
          photos={photos}
        />
      )}
    </>
  )
}
