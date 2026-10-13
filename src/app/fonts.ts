import localFont from 'next/font/local'

/**
 * Self-hosted variable fonts. next/font preloads them and generates a size-matched fallback,
 * so text does not jump when the real font arrives (this keeps layout shift near zero).
 */
export const cormorant = localFont({
  src: [
    { path: './fonts/cormorant-garamond-latin-wght-normal.woff2', weight: '300 700', style: 'normal' },
    { path: './fonts/cormorant-garamond-latin-wght-italic.woff2', weight: '300 700', style: 'italic' },
  ],
  variable: '--font-cormorant',
  display: 'swap',
  adjustFontFallback: 'Times New Roman',
  fallback: ['Georgia', 'serif'],
})

export const jost = localFont({
  src: [{ path: './fonts/jost-latin-wght-normal.woff2', weight: '100 900', style: 'normal' }],
  variable: '--font-jost',
  display: 'swap',
  adjustFontFallback: 'Arial',
  fallback: ['system-ui', 'sans-serif'],
})
