---
type: Owner Setup Guide
status: setup required before launch
client: "[[Hands Heart]]"
project: Hands Heart Website Redesign
created: July 12, 2026
---
# Hands Heart: Simple Setup Guide

Use this guide to connect the services and prepare the site for launch. It is
written for the project owner. The detailed implementation handoff for a future
developer or agent remains in [handoff.md](handoff.md).

Do these steps in order. Do not put an Admin API token, webhook secret, or
payment information in this repository or any `VITE_` environment variable.

## Before You Start

You will need access to:

- the Hands Heart Shopify admin
- the Cloudflare account that will host the site
- the domain/DNS account
- a webhook destination that delivers contact messages to the approved inbox

You will also need final Shopify products, images, policies, and a decision on
the production domain. These are launch requirements, not optional polish.

## 1. Check the Site Locally

1. In a terminal, open this project folder.
2. Run `npm ci` once to install dependencies.
3. Run `npm run dev`.
4. Open the local URL shown in the terminal.
5. Review Home, About, Shop, a Product route, Cart, and the contact form.

The site is safe to run with no Shopify values. In that state, the public pages
load and the commerce pages show their setup state.

## 2. Prepare Shopify

1. Create or finish every launch product in Shopify: title, handle,
   description, price, variants, availability, and web-ready images.
2. Make each product available to the Storefront API sales channel.
3. Create a **public Storefront API access token** with product-reading and
   cart permissions. This token is intended for a storefront client; it is not
   an Admin API token.
4. Note these three values:
   - Store domain, such as `your-store.myshopify.com`
   - Public Storefront API token
   - Storefront API version supported by the store

Shopify's current Storefront access-token documentation is the source of truth
if its admin interface differs from these steps: [Shopify Storefront API
tokens](https://shopify.dev/docs/api/admin-graphql/unstable/objects/StorefrontAccessToken).

## 3. Connect Shopify Locally

1. Open the blank `.env` file in the repository root. It is ignored by Git.
2. Add only these public values:

   ```dotenv
   VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
   VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_public_storefront_token
   VITE_SHOPIFY_API_VERSION=your_supported_api_version
   ```

3. Stop and restart `npm run dev`.
4. Open `/shop`, then one real `/products/<handle>` page.
5. Add an available variant to the bag, refresh, change quantity, remove it,
   and use checkout. Checkout must open Shopify's hosted checkout.

If the shop remains in setup mode, recheck the domain, token, API version, and
Storefront API availability for the product. Never substitute an Admin token.

## 4. Set Up Contact Delivery

1. Create a webhook endpoint in a service you control that sends each contact
   message to the approved recipient inbox.
2. Keep its URL private. If the endpoint needs a bearer token, keep that
   private too.
3. Do not put either value in `.env` or any `VITE_` variable. They belong only
   in Cloudflare in step 6.

The contact form sends name, email, message, and submission time to the webhook
through the Cloudflare function. The recipient, retention policy, and ownership
of that inbox must be approved before launch.

## 5. Create the Cloudflare Pages Project

1. In Cloudflare, go to **Workers & Pages** and create a Pages project from
   this GitHub repository.
2. Use `main` as the production branch.
3. Set the build command to `npm run build`.
4. Set the build output directory to `dist`.
5. Create a preview deployment first. Do not launch production yet.

This project includes a Pages Function for `/api/contact`; use Git integration
for this project. Cloudflare's current Pages setup documentation is here:
[Git integration](https://developers.cloudflare.com/pages/get-started/git-integration/) and
[build configuration](https://developers.cloudflare.com/pages/configuration/build-configuration/).

## 6. Add Cloudflare Environment Values

In the Pages project, open **Settings → Variables and Secrets**. Add the
following values to both Preview and Production, then redeploy after changing
them.

Public build values:

```dotenv
VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_public_storefront_token
VITE_SHOPIFY_API_VERSION=your_supported_api_version
VITE_PUBLIC_SITE_URL=https://your-final-domain.com
```

Server-only contact values:

```dotenv
CONTACT_DELIVERY_PROVIDER=webhook
CONTACT_DELIVERY_WEBHOOK_URL=your_private_webhook_url
CONTACT_DELIVERY_WEBHOOK_TOKEN=optional_private_bearer_token
```

Only the four `VITE_` entries are public build-time configuration. The three
`CONTACT_` values must stay server-only. Cloudflare's variable instructions are
kept current in its [Pages Functions bindings documentation](https://developers.cloudflare.com/pages/functions/bindings/).

## 7. Test the Preview Deployment

On the Cloudflare preview URL, verify:

- Home, About, Shop, Cart, and real product pages load directly.
- Product prices, variants, availability, and images are correct.
- Add-to-bag, refresh, quantity change, remove, and Shopify checkout work.
- A real contact message reaches the approved recipient.
- Invalid contact input and a failed delivery show safe error messages.
- The site works on desktop and mobile.

Do not proceed if checkout or contact delivery fails.

## 8. Add the Domain and Analytics

1. Attach the approved production domain to the Pages project and make the DNS
   changes Cloudflare requests.
2. Confirm HTTPS works and choose the canonical version of the domain (for
   example, whether `www` redirects to the root domain).
3. Confirm `VITE_PUBLIC_SITE_URL` exactly matches that canonical HTTPS URL,
   then redeploy.
4. Enable Cloudflare Web Analytics in the Pages/Cloudflare dashboard.
5. Visit the production site and confirm basic traffic appears in Cloudflare.

Do not add marketing pixels, ecommerce event tracking, or another analytics
script as part of this setup.

## 9. Final Content Review

Before launch, approve or replace:

- the draft brand copy in `src/content/siteCopy.ts`
- homepage preview tiles, or connect them to an approved Shopify source
- final product data and images in Shopify
- privacy, shipping, return, and any other required policy links/copy
- contact recipient and any footer/social details

The draft copy is intentionally not represented as final approved launch copy.

## 10. Run the Final Checks

From the project folder, run:

```sh
npm run typecheck
npm run lint
npm run test:shopify-env
npm run build
```

Then complete every item in [verification-checklist.md](verification-checklist.md)
against the configured preview and production site. T017 is only complete when
those results and any approved exceptions are documented.

## When You Are Done

The site is ready to launch only when Shopify, contact delivery, Cloudflare,
domain/HTTPS, analytics, final content/legal items, and the verification
checklist are all complete. If one is missing, keep the site in preview.
