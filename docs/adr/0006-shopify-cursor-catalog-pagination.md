# Shopify cursor catalog pagination

The `/shop` catalog will use the Shopify Storefront API product connection's
cursor and page-info fields to load additional bounded pages on visitor request.
TanStack Query will retain the initial page and append later pages in the client
cache. The UI will show an accessible “Load more” control only while Shopify
reports another page.

This decision was explicitly approved by the project owner on July 12, 2026.
It expands catalog completeness without adding search, faceted filtering,
custom product indexing, or a custom checkout flow.
