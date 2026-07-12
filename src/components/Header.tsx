import { NavLink } from 'react-router-dom'

import { useCart } from '../features/cart'

const heartHandsMark = new URL(
  '../../assets/brand/heart-hands.svg',
  import.meta.url,
).href

const primaryLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/shop', label: 'Shop' },
]

export function Header() {
  const { cart, isLoading, openDrawer } = useCart()
  const itemCount = cart?.totalQuantity ?? 0

  return (
    <header className="site-header">
      <div className="site-header__frame">
        <NavLink className="brand-lockup" to="/" end>
          <img
            className="brand-lockup__mark"
            src={heartHandsMark}
            alt=""
            aria-hidden="true"
          />
          <span>Hands Heart</span>
        </NavLink>

        <nav className="primary-nav" aria-label="Primary navigation">
          {primaryLinks.map((link) => (
            <NavLink
              className={({ isActive }) =>
                `primary-nav__link${isActive ? ' primary-nav__link--active' : ''}`
              }
              end={link.end}
              key={link.to}
              to={link.to}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button
          aria-label={`Open bag with ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}
          className="cart-link"
          onClick={openDrawer}
          type="button"
        >
          <span aria-hidden="true">◌</span>
          <span>Bag</span>
          <span aria-live="polite" className="cart-link__count">
            {isLoading ? '…' : itemCount}
          </span>
        </button>
      </div>
    </header>
  )
}
