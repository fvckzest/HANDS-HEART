import { CartContents } from '../components/cart'
import { useCart } from '../features/cart'

export function CartPage() {
  const { cart } = useCart()
  const itemCount = cart?.totalQuantity ?? 0

  return (
    <section className="mx-auto max-w-4xl">
      <div className="relative isolate overflow-hidden rounded-[2.5rem] border-2 border-[#10151b] bg-[#9fd6f5] p-6 shadow-[5px_5px_0_#10151b] sm:p-10">
        <span
          aria-hidden="true"
          className="absolute -right-8 -top-10 -z-10 size-40 rounded-full border-2 border-[#10151b] bg-[#ffca35]"
        />
        <p className="inline-flex rounded-full border-2 border-[#10151b] bg-[#fff9ed] px-3 py-1 text-xs font-black uppercase tracking-[0.12em]">
          Your Shopify bag · {itemCount} {itemCount === 1 ? 'item' : 'items'}
        </p>
        <h1 className="mt-5 max-w-xl font-['Arial_Rounded_MT_Bold','Trebuchet_MS',sans-serif] text-4xl font-black uppercase leading-[0.9] tracking-[-0.065em] sm:text-6xl">
          Keep the connection close.
        </h1>
        <p className="mt-4 max-w-2xl text-base font-medium leading-7 sm:text-lg">
          Your selected pieces, quantities, prices, and checkout handoff stay in sync with Shopify.
        </p>
      </div>
      <div className="mt-8 rounded-[2.2rem] border-2 border-[#10151b] bg-[#fff9ed] p-5 shadow-[4px_4px_0_#10151b] sm:p-8">
        <CartContents />
      </div>
    </section>
  )
}
