'use client'

import { useState, useMemo } from 'react'
import Nav from '@/app/components/Nav'

type Swatch = {
  id: number
  color: string
  postcode: string
  suburb: string
  plant: string
  part: string
  location: string
  season: string
  year: number
  name: string
  observations: string
}

const SWATCHES: Swatch[] = [
  {
    id: 1,
    color: '#c8a850',
    postcode: '3000',
    suburb: 'Melbourne CBD',
    plant: 'Onion skins',
    part: 'Outer skins',
    location: 'Urban garden',
    season: 'Summer',
    year: 2025,
    name: 'Mia Thornton',
    observations:
      'A warm golden yellow, richer than expected from kitchen scraps. The colour deepened considerably with an alum mordant.',
  },
  {
    id: 2,
    color: '#8a9a72',
    postcode: '3068',
    suburb: 'Fitzroy',
    plant: 'Eucalyptus',
    part: 'Leaves',
    location: 'Royal Park',
    season: 'Spring',
    year: 2025,
    name: 'James Okafor',
    observations:
      'Surprised by the softness of the green. Leaves collected after rain seemed to give a stronger result.',
  },
  {
    id: 3,
    color: '#b5613a',
    postcode: '3141',
    suburb: 'South Yarra',
    plant: 'Wattle',
    part: 'Bark',
    location: 'Botanical Gardens',
    season: 'Autumn',
    year: 2025,
    name: 'Priya Menon',
    observations:
      'The bark from fallen branches gave a terracotta rust. I was struck by how much colour was held in such a small amount of material.',
  },
  {
    id: 4,
    color: '#d4c285',
    postcode: '3206',
    suburb: 'Albert Park',
    plant: 'Calendula',
    part: 'Flowers',
    location: 'Home garden',
    season: 'Summer',
    year: 2025,
    name: 'Ruth Silverman',
    observations:
      'Bright and cheerful. The petals gave generously. I used flowers from my balcony garden — they are everywhere in summer.',
  },
  {
    id: 5,
    color: '#6b4c2a',
    postcode: '3122',
    suburb: 'Hawthorn',
    plant: 'Black walnut',
    part: 'Hulls',
    location: 'Street tree',
    season: 'Autumn',
    year: 2025,
    name: 'Tom Vickers',
    observations:
      'Exceptionally strong colour without any mordant. The hulls stained everything they touched. A rich, permanent brown.',
  },
  {
    id: 6,
    color: '#6b7a52',
    postcode: '3031',
    suburb: 'Kensington',
    plant: 'Blackberry',
    part: 'Leaves',
    location: 'Maribyrnong River trail',
    season: 'Spring',
    year: 2025,
    name: 'Anika Sørensen',
    observations:
      'An invasive plant turned useful material. The colour is muted and dusty — more interesting than a simple green.',
  },
  {
    id: 7,
    color: '#c8b99a',
    postcode: '3280',
    suburb: 'Warrnambool',
    plant: 'Bracken fern',
    part: 'Fronds',
    location: 'Coastal heathland',
    season: 'Spring',
    year: 2025,
    name: 'Elspeth Malone',
    observations:
      'Young spring fronds gave this warm stone colour. The heathland behind my house is full of bracken — I had no idea it could do this.',
  },
  {
    id: 8,
    color: '#9a9080',
    postcode: '3550',
    suburb: 'Bendigo',
    plant: 'Eucalyptus',
    part: 'Bark',
    location: 'Bushland reserve',
    season: 'Autumn',
    year: 2025,
    name: 'David Wu',
    observations:
      'Iron mordant transformed the colour from warm tan to this quiet grey. The combination felt alchemical.',
  },
  {
    id: 9,
    color: '#5a6440',
    postcode: '3127',
    suburb: 'Box Hill',
    plant: 'Avocado',
    part: 'Pits and skins',
    location: 'Home kitchen',
    season: 'Winter',
    year: 2025,
    name: 'Yuki Hashimoto',
    observations:
      'I saved avocado pits and skins for months. The resulting colour was this unexpected khaki — nothing like the pink I had read about.',
  },
  {
    id: 10,
    color: '#c4a265',
    postcode: '3977',
    suburb: 'Cranbourne',
    plant: 'Wattle',
    part: 'Flowers',
    location: 'Cranbourne Botanical Gardens',
    season: 'Spring',
    year: 2025,
    name: 'Sarah Fitzgibbon',
    observations:
      'The flowers gave a lighter, more golden result than I expected. Collecting in early morning made a difference.',
  },
  {
    id: 11,
    color: '#b09070',
    postcode: '3350',
    suburb: 'Ballarat',
    plant: 'Chamomile',
    part: 'Flowers',
    location: 'Home garden',
    season: 'Summer',
    year: 2025,
    name: 'Ollie Breen',
    observations:
      'A gentle, buttery tone. Nothing like the sharp yellow of some dye plants. I liked its quietness.',
  },
  {
    id: 12,
    color: '#7a6040',
    postcode: '3101',
    suburb: 'Kew',
    plant: 'Oak galls',
    part: 'Galls',
    location: 'Local park',
    season: 'Autumn',
    year: 2024,
    name: 'Frances Borg',
    observations:
      'Rich in tannin. The colour is dark and serious. Collected beneath a very old English oak planted by the council in the 1920s.',
  },
  {
    id: 13,
    color: '#a07840',
    postcode: '3630',
    suburb: 'Shepparton',
    plant: 'Pomegranate',
    part: 'Skins',
    location: 'Home orchard',
    season: 'Autumn',
    year: 2025,
    name: 'Nina Petrov',
    observations:
      'From our backyard pomegranate tree. Nothing was wasted — the fruit was eaten, the skin dyed with.',
  },
  {
    id: 14,
    color: '#7a8a62',
    postcode: '3220',
    suburb: 'Geelong',
    plant: 'Nettle',
    part: 'Leaves and stems',
    location: 'Creek corridor',
    season: 'Spring',
    year: 2025,
    name: 'Ben Carlisle',
    observations:
      'Collected with long gloves. The process of turning something so prickly into colour felt right — a kind of negotiation with the plant.',
  },
  {
    id: 15,
    color: '#e0c9a6',
    postcode: '3065',
    suburb: 'Collingwood',
    plant: 'Onion skins',
    part: 'Outer skins',
    location: 'Community garden',
    season: 'Winter',
    year: 2024,
    name: 'Clara de Wit',
    observations:
      'A paler result than summer onion skins — perhaps the age of the onions, or the cooler water temperature. Interesting variation.',
  },
]

