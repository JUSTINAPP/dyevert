import Nav from '@/app/components/Nav'

const TIPS = [
  'Bark and leaves generally give stronger colour than flowers.',
  'Longer simmering means deeper colour.',
  'Leaving the swatch overnight intensifies the result.',
  'Every plant is different — unexpected results are part of the project.',
]

const TROUBLESHOOTING = [
  'Nothing happened? Try more plant material or a longer simmer time.',
  'The colour faded after rinsing? This is normal. The mordant dots may still show a difference.',
  'Not sure what plant you used? Note it.',
]

const STEPS = [
  {
    heading: 'Step One — Observe',
    body: 'Look around you. What plants are nearby that might hold colour? What food waste might be worth trying? What grows in your garden, at the curbside, or on derelict land? You are looking for anything that stains.',
  },
  {
    heading: 'Step Two — Collect',
    body: 'Gather a small quantity of material to test. One to three handfuls is a good guide. Forage mindfully — take only what you need and always leave plenty behind.',
  },
  {
    heading: 'Step Three — Dye',
    body: 'Place the foraged material and your swatch into a saucepan or large jar. Cover with water and simmer gently until colour appears — usually one to two hours. Leave overnight for deeper colour. Watch for colour to appear as two dots.',
  },
  {
    heading: 'Step Four — Rinse and Dry',
    body: 'Remove the swatch from the dye bath. Rinse gently in cool water until the water runs clear. Lay flat or hang to dry away from direct sunlight.',
  },
  {
    heading: 'Step Five — Return',
    body: 'Once dry, complete your record card. Return the swatch and record card in the postage-paid envelope. Pop it in any postbox. Thank you for contributing to Postcode Colour.',
  },
]

function Dot() {
  return (
    <span
      aria-hidden
      className="shrink-0 self-start mt-[0.35em]"
      style={{
        display: 'block',
        width: 8,
        height: 8,
        borderRadius: '9999px',
        border: '1px solid #181816',
        background: 'transparent',
      }}
    />
  )
}

export default function DyeingGuidePage() {
  return (
    <div className="min-h-screen bg-white font-sans text-ink">
      <Nav />

      <main className="px-4 sm:px-[14mm] pt-12 sm:pt-14 pb-20 sm:pb-24 max-w-2xl">
        <h1 className="text-xs font-light tracking-widest uppercase text-secondary">
          Dyeing Guide
        </h1>
        <div className="border-t border-rule mt-4 mb-3" />
        <p className="text-sm font-light text-secondary mb-12">
          A simple guide to dyeing your Postcode Colour swatch.
        </p>

        {/* What You Need */}
        <section className="mb-12">
          <h2 className="text-xs font-light tracking-widest uppercase text-secondary mb-4">
            What You Need
          </h2>
          <div className="border-t border-rule mb-6" />
          <p className="text-sm font-light text-ink leading-relaxed">
            A saucepan or large jar, water, your foraged plant material and your fabric swatch.
          </p>
        </section>

        {/* Steps */}
        {STEPS.map(({ heading, body }) => (
          <section key={heading} className="mb-10">
            <h2 className="text-xs font-light tracking-widest uppercase text-secondary mb-4">
              {heading}
            </h2>
            <div className="border-t border-rule mb-6" />
            <p className="text-sm font-light text-ink leading-relaxed">{body}</p>
          </section>
        ))}

        {/* Tips */}
        <section className="mb-10 mt-4">
          <h2 className="text-xs font-light tracking-widest uppercase text-secondary mb-4">
            Tips
          </h2>
          <div className="border-t border-rule mb-6" />
          <ul className="space-y-3">
            {TIPS.map((tip, i) => (
              <li key={i} className="flex gap-4 text-sm font-light text-ink leading-relaxed">
                <Dot />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Troubleshooting */}
        <section className="mb-10">
          <h2 className="text-xs font-light tracking-widest uppercase text-secondary mb-4">
            Troubleshooting
          </h2>
          <div className="border-t border-rule mb-6" />
          <ul className="space-y-3">
            {TROUBLESHOOTING.map((item, i) => (
              <li key={i} className="flex gap-4 text-sm font-light text-ink leading-relaxed">
                <Dot />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  )
}
