'use client'

import { useRef, useState, type FC, type FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { isServiceSlug, services, type ServiceSlug } from '@/data/categories'
import { CONTACT_METHODS, DISCOVERY_OPTIONS } from '@/data/enquiry-options'
import { blankToUndefined, enquirySchema, type Enquiry, type EnquiryField } from '@/lib/enquiry-schema'
import { brand } from '@/config/brand'
import { enquiryResponseSchema, type DeliveryChannel } from '@/lib/enquiry-delivery'
import { buildEnquiryWhatsAppUrl, type EnquiryMessageFields } from '@/lib/enquiry-whatsapp'
import { getCategory } from '@/data/categories'
import { cn } from '@/lib/cn'

type EnquiryFormProps = { defaultService?: ServiceSlug | undefined }

type FormStatus =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'success'; enquiry: Enquiry; delivered: readonly DeliveryChannel[] }
  | { kind: 'error'; message: string }

type FieldErrors = Partial<Record<EnquiryField, string>>

const fieldClass =
  'mt-2 block w-full border border-border-strong bg-surface px-4 py-3.5 text-base font-light normal-case tracking-normal text-foreground transition-colors focus:border-accent focus:outline-none'
const labelClass = 'block text-label uppercase tracking-nav text-subtle'

const isEnquiryField = (key: PropertyKey | undefined): key is EnquiryField =>
  typeof key === 'string' && key in enquirySchema.shape

const readFormValues = (form: HTMLFormElement): Record<string, FormDataEntryValue> =>
  Object.fromEntries(new FormData(form).entries())

const FieldError: FC<{ message: string | undefined; id: string }> = ({ id, message }) => (
  <span className="mt-1 block min-h-5 text-sm normal-case tracking-normal text-danger" id={id} role="alert">
    {message}
  </span>
)

