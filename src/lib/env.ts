/** Google Analytics 4 measurement ID (G-XXXXXXXXXX). Analytics stays completely off until this is set. */
const readGaId = (): string | null => {
  const value = process.env.NEXT_PUBLIC_GA_ID

  return value && /^G-[A-Z0-9]{4,}$/.test(value) ? value : null
}

export const gaId = readGaId()
