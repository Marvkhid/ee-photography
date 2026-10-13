import type { FC } from 'react'

type JsonLdProps = { data: Record<string, unknown> }

/** Structured data for search engines. "<" is escaped so content can never close the script tag. */
export const JsonLd: FC<JsonLdProps> = ({ data }) => (
  <script
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    type="application/ld+json"
  />
)
