import { createCartCheckout, shopifyIsConfigured } from "../../lib/shopify";

const JSON_HEADERS = { "Content-Type": "application/json" };
const MAX_LINE_ITEMS = 50;
const MAX_QTY = 24;
const POSTAL_CODE_PATTERN = /^[A-Z0-9][A-Z0-9 -]{2,9}$/;
const PHONE_PATTERN = /^\+?[0-9]{9,15}$/;

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

function sanitizeCompliance(rawCompliance = {}) {
  return {
    ageConfirmed: Boolean(rawCompliance?.ageConfirmed),
    deliveryPolicyAccepted: Boolean(rawCompliance?.deliveryPolicyAccepted),
    returnsPolicyAccepted: Boolean(rawCompliance?.returnsPolicyAccepted),
  };
}

function sanitizeAddressCheck(rawAddressCheck = {}) {
  const postalCode = typeof rawAddressCheck?.postalCode === "string"
    ? rawAddressCheck.postalCode.toUpperCase().trim().slice(0, 10)
    : "";

  const phone = typeof rawAddressCheck?.phone === "string"
    ? rawAddressCheck.phone.replace(/[^\d+]/g, "").slice(0, 16)
    : "";

  return { postalCode, phone };
}

export async function POST({ request }) {
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

  const compliance = sanitizeCompliance(body.compliance);
  if (!compliance.ageConfirmed) {
    return jsonResponse({ error: "Age confirmation is required (18+)." }, 400);
  }
  if (!compliance.deliveryPolicyAccepted) {
    return jsonResponse({ error: "Delivery policy confirmation is required." }, 400);
  }
  if (!compliance.returnsPolicyAccepted) {
    return jsonResponse({ error: "Returns policy confirmation is required." }, 400);
  }

  const addressCheck = sanitizeAddressCheck(body.addressCheck);
  if (!POSTAL_CODE_PATTERN.test(addressCheck.postalCode)) {
    return jsonResponse({ error: "Valid postal code confirmation is required." }, 400);
  }
  if (!PHONE_PATTERN.test(addressCheck.phone)) {
    return jsonResponse({ error: "Valid phone confirmation is required." }, 400);
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
