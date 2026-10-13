'use client'

import { useEffect, useState, type FC } from 'react'

/** Shows the current year in the browser, so the footer never goes stale between deployments. */
export const CurrentYear: FC<{ initial: number }> = ({ initial }) => {
  const [year, setYear] = useState(initial)

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  return <span>{year}</span>
}
