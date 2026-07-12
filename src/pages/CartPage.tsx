import { RoutePlaceholder } from './RoutePlaceholder'

export function CartPage() {
  return (
    <RoutePlaceholder
      accent="pink"
      eyebrow="Bag · placeholder"
      title="Your bag will live here."
    >
      <p>
        This route is the accessible full-page cart fallback. Shopify cart data
        and checkout handoff are intentionally not connected yet.
      </p>
    </RoutePlaceholder>
  )
}
