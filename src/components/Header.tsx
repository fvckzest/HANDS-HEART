import { NavLink } from 'react-router-dom'

const heartHandsMark = new URL(
  '../../assets/brand/heart-hands.svg',
  import.meta.url,
).href

const primaryLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/shop', label: 'Shop' },
]

export function Header() {
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

        <NavLink
          className={({ isActive }) =>
            `cart-link${isActive ? ' cart-link--active' : ''}`
          }
          to="/cart"
        >
          <span aria-hidden="true">◌</span>
          <span>Bag</span>
          <span className="cart-link__count" aria-label="0 items">
            0
          </span>
        </NavLink>
      </div>
    </header>
  )
}
