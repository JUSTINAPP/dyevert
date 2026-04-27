import Nav from '@/app/components/Nav'

const HONOURABLE_HARVEST = [
  'Ask permission before taking. Abide by the answer.',
  'Never take the first plant you find, and never take the last.',
  'Never take more than half of what is there.',
  'Take only what you need.',
  'Take only that which is given freely.',
  'Never waste what you have taken.',
  'Share what you find.',
  'Give thanks for what is given.',
  'Sustain the ones who sustain you.',
  'Reciprocate the gift.',
]

const BEFORE_YOU_FORAGE = [
  'Identify the plant before you harvest. Use a field guide relevant to your region, or consult iNaturalist.',
  'Collect away from roadsides, railway corridors, and land that may have been sprayed or treated.',
  'Do not harvest from private property without permission.',
  'Wash all plant material thoroughly before use.',
  'Wear gloves when handling unfamiliar plants.',
  'Do not ingest any dye plant material.',
  'Take only what you need for your swatch — a small amount is usually sufficient.',
  'Leave the plant in better condition than you found it where possible.',
]

const DYE_PLANTS: {
  family: string
  plants: [string, string, string, string][]
}[] = [
  {
    family: 'Yellows and Golds',
    plants: [
      ['Onion skins', 'Allium cepa', 'Outer skins', 'Year-round — a kitchen staple; very reliable'],
      [
        'Wattle',
        'Acacia spp.',
        'Flowers, bark, seed pods',
        'Spring for flowers; bark year-round — many species across Australia',
      ],
      ['Calendula', 'Calendula officinalis', 'Flowers', 'Summer — common in home gardens'],
      [
        "St John's Wort",
        'Hypericum perforatum',
        'Flowers and leaves',
        'Summer — widely naturalised across Australia; freely harvestable',
      ],
      [
        "Dyer's chamomile",
        'Anthemis tinctoria',
        'Flowers',
        'Summer — a strong, reliable yellow; grow your own or source from nurseries',
      ],
      [
        'Fennel',
        'Foeniculum vulgare',
        'Leaves and flowers',
        'Spring–Summer — widely naturalised and freely harvestable',
      ],
    ],
  },
  {
    family: 'Browns and Tans',
    plants: [
      [
        'Eucalyptus',
        'Eucalyptus spp.',
        'Leaves, bark, bud caps',
        'Year-round — enormous variation between species and seasons',
      ],
      [
        'Black walnut',
        'Juglans nigra',
        'Green hulls',
        'Autumn — street trees in older suburbs; very strong colour without mordant',
      ],
      [
        'Oak galls',
        'Quercus spp.',
        'Galls',
        'Autumn–Winter — rich in tannin; also an excellent mordant for other dyes',
      ],
      [
        'Avocado',
        'Persea americana',
        'Pits and skins',
        'Year-round — kitchen waste; warm pinks to soft browns depending on mordant',
      ],
      ['Coffee', 'Coffea arabica', 'Spent grounds', 'Year-round — kitchen waste; pale tan'],
    ],
  },
  {
    family: 'Pinks',
    plants: [
      [
        'Avocado',
        'Persea americana',
        'Pits and skins',
        'Year-round — longer simmering and alum mordant draws out deeper pinks',
      ],
      [
        'Red onion skins',
        'Allium cepa var.',
        'Outer skins',
        'Year-round — produces pink to mauve tones',
      ],
    ],
  },
  {
    family: 'Greens',
    plants: [
      [
        'Bracken fern',
        'Pteridium esculentum',
        'Young fronds',
        'Spring — collect lightly before fronds fully unfurl',
      ],
      [
        'Blackberry',
        'Rubus fruticosus',
        'Leaves',
        'Spring–Summer — invasive; freely harvestable along waterways and roadsides',
      ],
      [
        'Nettle',
        'Urtica dioica',
        'Leaves and stems',
        'Spring–Summer — wear gloves; produces a muted green-gold',
      ],
      [
        'Japanese indigo',
        'Persicaria tinctoria',
        'Fresh leaves',
        'Summer — grow your own; colour is fugitive unless vatted',
      ],
    ],
  },
  {
    family: 'Greys and Blacks',
    plants: [
      [
        'Oak gall + iron',
        'Quercus spp.',
        'Galls with iron modifier',
        'Autumn–Winter — iron mordant shifts tannin-rich baths towards charcoal grey',
      ],
      [
        'Eucalyptus + iron',
        'Eucalyptus spp.',
        'Leaves with iron modifier',
        'Year-round — iron darkens eucalyptus results considerably',
      ],
    ],
  },
]

const SEASONS = [
  {
    season: 'Summer — December to February',
    text: "Peak foraging season. Gardens and roadsides are abundant with flowers. Onion skins, calendula, chamomile, fennel, and St John's Wort are at their most productive. Japanese indigo can be harvested from established plants. Bracken fern young growth has passed; leaves are now mature.",
  },
  {
    season: 'Autumn — March to May',
    text: 'The season of bark, hulls, and galls. Black walnut hulls fall in late March; collect them fresh. Oak galls are easy to find beneath English oaks in parks and older suburbs. Eucalyptus bark shedding increases in autumn. Avocado pits from summer fruit can be dried and stored.',
  },
  {
    season: 'Winter — June to August',
    text: 'The quietest season for foraging. Kitchen materials become the primary source — onion skins, avocado, coffee. Madder roots from established plants can be carefully harvested. Oak galls and dried materials collected in autumn carry through. A good time to prepare equipment and mordants.',
  },
  {
    season: 'Spring — September to November',
    text: 'Bracken fern sends up new fronds in September — collect lightly before they unfurl fully. Wattle flowers briefly and brilliantly. Blackberry and nettle leaf growth resumes along waterways and creek banks. Spring is also the time to sow Japanese indigo for summer harvest.',
  },
]

