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
import { siteCopy } from '../content/siteCopy'
import {
  getProductMetadata,
  type RouteMetadata,
  useRouteMetadata,
} from '../lib/seo'

export function ProductPage() {
  const { handle } = useParams()
  const isConfigured = isShopifyConfigured()
  const normalizedHandle = handle?.trim() ?? ''
  const productPath = normalizedHandle
    ? `/products/${encodeURIComponent(normalizedHandle)}`
    : '/products'

  const productQuery = useQuery({
    queryKey: ['shopify', 'product', normalizedHandle],
    queryFn: () => fetchProductByHandle(normalizedHandle),
    enabled: isConfigured && normalizedHandle.length > 0,
  })

  let metadata: RouteMetadata

  if (productQuery.data) {
    metadata = getProductMetadata({
      handle: normalizedHandle,
      title: productQuery.data.title,
      description: productQuery.data.description,
      featuredImageUrl: productQuery.data.featuredImage?.url,
    })
  } else if (
    !normalizedHandle ||
    (!productQuery.isPending && !productQuery.isError && isConfigured)
  ) {
    metadata = {
      title: 'Product not found | Hands Heart',
      description:
        'The requested Hands Heart product could not be found. Browse the collection to discover available pieces.',
      pathname: productPath,
    }
  } else if (!isConfigured) {
    metadata = {
      title: 'Product details | Hands Heart',
      description:
        siteCopy.product.setupDescription,
      pathname: productPath,
    }
  } else if (productQuery.isError) {
    metadata = {
      title: 'Product unavailable | Hands Heart',
      description:
        'This Hands Heart product cannot be loaded right now. Please try again shortly.',
      pathname: productPath,
    }
  } else {
    metadata = {
      title: 'Loading product | Hands Heart',
      description: 'Getting this Hands Heart piece ready for you.',
      pathname: productPath,
    }
  }

  useRouteMetadata(metadata)

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
