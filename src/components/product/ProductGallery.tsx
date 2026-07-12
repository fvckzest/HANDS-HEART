import type { CommerceImage } from '../../features/shopify'

interface ProductGalleryProps {
  images: CommerceImage[]
  mainImage: CommerceImage | null
  onSelectImage: (image: CommerceImage) => void
  productTitle: string
}

function imageKey(image: CommerceImage): string {
  return image.url
}

export function ProductGallery({
  images,
  mainImage,
  onSelectImage,
  productTitle,
}: ProductGalleryProps) {
  const galleryImages = mainImage && !images.some((image) => image.url === mainImage.url)
    ? [mainImage, ...images]
    : images

  return (
    <section aria-label={`${productTitle} gallery`}>
      <div className="relative grid aspect-square place-items-center overflow-hidden rounded-[2.5rem] border-2 border-[var(--color-ink)] bg-[var(--color-lavender)] p-5 shadow-[5px_5px_0_var(--color-ink)] sm:p-9">
        <span
          aria-hidden="true"
          className="absolute -right-8 -top-8 size-32 rounded-full bg-[var(--color-yellow)]"
        />
        <span
          aria-hidden="true"
          className="absolute -bottom-5 -left-4 size-24 rounded-full bg-[var(--color-orange)]"
        />
        {mainImage ? (
          <img
            alt={mainImage.altText || productTitle}
            className="relative z-10 h-full w-full object-contain"
            src={mainImage.url}
          />
        ) : (
          <div className="relative z-10 grid h-full w-full place-items-center rounded-[1.7rem] border-2 border-dashed border-[var(--color-ink)] bg-[var(--color-cream)] p-8 text-center">
            <span aria-hidden="true" className="text-5xl">♥</span>
            <p className="mt-3 max-w-48 font-black uppercase tracking-wide">
              Product image coming soon
            </p>
          </div>
        )}
      </div>

      {galleryImages.length > 1 ? (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2" aria-label="Choose product image">
          {galleryImages.map((image, index) => {
            const isActive = image.url === mainImage?.url

            return (
              <button
                aria-label={`View image ${index + 1} of ${galleryImages.length}`}
                aria-pressed={isActive}
                className={[
                  'size-20 shrink-0 overflow-hidden rounded-[1.2rem] border-2 border-[var(--color-ink)] bg-[var(--color-cream)] p-1.5 transition sm:size-24',
                  isActive ? 'bg-[var(--color-yellow)] shadow-[2px_2px_0_var(--color-ink)]' : 'hover:bg-[var(--color-pink)]',
                ].join(' ')}
                key={imageKey(image)}
                onClick={() => onSelectImage(image)}
                type="button"
              >
                <img
                  alt=""
                  className="h-full w-full object-contain"
                  src={image.url}
                />
              </button>
            )
          })}
        </div>
      ) : null}
    </section>
  )
}
