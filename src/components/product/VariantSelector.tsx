import type { ProductOption, ProductVariant } from '../../features/shopify'

interface VariantSelectorProps {
  options: ProductOption[]
  selectedVariant: ProductVariant | null
  variants: ProductVariant[]
  onSelectVariant: (variant: ProductVariant) => void
}

function variantLabel(variant: ProductVariant): string {
  if (variant.selectedOptions.length > 0) {
    return variant.selectedOptions.map(({ value }) => value).join(' · ')
  }

  return variant.title === 'Default Title' ? 'Default option' : variant.title
}

export function VariantSelector({
  options,
  selectedVariant,
  variants,
  onSelectVariant,
}: VariantSelectorProps) {
  if (variants.length === 0) {
    return (
      <p className="rounded-[1.25rem] border-2 border-[#10151b] bg-[#f9a3bd] p-4 font-bold">
        Product options are not available yet.
      </p>
    )
  }

  const optionNames = options.map((option) => option.name).join(' · ')

  return (
    <fieldset>
      <legend className="font-black uppercase tracking-wide">
        {options.length > 0 ? `Choose ${optionNames}` : 'Choose an option'}
      </legend>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {variants.map((variant) => {
          const isSelected = variant.id === selectedVariant?.id
          const availableLabel = variant.availableForSale ? 'Available' : 'Unavailable'

          return (
            <button
              aria-pressed={isSelected}
              className={[
                'flex min-h-14 items-center justify-between gap-3 rounded-[1.1rem] border-2 border-[#10151b] px-4 py-3 text-left font-black transition',
                isSelected
                  ? 'bg-[#1c64d8] text-white shadow-[2px_2px_0_#10151b]'
                  : 'bg-[#fff9ed] hover:bg-[#9fd6f5]',
                !variant.availableForSale && !isSelected ? 'bg-[#f3d6df] text-[#59555a]' : '',
              ].join(' ')}
              key={variant.id}
              onClick={() => onSelectVariant(variant)}
              type="button"
            >
              <span className="min-w-0">
                <span className="block truncate uppercase tracking-wide">
                  {variantLabel(variant)}
                </span>
                <span className="mt-1 block text-xs font-bold normal-case tracking-normal opacity-80">
                  {availableLabel}
                </span>
              </span>
              <span
                aria-hidden="true"
                className={[
                  'size-3 shrink-0 rounded-full border border-current',
                  variant.availableForSale ? 'bg-[#9edbb0]' : 'bg-[#f9a3bd]',
                ].join(' ')}
              />
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}
