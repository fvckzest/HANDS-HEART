const heartHandsArtwork = new URL(
  '../../../assets/brand/heart-hands.svg',
  import.meta.url,
).href

export function ShopHero() {
  return (
    <section
      aria-labelledby="shop-heading"
      className="relative isolate grid overflow-hidden rounded-[2.75rem] border-2 border-[#10151b] bg-[#fff9ed] p-6 shadow-[5px_5px_0_#10151b] sm:rounded-[4rem] sm:p-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:p-14"
    >
      <div
        aria-hidden="true"
        className="absolute -left-16 top-1/3 -z-10 size-40 rounded-tr-[5rem] bg-[#f9a3bd] sm:size-56"
      />
      <div
        aria-hidden="true"
        className="absolute -right-12 -top-14 -z-10 size-44 rounded-full bg-[#1c64d8] sm:size-60"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-[42%] -z-10 h-16 w-32 rounded-t-full bg-[#ff6b2c] sm:h-24 sm:w-48"
      />

      <div className="relative z-10 max-w-xl">
        <p className="inline-flex rounded-full border-2 border-[#10151b] bg-[#ffca35] px-4 py-2 font-['Arial_Rounded_MT_Bold','Trebuchet_MS',sans-serif] text-xs font-black uppercase tracking-wide">
          The collection
        </p>
        <h1
          className="mt-5 font-['Arial_Rounded_MT_Bold','Trebuchet_MS',sans-serif] text-5xl font-black uppercase leading-[0.88] tracking-[-0.075em] text-[#10151b] sm:text-7xl lg:text-[clamp(4.5rem,7.5vw,6.5rem)]"
          id="shop-heading"
        >
          Shop the collection
        </h1>
        <p className="mt-6 max-w-md text-base leading-7 sm:text-lg">
          [Shop introduction placeholder — replace with approved Hands Heart
          catalog copy before launch.]
        </p>
      </div>

      <div className="relative mt-10 min-h-72 sm:min-h-96 lg:mt-0">
        <div
          aria-hidden="true"
          className="absolute -left-3 top-7 size-16 rounded-full border-2 border-[#10151b] bg-[#ff6b2c] sm:size-20"
        />
        <div className="absolute inset-x-0 bottom-0 top-0 overflow-hidden rounded-[2.5rem] border-[clamp(0.75rem,2vw,1.5rem)] border-[#ffca35] bg-[#fff9ed] p-5 shadow-[4px_4px_0_#10151b] sm:rounded-[3.5rem] sm:p-8">
          <div
            aria-hidden="true"
            className="absolute -bottom-7 left-1/2 h-24 w-44 -translate-x-1/2 rounded-t-full bg-[#ff6b2c]"
          />
          <img
            alt="Hands forming a heart"
            className="relative z-10 h-full w-full object-contain"
            src={heartHandsArtwork}
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute -right-3 top-1/2 size-16 -translate-y-1/2 rounded-full border-[0.65rem] border-[#f9a3bd] bg-[#fff9ed] sm:size-24"
        />
      </div>
    </section>
  )
}
