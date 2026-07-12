---
type: Task Breakdown
status: draft
client: "[[Hands Heart]]"
project: Hands Heart Website Redesign
created: July 11, 2026
version: 0.1
references:
  - docs/agent-build-plan.md
  - docs/engineering.md
  - docs/verification-checklist.md
---
# Hands Heart Task Breakdown

## 1. Purpose

This document converts the agent build plan into assignable implementation tickets. It is intended for coding agents once the docs baseline has been committed and application scaffolding begins.

Each task should be treated as a bounded unit of work with clear inputs, outputs, dependencies, and acceptance criteria.

---
## 2. Task Rules

- Read `AGENTS.md`, `CONTEXT.md`, `docs/engineering.md`, and relevant ADRs before starting.
- Read `docs/design.md` before visual or component work.
- Keep changes scoped to the assigned task.
- Do not reverse ADR decisions without explicit approval.
- Do not implement custom checkout.
- Do not expose server-only secrets.
- Update docs if implementation details materially change.
- Run the relevant verification checks before marking a task complete.

---
## 3. Foundation Tasks

### T001 - Initialize Project Scaffold

**Depends On**
- Docs baseline committed

**Inputs**
- `docs/engineering.md`
- `docs/agent-build-plan.md`
- `docs/design.md`
- `AGENTS.md`

**Outputs**
- Vite React TypeScript app
- Tailwind CSS configured
- React Router installed
- TanStack Query installed
- Base scripts for dev, build, typecheck, and lint where practical

**Acceptance Criteria**
- App runs locally.
- Build passes.
- TypeScript check passes.
- Folder structure matches the engineering doc closely.

### T002 - Establish App Shell

**Depends On**
- T001

**Outputs**
- App providers
- Router setup
- Shared layout
- Header
- Footer
- Placeholder-safe page shell

**Acceptance Criteria**
- `/`, `/shop`, `/products/:handle`, and `/cart` routes exist.
- Navigation works.
- Layout is responsive at a basic level.

---
## 4. Visual And Content Tasks

### T003 - Build Homepage Sections

**Depends On**
- T002

**Outputs**
- Hero section
- Featured products section shell
- About section
- Shop preview section
- Contact section placement
- Footer integration

**Acceptance Criteria**
- Homepage matches PRD structure.
- Homepage visually follows `docs/design.md` and `assets/reference/home.png`.
- Placeholder content is clearly replaceable.
- Heart hands artwork location is ready for final asset.

### T004 - Create Shared UI Components

**Depends On**
- T002

**Outputs**
- Buttons
- Links
- Product card shell
- Loading state
- Empty state
- Error state
- Form fields

**Acceptance Criteria**
- Components are reusable.
- Components support accessibility basics.
- Components fit `docs/design.md` and the proprietary reference images.

---
## 5. Shopify Tasks

### T005 - Build Shopify Client

**Depends On**
- T001

**Outputs**
- Shopify Storefront API client
- Environment variable handling
- Typed request/response helpers
- Normalized commerce types

**Acceptance Criteria**
- Shopify API details are isolated.
- Missing config fails clearly.
- No presentation component calls Shopify directly.

### T006 - Implement Product Queries

**Depends On**
- T005

**Outputs**
- Fetch featured products
- Fetch product list
- Fetch product by handle
- Fetch collections if practical

**Acceptance Criteria**
- Product data is typed.
- Product handles support routing.
- Query errors are handled gracefully.

### T007 - Implement Cart API Operations

**Depends On**
- T005

**Outputs**
- Create cart
- Fetch cart
- Add line
- Update line quantity
- Remove line
- Read checkout URL

**Acceptance Criteria**
- Cart data comes from Shopify.
- Cart totals are Shopify-backed.
- Mutations return enough data to refresh UI.

---
## 6. Commerce UI Tasks

### T008 - Build Shop Page

**Depends On**
- T004
- T006

