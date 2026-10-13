import { brand } from '@/config/brand'
import { getCategory } from '@/data/categories'
import type { Enquiry } from '@/lib/enquiry-schema'

const serviceName = (enquiry: Enquiry): string => getCategory(enquiry.service).name

const fmt = (value: string | undefined, fallback = 'Not provided'): string =>
  (value ?? '').trim() || fallback

/** Plain-text body of the email the studio receives for every enquiry. */
export const buildBusinessText = (enquiry: Enquiry): string => [
  `New enquiry from ${enquiry.name}`,
  '',
  `Type of photography: ${serviceName(enquiry)}`,
  `Email: ${enquiry.email}`,
  `Phone / WhatsApp: ${fmt(enquiry.phone)}`,
  `Preferred contact method: ${fmt(enquiry.contactMethod)}`,
  `Preferred date: ${fmt(enquiry.date)}`,
  `Location: ${fmt(enquiry.location)}`,
  `Heard about the studio via: ${fmt(enquiry.discovery)}`,
  '',
  'Message:',
  fmt(enquiry.message, '(none)'),
  '',
  '---',
  `Submitted: ${new Date().toISOString()}`,
  `Replied to email: ${enquiry.email}`,
  `Replied to phone: ${fmt(enquiry.phone)}`,
].join('\n')

/** HTML version of the business notification. */
export const buildBusinessHtml = (enquiry: Enquiry): string => {
  const rows: Array<[string, string]> = [
    ['Name', enquiry.name],
    ['Type of photography', serviceName(enquiry)],
    ['Email', enquiry.email],
    ['Phone / WhatsApp', fmt(enquiry.phone)],
    ['Preferred contact method', fmt(enquiry.contactMethod)],
    ['Preferred date', fmt(enquiry.date)],
    ['Location', fmt(enquiry.location)],
    ['Heard about the studio via', fmt(enquiry.discovery)],
    ['Message', fmt(enquiry.message, '(none)')],
  ]

  const table = rows
    .map(
      ([label, value]) =>
        `<tr><th scope="row" style="text-align:left;padding:8px 12px;border-bottom:1px solid #333;background:#111">${label}</th><td style="padding:8px 12px;border-bottom:1px solid #333">${escapeHtml(value)}</td></tr>`,
    )
    .join('')

  return [
    '<!doctype html>',
    '<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">',
    '<style>body{font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#f4f0e9;background:#0a0a0a;margin:0;padding:20px}a{color:#9a8c76}</style>',
    '</head><body>',
    `<h1 style="margin:0 0 16px;font-size:20px;color:#9a8c76">New enquiry from ${escapeHtml(enquiry.name)}</h1>`,
    `<p style="margin:0 0 16px;color:#b8b1a7">Photography session: <strong>${escapeHtml(serviceName(enquiry))}</strong></p>`,
    `<table style="width:100%;border-collapse:collapse">${table}</table>`,
    `<p style="margin:16px 0 0;color:#7a7167;font-size:13px">Submitted: ${new Date().toISOString()} — reply to <a href="mailto:${escapeHtml(enquiry.email)}">${escapeHtml(enquiry.email)}</a>${fmt(enquiry.phone) ? ` · ${escapeHtml(fmt(enquiry.phone))}` : ''}</p>`,
    '</body></html>',
  ].join('\n')
}

/** Plain-text confirmation copy sent to the visitor who submitted the form. */
export const buildVisitorText = (enquiry: Enquiry): string => [
  `Hi ${enquiry.name || 'there'},`,
  '',
  `Thanks for getting in touch with E&E Photography. We have received your enquiry and will get back to you using the contact method you chose.`,
  '',
  'Here is a copy of what you sent:',
  '',
  `Type of photography: ${serviceName(enquiry)}`,
  `Email: ${enquiry.email}`,
  `Phone / WhatsApp: ${fmt(enquiry.phone)}`,
  `Preferred contact method: ${fmt(enquiry.contactMethod)}`,
  `Preferred date: ${fmt(enquiry.date)}`,
  `Location: ${fmt(enquiry.location)}`,
  `Heard about the studio via: ${fmt(enquiry.discovery)}`,
  '',
  'Message:',
  fmt(enquiry.message, '(none)'),
  '',
  'This is an automatic confirmation. It does not mean your booking is confirmed yet — Ebere will review your enquiry and get back to you directly to confirm the next steps.',
  '',
  `— E&E Photography`,
  `photographyee9@gmail.com`,
  '',
  `Original submission: ${new Date().toISOString()}`,
].join('\n')

/** HTML confirmation copy sent to the visitor who submitted the form. */
export const buildVisitorHtml = (enquiry: Enquiry): string => {
  const rows: Array<[string, string]> = [
    ['Type of photography', serviceName(enquiry)],
    ['Email', enquiry.email],
    ['Phone / WhatsApp', fmt(enquiry.phone)],
    ['Preferred contact method', fmt(enquiry.contactMethod)],
    ['Preferred date', fmt(enquiry.date)],
    ['Location', fmt(enquiry.location)],
    ['Heard about the studio via', fmt(enquiry.discovery)],
    ['Message', fmt(enquiry.message, '(none)')],
  ]

  const table = rows
    .map(
      ([label, value]) =>
        `<tr><th scope="row" style="text-align:left;padding:8px 12px;border-bottom:1px solid #333;background:#111">${label}</th><td style="padding:8px 12px;border-bottom:1px solid #333">${escapeHtml(value)}</td></tr>`,
    )
    .join('')

  return [
    '<!doctype html>',
    '<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">',
    '<style>body{font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#f4f0e9;background:#0a0a0a;margin:0;padding:20px}a{color:#9a8c76}</style>',
    '</head><body>',
    '<h1 style="margin:0 0 12px;font-size:20px;color:#9a8c76">Thanks for your enquiry</h1>',
    `<p style="margin:0 0 16px;color:#b8b1a7">Hi ${escapeHtml(enquiry.name || 'there')},</p>`,
    '<p style="margin:0 0 16px;color:#b8b1a7">Thanks for getting in touch with E&E Photography. We have received your enquiry and will get back to you using the contact method you chose. Here is a copy of what you sent:</p>',
    `<table style="width:100%;border-collapse:collapse">${table}</table>`,
    '<p style="margin:16px 0 0;color:#7a7167;font-size:13px">This is an automatic confirmation. It does not mean your booking is confirmed yet — Ebere will review your enquiry and get back to you directly to confirm the next steps.</p>',
    '<p style="margin:16px 0 0;color:#7a7167;font-size:13px">— E&E Photography · photographyee9@gmail.com</p>',
    `<p style="margin:8px 0 0;color:#7a7167;font-size:13px">Original submission: ${new Date().toISOString()}</p>`,
    '</body></html>',
  ].join('\n')
}

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
