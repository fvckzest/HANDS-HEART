export type ShopifyConfigurationKey =
  | 'VITE_SHOPIFY_STORE_DOMAIN'
  | 'VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN'
  | 'VITE_SHOPIFY_API_VERSION'

export interface ShopifyConfiguration {
  status: 'configured' | 'unconfigured'
  endpoint: string | null
  storeDomain: string | null
  apiVersion: string | null
  missing: ShopifyConfigurationKey[]
}

interface ResolvedShopifyConfiguration {
  endpoint: string
  storefrontAccessToken: string
}

function readEnvironmentValue(name: ShopifyConfigurationKey): string | null {
  const environment = import.meta as ImportMeta & {
    env: Partial<Record<ShopifyConfigurationKey, string | undefined>>
  }
  const value = environment.env[name]

  return typeof value === 'string' && value.trim() !== '' ? value.trim() : null
}

function normalizeStoreDomain(domain: string): string {
  return domain.replace(/^https?:\/\//, '').replace(/\/+$/, '')
}

function getConfigurationValues() {
  const configuredDomain = readEnvironmentValue('VITE_SHOPIFY_STORE_DOMAIN')
  const storefrontAccessToken = readEnvironmentValue(
    'VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN',
  )
  const apiVersion = readEnvironmentValue('VITE_SHOPIFY_API_VERSION')
  const storeDomain = configuredDomain
    ? normalizeStoreDomain(configuredDomain)
    : null
  const missing: ShopifyConfigurationKey[] = []

  if (!storeDomain) {
    missing.push('VITE_SHOPIFY_STORE_DOMAIN')
  }

  if (!storefrontAccessToken) {
    missing.push('VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN')
  }

  if (!apiVersion) {
    missing.push('VITE_SHOPIFY_API_VERSION')
  }

  return { apiVersion, missing, storeDomain, storefrontAccessToken }
}

/**
 * Reports whether the browser build has all values required for live Shopify
 * calls. This is safe to invoke in placeholder-development mode.
 */
export function getShopifyConfiguration(): ShopifyConfiguration {
  const { apiVersion, missing, storeDomain } = getConfigurationValues()

  if (missing.length > 0 || !apiVersion || !storeDomain) {
    return {
      status: 'unconfigured',
      endpoint: null,
      storeDomain,
      apiVersion,
      missing,
    }
  }

  return {
    status: 'configured',
    endpoint: `https://${storeDomain}/api/${apiVersion}/graphql.json`,
    storeDomain,
    apiVersion,
    missing: [],
  }
}

export function isShopifyConfigured(): boolean {
  return getShopifyConfiguration().status === 'configured'
}

export function resolveShopifyConfiguration(): ResolvedShopifyConfiguration {
  const { apiVersion, missing, storeDomain, storefrontAccessToken } =
    getConfigurationValues()

  if (
    missing.length > 0 ||
    !apiVersion ||
    !storeDomain ||
    !storefrontAccessToken
  ) {
    throw new ShopifyConfigurationError(missing)
  }

  return {
    endpoint: `https://${storeDomain}/api/${apiVersion}/graphql.json`,
    storefrontAccessToken,
  }
}

export class ShopifyConfigurationError extends Error {
  readonly code = 'configuration' as const
  readonly missing: ShopifyConfigurationKey[]

  constructor(missing: ShopifyConfigurationKey[]) {
    super('Shopify is not configured for live storefront requests.')
    this.name = 'ShopifyConfigurationError'
    this.missing = missing
  }
}
