# Shopify data layer

The React app will use a dedicated Shopify client module and TanStack Query for Shopify-backed server state. This keeps Storefront API details out of presentation components, gives product and cart data a consistent caching/mutation model, and makes the agent build easier to coordinate.
