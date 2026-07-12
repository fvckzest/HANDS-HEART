import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { SiteLayout } from '../components/SiteLayout'
import { AboutPage } from '../pages/AboutPage'
import { CartPage } from '../pages/CartPage'
import { HomePage } from '../pages/HomePage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { ProductPage } from '../pages/ProductPage'
import { ShopPage } from '../pages/ShopPage'

const router = createBrowserRouter([
  {
    Component: SiteLayout,
    children: [
      { index: true, Component: HomePage },
      { path: 'about', Component: AboutPage },
      { path: 'shop', Component: ShopPage },
      { path: 'products/:handle', Component: ProductPage },
      { path: 'cart', Component: CartPage },
      { path: '*', Component: NotFoundPage },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
