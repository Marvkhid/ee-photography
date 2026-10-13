import nodemailer from 'nodemailer'
import { brand } from '@/config/brand'
import type { Enquiry } from '@/lib/enquiry-schema'
import { getCategory } from '@/data/categories'
import {
  buildBusinessText,
  buildBusinessHtml,
  buildVisitorText,
  buildVisitorHtml,
} from '@/lib/enquiry-text'

const serviceName = (enquiry: Enquiry): string => getCategory(enquiry.service).name

export type SmtpConfig = {
  host: string
  port: number
  secure: boolean
  user: string
  pass: string
  from: string
  to: string
}

/**
 * SMTP delivery is configured only when the required environment variables exist.
 * Uses the studio's own mail account — no third-party email API, no credentials in client code.
 *
 * Defaults:
 *   ENQUIRY_TO_EMAIL  → brand.email.address (photographyee9@gmail.com)
 *   ENQUIRY_FROM_EMAIL → "E&E Photography <photographyee9@gmail.com>"
 *   SMTP_SECURE       → true when port is 465, otherwise false (STARTTLS on 587)
 */
export const readSmtpConfig = (): SmtpConfig | null => {
  const host = process.env.SMTP_HOST?.trim()
  const port = Number(process.env.SMTP_PORT)
  const secure = process.env.SMTP_SECURE === 'true' || port === 465
  const user = process.env.SMTP_USER?.trim()
  const pass = process.env.SMTP_PASS?.trim()
  const to = process.env.ENQUIRY_TO_EMAIL?.trim() || brand.email.address
  const from = process.env.ENQUIRY_FROM_EMAIL?.trim() || `${brand.name} <${to}>`

  if (!host || !user || !pass || !to) {
    return null
  }

  return { host, port, secure, user, pass, from, to }
}

export type SmtpResult =
  | { deliveredBusiness: boolean; deliveredVisitor: boolean }
  | { error: string }

/**
 * Sends two emails for one enquiry:
 *  1. Business notification → ENQUIRY_TO_EMAIL (photographyee9@gmail.com), with replyTo set
 *     to the visitor's email, from the studio's sender identity.
 *  2. Visitor confirmation copy → the visitor's own email, acknowledging receipt (not a booking
 *     confirmation).
 *
 * Returns success only when BOTH emails were accepted by the mail server. If either fails, no
 * success is reported (the form never claims delivery that did not happen).
 */
export const sendEnquiryBySmtp = async (
  enquiry: Enquiry,
  config: SmtpConfig,
): Promise<SmtpResult> => {
  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: { user: config.user, pass: config.pass },
  })

  const businessId = await sendOne(
    transporter,
    {
      from: config.from,
      to: config.to,
      replyTo: enquiry.email,
      subject: `${brand.shortName} enquiry: ${serviceName(enquiry)} from ${enquiry.name}`,
      text: buildBusinessText(enquiry),
      html: buildBusinessHtml(enquiry),
    },
    'business notification',
  )

  if (!businessId) {
    return { error: 'The business notification email could not be sent.' }
  }

  const visitorId = await sendOne(
    transporter,
    {
      from: config.from,
      to: enquiry.email,
      replyTo: config.to,
      subject: `E&E Photography: your enquiry has been received`,
      text: buildVisitorText(enquiry),
      html: buildVisitorHtml(enquiry),
    },
    'visitor confirmation',
  )

  if (!visitorId) {
    return { error: 'Your confirmation email could not be sent.' }
  }

  return { deliveredBusiness: true, deliveredVisitor: true }
}

const sendOne = async (
  transporter: any,
  message: any,
  label: string,
): Promise<string | null> => {
  try {
    const info = await transporter.sendMail(message)
    return info.messageId ?? null
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error(`[enquiry] SMTP ${label} failed:`, message)
    return null
  }
}
