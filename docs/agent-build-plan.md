---
type: Agent Build Plan
status: draft
client: "[[Hands Heart]]"
project: Hands Heart Website Redesign
created: July 11, 2026
version: 0.1
references:
  - docs/prd.md
  - docs/engineering.md
  - docs/asset-checklist.md
  - docs/verification-checklist.md
---
# Hands Heart Agent Build Plan

## 1. Purpose

This document turns the PRD and engineering doc into an implementation path for coding agents. It defines the recommended order of work, phase boundaries, expected outputs, and verification points.

Agents should complete phases in order unless the user explicitly reprioritizes the work.

---
## 2. Build Principles

- Build the actual storefront, not a landing page placeholder.
- Follow `docs/design.md` and the proprietary images in `assets/reference/` as the visual north star.
- Use TypeScript for commerce data and form data.
- Keep Shopify Storefront API calls inside a dedicated integration layer.
- Use TanStack Query for Shopify-backed server state.
- Use Shopify cart APIs as the cart source of truth.
- Hand off checkout to Shopify hosted checkout.
- Use placeholders only when final launch content is not available.
- Verify each phase before moving to the next.

---
## 3. Phase 0 - Repo Baseline

**Goal**
Create a clean starting point before application code exists.

**Tasks**
- Initialize git if it has not been initialized.
- Commit the docs baseline.
- Confirm the docs listed in `docs/README.md` exist.
- Add `.gitignore` during scaffold if not already present.

**Done When**
- Project docs are committed.
- Working tree is clean before scaffold begins.
- Agents can read `AGENTS.md` and `docs/README.md` before coding.

---
## 4. Phase 1 - Application Scaffold

**Goal**
Create the React application foundation.

**Tasks**
- Scaffold a Vite React TypeScript app.
- Install and configure Tailwind CSS.
- Install and configure React Router.
- Install and configure TanStack Query.
- Establish base folder structure.
- Add lint/type/build scripts.
- Add initial layout shell.

**Expected Structure**
- `src/app/` for app providers and routing
- `src/pages/` for route-level pages
- `src/components/` for shared UI
- `src/features/shopify/` for Shopify integration
- `src/features/cart/` for cart provider, hooks, and UI
- `src/features/contact/` for contact form UI
- `src/lib/` for shared utilities
- `functions/` or Cloudflare-compatible route location for Pages Functions

**Done When**
- App runs locally.
- Build script passes.
- TypeScript check passes.
- Empty page shell renders without runtime errors.

---
## 5. Phase 2 - Visual Foundation

**Goal**
Create the shared UI foundation and brand-led layout.

**Tasks**
- Define Tailwind theme basics.
- Build responsive page layout.
- Build navigation and footer.
- Add homepage sections from the PRD.
- Add placeholder-safe content structure.
- Ensure the heart hands artwork has a first-viewport placement once available.

**Done When**
- Homepage has the required PRD sections.
- Layout works on mobile and desktop.
- Placeholder content is visibly replaceable.
- Visual direction matches the PRD.

---
## 6. Phase 3 - Shopify Data Layer

**Goal**
Create the typed Shopify integration layer.

**Tasks**
- Add environment variable handling.
- Create Shopify client module.
- Define commerce types for products, variants, collections, cart lines, prices, and checkout URL.
- Add product list query.
- Add product by handle query.
- Add collections query if practical.
- Add cart create/fetch/add/update/remove operations.
- Add error handling and normalized responses.

**Done When**
- Components do not call Shopify directly.
- Query functions return typed data.
- Missing environment variables fail clearly.
- Placeholder-development mode is clearly separated from live Shopify mode.

---
## 7. Phase 4 - Shop And Product Routes

**Goal**
Build custom catalog and product detail browsing.

**Tasks**
- Implement `/shop`.
- Implement `/products/:handle`.
- Build product cards.
- Build product image handling.
- Build product detail layout.
- Build variant selector.
- Show price and availability based on selected variant.
- Add not-found state for unknown product handles.

**Done When**
- Shop renders products.
- Product route renders by handle.
- Variant selection works.
- Unavailable variants cannot be added to cart.
- Empty and error states are designed.

---
## 8. Phase 5 - Cart And Checkout Handoff

**Goal**
Build the Shopify-backed custom cart.

**Tasks**
- Create cart provider or cart hooks.
- Persist Shopify cart ID locally.
- Add selected variant to cart.
- Display cart drawer and `/cart` route.
- Update cart line quantity.
- Remove cart line.
- Show Shopify-backed totals.
- Link to Shopify `checkoutUrl`.
- Handle cart mutation loading and error states.

**Done When**
- Cart data is read from Shopify.
- Cart mutations update UI correctly.
- Checkout button opens Shopify hosted checkout.
- React does not implement checkout or collect payment information.

---
## 9. Phase 6 - Contact Form

**Goal**
Build the contact experience.

**Tasks**
- Build contact form UI.
- Add client-side validation.
- Add Cloudflare Pages Function.
- Add server-side validation.
- Add basic spam protection.
- Add provider-isolated delivery logic.
- Add success and error states.

**Done When**
- Contact form validates required fields.
- Contact form submits in configured environment.
- Secrets are server-side only.
- Raw provider errors are not shown to visitors.

---
## 10. Phase 7 - SEO, Prerendering, And Analytics

**Goal**
Prepare the site for indexing, sharing, and basic measurement.

**Tasks**
- Add route metadata helpers.
- Add homepage metadata.
- Add shop metadata.
- Add product metadata.
- Add Open Graph support.
- Add canonical URL support where practical.
- Add sitemap generation if practical.
- Add prerendering for public routes where practical.
- Add Cloudflare Web Analytics setup notes or integration.

**Done When**
- Homepage, shop, and product routes expose appropriate metadata.
- Public routes are prerendered where practical.
- Analytics scope remains lightweight.

---
## 11. Phase 8 - Handoff And Launch Readiness

**Goal**
Prepare the project for review, launch, and handoff.

**Tasks**
- Complete `README.md` implementation instructions.
- Complete handoff documentation from `docs/handoff-outline.md`.
- Complete `docs/asset-checklist.md` status.
- Run `docs/verification-checklist.md`.
- Record any known launch blockers.
- Confirm production domain and Cloudflare settings.

**Done When**
- Verification checklist passes or blockers are documented.
- No placeholder content is treated as final.
- Handoff docs explain run/build/deploy/configuration.
- Production launch blockers are known.

---
## 12. Stop Conditions

Agents should pause and ask the user before:

- Replacing Shopify hosted checkout with custom checkout.
- Adding a custom Shopify app.
- Adding advanced faceted search.
- Adding payment collection in React.
- Adding heavy marketing pixels or ecommerce analytics.
- Changing hosting away from Cloudflare Pages.
- Changing the stack away from React, Vite, TypeScript, Tailwind CSS, React Router, and TanStack Query.
- Treating placeholder content as launch content.
- Making visual changes that fight `docs/design.md` or the proprietary reference images.
