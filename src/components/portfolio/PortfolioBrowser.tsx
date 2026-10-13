'use client'

import { useState, type FC } from 'react'
import { PhotoGrid } from '@/components/portfolio/PhotoGrid'
import { EmptyState } from '@/components/ui/EmptyState'
import { categories, type CategorySlug } from '@/data/categories'
import { photos, categoriesWithPhotos } from '@/data/photos'
import { cn } from '@/lib/cn'

type Filter = 'all' | CategorySlug

const chipClass =
  'rounded-full border px-4.5 py-2.5 text-label uppercase tracking-nav transition-colors duration-300'

/** All photographs with category chips. Visitors see only the type of photography they came for. */
export const PortfolioBrowser: FC = () => {
  const [filter, setFilter] = useState<Filter>('all')
  const visible = filter === 'all' ? photos : photos.filter((photo) => photo.category === filter)
  const chips = categories.filter((category) => categoriesWithPhotos.includes(category.slug))

  return (
    <div>
      <div aria-label="Filter by category" className="mb-10 flex flex-wrap gap-2.5" role="group">
        <button
          aria-pressed={filter === 'all'}
          className={cn(chipClass, filter === 'all' ? 'border-accent text-foreground' : 'border-border-strong text-muted-foreground hover:text-foreground')}
          onClick={() => setFilter('all')}
          type="button"
        >
          All
        </button>
        {chips.map((category) => (
          <button
            key={category.slug}
            aria-pressed={filter === category.slug}
            className={cn(chipClass, filter === category.slug ? 'border-accent text-foreground' : 'border-border-strong text-muted-foreground hover:text-foreground')}
            onClick={() => setFilter(category.slug)}
            type="button"
          >
            {category.name}
          </button>
        ))}
      </div>
      {visible.length > 0 ? (
        <PhotoGrid key={filter} photos={visible} />
      ) : (
        <EmptyState
          description="There are no photographs in this category yet. Try another category, or see everything together."
          title="Nothing here yet"
        >
          <button
            className="rounded-full border border-border-strong px-6 py-3 text-label uppercase tracking-button transition-colors hover:border-accent"
            onClick={() => setFilter('all')}
            type="button"
          >
            Show all photographs
          </button>
        </EmptyState>
      )}
    </div>
  )
}
