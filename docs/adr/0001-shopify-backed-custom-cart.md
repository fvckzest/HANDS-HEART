# Shopify-backed custom cart

The custom storefront will use Shopify Storefront API cart primitives as the source of truth for cart state. The React app may store the Shopify cart ID locally, but product lines, pricing, availability, totals, and checkout handoff should be read from Shopify so the custom cart stays aligned with the hosted Shopify checkout.
