import {
  ContactDeliveryConfigurationError,
  ContactDeliveryError,
  deliverContactSubmission,
  type ContactDeliveryEnvironment,
  type ContactDeliveryPayload,
} from '../contact/delivery'

interface ContactRequestBody extends ContactDeliveryPayload {
  website?: unknown
}

interface PagesFunctionContext<Environment> {
  env: Environment
  request: Request
}

const jsonHeaders = {
  'Content-Type': 'application/json; charset=utf-8',
  'X-Content-Type-Options': 'nosniff',
}

const methodHeaders = {
  ...jsonHeaders,
  Allow: 'POST, OPTIONS',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

function jsonResponse(body: { ok: boolean; error?: string }, status: number, headers = jsonHeaders): Response {
  return new Response(JSON.stringify(body), { headers, status })
}

function isContactRequestBody(value: unknown): value is ContactRequestBody {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const submission = value as Record<string, unknown>
  return typeof submission.name === 'string' && typeof submission.email === 'string' && typeof submission.message === 'string'
}

function normalizeSubmission(body: ContactRequestBody): ContactDeliveryPayload | null {
  const name = body.name.trim()
  const email = body.email.trim()
  const message = body.message.trim()

  if (
    name.length < 1 ||
    name.length > 120 ||
    email.length < 5 ||
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    message.length < 1 ||
    message.length > 5000
  ) {
    return null
  }

  return { name, email, message }
}

async function readRequestBody(request: Request): Promise<ContactRequestBody | null> {
  try {
    const body: unknown = await request.json()
    return isContactRequestBody(body) ? body : null
  } catch {
    return null
  }
}

export const onRequest: PagesFunction<unknown, 'api/contact', ContactDeliveryEnvironment> = async ({ env, request }) => {
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: methodHeaders, status: 204 })
  }

  if (request.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed.', ok: false }, 405, methodHeaders)
  }

  const body = await readRequestBody(request)
  if (!body) {
    return jsonResponse({ error: 'Please check the form and try again.', ok: false }, 400)
  }

  if (body.website !== undefined && (typeof body.website !== 'string' || body.website.trim().length > 0)) {
    return jsonResponse({ error: 'Unable to send this message.', ok: false }, 400)
  }

  const submission = normalizeSubmission(body)
  if (!submission) {
    return jsonResponse({ error: 'Please check the form and try again.', ok: false }, 400)
  }

  try {
    await deliverContactSubmission(submission, env)
    return jsonResponse({ ok: true }, 200)
  } catch (error) {
    if (error instanceof ContactDeliveryConfigurationError) {
      return jsonResponse({ error: 'Message delivery is temporarily unavailable. Please try again later.', ok: false }, 503)
    }

    if (error instanceof ContactDeliveryError) {
      return jsonResponse({ error: 'Your message could not be sent. Please try again in a moment.', ok: false }, 502)
    }

    return jsonResponse({ error: 'Your message could not be sent. Please try again in a moment.', ok: false }, 502)
  }
}

type PagesFunction<Params, Route, Environment> = (
  context: PagesFunctionContext<Environment> & { params: Params; functionPath: Route },
) => Response | Promise<Response>
