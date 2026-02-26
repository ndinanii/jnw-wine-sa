globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createComponent, r as renderTemplate, l as renderSlot, k as renderComponent, n as renderHead, g as addAttribute, h as createAstro } from './astro/server_DIV_hU0m.mjs';
/* empty css                         */
import { a as reactExports } from './_@astro-renderers_CHBVxjnt.mjs';

var jsxRuntime = {exports: {}};

var reactJsxRuntime_production = {};

/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactJsxRuntime_production;

function requireReactJsxRuntime_production () {
	if (hasRequiredReactJsxRuntime_production) return reactJsxRuntime_production;
	hasRequiredReactJsxRuntime_production = 1;
	var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
	  REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
	function jsxProd(type, config, maybeKey) {
	  var key = null;
	  void 0 !== maybeKey && (key = "" + maybeKey);
	  void 0 !== config.key && (key = "" + config.key);
	  if ("key" in config) {
	    maybeKey = {};
	    for (var propName in config)
	      "key" !== propName && (maybeKey[propName] = config[propName]);
	  } else maybeKey = config;
	  config = maybeKey.ref;
	  return {
	    $$typeof: REACT_ELEMENT_TYPE,
	    type: type,
	    key: key,
	    ref: void 0 !== config ? config : null,
	    props: maybeKey
	  };
	}
	reactJsxRuntime_production.Fragment = REACT_FRAGMENT_TYPE;
	reactJsxRuntime_production.jsx = jsxProd;
	reactJsxRuntime_production.jsxs = jsxProd;
	return reactJsxRuntime_production;
}

var hasRequiredJsxRuntime;

function requireJsxRuntime () {
	if (hasRequiredJsxRuntime) return jsxRuntime.exports;
	hasRequiredJsxRuntime = 1;
	{
	  jsxRuntime.exports = requireReactJsxRuntime_production();
	}
	return jsxRuntime.exports;
}

var jsxRuntimeExports = requireJsxRuntime();

