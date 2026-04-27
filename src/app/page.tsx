import Link from 'next/link'
import Nav from '@/app/components/Nav'

const DOTS = Array.from({ length: 300 })

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-ink">
      <Nav />

      {/* Hero */}
      <section className="h-[calc(100vh-3.5rem)] pt-10 flex flex-col">
        {/* Dot grid — dots fill with colour when real swatch data is uploaded */}
        <div className="hero-dot-grid flex-1 overflow-hidden px-4 sm:px-[14mm]" aria-hidden>
          {DOTS.map((_, i) => (
            <div key={i} className="hero-dot" />
          ))}
        </div>

        {/* Tagline + CTA */}
        <div className="shrink-0 border-t border-rule px-4 sm:px-[14mm] pt-10 sm:pt-12 pb-12 sm:pb-14">
          <p className="text-sm font-light leading-relaxed text-ink">
            Every colour comes from a single plant, found in a single postcode.
          </p>
          <div className="flex gap-8 mt-8">
            <Link
              href="/artwork"
              className="text-xs tracking-widest uppercase border-b border-ink pb-0.5 hover:text-secondary hover:border-secondary transition-colors duration-150"
            >
              See the artwork
            </Link>
            <Link
              href="/request-a-kit"
              className="text-xs tracking-widest uppercase border-b border-ink pb-0.5 hover:text-secondary hover:border-secondary transition-colors duration-150"
            >
              Request a kit
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
