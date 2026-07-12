import { siteCopy } from '../../content/siteCopy'
import { shopPreviewProducts } from '../../content/shopPreviewProducts'
import type { Product, ShopifyConfigurationKey } from '../../features/shopify'
import { Button, EmptyState, ErrorState, LoadingState, ProductCard } from '../ui'
import type { ProductCardTheme } from '../ui'

const productCardThemes: ProductCardTheme[] = [
  {
    cardColor: 'var(--color-lavender)',
    visualColor: 'var(--color-lavender-pale)',
    detailsColor: 'var(--color-cream)',
    actionColor: 'var(--color-lavender)',
  },
  {
    cardColor: 'var(--color-yellow)',
    visualColor: 'var(--color-yellow-pale)',
    detailsColor: 'var(--color-cream)',
    actionColor: 'var(--color-yellow)',
  },
  {
    cardColor: 'var(--color-pink)',
    visualColor: 'var(--color-pink-pale)',
    detailsColor: 'var(--color-cream)',
    actionColor: 'var(--color-pink)',
  },
  {
    cardColor: 'var(--color-blue)',
    visualColor: 'var(--color-blue-pale)',
    detailsColor: 'var(--color-sky-soft)',
    actionColor: 'var(--color-sky)',
  },
  {
    cardColor: 'var(--color-orange)',
    visualColor: 'var(--color-orange-pale)',
    detailsColor: 'var(--color-cream-soft)',
    actionColor: 'var(--color-orange)',
  },
  {
    cardColor: 'var(--color-sky)',
    visualColor: 'var(--color-sky-pale)',
    detailsColor: 'var(--color-sky-light)',
    actionColor: 'var(--color-blue)',
    actionTextColor: 'var(--color-cream)',
  },
]

const tileColors = ['bg-[var(--color-lavender)]', 'bg-[var(--color-yellow)]', 'bg-[var(--color-pink)]', 'bg-[var(--color-blue)]', 'bg-[var(--color-orange)]', 'bg-[var(--color-sky)]']

interface ShopCatalogProps {
  products?: Product[]
  preview?: boolean
  error?: boolean
  onRetry?: () => void
  hasNextPage?: boolean
  isLoadingMore?: boolean
  loadMoreError?: boolean
  onLoadMore?: () => void
}

export function ShopCatalog({
  products,
  preview = false,
  error = false,
  onRetry,
  hasNextPage = false,
  isLoadingMore = false,
  loadMoreError = false,
  onLoadMore,
}: ShopCatalogProps) {
  if (error) {
    return (
      <ErrorState
        title="The collection needs another try."
        description={siteCopy.shop.loadErrorDescription}
        onRetry={onRetry}
      />
    )
  }

  if (!products?.length) {
    return (
      <EmptyState
        title={siteCopy.shop.emptyTitle}
        description={siteCopy.shop.emptyDescription}
      />
    )
  }

  return (
    <section aria-labelledby="catalog-heading">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4 sm:mb-9">
        <div>
          <p className="font-['Arial_Rounded_MT_Bold','Trebuchet_MS',sans-serif] text-xs font-black uppercase tracking-wide text-[var(--color-blue)]">
            Browse all
          </p>
          <h2
            className="mt-2 font-['Arial_Rounded_MT_Bold','Trebuchet_MS',sans-serif] text-3xl font-black uppercase leading-none tracking-[-0.06em] sm:text-4xl"
            id="catalog-heading"
          >
            Made to connect
          </h2>
        </div>
        <p className="rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-cream)] px-4 py-2 text-sm font-bold shadow-[2px_2px_0_var(--color-ink)]">
          {products.length} {preview ? 'preview pieces' : products.length === 1 ? 'piece' : 'pieces'}
        </p>
      </div>

      {preview ? (
        <p className="mb-5 rounded-[1.25rem] border-2 border-[var(--color-ink)] bg-[var(--color-cream)] px-4 py-3 text-sm font-semibold leading-6 shadow-[2px_2px_0_var(--color-ink)]">
          <span className="mr-2 font-black uppercase tracking-wide text-[var(--color-blue)]">Visual preview</span>
          These names, prices, and illustrations are placeholders only. Live products will come from Shopify.
        </p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product, index) => (
          <ShopProductCard
            key={product.id}
            preview={preview}
            product={product}
            theme={productCardThemes[index % productCardThemes.length]}
          />
        ))}
      </div>

      {loadMoreError ? (
        <ErrorState
          className="mt-8"
          description={siteCopy.shop.loadMoreErrorDescription}
          onRetry={onLoadMore}
          retryLabel="Try loading more"
          title={siteCopy.shop.loadMoreErrorTitle}
        />
      ) : null}

      {isLoadingMore ? (
        <LoadingState
          className="mt-8"
          description={siteCopy.shop.loadingMoreDescription}
          title={siteCopy.shop.loadingMoreTitle}
        />
      ) : null}

      {hasNextPage && !isLoadingMore && !loadMoreError ? (
        <div className="mt-8 flex justify-center">
          <Button onClick={onLoadMore} tone="yellow" trailingIcon="↓">
            {siteCopy.shop.loadMoreLabel}
          </Button>
        </div>
      ) : null}

      {!preview && !hasNextPage && !isLoadingMore && !loadMoreError ? (
        <p
          aria-live="polite"
          className="mt-8 text-center font-black uppercase tracking-wide text-[var(--color-blue)]"
          role="status"
        >
          {siteCopy.shop.catalogCompleteMessage}
        </p>
      ) : null}
    </section>
  )
}

