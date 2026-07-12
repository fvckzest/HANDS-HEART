import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export interface ProductCardProps {
  title: string
  displayPrice: string
  visual: ReactNode
  to?: string
  action?: ReactNode
  actionLabel?: string
  className?: string
  theme?: ProductCardTheme
}

export interface ProductCardTheme {
  cardColor: string
  visualColor: string
  detailsColor: string
  actionColor: string
  actionTextColor?: string
}

export function ProductCard({
  title,
  displayPrice,
  visual,
  to,
  action,
  actionLabel = 'View product',
  className,
  theme,
}: ProductCardProps) {
  const cardClassName = [
    'group block overflow-hidden rounded-[2rem] border-2 border-[var(--color-ink)] bg-[var(--color-pink)] p-3 text-[var(--color-ink)] no-underline shadow-[3px_3px_0_var(--color-ink)] transition duration-150 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_var(--color-ink)]',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      <div
        className="grid min-h-64 place-items-center overflow-hidden rounded-[1.45rem] bg-[var(--color-cream)] p-5"
        style={theme ? { backgroundColor: theme.visualColor } : undefined}
      >
        {visual}
      </div>
      <div
        className="mt-3 flex items-center gap-3 rounded-[1.3rem] border-2 border-[var(--color-ink)] bg-[var(--color-cream)] px-4 py-3"
        style={theme ? { backgroundColor: theme.detailsColor } : undefined}
      >
        <div className="min-w-0 flex-1">
          <p className="truncate font-black uppercase tracking-wide">{title}</p>
          <p className="mt-1 font-bold">{displayPrice}</p>
        </div>
        {action ?? (
          <span
            className="grid size-9 shrink-0 place-items-center rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-yellow)] text-xl leading-none"
            aria-hidden="true"
            style={
              theme
                ? {
                    backgroundColor: theme.actionColor,
                    color: theme.actionTextColor,
                  }
                : undefined
            }
          >
            →
          </span>
        )}
      </div>
    </>
  )

  if (to) {
    return (
      <Link
        aria-label={`${actionLabel}: ${title}`}
        className={cardClassName}
        style={theme ? { backgroundColor: theme.cardColor } : undefined}
        to={to}
      >
        {content}
      </Link>
    )
  }

  return (
    <article className={cardClassName} style={theme ? { backgroundColor: theme.cardColor } : undefined}>
      {content}
    </article>
  )
}
