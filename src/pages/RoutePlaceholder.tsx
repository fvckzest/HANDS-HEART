import type { ReactNode } from 'react'

interface RoutePlaceholderProps {
  eyebrow: string
  title: string
  children: ReactNode
  accent: 'blue' | 'pink' | 'yellow' | 'lavender'
}

export function RoutePlaceholder({
  eyebrow,
  title,
  children,
  accent,
}: RoutePlaceholderProps) {
  return (
    <section className={`route-placeholder route-placeholder--${accent}`}>
      <div className="route-placeholder__dots" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <p className="route-placeholder__eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <div className="route-placeholder__copy">{children}</div>
    </section>
  )
}
