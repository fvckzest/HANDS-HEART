import { useId, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react'

interface FieldPresentationProps {
  label: string
  helpText?: string
  error?: string
  className?: string
}

export interface TextFieldProps
  extends FieldPresentationProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'id'> {
  id?: string
}

export interface TextAreaFieldProps
  extends FieldPresentationProps,
    Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className' | 'id'> {
  id?: string
}

function FieldMessages({
  descriptionId,
  error,
  errorId,
  helpText,
}: {
  descriptionId: string
  error?: string
  errorId: string
  helpText?: string
}) {
  return (
    <div className="mt-2 text-sm">
      {helpText ? <p id={descriptionId}>{helpText}</p> : null}
      {error ? (
        <p className="mt-1 font-bold text-[#8f193d]" id={errorId} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}

function describedBy(
  descriptionId: string,
  errorId: string,
  error?: string,
  helpText?: string,
) {
  return [helpText ? descriptionId : undefined, error ? errorId : undefined]
    .filter(Boolean)
    .join(' ') || undefined
}

export function TextField({
  className,
  error,
  helpText,
  id: providedId,
  label,
  ...props
}: TextFieldProps) {
  const generatedId = useId()
  const id = providedId ?? generatedId
  const descriptionId = `${id}-description`
  const errorId = `${id}-error`

  return (
    <div className={className}>
      <label className="mb-2 block font-black uppercase tracking-wide" htmlFor={id}>
        {label}
      </label>
      <input
        {...props}
        aria-describedby={describedBy(descriptionId, errorId, error, helpText)}
        aria-invalid={error ? true : undefined}
        className="min-h-11 w-full rounded-full border-2 border-[#10151b] bg-[#fff9ed] px-4 py-2.5 text-[#10151b] placeholder:text-[#59616a]"
        id={id}
      />
      <FieldMessages
        descriptionId={descriptionId}
        error={error}
        errorId={errorId}
        helpText={helpText}
      />
    </div>
  )
}

export function TextAreaField({
  className,
  error,
  helpText,
  id: providedId,
  label,
  rows = 5,
  ...props
}: TextAreaFieldProps) {
  const generatedId = useId()
  const id = providedId ?? generatedId
  const descriptionId = `${id}-description`
  const errorId = `${id}-error`

  return (
    <div className={className}>
      <label className="mb-2 block font-black uppercase tracking-wide" htmlFor={id}>
        {label}
      </label>
      <textarea
        {...props}
        aria-describedby={describedBy(descriptionId, errorId, error, helpText)}
        aria-invalid={error ? true : undefined}
        className="w-full rounded-[1.5rem] border-2 border-[#10151b] bg-[#fff9ed] px-4 py-3 text-[#10151b] placeholder:text-[#59616a]"
        id={id}
        rows={rows}
      />
      <FieldMessages
        descriptionId={descriptionId}
        error={error}
        errorId={errorId}
        helpText={helpText}
      />
    </div>
  )
}
