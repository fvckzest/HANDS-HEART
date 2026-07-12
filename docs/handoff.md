---
type: Handoff Runbook
status: implementation complete, launch configuration pending
client: "[[Hands Heart]]"
project: Hands Heart Website Redesign
created: July 12, 2026
references:
  - README.md
  - docs/engineering.md
  - docs/asset-checklist.md
  - docs/verification-checklist.md
  - docs/cloudflare-analytics.md
---
# Hands Heart Handoff Runbook

## 1. Purpose and Current Status

This is the operating guide for the Hands Heart custom storefront. Source code
lives in this repository; the production Cloudflare Pages project name, public
domain, service credentials, contact recipient, and final launch content are
not configured in the repository and remain **action required**.

Implementation is ready for integration work, but the website is not
launch-ready until the blockers in [section 10](#10-launch-blockers-and-t017)
are resolved and T017 is actually completed.

### Stack

- React, TypeScript, Vite, Tailwind CSS, React Router, and TanStack Query
- Shopify Storefront API for catalog, variants, availability, cart data, and
  checkout URL
- Cloudflare Pages for static hosting and Cloudflare Pages Functions for contact
  delivery
- Cloudflare Web Analytics for lightweight launch traffic visibility

### Operational Ownership

| System | Owns | Does not own |
| --- | --- | --- |
| React storefront | Marketing pages, `/about`, `/shop`, `/products/:handle`, cart UI, route metadata, and designed states | Payment collection, order completion, Shopify inventory, or secret delivery credentials |
| Shopify | Products, product handles, variants, prices, inventory/availability, cart source of truth, checkout URL, payment, and orders | The custom React visual experience or Cloudflare deployment |
| Cloudflare Pages | Static `dist` hosting, preview/production deployments, domain/DNS/SSL when configured, and the `/api/contact` Pages Function | Shopify checkout, product management, or payment |
| Contact webhook provider | Receipt and onward handling of validated contact submissions | Browser form UI or client-side secrets |

### Explicitly Out of Scope

- Custom checkout or collection of payment data in React
- Custom Shopify app development
- Advanced search, faceted filtering, or a custom recommendation engine
- Ecommerce event tracking, marketing pixels, session replay, or heavy
  analytics
- Ongoing maintenance, new pages/features, product photography, or final
  copywriting beyond the agreed delivery scope

## 2. Local Development and Build

### Requirements

- A current Node.js LTS release compatible with Vite 7. No Node version is
  currently pinned in the repository; confirm the chosen runtime in CI and
  Cloudflare before launch.
- npm (the project uses `package-lock.json`).
- A headless browser for prerendering. On macOS, the build script uses Google
  Chrome when found at the standard application path. Otherwise Puppeteer uses
  its bundled browser; set `PUPPETEER_EXECUTABLE_PATH` only when an alternate
  browser location is required.

### Commands

Run these from the repository root:

```sh
npm ci
npm run dev
```

`npm run dev` starts the Vite development server. Use its printed local URL.

```sh
npm run typecheck
npm run lint
npm run test:shopify-env
npm run build
npm run preview
```

- `npm run typecheck` runs the TypeScript project build without emitting a
  release artifact.
- `npm run lint` runs ESLint.
- `npm run test:shopify-env` verifies that the browser build keeps Shopify
  configuration fallback safe when local public variables are missing.
- `npm run build` runs TypeScript, Vite, then `npm run prerender`; it writes the
  deployable static output to `dist`.
- `npm run preview` serves the already-built `dist` output locally.

### Placeholder Mode and Prerendering

With these variables blank, the app intentionally runs in placeholder mode:
`VITE_SHOPIFY_STORE_DOMAIN`, `VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN`, and
`VITE_SHOPIFY_API_VERSION`. The public static routes `/`, `/about`, `/shop`,
and `/cart` still prerender. The shop and product UI show designed
configuration states; product requests are not attempted.

When all three Shopify values are set, product snapshots are still opt-in. Set
the server/build environment variable `SHOPIFY_PRERENDER_PRODUCT_HANDLES` to a
comma-separated list of real Shopify product handles to prerender those product
routes. If it is blank, the build intentionally skips product snapshots. Verify
the resulting `dist/index.html`, `dist/about/index.html`, `dist/shop/index.html`,
`dist/cart/index.html`, and any requested `dist/products/<handle>/index.html`
before deployment.

## 3. Environment Configuration

Use `.env.example` as the variable inventory. Do not commit real values, create
frontend variables for server-only delivery values, or put an Admin API token
in any `VITE_` variable.

For local Shopify development, create an uncommitted `.env.local` from
`.env.example` and supply only the public `VITE_` values. The local Vite server
does not emulate Cloudflare Pages Functions through a committed command, so
test real contact delivery on a Cloudflare Pages preview deployment after
configuring its server-side variables.

| Variable | Exposure and location | Required for | Action / notes |
| --- | --- | --- | --- |
| `VITE_SHOPIFY_STORE_DOMAIN` | Public browser value; `.env.local` locally and Cloudflare Pages build environment in deployment | Live Shopify requests | **Action required:** use the Shopify storefront domain, normally `your-store.myshopify.com`; the client normalizes an optional protocol/trailing slash. |
| `VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN` | Public browser value; `.env.local` locally and Cloudflare Pages build environment in deployment | Live Shopify requests and product prerendering | **Action required:** browser-safe Storefront API token only. Never use an Admin API token. |
| `VITE_SHOPIFY_API_VERSION` | Public browser value; `.env.local` locally and Cloudflare Pages build environment in deployment | Live Shopify requests and product prerendering | **Action required:** pin a Storefront API version supported by the configured store. |
| `VITE_PUBLIC_SITE_URL` | Public browser/build value; `.env.local` locally and Cloudflare Pages build environment in deployment | Production canonical and Open Graph URLs | **Action required:** set the final HTTPS domain without a path. Blank is acceptable for local work only. |
| `SHOPIFY_PRERENDER_PRODUCT_HANDLES` | Server/build-only; Cloudflare Pages build environment, not a `VITE_` value | Optional static product snapshots | Optional. Comma-separated real product handles; leave blank to skip product snapshots intentionally. |
| `CONTACT_DELIVERY_PROVIDER` | Server-only Pages Function variable; Cloudflare Pages environment settings | Live contact delivery | **Action required:** current implementation accepts only `webhook`. |
| `CONTACT_DELIVERY_WEBHOOK_URL` | Server-only Pages Function secret/variable; Cloudflare Pages environment settings | Live contact delivery | **Action required:** HTTPS endpoint owned by the selected delivery workflow. Do not commit it. |
| `CONTACT_DELIVERY_WEBHOOK_TOKEN` | Server-only Pages Function secret; Cloudflare Pages environment settings | Optional authenticated webhook delivery | Optional bearer token forwarded only by the Pages Function. Do not prefix with `VITE_`. |

Configure public build values and server-only function values separately for
Cloudflare **Preview** and **Production** environments. Use the provider's
secret mechanism for the webhook URL/token when available. Redeploy after any
build environment change; Vite embeds `VITE_` values during the build.

## 4. Shopify Hookup

### 4.1 Configure Storefront Access

1. Obtain Shopify admin access for the target store. This is currently
   **action required**.
2. In Shopify's current Storefront API access-token workflow, create or obtain
   a browser-safe Storefront API token with the storefront permissions needed
   to read products and operate carts. Do not use an Admin API credential.
3. Record the store's storefront domain, chosen supported Storefront API
   version, and public token in the corresponding `VITE_` values for local
   development and Cloudflare Pages.
4. Restart local Vite after changing `.env.local`, or trigger a new Cloudflare
   build after changing Pages build variables.
5. Open `/shop` and a known `/products/<handle>` route. Confirm that the
   placeholder configuration state is replaced by live catalog data without
   exposing any secret credential.

### 4.2 Prepare Catalog Data

1. Add and publish final products in Shopify with stable handles, title,
   description, price, availability, variants, and web-ready product images.
2. Confirm each intended product is available to the Storefront API channel and
   can be fetched through the public token.
3. Use the exact Shopify **product handle** in URLs and, if desired, in
   `SHOPIFY_PRERENDER_PRODUCT_HANDLES`. Product handles are the stable routing
   identifier for `/products/:handle`.
4. Exercise available and unavailable variants. The storefront must only allow
   available selected variants to be added.
5. Collections are queried by the data layer but collection filtering is not
   enabled in the current shop UI. If a simple collection filter is approved
   later, create and maintain Shopify collections there; do not add advanced or
   faceted filtering without approval.

### 4.3 Homepage Featured Products

The current homepage feature tiles use clearly marked visual-preview records in
`src/content/siteCopy.ts`, surfaced through
`src/components/home/homeContent.ts`. They are not automatically driven by a
Shopify collection today, even though the Shopify data layer provides a bounded
featured-products query. Before launch, replace the preview records with
approved product content and decide the operational source for featured
products. Using a Shopify collection or connecting the existing query is a
follow-up code change; do not represent the preview tiles as final product
data.

### 4.4 Cart and Checkout Verification

1. From a live product page, select a valid variant and add it to the cart.
2. Refresh the browser and confirm the Shopify cart persists via its locally
   stored cart ID; Shopify remains the source of truth for lines, prices,
   totals, availability, and checkout URL.
3. Change quantity and remove a line; confirm returned Shopify cart data updates
   the UI.
4. Use checkout and confirm the browser opens the Shopify-provided
   `checkoutUrl`.
5. Complete a test order through Shopify's approved test process if available.
   The custom React app must never collect payment information.

## 5. Cloudflare Pages Hookup

### 5.1 Create and Configure the Project

1. Obtain access to the Cloudflare account that will own the project. This is
   **action required**.
2. Create a Cloudflare Pages project connected to this repository. Record the
   project name outside the repository; no project name is currently approved
   here.
3. Set the production branch to `main`.
4. Set the build command to `npm run build`.
5. Set the build output directory to `dist`.
6. Configure the values from [section 3](#3-environment-configuration) in the
   correct Preview and Production environments, keeping `CONTACT_*` values
   server-only.
7. Deploy a branch preview first. Cloudflare Pages serves the static build and
   automatically maps `functions/api/contact.ts` to `/api/contact` in that
   deployment.
8. After preview verification, merge/push the approved `main` commit and verify
   the production deployment.

Cloudflare project settings, account access, and domain values are external
operational state. Do not add a project identifier or token to source control.

### 5.2 Preview and Production Checks

- A branch commit should create a preview deployment when the Pages project is
  connected to the repository; confirm this behavior in the Cloudflare account.
- `main` is the intended production branch. Confirm the production URL after
  deployment.
- Inspect prerender output in the built artifact and load `/`, `/about`,
  `/shop`, `/cart`, plus configured product routes from the deployment.
- Confirm `/api/contact` accepts only expected requests and returns safe errors
  when its delivery configuration is absent or invalid.

### 5.3 Domain, DNS, and SSL

The production domain, DNS owner, and Cloudflare Pages project are not yet
provided. Before launch:

1. **Action required:** choose and approve the production HTTPS domain.
2. **Action required:** use the domain registrar or Cloudflare DNS account to
   attach the domain to the Pages project and create the records Cloudflare
   requests.
3. Confirm the domain is active, HTTPS/SSL is valid, and both root and any
   required `www` behavior match the chosen domain policy.
4. Set `VITE_PUBLIC_SITE_URL` to that canonical HTTPS domain and redeploy.
5. Recheck canonical tags, Open Graph URLs, direct route loads, and contact
   delivery on the final domain.

## 6. Contact Delivery Hookup

The browser submits JSON to `POST /api/contact`. The Cloudflare Pages Function
validates name, email, and message; rejects unexpected methods; and uses a
hidden `website` honeypot to reject basic bot submissions. Visitor-facing
responses intentionally do not expose provider errors.

### Webhook Contract

The only configured delivery adapter is `webhook`. Set
`CONTACT_DELIVERY_PROVIDER=webhook` and supply the server-only webhook URL. The
Pages Function sends an HTTPS `POST` with `Content-Type: application/json` and
this shape:

```json
{
  "type": "contact_submission",
  "submittedAt": "ISO-8601 timestamp",
  "name": "visitor name",
  "email": "visitor email",
  "message": "visitor message"
}
```

When `CONTACT_DELIVERY_WEBHOOK_TOKEN` is set, it is sent as an `Authorization:
Bearer <token>` header by the Pages Function only. The webhook owner is
responsible for routing the message to the approved recipient, handling storage
and retention, and protecting that destination. The final recipient and
delivery-provider account are **action required** and must not be committed.

### Test Procedure

1. Configure the three `CONTACT_*` values in a Cloudflare Pages preview
   environment.
2. Deploy the preview and submit a valid message through the homepage contact
   form.
3. Confirm the webhook receives the expected fields and delivers to the
   approved recipient.
4. Submit with missing/invalid fields and confirm client and server validation
   show safe messages.
5. Submit with the hidden honeypot populated using a controlled request and
   confirm it is rejected.
6. Temporarily use a controlled failing delivery endpoint or disable the
   provider setting in preview; confirm the visitor sees a safe error, not a raw
   provider response.
7. Repeat a valid submission in production after recipient approval.

## 7. Analytics

Launch analytics are deliberately limited to Cloudflare Web Analytics. Follow
[Cloudflare Web Analytics](cloudflare-analytics.md) after the Pages production
project exists: enable the managed integration in the Cloudflare dashboard,
redeploy, visit production routes, and verify basic page-level traffic appears.

Do not add a repository tracking snippet, token, ecommerce events, Meta Pixel,
Google ecommerce analytics, session replay, heatmaps, or custom conversion
pipeline without an explicitly approved scope change.

## 8. Content Update Map

| Content or asset | Current location / owner | Before launch |
| --- | --- | --- |
| Homepage, About, shop, cart, contact, footer, and fallback copy | Draft-only copy in `src/content/siteCopy.ts` | **Action required:** obtain final client approval or replace it with approved launch copy; retain clear structure and accessible headings. |
| Homepage featured products | Draft visual-preview records in `src/content/siteCopy.ts`, surfaced through `src/components/home/homeContent.ts` | **Action required:** replace preview tiles and choose/implement an approved Shopify-backed or code-managed source. |
| Product details, variants, availability, prices, and product images | Shopify | **Action required:** publish final web-ready catalog data and verify storefront access. |
| Product social/metadata image | Shopify featured product image when product data is live | **Action required:** supply approved product imagery and verify product metadata. |
| Heart-hands artwork | `assets/brand/heart-hands.svg` | Canonical launch drawing unless the owner supplies a newer approved asset. |
| Footer/legal and policy links | Placeholder footer UI | **Action required:** add approved privacy, terms (if used), shipping, return, contact, and social links/copy. |
| Reference imagery | `assets/reference/` | Never use as a production asset, export it, or redistribute it. It is visual reference only. |

## 9. Verification Summary Template

Use this template in a release note or approved copy of the verification
checklist after live configuration. Do not mark an item passed based only on
implementation status.

```md
## Hands Heart Release Verification

Date:
Environment / deployment URL:
Verifier:

Automated checks:
- [ ] npm ci
- [ ] npm run typecheck
- [ ] npm run lint
- [ ] npm run test:shopify-env
- [ ] npm run build

Manual route, accessibility, responsive, and visual QA:
- [ ] Homepage, About, Shop, Product, Cart, and unknown-product routes
- [ ] Navigation, keyboard focus, cart drawer Escape behavior, labels, and contrast
- [ ] Desktop and mobile layouts against docs/design.md and local references

Live commerce QA:
- [ ] Product/variant availability
- [ ] Add, persist, update, and remove Shopify cart lines
- [ ] Shopify totals and checkoutUrl handoff

Live contact QA:
- [ ] Client validation, Pages Function validation, honeypot, success, and safe failure

SEO / platform QA:
- [ ] Titles, descriptions, canonical URLs, Open Graph values, and prerendered output
- [ ] Cloudflare production deployment, domain/SSL, and Web Analytics

Known issues or exceptions:
Launch blockers remaining:
Placeholder content remaining:
Approval recorded by:
```

## 10. Launch Blockers and T017

The following blockers are currently open per
[the asset and access checklist](asset-checklist.md):

- Shopify store domain, public Storefront API token, API version, and admin
  access
- Published final Shopify product catalog, variants, inventory, and web-ready
  product images
- Final homepage/About/contact/footer copy, social/contact details, and
  approved policy links or copy
- Final contact recipient, delivery-provider/webhook configuration, and a
  successful Pages Function delivery test
- Cloudflare account access, Pages project, production domain, DNS, and SSL
- Cloudflare Web Analytics enablement and observed production traffic
- Final `VITE_PUBLIC_SITE_URL` and production metadata verification
- Completion of every required check in
  [docs/verification-checklist.md](verification-checklist.md)

T017 is **not complete**. It must be run and documented against configured
services and approved launch content; this runbook only prepares that work.

## 11. Support Boundary

The delivery support boundary is a 14-day post-launch period for defects in the
delivered work. New features, new pages, additional functionality, content
updates, third-party service changes, and ongoing maintenance are new work
unless separately agreed. This runbook supports basic operation and launch
configuration; it is not an ongoing maintenance or training commitment.
