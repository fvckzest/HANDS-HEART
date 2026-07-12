import { useLayoutEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import './SectionDecorations.css'

interface SectionBounds {
  height: number
  top: number
  variant: SectionVariant
}

type SectionVariant = 'featured' | 'story' | 'shop' | 'contact'

const sectionVariants: SectionVariant[] = ['featured', 'story', 'shop', 'contact']

function DotField() {
  return (
    <svg className="section-decor__dots" viewBox="0 0 88 70">
      {Array.from({ length: 20 }, (_, index) => (
        <circle
          cx={8 + (index % 5) * 17}
          cy={8 + Math.floor(index / 5) * 17}
          fill="var(--color-ink)"
          key={index}
          r="3.25"
        />
      ))}
    </svg>
  )
}

function Rays() {
  return (
    <svg className="section-decor__rays" fill="none" viewBox="0 0 90 70">
      <path d="M45 27V3M29 31 18 10M60 31l12-20M21 44 1 35M69 44l20-9" />
    </svg>
  )
}

function SectionComposition({ bounds }: { bounds: SectionBounds }) {
  return (
    <div
      className={`section-decor__composition section-decor__composition--${bounds.variant}`}
      style={{ height: bounds.height, top: bounds.top }}
    >
      <span className="section-decor__disc section-decor__disc--primary" />
      <span className="section-decor__disc section-decor__disc--secondary" />
      <span className="section-decor__ring" />
      <span className="section-decor__arch section-decor__arch--outer" />
      <span className="section-decor__arch section-decor__arch--inner" />
      <span className="section-decor__scallop" />
      <DotField />
      <Rays />
    </div>
  )
}

export function SectionDecorations() {
  const { pathname } = useLocation()
  const [sections, setSections] = useState<SectionBounds[]>([])

  useLayoutEffect(() => {
    const main = document.querySelector<HTMLElement>('#main-content')

    if (!main || pathname !== '/') {
      setSections([])
      return
    }

    const contentSections = Array.from(main.children).filter(
      (child): child is HTMLElement => child instanceof HTMLElement && child.tagName === 'SECTION',
    )
    const measuredSections = contentSections.slice(1, sectionVariants.length + 1)

    function measure() {
      setSections(
        measuredSections.map((section, index) => ({
          height: section.offsetHeight,
          top: section.offsetTop,
          variant: sectionVariants[index],
        })),
      )
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(main)
    measuredSections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [pathname])

  if (sections.length === 0) return null

  return (
    <div aria-hidden="true" className="section-decor">
      {sections.map((bounds) => (
        <SectionComposition bounds={bounds} key={bounds.variant} />
      ))}
    </div>
  )
}
