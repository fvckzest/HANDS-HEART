import { shopifyRequest } from './client'
import type {
  Collection,
  CommerceImage,
  Money,
  Product,
  ProductOption,
  ProductVariant,
  SelectedOption,
} from './types'

const DEFAULT_FEATURED_PRODUCT_LIMIT = 4
const DEFAULT_PRODUCT_LIMIT = 24
const DEFAULT_COLLECTION_LIMIT = 24
const MAX_CONNECTION_LIMIT = 100

const PRODUCT_FRAGMENT = `
  fragment ProductDetails on Product {
    id
    handle
    title
    description
    descriptionHtml
    featuredImage {
      url
      altText
      width
      height
    }
    images(first: 20) {
      edges {
        node {
          url
          altText
          width
          height
        }
      }
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    options {
      id
      name
      values
    }
    variants(first: 100) {
      edges {
        node {
          id
          title
          availableForSale
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
          image {
            url
            altText
            width
            height
          }
          selectedOptions {
            name
            value
          }
        }
      }
    }
  }
`

const FEATURED_PRODUCTS_QUERY = `
  ${PRODUCT_FRAGMENT}

  query FeaturedProducts($first: Int!) {
    products(first: $first, sortKey: CREATED_AT, reverse: true) {
      edges {
        node {
          ...ProductDetails
        }
      }
    }
  }
`

const PRODUCTS_QUERY = `
  ${PRODUCT_FRAGMENT}

  query Products($first: Int!) {
    products(first: $first, sortKey: CREATED_AT, reverse: true) {
      edges {
        node {
          ...ProductDetails
        }
      }
    }
  }
`

const PRODUCT_BY_HANDLE_QUERY = `
  ${PRODUCT_FRAGMENT}

  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      ...ProductDetails
    }
  }
`

const COLLECTIONS_QUERY = `
  query Collections($first: Int!) {
    collections(first: $first, sortKey: TITLE) {
      edges {
        node {
          id
          handle
          title
          description
          image {
            url
            altText
            width
            height
          }
        }
      }
    }
  }
`

interface StorefrontMoney {
  amount: string
  currencyCode: string
}

interface StorefrontImage {
  url: string
  altText: string | null
  width: number | null
  height: number | null
}

interface StorefrontSelectedOption {
  name: string
  value: string
}

interface StorefrontProductOption {
  id: string
  name: string
  values: string[]
}

interface StorefrontProductVariant {
  id: string
  title: string
  availableForSale: boolean
  price: StorefrontMoney
  compareAtPrice: StorefrontMoney | null
  image: StorefrontImage | null
  selectedOptions: StorefrontSelectedOption[]
}

interface StorefrontConnection<TNode> {
  edges: Array<{ node: TNode | null } | null> | null
}

interface StorefrontProduct {
  id: string
  handle: string
  title: string
  description: string
  descriptionHtml: string
  featuredImage: StorefrontImage | null
  images: StorefrontConnection<StorefrontImage> | null
  priceRange: {
    minVariantPrice: StorefrontMoney
    maxVariantPrice: StorefrontMoney
  }
  options: StorefrontProductOption[] | null
  variants: StorefrontConnection<StorefrontProductVariant> | null
}

interface StorefrontCollection {
  id: string
  handle: string
  title: string
  description: string
  image: StorefrontImage | null
}

interface FeaturedProductsResponse {
  products: StorefrontConnection<StorefrontProduct> | null
}

interface ProductsResponse {
  products: StorefrontConnection<StorefrontProduct> | null
}

interface ProductByHandleResponse {
  product: StorefrontProduct | null
}

interface CollectionsResponse {
  collections: StorefrontConnection<StorefrontCollection> | null
}

function normalizeLimit(limit: number | undefined, fallback: number): number {
  if (!Number.isFinite(limit) || limit == null) {
    return fallback
  }

  return Math.min(Math.max(Math.floor(limit), 1), MAX_CONNECTION_LIMIT)
}

