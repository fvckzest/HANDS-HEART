import { Link } from 'react-router-dom'

import { ContactForm } from '../../features/contact'

import { placeholderProducts, placeholderValues, type PlaceholderProduct } from './homeContent'

const heartHandsArtwork = new URL('../../../assets/brand/heart-hands.svg', import.meta.url).href

function Arrow() {
  return <span aria-hidden="true">→</span>
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex w-fit rounded-full border-2 border-[#10151b] bg-[#fff9ed] px-4 py-2 font-['Arial_Rounded_MT_Bold','Trebuchet_MS',sans-serif] text-xs font-black uppercase tracking-wide">
      {children}
    </span>
  )
}

function DecorativeLine({ className = '' }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={`pointer-events-none absolute ${className}`} fill="none" viewBox="0 0 320 80">
      <path d="M2 57C66 5 116 86 171 43c48-37 91-35 147-2" stroke="#10151b" strokeWidth="3" />
      <circle cx="38" cy="32" fill="#ff6b2c" r="9" />
      <circle cx="265" cy="32" fill="#1c64d8" r="8" />
    </svg>
  )
}

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden pb-14 pt-4 sm:pb-20 sm:pt-10">
      <div className="absolute -left-20 top-12 -z-10 h-48 w-48 rounded-full bg-[#f9a3bd] sm:h-64 sm:w-64" />
      <div className="absolute right-0 top-0 -z-10 h-28 w-28 rounded-bl-[5rem] bg-[#1c64d8] sm:h-44 sm:w-44" />
      <div className="absolute bottom-5 left-6 -z-10 h-20 w-20 rounded-t-full bg-[#ffca35]" />
      <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
        <div className="relative z-10 max-w-xl px-3 sm:px-8 lg:px-10">
          <SectionEyebrow>Placeholder copy · Home</SectionEyebrow>
          <h1 className="mt-5 font-['Arial_Rounded_MT_Bold','Trebuchet_MS',sans-serif] text-5xl font-black uppercase leading-[0.88] tracking-[-0.075em] text-[#10151b] sm:text-7xl lg:text-[clamp(4.5rem,7.5vw,7rem)]">
            Made to<br />connect<span className="text-[#ff6391]">.</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-7 text-[#10151b] sm:text-lg">
            [Placeholder homepage introduction — replace with approved Hands Heart copy before launch.]
          </p>
          <Link className="mt-7 inline-flex items-center gap-4 rounded-full border-2 border-[#10151b] bg-[#10151b] py-2 pl-6 pr-2 font-['Arial_Rounded_MT_Bold','Trebuchet_MS',sans-serif] text-sm font-black uppercase tracking-wide text-[#fff9ed] shadow-[3px_3px_0_#10151b] transition-transform hover:-translate-y-0.5" to="/shop">
            Shop collection <span className="grid h-10 w-10 place-items-center rounded-full bg-[#ffca35] text-2xl text-[#10151b]"><Arrow /></span>
          </Link>
        </div>
        <div className="relative mx-auto w-full max-w-2xl px-1 sm:px-6">
          <div className="absolute -left-1 top-8 h-14 w-14 rounded-full border-2 border-[#10151b] bg-[#ff9ab8] sm:h-20 sm:w-20" />
          <div className="absolute -right-2 bottom-8 h-20 w-20 rounded-full bg-[#ff6b2c] sm:h-28 sm:w-28" />
          <div className="relative overflow-hidden rounded-[3rem] border-[clamp(0.75rem,2vw,1.5rem)] border-[#ffca35] bg-[#fff9ed] p-6 shadow-[5px_5px_0_#10151b] sm:rounded-[4rem] sm:p-10">
            <div className="absolute -bottom-4 left-1/2 h-20 w-36 -translate-x-1/2 rounded-t-full bg-[#ff6b2c] sm:h-28 sm:w-48" />
            <img alt="Hands forming a heart" className="relative z-10 mx-auto block w-full max-w-xl rotate-[-2deg]" src={heartHandsArtwork} />
          </div>
          <div className="absolute -right-1 top-1/2 h-16 w-16 rounded-full border-[0.7rem] border-[#ff9ab8] bg-[#fff9ed] sm:h-24 sm:w-24" />
          <DecorativeLine className="-bottom-12 left-1/2 h-20 w-[80%] -translate-x-1/2" />
        </div>
      </div>
    </section>
  )
}