const CHECKOUT_COMPLIANCE_STORAGE_KEY = "jnw-checkout-compliance-v1";
function parseComplianceState(raw) {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    return {
      ageConfirmed: Boolean(parsed.ageConfirmed),
      deliveryPolicyAccepted: Boolean(parsed.deliveryPolicyAccepted),
      returnsPolicyAccepted: Boolean(parsed.returnsPolicyAccepted),
      postalCode: typeof parsed.postalCode === "string" ? parsed.postalCode : "",
      phone: typeof parsed.phone === "string" ? parsed.phone : ""
    };
  } catch {
    return null;
  }
}
function normalizePostalCode(value) {
  return String(value || "").toUpperCase().replace(/[^A-Z0-9 -]/g, "").trim().slice(0, 10);
}
function normalizePhone(value) {
  return String(value || "").replace(/\D/g, "").slice(0, 15);
}
function isPostalCodeValid(value) {
  return /^[A-Z0-9][A-Z0-9 -]{2,9}$/.test(value);
}
function isPhoneValid(value) {
  const digitsOnly = value.replace(/\D/g, "");
  return digitsOnly.length >= 9 && digitsOnly.length <= 15;
}
function Cart({
  cart,
  onIncrement,
  onDecrement,
  onCheckout,
  checkoutState,
  sticky = true
}) {
  const [ageConfirmed, setAgeConfirmed] = reactExports.useState(false);
  const [deliveryPolicyAccepted, setDeliveryPolicyAccepted] = reactExports.useState(false);
  const [returnsPolicyAccepted, setReturnsPolicyAccepted] = reactExports.useState(false);
  const [postalCode, setPostalCode] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  reactExports.useEffect(() => {
    let initialState = null;
    try {
      initialState = parseComplianceState(localStorage.getItem(CHECKOUT_COMPLIANCE_STORAGE_KEY));
    } catch {
      initialState = null;
    }
    if (!initialState) return;
    setAgeConfirmed(initialState.ageConfirmed);
    setDeliveryPolicyAccepted(initialState.deliveryPolicyAccepted);
    setReturnsPolicyAccepted(initialState.returnsPolicyAccepted);
    setPostalCode(initialState.postalCode);
    setPhone(initialState.phone);
  }, []);
  reactExports.useEffect(() => {
    const payload = {
      ageConfirmed,
      deliveryPolicyAccepted,
      returnsPolicyAccepted,
      postalCode,
      phone
    };
    try {
      localStorage.setItem(CHECKOUT_COMPLIANCE_STORAGE_KEY, JSON.stringify(payload));
    } catch {
    }
  }, [ageConfirmed, deliveryPolicyAccepted, returnsPolicyAccepted, postalCode, phone]);
  const totalItems = reactExports.useMemo(() => cart.reduce((sum, item) => sum + item.qty, 0), [cart]);
  const totalPrice = reactExports.useMemo(
    () => cart.reduce((sum, item) => sum + parseFloat(item.price || 0) * item.qty, 0),
    [cart]
  );
  const postalCodeNormalized = normalizePostalCode(postalCode);
  const phoneNormalized = normalizePhone(phone);
  const postalCodeReady = isPostalCodeValid(postalCodeNormalized);
  const phoneReady = isPhoneValid(phoneNormalized);
  const checkoutComplianceReady = ageConfirmed && deliveryPolicyAccepted && returnsPolicyAccepted && postalCodeReady && phoneReady;
  const checkoutDisabled = !cart.length || checkoutState === "loading" || !checkoutComplianceReady;
  function handleCheckout() {
    if (checkoutDisabled) return;
    onCheckout({
      compliance: {
        ageConfirmed: true,
        deliveryPolicyAccepted: true,
        returnsPolicyAccepted: true
      },
      addressCheck: {
        postalCode: postalCodeNormalized,
        phone: phoneNormalized
      }
    });
  }
  const asideClass = `${sticky ? "cart-sidebar " : ""}glass-strong`.trim();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: asideClass, style: { padding: "20px" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { margin: 0, fontSize: "1.3rem" }, children: "Cart" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "badge", children: [
        totalItems,
        " ",
        totalItems === 1 ? "item" : "items"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("hr", { className: "gold-divider", style: { margin: "12px 0" } }),
    cart.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { margin: 0, fontFamily: "Inter, sans-serif", fontSize: "0.85rem", color: "var(--color-text-muted)" }, children: "Your cart is empty" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { style: { listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "8px" }, children: cart.map((item) => {
      const hasReadableVariantTitle = item.variantTitle && !/^default title$/i.test(item.variantTitle.trim());
      const variantMeta = hasReadableVariantTitle ? item.variantTitle : item.vintage ? `Vintage ${item.vintage}` : "";
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "li",
        {
          style: {
            borderRadius: "var(--radius-sm)",
            border: "1px solid rgba(197,164,90,0.12)",
            padding: "12px",
            background: "rgba(197,164,90,0.03)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { margin: "0 0 2px", fontFamily: "Inter, sans-serif", fontSize: "0.82rem" }, children: item.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: { margin: "0 0 10px", fontFamily: "Inter, sans-serif", fontSize: "0.72rem", color: "var(--color-text-muted)" }, children: [
              variantMeta,
              item.price ? `${variantMeta ? " - " : ""}R${parseFloat(item.price).toFixed(2)} per bottle` : ""
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "qty-btn", onClick: () => onDecrement(item.variantId), children: "-" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { minWidth: "20px", textAlign: "center", fontFamily: "Inter, sans-serif", fontSize: "0.82rem" }, children: item.qty }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "qty-btn", onClick: () => onIncrement(item.variantId), children: "+" })
            ] })
          ]
        },
        item.variantId
      );
    }) }),
    cart.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("hr", { className: "gold-divider", style: { margin: "12px 0" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: "12px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "var(--color-text-muted)" }, children: "Estimated total" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { style: { color: "var(--color-gold-soft)" }, children: [
          "R",
          totalPrice.toLocaleString(void 0, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "checkout-compliance-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "checkout-compliance-heading", children: "Before Checkout" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "checkout-check", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: ageConfirmed,
              onChange: (event) => setAgeConfirmed(event.target.checked)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "I confirm I am 18 years or older and legally allowed to purchase alcohol." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "checkout-check", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: deliveryPolicyAccepted,
              onChange: (event) => setDeliveryPolicyAccepted(event.target.checked)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "I accept delivery terms: valid ID required, no delivery to minors, no unattended drop-offs." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "checkout-check", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: returnsPolicyAccepted,
              onChange: (event) => setReturnsPolicyAccepted(event.target.checked)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "I understand returns are for unopened approved returns and damaged/incorrect items reported quickly." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "address-check-grid", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
            "Postal code",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                value: postalCode,
                onChange: (event) => setPostalCode(event.target.value),
                placeholder: "e.g. 4001",
                autoComplete: "postal-code"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
            "Mobile number",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "tel",
                value: phone,
                onChange: (event) => setPhone(event.target.value),
                placeholder: "e.g. 0821234567",
                autoComplete: "tel"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "checkout-compliance-note", children: "Address pre-check helps reduce failed deliveries. Please use your final delivery contact details." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "checkout-compliance-error", children: [
          !postalCodeReady ? "Enter a valid postal code. " : "",
          !phoneReady ? "Enter a reachable phone number." : ""
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        disabled: checkoutDisabled,
        onClick: handleCheckout,
        className: "btn-gold",
        style: { width: "100%", padding: "10px", opacity: checkoutDisabled ? 0.45 : 1 },
        children: checkoutState === "loading" ? "Redirecting..." : "Checkout"
      }
    )
  ] });
}

