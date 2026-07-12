# Cloudflare Pages Function for contact

Contact form submissions will be handled by a Cloudflare Pages Function rather than by client-only JavaScript. This gives the project a small server-side boundary for validation, spam protection, and secret-backed email or webhook delivery while staying aligned with Cloudflare Pages hosting.
