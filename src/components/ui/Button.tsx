import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonTone = 'dark' | 'cream' | 'yellow' | 'pink' | 'blue'

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  tone?: ButtonTone
  trailingIcon?: ReactNode
}

const toneClasses: Record<ButtonTone, string> = {
  dark: 'bg-[var(--color-ink)] text-[var(--color-cream)] hover:bg-[var(--color-ink-soft)]',
  cream: 'bg-[var(--color-cream)] text-[var(--color-ink)] hover:bg-[var(--color-cream-warm)]',
  yellow: 'bg-[var(--color-yellow)] text-[var(--color-ink)] hover:bg-[var(--color-yellow-light)]',
  pink: 'bg-[var(--color-pink)] text-[var(--color-ink)] hover:bg-[var(--color-pink-light)]',
  blue: 'bg-[var(--color-blue)] text-[var(--color-white)] hover:bg-[var(--color-blue-light)]',
}

export function Button({
  children,
  className,
  tone = 'dark',
  trailingIcon,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={[
        'inline-flex min-h-11 items-center justify-center gap-3 rounded-full border-2 border-[var(--color-ink)] px-5 py-2.5 font-black uppercase tracking-wide shadow-[2px_2px_0_var(--color-ink)] transition duration-150 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none disabled:cursor-not-allowed disabled:opacity-55',
        toneClasses[tone],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      type={type}
    >
      <span>{children}</span>
      {trailingIcon ? <span aria-hidden="true">{trailingIcon}</span> : null}
    </button>
  )
}
