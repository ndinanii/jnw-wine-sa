globalThis.process ??= {}; globalThis.process.env ??= {};
import { s as shopifyIsConfigured, c as createCartCheckout } from '../../chunks/shopify_CZJlNPZv.mjs';
export { r as renderers } from '../../chunks/_@astro-renderers_CHBVxjnt.mjs';

const JSON_HEADERS = { "Content-Type": "application/json" };
const MAX_LINE_ITEMS = 50;
const MAX_QTY = 24;

function jsonResponse(payload, status = 200) {
  return new Response(JSON.stringify(payload), { status, headers: JSON_HEADERS });
}

function sanitizeLineItems(rawLineItems = []) {
  if (!Array.isArray(rawLineItems)) return [];

  return rawLineItems
    .slice(0, MAX_LINE_ITEMS)
    .map((item) => {
      const variantId = typeof item?.variantId === "string" ? item.variantId.trim() : "";
      const qty = Number.parseInt(item?.qty, 10);
      const quantity = Number.isFinite(qty) ? Math.max(1, Math.min(MAX_QTY, qty)) : 0;
      return { variantId, quantity };
    })
    .filter((item) => item.variantId && item.quantity > 0);
}

async function POST({ request }) {
  if (!shopifyIsConfigured()) {
    return jsonResponse({ error: "Shopify configuration missing." }, 500);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON payload." }, 400);
  }

  const lineItems = sanitizeLineItems(body.lineItems);
  if (!lineItems.length) {
    return jsonResponse({ error: "Cart is empty or invalid." }, 400);
  }

  const { cart, userErrors, errors } = await createCartCheckout(lineItems);

  if (errors.length) {
    return jsonResponse({ error: errors[0].message }, 502);
  }

  if (userErrors.length) {
    return jsonResponse({ error: userErrors[0].message, details: userErrors }, 400);
  }

  if (!cart?.checkoutUrl) {
    return jsonResponse({ error: "Checkout URL was not returned by Shopify." }, 502);
  }

  return jsonResponse({ webUrl: cart.checkoutUrl });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
