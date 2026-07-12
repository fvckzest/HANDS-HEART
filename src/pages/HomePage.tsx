import { RoutePlaceholder } from './RoutePlaceholder'

export function HomePage() {
  return (
    <RoutePlaceholder
      accent="yellow"
      eyebrow="Home · scaffold stage"
      title="The home canvas is ready."
    >
      <p>
        This placeholder-safe route will receive the approved homepage sections
        and final content in a later task.
      </p>
    </RoutePlaceholder>
  )
}
