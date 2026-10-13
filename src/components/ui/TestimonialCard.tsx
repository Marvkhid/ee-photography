import type { FC } from 'react'
import { getCategory } from '@/data/categories'
import type { Testimonial } from '@/data/testimonials'

type TestimonialCardProps = { testimonial: Testimonial }

const Stars: FC<{ rating: number }> = ({ rating }) => (
  <p aria-label={`${rating} out of 5 stars`} className="text-sm tracking-widest text-accent">
    {'★'.repeat(rating)}
  </p>
)

/**
 * A single testimonial.
 * - Unverified records always show a visible "Sample" tag so draft copy can never pass as a real review.
 * - No photograph is attached to the quote: an image beside the name would imply the pictured
 *   person said it. Photographs live in their own labelled archive tiles on the page instead.
 * - Cards have no fixed minimum height so a masonry grid can vary naturally.
 */
export const TestimonialCard: FC<TestimonialCardProps> = ({ testimonial }) => (
  <figure className="flex h-full flex-col justify-between gap-5 border border-border bg-surface p-6" data-reveal>
    <div>
      {testimonial.verified ? null : (
        <span
          className="inline-block border border-dashed border-border-strong px-2 py-1 text-[0.625rem] uppercase tracking-button text-subtle"
          title="Draft sample copy — not a verified review"
        >
          Sample
        </span>
      )}
      <blockquote className="mt-3 font-serif text-xl italic leading-snug text-muted-foreground">
        {testimonial.quote}
      </blockquote>
    </div>
    <figcaption className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
      <span className="text-label uppercase tracking-nav text-subtle">
        {testimonial.name}
        {testimonial.category ? ` · ${getCategory(testimonial.category).name}` : ''}
      </span>
      {testimonial.rating ? <Stars rating={testimonial.rating} /> : null}
    </figcaption>
  </figure>
)
