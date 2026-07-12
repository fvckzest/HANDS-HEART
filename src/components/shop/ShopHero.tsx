import { siteCopy } from '../../content/siteCopy'

const heartHandsArtwork = new URL(
  '../../../assets/brand/heart-hands.svg',
  import.meta.url,
).href

export function ShopHero() {
  return (
    <section aria-labelledby="shop-heading" className="relative isolate pb-14 pt-4 sm:pb-20 sm:pt-10">
      <div aria-hidden="true" className="absolute -left-20 top-12 -z-10 h-48 w-48 rounded-full bg-[var(--color-pink)] sm:h-64 sm:w-64" />
      <div aria-hidden="true" className="absolute right-0 top-0 -z-10 h-28 w-28 rounded-bl-[5rem] bg-[var(--color-blue)] sm:h-44 sm:w-44" />
      <div aria-hidden="true" className="absolute bottom-5 left-6 -z-10 h-20 w-20 rounded-t-full bg-[var(--color-yellow)]" />

      <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
        <div className="order-2 relative z-10 max-w-xl px-3 sm:px-8 lg:order-none lg:px-10">
          <p className="inline-flex rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-cream)] px-4 py-2 font-['Arial_Rounded_MT_Bold','Trebuchet_MS',sans-serif] text-xs font-black uppercase tracking-wide">
            The collection
          </p>
          <h1
            className="mt-5 font-['Arial_Rounded_MT_Bold','Trebuchet_MS',sans-serif] text-5xl font-black uppercase leading-[0.88] tracking-[-0.075em] text-[var(--color-ink)] sm:text-7xl lg:text-[clamp(4.5rem,7.5vw,6.5rem)]"
            id="shop-heading"
          >
            Shop the collection
          </h1>
          <p className="mt-6 max-w-md text-base leading-7 sm:text-lg">
            {siteCopy.shop.heroDescription}
          </p>
        </div>

        <div className="order-1 relative mx-auto w-3/4 max-w-2xl px-1 sm:w-full sm:px-6 lg:order-none">
          <div aria-hidden="true" className="absolute -left-1 top-8 h-14 w-14 rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-pink-bright)] sm:h-20 sm:w-20" />
          <div aria-hidden="true" className="absolute -right-2 bottom-8 h-20 w-20 rounded-full bg-[var(--color-orange)] sm:h-28 sm:w-28" />
          <div className="relative aspect-[1.15] rounded-[3rem] border-[clamp(0.75rem,2vw,1.5rem)] border-[var(--color-yellow)] bg-[var(--color-cream)] shadow-[5px_5px_0_var(--color-ink)] sm:aspect-[1.25] sm:rounded-[4rem]">
            <img alt="Hands forming a heart" className="absolute left-[47%] top-5 z-10 block w-[180%] max-w-none -translate-x-1/2 rotate-[-2deg] sm:top-8" src={heartHandsArtwork} />
          </div>
          <div aria-hidden="true" className="absolute -right-1 top-1/2 h-16 w-16 rounded-full border-[0.7rem] border-[var(--color-pink-bright)] bg-[var(--color-cream)] sm:h-24 sm:w-24" />
        </div>
      </div>
    </section>
  )
}
