---
type: Asset Checklist
status: draft
client: "[[Hands Heart]]"
project: Hands Heart Website Redesign
created: July 11, 2026
version: 0.1
---
# Hands Heart Asset And Access Checklist

## 1. Purpose

This checklist tracks the content, assets, credentials, and account access needed to build and launch the Hands Heart website.

Development may proceed with placeholders, but production launch is blocked until required launch items are available and approved.

---
## 2. Brand Assets

| Item | Needed For | Status | Notes |
| --- | --- | --- | --- |
| Heart hands drawing | Hero, brand identity, favicon/social previews | Provided | Canonical source: `assets/brand/heart-hands.svg` |
| Logo files, if applicable | Header, footer, metadata | Needed | Use existing branding only |
| Favicon | Browser tab, metadata | Needed | Can be derived from approved brand asset |
| Brand colors | Tailwind theme, accents | Needed | Follow `docs/design.md` and `assets/reference/` |
| Brand typography guidance, if any | Visual system | Optional | Otherwise choose clean contemporary type |

---
## 2.a. Key Brand Asset

The primary heart hands drawing has been added to the repository at:

`assets/brand/heart-hands.svg`

Agents should treat this as the canonical source artwork for the first launch unless the user provides a newer approved version. The app implementation may import this file directly or copy an optimized version into the public asset pipeline during scaffold.

---
## 2.b. Proprietary Reference Assets

The `assets/reference/` folder contains proprietary visual north-star images for the website. These images should be inspected by agents and matched as closely as practical for design direction, but they must not be imported, shipped, exported, redistributed, or used as production site imagery.

Current reference images include:

- `assets/reference/home.png`
- `assets/reference/shop.png`
- `assets/reference/about.png`
- `assets/reference/contact.png`

Additional images added to `assets/reference/` should be treated the same way unless the user says otherwise.

---
## 3. Website Copy

| Item | Needed For | Status | Notes |
| --- | --- | --- | --- |
| Homepage headline | Hero | Needed | Placeholder allowed during build |
| Homepage supporting copy | Hero | Needed | Placeholder allowed during build |
| About copy | About section | Needed | Placeholder allowed during build |
| Contact email | Contact section/form delivery | Needed | Required before contact form launch |
| Footer copy | Footer | Needed | Includes copyright and core links |
| Privacy Policy | Footer/legal | Needed | Required if site collects form submissions |
| Terms of Service | Footer/legal | Needed | Required if client wants link or Shopify requires it |
| Shipping policy | Footer/product trust | Needed | May live in Shopify |
| Return policy | Footer/product trust | Needed | May live in Shopify |

---
## 4. Product Content

| Item | Needed For | Status | Notes |
| --- | --- | --- | --- |
| Product names | Shop/product pages | Needed | Managed in Shopify |
| Product descriptions | Product pages | Needed | Managed in Shopify |
| Product pricing | Shop/product/cart | Needed | Managed in Shopify |
| Product images | Shop/product pages/social previews | Needed | Must be web-ready or optimizable |
| Product variants | Product selection/cart | Needed if applicable | Size/color/etc. |
| Inventory/availability | Add-to-cart behavior | Needed | Managed in Shopify |
| Collections | Shop filtering | Optional | Enables simple collection filter |
| Featured products | Homepage | Needed | Can be collection-driven or configured in code |

---
## 5. Account Access

| Item | Needed For | Status | Notes |
| --- | --- | --- | --- |
| Shopify admin access | Product setup and Storefront API | Needed | Required before live commerce integration |
| Shopify store domain | Environment config | Needed | `VITE_SHOPIFY_STORE_DOMAIN` |
| Storefront API token | Product/cart API | Needed | Public storefront token only |
| Shopify API version | API calls | Needed | `VITE_SHOPIFY_API_VERSION` |
| Cloudflare account access | Hosting/deployment/DNS | Needed | Required before production launch |
| Domain registrar or DNS access | Domain configuration | Needed | May be Cloudflare-managed |
| Contact delivery provider access | Contact form delivery | Needed | Email provider or webhook destination |
| Analytics access | Cloudflare Web Analytics | Needed | Basic launch analytics |

---
## 6. Environment Values

| Variable | Scope | Required | Notes |
| --- | --- | --- | --- |
| `VITE_SHOPIFY_STORE_DOMAIN` | Frontend | Yes | Public storefront domain |
| `VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN` | Frontend | Yes | Public Storefront API token |
| `VITE_SHOPIFY_API_VERSION` | Frontend | Yes | Pin version for predictable API shape |
| `VITE_PUBLIC_SITE_URL` | Frontend/build | Yes | Metadata and canonical URLs |
| `CONTACT_DELIVERY_PROVIDER` | Function | Yes | Provider switch or delivery mode |
| Contact provider API key/webhook secret | Function | Yes | Server-side only |

Secret-only values must never be committed to source control or exposed through Vite frontend variables.

---
## 7. Placeholder Policy

Placeholders are allowed for:

- Product data during frontend layout work
- Product images during visual composition
- Homepage copy
- About copy
- Contact copy
- Policy link labels

Placeholders must be:

- Clearly marked in code or data
- Easy to replace
- Removed before production launch

Placeholders are not acceptable for:

- Final client approval
- Production launch
- Payment/checkout validation
- Legal policies
- Contact form recipient

---
## 8. Launch Blockers

The following block launch if unresolved:

- Missing Shopify store domain
- Missing Storefront API token
- Missing product catalog
- Missing product images
- Missing final contact recipient/delivery configuration
- Missing production domain/DNS access
- Missing required privacy/legal policy links or copy
- Failed verification checklist
