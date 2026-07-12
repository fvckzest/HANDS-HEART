import { Outlet } from 'react-router-dom'

import { CartDrawer } from './cart'
import { Footer } from './Footer'
import { Header } from './Header'

export function SiteLayout() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main className="site-main" id="main-content">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  )
}
