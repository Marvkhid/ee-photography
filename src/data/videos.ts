/**
 * Short video loops (2–3 seconds, muted, seamless).
 * Drop the .mp4 (and optionally .webm) into public/videos/ with the filename below.
 * Until the file exists, the poster image is shown with a slow cinematic zoom instead.
 */
export type VideoSlot = {
  mp4: string
  webm: string
  poster: string
  alt: string
}

const slot = (name: string, alt: string): VideoSlot => ({
  mp4: `/videos/${name}.mp4`,
  webm: `/videos/${name}.webm`,
  poster: `/images/video-posters/${name}.jpg`,
  alt,
})

export const videoSlots = {
  interlude: slot('interlude', 'A birthday portrait, still frame'),
  story: slot('story', 'A portrait in warm golden light, still frame'),
  process: slot('process', 'A smiling portrait against a pink backdrop, still frame'),
  weddings: slot('weddings', 'A wedding couple forehead to forehead, still frame'),
  contact: slot('contact', 'A portrait in warm golden light, still frame'),
} as const satisfies Record<string, VideoSlot>

export type VideoSlotName = keyof typeof videoSlots
