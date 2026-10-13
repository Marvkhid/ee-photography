import { Fragment, type FC } from 'react'
import { cn } from '@/lib/cn'

type SplitTitleProps = {
  text: string
  as?: 'h1' | 'h2'
  className?: string
  id?: string
}

/** Heading whose characters are individually addressable by PageMotion for a staggered reveal. */
export const SplitTitle: FC<SplitTitleProps> = ({ as: Tag = 'h1', className, id, text }) => {
  const words = text.split(' ')

  return (
    <Tag
      aria-label={text}
      className={cn('font-serif font-normal leading-none text-foreground', className)}
      id={id}
    >
      {words.map((word, wordIndex) => (
        <Fragment key={`${word}-${wordIndex}`}>
          <span aria-hidden className="inline-block whitespace-nowrap">
            {[...word].map((character, characterIndex) => (
              <span key={`${character}-${characterIndex}`} className="inline-block" data-char>
                {character}
              </span>
            ))}
          </span>
          {wordIndex < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </Tag>
  )
}
