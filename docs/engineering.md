---
type: Engineering
status: draft
client: "[[Hands Heart]]"
project: Hands Heart Website Redesign
created: July 11, 2026
version: 0.1
references:
  - docs/prd.md
  - docs/contract.md
  - CONTEXT.md
---
# Hands Heart Website Redesign Engineering Doc

## 1. Overview

This document defines the engineering approach for the Hands Heart Website Redesign. It translates the PRD and contract into implementation decisions, technical boundaries, launch requirements, and agent-ready build guidance.

The project will be built as a custom React storefront using Vite, TypeScript, and Tailwind CSS. The website will present a custom brand-led marketing experience, custom shop and product pages, and a custom cart while relying on Shopify for product data, cart primitives, inventory-sensitive commerce data, checkout, payment, and order completion.

The engineering goal is to keep the site simple, fast, maintainable, and polished while giving Hands Heart a custom storefront experience that does not require custom checkout or custom Shopify app development.

---
## 2. Engineering Goals

The primary engineering goal is to produce a clean, reliable, responsive website that can be implemented quickly without creating unnecessary operational complexity.

The frontend should be intentionally structured so coding agents can work in clear boundaries. Shopify integration should live behind a dedicated integration layer. Presentation components should not make raw Storefront API calls. Cart behavior should be Shopify-backed from the beginning so pricing, availability, variants, totals, and checkout handoff stay aligned with Shopify.

The website should be deployable to Cloudflare Pages and should require only the minimum backend surface needed for launch. The only first-launch backend logic should be Cloudflare Pages Functions for contact form submission.

---
## 3. Technical Stack

**Frontend**
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- TanStack Query

**Commerce**
- Shopify Storefront API
- Shopify product management
- Shopify cart APIs
- Shopify hosted checkout

**Hosting**
- Cloudflare Pages
- Cloudflare Pages Functions for contact form submission
- Cloudflare Web Analytics

**Build Output**
- Static frontend build
- Prerendered public routes where practical
- Cloudflare-compatible function routes for contact form handling

---
## 4. Architecture

The application will be a custom storefront hosted on Cloudflare Pages. React will own the public browsing experience, including the homepage, shop page, product detail pages, and cart UI. Shopify will remain the system of record for product catalog data, product variants, product availability, cart state, checkout URLs, payment, and order completion.

The architecture should separate the application into the following major areas:

- Routing and page composition
- Shared layout and navigation
- Product and collection presentation
- Shopify integration layer
- Server state hooks and mutations
- Cart provider and cart UI
- Contact form UI and Pages Function
- SEO and metadata utilities
- Error, loading, and empty states

Components should consume typed hooks or props. They should not contain embedded Storefront API GraphQL queries unless they are part of the dedicated Shopify integration layer.

---
## 5. Routing

The React app should own the primary public routes.

**Required Routes**
- `/` - homepage
- `/shop` - full product catalog
- `/products/:handle` - product detail page by Shopify product handle
- `/cart` - full cart page or cart fallback route

The cart may also be presented as a drawer or slide-out panel across the site. The `/cart` route should exist so the cart has a shareable, recoverable, and accessible full-page fallback.

Checkout is not a React route. When a visitor chooses to check out, the app should send them to the Shopify-provided `checkoutUrl`.

---
## 6. Rendering And SEO

The project should remain a Vite and React application, but public marketing and product routes should be prerendered at build time where practical.

**Prerender Targets**
- Homepage
- Shop page
- Product detail pages for known Shopify product handles

Prerendering should improve first-load HTML, search indexing, and social previews without introducing a full server-rendered application runtime. If product prerendering requires live Shopify data at build time, the build process must fail clearly when required Shopify environment variables are missing unless a placeholder-development mode is explicitly being used.

Each public page should support:

- Page title
- Meta description
- Canonical URL where applicable
- Open Graph title
- Open Graph description
- Open Graph image where available
- Structured heading hierarchy

The product detail route should generate product-specific metadata when product data is available.

---
## 7. Shopify Integration

Shopify Storefront API integration should be implemented through a dedicated Shopify client module. This module is responsible for GraphQL requests, request errors, response normalization, and returning typed commerce data to the application.

**Required Shopify Data**
- Products
- Product handles
- Product images
- Product titles
- Product descriptions
- Product prices
- Product variants
- Variant availability
- Collections, if available
- Cart data
- Checkout URL

**Required Shopify Operations**
- Fetch featured products
- Fetch all products for shop page
- Fetch collections for simple filtering, if collections exist
- Fetch product by handle
- Create cart
- Fetch cart by cart ID
- Add cart line
- Update cart line quantity
- Remove cart line
- Read checkout URL from cart

