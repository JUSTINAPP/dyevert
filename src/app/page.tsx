'use client'

import { useState } from 'react'
import Link from 'next/link'
import Nav from '@/app/components/Nav'

const PALETTE = [
  '#d4c285', // weld yellow
  '#c4a265', // ochre
  '#b5956a', // golden ochre
  '#a07840', // raw sienna
  '#7a5c30', // umber
  '#6b4c2a', // walnut
  '#5a3c1a', // dark walnut
  '#b5613a', // rust
  '#a04a2a', // dark rust
  '#c29070', // clay
  '#b09070', // buff
  '#c8b99a', // warm stone
  '#d4b896', // tan
  '#e0c9a6', // light tan
  '#9a9080', // warm grey
  '#8a8070', // dark warm grey
  '#8a9a72', // sage
  '#7a8a62', // grey-sage
  '#6b7a52', // moss
  '#5a6440', // deep olive
  '#4a7040', // fern
  '#c8a850', // gold
]

type SwatchData = {
  postcode: string
  suburb: string
  plant: string
  part: string
  season: string
  year: number
  name: string
  observation: string
}

// One placeholder entry per palette colour — will connect to Supabase
const SWATCH_DATA: SwatchData[] = [
  { postcode: '3206', suburb: 'Albert Park', plant: 'Calendula', part: 'Flowers', season: 'Summer', year: 2025, name: 'Ruth Silverman', observation: 'Bright and generous. Much stronger than I expected from garden petals.' },
  { postcode: '3000', suburb: 'Melbourne CBD', plant: 'Onion skins', part: 'Outer skins', season: 'Summer', year: 2025, name: 'Mia Thornton', observation: 'A warm golden yellow, richer than expected from kitchen scraps.' },
  { postcode: '3068', suburb: 'Fitzroy', plant: 'Eucalyptus', part: 'Leaves', season: 'Spring', year: 2025, name: 'James Okafor', observation: 'Surprised by the softness of the green. Leaves collected after rain gave a stronger result.' },
  { postcode: '3977', suburb: 'Cranbourne', plant: 'Wattle', part: 'Flowers', season: 'Spring', year: 2025, name: 'Sarah Fitzgibbon', observation: 'The flowers gave a lighter, more golden result than I expected. Collecting in early morning made a difference.' },
  { postcode: '3122', suburb: 'Hawthorn', plant: 'Black walnut', part: 'Hulls', season: 'Autumn', year: 2025, name: 'Tom Vickers', observation: 'Exceptionally strong colour without any mordant. The hulls stained everything they touched.' },
  { postcode: '3031', suburb: 'Kensington', plant: 'Blackberry', part: 'Leaves', season: 'Spring', year: 2025, name: 'Anika Sørensen', observation: 'An invasive plant turned useful. The colour is muted and dusty — more interesting than a simple green.' },
  { postcode: '3550', suburb: 'Bendigo', plant: 'Eucalyptus', part: 'Bark', season: 'Autumn', year: 2025, name: 'David Wu', observation: 'Iron mordant transformed the colour from warm tan to this quiet grey. The combination felt alchemical.' },
  { postcode: '3141', suburb: 'South Yarra', plant: 'Wattle', part: 'Bark', season: 'Autumn', year: 2025, name: 'Priya Menon', observation: 'The bark from fallen branches gave this terracotta rust. How much colour in such a small amount of material.' },
  { postcode: '3630', suburb: 'Shepparton', plant: 'Pomegranate', part: 'Skins', season: 'Autumn', year: 2025, name: 'Nina Petrov', observation: 'From our backyard pomegranate tree. Nothing was wasted — the fruit was eaten, the skin dyed with.' },
  { postcode: '3280', suburb: 'Warrnambool', plant: 'Bracken fern', part: 'Fronds', season: 'Spring', year: 2025, name: 'Elspeth Malone', observation: 'Young spring fronds gave this warm stone colour. I had no idea the heathland behind my house could do this.' },
  { postcode: '3350', suburb: 'Ballarat', plant: 'Chamomile', part: 'Flowers', season: 'Summer', year: 2025, name: 'Ollie Breen', observation: 'A gentle, buttery tone. Nothing like the sharp yellow of some dye plants. I liked its quietness.' },
  { postcode: '3127', suburb: 'Box Hill', plant: 'Avocado', part: 'Pits and skins', season: 'Winter', year: 2025, name: 'Yuki Hashimoto', observation: 'I saved avocado pits and skins for months. The colour was this unexpected khaki — nothing like the pink I had read about.' },
  { postcode: '3220', suburb: 'Geelong', plant: 'Nettle', part: 'Leaves and stems', season: 'Spring', year: 2025, name: 'Ben Carlisle', observation: 'The process of turning something so prickly into colour felt right — a kind of negotiation with the plant.' },
  { postcode: '3065', suburb: 'Collingwood', plant: 'Onion skins', part: 'Outer skins', season: 'Winter', year: 2024, name: 'Clara de Wit', observation: 'A paler result than summer onion skins — perhaps the age of the onions, or the cooler water temperature.' },
  { postcode: '3101', suburb: 'Kew', plant: 'Oak galls', part: 'Galls', season: 'Autumn', year: 2024, name: 'Frances Borg', observation: 'Rich in tannin. The colour is dark and serious. Collected beneath a very old English oak in the local park.' },
  { postcode: '3122', suburb: 'Hawthorn', plant: 'Eucalyptus', part: 'Bark', season: 'Winter', year: 2025, name: 'Margaret Singh', observation: 'The variation between species is extraordinary. This one gave a completely unexpected result.' },
  { postcode: '3031', suburb: 'Kensington', plant: 'Bracken fern', part: 'Young fronds', season: 'Spring', year: 2025, name: 'Lucas Hwan', observation: 'The colour surprised me with its greenness. I expected something browner from the fern.' },
  { postcode: '3220', suburb: 'Geelong', plant: 'Blackberry', part: 'Leaves', season: 'Summer', year: 2025, name: 'Theo Papadopoulos', observation: 'An invasive plant along the waterway — freely available and surprisingly productive.' },
  { postcode: '3141', suburb: 'South Yarra', plant: 'Fennel', part: 'Leaves', season: 'Spring', year: 2025, name: 'Daniel Archer', observation: 'The fennel growing wild along the bike path. More colour than I expected from such a delicate plant.' },
  { postcode: '3977', suburb: 'Cranbourne', plant: 'Japanese indigo', part: 'Fresh leaves', season: 'Summer', year: 2025, name: 'Mai Nguyen', observation: 'I grew it from seed specifically for this. The colour shifts depending on how long you work it.' },
  { postcode: '3068', suburb: 'Fitzroy', plant: 'Bracken fern', part: 'Fronds', season: 'Summer', year: 2025, name: 'Lena Vogel', observation: 'Collected from the edges of the park. A quiet, mossy green — very much of this place.' },
  { postcode: '3000', suburb: 'Melbourne CBD', plant: 'Calendula', part: 'Flowers', season: 'Spring', year: 2025, name: 'Ravi Chandrasekaran', observation: 'From the community garden beds near the office. A deep, saturated colour that came quickly.' },
]

