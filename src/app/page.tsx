import Link from 'next/link'
import Nav from '@/app/components/Nav'
import HeroDots from '@/app/components/HeroDots'
import { supabase } from '@/app/lib/supabase'

export default async function Home() {
  const { data: swatches, error } = await supabase
    .from('swatches')
    .select(
      'id, hex_colour, postcode, plant_material, plant_part, collection_location, season, participant_name, observations, image_url',
    )
    .not('hex_colour', 'is', null)

  if (error) {
    console.error('[home] swatches fetch failed:', error.message)
  }

  return (
    <div className="min-h-screen bg-white font-sans text-ink">
      <Nav />

      <section className="min-h-[calc(100vh-3.5rem)] pt-10 flex flex-col justify-between">
        <HeroDots swatches={swatches ?? []} />

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