The Storefront API access token is expected to be a public storefront token suitable for browser use. Any secret-only credentials must not be exposed to the frontend.

---
## 8. Data Management

TanStack Query should manage Shopify-backed server state.

**Query Responsibilities**
- Product catalog data
- Featured products
- Collections
- Product detail data
- Cart retrieval

**Mutation Responsibilities**
- Cart creation
- Add to cart
- Update cart line
- Remove cart line
- Cart refresh after mutation

The cart ID may be stored locally in the browser so a returning visitor can continue the same Shopify-backed cart. The locally stored cart ID is not the cart source of truth. The Shopify cart response is the source of truth for cart lines, product data, pricing, totals, availability, and checkout URL.

---
## 9. Cart And Checkout

The custom storefront will include custom cart UI. The cart should be backed by Shopify cart APIs from the beginning.

**Cart Requirements**
- Create a Shopify cart when needed
- Persist the Shopify cart ID locally
- Add selected variants to cart
- Show cart line item image, title, variant summary, quantity, price, and subtotal where available
- Update cart line quantity
- Remove cart line
- Show cart totals from Shopify
- Show clear loading and error states during cart mutations
- Link or redirect to Shopify hosted checkout using the cart `checkoutUrl`

**Checkout Boundary**
- Checkout is handled by Shopify.
- Payment is handled by Shopify.
- Order completion is handled by Shopify.
- The React app must not implement custom checkout.
- The React app must not collect payment details.

---
## 10. Product And Catalog Behavior

The shop page should provide a clean product grid with simple catalog controls.

**Included For Launch**
- Product grid
- Product cards with image, title, and price
- Product detail links using Shopify product handles
- Optional collection filter if Shopify collections are configured
- Basic sort if available through a low-complexity Shopify query or client-side sort

**Excluded For Launch**
- Custom search index
- Advanced faceted filtering
- Complex price-range filtering
- Inventory matrix filtering
- Custom recommendation engine
- Custom Shopify app development

Product detail pages must support variants. Visitors should be able to select available product options, see price and availability change when required, and add only a valid selected variant to the cart.

If a selected variant is unavailable, the add-to-cart control should clearly communicate that the variant cannot be added.

---
## 11. Contact Form

The contact form should submit to a Cloudflare Pages Function.

**Contact Form Requirements**
- Client-side validation for obvious missing or malformed fields
- Server-side validation in the Pages Function
- Basic spam protection
- Clear success message after submission
- Clear error message if submission fails
- No raw provider or API errors shown to visitors

The final email delivery mechanism may be configured through a transactional email provider or webhook destination. The engineering implementation should isolate provider-specific logic so the form UI does not depend on the provider directly.

---
## 12. Content And Assets

Development may proceed with placeholder content, placeholder product data, and placeholder imagery. Placeholder content must be clearly marked and easy to replace.

Production launch is blocked until launch content is available and approved.

**Launch Content Required**
- Heart hands drawing
- Logo files, if applicable
- Favicon
- Brand colors, if provided
- Homepage headline
- Supporting homepage copy
- About copy
- Contact email
- Social links
- Footer content
- Privacy Policy
- Terms of Service, if applicable
- Product names
- Product descriptions
- Product pricing
- Product images
- Product variants, if applicable
- Shipping and return policy links or copy

Agents may build the site before final content arrives, but they must not treat placeholder content as final deliverable content.

---
## 13. Visual Implementation

The implementation should follow the PRD visual direction: simple, clean, confident, timeless, approachable, and thoughtful.

The frontend should prioritize:

- Predominantly white layout
- Black typography
- Restrained color usage
- Generous whitespace
- Clear product presentation
- Strong first-viewport presence for the heart hands drawing
- Calm, modern interaction states
- Responsive behavior across desktop, tablet, and mobile

The visual system should support the brand without competing with the heart hands symbol. Product presentation should be simple, well-lit, and consistent.

---
## 14. Accessibility

The site should meet a practical baseline of accessibility for the launch scope.

**Accessibility Requirements**
- Semantic page structure
- Keyboard-accessible navigation and cart controls
- Visible focus states
- Sufficient text contrast
- Accessible form labels and validation messages
- Descriptive image alternative text where appropriate
- Buttons for actions and links for navigation
- No interaction that depends only on hover

The cart drawer, if implemented, must have accessible open/close behavior, focus management, and keyboard escape behavior.

---
## 15. Performance

The site should feel fast on modern devices and current mobile browsers.

