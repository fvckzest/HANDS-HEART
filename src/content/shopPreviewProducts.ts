import type { Product } from '../features/shopify'

/**
 * Development-only catalog cards for reviewing the shop layout before the
 * approved Shopify catalog and product imagery are available.
 *
 * These are intentionally not Shopify records and are never used when the
 * Storefront API is configured.
 */
export const shopPreviewProducts: Product[] = [
  createPreviewProduct('everyday-tee', 'Everyday Tee', '25.00'),
  createPreviewProduct('classic-crew', 'Classic Crew', '48.00'),
  createPreviewProduct('heart-tote', 'Heart Hands Tote', '25.00'),
  createPreviewProduct('ceramic-mug', 'Ceramic Mug', '25.00'),
  createPreviewProduct('heart-cap', 'Heart Hands Cap', '28.00'),
  createPreviewProduct('art-print', 'Heart Hands Art Print', '30.00'),
  createPreviewProduct('crew-socks', 'Connect Crew Socks', '16.00'),
  createPreviewProduct('heart-hoodie', 'Heart Hands Hoodie', '62.00'),
]

function createPreviewProduct(id: string, title: string, amount: string): Product {
  return {
    id: `preview-${id}`,
    handle: `preview-${id}`,
    title,
    description: '',
    descriptionHtml: '',
    featuredImage: null,
    images: [],
    priceRange: {
      minVariantPrice: { amount, currencyCode: 'USD' },
      maxVariantPrice: { amount, currencyCode: 'USD' },
    },
    options: [],
    variants: [],
  }
}
