import { ButtonLink } from '@/components/ui/Button'

const NotFound = () => (
  <section className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
    <span className="mb-4 text-label uppercase tracking-eyebrow text-subtle">Error 404</span>
    <h1 className="font-serif text-6xl leading-tight md:text-8xl">This frame is empty</h1>
    <p className="mb-8 mt-5 max-w-md text-muted-foreground">
      The page you were looking for does not exist or has moved. Let&apos;s get you back to the photographs.
    </p>
    <div className="flex flex-wrap justify-center gap-3">
      <ButtonLink href="/" withArrow>
        Back home
      </ButtonLink>
      <ButtonLink href="/portfolio">View portfolio</ButtonLink>
    </div>
  </section>
)

export default NotFound
