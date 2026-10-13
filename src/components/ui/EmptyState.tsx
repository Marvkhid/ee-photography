import type { FC, ReactNode } from 'react'
import { CameraIcon } from '@/components/ui/Icons'

type EmptyStateProps = {
  title: string
  description: string
  children?: ReactNode
}

/** Friendly message for a list that has nothing to show yet. */
export const EmptyState: FC<EmptyStateProps> = ({ children, description, title }) => (
  <div className="flex flex-col items-center border border-dashed border-border-strong px-6 py-16 text-center">
    <CameraIcon className="mb-5 size-8 text-subtle" />
    <h2 className="font-serif text-3xl md:text-4xl">{title}</h2>
    <p className="mt-3 max-w-md text-muted-foreground">{description}</p>
    {children ? <div className="mt-7 flex flex-wrap justify-center gap-3">{children}</div> : null}
  </div>
)
