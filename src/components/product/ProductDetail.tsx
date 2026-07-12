import { useEffect, useMemo, useState } from 'react'

import { useCart } from '../../features/cart'
import type { CommerceImage, Money, Product, ProductVariant } from '../../features/shopify'
import { Button } from '../ui'

import { ProductGallery } from './ProductGallery'
import { VariantSelector } from './VariantSelector'

interface ProductDetailProps {
  product: Product
}

function formatMoney(money: Money): string {
  const amount = Number(money.amount)

  if (Number.isNaN(amount)) {
    return `${money.amount} ${money.currencyCode}`
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: money.currencyCode,
  }).format(amount)
}

function initialVariant(product: Product): ProductVariant | null {
  return product.variants.find((variant) => variant.availableForSale) ?? product.variants[0] ?? null
}

function selectProductImage(
  variant: ProductVariant | null,
  product: Product,
  selectedImage: CommerceImage | null,
): CommerceImage | null {
  return variant?.image ?? selectedImage ?? product.featuredImage ?? product.images[0] ?? null
}

export function ProductDetail({ product }: ProductDetailProps) {
  const { addItem, isMutating, openDrawer } = useCart()
  const defaultVariant = useMemo(() => initialVariant(product), [product])
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    defaultVariant?.id ?? null,
  )
  const [selectedImage, setSelectedImage] = useState<CommerceImage | null>(
    product.featuredImage ?? product.images[0] ?? null,
  )
  const [cartNotice, setCartNotice] = useState<string | null>(null)

  useEffect(() => {
    setSelectedVariantId(defaultVariant?.id ?? null)
    setSelectedImage(product.featuredImage ?? product.images[0] ?? null)
    setCartNotice(null)
  }, [defaultVariant, product.featuredImage, product.images])

  const selectedVariant =
    product.variants.find((variant) => variant.id === selectedVariantId) ??
    defaultVariant
  const activeImage = selectProductImage(selectedVariant, product, selectedImage)
  const isAvailable = selectedVariant?.availableForSale ?? false
  const price = selectedVariant?.price ?? product.priceRange.minVariantPrice
  const compareAtPrice = selectedVariant?.compareAtPrice ?? null

  const addSelectedVariant = async () => {
    if (!selectedVariant || !selectedVariant.availableForSale) {
      return
    }

    setCartNotice(null)

    try {
      await addItem(selectedVariant.id)
      setCartNotice('Added to your Shopify bag.')
      openDrawer()
    } catch {
      setCartNotice('We couldn’t add this piece just now. Please try again.')
    }
  }

  return (
    <article className="relative isolate overflow-hidden">
      <span
        aria-hidden="true"
        className="absolute -left-8 top-8 -z-10 size-24 rounded-full bg-[#f9a3bd] md:size-36"
      />
      <span
        aria-hidden="true"
        className="absolute right-0 top-1/3 -z-10 size-20 rounded-full bg-[#ffca35] md:size-28"
      />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)] lg:items-start lg:gap-12">
        <ProductGallery
          images={product.images}
          mainImage={activeImage}
          onSelectImage={setSelectedImage}
          productTitle={product.title}
        />

        <section className="rounded-[2.2rem] border-2 border-[#10151b] bg-[#fff9ed] p-5 shadow-[5px_5px_0_#10151b] sm:p-8">
          <p className="inline-flex rounded-full border-2 border-[#10151b] bg-[#9fd6f5] px-3 py-1 font-black text-xs uppercase tracking-[0.12em]">
            Made to connect
          </p>
          <h1 className="mt-5 font-['Arial_Rounded_MT_Bold','Trebuchet_MS',sans-serif] text-4xl font-black uppercase leading-[0.95] tracking-[-0.06em] sm:text-5xl">
            {product.title}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1">
            <p className="text-2xl font-black">{formatMoney(price)}</p>
            {compareAtPrice ? (
              <p className="font-bold text-[#51545a] line-through">
                {formatMoney(compareAtPrice)}
              </p>
            ) : null}
          </div>

          <p
            className={[
              'mt-3 inline-flex rounded-full border-2 border-[#10151b] px-3 py-1 text-sm font-black uppercase tracking-wide',
              isAvailable ? 'bg-[#9edbb0]' : 'bg-[#f9a3bd]',
            ].join(' ')}
          >
            {isAvailable ? 'Ready to add' : 'This variant is unavailable'}
          </p>

          {product.description ? (
            <p className="mt-6 max-w-prose text-base leading-7 text-[#34383d]">
              {product.description}
            </p>
          ) : (
            <p className="mt-6 max-w-prose text-base leading-7 text-[#34383d]">
              Product details are being prepared. Check back for the full story
              behind this piece.
            </p>
          )}

          <div className="mt-8 border-t-2 border-[#10151b] pt-6">
            <VariantSelector
              options={product.options}
              selectedVariant={selectedVariant}
              variants={product.variants}
              onSelectVariant={(variant) => {
                setSelectedVariantId(variant.id)
                setCartNotice(null)
              }}
            />
          </div>

          <div className="mt-8 rounded-[1.6rem] border-2 border-[#10151b] bg-[#ffca35] p-4">
            <Button
              className="w-full"
              disabled={!selectedVariant || !isAvailable || isMutating}
              onClick={() => void addSelectedVariant()}
              trailingIcon="→"
            >
              {!isAvailable ? 'Unavailable' : isMutating ? 'Adding to bag…' : 'Add to cart'}
            </Button>
            <p aria-live="polite" className="mt-3 text-sm font-bold leading-5">
              {cartNotice ?? 'Choose a ready-to-add variant, then add it to your Shopify bag.'}
            </p>
          </div>
        </section>
      </div>
    </article>
  )
}