function normalizeConnection<TNode>(
  connection: StorefrontConnection<TNode> | null,
): TNode[] {
  if (!connection?.edges) {
    return []
  }

  return connection.edges.flatMap((edge) => (edge?.node ? [edge.node] : []))
}

function normalizeMoney(money: StorefrontMoney): Money {
  return {
    amount: money.amount,
    currencyCode: money.currencyCode,
  }
}

function normalizeImage(image: StorefrontImage): CommerceImage {
  return {
    url: image.url,
    altText: image.altText,
    width: image.width,
    height: image.height,
  }
}

function normalizeSelectedOption(
  option: StorefrontSelectedOption,
): SelectedOption {
  return {
    name: option.name,
    value: option.value,
  }
}

function normalizeProductOption(
  option: StorefrontProductOption,
): ProductOption {
  return {
    id: option.id,
    name: option.name,
    values: option.values,
  }
}

function normalizeProductVariant(
  variant: StorefrontProductVariant,
): ProductVariant {
  return {
    id: variant.id,
    title: variant.title,
    availableForSale: variant.availableForSale,
    price: normalizeMoney(variant.price),
    compareAtPrice: variant.compareAtPrice
      ? normalizeMoney(variant.compareAtPrice)
      : null,
    image: variant.image ? normalizeImage(variant.image) : null,
    selectedOptions: variant.selectedOptions.map(normalizeSelectedOption),
  }
}

function normalizeProduct(product: StorefrontProduct): Product {
  return {
    id: product.id,
    handle: product.handle,
    title: product.title,
    description: product.description,
    descriptionHtml: product.descriptionHtml,
    featuredImage: product.featuredImage
      ? normalizeImage(product.featuredImage)
      : null,
    images: normalizeConnection(product.images).map(normalizeImage),
    priceRange: {
      minVariantPrice: normalizeMoney(product.priceRange.minVariantPrice),
      maxVariantPrice: normalizeMoney(product.priceRange.maxVariantPrice),
    },
    options: (product.options ?? []).map(normalizeProductOption),
    variants: normalizeConnection(product.variants).map(normalizeProductVariant),
  }
}

function normalizeCollection(collection: StorefrontCollection): Collection {
  return {
    id: collection.id,
    handle: collection.handle,
    title: collection.title,
    description: collection.description,
    image: collection.image ? normalizeImage(collection.image) : null,
  }
}

/** Fetches a small, bounded product set for the homepage featured row. */
export async function fetchFeaturedProducts(
  limit = DEFAULT_FEATURED_PRODUCT_LIMIT,
): Promise<Product[]> {
  const response = await shopifyRequest<FeaturedProductsResponse>(
    FEATURED_PRODUCTS_QUERY,
    { first: normalizeLimit(limit, DEFAULT_FEATURED_PRODUCT_LIMIT) },
  )

  return normalizeConnection(response.products).map(normalizeProduct)
}

/** Fetches a bounded catalog listing for the custom shop page. */
export async function fetchProducts(
  limit = DEFAULT_PRODUCT_LIMIT,
): Promise<Product[]> {
  const response = await shopifyRequest<ProductsResponse>(PRODUCTS_QUERY, {
    first: normalizeLimit(limit, DEFAULT_PRODUCT_LIMIT),
  })

  return normalizeConnection(response.products).map(normalizeProduct)
}

/** Fetches one product by its stable Shopify handle, or null when it is absent. */
export async function fetchProductByHandle(
  handle: string,
): Promise<Product | null> {
  const response = await shopifyRequest<ProductByHandleResponse>(
    PRODUCT_BY_HANDLE_QUERY,
    { handle },
  )

  return response.product ? normalizeProduct(response.product) : null
}

/** Fetches a simple bounded collection listing for optional catalog filtering. */
export async function fetchCollections(
  limit = DEFAULT_COLLECTION_LIMIT,
): Promise<Collection[]> {
  const response = await shopifyRequest<CollectionsResponse>(
    COLLECTIONS_QUERY,
    { first: normalizeLimit(limit, DEFAULT_COLLECTION_LIMIT) },
  )

  return normalizeConnection(response.collections).map(normalizeCollection)
}
