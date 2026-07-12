# Agent Instructions

## 1. Read First

Before making code changes, read:

1. `docs/README.md`
2. `CONTEXT.md`
3. `docs/prd.md`
4. `docs/design.md`
5. `docs/engineering.md`
6. `docs/agent-build-plan.md`
7. `docs/task-breakdown.md`
8. Relevant ADRs in `docs/adr/`

## 2. Project Shape

This project is a custom React storefront for Hands Heart.

Use:

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- TanStack Query
- Shopify Storefront API
- Cloudflare Pages
- Cloudflare Pages Functions for contact form handling

## 3. Hard Boundaries

Do not:

- Implement custom checkout.
- Collect payment information in React.
- Expose secret credentials in frontend code.
- Call Shopify directly from presentation components.
- Add advanced search or faceted filtering without approval.
- Add custom Shopify app development.
- Add heavy marketing pixels or ecommerce analytics for launch.
- Treat placeholder content as final content.
- Import, ship, export, or redistribute proprietary reference images from `assets/reference/`.
- Change hosting away from Cloudflare Pages without approval.
- Change the agreed stack without approval.

## 4. Implementation Rules

- Keep Shopify GraphQL calls in a dedicated Shopify client module.
- Use typed commerce data instead of loose `any` API responses.
- Use TanStack Query for Shopify-backed server state.
- Use Shopify cart APIs as the source of truth for cart data.
- Store only the Shopify cart ID locally.
- Send checkout actions to Shopify `checkoutUrl`.
- Build designed loading, empty, and error states.
- Follow `docs/design.md` as the binding visual north star.
- Inspect all images in `assets/reference/` before visual implementation and match them as closely as practical without using them as production assets.
- Treat `assets/brand/heart-hands.svg` as the canonical heart hands drawing unless the user provides a newer approved asset.

## 5. Verification

Before marking work complete, run the relevant checks in `docs/verification-checklist.md`.

At minimum after code exists:

- Build must pass.
- TypeScript check must pass.
- Core routes must load.
- Product, variant, cart, checkout handoff, and contact form flows must be manually verified when configured.

## 6. Documentation

Keep docs and implementation aligned. If an implementation decision changes a binding architecture choice, ask the user first and update or add an ADR after approval.
