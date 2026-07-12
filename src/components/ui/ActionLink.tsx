import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'

type ActionLinkTone = 'dark' | 'cream' | 'yellow' | 'pink' | 'blue'

interface ActionLinkSharedProps {
  children: ReactNode
  className?: string
  tone?: ActionLinkTone
  trailingIcon?: ReactNode
}

export interface ActionLinkProps
  extends ActionLinkSharedProps,
    Omit<LinkProps, 'className' | 'children'> {}

export interface ExternalActionLinkProps
  extends ActionLinkSharedProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'> {
  href: string
}

const toneClasses: Record<ActionLinkTone, string> = {
  dark: 'bg-[var(--color-ink)] text-[var(--color-cream)] hover:bg-[var(--color-ink-soft)]',
  cream: 'bg-[var(--color-cream)] text-[var(--color-ink)] hover:bg-[var(--color-cream-warm)]',
  yellow: 'bg-[var(--color-yellow)] text-[var(--color-ink)] hover:bg-[var(--color-yellow-light)]',
  pink: 'bg-[var(--color-pink)] text-[var(--color-ink)] hover:bg-[var(--color-pink-light)]',
  blue: 'bg-[var(--color-blue)] text-[var(--color-white)] hover:bg-[var(--color-blue-light)]',
}

function actionLinkClassName(tone: ActionLinkTone, className?: string) {
  return [
    'inline-flex min-h-11 items-center justify-center gap-3 rounded-full border-2 border-[var(--color-ink)] px-5 py-2.5 font-black uppercase tracking-wide no-underline shadow-[2px_2px_0_var(--color-ink)] transition duration-150 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none',
    toneClasses[tone],
    className,
  ]
    .filter(Boolean)
    .join(' ')
}

function ActionLinkContent({
  children,
  trailingIcon,
}: Pick<ActionLinkSharedProps, 'children' | 'trailingIcon'>) {
  return (
    <>
      <span>{children}</span>
      {trailingIcon ? <span aria-hidden="true">{trailingIcon}</span> : null}
    </>
  )
}

export function ActionLink({
  children,
  className,
  tone = 'dark',
  trailingIcon,
  ...props
}: ActionLinkProps) {
  return (
    <Link {...props} className={actionLinkClassName(tone, className)}>
      <ActionLinkContent trailingIcon={trailingIcon}>{children}</ActionLinkContent>
    </Link>
  )
}

export function ExternalActionLink({
  children,
  className,
  tone = 'dark',
  trailingIcon,
  ...props
}: ExternalActionLinkProps) {
  return (
    <a {...props} className={actionLinkClassName(tone, className)}>
      <ActionLinkContent trailingIcon={trailingIcon}>{children}</ActionLinkContent>
    </a>
  )
}
