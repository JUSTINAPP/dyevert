import Image from 'next/image'
import Nav from '@/app/components/Nav'

const FUTURE_GOALS = [
  'Expand participation to postcodes across Australia.',
  'Develop a publicly accessible map displaying colour swatches by postcode.',
]

export default function ProjectPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-ink">
      <Nav />

      <main className="px-4 sm:px-[14mm] pt-12 sm:pt-14 pb-20 sm:pb-24 max-w-2xl">
        <h1 className="text-xs font-light tracking-widest uppercase text-secondary">The Project</h1>
        <div className="border-t border-rule mt-4 mb-12" />

        {/* About */}
        <section className="mb-14">
          <h2 className="text-xs font-light tracking-widest uppercase text-secondary mb-4">
            About Postcode Colour
          </h2>
          <div className="border-t border-rule mb-8" />
          <p className="text-sm font-light text-ink leading-relaxed mb-5">
            Postcode Colour is a participatory natural dyeing project that begins with a simple
            question: what colours does your postcode hold?
          </p>
          <p className="text-sm font-light text-ink leading-relaxed mb-5">
            Participants across Australia collect plant material from within their own postcode area
            — from gardens, parks, roadsides, creek banks, and kitchen scraps — and use it to dye a
            small swatch of cloth. The resulting swatch is returned to the project, where it joins a
            growing archive of colour mapped to place.
          </p>
          <p className="text-sm font-light text-ink leading-relaxed mb-5">
            Each colour is a document. It records a postcode, a plant, a person, a moment in a
            particular season. Together the swatches form something larger: a portrait of a
            landscape rendered in the colours it produces.
          </p>
          <p className="text-sm font-light text-secondary leading-relaxed">
            Postcode Colour is one project within{' '}
            <a
              href="https://dyevert.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink hover:text-secondary transition-colors duration-150"
            >
              dyevert
            </a>
            , Joanna Fowles&rsquo; broader practice exploring natural dyeing, colour, and community.
          </p>
        </section>

        {/* The artist */}
        <section className="mb-14">
          <h2 className="text-xs font-light tracking-widest uppercase text-secondary mb-4">
            The Artist
          </h2>
          <div className="border-t border-rule mb-8" />

          <div className="flex gap-7 items-start mb-8">
            <div className="rounded-full shrink-0 overflow-hidden" style={{ width: 120, height: 120 }}>
              <Image
                src="/assets/jo-fowles-dyevert-1080x1130.jpg"
                alt="Joanna Fowles"
                width={120}
                height={120}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="pt-1">
              <p className="text-sm font-light text-ink">Joanna Fowles</p>
              <p className="text-xs font-light text-secondary mt-1.5">
                Illawarra, Australia
              </p>
              <a
                href="https://joannafowles.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-light text-secondary hover:text-ink transition-colors duration-150 mt-1 block"
              >
                joannafowles.com
              </a>
            </div>
          </div>

          <p className="text-sm font-light text-ink leading-relaxed mb-5">
            Joanna Fowles is an Illawarra-based artist and textile practitioner working in natural
            dyeing and community practice. Her practice, dyevert, explores connections between
            place, colour, and community through materials found in the environment.
          </p>
          <p className="text-sm font-light text-ink leading-relaxed mb-5">
            Joanna has been working with natural dyes for over a decade, developing a methodology
            that prioritises locally sourced plant materials and minimal intervention. She is
            particularly interested in the urban plant world, including the weeds, street trees, and
            garden escapes that form most people&rsquo;s daily botanical environment, as a source of
            colour and knowledge.
          </p>
          <p className="text-sm font-light text-ink leading-relaxed">
            Postcode Colour extends this into a shared community practice, distributing the act of
            dyeing across hundreds of postcodes and inviting community to engage with the plant life
            of their surroundings.
          </p>
        </section>

        {/* Exhibition */}
        <section className="mb-14">
          <h2 className="text-xs font-light tracking-widest uppercase text-secondary mb-4">
            Exhibition History
          </h2>
          <div className="border-t border-rule mb-0" />
          <div className="border-b border-rule py-6 flex gap-10">
            <span className="text-xs font-light text-secondary shrink-0 w-10">2026</span>
            <div>
              <p className="text-sm font-light text-ink">Postcode Colour</p>
              <p className="text-xs font-light text-secondary mt-1.5">Melbourne Design Week 2026</p>
              <p className="text-xs font-light text-secondary">
                Australian Tapestry Workshop, South Melbourne
              </p>
              <p className="text-xs font-light text-secondary">March 2026</p>
            </div>
          </div>
        </section>

        {/* Future goals */}
        <section className="mb-14">
          <h2 className="text-xs font-light tracking-widest uppercase text-secondary mb-4">
            Future Goals
          </h2>
          <div className="border-t border-rule mb-8" />
          <ul className="space-y-3">
            {FUTURE_GOALS.map((goal, i) => (
              <li key={i} className="flex gap-5 text-sm font-light text-ink leading-relaxed">
                <span className="text-secondary shrink-0">—</span>
                <span>{goal}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  )
}
