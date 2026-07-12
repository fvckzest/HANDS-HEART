import {
  useCallback,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  addCartLine,
  createCart,
  fetchCart,
  isShopifyConfigured,
  removeCartLines,
  updateCartLineQuantity,
  type Cart,
} from '../shopify'

import { readStoredCartId, storeCartId } from './cartStorage'
import { CartContext, type CartContextValue } from './CartContext'

const cartQueryKey = (cartId: string) => ['shopify', 'cart', cartId] as const

class CartOperationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'CartOperationError'
  }
}

function getInitialCartId(): string | null {
  return readStoredCartId()
}

export function CartProvider({ children }: PropsWithChildren) {
  const queryClient = useQueryClient()
  const [cartId, setCartId] = useState<string | null>(getInitialCartId)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const isConfigured = isShopifyConfigured()

  const cartQuery = useQuery({
    queryKey: cartId ? cartQueryKey(cartId) : ['shopify', 'cart', 'empty'],
    queryFn: () => {
      if (!cartId) {
        throw new CartOperationError('A cart ID is required to load the cart.')
      }

      return fetchCart(cartId)
    },
    enabled: isConfigured && cartId !== null,
  })

  const commitCart = useCallback(
    (cart: Cart) => {
      queryClient.setQueryData(cartQueryKey(cart.id), cart)
      storeCartId(cart.id)
      setCartId(cart.id)
    },
    [queryClient],
  )

  const addMutation = useMutation({
    mutationFn: async ({ merchandiseId, quantity }: { merchandiseId: string; quantity: number }) => {
      if (!isConfigured) {
        throw new CartOperationError('Shopify is not configured for cart actions.')
      }

      return cartId
        ? addCartLine(cartId, merchandiseId, quantity)
        : createCart([{ merchandiseId, quantity }])
    },
    onSuccess: commitCart,
  })

  const updateMutation = useMutation({
    mutationFn: async ({ lineId, quantity }: { lineId: string; quantity: number }) => {
      if (!isConfigured || !cartId) {
        throw new CartOperationError('A live Shopify cart is required to update an item.')
      }

      return updateCartLineQuantity(cartId, lineId, quantity)
    },
    onSuccess: commitCart,
  })

  const removeMutation = useMutation({
    mutationFn: async ({ lineId }: { lineId: string }) => {
      if (!isConfigured || !cartId) {
        throw new CartOperationError('A live Shopify cart is required to remove an item.')
      }

      return removeCartLines(cartId, [lineId])
    },
    onSuccess: commitCart,
  })

  const addItem = useCallback(
    (merchandiseId: string, quantity = 1) =>
      addMutation.mutateAsync({ merchandiseId, quantity }),
    [addMutation],
  )
  const updateItemQuantity = useCallback(
    (lineId: string, quantity: number) =>
      updateMutation.mutateAsync({ lineId, quantity }),
    [updateMutation],
  )
  const removeItem = useCallback(
    (lineId: string) => removeMutation.mutateAsync({ lineId }),
    [removeMutation],
  )
  const refreshCart = useCallback(() => cartQuery.refetch(), [cartQuery])
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), [])
  const openDrawer = useCallback(() => setIsDrawerOpen(true), [])

  const value = useMemo<CartContextValue>(
    () => ({
      cart: cartQuery.data ?? null,
      cartId,
      mutationError: addMutation.isError || updateMutation.isError || removeMutation.isError,
      queryError: cartQuery.isError,
      isConfigured,
      isDrawerOpen,
      isLoading: cartId !== null && cartQuery.isPending,
      isMutating: addMutation.isPending || updateMutation.isPending || removeMutation.isPending,
      addItem,
      closeDrawer,
      openDrawer,
      refreshCart,
      removeItem,
      updateItemQuantity,
    }),
    [
      addItem,
      addMutation.isError,
      addMutation.isPending,
      cartId,
      cartQuery.data,
      cartQuery.isError,
      cartQuery.isPending,
      closeDrawer,
      isConfigured,
      isDrawerOpen,
      openDrawer,
      refreshCart,
      removeItem,
      removeMutation.isError,
      removeMutation.isPending,
      updateItemQuantity,
      updateMutation.isError,
      updateMutation.isPending,
    ],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
