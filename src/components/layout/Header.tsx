'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState, type FC } from 'react'
import { ButtonLink } from '@/components/ui/Button'
import { brand, type NavigationItem } from '@/config/brand'
import { cn } from '@/lib/cn'

const SCROLL_THRESHOLD = 40

const isActive = (item: NavigationItem, pathname: string): boolean =>
  item.href === '/' ? pathname === '/' : pathname === item.href || pathname.startsWith(`${item.href}/`)

export const Header: FC = () => {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = (): void => setScrolled(window.scrollY > SCROLL_THRESHOLD)

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''

    const handleKey = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    window.addEventListener('keydown', handleKey)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [menuOpen])

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-transparent px-5 py-5 transition-[background-color,border-color,padding] duration-500 md:px-10 lg:px-14',
          (scrolled || menuOpen) && 'border-border bg-background/90 py-3 backdrop-blur-sm',
          menuOpen && 'bg-background',
        )}
        data-site-header
      >
        <Link aria-label={`${brand.name}, home`} className="block shrink-0 leading-none" href="/">
          <Image
            alt={brand.name}
            className="h-10 w-auto max-w-none md:h-11"
            height={brand.logo.height}
            priority
            src={brand.logo.src}
            width={brand.logo.width}
          />
        </Link>
        <nav aria-label="Main" className="flex items-center gap-5 xl:gap-9">
          <ul className="hidden items-center gap-5 lg:flex xl:gap-9">
            {brand.navigation.map((item) => (
              <li key={item.href}>
                <Link
                  aria-current={isActive(item, pathname) ? 'page' : undefined}
                  className={cn(
                    'whitespace-nowrap border-b border-transparent pb-1.5 text-label uppercase tracking-nav text-muted-foreground transition-colors hover:text-foreground',
                    isActive(item, pathname) && 'border-accent text-foreground',
                  )}
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ButtonLink href="/contact" size="sm">
            Book now
          </ButtonLink>
          <button
            aria-controls="mobile-menu"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="relative size-11 lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            <span
              className={cn(
                'absolute left-2.5 right-2.5 top-4.5 h-px bg-foreground transition-all duration-300',
                menuOpen && 'top-5.5 rotate-45',
              )}
            />
            <span
              className={cn(
                'absolute left-2.5 right-2.5 top-6 h-px bg-foreground transition-all duration-300',
                menuOpen && 'top-5.5 -rotate-45',
              )}
            />
          </button>
        </nav>
      </header>
      <div
        className="menu-panel fixed inset-0 z-40 flex flex-col justify-center bg-background px-8 pb-10 pt-28"
        data-open={menuOpen}
        id="mobile-menu"
        inert={!menuOpen}
      >
        <ul>
          {brand.navigation.map((item, index) => (
            <li key={item.href} className="menu-item" style={{ transitionDelay: `${0.25 + index * 0.07}s` }}>
              <Link
                aria-current={isActive(item, pathname) ? 'page' : undefined}
                className={cn(
                  'block font-serif text-5xl leading-tight text-muted-foreground transition-colors hover:text-foreground',
                  isActive(item, pathname) && 'text-foreground',
                )}
                href={item.href}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <p className="menu-item mt-10 text-sm text-muted-foreground" style={{ transitionDelay: '0.7s' }}>
          {brand.phone.display} · {brand.email.address}
        </p>
      </div>
    </>
  )
}
