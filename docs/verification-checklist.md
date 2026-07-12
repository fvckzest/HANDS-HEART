---
type: Verification Checklist
status: draft
client: "[[Hands Heart]]"
project: Hands Heart Website Redesign
created: July 11, 2026
version: 0.1
references:
  - docs/engineering.md
---
# Hands Heart Verification Checklist

## 1. Purpose

This checklist defines the minimum verification required before implementation work is considered ready for launch review.

Agents should update this checklist during the build or copy it into a release note with pass/fail status.

---
## 2. Automated Checks

| Check | Required | Status | Notes |
| --- | --- | --- | --- |
| Install dependencies succeeds | Yes | Pending | Run after scaffold |
| `npm run build` passes | Yes | Pending | Required before review |
| TypeScript check passes | Yes | Pending | Command may be `npm run typecheck` |
| Lint check passes | If configured | Pending | Command may be `npm run lint` |
| Tests pass | If configured | Pending | Command may be `npm test` |

---
## 3. Page And Route QA

| Flow | Required | Status | Notes |
| --- | --- | --- | --- |
| Homepage loads on desktop | Yes | Pending | Check first viewport |
| Homepage loads on mobile | Yes | Pending | Check no overlapping text |
| Navigation works | Yes | Pending | Header/footer links |
| `/shop` renders products | Yes | Pending | Live or placeholder mode |
| `/products/:handle` renders product detail | Yes | Pending | Use real handle when available |
| Unknown product handle shows not-found state | Yes | Pending | No raw API error |
| `/cart` route renders | Yes | Pending | Full-page fallback |

---
## 4. Commerce QA

| Flow | Required | Status | Notes |
| --- | --- | --- | --- |
| Product variant selection works | Yes | Pending | Size/color/etc. if present |
| Unavailable variant cannot be added | Yes | Pending | Clear unavailable state |
| Add to cart works | Yes | Pending | Uses selected variant ID |
| Cart persists by Shopify cart ID | Yes | Pending | Browser refresh/revisit |
| Cart quantity update works | Yes | Pending | Shopify-backed mutation |
| Cart remove works | Yes | Pending | Shopify-backed mutation |
| Cart totals render from Shopify | Yes | Pending | No local-only totals |
| Checkout button opens Shopify checkout | Yes | Pending | Uses `checkoutUrl` |
| React does not collect payment data | Yes | Pending | Must remain true |

---
## 5. Contact Form QA

| Flow | Required | Status | Notes |
| --- | --- | --- | --- |
| Required fields validate client-side | Yes | Pending | Missing name/email/message |
| Server-side validation works | Yes | Pending | Cloudflare Pages Function |
| Spam protection exists | Yes | Pending | Basic launch protection |
| Successful submission shows confirmation | Yes | Pending | No ambiguous state |
| Failed submission shows clear error | Yes | Pending | No raw provider error |
| Secret values are server-side only | Yes | Pending | No frontend exposure |

---
## 6. SEO And Metadata QA

| Check | Required | Status | Notes |
| --- | --- | --- | --- |
| Homepage title and description exist | Yes | Pending | |
| Shop title and description exist | Yes | Pending | |
| Product title and description exist | Yes | Pending | Product-specific where possible |
| Open Graph metadata exists | Yes | Pending | Image where available |
| Canonical URL exists where practical | Yes | Pending | |
| Sitemap exists if practical | Preferred | Pending | |
| Public routes prerender where practical | Preferred | Pending | |

---
## 7. Accessibility QA

| Check | Required | Status | Notes |
| --- | --- | --- | --- |
| Keyboard navigation works | Yes | Pending | Header, cart, forms |
| Focus states are visible | Yes | Pending | |
| Cart drawer focus behavior works | If drawer exists | Pending | Escape closes |
| Form labels are accessible | Yes | Pending | |
| Image alt text exists where appropriate | Yes | Pending | |
| Text contrast is sufficient | Yes | Pending | |
| No hover-only critical interactions | Yes | Pending | |

---
## 8. Responsive Visual QA

| Check | Required | Status | Notes |
| --- | --- | --- | --- |
| Mobile layout has no overlapping text | Yes | Pending | |
| Desktop layout has no overlapping text | Yes | Pending | |
| Product cards remain stable | Yes | Pending | |
| Buttons fit labels | Yes | Pending | |
| Hero leaves site content discoverable | Yes | Pending | Per PRD/design guidance |
| Product imagery is not distorted | Yes | Pending | |
| Visual implementation follows `docs/design.md` | Yes | Pending | |
| Homepage is close to `assets/reference/home.png` | Yes | Pending | Reference image must not ship |
| Shop page is close to `assets/reference/shop.png` | Yes | Pending | Reference image must not ship |
| About page is close to `assets/reference/about.png` if implemented | If implemented | Pending | Reference image must not ship |
| Contact page is close to `assets/reference/contact.png` | Yes | Pending | Reference image must not ship |
| Additional reference images were inspected | Yes | Pending | Check all files in `assets/reference/` |

---
## 9. Launch Readiness

| Check | Required | Status | Notes |
| --- | --- | --- | --- |
| Placeholder content removed | Yes | Pending | Before production |
| Final products loaded in Shopify | Yes | Pending | Before production |
| Final images loaded | Yes | Pending | Before production |
| Contact recipient configured | Yes | Pending | Before production |
| Cloudflare deployment configured | Yes | Pending | Before production |
| Domain/DNS configured | Yes | Pending | Before production |
| Cloudflare Web Analytics configured | Yes | Pending | Before production |
| Handoff documentation complete | Yes | Pending | Before delivery |
