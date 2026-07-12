export const publicPrerenderRoutes = ['/', '/shop', '/about', '/cart']

const shopifyConfigurationKeys = [
  'VITE_SHOPIFY_STORE_DOMAIN',
  'VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN',
  'VITE_SHOPIFY_API_VERSION',
]

function hasEnvironmentValue(name) {
  const value = process.env[name]

  return typeof value === 'string' && value.trim().length > 0
}

function readProductHandles() {
  const handles = process.env.SHOPIFY_PRERENDER_PRODUCT_HANDLES

  if (!handles) {
    return []
  }

  return [...new Set(handles.split(',').map((handle) => handle.trim()))].filter(
    Boolean,
  )
}

export function resolvePrerenderRoutes() {
  const productHandles = readProductHandles()
  const missingShopifyConfiguration = shopifyConfigurationKeys.filter(
    (key) => !hasEnvironmentValue(key),
  )

  if (missingShopifyConfiguration.length > 0) {
    console.log(
      `[prerender] Placeholder mode: skipping product routes because Shopify is not configured (${missingShopifyConfiguration.join(', ')}).`,
    )

    return publicPrerenderRoutes
  }

  if (productHandles.length === 0) {
    console.log(
      '[prerender] Shopify is configured, but SHOPIFY_PRERENDER_PRODUCT_HANDLES is empty; skipping product routes intentionally.',
    )

    return publicPrerenderRoutes
  }

  console.log(
    `[prerender] Rendering ${productHandles.length} configured Shopify product route${productHandles.length === 1 ? '' : 's'}.`,
  )

  return [
    ...publicPrerenderRoutes,
    ...productHandles.map((handle) => `/products/${encodeURIComponent(handle)}`),
  ]
}
