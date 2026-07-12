import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

import { useCart } from '../../features/cart'

import { CartContents } from './CartContents'

function focusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((element) => !element.hasAttribute('aria-hidden'))
}

export function CartDrawer() {
  const { cart, closeDrawer, isDrawerOpen } = useCart()
  const drawerRef = useRef<HTMLElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isDrawerOpen) {
      return
    }

    const previouslyFocused = document.activeElement as HTMLElement | null
    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeDrawer()
        return
      }

      if (event.key !== 'Tab' || !drawerRef.current) {
        return
      }

      const elements = focusableElements(drawerRef.current)

      if (elements.length === 0) {
        event.preventDefault()
        return
      }

      const first = elements[0]
      const last = elements[elements.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      previouslyFocused?.focus()
    }
  }, [closeDrawer, isDrawerOpen])

  if (!isDrawerOpen) {
    return null
  }

  const itemCount = cart?.totalQuantity ?? 0

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="presentation">
      <button
        aria-label="Close bag"
        className="absolute inset-0 cursor-default bg-[#10151b]/45"
        onClick={closeDrawer}
        type="button"
      />
      <aside
        aria-labelledby="cart-drawer-title"
        aria-modal="true"
        className="relative z-10 flex h-full w-full max-w-xl flex-col overflow-y-auto border-l-2 border-[#10151b] bg-[#fff9ed] p-5 shadow-[-5px_0_0_#10151b] sm:p-7"
        ref={drawerRef}
        role="dialog"
      >
        <div className="flex items-start justify-between gap-4 border-b-2 border-[#10151b] pb-5">
          <div>
            <p className="font-['Arial_Rounded_MT_Bold','Trebuchet_MS',sans-serif] text-xs font-black uppercase tracking-[0.12em] text-[#1c64d8]">
              Your bag · {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </p>
            <h2
              className="mt-2 font-['Arial_Rounded_MT_Bold','Trebuchet_MS',sans-serif] text-4xl font-black uppercase leading-none tracking-[-0.06em]"
              id="cart-drawer-title"
            >
              Made to connect
            </h2>
          </div>
          <button
            aria-label="Close bag"
            className="grid size-11 shrink-0 place-items-center rounded-full border-2 border-[#10151b] bg-[#f9a3bd] text-2xl font-black shadow-[2px_2px_0_#10151b] transition hover:bg-[#ffb9cb]"
            onClick={closeDrawer}
            ref={closeButtonRef}
            type="button"
          >
            ×
          </button>
        </div>

        <div className="py-5">
          <CartContents compact />
        </div>
        <Link
          className="mt-auto inline-flex min-h-11 items-center justify-center rounded-full border-2 border-[#10151b] bg-[#fff9ed] px-5 py-2 text-sm font-black uppercase tracking-wide shadow-[2px_2px_0_#10151b] transition hover:bg-[#9fd6f5]"
          onClick={closeDrawer}
          to="/cart"
        >
          Open full bag page
        </Link>
      </aside>
    </div>
  )
}
