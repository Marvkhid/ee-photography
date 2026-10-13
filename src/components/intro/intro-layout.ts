export const INTRO_COLUMNS = 6
export const INTRO_ROWS = 3
export const INTRO_TILE_COUNT = INTRO_COLUMNS * INTRO_ROWS

/** Tile photographs: /images/intro/tile-01.jpg … tile-18.jpg */
export const introTileSources: readonly string[] = Array.from(
  { length: INTRO_TILE_COUNT },
  (_, index) => `/images/intro/tile-${String(index + 1).padStart(2, '0')}.jpg`,
)

export type IntroLayout = {
  /** Width and height of the E&E composition in CSS pixels. */
  width: number
  height: number
  /** PNG data URL of the "E&E" lettering, used to cut the photo tiles into letter shapes. */
  maskUrl: string
}

/** The family name next/font generated for Cormorant Garamond (exposed through a CSS variable on <body>). */
const readFontFamily = (): string => {
  const generated = getComputedStyle(document.body).getPropertyValue('--font-cormorant').trim()

  return generated ? `${generated}, Georgia, serif` : 'Georgia, serif'
}
const FONT_TIMEOUT_MS = 1500
const LETTERING = 'E&E'
const MASK_SCALE = 2

const wait = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Renders the "E&E" lettering to a canvas and returns it as a mask. Each photo tile later
 * shows only its slice of this mask, so the letters themselves are made of photographs.
 */
export const createIntroLayout = async (viewportWidth: number): Promise<IntroLayout | null> => {
  const FONT_FAMILY = readFontFamily()

  try {
    await Promise.race([document.fonts.load(`700 120px ${FONT_FAMILY}`), wait(FONT_TIMEOUT_MS)])
  } catch {
    /* fall back to the system serif; the composition still reads as E&E */
  }

  const mobile = viewportWidth < 820
  const width = Math.min(viewportWidth * (mobile ? 0.9 : 0.86), 1180)
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  if (!context) {
    return null
  }

  const probeSize = 200

  context.font = `700 ${probeSize}px ${FONT_FAMILY}`

  const metrics = context.measureText(LETTERING)
  const glyphWidth = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight

  if (glyphWidth <= 0) {
    return null
  }

  canvas.width = Math.round(width * MASK_SCALE)

  const factor = canvas.width / glyphWidth

  canvas.height = Math.round((metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent) * factor)
  context.font = `700 ${probeSize * factor}px ${FONT_FAMILY}`
  context.fillStyle = '#000'
  context.fillText(LETTERING, metrics.actualBoundingBoxLeft * factor, metrics.actualBoundingBoxAscent * factor)

  return {
    width,
    height: canvas.height / MASK_SCALE,
    maskUrl: canvas.toDataURL('image/png'),
  }
}

const PRELOAD_TIMEOUT_MS = 3000

const loadImage = (src: string): Promise<void> =>
  new Promise((resolve) => {
    const image = new Image()

    image.onload = () => resolve()
    image.onerror = () => resolve()
    image.src = src
  })

/**
 * Loads (and warms) every tile photograph before the animation starts, so tiles never pop in
 * half-loaded mid-flight. Gives up after a few seconds so a slow network cannot block the site.
 */
export const preloadIntroImages = async (): Promise<void> => {
  await Promise.race([Promise.all(introTileSources.map(loadImage)), wait(PRELOAD_TIMEOUT_MS)])
}