const SAFETY = [
  'Identify every plant before use. If you are uncertain, do not proceed.',
  'Do not ingest any dye plant material.',
  'Some plants cause contact dermatitis — wear gloves and work in a ventilated space.',
  'Do not use dye pots for food preparation.',
  'Keep all dye materials away from children and animals.',
  'The kit provided uses alum and iron as mordants, which are generally safe when handled with care.',
  'If you experience a skin reaction, wash the area thoroughly and seek medical advice if it persists.',
]

export default function ForagingGuidePage() {
  return (
    <div className="min-h-screen bg-white font-sans text-ink">
      <Nav />

      <main className="px-4 sm:px-[14mm] pt-12 sm:pt-14 pb-20 sm:pb-24 max-w-2xl">
        <h1 className="text-xs font-light tracking-widest uppercase text-secondary">
          Foraging Guide
        </h1>
        <div className="border-t border-rule mt-4 mb-12" />

        <p className="text-sm font-light text-ink leading-relaxed mb-14">
          This guide is for participants in Postcode Colour. It is an introduction to foraging for
          natural dye plants in the urban and peri-urban environments of Australia. You do not need
          prior experience — only curiosity, care, and a postcode.
        </p>

        {/* The Honourable Harvest */}
        <section className="mb-14">
          <h2 className="text-xs font-light tracking-widest uppercase text-secondary mb-4">
            The Honourable Harvest
          </h2>
          <div className="border-t border-rule mb-8" />
          <p className="text-sm font-light text-secondary leading-relaxed mb-8">
            The Honourable Harvest is a set of guidelines articulated by botanist and author Robin
            Wall Kimmerer in <em>Braiding Sweetgrass</em>. They offer a way of thinking about the
            relationship between harvester and harvested — one based on reciprocity rather than
            extraction.
          </p>
          <ol className="space-y-3">
            {HONOURABLE_HARVEST.map((principle, i) => (
              <li key={i} className="flex gap-6 text-sm font-light text-ink leading-relaxed">
                <span className="text-secondary shrink-0 tabular-nums w-5 text-right">
                  {i + 1}.
                </span>
                <span>{principle}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Before you forage */}
        <section className="mb-14">
          <h2 className="text-xs font-light tracking-widest uppercase text-secondary mb-4">
            Before You Forage
          </h2>
          <div className="border-t border-rule mb-8" />
          <ul className="space-y-3">
            {BEFORE_YOU_FORAGE.map((item, i) => (
              <li key={i} className="flex gap-5 text-sm font-light text-ink leading-relaxed">
                <span className="text-secondary shrink-0">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Dye plant list */}
        <section className="mb-14">
          <h2 className="text-xs font-light tracking-widest uppercase text-secondary mb-4">
            Dye Plants of Australia
          </h2>
          <div className="border-t border-rule mb-8" />
          <p className="text-sm font-light text-secondary leading-relaxed mb-10">
            The following plants are commonly found in Australia's urban and semi-rural environments
            and are known to produce colour. Results vary with mordant, water chemistry, and plant
            health. Part of the project is discovering what your postcode holds.
          </p>

          {DYE_PLANTS.map(({ family, plants }) => (
            <div key={family} className="mb-10">
              <h3 className="text-xs font-light uppercase tracking-wide text-ink mb-4">
                {family}
              </h3>
              <div className="overflow-x-auto">
                <div className="border-t border-rule min-w-[480px]">
                  {plants.map(([name, latin, part, notes]) => (
                    <div
                      key={name}
                      className="border-b border-rule py-4 grid gap-x-8 text-xs font-light"
                      style={{ gridTemplateColumns: '1fr 1fr 1.5fr' }}
                    >
                      <div>
                        <p className="text-ink">{name}</p>
                        <p className="text-secondary italic mt-0.5">{latin}</p>
                      </div>
                      <p className="text-secondary self-start">{part}</p>
                      <p className="text-secondary leading-relaxed">{notes}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Seasonal guide */}
        <section className="mb-14">
          <h2 className="text-xs font-light tracking-widest uppercase text-secondary mb-4">
            Seasonal Guide — Australia
          </h2>
          <div className="border-t border-rule mb-8" />
          <div className="space-y-9">
            {SEASONS.map(({ season, text }) => (
              <div key={season}>
                <h3 className="text-xs font-light uppercase tracking-wide text-ink mb-2">
                  {season}
                </h3>
                <p className="text-sm font-light text-secondary leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Safety */}
        <section className="mb-14">
          <h2 className="text-xs font-light tracking-widest uppercase text-secondary mb-4">
            Safety Notes
          </h2>
          <div className="border-t border-rule mb-8" />
          <ul className="space-y-3">
            {SAFETY.map((item, i) => (
              <li key={i} className="flex gap-5 text-sm font-light text-ink leading-relaxed">
                <span className="text-secondary shrink-0">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  )
}
