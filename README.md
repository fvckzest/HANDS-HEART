# Hands Heart Website Redesign

This repository contains the planning and implementation workspace for the Hands Heart Website Redesign.

The project is a custom React storefront for Hands Heart, backed by Shopify for product data, cart primitives, checkout, payment, and order completion. The custom site will be hosted on Cloudflare Pages and built with React, TypeScript, Vite, Tailwind CSS, React Router, and TanStack Query.

## Current Status

The repository is in documentation-baseline mode. Application code should not be scaffolded until the docs baseline is committed.

## Start Here

Read these first:

1. `docs/README.md`
2. `CONTEXT.md`
3. `docs/prd.md`
4. `docs/design.md`
5. `docs/engineering.md`
6. `docs/agent-build-plan.md`

## Key Boundaries

- Build a custom storefront, not a Shopify theme.
- Use Shopify Storefront API for products, variants, cart data, and checkout handoff.
- Use Shopify hosted checkout for payment and order completion.
- Do not implement custom checkout.
- Do not collect payment information in React.
- Use placeholders only during development, never as final launch content.

## Docs

- `docs/prd.md` - product requirements
- `docs/design.md` - visual north star and reference interpretation
- `docs/contract.md` - commercial scope and delivery terms
- `docs/engineering.md` - implementation architecture
- `docs/agent-build-plan.md` - phase-by-phase build plan
- `docs/task-breakdown.md` - assignable implementation tickets
- `docs/asset-checklist.md` - launch assets, access, and blockers
- `docs/verification-checklist.md` - launch verification checklist
- `docs/handoff-outline.md` - handoff documentation outline
- `docs/adr/` - architecture decision records
- `CONTEXT.md` - project glossary
- `AGENTS.md` - agent instructions

## Key Assets

- `assets/brand/heart-hands.svg` - canonical heart hands drawing for the initial launch
- `assets/reference/` - proprietary visual north-star references for the site
