import { ActionLink, ErrorState, LoadingState } from '../ui'

export function ProductLoadingState() {
  return (
    <LoadingState
      className="mx-auto max-w-2xl"
      description="We’re gathering the details for this Hands Heart piece."
      title="Loading product"
    />
  )
}

export function ProductUnconfiguredState() {
  return (
    <section className="mx-auto max-w-3xl rounded-[2.5rem] border-2 border-[#10151b] bg-[#ffca35] p-6 shadow-[5px_5px_0_#10151b] sm:p-10">
      <p className="inline-flex rounded-full border-2 border-[#10151b] bg-[#fff9ed] px-3 py-1 text-xs font-black uppercase tracking-[0.12em]">
        Store setup pending
      </p>
      <h1 className="mt-5 font-['Arial_Rounded_MT_Bold','Trebuchet_MS',sans-serif] text-4xl font-black uppercase leading-[0.95] tracking-[-0.06em] sm:text-5xl">
        This product is waiting for its storefront connection.
      </h1>
      <p className="mt-5 max-w-prose text-lg leading-7">
        Product details will appear here once the Shopify catalog is connected.
        No request was made while the store configuration is incomplete.
      </p>
      <div className="mt-7">
        <ActionLink to="/shop" tone="dark" trailingIcon="→">
          Browse the collection
        </ActionLink>
      </div>
    </section>
  )
}

export function ProductNotFoundState() {
  return (
    <section className="mx-auto max-w-3xl rounded-[2.5rem] border-2 border-[#10151b] bg-[#c9b4ec] p-6 shadow-[5px_5px_0_#10151b] sm:p-10">
      <p className="text-6xl" aria-hidden="true">♥</p>
      <h1 className="mt-4 font-['Arial_Rounded_MT_Bold','Trebuchet_MS',sans-serif] text-4xl font-black uppercase leading-[0.95] tracking-[-0.06em] sm:text-5xl">
        This piece has wandered off.
      </h1>
      <p className="mt-5 max-w-prose text-lg leading-7">
        We couldn’t find a product with that handle. Try the collection instead.
      </p>
      <div className="mt-7">
        <ActionLink to="/shop" tone="dark" trailingIcon="→">
          Visit the shop
        </ActionLink>
      </div>
    </section>
  )
}

interface ProductErrorStateProps {
  onRetry: () => void
}

export function ProductErrorState({ onRetry }: ProductErrorStateProps) {
  return (
    <ErrorState
      className="mx-auto max-w-2xl"
      description="We couldn’t load this product right now. Please try again in a moment."
      onRetry={onRetry}
      title="Product details are taking a pause"
    />
  )
}
