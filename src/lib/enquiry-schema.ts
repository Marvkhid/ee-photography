import { z } from 'zod'
import { CONTACT_METHODS, DISCOVERY_OPTIONS } from '@/data/enquiry-options'
import { SERVICE_SLUGS } from '@/data/categories'

/** Shared by the form (client) and the API route (server): one definition, one set of messages. */
export const enquirySchema = z.object({
  name: z.string('Please enter your full name.').trim().min(2, 'Please enter your full name.').max(120),
  email: z.email('Enter a valid email address.').max(200),
  phone: z
    .string('Enter a phone or WhatsApp number.')
    .trim()
    .min(7, 'Enter a phone or WhatsApp number.')
    .max(30)
    .regex(/^[+\d][\d\s()-]*$/, 'Use digits, spaces and an optional + only.'),
  service: z.enum(SERVICE_SLUGS, 'Choose the type of photography.'),
  discovery: z.enum(DISCOVERY_OPTIONS).optional(),
  date: z.string().trim().max(40).optional(),
  location: z.string().trim().max(200).optional(),
  contactMethod: z.enum(CONTACT_METHODS).optional(),
  message: z.string().trim().max(3000).optional(),
})

export type Enquiry = z.infer<typeof enquirySchema>
export type EnquiryField = keyof Enquiry

/** Empty form inputs arrive as "" — treat them as absent before validating. */
export const blankToUndefined = (values: Record<string, FormDataEntryValue>): Record<string, unknown> =>
  Object.fromEntries(
    Object.entries(values).map(([key, value]) => [key, typeof value === 'string' && value.trim() === '' ? undefined : value]),
  )
