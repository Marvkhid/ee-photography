import { brand } from '@/config/brand'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import { getCategory, isServiceSlug } from '@/data/categories'

/**
 * Refined, natural enquiry message used as the base of every WhatsApp prefilled message on the
 * site. It is the same voice the user asked for, used for the standalone "Chat on WhatsApp" buttons
 * (footer, contact sidebar) and as the lead of the form's more detailed message.
 */
export const REFINED_ENQUIRY_MESSAGE =
  "Hi Ebere! I found your photography website and I'm interested in having my story captured through your lens. I'd love to discuss a photoshoot that brings my vision to life. Could you share more details about your packages and availability?"

/** Everything a visitor may have filled in. Every field is optional so a partly filled form still works. */
export type EnquiryMessageFields = {
  name?: string | undefined
  service?: string | undefined
  date?: string | undefined
  location?: string | undefined
  phone?: string | undefined
  email?: string | undefined
  contactMethod?: string | undefined
  discovery?: string | undefined
  message?: string | undefined
}

const MORNING_END = 12
const AFTERNOON_END = 17

/** Greets by the visitor's local time of day. */
export const getGreeting = (
  hour: number,
): 'Good morning' | 'Good afternoon' | 'Good evening' => {
  if (hour < MORNING_END) return 'Good morning'
  if (hour < AFTERNOON_END) return 'Good afternoon'

  return 'Good evening'
}

const detailLine = (label: string, value: string | undefined): string | undefined =>
  value && value.trim() ? `• ${label}: ${value.trim()}` : undefined

/**
 * Builds the WhatsApp message a visitor sends when they tap "Message on WhatsApp" on the enquiry
 * form. It leads with the refined message and then adds only the fields the visitor actually filled
 * in (with a service-specific line when a service was chosen).
 *
 * Example:
 *   Hi Ebere! I found your photography website and I'm interested in having my story captured through
 *   your lens. I'd love to discuss a photoshoot that brings my vision to life. Could you share more
 *   details about your packages and availability?
 *
 *   I'm interested in a Wedding session.
 *   • Name: Ada Obi
 *   • Phone / WhatsApp: +234 801 234 5678
 *   • Preferred date: 2025-06-14
 *   • My vision: Something bright and outdoor, around noon.
 */
export const buildEnquiryWhatsAppMessage = (
  fields: EnquiryMessageFields,
  hour: number,
): string => {
  const greeting = `${getGreeting(hour)} ${brand.preferredName}`
  const opening =
    fields.name && fields.name.trim()
      ? `${greeting}, I am ${fields.name.trim()}.`
      : `${greeting}, I'd like to make an enquiry.`
  const trimmedService = fields.service && fields.service.trim()
  const serviceSlug = trimmedService && isServiceSlug(trimmedService) ? trimmedService : undefined
  const serviceLine = serviceSlug
    ? `\n\nI'm interested in a ${getCategory(serviceSlug).name} session.`
    : ''

  const parts = [
    opening,
    REFINED_ENQUIRY_MESSAGE,
    serviceLine,
    ...[
      detailLine('Name', fields.name),
      detailLine('Phone / WhatsApp', fields.phone),
      detailLine('Email', fields.email),
      detailLine('Preferred date', fields.date),
      detailLine('Location', fields.location),
      detailLine('Preferred contact method', fields.contactMethod),
      detailLine('Found you through', fields.discovery),
    ].filter(Boolean)
      .join('\n'),
    fields.message && fields.message.trim()
      ? `\n\nMy vision:\n${fields.message.trim()}`
      : '',
  ]
    .filter(Boolean)
    .join('')

  return parts
}

export const buildEnquiryWhatsAppUrl = (
  fields: EnquiryMessageFields,
  hour: number,
): string => buildWhatsAppUrl(buildEnquiryWhatsAppMessage(fields, hour))
