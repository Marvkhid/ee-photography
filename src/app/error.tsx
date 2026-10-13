'use client'

import { Button } from '@/components/ui/Button'

type ErrorPageProps = { reset: () => void }

const ErrorPage = ({ reset }: ErrorPageProps) => (
  <section className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
    <h1 className="font-serif text-5xl leading-tight md:text-7xl">Something went wrong</h1>
    <p className="mb-8 mt-5 max-w-md text-muted-foreground">
      The page could not be shown. Please try again.
    </p>
    <Button onClick={reset}>Try again</Button>
  </section>
)

export default ErrorPage
