/**
 * Normalized commerce data returned by the Shopify feature layer.
 *
 * Storefront API connection and node shapes stay private to query and mutation
 * modules. Presentation code should use these application-level types instead.
 */

export interface Money {
  amount: string
  currencyCode: string
}

export interface CommerceImage {
  url: string
  altText: string | null
  width: number | null
  height: number | null
}

export interface ProductOption {
  id: string
  name: string
  values: string[]
}

export interface SelectedOption {
  name: string
  value: string
}

export interface ProductVariant {
  id: string
  title: string
  availableForSale: boolean
  price: Money
  compareAtPrice: Money | null
  image: CommerceImage | null
  selectedOptions: SelectedOption[]
}

export interface Product {
  id: string
  handle: string
  title: string
  description: string
  descriptionHtml: string
  featuredImage: CommerceImage | null
  images: CommerceImage[]
  priceRange: {
    minVariantPrice: Money
    maxVariantPrice: Money
  }
  options: ProductOption[]
  variants: ProductVariant[]
}

/** Cursor metadata returned with a bounded Shopify connection page. */
export interface PageInfo {
  hasNextPage: boolean
  endCursor: string | null
}

/** One normalized, bounded page of products from the Shopify catalog. */
export interface ProductCatalogPage {
  products: Product[]
  pageInfo: PageInfo
}

export interface Collection {
  id: string
  handle: string
  title: string
  description: string
  image: CommerceImage | null
}

export interface CartLine {
  id: string
  quantity: number
  productTitle: string
  merchandise: ProductVariant
  cost: {
    amountPerQuantity: Money
    totalAmount: Money
  }
}

export interface CartCost {
  subtotalAmount: Money
  totalAmount: Money
  totalTaxAmount: Money | null
}

/** Shopify's hosted checkout destination supplied by the cart API. */
export type CheckoutUrl = string

export interface Cart {
  id: string
  checkoutUrl: CheckoutUrl
  totalQuantity: number
  lines: CartLine[]
  cost: CartCost
}
