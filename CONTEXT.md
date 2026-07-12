# Hands Heart Website Redesign

This context defines the language for the Hands Heart website redesign, a custom marketing and commerce frontend backed by Shopify for product data and checkout.

## Language

**Custom Storefront**:
The React website experience that presents the brand, product catalog, product details, and cart using Shopify Storefront API data.
_Avoid_: Shopify theme, Shopify-hosted storefront

**Shopify Checkout**:
The hosted Shopify payment and order completion flow that begins after the custom cart hands off checkout.
_Avoid_: Custom checkout, React checkout

**Cart**:
The customer-managed set of selected products and variants maintained through Shopify cart APIs before checkout begins.
_Avoid_: Checkout, order

**Cart ID**:
The Shopify identifier stored by the custom storefront so a returning visitor can continue the same Shopify-backed cart.
_Avoid_: Local cart record, session cart

**Product Handle**:
The stable Shopify URL handle used by the custom storefront to route visitors to a specific product detail page.
_Avoid_: Product slug, product ID in URL

**Prerendered Route**:
A public React route rendered to static HTML during the build so visitors, crawlers, and social previews receive meaningful page content before client-side JavaScript runs.
_Avoid_: Server-rendered page, dynamic backend route

**Collection Filter**:
A simple shop control that lets visitors narrow products by Shopify collection when collections are available.
_Avoid_: Faceted search, advanced filtering

**Variant**:
A purchasable Shopify product option combination, such as a specific size or color, that determines price, availability, and the cart line item to add.
_Avoid_: Option, product type

**Contact Submission**:
A message sent by a visitor through the website contact form and processed by a Cloudflare Pages Function.
_Avoid_: Email signup, support ticket

**Launch Analytics**:
Basic first-launch traffic measurement provided by Cloudflare Web Analytics.
_Avoid_: Ecommerce tracking, marketing pixel suite

**Placeholder Content**:
Temporary copy, product data, or imagery used to build and review the site before final client-provided materials are available.
_Avoid_: Final content, production asset

**Launch Content**:
Client-approved copy, product data, product imagery, brand assets, and business information required before production launch.
_Avoid_: Placeholder content, draft content

**Verification Gate**:
The required set of automated checks and manual commerce-flow QA that must pass before implementation work is considered ready for launch review.
_Avoid_: Smoke test, final approval

**Handoff Documentation**:
A lightweight operational document that explains how to configure, run, deploy, and maintain the delivered website at a basic level.
_Avoid_: Maintenance contract, training manual

**Shopify Client**:
The dedicated integration layer responsible for making Storefront API requests and returning normalized data to the React app.
_Avoid_: Component-level Shopify fetch, raw storefront calls

**Server State**:
Remote Shopify data such as products, collections, product details, and cart contents managed in React through a query/cache layer.
_Avoid_: Local UI state, static content

**Empty State**:
A designed visitor-facing state shown when expected content, such as products or collections, is unavailable.
_Avoid_: Blank section, hidden failure

**Error State**:
A designed visitor-facing state shown when a requested action or data load cannot be completed.
_Avoid_: Raw API error, console-only failure

**Commerce Type**:
A TypeScript type that represents Shopify-backed commerce data such as products, variants, cart lines, prices, and checkout URLs.
_Avoid_: Any-shaped Shopify data, loose API response
