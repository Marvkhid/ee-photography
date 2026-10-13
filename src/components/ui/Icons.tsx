import type { FC } from 'react'

type IconProps = { className?: string }

const strokeProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
} as const

export const ArrowRightIcon: FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className ?? 'size-3.5'} {...strokeProps}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

export const ChevronDownIcon: FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className ?? 'size-4'} {...strokeProps}>
    <path d="M6 9l6 6 6-6" />
  </svg>
)

export const ChevronLeftIcon: FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className ?? 'size-4'} {...strokeProps}>
    <path d="M15 6l-6 6 6 6" />
  </svg>
)

export const ChevronRightIcon: FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className ?? 'size-4'} {...strokeProps}>
    <path d="M9 6l6 6-6 6" />
  </svg>
)

export const CloseIcon: FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className ?? 'size-5'} {...strokeProps}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
)

export const PlusIcon: FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className ?? 'size-5'} {...strokeProps}>
    <path d="M12 5v14M5 12h14" />
  </svg>
)

export const InstagramIcon: FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className ?? 'size-4.5'} {...strokeProps}>
    <rect x="4" y="4" width="16" height="16" rx="5" />
    <circle cx="12" cy="12" r="3.5" />
    <circle cx="17" cy="7" r="0.6" fill="currentColor" />
  </svg>
)

export const WhatsAppIcon: FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className ?? 'size-4.5'} {...strokeProps}>
    <path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z" />
    <path d="M9 9.5c.3 2 2.5 4.2 4.5 4.5l1.3-1.2-1.8-1-.8.6c-.6-.3-1.4-1.1-1.7-1.7l.6-.8-1-1.8z" />
  </svg>
)

export const MailIcon: FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className ?? 'size-4.5'} {...strokeProps}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
)

export const PhoneIcon: FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className ?? 'size-4.5'} {...strokeProps}>
    <path d="M6 4h3l2 5-2 1.5a10 10 0 0 0 4.5 4.5L15 13l5 2v3a2 2 0 0 1-2 2A14 14 0 0 1 4 6a2 2 0 0 1 2-2z" />
  </svg>
)

export const CameraIcon: FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className ?? 'size-6'} {...strokeProps}>
    <path d="M4 8h3l1.5-2h7L17 8h3v11H4z" />
    <circle cx="12" cy="13" r="3.5" />
  </svg>
)
