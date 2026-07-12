import { ShopifyRequestError, shopifyRequest } from './client'
import type {
  Cart,
  CartCost,
  CartLine,
  CommerceImage,
  Money,
  ProductVariant,
  SelectedOption,
} from './types'

/** A variant and quantity accepted by Shopify's cart input. */
export interface CartLineInput {
  merchandiseId: string
  quantity: number
}

interface CartIdVariables extends Record<string, unknown> {
  cartId: string
}

interface CartCreateVariables extends Record<string, unknown> {
  input: {
    lines: CartLineInput[]
  }
}

interface CartLineAddVariables extends CartIdVariables {
  lines: CartLineInput[]
}

interface CartLineUpdateVariables extends CartIdVariables {
  lines: Array<{
    id: string
    quantity: number
  }>
}

interface CartLineRemoveVariables extends CartIdVariables {
  lineIds: string[]
}

interface RawMoney {
  amount: string
  currencyCode: string
}

interface RawImage {
  url: string
  altText: string | null
  width: number | null
  height: number | null
}

interface RawSelectedOption {
  name: string
  value: string
}

interface RawProductVariant {
  __typename: 'ProductVariant'
  id: string
  title: string
  product: {
    title: string
  } | null
  availableForSale: boolean
  price: RawMoney
  compareAtPrice: RawMoney | null
  image: RawImage | null
  selectedOptions: RawSelectedOption[]
}

interface RawCartLine {
  id: string
  quantity: number
  merchandise: RawProductVariant | null
  cost: {
    amountPerQuantity: RawMoney
    totalAmount: RawMoney
  }
}

interface RawCart {
  id: string
  checkoutUrl: string
  totalQuantity: number
  lines: {
    nodes: RawCartLine[]
  }
  cost: {
    subtotalAmount: RawMoney
    totalAmount: RawMoney
    totalTaxAmount: RawMoney | null
  }
}

interface RawCartUserError {
  code: string | null
  field: string[] | null
  message: string
}

interface RawCartMutationResult {
  cart: RawCart | null
  userErrors: RawCartUserError[]
}

interface CartQueryData {
  cart: RawCart | null
}

interface CartCreateData {
  cartCreate: RawCartMutationResult
}

interface CartLinesAddData {
  cartLinesAdd: RawCartMutationResult
}

interface CartLinesUpdateData {
  cartLinesUpdate: RawCartMutationResult
}

interface CartLinesRemoveData {
  cartLinesRemove: RawCartMutationResult
}

const CART_FIELDS = `
  id
  checkoutUrl
  totalQuantity
  lines(first: 100) {
    nodes {
      id
      quantity
      merchandise {
        __typename
        ... on ProductVariant {
          id
          title
          product {
            title
          }
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
      cost {
        amountPerQuantity {
          amount
          currencyCode
        }
        totalAmount {
          amount
          currencyCode
        }
      }
    }
  }
  cost {
    subtotalAmount {
      amount
      currencyCode
    }
    totalAmount {
      amount
      currencyCode
    }
    totalTaxAmount {
      amount
      currencyCode
    }
  }
`

const FETCH_CART_QUERY = `
  query FetchCart($cartId: ID!) {
    cart(id: $cartId) {
      ${CART_FIELDS}
    }
  }
`

const CREATE_CART_MUTATION = `
  mutation CreateCart($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        ${CART_FIELDS}
      }
      userErrors {
        code
        field
        message
      }
    }
  }
`

const ADD_CART_LINES_MUTATION = `
  mutation AddCartLines($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ${CART_FIELDS}
      }
      userErrors {
        code
        field
        message
      }
    }
  }
`

const UPDATE_CART_LINES_MUTATION = `
  mutation UpdateCartLineQuantity($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ${CART_FIELDS}
      }
      userErrors {
        code
        field
        message
      }
    }
  }
`

const REMOVE_CART_LINES_MUTATION = `
  mutation RemoveCartLines($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ${CART_FIELDS}
      }
      userErrors {
        code
        field
        message
      }
    }
  }
`