**Outputs**
- `/shop` product grid
- Optional collection filter
- Basic sort if practical
- Empty and error states

**Acceptance Criteria**
- Products render correctly.
- Product cards link to product detail routes.
- No advanced filtering is added.
- Shop route visually follows `docs/design.md` and `assets/reference/shop.png`.

### T009 - Build Product Detail Page

**Depends On**
- T004
- T006

**Outputs**
- `/products/:handle`
- Product gallery
- Product title, description, price
- Variant selector
- Availability state
- Add-to-cart trigger

**Acceptance Criteria**
- Product route works by handle.
- Unknown handle shows a not-found state.
- Unavailable variants cannot be added.

### T010 - Build Cart UI

**Depends On**
- T007
- T009

**Outputs**
- Cart provider or hooks
- Cart drawer
- `/cart` page
- Quantity update controls
- Remove controls
- Checkout handoff button

**Acceptance Criteria**
- Cart ID is persisted locally.
- Cart contents come from Shopify.
- Checkout opens Shopify hosted checkout.
- No payment information is collected in React.

---
## 7. Contact And Platform Tasks

### T011 - Build Contact Form

**Depends On**
- T004

**Outputs**
- Contact form UI
- Client-side validation
- Success state
- Error state

**Acceptance Criteria**
- Required fields validate.
- UI is accessible.
- Contact UI visually follows `docs/design.md` and `assets/reference/contact.png`.
- Raw provider errors are not shown.

### T012 - Build Contact Pages Function

**Depends On**
- T011

**Outputs**
- Cloudflare Pages Function endpoint
- Server-side validation
- Basic spam protection
- Provider-isolated delivery adapter

**Acceptance Criteria**
- Secrets are server-side only.
- Successful submission can be tested in configured environment.
- Failed submission returns a safe error.

---
## 8. SEO And Launch Tasks

### T013 - Add Metadata And SEO Utilities

**Depends On**
- T002
- T006

**Outputs**
- Route metadata helper
- Homepage metadata
- Shop metadata
- Product metadata
- Open Graph support
- Canonical URL support where practical

**Acceptance Criteria**
- Homepage, shop, and product pages have appropriate metadata.
- Product metadata uses product data where available.

### T014 - Add Prerendering

**Depends On**
- T013

**Outputs**
- Build-time prerender setup for public routes where practical
- Product route prerendering for known handles where practical

**Acceptance Criteria**
- Prerendering does not require a custom server runtime.
- Missing live Shopify config fails clearly unless placeholder mode is intentional.

### T015 - Add Cloudflare Analytics Notes Or Integration

**Depends On**
- T002

**Outputs**
- Cloudflare Web Analytics setup or documented setup steps

**Acceptance Criteria**
- Analytics remains lightweight.
- No heavy marketing pixels are added.

---
## 9. Readiness Tasks

### T016 - Complete Handoff Documentation

**Depends On**
- Implementation substantially complete

**Outputs**
- Finalized run/build/deploy instructions
- Environment variable documentation
- Shopify setup notes
- Cloudflare setup notes
- Contact form setup notes
- Known launch blockers

**Acceptance Criteria**
- Handoff documentation follows `docs/handoff-outline.md`.
- A future maintainer can run and deploy the project.

### T017 - Run Verification Checklist

**Depends On**
- Implementation complete enough to test

**Outputs**
- Completed verification checklist or release QA note
- Documented pass/fail status
- Documented launch blockers

**Acceptance Criteria**
- Build/typecheck pass.
- Core page flows pass.
- Commerce flows pass in configured environment.
- Contact form flow passes in configured environment.
- Placeholder launch blockers are documented.

---
## 10. Suggested Agent Assignment Order

1. T001
2. T002
3. T003 and T004
4. T005
5. T006 and T007
6. T008 and T009
7. T010
8. T011 and T012
9. T013
10. T014 and T015
11. T016
12. T017
