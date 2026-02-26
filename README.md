# JNW Wine SA Headless Storefront

Lean, mobile-first Shopify headless storefront built with Astro + React.

## Stack
- Astro 5
- React 19 (only for cart/product interactivity)
- Shopify Storefront API

## What was simplified
- Removed animation-heavy `framer-motion` usage.
- Removed unused Tailwind integration.
- Centralized Shopify API access in `src/lib/shopify.js`.
- Moved storefront/product data loading to server-side utility calls.
- Tightened checkout endpoint input validation and sanitization.
- Replaced large inline style blocks with a small mobile-first stylesheet.

## Security model
- Shopify Storefront API tokens are used server-side only (Cloudflare Worker runtime).
- Do **not** commit real tokens.
- Keep Storefront tokens scoped to storefront read/write operations only.
- Rotate tokens by setting `SHOPIFY_STOREFRONT_TOKEN_SERVER_ROTATION` with a comma-separated backup list.
- Keep Admin API private tokens out of this app unless building secured backend/admin operations.

## Environment variables
Copy `.env.example` to `.env` and fill values:

```env
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_TOKEN_SERVER=your_storefront_server_token
SHOPIFY_STOREFRONT_TOKEN_SERVER_ROTATION=old_token_1,old_token_2
SHOPIFY_STOREFRONT_EDGE_CACHE_TTL=90
SHOPIFY_STOREFRONT_EDGE_CACHE_STALE_TTL=300
SHOPIFY_API_VERSION=2026-01
```

`SHOPIFY_STORE_DOMAIN` can be either `your-store.myshopify.com` or `https://your-store.myshopify.com/`.

## Development
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Cloudflare deployment
- Astro is configured for Cloudflare server output in `astro.config.mjs`.
- Add these env vars in Cloudflare:
  - `SHOPIFY_STORE_DOMAIN`
  - `SHOPIFY_STOREFRONT_TOKEN_SERVER`
  - `SHOPIFY_STOREFRONT_TOKEN_SERVER_ROTATION` (optional)
  - `SHOPIFY_STOREFRONT_EDGE_CACHE_TTL` (optional)
  - `SHOPIFY_STOREFRONT_EDGE_CACHE_STALE_TTL` (optional)
  - `SHOPIFY_API_VERSION`
- The Cloudflare adapter expects a `SESSION` KV binding. Add it in your Cloudflare project/Wrangler config before deploy.
- Storefront product/collection reads are edge-cached with short TTL to reduce Shopify latency/rate pressure.

## Key files
- `src/lib/shopify.js` - server-side Shopify client
- `src/middleware.js` - route-level cache policy headers (browser + edge)
- `src/pages/index.astro` - product listing page
- `src/pages/product/[handle].astro` - product detail page
- `src/pages/api/checkout.js` - checkout creation endpoint
- `src/styles/globals.css` - mobile-first base styles
