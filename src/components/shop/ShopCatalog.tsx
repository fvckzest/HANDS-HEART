import type { Product, ShopifyConfigurationKey } from '../../features/shopify'
import { EmptyState, ErrorState, LoadingState, ProductCard } from '../ui'

const tileColors = ['bg-[#c9b4ec]', 'bg-[#ffca35]', 'bg-[#f9a3bd]', 'bg-[#1c64d8]', 'bg-[#ff6b2c]', 'bg-[#9fd6f5]']

interface ShopCatalogProps {
  products?: Product[]
  error?: boolean
  onRetry?: () => void
}

export function ShopCatalog({ products, error = false, onRetry }: ShopCatalogProps) {
  if (error) {
    return (
      <ErrorState
        title="The collection needs another try."
        description="We could not load the latest products. Your bag is safe — please try again."
        onRetry={onRetry}
      />
    )
  }

  if (!products?.length) {
    return (
      <EmptyState
        title="New pieces are on their way."
        description="The Shopify catalog is connected, but no products are available to show yet. Add approved products in Shopify, then return to the collection."
      />
    )
  }

  return (
    <section aria-labelledby="catalog-heading">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4 sm:mb-9">
        <div>
          <p className="font-['Arial_Rounded_MT_Bold','Trebuchet_MS',sans-serif] text-xs font-black uppercase tracking-wide text-[#1c64d8]">
            Browse all
          </p>
          <h2
            className="mt-2 font-['Arial_Rounded_MT_Bold','Trebuchet_MS',sans-serif] text-3xl font-black uppercase leading-none tracking-[-0.06em] sm:text-4xl"
            id="catalog-heading"
          >
            Made to connect
          </h2>
        </div>
        <p className="rounded-full border-2 border-[#10151b] bg-[#fff9ed] px-4 py-2 text-sm font-bold shadow-[2px_2px_0_#10151b]">
          {products.length} {products.length === 1 ? 'piece' : 'pieces'}
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product, index) => (
          <ShopProductCard
            color={tileColors[index % tileColors.length]}
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  )
}

export function ShopLoadingState() {
  return (
    <section aria-labelledby="catalog-loading-heading">
      <div className="mb-7 flex items-end justify-between gap-4">
        <div>
          <p className="font-['Arial_Rounded_MT_Bold','Trebuchet_MS',sans-serif] text-xs font-black uppercase tracking-wide text-[#1c64d8]">
            Browse all
          </p>
          <h2
            className="mt-2 font-['Arial_Rounded_MT_Bold','Trebuchet_MS',sans-serif] text-3xl font-black uppercase leading-none tracking-[-0.06em] sm:text-4xl"
            id="catalog-loading-heading"
          >
            Made to connect
          </h2>
        </div>
      </div>
      <LoadingState
        className="mb-5"
        title="Loading the collection"
        description="Bringing the latest pieces together."
      />
      <div aria-hidden="true" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tileColors.slice(0, 4).map((color) => (
          <div
            className={`animate-pulse rounded-[2rem] border-2 border-[#10151b] ${color} p-3 shadow-[3px_3px_0_#10151b]`}
            key={color}
          >
            <div className="min-h-64 rounded-[1.45rem] bg-[#fff9ed]/70" />
            <div className="mt-3 h-20 rounded-[1.3rem] border-2 border-[#10151b] bg-[#fff9ed]/80" />
          </div>
        ))}
      </div>
    </section>
  )
}

interface ShopConfigurationStateProps {
  missing: ShopifyConfigurationKey[]
}

export function ShopConfigurationState({ missing }: ShopConfigurationStateProps) {
  const configurationNames = missing.map((name) => name.replace('VITE_', '')).join(', ')

  return (
    <EmptyState
      title="The catalog is in setup mode."
      description={`This development preview is waiting for Shopify configuration (${configurationNames}). Add the public store domain, Storefront token, API version, and approved catalog data before live launch.`}
    />
  )
}

interface ShopProductCardProps {
  product: Product
  color: string
}

function ShopProductCard({ product, color }: ShopProductCardProps) {
  const image = product.featuredImage ?? product.images[0]

  return (
    <ProductCard
      className={color}
      displayPrice={formatProductPrice(product)}
      title={product.title}
      to={`/products/${encodeURIComponent(product.handle)}`}
      visual={
        image ? (
          <img
            alt={image.altText ?? `${product.title} product image`}
            className="h-64 w-full object-contain transition duration-200 group-hover:scale-[1.03]"
            height={image.height ?? undefined}
            loading="lazy"
            src={image.url}
            width={image.width ?? undefined}
          />
        ) : (
          <div className="grid h-64 w-full place-items-center rounded-[1.2rem] border-2 border-dashed border-[#10151b] p-5 text-center">
            <span className="font-['Arial_Rounded_MT_Bold','Trebuchet_MS',sans-serif] text-sm font-black uppercase leading-tight">
              Product image coming soon
            </span>
          </div>
        )
      }
    />
  )
}

function formatProductPrice(product: Product): string {
  const { minVariantPrice, maxVariantPrice } = product.priceRange
  const minimumPrice = formatMoney(minVariantPrice.amount, minVariantPrice.currencyCode)
  const maximumPrice = formatMoney(maxVariantPrice.amount, maxVariantPrice.currencyCode)

  return minimumPrice === maximumPrice ? minimumPrice : `${minimumPrice} – ${maximumPrice}`
}

function formatMoney(amount: string, currencyCode: string): string {
  const numericAmount = Number(amount)

  if (!Number.isFinite(numericAmount)) {
    return amount
  }

  try {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currencyCode,
    }).format(numericAmount)
  } catch {
    return `${amount} ${currencyCode}`
  }
}
