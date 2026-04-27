'use client'

import { useState, useMemo, useEffect } from 'react'
import Image from 'next/image'
import Nav from '@/app/components/Nav'
import { supabase } from '@/app/lib/supabase'

// Normalised swatch type used for display
type Swatch = {
  id: string
  color: string
  postcode: string
  plant: string
  part: string
  location: string
  season: string
  name: string
  observations: string
  imageUrl: string | null
  isReal: boolean
}

// Placeholder swatches — shown until more real data is uploaded
const PLACEHOLDERS: Swatch[] = [
  {
    id: 'p-1',
    color: '#8B3A2A',
    postcode: '2026',
    plant: 'Eucalyptus',
    part: 'Leaves',
    location: 'Local park',
    season: 'Spring 2025',
    name: 'James Okafor',
    observations:
      'Surprised by the softness of the green. Leaves collected after rain seemed to give a stronger result.',
    imageUrl: null,
    isReal: false,
  },
  {
    id: 'p-2',
    color: '#E8D44D',
    postcode: '4000',
    plant: 'Wattle',
    part: 'Flowers',
    location: 'Street tree',
    season: 'Spring 2025',
    name: 'Sarah Fitzgibbon',
    observations:
      'The flowers gave a lighter, more golden result than I expected. Collecting in early morning made a difference.',
    imageUrl: null,
    isReal: false,
  },
  {
    id: 'p-3',
    color: '#E2C84B',
    postcode: '5067',
    plant: 'Chamomile',
    part: 'Flowers',
    location: 'Home garden',
    season: 'Summer 2025',
    name: 'Ollie Breen',
    observations: 'A gentle, buttery tone. Nothing like the sharp yellow of some dye plants.',
    imageUrl: null,
    isReal: false,
  },
  {
    id: 'p-4',
    color: '#D4A090',
    postcode: '6008',
    plant: 'Avocado',
    part: 'Pits and skins',
    location: 'Home kitchen',
    season: 'Winter 2025',
    name: 'Yuki Hashimoto',
    observations:
      'I saved avocado pits and skins for months. The colour was this unexpected khaki.',
    imageUrl: null,
    isReal: false,
  },
  {
    id: 'p-5',
    color: '#B5C45A',
    postcode: '7000',
    plant: 'Bracken fern',
    part: 'Fronds',
    location: 'Bushland',
    season: 'Spring 2025',
    name: 'Elspeth Malone',
    observations:
      'Young spring fronds gave this warm stone colour. The bush behind my house is full of bracken.',
    imageUrl: null,
    isReal: false,
  },
]

function dbToSwatch(db: {
  id: number
  hex_colour: string | null
  postcode: string
  plant_material: string | null
  plant_part: string | null
  collection_location: string | null
  season: string | null
  participant_name: string | null
  observations: string | null
  image_url: string | null
}): Swatch {
  return {
    id: `db-${db.id}`,
    color: db.hex_colour ?? '#9a9080',
    postcode: db.postcode,
    plant: db.plant_material ?? '',
    part: db.plant_part ?? '',
    location: db.collection_location ?? '',
    season: db.season ?? '',
    name: db.participant_name ?? '',
    observations: db.observations ?? '',
    imageUrl: db.image_url,
    isReal: true,
  }
}

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

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-6">
      <span className="text-xs font-light text-secondary w-20 shrink-0">{label}</span>
      <span className="text-xs font-light text-ink">{value}</span>
    </div>
  )
}

export default function ArtworkPage() {
  const [dbSwatches, setDbSwatches] = useState<Swatch[]>([])
  const [filters, setFilters] = useState<Filters>({
    postcode: '',
    plant: '',
    part: '',
    location: '',
    season: '',
  })
  const [selected, setSelected] = useState<Swatch | null>(null)

  useEffect(() => {
    supabase
      .from('swatches')
      .select(
        'id, hex_colour, postcode, plant_material, plant_part, collection_location, season, participant_name, observations, image_url',
      )
      .then(({ data }) => {
        if (data) setDbSwatches(data.map(dbToSwatch))
      })
  }, [])

  // Real swatches first, placeholders fill the rest
  const allSwatches = [...dbSwatches, ...PLACEHOLDERS]

  const filtered = useMemo(
    () =>
      allSwatches.filter(
        (s) =>
          (!filters.postcode || s.postcode === filters.postcode) &&
          (!filters.plant || s.plant === filters.plant) &&
          (!filters.part || s.part === filters.part) &&
          (!filters.location || s.location === filters.location) &&
          (!filters.season || s.season.startsWith(filters.season)),
      ),
    [filters, dbSwatches], // eslint-disable-line react-hooks/exhaustive-deps
  )

  const postcodes = unique(allSwatches.map((s) => s.postcode))
  const plants = unique(allSwatches.map((s) => s.plant).filter(Boolean))
  const parts = unique(allSwatches.map((s) => s.part).filter(Boolean))
  const locations = unique(allSwatches.map((s) => s.location).filter(Boolean))
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
              className="text-xs font-light text-secondary hover:text-ink transition-colors duration-150"
            >
              Clear
            </button>
          )}

          <span className="hidden sm:inline-block ml-auto text-xs font-light text-secondary">
            {filtered.length} {filtered.length === 1 ? 'swatch' : 'swatches'}
          </span>
        </div>

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
            className="bg-white w-full sm:max-w-sm relative overflow-y-auto max-h-screen sm:max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Photograph (real swatches only) */}
            {selected.imageUrl && (
              <div className="relative w-full aspect-square bg-rule">
                <Image
                  src={selected.imageUrl}
                  alt={`Swatch from postcode ${selected.postcode}`}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="p-8 sm:p-10">
              <button
                onClick={() => setSelected(null)}
                className="absolute top-5 right-7 text-xl leading-none text-secondary hover:text-ink transition-colors duration-150 z-10"
                aria-label="Close"
              >
                ×
              </button>

              <div
                className="w-14 h-14 rounded-full mb-6"
                style={{ backgroundColor: selected.color }}
              />

              <p className="text-sm font-light text-ink">{selected.postcode}</p>
              <p className="text-xs font-light text-secondary mt-1">{selected.season}</p>

              <div className="border-t border-rule mt-6 pt-6 space-y-2.5">
                {selected.plant && <Row label="Plant" value={selected.part ? `${selected.plant} — ${selected.part}` : selected.plant} />}
                {selected.location && <Row label="Collected" value={selected.location} />}
                {selected.name && <Row label="Participant" value={selected.name} />}
              </div>

              {selected.observations && (
                <div className="border-t border-rule mt-6 pt-6">
                  <p className="text-xs font-light text-secondary leading-relaxed italic">
                    &ldquo;{selected.observations}&rdquo;
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
