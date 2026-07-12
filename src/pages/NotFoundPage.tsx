import { NavLink } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section className="not-found">
      <p className="not-found__code">404</p>
      <h1>That path wandered off.</h1>
      <p>
        The page you are looking for is not part of the Hands Heart storefront.
      </p>
      <NavLink className="not-found__link" to="/">
        Return home <span aria-hidden="true">→</span>
      </NavLink>
    </section>
  )
}
