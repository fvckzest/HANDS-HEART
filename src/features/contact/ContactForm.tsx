import { useState, type FormEvent } from 'react'

import { Button } from '../../components/ui/Button'
import { TextAreaField, TextField } from '../../components/ui/FormFields'

import type { ContactSubmission, ContactSubmitHandler } from './types'

export interface ContactFormProps {
  /** Supplied by the configured delivery boundary in T012. */
  onSubmit?: ContactSubmitHandler
}

type ContactFormErrors = Partial<Record<keyof ContactSubmission, string>>
type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'configuration-error' | 'error'

const initialSubmission: ContactSubmission = {
  name: '',
  email: '',
  message: '',
}

function validateSubmission(submission: ContactSubmission): ContactFormErrors {
  const errors: ContactFormErrors = {}

  if (!submission.name.trim()) {
    errors.name = 'Please enter your name.'
  }

  if (!submission.email.trim()) {
    errors.email = 'Please enter your email address.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submission.email)) {
    errors.email = 'Enter an email address in the usual name@example.com format.'
  }

  if (!submission.message.trim()) {
    errors.message = 'Please add a message before sending.'
  }

  return errors
}

function Arrow() {
  return <span className="text-xl leading-none">→</span>
}

/**
 * Presentation and client validation only. A real submission can occur only
 * when a parent injects a configured async handler.
 */
export function ContactForm({ onSubmit }: ContactFormProps) {
  const [submission, setSubmission] = useState<ContactSubmission>(initialSubmission)
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [status, setStatus] = useState<SubmissionStatus>('idle')

  function updateField(field: keyof ContactSubmission, value: string) {
    setSubmission((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
    if (status !== 'idle') {
      setStatus('idle')
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextSubmission = {
      name: submission.name.trim(),
      email: submission.email.trim(),
      message: submission.message.trim(),
    }
    const nextErrors = validateSubmission(nextSubmission)

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setStatus('idle')
      return
    }

    if (!onSubmit) {
      setStatus('configuration-error')
      return
    }

    setStatus('submitting')
    try {
      await onSubmit(nextSubmission)
      setSubmission(initialSubmission)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const statusMessage =
    status === 'configuration-error'
      ? 'Message delivery is not configured yet. Please check back soon.'
      : status === 'error'
        ? 'Your message could not be sent. Please try again in a moment.'
        : status === 'success'
          ? 'Thanks for reaching out. Your message has been received.'
          : undefined

  return (
    <section aria-labelledby="contact-heading" className="relative pb-3" id="contact">
      <div className="relative isolate overflow-hidden rounded-[2.5rem] border-2 border-[#10151b] bg-[#fff9ed] p-5 shadow-[4px_4px_0_#10151b] sm:rounded-[4rem] sm:p-10">
        <div aria-hidden="true" className="absolute -left-14 bottom-0 -z-10 h-40 w-40 rounded-tr-full bg-[#ff6b2c]" />
        <div aria-hidden="true" className="absolute -right-12 top-0 -z-10 h-44 w-44 rounded-full bg-[#f9a3bd]" />
        <div className="grid overflow-hidden rounded-[2rem] border-2 border-[#10151b] bg-[#fff9ed] lg:grid-cols-[1fr_0.92fr] lg:rounded-[3rem]">
          <div className="p-6 sm:p-9">
            <span className="inline-flex rounded-full border-2 border-[#10151b] bg-[#ffca35] px-4 py-2 font-['Arial_Rounded_MT_Bold','Trebuchet_MS',sans-serif] text-xs font-black uppercase tracking-wide">
              Contact placeholder
            </span>
            <h2 className="mt-5 font-['Arial_Rounded_MT_Bold','Trebuchet_MS',sans-serif] text-4xl font-black uppercase leading-none tracking-[-0.065em] sm:text-5xl" id="contact-heading">
              Send us a note<span className="text-[#ff6391]">.</span>
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 sm:text-base">
              [Placeholder contact copy — the delivery address and final response details will be configured before launch.]
            </p>

            {statusMessage ? (
              <p
                aria-live="polite"
                className={[
                  'mt-5 rounded-2xl border-2 border-[#10151b] px-4 py-3 text-sm font-bold',
                  status === 'success' ? 'bg-[#d9f3df]' : 'bg-[#f9a3bd]',
                ].join(' ')}
                role={status === 'success' ? 'status' : 'alert'}
              >
                {statusMessage}
              </p>
            ) : null}

            <form className="mt-6 grid gap-5" noValidate onSubmit={handleSubmit}>
              <TextField
                autoComplete="name"
                disabled={status === 'submitting'}
                error={errors.name}
                label="Name"
                name="name"
                onChange={(event) => updateField('name', event.target.value)}
                placeholder="Your name"
                required
                value={submission.name}
              />
              <TextField
                autoComplete="email"
                disabled={status === 'submitting'}
                error={errors.email}
                label="Email"
                name="email"
                onChange={(event) => updateField('email', event.target.value)}
                placeholder="you@example.com"
                required
                type="email"
                value={submission.email}
              />
              <TextAreaField
                disabled={status === 'submitting'}
                error={errors.message}
                label="Message"
                name="message"
                onChange={(event) => updateField('message', event.target.value)}
                placeholder="How can we help?"
                required
                value={submission.message}
              />
              <Button className="w-fit" disabled={status === 'submitting'} trailingIcon={<Arrow />} type="submit">
                {status === 'submitting' ? 'Sending message' : 'Send message'}
              </Button>
            </form>
          </div>

          <div className="relative isolate min-h-72 overflow-hidden border-t-2 border-[#10151b] bg-[#9fd6f5] p-8 lg:border-l-2 lg:border-t-0 sm:p-12">
            <div aria-hidden="true" className="absolute -left-10 top-10 h-36 w-36 rounded-full bg-[#1c64d8]" />
            <div aria-hidden="true" className="absolute -right-12 bottom-0 h-44 w-44 rounded-tl-full bg-[#ffca35]" />
            <div aria-hidden="true" className="absolute bottom-6 left-8 h-20 w-20 rounded-full border-2 border-[#10151b] bg-[#ff6b2c]" />
            <div className="relative mx-auto mt-3 max-w-sm rounded-[2.5rem] border-[0.9rem] border-[#1c64d8] bg-[#fff9ed] p-6 shadow-[4px_4px_0_#10151b]">
              <img
                alt="Hands forming a heart"
                className="relative z-10 mx-auto block w-full"
                src={new URL('../../../assets/brand/heart-hands.svg', import.meta.url).href}
              />
            </div>
            <div className="relative z-10 mt-7 rounded-[1.75rem] border-2 border-[#10151b] bg-[#fff9ed] p-5 shadow-[3px_3px_0_#10151b]">
              <p className="font-['Arial_Rounded_MT_Bold','Trebuchet_MS',sans-serif] text-sm font-black uppercase">Every message matters</p>
              <p className="mt-2 text-sm leading-6">We&apos;ll share final contact details and response expectations before launch.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
