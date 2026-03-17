'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/stations', label: 'Stations' },
  { href: '/report', label: 'Report' },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 bg-fuel-surface border-b border-fuel-border">
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-syne font-semibold text-lg text-fuel-text">
          Fuel<span className="text-fuel-accent">Spotter</span> NG
        </Link>

        <div className="flex items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={clsx(
                'text-sm px-3 py-1.5 rounded-lg transition-colors duration-150',
                pathname === href
                  ? 'bg-fuel-card text-fuel-text'
                  : 'text-fuel-muted hover:text-fuel-text hover:bg-fuel-card'
              )}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
