import { useInfiniteQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import {
  fetchProducts,
  getShopifyConfiguration,
  isShopifyConfigured,
} from '../features/shopify'
import {
  ShopCatalog,
  ShopConfigurationState,
  ShopHero,
  ShopLoadingState,
} from '../components/shop'
import { shopMetadata, useRouteMetadata } from '../lib/seo'

export function ShopPage() {
  useRouteMetadata(shopMetadata)

  const configured = isShopifyConfigured()
  const configuration = getShopifyConfiguration()
  const productsQuery = useInfiniteQuery({
    queryKey: ['shopify', 'products', 'shop'],
    queryFn: ({ pageParam }) => fetchProducts(24, pageParam),
    enabled: configured,
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) =>
      lastPage.pageInfo.hasNextPage ? lastPage.pageInfo.endCursor ?? undefined : undefined,
  })
  const products = useMemo(() => {
    const productIds = new Set<string>()

    return (productsQuery.data?.pages ?? []).flatMap((page) =>
      page.products.filter((product) => {
        if (productIds.has(product.id)) {
          return false
        }

        productIds.add(product.id)
        return true
      }),
    )
  }, [productsQuery.data])

  return (
    <div className="space-y-12 sm:space-y-16">
      <ShopHero />

      {!configured ? (
        <ShopConfigurationState missing={configuration.missing} />
      ) : productsQuery.isPending ? (
        <ShopLoadingState />
      ) : productsQuery.isError && !productsQuery.data ? (
        <ShopCatalog error onRetry={() => void productsQuery.refetch()} />
      ) : (
        <ShopCatalog
          hasNextPage={productsQuery.hasNextPage}
          isLoadingMore={productsQuery.isFetchingNextPage}
          loadMoreError={productsQuery.isFetchNextPageError}
          onLoadMore={() => void productsQuery.fetchNextPage()}
          products={products}
        />
      )}
    </div>
  )
}
