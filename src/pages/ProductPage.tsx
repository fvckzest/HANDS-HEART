import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import {
  fetchProductByHandle,
  isShopifyConfigured,
} from '../features/shopify'
import { ProductDetail } from '../components/product/ProductDetail'
import {
  ProductErrorState,
  ProductLoadingState,
  ProductNotFoundState,
  ProductUnconfiguredState,
} from '../components/product/ProductStates'

export function ProductPage() {
  const { handle } = useParams()
  const isConfigured = isShopifyConfigured()
  const normalizedHandle = handle?.trim() ?? ''

  const productQuery = useQuery({
    queryKey: ['shopify', 'product', normalizedHandle],
    queryFn: () => fetchProductByHandle(normalizedHandle),
    enabled: isConfigured && normalizedHandle.length > 0,
  })

  if (!normalizedHandle) {
    return <ProductNotFoundState />
  }

  if (!isConfigured) {
    return <ProductUnconfiguredState />
  }

  if (productQuery.isPending) {
    return <ProductLoadingState />
  }

  if (productQuery.isError) {
    return <ProductErrorState onRetry={() => void productQuery.refetch()} />
  }

  if (!productQuery.data) {
    return <ProductNotFoundState />
  }

  return <ProductDetail product={productQuery.data} />
}
