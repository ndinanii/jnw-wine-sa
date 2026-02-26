import { defineMiddleware } from "astro:middleware";

const ONE_YEAR_SECONDS = 31536000;
const BROWSER_LONG_CACHE = `public, max-age=${ONE_YEAR_SECONDS}, immutable`;
const EDGE_LONG_CACHE = `public, s-maxage=${ONE_YEAR_SECONDS}, immutable`;

const BROWSER_SHORT_HTML_CACHE = "public, max-age=60, stale-while-revalidate=300";
const EDGE_SHORT_HTML_CACHE = "public, s-maxage=300, stale-while-revalidate=900";

const NO_STORE_CACHE = "no-store, no-cache, must-revalidate, max-age=0";

function cloneResponseWithHeaders(response, headers) {
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function applyNoStore(headers) {
  headers.set("Cache-Control", NO_STORE_CACHE);
  headers.set("CDN-Cache-Control", NO_STORE_CACHE);
  headers.set("Cloudflare-CDN-Cache-Control", NO_STORE_CACHE);
}

function applyCachePolicy(headers, browserPolicy, edgePolicy) {
  headers.set("Cache-Control", browserPolicy);
  headers.set("CDN-Cache-Control", edgePolicy);
  headers.set("Cloudflare-CDN-Cache-Control", edgePolicy);
}

function isVersionedAstroAsset(pathname) {
  return /^\/_astro\/.+\.[A-Za-z0-9_-]{6,}\.(?:js|css)$/.test(pathname);
}

function isProductPage(pathname) {
  return pathname.startsWith("/product/");
}

function isCategoryPage(url) {
  if (url.pathname.startsWith("/category/")) return true;
  return url.pathname === "/" && url.searchParams.has("category");
}

function isCartOrAccountPage(pathname) {
  return pathname === "/cart" || pathname.startsWith("/cart/") || pathname === "/account" || pathname.startsWith("/account/");
}

function isCheckoutApi(pathname) {
  return pathname === "/api/checkout" || pathname.startsWith("/api/checkout/");
}

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  const headers = new Headers(response.headers);
  const { url, request } = context;
  const pathname = url.pathname;
  const method = request.method.toUpperCase();

  if (isCheckoutApi(pathname) || isCartOrAccountPage(pathname) || !["GET", "HEAD"].includes(method)) {
    applyNoStore(headers);
    return cloneResponseWithHeaders(response, headers);
  }

  if (isVersionedAstroAsset(pathname)) {
    applyCachePolicy(headers, BROWSER_LONG_CACHE, EDGE_LONG_CACHE);
    return cloneResponseWithHeaders(response, headers);
  }

  const contentType = headers.get("Content-Type") || "";
  const isHtml = contentType.toLowerCase().includes("text/html");

  if (isHtml && (isProductPage(pathname) || isCategoryPage(url))) {
    applyCachePolicy(headers, BROWSER_SHORT_HTML_CACHE, EDGE_SHORT_HTML_CACHE);
    return cloneResponseWithHeaders(response, headers);
  }

  return response;
});
