'use client'

import { Fragment, useState } from 'react'
import Link from 'next/link'

const NAV = [
  { label: 'The Artwork', href: '/artwork' },
  { label: 'Request a Kit', href: '/request-a-kit' },
  { label: 'Foraging Guide', href: '/foraging-guide' },
  { label: 'The Project', href: '/project' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="h-14 px-4 sm:px-[14mm] flex items-center border-b border-rule">
        <nav className="flex items-center text-xs tracking-wide w-full">
          <Link
            href="/"
            className="font-light text-ink uppercase hover:text-secondary transition-colors duration-150"
          >
            Postcode Colour
          </Link>

          {/* Desktop links */}
          <div className="hidden sm:flex items-center">
            {NAV.map(({ label, href }) => (
              <Fragment key={href}>
                <span className="mx-5 text-rule select-none" aria-hidden>
                  |
                </span>
                <Link
                  href={href}
                  className="text-secondary hover:text-ink transition-colors duration-150 uppercase"
                >
                  {label}
                </Link>
              </Fragment>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="sm:hidden ml-auto flex flex-col justify-center gap-[5px] w-10 h-10 -mr-2 items-center"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? (
              <span className="text-secondary text-2xl leading-none">×</span>
            ) : (
              <>
                <span className="block w-5 h-px bg-ink" />
                <span className="block w-5 h-px bg-ink" />
                <span className="block w-5 h-px bg-ink" />
              </>
            )}
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      {open && (
        <div className="sm:hidden border-b border-rule bg-white relative z-40">
          <nav className="flex flex-col px-4 py-8 gap-7">
            {NAV.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-light text-secondary hover:text-ink transition-colors duration-150 uppercase tracking-wide"
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}