export function ShopLoadingState() {
  return (
    <section aria-labelledby="catalog-loading-heading">
      <div className="mb-7 flex items-end justify-between gap-4">
        <div>
          <p className="font-['Arial_Rounded_MT_Bold','Trebuchet_MS',sans-serif] text-xs font-black uppercase tracking-wide text-[var(--color-blue)]">
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
            className={`animate-pulse rounded-[2rem] border-2 border-[var(--color-ink)] ${color} p-3 shadow-[3px_3px_0_var(--color-ink)]`}
            key={color}
          >
            <div className="min-h-64 rounded-[1.45rem] bg-[var(--color-cream)]/70" />
            <div className="mt-3 h-20 rounded-[1.3rem] border-2 border-[var(--color-ink)] bg-[var(--color-cream)]/80" />
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
  void missing

  return <ShopCatalog preview products={shopPreviewProducts} />
}

interface ShopProductCardProps {
  product: Product
  preview: boolean
  theme: ProductCardTheme
}

const heartHandsArtwork = new URL(
  '../../../assets/brand/heart-hands.svg',
  import.meta.url,
).href

function ShopProductCard({ product, preview, theme }: ShopProductCardProps) {
  const image = product.featuredImage ?? product.images[0]

  return (
    <ProductCard
      displayPrice={formatProductPrice(product)}
      theme={theme}
      title={product.title}
      action={
        preview ? (
          <span className="rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-cream)] px-2 py-1 text-[0.65rem] font-black uppercase tracking-wide">
            Preview
          </span>
        ) : undefined
      }
      to={preview ? undefined : `/products/${encodeURIComponent(product.handle)}`}
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
        ) : preview ? (
          <div className="relative grid h-64 w-full place-items-center overflow-hidden rounded-[1.2rem] border-2 border-[var(--color-ink)] bg-[var(--color-cream)] p-5">
            <div aria-hidden="true" className="absolute -bottom-10 left-1/2 h-20 w-36 -translate-x-1/2 rounded-t-full bg-[var(--color-orange)]" />
            <img
              alt=""
              className="relative h-44 w-full object-contain"
              src={heartHandsArtwork}
            />
          </div>
        ) : (
          <div className="grid h-64 w-full place-items-center rounded-[1.2rem] border-2 border-dashed border-[var(--color-ink)] p-5 text-center">
            <span className="font-['Arial_Rounded_MT_Bold','Trebuchet_MS',sans-serif] text-sm font-black uppercase leading-tight">
              {siteCopy.shop.unavailableImage}
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
