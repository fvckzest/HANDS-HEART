import type { ReactNode } from 'react'

import { Button } from './Button'

interface StateProps {
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

export function LoadingState({
  title = 'Loading',
  description = 'Just a moment while we get things ready.',
  className,
}: Omit<StateProps, 'action'>) {
  return (
    <div
      aria-live="polite"
      className={[
        'rounded-[2rem] border-2 border-[var(--color-ink)] bg-[var(--color-sky)] p-6 text-[var(--color-ink)] shadow-[3px_3px_0_var(--color-ink)]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      role="status"
    >
      <span className="mb-4 flex gap-1.5" aria-hidden="true">
        <span className="size-3 animate-bounce rounded-full bg-[var(--color-ink)] [animation-delay:-0.25s]" />
        <span className="size-3 animate-bounce rounded-full bg-[var(--color-ink)] [animation-delay:-0.125s]" />
        <span className="size-3 animate-bounce rounded-full bg-[var(--color-ink)]" />
      </span>
      <p className="font-black uppercase tracking-wide">{title}</p>
      {description ? <p className="mt-2 max-w-prose">{description}</p> : null}
    </div>
  )
}

export function EmptyState({ title, description, action, className }: StateProps) {
  return (
    <section
      className={[
        'rounded-[2rem] border-2 border-[var(--color-ink)] bg-[var(--color-lavender)] p-6 text-[var(--color-ink)] shadow-[3px_3px_0_var(--color-ink)]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span
        className="mb-4 grid size-12 place-items-center rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-cream)] text-2xl"
        aria-hidden="true"
      >
        ♥
      </span>
      <h2 className="font-black uppercase tracking-wide">{title}</h2>
      {description ? <p className="mt-2 max-w-prose">{description}</p> : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </section>
  )
}

export interface ErrorStateProps extends Omit<StateProps, 'action'> {
  onRetry?: () => void
  retryLabel?: string
}

export function ErrorState({
  title,
  description,
  onRetry,
  retryLabel = 'Try again',
  className,
}: ErrorStateProps) {
  return (
    <section
      aria-live="assertive"
      className={[
        'rounded-[2rem] border-2 border-[var(--color-ink)] bg-[var(--color-pink)] p-6 text-[var(--color-ink)] shadow-[3px_3px_0_var(--color-ink)]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      role="alert"
    >
      <span
        className="mb-4 grid size-12 place-items-center rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-cream)] text-2xl"
        aria-hidden="true"
      >
        !
      </span>
      <h2 className="font-black uppercase tracking-wide">{title}</h2>
      {description ? <p className="mt-2 max-w-prose">{description}</p> : null}
      {onRetry ? (
        <div className="mt-5">
          <Button onClick={onRetry} tone="cream">
            {retryLabel}
          </Button>
        </div>
      ) : null}
    </section>
  )
}
