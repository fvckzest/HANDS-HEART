import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './App'
import { applySiteTheme } from './content/siteTheme'
import './styles.css'

applySiteTheme()

const root = document.getElementById('root')

if (!root) {
  throw new Error('Application root element was not found.')
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
