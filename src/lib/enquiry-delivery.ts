import { z } from 'zod'

/**
 * Channels the API may report as having accepted an enquiry.
 * Only email is implemented now — WhatsApp Business API delivery was removed.
 */
export const DELIVERY_CHANNELS = ['email'] as const
export type DeliveryChannel = (typeof DELIVERY_CHANNELS)[number]

/** Response shape of POST /api/enquiry, shared by the server route and the form. */
export const enquiryResponseSchema = z.discriminatedUnion('ok', [
  z.object({ ok: z.literal(true), delivered: z.array(z.enum(DELIVERY_CHANNELS)) }),
  z.object({
    ok: z.literal(false),
    reason: z.enum(['invalid', 'not-configured', 'send-failed', 'rate-limited']),
  }),
])

export type EnquiryResponse = z.infer<typeof enquiryResponseSchema>
