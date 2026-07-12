import { createContext } from 'react'

import type { Cart } from '../shopify'

export interface CartContextValue {
  cart: Cart | null
  cartId: string | null
  mutationError: boolean
  queryError: boolean
  isConfigured: boolean
  isDrawerOpen: boolean
  isLoading: boolean
  isMutating: boolean
  addItem: (merchandiseId: string, quantity?: number) => Promise<Cart>
  closeDrawer: () => void
  openDrawer: () => void
  refreshCart: () => Promise<unknown>
  removeItem: (lineId: string) => Promise<Cart>
  updateItemQuantity: (lineId: string, quantity: number) => Promise<Cart>
}

export const CartContext = createContext<CartContextValue | null>(null)