function PlaceholderProductCard({ product, index }: { product: PlaceholderProduct; index: number }) {
  return (
    <article className="group relative min-w-[14rem] flex-1 snap-start sm:min-w-0">
      <div className={`relative grid aspect-[0.78] place-items-center overflow-hidden rounded-[2.4rem] border-2 border-[#10151b] ${product.color} p-7 shadow-[3px_3px_0_#10151b]`}>
        <div className={`absolute -right-6 top-7 h-20 w-20 rounded-full ${product.accent}`} />
        <div className="absolute bottom-0 left-0 h-14 w-20 rounded-tr-full bg-[#fff9ed]" />
        <div className="relative grid h-[72%] w-[72%] place-items-center rounded-[2rem] border-2 border-[#10151b] bg-[#10151b] p-5 shadow-[4px_4px_0_#fff9ed]">
          <img alt="" aria-hidden="true" className="w-full invert" src={heartHandsArtwork} />
        </div>
        <span className="absolute left-4 top-4 rounded-full border-2 border-[#10151b] bg-[#fff9ed] px-3 py-1 font-mono text-[0.65rem] font-bold uppercase">Placeholder {index + 1}</span>
      </div>
      <div className="relative z-10 -mt-6 mx-3 flex items-center justify-between gap-3 rounded-3xl border-2 border-[#10151b] bg-[#fff9ed] px-4 py-3 shadow-[3px_3px_0_#10151b]">
        <div><h3 className="font-['Arial_Rounded_MT_Bold','Trebuchet_MS',sans-serif] text-sm font-black uppercase tracking-tight">{product.name}</h3><p className="mt-1 text-sm">{product.price}</p></div>
        <Link aria-label={`View ${product.name}`} className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 border-[#10151b] ${product.accent} text-xl font-black transition-transform hover:rotate-[-12deg]`} to="/shop"><Arrow /></Link>
      </div>
    </article>
  )
}

export function FeaturedProductsSection() {
  return (
    <section aria-labelledby="featured-heading" className="relative pb-20 pt-8 sm:pb-28">
      <DecorativeLine className="-top-7 right-0 h-20 w-72 rotate-[3deg]" />
      <div className="mb-8 flex flex-wrap items-end justify-between gap-5"><div><SectionEyebrow>Placeholder collection</SectionEyebrow><h2 className="mt-4 font-['Arial_Rounded_MT_Bold','Trebuchet_MS',sans-serif] text-4xl font-black uppercase leading-none tracking-[-0.065em] sm:text-5xl" id="featured-heading">Made to connect</h2></div><p className="max-w-xs text-sm leading-6 text-[#10151b]">Product records are local placeholders until the Shopify featured collection is connected.</p></div>
      <div className="-mx-1 flex snap-x gap-5 overflow-x-auto px-1 pb-5 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4">{placeholderProducts.map((product, index) => <PlaceholderProductCard index={index} key={product.name} product={product} />)}</div>
      <div className="mt-8 text-center"><Link className="inline-flex items-center gap-4 rounded-full border-2 border-[#10151b] bg-[#10151b] py-2 pl-6 pr-2 font-['Arial_Rounded_MT_Bold','Trebuchet_MS',sans-serif] text-sm font-black uppercase text-[#fff9ed] shadow-[3px_3px_0_#10151b]" to="/shop">View placeholder shop <span className="grid h-9 w-9 place-items-center rounded-full bg-[#ffca35] text-xl text-[#10151b]"><Arrow /></span></Link></div>
    </section>
  )
}

export function StorySection() {
  return (
    <section aria-labelledby="story-heading" className="relative pb-20 sm:pb-28">
      <div className="relative isolate grid overflow-hidden rounded-[2.5rem] border-2 border-[#10151b] bg-[#f9a3bd] p-6 shadow-[4px_4px_0_#10151b] sm:rounded-[4rem] sm:p-10 lg:grid-cols-[0.88fr_1.12fr] lg:p-14">
        <div className="absolute -left-20 bottom-0 -z-10 h-48 w-48 rounded-tr-full bg-[#1c64d8]" />
        <div className="relative z-10 max-w-md"><SectionEyebrow>Placeholder story</SectionEyebrow><h2 className="mt-5 font-['Arial_Rounded_MT_Bold','Trebuchet_MS',sans-serif] text-4xl font-black leading-[0.95] tracking-[-0.065em] sm:text-6xl" id="story-heading">A small gesture, made meaningful together.</h2><p className="mt-6 text-base leading-7 sm:text-lg">[Placeholder about copy — replace with the approved Hands Heart story, values, and community information before launch.]</p><a className="mt-7 inline-flex items-center gap-3 rounded-full border-2 border-[#10151b] bg-[#fff9ed] px-5 py-3 font-['Arial_Rounded_MT_Bold','Trebuchet_MS',sans-serif] text-sm font-black uppercase shadow-[3px_3px_0_#10151b]" href="#contact">Contact us <Arrow /></a></div>
        <div className="relative mt-10 min-h-64 lg:mt-0"><div className="absolute right-0 top-0 h-full w-[88%] rounded-[2.5rem] border-2 border-[#10151b] bg-[#fff9ed] shadow-[4px_4px_0_#10151b]" /><div className="absolute left-0 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-[#ff6b2c]" /><img alt="Hands forming a heart" className="absolute bottom-0 right-4 z-10 w-[92%] max-w-lg" src={heartHandsArtwork} /><div className="absolute right-5 top-5 z-20 flex gap-2"><span className="h-3 w-3 rounded-full bg-[#10151b]" /><span className="h-3 w-3 rounded-full bg-[#10151b]" /><span className="h-3 w-3 rounded-full bg-[#10151b]" /></div></div>
      </div>
      <div className="relative z-10 mx-auto -mt-4 grid max-w-5xl gap-4 px-2 sm:grid-cols-3 sm:px-8">{placeholderValues.map((value) => <article className={`rounded-[2rem] border-2 border-[#10151b] ${value.color} p-6 shadow-[3px_3px_0_#10151b]`} key={value.title}><span className="grid h-12 w-12 place-items-center rounded-full border-2 border-[#10151b] bg-[#fff9ed] text-2xl">{value.symbol}</span><h3 className="mt-6 font-['Arial_Rounded_MT_Bold','Trebuchet_MS',sans-serif] text-lg font-black uppercase tracking-tight">{value.title}</h3><p className="mt-2 text-sm leading-6">{value.copy}</p></article>)}</div>
    </section>
  )
}

export function ShopPreviewSection() {
  return (
    <section className="relative pb-20 sm:pb-28"><div className="relative overflow-hidden rounded-[2.5rem] border-2 border-[#10151b] bg-[#ffca35] p-7 shadow-[4px_4px_0_#10151b] sm:rounded-[4rem] sm:p-12"><div className="absolute -right-12 -top-14 h-48 w-48 rounded-full border-2 border-[#10151b] bg-[#1c64d8]" /><div className="absolute -bottom-10 right-[12%] h-32 w-32 rounded-t-full bg-[#ff6b2c]" /><div className="relative z-10 grid items-center gap-8 md:grid-cols-[1fr_auto]"><div className="max-w-2xl"><SectionEyebrow>Placeholder catalog</SectionEyebrow><h2 className="mt-5 max-w-xl font-['Arial_Rounded_MT_Bold','Trebuchet_MS',sans-serif] text-4xl font-black uppercase leading-[0.9] tracking-[-0.065em] sm:text-6xl">Carry the gesture forward.</h2><p className="mt-5 max-w-xl text-base leading-7 sm:text-lg">[Placeholder shop invitation — final product names, imagery, and prices will be supplied through Shopify.]</p></div><div className="relative min-h-44 w-full max-w-sm"><img alt="Hands forming a heart" className="absolute bottom-[-3.5rem] right-0 w-full rotate-[4deg]" src={heartHandsArtwork} /></div></div><Link className="relative z-20 mt-4 inline-flex items-center gap-4 rounded-full border-2 border-[#10151b] bg-[#10151b] py-2 pl-6 pr-2 font-['Arial_Rounded_MT_Bold','Trebuchet_MS',sans-serif] text-sm font-black uppercase text-[#fff9ed] shadow-[3px_3px_0_#10151b]" to="/shop">Explore shop <span className="grid h-10 w-10 place-items-center rounded-full bg-[#ffca35] text-2xl text-[#10151b]"><Arrow /></span></Link></div></section>
  )
}

export function ContactPlacementSection() {
  return <ContactForm />
}
