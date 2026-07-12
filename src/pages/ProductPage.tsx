import { useParams } from 'react-router-dom'

import { RoutePlaceholder } from './RoutePlaceholder'

export function ProductPage() {
  const { handle } = useParams()

  return (
    <RoutePlaceholder
      accent="lavender"
      eyebrow="Product · placeholder"
      title="A product page is taking shape."
    >
      <p>
        <strong>Requested handle:</strong> {handle || 'not provided'}
      </p>
      <p>
        Product details, variants, availability, and cart actions are not
        connected until the Shopify and commerce UI tasks.
      </p>
    </RoutePlaceholder>
  )
}
