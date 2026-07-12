import {
  resolveShopifyConfiguration,
  ShopifyConfigurationError,
} from './config'

export type ShopifyRequestErrorCode =
  | 'configuration'
  | 'network'
  | 'graphql'
  | 'response'

/** A safe application error suitable for future visitor-facing error states. */
export class ShopifyRequestError extends Error {
  readonly code: ShopifyRequestErrorCode

  constructor(code: ShopifyRequestErrorCode) {
    super(getSafeMessage(code))
    this.name = 'ShopifyRequestError'
    this.code = code
  }
}

function getSafeMessage(code: ShopifyRequestErrorCode): string {
  switch (code) {
    case 'configuration':
      return 'Storefront data is unavailable until Shopify is configured.'
    case 'network':
      return 'Storefront data could not be reached. Please try again.'
    case 'graphql':
      return 'Storefront data could not be loaded. Please try again.'
    case 'response':
      return 'Storefront data returned an unexpected response. Please try again.'
  }
}

export type ShopifyGraphQLVariables = Record<string, unknown>

interface ShopifyGraphQLResponse<TData> {
  data?: TData
  errors?: unknown
}

function isResponseWithData<TData>(
  response: unknown,
): response is ShopifyGraphQLResponse<TData> {
  return typeof response === 'object' && response !== null && 'data' in response
}

function hasGraphQLErrors(response: unknown): boolean {
  return (
    typeof response === 'object' &&
    response !== null &&
    'errors' in response &&
    Array.isArray(response.errors) &&
    response.errors.length > 0
  )
}

/**
 * Sends a typed Storefront API request. Query and mutation documents belong in
 * the focused product or cart modules that consume this helper.
 */
export async function shopifyRequest<
  TData,
  TVariables extends ShopifyGraphQLVariables = ShopifyGraphQLVariables,
>(query: string, variables?: TVariables): Promise<TData> {
  let configuration

  try {
    configuration = resolveShopifyConfiguration()
  } catch (error) {
    if (error instanceof ShopifyConfigurationError) {
      throw new ShopifyRequestError('configuration')
    }

    throw new ShopifyRequestError('response')
  }

  let response: Response

  try {
    response = await fetch(configuration.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token':
          configuration.storefrontAccessToken,
      },
      body: JSON.stringify({ query, variables }),
    })
  } catch {
    throw new ShopifyRequestError('network')
  }

  let payload: unknown

  try {
    payload = await response.json()
  } catch {
    throw new ShopifyRequestError('response')
  }

  if (!response.ok) {
    throw new ShopifyRequestError('response')
  }

  if (hasGraphQLErrors(payload)) {
    throw new ShopifyRequestError('graphql')
  }

  if (!isResponseWithData<TData>(payload) || payload.data == null) {
    throw new ShopifyRequestError('response')
  }

  return payload.data
}
