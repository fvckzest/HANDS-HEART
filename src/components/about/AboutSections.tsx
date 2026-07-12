import { Link } from 'react-router-dom'

const heartHandsArtwork = new URL(
  '../../../assets/brand/heart-hands.svg',
  import.meta.url,
).href

const values = [
  {
    title: 'Meaningful by design',
    copy: '[Placeholder principle: explain the intention behind each Hands Heart piece.]',
    color: 'bg-[#c9b4ec]',
    symbol: '✦',
  },
  {
    title: 'Made mindfully',
    copy: '[Placeholder principle: add approved sourcing and making details here.]',
    color: 'bg-[#9fd6f5]',
    symbol: '◌',
  },
  {
    title: 'Better together',
    copy: '[Placeholder principle: describe the approved community commitment here.]',
    color: 'bg-[#ff9ab8]',
    symbol: '♥',
  },
]

const detailPoints = [
  'Thoughtful materials and approved production details.',
  'Objects meant to be shared, kept, and remembered.',
  'A simple symbol that creates a moment of connection.',
]

function Arrow() {
  return <span aria-hidden="true">→</span>
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex w-fit rounded-full border-2 border-[#10151b] bg-[#fff9ed] px-4 py-2 font-['Arial_Rounded_MT_Bold','Trebuchet_MS',sans-serif] text-[0.7rem] font-black uppercase tracking-[0.1em]">
      {children}
    </span>
  )
}

function HeartArtwork({ className = '' }: { className?: string }) {
  return (
    <img
      alt="Hands forming a heart"
      className={className}
      src={heartHandsArtwork}
    />
  )
}

export function AboutHero() {
  return (
    <section className="relative isolate overflow-hidden pb-16 pt-2 sm:pb-24 sm:pt-8">
      <span
        aria-hidden="true"
        className="absolute -left-20 top-16 -z-10 h-48 w-48 rounded-full bg-[#1c64d8] sm:h-64 sm:w-64"
      />
      <span
        aria-hidden="true"
        className="absolute -right-14 top-0 -z-10 h-44 w-44 rounded-[3rem] bg-[#ff9ab8]"
      />
      <span
        aria-hidden="true"
        className="absolute bottom-8 left-0 -z-10 h-28 w-20 rounded-tr-[3rem] bg-[#ffca35]"
      />
      <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
        <div className="relative z-10 max-w-xl px-3 sm:px-8 lg:px-10">
          <Eyebrow>Placeholder copy · Our Story</Eyebrow>
          <h1 className="mt-5 font-['Arial_Rounded_MT_Bold','Trebuchet_MS',sans-serif] text-5xl font-black uppercase leading-[0.88] tracking-[-0.075em] sm:text-7xl lg:text-[clamp(4.2rem,7vw,6.7rem)]">
            A simple gesture, made meaningful together<span className="text-[#ff6391]">.</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-7 sm:text-lg">
            [Placeholder brand introduction — replace with approved Hands Heart
            story copy before launch.]
          </p>
          <Link
            className="mt-7 inline-flex items-center gap-4 rounded-full border-2 border-[#10151b] bg-[#10151b] py-2 pl-6 pr-2 font-['Arial_Rounded_MT_Bold','Trebuchet_MS',sans-serif] text-sm font-black uppercase tracking-wide text-[#fff9ed] shadow-[3px_3px_0_#10151b] transition-transform hover:-translate-y-0.5"
            to="/shop"
          >
            Shop the collection{' '}
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#ffca35] text-2xl text-[#10151b]">
              <Arrow />
            </span>
          </Link>
        </div>

        <div className="relative mx-auto w-full max-w-2xl px-1 sm:px-6">
          <span
            aria-hidden="true"
            className="absolute -left-1 top-8 h-16 w-16 rounded-full border-2 border-[#10151b] bg-[#ff9ab8] sm:h-20 sm:w-20"
          />
          <span
            aria-hidden="true"
            className="absolute -right-2 bottom-8 h-20 w-20 rounded-full bg-[#ff6b2c] sm:h-28 sm:w-28"
          />
          <div className="relative overflow-hidden rounded-[3rem] border-[clamp(0.75rem,2vw,1.5rem)] border-[#ffca35] bg-[#fff9ed] p-6 shadow-[5px_5px_0_#10151b] sm:rounded-[4rem] sm:p-10">
            <span
              aria-hidden="true"
              className="absolute -bottom-4 left-1/2 h-20 w-36 -translate-x-1/2 rounded-t-full bg-[#ff6b2c] sm:h-28 sm:w-48"
            />
            <HeartArtwork className="relative z-10 mx-auto block w-full max-w-xl rotate-[-2deg]" />
          </div>
          <span
            aria-hidden="true"
            className="absolute -right-1 top-1/2 h-16 w-16 rounded-full border-[0.7rem] border-[#ff9ab8] bg-[#fff9ed] sm:h-24 sm:w-24"
          />
        </div>
      </div>
    </section>
  )
}