const YEAR_PATTERN = /\b(?:19|20)\d{2}\b/;
const DEFAULT_TITLE_PATTERN = /^default title$/i;

function cleanText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function extractYear(value) {
  const text = cleanText(value);
  if (!text) return "";
  const match = text.match(YEAR_PATTERN);
  return match ? match[0] : "";
}

function normalizeOptionName(name) {
  return cleanText(name).toLowerCase();
}

function getVariantNodes(product) {
  return product?.variants?.edges?.map((edge) => edge?.node).filter(Boolean) ?? [];
}

function getSelectedOptionValue(variant, optionNames = []) {
  const selectedOptions = Array.isArray(variant?.selectedOptions) ? variant.selectedOptions : [];
  if (!selectedOptions.length) return "";

  const normalizedTargets = optionNames.map(normalizeOptionName);
  const option = selectedOptions.find((entry) => normalizedTargets.includes(normalizeOptionName(entry?.name)));
  return cleanText(option?.value);
}

function getVariantVintage(variant) {
  const explicit = getSelectedOptionValue(variant, ["vintage", "year", "harvest"]);
  if (explicit) return explicit;

  const fromTitle = extractYear(variant?.title);
  if (fromTitle) return fromTitle;

  return extractYear(variant?.sku);
}

function getVariantSize(variant) {
  const explicit = getSelectedOptionValue(variant, ["size", "format", "bottle size"]);
  if (explicit) return explicit;

  const title = cleanText(variant?.title);
  if (!title || DEFAULT_TITLE_PATTERN.test(title)) return "";

  const parts = title.split("/").map((part) => part.trim()).filter(Boolean);
  return parts.length > 1 ? parts[1] : "";
}

function getProductVintages(product) {
  const vintages = getVariantNodes(product).map(getVariantVintage).filter(Boolean);
  const unique = [...new Set(vintages)];
  return unique.sort((left, right) => {
    const leftYear = Number.parseInt(left, 10);
    const rightYear = Number.parseInt(right, 10);
    const bothNumeric = Number.isFinite(leftYear) && Number.isFinite(rightYear);
    if (bothNumeric) return leftYear - rightYear;
    return left.localeCompare(right, undefined, { numeric: true, sensitivity: "base" });
  });
}

function formatProductVintageText(product) {
  const vintages = getProductVintages(product);
  if (!vintages.length) return "";
  if (vintages.length === 1) return `Vintage: ${vintages[0]}`;
  return `Vintages: ${vintages.join(", ")}`;
}

