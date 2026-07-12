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
}

export function ProductCard({
  title,
  displayPrice,
  visual,
  to,
  action,
  actionLabel = 'View product',
  className,
}: ProductCardProps) {
  const cardClassName = [
    'group block overflow-hidden rounded-[2rem] border-2 border-[#10151b] bg-[#f9a3bd] p-3 text-[#10151b] no-underline shadow-[3px_3px_0_#10151b] transition duration-150 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#10151b]',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      <div className="grid min-h-64 place-items-center overflow-hidden rounded-[1.45rem] bg-[#fff9ed] p-5">
        {visual}
      </div>
      <div className="mt-3 flex items-center gap-3 rounded-[1.3rem] border-2 border-[#10151b] bg-[#fff9ed] px-4 py-3">
        <div className="min-w-0 flex-1">
          <p className="truncate font-black uppercase tracking-wide">{title}</p>
          <p className="mt-1 font-bold">{displayPrice}</p>
        </div>
        {action ?? (
          <span
            className="grid size-9 shrink-0 place-items-center rounded-full border-2 border-[#10151b] bg-[#ffca35] text-xl leading-none"
            aria-hidden="true"
          >
            →
          </span>
        )}
      </div>
    </>
  )

  if (to) {
    return (
      <Link aria-label={`${actionLabel}: ${title}`} className={cardClassName} to={to}>
        {content}
      </Link>
    )
  }

  return <article className={cardClassName}>{content}</article>
}
