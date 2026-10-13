import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'
import { tailwindMergeConfig } from '@/lib/tailwind-merge-config'

const twMerge = extendTailwindMerge(tailwindMergeConfig)

export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs))
