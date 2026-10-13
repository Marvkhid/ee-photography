import Link from 'next/link'
import type { ComponentPropsWithoutRef, FC, ReactNode } from 'react'
import { ArrowRightIcon } from '@/components/ui/Icons'
import { button, type ButtonVariantProps } from '@/components/ui/button.styles'

type SharedProps = ButtonVariantProps & {
  children: ReactNode
  className?: string
  withArrow?: boolean
}

type ButtonLinkProps = SharedProps & {
  href: string
  external?: boolean
}

export const ButtonLink: FC<ButtonLinkProps> = ({
  children,
  className,
  external = false,
  full,
  href,
  size,
  withArrow = false,
}) => {
  const classes = button({ class: className, full, size })
  const content = (
    <>
      {children}
      {withArrow ? <ArrowRightIcon /> : null}
    </>
  )

  if (external) {
    return (
      <a className={classes} href={href} rel="noopener noreferrer" target="_blank">
        {content}
      </a>
    )
  }

  return (
    <Link className={classes} href={href}>
      {content}
    </Link>
  )
}

type ButtonProps = SharedProps &
  Omit<ComponentPropsWithoutRef<'button'>, 'className' | 'children'>

export const Button: FC<ButtonProps> = ({
  children,
  className,
  full,
  size,
  type = 'button',
  withArrow = false,
  ...rest
}) => (
  <button className={button({ class: className, full, size })} type={type} {...rest}>
    {children}
    {withArrow ? <ArrowRightIcon /> : null}
  </button>
)
