import { createServer } from 'vite'

const server = await createServer({
  server: {
    hmr: false,
    middlewareMode: true,
  },
})

try {
  const result = await server.transformRequest('/src/features/shopify/config.ts')

  if (!result?.code) {
    throw new Error('Vite did not transform the Shopify configuration module.')
  }

  if (result.code.includes('environment.env')) {
    throw new Error(
      'Shopify configuration still uses an indirect import.meta.env read.',
    )
  }

  console.log('Shopify environment fallback transform check passed.')
} finally {
  await server.close()
}
