import { useLocation } from 'react-router-dom'

function DotField({ className }: { className: string }) {
  return (
    <svg className={`background-decor__dots ${className}`} viewBox="0 0 88 70">
      {Array.from({ length: 20 }, (_, index) => (
        <circle
          cx={8 + (index % 5) * 17}
          cy={8 + Math.floor(index / 5) * 17}
          fill="#10151b"
          key={index}
          r="3.25"
        />
      ))}
    </svg>
  )
}

function Rays({ className }: { className: string }) {
  return (
    <svg className={`background-decor__rays ${className}`} fill="none" viewBox="0 0 90 70">
      <path d="M45 27V3M29 31 18 10M60 31l12-20M21 44 1 35M69 44l20-9" />
    </svg>
  )
}

function routeName(pathname: string) {
  if (pathname.startsWith('/shop')) return 'shop'
  if (pathname.startsWith('/about')) return 'about'
  if (pathname.startsWith('/products')) return 'product'
  if (pathname.startsWith('/cart')) return 'cart'
  return 'home'
}

export function BackgroundDecor() {
  const { pathname } = useLocation()

  return (
    <div
      aria-hidden="true"
      className={`background-decor background-decor--${routeName(pathname)}`}
    >
      <div className="background-decor__shape background-decor__shape--top-left" />
      <div className="background-decor__shape background-decor__shape--top-right" />
      <div className="background-decor__shape background-decor__shape--rail-left" />
      <div className="background-decor__shape background-decor__shape--rail-right" />

      <div className="background-decor__cluster background-decor__cluster--hero-left-medallion">
        <span className="background-decor__semicircle" />
        <span className="background-decor__disc background-decor__disc--blue" />
        <span className="background-decor__ring" />
      </div>
      <div className="background-decor__cluster background-decor__cluster--upper-right-arches">
        <span className="background-decor__arch background-decor__arch--orange" />
        <span className="background-decor__arch background-decor__arch--blue" />
        <span className="background-decor__disc background-decor__disc--lavender" />
      </div>
      <div className="background-decor__cluster background-decor__cluster--mid-left-scallop">
        <span className="background-decor__scallop" />
        <span className="background-decor__disc background-decor__disc--yellow" />
        <span className="background-decor__ring background-decor__ring--small" />
      </div>
      <div className="background-decor__cluster background-decor__cluster--mid-right-arches">
        <span className="background-decor__arch background-decor__arch--pink" />
        <span className="background-decor__arch background-decor__arch--yellow" />
        <span className="background-decor__disc background-decor__disc--orange" />
      </div>
      <div className="background-decor__cluster background-decor__cluster--lower-left-quarter">
        <span className="background-decor__quarter" />
        <span className="background-decor__disc background-decor__disc--blue" />
        <span className="background-decor__disc background-decor__disc--pink" />
      </div>
      <div className="background-decor__cluster background-decor__cluster--footer-right-arches">
        <span className="background-decor__arch background-decor__arch--lavender" />
        <span className="background-decor__arch background-decor__arch--blue" />
        <span className="background-decor__ring background-decor__ring--yellow" />
      </div>

      <DotField className="background-decor__dots--header-left" />
      <DotField className="background-decor__dots--mid-right" />
      <DotField className="background-decor__dots--footer-right" />
      <Rays className="background-decor__rays--header" />
      <Rays className="background-decor__rays--mid-right" />
      <Rays className="background-decor__rays--footer-left" />
    </div>
  )
}
