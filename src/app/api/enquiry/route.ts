import { NextResponse } from 'next/server'
import { enquirySchema } from '@/lib/enquiry-schema'
import { enquiryResponseSchema, type EnquiryResponse } from '@/lib/enquiry-delivery'
import { readSmtpConfig, sendEnquiryBySmtp, type SmtpResult } from '@/lib/enquiry-smtp'

export const runtime = 'nodejs'

const respond = (body: EnquiryResponse, status: number): NextResponse<EnquiryResponse> =>
  NextResponse.json(body, { status })

/**
 * In-memory rate limiting keyed by client IP.
 * Simple, best-effort guard for the common case of a single deployed server.
 * Resets when the server restarts (acceptable for a small studio site).
 */
const ipTimestamps = new Map<string, number[]>()
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 3

/**
 * Payload dedup keyed by IP + content hash.
 * Prevents a stray double-click or network retry from sending the same enquiry twice within a
 * short window.
 */
const ipPayloadHashes = new Map<string, { hash: string; at: number }>()
const DEDUP_WINDOW_MS = 60_000

const now = (): number => Date.now()

const cleanNumberLists = (map: Map<string, number[]>, olderThan: number): void => {
  const cutoff = now() - olderThan
  for (const [key, list] of map) {
    const cleaned = list.filter((t) => t > cutoff)
    if (cleaned.length === 0) {
      map.delete(key)
    } else {
      map.set(key, cleaned)
    }
  }
}

const cleanHashEntries = (map: Map<string, { hash: string; at: number }>, olderThan: number): void => {
  const cutoff = now() - olderThan
  for (const [key, entry] of map) {
    if (entry.at <= cutoff) {
      map.delete(key)
    }
  }
}

const requestIp = (request: Request): string => {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    const first = forwarded.split(',')[0]
    return first && first.trim() ? first.trim() : 'unknown'
  }
  const realIp = request.headers.get('x-real-ip')
  if (realIp) {
    return realIp.trim() || 'unknown'
  }
  return 'unknown'
}

const samePayloadHash = (a: Record<string, unknown>, b: Record<string, unknown>): boolean => {
  const keys = [...new Set([...Object.keys(a), ...Object.keys(b)])].sort()
  const aStr = keys.map((k) => `${k}:${JSON.stringify(a[k])}`).join('|')
  const bStr = keys.map((k) => `${k}:${JSON.stringify(b[k])}`).join('|')
  return aStr === bStr
}

/** Best-effort JSON body parse that never throws on the server. */
const readBody = async (request: Request): Promise<Record<string, unknown> | null> => {
  try {
    return await request.json() as Record<string, unknown>
  } catch {
    return null
  }
}

export const POST = async (request: Request): Promise<NextResponse<EnquiryResponse>> => {
  const ip = requestIp(request)

  // Clean stale entries so the maps do not grow unbounded over long uptimes.
  cleanNumberLists(ipTimestamps, RATE_LIMIT_WINDOW_MS)
  cleanHashEntries(ipPayloadHashes, DEDUP_WINDOW_MS)

  const body = await readBody(request)

  // Honeypot: bots that fill the hidden "company" field get a fake success.
  if (body && typeof body === 'object' && 'company' in body && Boolean((body as { company?: unknown }).company)) {
    return respond({ ok: true, delivered: [] }, 200)
  }

  if (!body) {
    return respond({ ok: false, reason: 'invalid' }, 400)
  }

  const parsed = enquirySchema.safeParse(body)

  if (!parsed.success) {
    return respond({ ok: false, reason: 'invalid' }, 400)
  }

  // Rate limit: allow a small burst, then slow down.
  const recent = ipTimestamps.get(ip) ?? []
  if (recent.length >= RATE_LIMIT_MAX) {
    return respond({ ok: false, reason: 'rate-limited' }, 429)
  }

  // Dedup: identical payload from the same IP within the window is a duplicate, not a new send.
  const existing = ipPayloadHashes.get(ip)
  if (existing && samePayloadHash(JSON.parse(existing.hash) as Record<string, unknown>, body)) {
    return respond({ ok: true, delivered: [] }, 200)
  }

  ipTimestamps.set(ip, [...recent, now()])
  ipPayloadHashes.set(ip, { hash: JSON.stringify(body), at: now() })

  const config = readSmtpConfig()

  if (!config) {
    return respond({ ok: false, reason: 'not-configured' }, 503)
  }

  const smtp: SmtpResult = await sendEnquiryBySmtp(parsed.data, config)

  if ('error' in smtp) {
    return respond({ ok: false, reason: 'send-failed' }, 502)
  }

  return respond({ ok: true, delivered: ['email'] }, 200)
}
