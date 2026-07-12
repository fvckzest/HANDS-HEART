# Hands Heart Storefront

Hands Heart is a custom React storefront for the brand's marketing pages,
catalog, product details, and Shopify-backed cart. Shopify remains responsible
for inventory, checkout, payment, and order completion; Cloudflare Pages hosts
the site and its contact-form function.

This repository is implementation-complete but **not launch-ready**. Shopify,
Cloudflare, contact-delivery, domain, final content, legal links, and live-flow
verification still require owner configuration.

## Run Locally

Use a current Node.js LTS release compatible with Vite 7 and the npm version
that ships with it. This repository does not currently pin a Node version.

```sh
npm ci
npm run dev
```

The local app intentionally supports placeholder mode. With the Shopify values
blank, the homepage and public static routes render, while `/shop` and product
routes show their designed configuration states instead of making live requests.

When you are ready to connect Shopify, use the plain-English [owner setup
guide](docs/owner-setup-guide.md). The detailed technical [agent handoff
runbook](docs/handoff.md) remains available for future maintenance.

## Checks

```sh
npm run typecheck
npm run lint
npm run test:shopify-env
npm run build
npm run preview
```

`npm run build` type-checks, builds, and prerenders public routes. It requires a
headless browser: the committed script uses macOS Google Chrome when available,
otherwise Puppeteer's bundled browser (or `PUPPETEER_EXECUTABLE_PATH` when
provided).

## Project Boundaries

- React owns the custom storefront and cart UI.
- Shopify Storefront API owns product, variant, availability, cart, and hosted
  checkout data.
- The browser stores only the Shopify cart ID; Shopify remains the cart source
  of truth.
- Cloudflare Pages hosts `dist`; its Pages Function receives contact submissions
  at `/api/contact`.
- React never collects payment details and never implements custom checkout.
- `assets/reference/` contains proprietary visual references only. Do not ship,
  export, or reuse them as production assets.

## Documentation

- [Owner setup guide](docs/owner-setup-guide.md)
- [Operational handoff runbook](docs/handoff.md)
- [Asset and access checklist](docs/asset-checklist.md)
- [Verification checklist](docs/verification-checklist.md)
- [Engineering architecture](docs/engineering.md)
- [Task breakdown](docs/task-breakdown.md)