export function OriginStorySection() {
  return (
    <section aria-labelledby="how-it-started" className="relative pb-16 sm:pb-24">
      <div className="relative isolate grid overflow-hidden rounded-[2.5rem] border-2 border-[#10151b] bg-[#fff9ed] shadow-[4px_4px_0_#10151b] md:grid-cols-[0.9fr_1.1fr]">
        <div className="relative p-7 sm:p-10 lg:p-12">
          <Eyebrow>Placeholder story</Eyebrow>
          <h2
            className="mt-5 font-['Arial_Rounded_MT_Bold','Trebuchet_MS',sans-serif] text-4xl font-black uppercase leading-[0.92] tracking-[-0.065em] sm:text-5xl"
            id="how-it-started"
          >
            How it started<span className="text-[#ff6391]">.</span>
          </h2>
          <p className="mt-5 max-w-md leading-7">
            [Placeholder origin story — add the approved beginning, people, and
            inspiration behind Hands Heart before launch.]
          </p>
        </div>
        <div className="relative min-h-72 overflow-hidden border-t-2 border-[#10151b] bg-[#f4ead8] p-8 md:border-l-2 md:border-t-0 sm:p-10">
          <span
            aria-hidden="true"
            className="absolute -left-8 top-10 h-32 w-32 rounded-full bg-[#ff9ab8]"
          />
          <span
            aria-hidden="true"
            className="absolute bottom-0 right-0 h-36 w-40 rounded-tl-[4rem] bg-[#c9b4ec]"
          />
          <div className="relative mx-auto grid max-w-sm rotate-[3deg] place-items-center rounded-[2rem] border-2 border-[#10151b] bg-[#fff9ed] p-6 shadow-[4px_4px_0_#10151b]">
            <span className="absolute -right-5 -top-5 grid h-14 w-14 place-items-center rounded-full border-2 border-[#10151b] bg-[#ffca35] text-2xl">
              ✦
            </span>
            <HeartArtwork className="w-full max-w-xs" />
            <span className="mt-3 rounded-full border-2 border-[#10151b] bg-[#fff9ed] px-3 py-1 text-center font-mono text-[0.65rem] font-bold uppercase">
              Placeholder story graphic
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export function PrinciplesSection() {
  return (
    <section aria-labelledby="principles-heading" className="relative pb-16 sm:pb-24">
      <div className="relative overflow-hidden rounded-full border-2 border-[#10151b] bg-[#1c64d8] px-6 py-5 text-center shadow-[3px_3px_0_#10151b] sm:px-10 sm:py-7">
        <span
          aria-hidden="true"
          className="absolute left-6 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-[#ff6b2c]"
        />
        <span
          aria-hidden="true"
          className="absolute right-8 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-[#ff9ab8]"
        />
        <h2
          className="font-['Arial_Rounded_MT_Bold','Trebuchet_MS',sans-serif] text-3xl font-black uppercase tracking-[-0.05em] text-[#fff9ed] sm:text-5xl"
          id="principles-heading"
        >
          Care is in the details <span className="text-[#ff9ab8]">♥</span>
        </h2>
      </div>
      <div className="mt-7 grid gap-5 sm:grid-cols-3">
        {values.map((value) => (
          <article
            className={`rounded-[2rem] border-2 border-[#10151b] ${value.color} p-6 shadow-[3px_3px_0_#10151b] sm:p-7`}
            key={value.title}
          >
            <span className="grid h-14 w-14 place-items-center rounded-full border-2 border-[#10151b] bg-[#fff9ed] text-2xl">
              {value.symbol}
            </span>
            <h3 className="mt-7 font-['Arial_Rounded_MT_Bold','Trebuchet_MS',sans-serif] text-xl font-black uppercase leading-none tracking-[-0.045em]">
              {value.title}
            </h3>
            <p className="mt-3 text-sm leading-6">{value.copy}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export function ConnectionSection() {
  return (
    <section aria-labelledby="connection-heading" className="relative pb-16 sm:pb-24">
      <div className="grid items-center gap-9 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
        <div className="relative isolate min-h-80 overflow-hidden rounded-[2.5rem] border-2 border-[#10151b] bg-[#f4ead8] p-7 shadow-[4px_4px_0_#10151b] sm:min-h-96 sm:p-10">
          <span
            aria-hidden="true"
            className="absolute -left-8 top-9 h-28 w-28 rounded-full bg-[#ff9ab8]"
          />
          <span
            aria-hidden="true"
            className="absolute -right-8 bottom-7 h-40 w-40 rounded-full bg-[#1c64d8]"
          />
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-1/3 h-28 w-28 rounded-t-full bg-[#ff6b2c]"
          />
          <div className="relative z-10 mx-auto grid h-full max-w-sm place-items-center rounded-[2rem] border-2 border-[#10151b] bg-[#10151b] p-8 shadow-[4px_4px_0_#fff9ed]">
            <HeartArtwork className="w-full invert" />
            <span className="mt-4 rounded-full bg-[#fff9ed] px-4 py-2 text-center font-mono text-[0.65rem] font-bold uppercase text-[#10151b]">
              Placeholder graphic composition
            </span>
          </div>
        </div>
        <div className="max-w-xl">
          <Eyebrow>Placeholder details</Eyebrow>
          <h2
            className="mt-5 font-['Arial_Rounded_MT_Bold','Trebuchet_MS',sans-serif] text-4xl font-black uppercase leading-[0.9] tracking-[-0.065em] sm:text-6xl"
            id="connection-heading"
          >
            Made to connect<span className="text-[#ff6391]">.</span>
          </h2>
          <p className="mt-5 leading-7 sm:text-lg">
            [Placeholder detail copy — replace with approved information about
            materials, making, and the meaning behind the collection.]
          </p>
          <ul className="mt-7 space-y-4">
            {detailPoints.map((point, index) => (
              <li className="flex items-start gap-3" key={point}>
                <span
                  aria-hidden="true"
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-[#10151b] bg-[#ffca35] font-black"
                >
                  {index + 1}
                </span>
                <span className="pt-1 text-sm font-medium leading-6">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export function CommunityAndCtaSections() {
  return (
    <section className="relative pb-6">
      <div className="relative isolate overflow-hidden rounded-[2.5rem] border-2 border-[#10151b] bg-[#fff9ed] p-7 shadow-[4px_4px_0_#10151b] sm:p-10 lg:p-12">
        <span
          aria-hidden="true"
          className="absolute -right-5 bottom-0 h-44 w-44 rounded-tl-full bg-[#1c64d8]"
        />
        <span
          aria-hidden="true"
          className="absolute bottom-0 right-28 h-36 w-24 rounded-t-full bg-[#ffca35]"
        />
        <span
          aria-hidden="true"
          className="absolute bottom-0 right-52 h-28 w-20 rounded-t-full bg-[#ff6b2c]"
        />
        <div className="relative z-10 max-w-xl">
          <Eyebrow>Placeholder community note</Eyebrow>
          <h2 className="mt-5 font-['Arial_Rounded_MT_Bold','Trebuchet_MS',sans-serif] text-4xl font-black uppercase leading-[0.9] tracking-[-0.065em] sm:text-5xl">
            A portion for community<span className="text-[#ff6391]">.</span>
          </h2>
          <p className="mt-5 max-w-lg leading-7">
            [Placeholder community commitment — replace with approved program,
            percentage, partner, and eligibility information before launch.]
          </p>
        </div>
      </div>

      <div className="relative mt-7 isolate overflow-hidden rounded-[2.5rem] border-2 border-[#10151b] bg-[#ffca35] p-7 shadow-[4px_4px_0_#10151b] sm:p-10">
        <span
          aria-hidden="true"
          className="absolute -bottom-20 left-1/2 h-44 w-52 -translate-x-1/2 rounded-t-full border-2 border-[#10151b] bg-[#ff9ab8]"
        />
        <div className="relative z-10 grid items-center gap-7 md:grid-cols-[1fr_auto]">
          <div className="max-w-xl">
            <Eyebrow>Placeholder invitation</Eyebrow>
            <h2 className="mt-5 font-['Arial_Rounded_MT_Bold','Trebuchet_MS',sans-serif] text-4xl font-black uppercase leading-[0.9] tracking-[-0.065em] sm:text-5xl">
              Carry the gesture forward<span className="text-[#ff6391]">.</span>
            </h2>
            <p className="mt-4 leading-7">
              [Placeholder closing message — replace with approved launch copy.]
            </p>
          </div>
          <div className="flex flex-col items-stretch gap-3 sm:flex-row md:flex-col">
            <Link
              className="inline-flex items-center justify-center gap-3 rounded-full border-2 border-[#10151b] bg-[#10151b] py-2 pl-5 pr-2 font-['Arial_Rounded_MT_Bold','Trebuchet_MS',sans-serif] text-sm font-black uppercase text-[#fff9ed] shadow-[3px_3px_0_#10151b]"
              to="/shop"
            >
              Shop the collection
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[#ffca35] text-xl text-[#10151b]">
                <Arrow />
              </span>
            </Link>
            <a
              className="inline-flex items-center justify-center gap-3 rounded-full border-2 border-[#10151b] bg-[#fff9ed] py-2 pl-5 pr-2 font-['Arial_Rounded_MT_Bold','Trebuchet_MS',sans-serif] text-sm font-black uppercase shadow-[3px_3px_0_#10151b]"
              href="/#contact"
            >
              Contact us
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[#c9b4ec] text-xl">
                <Arrow />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
