import { Link } from 'react-router-dom'

import { useCart } from '../../features/cart'
import type { CartLine, Money } from '../../features/shopify'
import { EmptyState, ErrorState, LoadingState } from '../ui'

interface CartContentsProps {
  compact?: boolean
}

function formatMoney(money: Money): string {
  const amount = Number(money.amount)

  if (!Number.isFinite(amount)) {
    return `${money.amount} ${money.currencyCode}`
  }

  try {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: money.currencyCode,
    }).format(amount)
  } catch {
    return `${money.amount} ${money.currencyCode}`
  }
}

function lineTitle(line: CartLine): string {
  return line.productTitle
}

function variantSummary(line: CartLine): string | null {
  const selectedOptions = line.merchandise.selectedOptions.map(
    ({ name, value }) => `${name}: ${value}`,
  )
  const variantTitle =
    line.merchandise.title === 'Default Title'
      ? null
      : line.merchandise.title
  const summary = [variantTitle, ...selectedOptions].filter(Boolean)

  return summary.length > 0 ? summary.join(' · ') : null
}

function CartLineItem({ line }: { line: CartLine }) {
  const { isMutating, removeItem, updateItemQuantity } = useCart()
  const image = line.merchandise.image
  const summary = variantSummary(line)

  const decreaseQuantity = () => {
    if (line.quantity <= 1) {
      void removeItem(line.id)
      return
    }

    void updateItemQuantity(line.id, line.quantity - 1)
  }

  return (
    <li className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-4 border-b-2 border-[#10151b] py-5 last:border-b-0">
      <div className="grid aspect-square place-items-center overflow-hidden rounded-[1.4rem] border-2 border-[#10151b] bg-[#c9b4ec] p-2">
        {image ? (
          <img
            alt={image.altText ?? `${lineTitle(line)} product image`}
            className="h-full w-full object-contain"
            height={image.height ?? undefined}
            src={image.url}
            width={image.width ?? undefined}
          />
        ) : (
          <span className="px-2 text-center font-['Arial_Rounded_MT_Bold','Trebuchet_MS',sans-serif] text-xs font-black uppercase leading-tight">
            Image coming soon
          </span>
        )}
      </div>

      <div className="min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-['Arial_Rounded_MT_Bold','Trebuchet_MS',sans-serif] text-base font-black uppercase leading-tight tracking-[-0.035em]">
              {lineTitle(line)}
            </h3>
            {summary ? (
              <p className="mt-1 text-sm font-bold text-[#51545a]">{summary}</p>
            ) : null}
          </div>
          <p className="shrink-0 font-black">{formatMoney(line.cost.totalAmount)}</p>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div
            aria-label={`Quantity for ${lineTitle(line)}`}
            className="inline-flex items-center overflow-hidden rounded-full border-2 border-[#10151b] bg-[#fff9ed]"
            role="group"
          >
            <button
              aria-label={`Decrease quantity of ${lineTitle(line)}`}
              className="grid size-9 place-items-center border-r-2 border-[#10151b] text-lg font-black transition hover:bg-[#ffca35] disabled:cursor-wait disabled:opacity-60"
              disabled={isMutating}
              onClick={decreaseQuantity}
              type="button"
            >
              −
            </button>
            <span aria-live="polite" className="grid min-w-10 place-items-center px-2 font-black">
              {line.quantity}
            </span>
            <button
              aria-label={`Increase quantity of ${lineTitle(line)}`}
              className="grid size-9 place-items-center border-l-2 border-[#10151b] text-lg font-black transition hover:bg-[#ffca35] disabled:cursor-wait disabled:opacity-60"
              disabled={isMutating}
              onClick={() => void updateItemQuantity(line.id, line.quantity + 1)}
              type="button"
            >
              +
            </button>
          </div>
          <button
            className="font-black text-sm uppercase underline decoration-2 underline-offset-4 transition hover:text-[#1c64d8] disabled:cursor-wait disabled:opacity-60"
            disabled={isMutating}
            onClick={() => void removeItem(line.id)}
            type="button"
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  )
}

function CartSummary() {
  const { cart, isMutating } = useCart()

  if (!cart) {
    return null
  }

  return (
    <section className="mt-6 rounded-[1.7rem] border-2 border-[#10151b] bg-[#ffca35] p-5 shadow-[3px_3px_0_#10151b]">
      <div className="flex items-center justify-between gap-4 text-base font-black">
        <span>Subtotal</span>
        <span>{formatMoney(cart.cost.subtotalAmount)}</span>
      </div>
      <div className="mt-3 flex items-center justify-between gap-4 border-t-2 border-[#10151b] pt-3 text-xl font-black">
        <span>Total</span>
        <span>{formatMoney(cart.cost.totalAmount)}</span>
      </div>
      <p className="mt-3 text-sm font-bold leading-5">
        Shipping and any applicable taxes are confirmed in Shopify checkout.
      </p>
      <a
        className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full border-2 border-[#10151b] bg-[#10151b] px-5 py-3 font-black uppercase tracking-wide text-[#fff9ed] shadow-[2px_2px_0_#10151b] transition hover:bg-[#26303a] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#ff6391]"
        href={cart.checkoutUrl}
        onClick={(event) => {
          if (isMutating) {
            event.preventDefault()
          }
        }}
        aria-disabled={isMutating}
      >
        {isMutating ? 'Updating bag…' : 'Checkout with Shopify'}
        <span aria-hidden="true">→</span>
      </a>
    </section>
  )
}

export function CartContents({ compact = false }: CartContentsProps) {
  const {
    cart,
    cartId,
    isConfigured,
    isLoading,
    mutationError,
    queryError,
    refreshCart,
  } = useCart()

  if (!isConfigured) {
    return (
      <EmptyState
        className={compact ? 'p-5' : undefined}
        description="This development preview is waiting for the Shopify store connection. No cart request was made while configuration is incomplete."
        title="Your bag is in setup mode"
      />
    )
  }

  if (isLoading) {
    return (
      <LoadingState
        className={compact ? 'p-5' : undefined}
        description="Gathering the latest pieces in your Shopify bag."
        title="Loading your bag"
      />
    )
  }

  if (queryError && !cart) {
    return (
      <ErrorState
        className={compact ? 'p-5' : undefined}
        description="We couldn’t load your bag just now. Please try again without losing your place."
        onRetry={() => void refreshCart()}
        title="Your bag needs another try"
      />
    )
  }

  if (!cart || cart.lines.length === 0) {
    return (
      <EmptyState
        action={
          <Link
            className="inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-[#10151b] bg-[#10151b] px-5 py-2 font-black uppercase tracking-wide text-[#fff9ed] shadow-[2px_2px_0_#10151b] transition hover:bg-[#26303a]"
            to="/shop"
          >
            Browse the collection <span aria-hidden="true">→</span>
          </Link>
        }
        className={compact ? 'p-5' : undefined}
        description={
          cartId
            ? 'This Shopify bag is ready for a new favorite.'
            : 'Choose a piece from the collection and it will appear here.'
        }
        title="Your bag is ready for a little heart"
      />
    )
  }

  return (
    <div>
      {queryError || mutationError ? (
        <p aria-live="assertive" className="mb-4 rounded-[1.2rem] border-2 border-[#10151b] bg-[#f9a3bd] px-4 py-3 text-sm font-bold">
          We couldn’t finish that bag update. Your latest confirmed Shopify bag is still shown.
        </p>
      ) : null}
      <ul aria-label="Bag items" className="m-0 list-none p-0">
        {cart.lines.map((line) => (
          <CartLineItem key={line.id} line={line} />
        ))}
      </ul>
      <CartSummary />
    </div>
  )
}
