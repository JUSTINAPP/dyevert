'use client'

import { useState } from 'react'
import Image from 'next/image'

const TOTAL = 300

export type DbSwatch = {
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
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-6">
      <span className="text-xs font-light text-secondary w-20 shrink-0">{label}</span>
      <span className="text-xs font-light text-ink">{value}</span>
    </div>
  )
}

export default function HeroDots({ swatches }: { swatches: DbSwatch[] }) {
  const [selected, setSelected] = useState<DbSwatch | null>(null)

  // Place each filled swatch at a position derived from its postcode
  const byPosition = new Map<number, DbSwatch>()
  for (const s of swatches) {
    if (s.hex_colour) {
      const pos = parseInt(s.postcode) % TOTAL
      byPosition.set(pos, s)
    }
  }

  return (
    <>
      <div className="hero-dot-grid flex-1 overflow-hidden px-4 sm:px-[14mm]" aria-label="Colour grid">
        {Array.from({ length: TOTAL }, (_, i) => {
          const swatch = byPosition.get(i)
          if (swatch) {
            return (
              <button
                key={i}
                className="hero-dot hero-dot--filled"
                style={{ backgroundColor: swatch.hex_colour! }}
                onClick={() => setSelected(swatch)}
                aria-label={`${swatch.postcode} — ${swatch.plant_material}`}
              />
            )
          }
          return <div key={i} className="hero-dot" aria-hidden />
        })}
      </div>

      {/* Swatch detail modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/20 z-50 flex items-end sm:items-center sm:justify-center sm:p-6"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white w-full sm:max-w-sm relative overflow-y-auto max-h-screen sm:max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Photograph */}
            {selected.image_url && (
              <div className="relative w-full aspect-square bg-rule">
                <Image
                  src={selected.image_url}
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

              {selected.hex_colour && (
                <div
                  className="w-10 h-10 rounded-full mb-5"
                  style={{ backgroundColor: selected.hex_colour }}
                />
              )}

              <p className="text-sm font-light text-ink">{selected.postcode}</p>
              {selected.season && (
                <p className="text-xs font-light text-secondary mt-1">{selected.season}</p>
              )}

              <div className="border-t border-rule mt-6 pt-5 space-y-2.5">
                {selected.plant_material && (
                  <Row
                    label="Plant"
                    value={
                      selected.plant_part
                        ? `${selected.plant_material} — ${selected.plant_part}`
                        : selected.plant_material
                    }
                  />
                )}
                {selected.collection_location && (
                  <Row label="Collected" value={selected.collection_location} />
                )}
                {selected.participant_name && (
                  <Row label="Participant" value={selected.participant_name} />
                )}
              </div>

              {selected.observations && (
                <div className="border-t border-rule mt-5 pt-5">
                  <p className="text-xs font-light text-secondary leading-relaxed italic">
                    &ldquo;{selected.observations}&rdquo;
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
