import { useQuery } from '@tanstack/react-query'

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
  const productsQuery = useQuery({
    queryKey: ['shopify', 'products', 'shop'],
    queryFn: () => fetchProducts(),
    enabled: configured,
  })

  return (
    <div className="space-y-12 sm:space-y-16">
      <ShopHero />

      {!configured ? (
        <ShopConfigurationState missing={configuration.missing} />
      ) : productsQuery.isPending ? (
        <ShopLoadingState />
      ) : productsQuery.isError ? (
        <ShopCatalog error onRetry={() => void productsQuery.refetch()} />
      ) : (
        <ShopCatalog products={productsQuery.data} />
      )}
    </div>
  )
}