function formatVariantLabel(variant) {
  const vintage = getVariantVintage(variant);
  const size = getVariantSize(variant);
  if (vintage && size) return `${vintage} / ${size}`;
  if (vintage) return `Vintage ${vintage}`;
  if (size) return size;

  const title = cleanText(variant?.title);
  if (!title || DEFAULT_TITLE_PATTERN.test(title)) return "Standard";
  return title;
}

function pickDefaultVariant(product) {
  const variants = getVariantNodes(product);
  if (!variants.length) return null;

  const availableVariants = variants.filter((variant) => variant?.availableForSale);
  const pool = availableVariants.length ? availableVariants : variants;

  const bottlePreferred = pool.find((variant) => {
    const text = `${cleanText(getVariantSize(variant))} ${cleanText(variant?.title)}`.toLowerCase();
    return /750\s*ml|bottle/.test(text);
  });
  if (bottlePreferred) return bottlePreferred;

  const latestVintage = pool
    .map((variant) => ({
      variant,
      year: Number.parseInt(getVariantVintage(variant), 10),
    }))
    .filter((entry) => Number.isFinite(entry.year))
    .sort((left, right) => right.year - left.year)[0];
  if (latestVintage?.variant) return latestVintage.variant;

  return pool[0];
}

const STORAGE_KEY = 'jnw-cart-v1';
const MAX_ITEM_QTY = 24;
const CART_SYNC_EVENT = 'jnw-cart-sync';
const BOTTLE_PRICE_ZAR = 155;

function parseCart(raw) {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((item) => ({
      ...item,
      variantTitle:
        typeof item?.variantTitle === 'string' && item.variantTitle.trim()
          ? item.variantTitle.trim()
          : '',
      vintage:
        typeof item?.vintage === 'string' && item.vintage.trim()
          ? item.vintage.trim()
          : '',
      price: BOTTLE_PRICE_ZAR.toFixed(2),
      currencyCode: 'ZAR',
    }));
  } catch {
    return [];
  }
}

function useCart() {
  const [cart, setCart] = reactExports.useState([]);
  const [checkoutState, setCheckoutState] = reactExports.useState('idle');

  // Hydrate from localStorage on mount
  reactExports.useEffect(() => {
    setCart(parseCart(localStorage.getItem(STORAGE_KEY)));
  }, []);

  // Persist to localStorage on change
  reactExports.useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent(CART_SYNC_EVENT, { detail: cart }));
  }, [cart]);

  // Keep multiple cart widgets in sync on the same page and across tabs.
  reactExports.useEffect(() => {
    function handleStorage(event) {
      if (event.key !== STORAGE_KEY) return;
      setCart(parseCart(event.newValue));
    }

    function handleCartSync(event) {
      const incoming = Array.isArray(event.detail) ? event.detail : [];
      setCart((current) => {
        if (JSON.stringify(current) === JSON.stringify(incoming)) return current;
        return incoming;
      });
    }

    window.addEventListener('storage', handleStorage);
    window.addEventListener(CART_SYNC_EVENT, handleCartSync);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener(CART_SYNC_EVENT, handleCartSync);
    };
  }, []);

  const addToCart = reactExports.useCallback((variant, product) => {
    if (!variant?.id) return;
    const variantTitle = formatVariantLabel(variant);
    const vintage = getVariantVintage(variant);

    setCart((current) => {
      const index = current.findIndex((item) => item.variantId === variant.id);
      if (index === -1) {
        return [
          ...current,
          {
            variantId: variant.id,
            qty: 1,
            title: product.title,
            variantTitle,
            vintage,
            price: BOTTLE_PRICE_ZAR.toFixed(2),
            currencyCode: "ZAR",
          },
        ];
      }
      return current.map((item, idx) =>
        idx === index
          ? {
              ...item,
              qty: Math.min(MAX_ITEM_QTY, item.qty + 1),
              variantTitle: item.variantTitle || variantTitle,
              vintage: item.vintage || vintage,
            }
          : item,
      );
    });
  }, []);

  const increment = reactExports.useCallback((variantId) => {
    setCart((current) =>
      current.map((item) =>
        item.variantId === variantId
          ? { ...item, qty: Math.min(MAX_ITEM_QTY, item.qty + 1) }
          : item,
      ),
    );
  }, []);

  const decrement = reactExports.useCallback((variantId) => {
    setCart((current) =>
      current
        .map((item) =>
          item.variantId === variantId
            ? { ...item, qty: Math.max(0, item.qty - 1) }
            : item,
        )
        .filter((item) => item.qty > 0),
    );
  }, []);

  const checkout = reactExports.useCallback(async (checkoutMeta = {}) => {
    if (!cart.length) return;
    setCheckoutState('loading');
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lineItems: cart,
          compliance: checkoutMeta?.compliance ?? {},
          addressCheck: checkoutMeta?.addressCheck ?? {},
        }),
      });
      const json = await response.json();
      if (!response.ok) throw new Error(json.error || 'Checkout failed');
      if (json.webUrl) window.location.href = json.webUrl;
    } catch (error) {
      console.error(error);
      setCheckoutState('error');
      alert('Checkout could not be started. Please try again.');
    } finally {
      setCheckoutState('idle');
    }
  }, [cart]);

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return { cart, totalItems, checkoutState, addToCart, increment, decrement, checkout };
}