const DOTS = Array.from({ length: 300 }, (_, i) => ({
  color: PALETTE[(i * 7) % PALETTE.length],
  data: SWATCH_DATA[(i * 7) % PALETTE.length],
}))

export default function Home() {
  const [selected, setSelected] = useState<number | null>(null)

  const active = selected !== null ? DOTS[selected] : null

  return (
    <div className="min-h-screen bg-white font-sans text-ink">
      <Nav />

      {/* Hero */}
      <section className="h-[calc(100vh-3.5rem)] pt-10 flex flex-col">
        {/* Dot grid */}
        <div className="hero-dot-grid flex-1 overflow-hidden px-4 sm:px-[14mm]">
          {DOTS.map(({ color }, i) => (
            <button
              key={i}
              className="hero-dot"
              style={{ backgroundColor: color }}
              onClick={() => setSelected(i)}
              aria-label={`View colour sample ${i + 1}`}
            />
          ))}
        </div>

        {/* Tagline + CTA */}
        <div className="shrink-0 border-t border-rule px-4 sm:px-[14mm] pt-10 sm:pt-12 pb-12 sm:pb-14">
          <p className="text-sm font-light leading-relaxed text-ink">
            Every colour here came from a single person, dyeing from their own postcode.
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

      {/* Dot detail modal */}
      {active && (
        <div
          className="fixed inset-0 bg-black/20 z-50 flex items-end sm:items-center sm:justify-center sm:p-6"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white w-full sm:max-w-sm p-8 sm:p-10 relative overflow-y-auto max-h-screen sm:max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-6 right-8 text-xl leading-none text-secondary hover:text-ink transition-colors duration-150"
              aria-label="Close"
            >
              ×
            </button>

            <div
              className="w-20 h-20 rounded-full mb-8"
              style={{ backgroundColor: active.color }}
            />

            <p className="text-sm font-light text-ink">
              {active.data.postcode} {active.data.suburb}
            </p>
            <p className="text-xs font-light text-secondary mt-1">
              {active.data.season} {active.data.year}
            </p>

            <div className="border-t border-rule mt-6 pt-6 space-y-2.5">
              <Row label="Plant" value={active.data.plant} />
              <Row label="Part" value={active.data.part} />
            </div>

            <div className="border-t border-rule mt-6 pt-6">
              <p className="text-xs font-light text-secondary leading-relaxed italic">
                &ldquo;{active.data.observation}&rdquo;
              </p>
              <p className="text-xs font-light text-secondary mt-4">— {active.data.name}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-6">
      <span className="text-xs font-light text-secondary w-16 shrink-0">{label}</span>
      <span className="text-xs font-light text-ink">{value}</span>
    </div>
  )
}
