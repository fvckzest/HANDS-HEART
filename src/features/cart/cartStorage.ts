const CART_ID_STORAGE_KEY = 'hands-heart.shopify-cart-id'

/**
 * The browser keeps only Shopify's opaque cart identifier. Cart lines, prices,
 * totals, and checkout URLs always come back from Shopify.
 */
export function readStoredCartId(): string | null {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const cartId = window.localStorage.getItem(CART_ID_STORAGE_KEY)

    return cartId && cartId.trim() ? cartId : null
  } catch {
    return null
  }
}

export function storeCartId(cartId: string): void {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.setItem(CART_ID_STORAGE_KEY, cartId)
  } catch {
    // Browsers can disable storage. The live cart remains usable for this visit.
  }
}

export function clearStoredCartId(): void {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.removeItem(CART_ID_STORAGE_KEY)
  } catch {
    // A blocked storage area should not interrupt a visitor's cart session.
  }
}