function HeaderCartButton() {
  const { cart, totalItems, checkoutState, increment, decrement, checkout } = useCart();
  const [isOpen, setIsOpen] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalOverflow || "";
    }
    return () => {
      document.body.style.overflow = originalOverflow || "";
    };
  }, [isOpen]);
  reactExports.useEffect(() => {
    function onKeydown(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }
    window.addEventListener("keydown", onKeydown);
    return () => window.removeEventListener("keydown", onKeydown);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "header-cart-wrap", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        className: "icon-link cart-trigger",
        "aria-label": `Cart (${totalItems} items)`,
        onClick: () => setIsOpen(true),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M5 7h14l-1.4 8.2a2 2 0 0 1-2 1.7H8.4a2 2 0 0 1-2-1.7L5 7Z" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M9 7V5a3 3 0 0 1 6 0v2" })
          ] }),
          totalItems > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "header-cart-badge", children: totalItems > 99 ? "99+" : totalItems })
        ]
      }
    ),
    isOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: "header-cart-overlay",
          "aria-label": "Close cart",
          onClick: () => setIsOpen(false)
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "header-cart-panel", "aria-label": "Shopping cart panel", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "header-cart-panel-head", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Cart" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "header-cart-close",
              "aria-label": "Close cart",
              onClick: () => setIsOpen(false),
              children: "x"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "header-cart-panel-body", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Cart,
          {
            cart,
            onIncrement: increment,
            onDecrement: decrement,
            onCheckout: checkout,
            checkoutState,
            sticky: false
          }
        ) })
      ] })
    ] })
  ] });
}

const MENU_LINKS = [
  { href: "/#collection", label: "Shop Wines" },
  { href: "/#information", label: "Information" },
  { href: "/#about-jnw", label: "About" },
  { href: "/#contact", label: "Contact" }
];
const CATEGORY_LINKS = [
  { href: "/#collection", label: "Whites" },
  { href: "/#collection", label: "Reds" },
  { href: "/#collection", label: "Rose" },
  { href: "/#collection", label: "Sparkling" }
];
function HeaderMenuButton() {
  const [isOpen, setIsOpen] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalOverflow || "";
    }
    return () => {
      document.body.style.overflow = originalOverflow || "";
    };
  }, [isOpen]);
  reactExports.useEffect(() => {
    function onKeydown(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }
    window.addEventListener("keydown", onKeydown);
    return () => window.removeEventListener("keydown", onKeydown);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "header-menu-wrap", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        className: "icon-btn menu-trigger",
        "aria-label": "Open menu",
        onClick: () => setIsOpen(true),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M4 7h16M4 12h16M4 17h16" }) })
      }
    ),
    isOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: "header-menu-overlay",
          "aria-label": "Close menu",
          onClick: () => setIsOpen(false)
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "header-menu-panel", "aria-label": "Navigation menu", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "header-menu-head", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Menu" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "header-menu-close",
              "aria-label": "Close menu",
              onClick: () => setIsOpen(false),
              children: "x"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "header-menu-links", "aria-label": "Main navigation", children: MENU_LINKS.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: item.href, onClick: () => setIsOpen(false), children: item.label }, item.label)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "header-menu-categories", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Collections" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "header-menu-tags", children: CATEGORY_LINKS.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: item.href, onClick: () => setIsOpen(false), children: item.label }, item.label)) })
        ] })
      ] })
    ] })
  ] });
}

