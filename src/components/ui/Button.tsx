import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonTone = 'dark' | 'cream' | 'yellow' | 'pink' | 'blue'

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  tone?: ButtonTone
  trailingIcon?: ReactNode
}

const toneClasses: Record<ButtonTone, string> = {
  dark: 'bg-[#10151b] text-[#fff9ed] hover:bg-[#26303a]',
  cream: 'bg-[#fff9ed] text-[#10151b] hover:bg-[#fff1d8]',
  yellow: 'bg-[#ffca35] text-[#10151b] hover:bg-[#ffd866]',
  pink: 'bg-[#f9a3bd] text-[#10151b] hover:bg-[#ffb9cb]',
  blue: 'bg-[#1c64d8] text-white hover:bg-[#2d78ed]',
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
        'inline-flex min-h-11 items-center justify-center gap-3 rounded-full border-2 border-[#10151b] px-5 py-2.5 font-black uppercase tracking-wide shadow-[2px_2px_0_#10151b] transition duration-150 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none disabled:cursor-not-allowed disabled:opacity-55',
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