function normalizeMoney(money: RawMoney): Money {
  return {
    amount: money.amount,
    currencyCode: money.currencyCode,
  }
}

function normalizeImage(image: RawImage): CommerceImage {
  return {
    url: image.url,
    altText: image.altText,
    width: image.width,
    height: image.height,
  }
}

function normalizeSelectedOption(option: RawSelectedOption): SelectedOption {
  return {
    name: option.name,
    value: option.value,
  }
}

function normalizeVariant(variant: RawProductVariant): ProductVariant {
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

function normalizeCartLine(line: RawCartLine): CartLine {
  if (
    line.merchandise?.__typename !== 'ProductVariant' ||
    !line.merchandise.product
  ) {
    throw new ShopifyRequestError('response')
  }

  return {
    id: line.id,
    quantity: line.quantity,
    productTitle: line.merchandise.product.title,
    merchandise: normalizeVariant(line.merchandise),
    cost: {
      amountPerQuantity: normalizeMoney(line.cost.amountPerQuantity),
      totalAmount: normalizeMoney(line.cost.totalAmount),
    },
  }
}

function normalizeCartCost(cost: RawCart['cost']): CartCost {
  return {
    subtotalAmount: normalizeMoney(cost.subtotalAmount),
    totalAmount: normalizeMoney(cost.totalAmount),
    totalTaxAmount: cost.totalTaxAmount
      ? normalizeMoney(cost.totalTaxAmount)
      : null,
  }
}

function normalizeCart(cart: RawCart): Cart {
  return {
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    totalQuantity: cart.totalQuantity,
    lines: cart.lines.nodes.map(normalizeCartLine),
    cost: normalizeCartCost(cart.cost),
  }
}

function normalizeMutationResult(result: RawCartMutationResult): Cart {
  if (result.userErrors.length > 0) {
    throw new ShopifyRequestError('graphql')
  }

  if (!result.cart) {
    throw new ShopifyRequestError('response')
  }

  return normalizeCart(result.cart)
}

/** Creates a Shopify cart with optional initial variant lines. */
export async function createCart(lines: CartLineInput[] = []): Promise<Cart> {
  const data = await shopifyRequest<CartCreateData, CartCreateVariables>(
    CREATE_CART_MUTATION,
    { input: { lines } },
  )

  return normalizeMutationResult(data.cartCreate)
}

/** Retrieves the current Shopify-backed cart for a stable Shopify cart ID. */
export async function fetchCart(cartId: string): Promise<Cart> {
  const data = await shopifyRequest<CartQueryData, CartIdVariables>(
    FETCH_CART_QUERY,
    { cartId },
  )

  if (!data.cart) {
    throw new ShopifyRequestError('response')
  }

  return normalizeCart(data.cart)
}

/** Adds a variant line to an existing Shopify cart. */
export async function addCartLine(
  cartId: string,
  merchandiseId: string,
  quantity: number,
): Promise<Cart> {
  const data = await shopifyRequest<CartLinesAddData, CartLineAddVariables>(
    ADD_CART_LINES_MUTATION,
    { cartId, lines: [{ merchandiseId, quantity }] },
  )

  return normalizeMutationResult(data.cartLinesAdd)
}

/** Updates one Shopify cart line's quantity without calculating totals locally. */
export async function updateCartLineQuantity(
  cartId: string,
  lineId: string,
  quantity: number,
): Promise<Cart> {
  const data = await shopifyRequest<
    CartLinesUpdateData,
    CartLineUpdateVariables
  >(UPDATE_CART_LINES_MUTATION, {
    cartId,
    lines: [{ id: lineId, quantity }],
  })

  return normalizeMutationResult(data.cartLinesUpdate)
}

/** Removes one or more Shopify cart lines by their stable line IDs. */
export async function removeCartLines(
  cartId: string,
  lineIds: string[],
): Promise<Cart> {
  const data = await shopifyRequest<
    CartLinesRemoveData,
    CartLineRemoveVariables
  >(REMOVE_CART_LINES_MUTATION, { cartId, lineIds })

  return normalizeMutationResult(data.cartLinesRemove)
}
