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
  dark: 'bg-[#10151b] text-[#fff9ed] hover:bg-[#26303a]',
  cream: 'bg-[#fff9ed] text-[#10151b] hover:bg-[#fff1d8]',
  yellow: 'bg-[#ffca35] text-[#10151b] hover:bg-[#ffd866]',
  pink: 'bg-[#f9a3bd] text-[#10151b] hover:bg-[#ffb9cb]',
  blue: 'bg-[#1c64d8] text-white hover:bg-[#2d78ed]',
}

function actionLinkClassName(tone: ActionLinkTone, className?: string) {
  return [
    'inline-flex min-h-11 items-center justify-center gap-3 rounded-full border-2 border-[#10151b] px-5 py-2.5 font-black uppercase tracking-wide no-underline shadow-[2px_2px_0_#10151b] transition duration-150 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none',
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
