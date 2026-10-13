import { brand } from '@/config/brand'

export const buildWhatsAppUrl = (message?: string): string => {
  const base = `https://wa.me/${brand.whatsapp.number}`

  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}
