import type { ReactNode } from 'react'
import { PageMotion } from '@/components/motion/PageMotion'

/** Re-mounts on every navigation: gives each page the short fade-and-rise and its scroll motion. */
const Template = ({ children }: { children: ReactNode }) => <PageMotion>{children}</PageMotion>

export default Template
