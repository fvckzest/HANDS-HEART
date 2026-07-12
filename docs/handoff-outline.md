---
type: Handoff Outline
status: superseded
client: "[[Hands Heart]]"
project: Hands Heart Website Redesign
created: July 11, 2026
version: 0.1
superseded_by: docs/handoff.md
references:
  - docs/handoff.md
  - docs/engineering.md
  - docs/asset-checklist.md
---
# Hands Heart Handoff Outline

> Superseded by the project-specific [Hands Heart Handoff Runbook](handoff.md).
> Retained below as historical planning context; use the runbook for current
> operating instructions.

## 1. Purpose

This document defines the handoff documentation that should exist by delivery. It is an outline, not the final handoff itself. Once implementation exists, this should be converted into concrete project instructions.

---
## 2. Project Summary

The final handoff should briefly explain:

- What was built
- What stack was used
- Where the code lives
- Where the site is deployed
- What Shopify owns
- What Cloudflare owns
- What remains out of scope

---
## 3. Local Development

The final handoff should include:

- Required Node version
- Package manager used
- Install command
- Local dev command
- Build command
- Preview command
- Typecheck/lint/test commands

---
## 4. Environment Configuration

The final handoff should document:

- Required frontend environment variables
- Required server/function environment variables
- Which values are safe for frontend exposure
- Which values must remain server-side only
- Where variables are configured in Cloudflare Pages

---
## 5. Shopify Setup

The final handoff should explain:

- Shopify store domain
- Storefront API token setup
- Shopify API version
- How products are added or updated
- How variants are added or updated
- How collections affect the shop filter
- How checkout is reached from the custom cart

The handoff should make clear that Shopify owns checkout, payment, orders, inventory, and product management.

---
## 6. Cloudflare Setup

The final handoff should document:

- Cloudflare Pages project name
- Build command
- Build output directory
- Environment variable locations
- Pages Function configuration
- Production branch
- Preview deployment behavior
- Domain and DNS notes
- SSL status

---
## 7. Contact Form

The final handoff should document:

- Contact form endpoint
- Delivery provider or webhook destination
- Required secrets
- Recipient email
- Spam protection approach
- How to test submissions

---
## 8. Analytics

The final handoff should document:

- Cloudflare Web Analytics setup
- Where analytics are viewed
- Any analytics limitations
- Any future analytics recommendations if requested later

---
## 9. Content Updates

The final handoff should explain:

- Which content lives in code
- Which content lives in Shopify
- How product images are changed
- How homepage featured products are selected
- How footer links and policy links are updated

---
## 10. Verification Summary

The final handoff should include:

- Date verification was run
- Automated checks run
- Manual QA flows checked
- Known issues
- Known launch blockers
- Any placeholder content still present

---
## 11. Support Boundary

The final handoff should align with the contract:

- 14-day post-launch support period for delivered-work issues
- New features, new pages, content updates, and additional functionality are new work
- Ongoing maintenance is outside the initial project unless separately agreed
