import type { ContactSubmission } from './types'

const contactEndpoint = '/api/contact'

interface ContactApiResponse {
  ok?: boolean
}

function isSuccessfulResponse(payload: unknown): payload is ContactApiResponse & { ok: true } {
  return typeof payload === 'object' && payload !== null && 'ok' in payload && payload.ok === true
}

/**
 * The client transport boundary for the Cloudflare Pages Function. It never
 * forwards server or delivery-provider response details into the UI.
 */
export async function submitContactForm(submission: ContactSubmission): Promise<void> {
  let response: Response

  try {
    response = await fetch(contactEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submission),
    })
  } catch {
    throw new Error('CONTACT_SUBMISSION_UNAVAILABLE')
  }

  if (!response.ok) {
    throw new Error('CONTACT_SUBMISSION_REJECTED')
  }

  const payload: unknown = await response.json().catch(() => null)
  if (!isSuccessfulResponse(payload)) {
    throw new Error('CONTACT_SUBMISSION_REJECTED')
  }
}
