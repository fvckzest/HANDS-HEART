# Prerender public storefront routes

The custom storefront will remain a Vite and React application, but public marketing and product routes should be prerendered at build time when practical. This preserves the simplicity of static Cloudflare Pages hosting while improving indexable content and social previews for the homepage, catalog, and product detail pages.