function unique(arr: string[]): string[] {
  return Array.from(new Set(arr)).sort()
}

type Filters = {
  postcode: string
  plant: string
  part: string
  location: string
  season: string
}

const SEASONS = ['Summer', 'Autumn', 'Winter', 'Spring']

export default function ArtworkPage() {
  const [filters, setFilters] = useState<Filters>({
    postcode: '',
    plant: '',
    part: '',
    location: '',
    season: '',
  })
  const [selected, setSelected] = useState<Swatch | null>(null)

  const filtered = useMemo(
    () =>
      SWATCHES.filter(
        (s) =>
          (!filters.postcode || s.postcode === filters.postcode) &&
          (!filters.plant || s.plant === filters.plant) &&
          (!filters.part || s.part === filters.part) &&
          (!filters.location || s.location === filters.location) &&
          (!filters.season || s.season === filters.season),
      ),
    [filters],
  )

  const postcodes = unique(SWATCHES.map((s) => s.postcode))
  const plants = unique(SWATCHES.map((s) => s.plant))
  const parts = unique(SWATCHES.map((s) => s.part))
  const locations = unique(SWATCHES.map((s) => s.location))
  const hasFilters = Object.values(filters).some(Boolean)

  function set(key: keyof Filters) {
    return (e: React.ChangeEvent<HTMLSelectElement>) =>
      setFilters((f) => ({ ...f, [key]: e.target.value }))
  }

  function clearFilters() {
    setFilters({ postcode: '', plant: '', part: '', location: '', season: '' })
  }

  const selectClass =
    'w-full sm:w-auto text-xs font-light border border-rule px-3 py-2 sm:py-1.5 bg-white text-secondary cursor-pointer hover:border-ink transition-colors duration-150 focus:outline-none'

  return (
    <div className="min-h-screen bg-white font-sans text-ink">
      <Nav />

      {/* Filter bar */}
      <div className="px-4 sm:px-[14mm] py-4 sm:py-5 border-b border-rule">
        <div className="flex flex-wrap gap-3">
          <select value={filters.postcode} onChange={set('postcode')} className={selectClass}>
            <option value="">All postcodes</option>
            {postcodes.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          <select value={filters.plant} onChange={set('plant')} className={selectClass}>
            <option value="">All plants</option>
            {plants.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          <select value={filters.part} onChange={set('part')} className={selectClass}>
            <option value="">All parts</option>
            {parts.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          <select value={filters.location} onChange={set('location')} className={selectClass}>
            <option value="">All locations</option>
            {locations.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>

          <select value={filters.season} onChange={set('season')} className={selectClass}>
            <option value="">All seasons</option>
            {SEASONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="text-xs font-light text-secondary hover:text-ink transition-colors duration-150 sm:ml-0"
            >
              Clear
            </button>
          )}

          {/* Desktop count */}
          <span className="hidden sm:inline-block ml-auto text-xs font-light text-secondary">
            {filtered.length} {filtered.length === 1 ? 'swatch' : 'swatches'}
          </span>
        </div>

        {/* Mobile count */}
        <p className="sm:hidden mt-3 text-xs font-light text-secondary">
          {filtered.length} {filtered.length === 1 ? 'swatch' : 'swatches'}
        </p>
      </div>

      {/* Swatch grid */}
      <div className="swatch-grid px-4 sm:px-[14mm] py-10 sm:py-12">
        {filtered.map((swatch) => (
          <button
            key={swatch.id}
            onClick={() => setSelected(swatch)}
            className="text-left group"
            aria-label={`${swatch.postcode} — ${swatch.plant}`}
          >
            <div
              className="w-10 h-10 sm:w-14 sm:h-14 rounded-full mb-3 group-hover:opacity-75 transition-opacity duration-150"
              style={{ backgroundColor: swatch.color }}
            />
            <p className="text-xs font-light text-secondary leading-snug">{swatch.postcode}</p>
            <p className="text-xs font-light text-secondary leading-snug truncate">{swatch.plant}</p>
          </button>
        ))}

        {filtered.length === 0 && (
          <p className="text-sm font-light text-secondary col-span-full py-16">
            No swatches match the selected filters.
          </p>
        )}
      </div>

      {/* Detail modal */}
      {selected && (
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
              style={{ backgroundColor: selected.color }}
            />

            <p className="text-sm font-light text-ink">
              {selected.postcode} {selected.suburb}
            </p>
            <p className="text-xs font-light text-secondary mt-1">
              {selected.season} {selected.year}
            </p>

            <div className="border-t border-rule mt-6 pt-6 space-y-2.5">
              <Row label="Plant" value={selected.plant} />
              <Row label="Part" value={selected.part} />
              <Row label="Collected" value={selected.location} />
            </div>

            <div className="border-t border-rule mt-6 pt-6">
              <p className="text-xs font-light text-secondary leading-relaxed italic">
                &ldquo;{selected.observations}&rdquo;
              </p>
              <p className="text-xs font-light text-secondary mt-4">— {selected.name}</p>
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
      <span className="text-xs font-light text-secondary w-20 shrink-0">{label}</span>
      <span className="text-xs font-light text-ink">{value}</span>
    </div>
  )
}
