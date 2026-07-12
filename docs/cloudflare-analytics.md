---
type: Operations Note
status: implementation complete, verification blocked
client: "[[Hands Heart]]"
project: Hands Heart Website Redesign
created: July 12, 2026
references:
  - docs/engineering.md
  - docs/asset-checklist.md
  - docs/verification-checklist.md
---
# Cloudflare Web Analytics

## Launch Scope

Hands Heart will use Cloudflare Web Analytics for lightweight, basic page-level
traffic visibility at launch. This keeps measurement aligned with the Cloudflare
Pages hosting stack and avoids adding a separate client analytics dependency.

The intended launch use is to review page views, visitors, top URLs, and the
available page-performance information in Cloudflare's Web Analytics dashboard.
It is not a source of truth for Shopify commerce activity.

## Enable On The Cloudflare Pages Project

After the production Pages project exists, a project owner with access to that
Cloudflare account should:

1. Open **Workers & Pages** in the Cloudflare dashboard.
2. Select the Hands Heart Pages project.
3. Open **Metrics** and, under **Web Analytics**, select **Enable**.
4. Deploy the production branch again (or wait for the next production
   deployment).

Cloudflare's Pages integration adds its managed Web Analytics beacon on the
next deployment. The published app needs to return valid HTML for that managed
insertion to work. No repository change, Cloudflare token, Vite environment
variable, or hand-authored tracking snippet is needed for this path.

## View And Verify Basic Traffic

After the analytics-enabled production deployment is live:

1. Visit the production domain and load at least the homepage, `/shop`, and a
   product page when product data is configured.
2. In the Cloudflare dashboard, open **Web Analytics** and select the website
   associated with the Pages project.
3. Confirm that basic traffic data is appearing for the deployed domain,
   including page views and visited URLs. Allow time for the dashboard to
   process new traffic before treating an initially empty report as a failure.
4. Record the deployment URL, verification date, and observed result in the
   release QA or completed verification checklist.

Use the Web Analytics dashboard for launch traffic and page-performance
visibility. Pages Function health, including contact endpoint errors, remains
separate under the Pages project's Functions Metrics and is not an analytics
event implementation.

## Required Account Access

Live setup and verification require access to the Cloudflare account that owns
the Hands Heart Pages project, with permission to view the project, enable Web
Analytics, redeploy the production branch, and view the Web Analytics
dashboard. The production Pages project and production deployment must exist
before the managed integration can be enabled and verified.

## Explicit Launch Exclusions

The following are out of scope for launch and must not be added as part of this
setup:

- Ecommerce or Shopify conversion event tracking
- Marketing pixels, including Meta Pixel and Google tags
- Google Analytics ecommerce tracking
- Session replay, heatmaps, or behavioral profiling
- Custom conversion dashboards, event pipelines, or Analytics Engine datasets
- Additional third-party tracking scripts

Any future marketing, ecommerce, or conversion measurement requires explicit
approval and a separately scoped implementation decision.

## Why There Is No Runtime Script Today

Cloudflare account and Pages project access have not been configured for this
repository. The launch plan prefers Cloudflare's Pages-managed Web Analytics
integration once that access exists, so this codebase intentionally does not
embed a beacon, SDK, script tag, token, or environment value now.

## Verification Status

**Implementation complete, verification blocked.** The project-specific setup
path and scope boundary are documented. Live verification is blocked by the
absence of Cloudflare account access, a configured Hands Heart Pages project,
and an analytics-enabled production deployment with real visitor traffic. This
is an external launch/configuration blocker, not an implementation blocker.

## Reference

Cloudflare documents the Pages-specific enablement path and the dashboard used
to view its Web Analytics metrics in its [Enable Web Analytics for Pages
projects](https://developers.cloudflare.com/pages/how-to/web-analytics/)
guide.
