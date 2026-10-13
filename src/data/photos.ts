import { CATEGORY_SLUGS, type CategorySlug } from '@/data/categories'

/**
 * Gallery photographs.
 * `shape` is the crop shown in galleries; the full image always opens in the lightbox.
 */
export type PhotoShape = 'tall' | 'classic' | 'portrait' | 'landscape'

export type Photo = {
  id: string
  src: string
  alt: string
  category: CategorySlug
  shape: PhotoShape
  /** CSS object-position, e.g. "50% 25%" to keep faces in frame. */
  focal?: string
}

const pad = (n: number): string => String(n).padStart(2, '0')

type PhotoSeed = Pick<Photo, 'alt' | 'shape'> & { focal?: string }

const buildPhotos = (
  category: CategorySlug,
  filePrefix: string,
  seeds: readonly PhotoSeed[],
): readonly Photo[] =>
  seeds.map((seed, index) => {
    const number = pad(index + 1)
    const base = {
      id: `${filePrefix}-${number}`,
      src: `/images/gallery/${category}/${filePrefix}-${number}.jpg`,
      alt: seed.alt,
      category,
      shape: seed.shape,
    }

    return seed.focal ? { ...base, focal: seed.focal } : base
  })

const portraits = buildPhotos('portraits', 'portrait', [
  { alt: 'Three generations of a family smiling together in black and white', shape: 'tall', focal: '50% 30%' },
  { alt: 'Portrait of a man in blue and red studio light', shape: 'portrait', focal: '50% 30%' },
  { alt: 'Portrait of a woman in warm golden studio light', shape: 'tall', focal: '50% 30%' },
  { alt: 'Woman seated on a dark studio floor', shape: 'classic', focal: '50% 35%' },
  { alt: 'Woman with her hands framing her face in warm red light', shape: 'portrait', focal: '50% 30%' },
  { alt: 'Smiling woman in a black and white portrait', shape: 'tall', focal: '50% 30%' },
  { alt: 'Woman in a red dress in dark, low-key light', shape: 'classic', focal: '50% 40%' },
  { alt: 'Smiling woman with braids seated on a chair', shape: 'portrait', focal: '50% 35%' },
  { alt: 'Black and white portrait with strong contrast', shape: 'tall', focal: '50% 30%' },
])

const weddings = buildPhotos('weddings', 'wedding', [
  { alt: 'Wedding couple standing forehead to forehead', shape: 'tall', focal: '50% 30%' },
  { alt: 'Smiling couple in traditional wedding attire', shape: 'portrait', focal: '50% 30%' },
  { alt: 'Wedding couple at the venue in black and white', shape: 'landscape', focal: '50% 50%' },
  { alt: 'Couple embracing in black and white', shape: 'classic', focal: '50% 35%' },
  { alt: 'Groom with coral beads and a wedding ring on his chest', shape: 'tall', focal: '50% 50%' },
])

const birthdays = buildPhotos('birthdays', 'birthday', [
  { alt: 'Birthday portrait of a smiling girl lying on patterned fabric', shape: 'landscape', focal: '50% 50%' },
  { alt: 'Children laughing together under birthday balloons', shape: 'tall', focal: '50% 50%' },
  { alt: 'Woman celebrating her birthday with sparkling confetti', shape: 'portrait', focal: '50% 35%' },
  { alt: 'Woman in a colourful dress against a golden backdrop', shape: 'classic', focal: '50% 40%' },
  { alt: 'Little girl in a pink dress reaching towards the camera', shape: 'tall', focal: '50% 40%' },
  { alt: 'Smiling woman in front of a pink backdrop', shape: 'portrait', focal: '50% 35%' },
])

const graduations = buildPhotos('graduations', 'graduation', [
  { alt: 'Young man in a green top against a golden backdrop', shape: 'tall', focal: '50% 30%' },
  { alt: 'Smiling woman blowing a kiss to the camera', shape: 'portrait', focal: '50% 35%' },
])

const headshots = buildPhotos('headshots', 'headshot', [
  { alt: 'Smiling man with glasses in a studio headshot', shape: 'portrait', focal: '50% 30%' },
  { alt: 'Smiling woman with her hands framing her face', shape: 'tall', focal: '50% 35%' },
  { alt: 'Smiling woman in a white shirt against a pink backdrop', shape: 'classic', focal: '50% 35%' },
])

const events = buildPhotos('events', 'event', [
  { alt: 'Drummer playing as water splashes around the drum', shape: 'portrait', focal: '50% 35%' },
  { alt: 'Vendor carrying baskets on a beach in black and white', shape: 'tall', focal: '50% 50%' },
  { alt: 'Girl twirling in a tulle dress in black and white', shape: 'classic', focal: '50% 45%' },
])

export const photos: readonly Photo[] = [
  ...portraits,
  ...weddings,
  ...birthdays,
  ...graduations,
  ...headshots,
  ...events,
]

export const getPhotosByCategory = (category: CategorySlug): readonly Photo[] =>
  photos.filter((photo) => photo.category === category)

/** Categories that currently have at least one photograph. */
export const categoriesWithPhotos: readonly CategorySlug[] = CATEGORY_SLUGS.filter((slug) =>
  photos.some((photo) => photo.category === slug),
)
