export interface ContactDeliveryPayload {
  name: string
  email: string
  message: string
}

export interface ContactDeliveryEnvironment {
  CONTACT_DELIVERY_PROVIDER?: string
  CONTACT_DELIVERY_WEBHOOK_URL?: string
  CONTACT_DELIVERY_WEBHOOK_TOKEN?: string
}

export class ContactDeliveryConfigurationError extends Error {}

export class ContactDeliveryError extends Error {}

function getWebhookDeliveryUrl(environment: ContactDeliveryEnvironment): string {
  const webhookUrl = environment.CONTACT_DELIVERY_WEBHOOK_URL?.trim()

  if (environment.CONTACT_DELIVERY_PROVIDER !== 'webhook' || !webhookUrl) {
    throw new ContactDeliveryConfigurationError('Contact delivery is not configured.')
  }

  return webhookUrl
}

/**
 * Delivers validated contact data through the configured server-only adapter.
 * More providers can be added here without changing the visitor-facing form.
 */
export async function deliverContactSubmission(
  payload: ContactDeliveryPayload,
  environment: ContactDeliveryEnvironment,
): Promise<void> {
  const webhookUrl = getWebhookDeliveryUrl(environment)

  const headers = new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json',
  })

  if (environment.CONTACT_DELIVERY_WEBHOOK_TOKEN) {
    headers.set('Authorization', `Bearer ${environment.CONTACT_DELIVERY_WEBHOOK_TOKEN}`)
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        type: 'contact_submission',
        submittedAt: new Date().toISOString(),
        ...payload,
      }),
    })

    if (!response.ok) {
      throw new ContactDeliveryError('Contact delivery failed.')
    }
  } catch (error) {
    if (error instanceof ContactDeliveryError) {
      throw error
    }

    throw new ContactDeliveryError('Contact delivery failed.')
  }
}