export const EnquiryForm: FC<EnquiryFormProps> = ({ defaultService }) => {
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<FormStatus>({ kind: 'idle' })
  const [errors, setErrors] = useState<FieldErrors>({})

  const validate = (form: HTMLFormElement) => {
    const result = enquirySchema.safeParse(blankToUndefined(readFormValues(form)))

    if (result.success) {
      setErrors({})

      return result.data
    }

    const next: FieldErrors = {}

    for (const issue of result.error.issues) {
      const key = issue.path[0]

      if (isEnquiryField(key) && !next[key]) {
        next[key] = issue.message
      }
    }

    setErrors(next)

    return null
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    const form = event.currentTarget
    const enquiry = validate(form)

    if (!enquiry) {
      setStatus({ kind: 'error', message: 'Please check the highlighted fields.' })
      requestAnimationFrame(() => form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus())

      return
    }

    setStatus({ kind: 'submitting' })

    const honeypot = new FormData(form).get('company')

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...enquiry, company: typeof honeypot === 'string' ? honeypot : '' }),
      })

      if (response.ok) {
        const data: unknown = await response.json().catch(() => null)
        const parsed = enquiryResponseSchema.safeParse(data)

        setStatus({
          kind: 'success',
          enquiry,
          delivered: parsed.success && parsed.data.ok ? parsed.data.delivered : [],
        })
        form.reset()

        return
      }

      setStatus({
        kind: 'error',
        message:
          response.status === 503
            ? 'Sending is not connected yet, so your message was not sent. Please use the WhatsApp button to reach me now.'
            : 'Something went wrong and your message was not sent. Please try again, or use WhatsApp.',
      })
    } catch {
      setStatus({
        kind: 'error',
        message: 'Could not reach the server. Please check your connection, or use WhatsApp.',
      })
    }
  }

  const openWhatsApp = (fields: EnquiryMessageFields): void => {
    window.open(buildEnquiryWhatsAppUrl(fields, new Date().getHours()), '_blank', 'noopener,noreferrer')
  }

  const handleWhatsApp = (): void => {
    const form = formRef.current

    if (!form) return

    const values = blankToUndefined(readFormValues(form))
    const text = (key: string): string | undefined => {
      const value = values[key]

      return typeof value === 'string' ? value : undefined
    }
    const slug = text('service')

    openWhatsApp({
      name: text('name'),
      service: slug && isServiceSlug(slug) ? getCategory(slug).name : undefined,
      date: text('date'),
      location: text('location'),
      phone: text('phone'),
      email: text('email'),
      contactMethod: text('contactMethod'),
      discovery: text('discovery'),
      message: text('message'),
    })
  }

  const submitting = status.kind === 'submitting'

  if (status.kind === 'success') {
    const sent = status.enquiry

    return (
      <div className="border border-border bg-surface p-8 md:p-12" role="status">
        <h2 className="font-serif text-4xl">Thank you, {sent.name}. Your enquiry has been sent.</h2>
        <p className="mt-4 max-w-prose text-muted-foreground">
          {sent.email
            ? `${brand.preferredName} will get back to you at ${sent.email} using the contact method you chose. A copy of your enquiry has been sent there too. For the fastest reply you can also send the same details on WhatsApp in one tap.`
            : `${brand.preferredName} will get back to you using the contact method you chose. For the fastest reply you can also send the same details on WhatsApp in one tap.`}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {sent.email && (
            <Button
              onClick={() =>
                openWhatsApp({
                  name: sent.name,
                  service: getCategory(sent.service).name,
                  date: sent.date,
                  location: sent.location,
                  phone: sent.phone,
                  email: sent.email,
                  contactMethod: sent.contactMethod,
                  discovery: sent.discovery,
                  message: sent.message,
                })
              }
            >
              Send details on WhatsApp
            </Button>
          )}
          <Button type="button" onClick={() => setStatus({ kind: 'idle' })}>
            Send another enquiry
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form ref={formRef} className="grid gap-x-6 sm:grid-cols-2" noValidate onSubmit={handleSubmit}>
      <label className={labelClass}>
        Full name
        <input aria-describedby="error-name" aria-invalid={Boolean(errors.name)} autoComplete="name" className={fieldClass} name="name" required type="text" />
        <FieldError id="error-name" message={errors.name} />
      </label>
      <label className={labelClass}>
        Email address
        <input aria-describedby="error-email" aria-invalid={Boolean(errors.email)} autoComplete="email" className={fieldClass} name="email" required type="email" />
        <FieldError id="error-email" message={errors.email} />
      </label>
      <label className={labelClass}>
        Phone or WhatsApp number
        <input aria-describedby="error-phone" aria-invalid={Boolean(errors.phone)} autoComplete="tel" className={fieldClass} name="phone" required type="tel" />
        <FieldError id="error-phone" message={errors.phone} />
      </label>
      <label className={labelClass}>
        Where did you discover us?
        <select className={fieldClass} defaultValue="" name="discovery">
          <option value="">Choose one</option>
          {DISCOVERY_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <FieldError id="error-discovery" message={errors.discovery} />
      </label>
      <label className={labelClass}>
        Type of photography
        <select aria-describedby="error-service" aria-invalid={Boolean(errors.service)} className={fieldClass} defaultValue={defaultService ?? ''} name="service" required>
          <option value="">Choose one</option>
          {services.map((service) => (
            <option key={service.slug} value={service.slug}>
              {service.name}
            </option>
          ))}
        </select>
        <FieldError id="error-service" message={errors.service} />
      </label>
      <label className={labelClass}>
        Preferred session or event date
        <input className={fieldClass} name="date" type="date" />
        <FieldError id="error-date" message={errors.date} />
      </label>
      <label className={cn(labelClass, 'sm:col-span-2')}>
        Event or session location
        <input autoComplete="off" className={fieldClass} name="location" type="text" />
        <FieldError id="error-location" message={errors.location} />
      </label>
      <label className={labelClass}>
        Preferred contact method
        <select className={fieldClass} defaultValue="" name="contactMethod">
          <option value="">No preference</option>
          {CONTACT_METHODS.map((method) => (
            <option key={method} value={method}>
              {method}
            </option>
          ))}
        </select>
        <FieldError id="error-contactMethod" message={errors.contactMethod} />
      </label>
      <div aria-hidden className="absolute -left-2499 h-0 w-0 overflow-hidden">
        <label>
          Company
          <input autoComplete="off" name="company" tabIndex={-1} type="text" />
        </label>
      </div>
      <label className={cn(labelClass, 'sm:col-span-2')}>
        Your vision (optional)
        <textarea className={fieldClass} name="message" rows={5} />
        <FieldError id="error-message" message={errors.message} />
      </label>
      <div className="flex flex-wrap gap-3 sm:col-span-2">
        <Button disabled={submitting} type="submit" withArrow>
          {submitting ? 'Sending…' : 'Send enquiry'}
        </Button>
        <Button onClick={handleWhatsApp}>Message on WhatsApp</Button>
      </div>
      <p
        aria-live="polite"
        className={cn('mt-4 text-sm sm:col-span-2', status.kind === 'error' ? 'text-danger' : 'text-muted-foreground')}
        role="status"
      >
        {status.kind === 'error' ? status.message : ''}
      </p>
    </form>
  )
}