const PROMO_TEXT = "PREMIUM SOUTH AFRICAN WINES  •  R155.00 PER BOTTLE  •  SECURE CHECKOUT  •  SHOP THE JNW COLLECTION";
function HeaderCategoryNav() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "header-promo", "aria-label": "Promotions", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "header-promo-track", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: PROMO_TEXT }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", children: PROMO_TEXT })
  ] }) });
}

const AGE_GATE_STORAGE_KEY = "jnw-age-gate-v1";
const AGE_GATE_VALIDITY_MS = 1e3 * 60 * 60 * 24 * 30;
function hasValidAgeGate() {
  try {
    const raw = localStorage.getItem(AGE_GATE_STORAGE_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    const verifiedAt = Number(parsed?.verifiedAt);
    if (!Number.isFinite(verifiedAt)) return false;
    return Date.now() - verifiedAt < AGE_GATE_VALIDITY_MS;
  } catch {
    return false;
  }
}
function storeAgeGateConfirmation() {
  try {
    localStorage.setItem(
      AGE_GATE_STORAGE_KEY,
      JSON.stringify({
        verifiedAt: Date.now()
      })
    );
  } catch {
  }
}
function AgeGate() {
  const [isOpen, setIsOpen] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setIsOpen(!hasValidAgeGate());
  }, []);
  reactExports.useEffect(() => {
    if (!isOpen) return void 0;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow || "";
    };
  }, [isOpen]);
  function handleConfirmAge() {
    storeAgeGateConfirmation();
    setIsOpen(false);
  }
  function handleExitSite() {
    window.location.href = "https://www.responsibility.org/";
  }
  if (!isOpen) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "age-gate-overlay", role: "dialog", "aria-modal": "true", "aria-labelledby": "age-gate-title", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "age-gate-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "section-label", style: { marginBottom: "6px" }, children: "Age Verification" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { id: "age-gate-title", className: "age-gate-title", children: "This store is for adults 18+ only" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "age-gate-copy", children: "By entering, you confirm you are of legal drinking age in your region. ID may be required on delivery." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "age-gate-actions", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "btn-gold", onClick: handleConfirmAge, children: "I am 18 or older" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "btn-outline", onClick: handleExitSite, children: "Exit Site" })
    ] })
  ] }) });
}

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$MainLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$MainLayout;
  const {
    title = "JNW",
    description = "JNW headless storefront powered by Shopify."
  } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description"', "><title>", '</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">', "</head> <body> ", ' <header class="site-header"> <div class="container header-shell"> <nav class="top-nav"> <div class="top-nav-left"> ', ' <a href="/" class="brand"> <span>JNW</span> </a> <nav class="desktop-nav" aria-label="Primary navigation"> <a href="/#collection">Shop Wines</a> <a href="/#information">Information</a> <a href="/#about-jnw">About</a> <a href="/#contact">Contact</a> </nav> </div> <div class="header-icons"> <a href="/#about" class="icon-link" aria-label="Notifications"> <svg viewBox="0 0 24 24" aria-hidden="true"> <path d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5"></path> <path d="M10 19a2 2 0 0 0 4 0"></path> </svg> </a> <a href="/#collection" class="icon-link" aria-label="Search"> <svg viewBox="0 0 24 24" aria-hidden="true"> <circle cx="11" cy="11" r="7"></circle> <path d="m20 20-3.5-3.5"></path> </svg> </a> ', " </div> </nav> ", ' </div> </header> <main class="page-content"> ', ' </main> <footer id="about" class="site-footer"> <div class="container footer-shell"> <section class="footer-accordions"> <details id="shop-wines"> <summary>Shop Wines</summary> <div class="footer-accordion-body"> <a href="/#collection">Best Sellers</a> <a href="/#collection">All Wines</a> </div> </details> <details id="information"> <summary>Information</summary> <div class="footer-accordion-body"> <p class="footer-accordion-copy">\nStandard online sale terms for JNW Wine SA:\n</p> <ul class="footer-accordion-copy-list"> <li>Legal Drinking Age: You must be 18 years or older to purchase alcohol.</li> <li>Delivery: A sober adult (18+) must receive the order and present valid ID on request.</li> <li>No delivery to minors. Orders cannot be left unattended, with neighbors, or at unsecured locations.</li> <li>Returns: Unopened items may be eligible for return, subject to condition and approval.</li> <li>Opened alcohol products are non-returnable unless faulty, damaged, or supplied in error.</li> <li>Damaged, leaking, or incorrect items must be reported within 48 hours of delivery with photos and order number.</li> <li>Approved refunds are returned to the original payment method after inspection and processing.</li> <li>Pricing and stock are subject to availability and may change without notice.</li> <li>We may cancel or refuse orders where fraud, pricing errors, or compliance concerns are identified.</li> <li>Customer data is handled for order fulfilment, support, and legal compliance purposes.</li> </ul> <p class="footer-accordion-copy">\nFor policy questions, contact\n<a class="footer-inline-link" href="mailto:info@jnwinesa.com">info@jnwinesa.com</a>.\n</p> </div> </details> <details id="contact"> <summary>Contact</summary> <div class="footer-accordion-body"> <form class="contact-form" action="mailto:info@jnwinesa.com" method="post" enctype="text/plain"> <label>\nName\n<input type="text" name="name" autocomplete="name" required> </label> <label>\nEmail\n<input type="email" name="email" autocomplete="email" required> </label> <label>\nMessage\n<textarea name="message" rows="4" required></textarea> </label> <button type="submit" class="btn-gold contact-form-submit">Send Message</button> </form> </div> </details> <details id="about-jnw"> <summary>About JNW Wine SA</summary> <div class="footer-accordion-body"> <p class="footer-accordion-copy">\nJay Nkosi is the Founder and Owner of JNW Wine SA, a proudly South African brand\n                established in 2021. Born and raised in KwaMashu, he entered the wine industry with\n                a bold vision: to bring premium wines from South Africa to local and global tables.\n</p> <p class="footer-accordion-copy">\nDriven by innovation, authenticity, and service excellence, Jay has built JNW Wine\n                SA into a growing household name with a dedicated team committed to quality in every\n                bottle.\n</p> <p class="footer-accordion-copy">Notable Achievements:</p> <ul class="footer-accordion-copy-list"> <li>Wine of the Year</li> <li>Best Customer Service Award</li> <li>Manufacturer of the Year 2024/2025</li> </ul> </div> </details> </section> <div class="footer-social"> <a href="/#about" aria-label="Facebook"> <svg viewBox="0 0 24 24" aria-hidden="true"> <path d="M14 8h2V5h-2c-2.2 0-4 1.8-4 4v2H8v3h2v5h3v-5h2.2l.8-3H13V9c0-.6.4-1 1-1Z"></path> </svg> </a> <a href="/#about" aria-label="Instagram"> <svg viewBox="0 0 24 24" aria-hidden="true"> <rect x="4" y="4" width="16" height="16" rx="4"></rect> <circle cx="12" cy="12" r="3.6"></circle> <circle cx="17" cy="7" r="1"></circle> </svg> </a> <a href="/#about" aria-label="YouTube"> <svg viewBox="0 0 24 24" aria-hidden="true"> <path d="M20.2 8.2a2.4 2.4 0 0 0-1.7-1.7C16.9 6 12 6 12 6s-4.9 0-6.5.5a2.4 2.4 0 0 0-1.7 1.7C3.3 9.8 3.3 12 3.3 12s0 2.2.5 3.8a2.4 2.4 0 0 0 1.7 1.7C7.1 18 12 18 12 18s4.9 0 6.5-.5a2.4 2.4 0 0 0 1.7-1.7c.5-1.6.5-3.8.5-3.8s0-2.2-.5-3.8Z"></path> <path d="m10 14.8 4.2-2.8L10 9.2Z"></path> </svg> </a> <a href="/#about" aria-label="LinkedIn"> <svg viewBox="0 0 24 24" aria-hidden="true"> <path d="M7.2 9.1H4.3V19h2.9V9.1Zm.2-3.1a1.7 1.7 0 1 0-3.4 0 1.7 1.7 0 0 0 3.4 0ZM19.8 13.3c0-3-1.6-4.4-3.8-4.4-1.8 0-2.5 1-2.9 1.6V9.1h-2.9V19h2.9v-5.5c0-1.5.5-2.9 2.3-2.9s1.9 1.7 1.9 3V19h2.9v-5.7Z"></path> </svg> </a> </div> <div class="footer-legal"> <p>Drink Responsibly</p> <p>Copyright 2026 JNW Wine SA</p> </div> </div> </footer> <script>\n      (() => {\n        const header = document.querySelector(".site-header");\n        if (!header) return;\n\n        const onScroll = () => {\n          header.classList.toggle("site-header-scrolled", window.scrollY > 8);\n        };\n\n        onScroll();\n        window.addEventListener("scroll", onScroll, { passive: true });\n      })();\n\n      (() => {\n        const footerAccordions = new Set(["shop-wines", "information", "contact", "about-jnw"]);\n        const detailsList = Array.from(\n          document.querySelectorAll(".footer-accordions details"),\n        );\n\n        const closeOthers = (activeDetails) => {\n          detailsList.forEach((item) => {\n            if (item !== activeDetails) item.open = false;\n          });\n        };\n\n        detailsList.forEach((item) => {\n          item.addEventListener("toggle", () => {\n            if (item.open) closeOthers(item);\n          });\n        });\n\n        const openFromHash = () => {\n          const hash = window.location.hash.replace("#", "");\n          if (!footerAccordions.has(hash)) return;\n\n          const details = document.getElementById(hash);\n          if (!(details instanceof HTMLDetailsElement)) return;\n          closeOthers(details);\n          details.open = true;\n          details.scrollIntoView({ behavior: "smooth", block: "start" });\n        };\n\n        openFromHash();\n        window.addEventListener("hashchange", openFromHash);\n      })();\n    <\/script> </body> </html>'])), addAttribute(description, "content"), title, renderHead(), renderComponent($$result, "AgeGate", AgeGate, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Wonga/Desktop/JNW Wine SA FInal/src/components/AgeGate.jsx", "client:component-export": "default" }), renderComponent($$result, "HeaderMenuButton", HeaderMenuButton, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Wonga/Desktop/JNW Wine SA FInal/src/components/HeaderMenuButton.jsx", "client:component-export": "default" }), renderComponent($$result, "HeaderCartButton", HeaderCartButton, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Wonga/Desktop/JNW Wine SA FInal/src/components/HeaderCartButton.jsx", "client:component-export": "default" }), renderComponent($$result, "HeaderCategoryNav", HeaderCategoryNav, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Wonga/Desktop/JNW Wine SA FInal/src/components/HeaderCategoryNav.jsx", "client:component-export": "default" }), renderSlot($$result, $$slots["default"]));
}, "C:/Users/Wonga/Desktop/JNW Wine SA FInal/src/layouts/MainLayout.astro", void 0);

export { $$MainLayout as $, formatProductVintageText as a, formatVariantLabel as f, getVariantVintage as g, jsxRuntimeExports as j, pickDefaultVariant as p, useCart as u };
