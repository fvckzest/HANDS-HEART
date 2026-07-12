import { NavLink } from 'react-router-dom'

const footerLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/shop', label: 'Shop' },
  { to: '/cart', label: 'Bag' },
]

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__content">
        <div>
          <p className="site-footer__brand">Hands Heart</p>
          <p className="site-footer__status">
            Storefront shell · placeholder content
          </p>
        </div>

        <nav className="footer-nav" aria-label="Footer navigation">
          {footerLinks.map((link) => (
            <NavLink
              className="footer-nav__link"
              end={link.end}
              key={link.to}
              to={link.to}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <p className="site-footer__legal">
          Legal links will be added with approved launch content.
        </p>
      </div>
    </footer>
  )
}