**Performance Requirements**
- Optimized image sizes
- Lazy loading for non-critical images
- Avoid unnecessary third-party scripts
- Keep analytics lightweight
- Avoid shipping raw oversized product imagery
- Cache Shopify data through TanStack Query where appropriate
- Keep route-level bundles reasonable

Performance decisions should preserve the restrained visual experience. Heavy animation, large libraries, or unnecessary dynamic effects should be avoided unless they directly serve the brand experience.

---
## 16. Analytics

Launch analytics should use Cloudflare Web Analytics for basic traffic visibility.

**Included**
- Basic page-level traffic metrics
- Lightweight analytics script or Cloudflare-managed analytics setup

**Excluded For Launch**
- Custom ecommerce event tracking
- Marketing pixel suite
- Meta pixel setup
- Google Analytics ecommerce tracking
- Custom conversion dashboard

Additional tracking can be added later if the client requests marketing or ecommerce analytics beyond the launch scope.

---
## 17. Environment Variables

The implementation should document all required environment variables in the project README or handoff documentation.

**Expected Variables**
- `VITE_SHOPIFY_STORE_DOMAIN`
- `VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN`
- `VITE_SHOPIFY_API_VERSION`
- `CONTACT_DELIVERY_PROVIDER` or equivalent
- Contact provider API key or webhook secret, stored server-side only
- Public site URL for metadata and canonical URLs

Secret values must not be committed to source control.

---
## 18. Error And Empty States

The site must fail gracefully when expected data is missing or unavailable.

**Required States**
- Featured products section hides or shows a designed empty state when no featured products exist
- Shop page shows a simple empty catalog message when no products exist
- Product detail route shows a branded not-found state when no product matches the handle
- Shopify API failures show restrained visitor-facing errors with retry where appropriate
- Contact form failures show a clear submission error
- Cart mutation failures preserve the current cart UI and explain that the action did not complete

Raw API errors should never be shown to visitors.

---
## 19. Verification Gate

Implementation work should not be considered ready for launch review until the verification gate passes.

**Automated Checks**
- `npm run build` passes
- TypeScript check passes
- Lint check passes if configured
- Tests pass if configured

**Manual Browser QA**
- Homepage loads on desktop and mobile
- Navigation works
- Shop route renders products
- Product detail route renders by handle
- Product variant selection works
- Add-to-cart works
- Cart quantity update works
- Cart remove works
- Checkout button opens Shopify hosted checkout
- Contact form validates fields
- Contact form submits successfully in the configured environment
- Homepage, shop, and product pages expose appropriate metadata
- Empty and error states are visually acceptable

---
## 20. Handoff Documentation

The delivered project should include lightweight handoff documentation.

**Required Handoff Topics**
- How to run the project locally
- How to build the project
- Required environment variables
- Shopify Storefront API token setup
- Cloudflare Pages build settings
- Cloudflare Pages Function configuration
- Contact form delivery configuration
- Cloudflare Web Analytics setup
- Domain and DNS notes
- How products are updated in Shopify
- Known launch blockers or remaining placeholders

The handoff documentation should be operational and concise. It should not imply ongoing maintenance unless a separate maintenance agreement exists.

---
## 21. Agent Implementation Notes

Agents implementing this project should treat the PRD, contract, glossary, ADRs, and this engineering doc as the source of truth.

**Agent Rules**
- Do not implement custom checkout.
- Do not collect payment information in React.
- Do not expose secret credentials in frontend code.
- Do not call Shopify directly from presentation components.
- Do not add advanced filtering/search unless explicitly approved.
- Do not treat placeholder content as final content.
- Do not add heavy analytics or marketing pixels for launch.
- Do not create custom Shopify apps.
- Preserve the restrained visual direction from the PRD.
- Verify core commerce flows before marking work complete.

When a decision is unclear, agents should prefer the simplest implementation that satisfies this document and preserves the launch scope.

---
## 22. Open Items

The following items must be confirmed before production launch:

- Final Shopify store domain
- Storefront API access token
- Shopify API version
- Final product catalog and variants
- Final product imagery
- Final heart hands artwork file
- Final copy
- Contact form recipient and delivery provider
- Production domain
- DNS access
- Privacy Policy and Terms of Service requirements
- Cloudflare account and deployment access

These open items do not block initial implementation, but they do block final production launch.

---
## 23. Related Decisions

The following ADRs record decisions made while preparing this engineering document:

- `docs/adr/0001-shopify-backed-custom-cart.md`
- `docs/adr/0002-custom-storefront-routes.md`
- `docs/adr/0003-prerender-public-storefront-routes.md`
- `docs/adr/0004-cloudflare-pages-function-for-contact.md`
- `docs/adr/0005-shopify-data-layer.md`
