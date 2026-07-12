---
type: Docs Index
status: draft
client: "[[Hands Heart]]"
project: Hands Heart Website Redesign
created: July 11, 2026
version: 0.1
---
# Hands Heart Docs Index

## 1. Purpose

This folder contains the planning, scope, engineering, and execution documents for the Hands Heart Website Redesign. It exists so humans and coding agents can understand the project before writing implementation code.

The docs should be read before scaffolding the application, adding dependencies, or making product decisions.

---
## 2. Reading Order

Agents should read the documents in this order:

1. `docs/README.md`
2. `CONTEXT.md`
3. `docs/prd.md`
4. `docs/design.md`
5. `docs/engineering.md`
6. `docs/agent-build-plan.md`
7. `docs/task-breakdown.md`
8. `docs/asset-checklist.md`
9. `docs/verification-checklist.md`
10. `docs/adr/*.md`
11. `docs/contract.md`

The contract is included for scope awareness, but agents should not treat it as implementation prose. Product and engineering implementation should be driven by the PRD, engineering doc, ADRs, glossary, and build plan.

---
## 3. Document Roles

**`CONTEXT.md`**
- Defines project language.
- Keeps agents from confusing terms like cart, checkout, variant, and custom storefront.
- Should not contain implementation instructions.

**`docs/prd.md`**
- Defines product goals, scope, audience, sitemap, requirements, visual direction, content needs, and acceptance criteria.
- Answers what the project is and why it exists.

**`docs/engineering.md`**
- Defines the technical architecture, stack, Shopify integration model, cart behavior, routing, SEO, verification gates, handoff needs, and agent rules.
- Answers how the project should be built.

**`docs/design.md`**
- Defines the binding visual direction for the site.
- References the proprietary north-star images in `assets/reference/`.
- Overrides earlier restrained visual language when visual implementation decisions are being made.

**`docs/agent-build-plan.md`**
- Breaks the engineering doc into implementation phases.
- Gives agents a safe path from empty repo to launch-ready build.

**`docs/task-breakdown.md`**
- Converts the build plan into assignable implementation tickets.
- Defines inputs, outputs, dependencies, and acceptance criteria for each task.

**`docs/asset-checklist.md`**
- Tracks required content, brand assets, product data, account access, and launch blockers.
- Separates placeholder-friendly development from production launch readiness.

**`docs/verification-checklist.md`**
- Defines the checks that must pass before work is considered ready for launch review.
- Should be used before handoff, deployment, or milestone completion.

**`docs/handoff-outline.md`**
- Defines the lightweight handoff documentation expected by delivery.
- Should become the basis for the final project README or client handoff document once implementation exists.

**`docs/adr/`**
- Records important technical decisions and why they were made.
- Agents should not reverse ADR decisions without explicit user approval.

**`docs/contract.md`**
- Defines commercial scope, payment, revisions, warranty, ownership, and delivery expectations.
- Useful for understanding boundaries and exclusions.

---
## 4. Binding Decisions

The following decisions are binding for the initial build unless the user explicitly changes them:

- The site is a custom React storefront.
- The stack is React, TypeScript, Vite, Tailwind CSS, React Router, and TanStack Query.
- Shopify Storefront API provides product, variant, cart, and checkout handoff data.
- Shopify hosted checkout handles payment and order completion.
- The React app must not implement custom checkout.
- The React app must not collect payment information.
- The cart is backed by Shopify cart APIs from the beginning.
- Public storefront routes should be prerendered where practical.
- The contact form uses a Cloudflare Pages Function.
- Launch analytics use Cloudflare Web Analytics.
- Placeholder content is allowed for development but cannot ship as final content.
- `docs/design.md` and all images in `assets/reference/` are the true visual north star.
- Reference images are proprietary and must not be shipped as production assets.

---
## 5. Change Process

If an agent discovers a gap, contradiction, or implementation risk, it should:

1. Check `CONTEXT.md`, `docs/engineering.md`, and the ADRs.
2. Prefer the simplest solution that preserves the launch scope.
3. Ask the user before changing a binding decision.
4. Add or update an ADR only for meaningful architecture decisions.
5. Keep docs and implementation aligned.

---
## 6. Initial Baseline Readiness

The repo is ready for an initial docs baseline when these documents exist:

- `CONTEXT.md`
- `AGENTS.md`
- `README.md`
- `docs/README.md`
- `docs/prd.md`
- `docs/design.md`
- `docs/contract.md`
- `docs/engineering.md`
- `docs/agent-build-plan.md`
- `docs/task-breakdown.md`
- `docs/asset-checklist.md`
- `docs/verification-checklist.md`
- `docs/handoff-outline.md`
- `docs/adr/*.md`

After the baseline commit, coding agents can begin the scaffold phase described in `docs/agent-build-plan.md`.
