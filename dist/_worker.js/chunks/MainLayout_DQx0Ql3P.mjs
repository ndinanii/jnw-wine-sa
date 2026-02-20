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

function Cart({
  cart,
  onIncrement,
  onDecrement,
  onCheckout,
  checkoutState,
  sticky = true
}) {
  const totalItems = reactExports.useMemo(() => cart.reduce((sum, item) => sum + item.qty, 0), [cart]);
  const totalPrice = reactExports.useMemo(
    () => cart.reduce((sum, item) => sum + parseFloat(item.price || 0) * item.qty, 0),
    [cart]
  );
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
    cart.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { margin: 0, fontFamily: "Inter, sans-serif", fontSize: "0.85rem", color: "var(--color-text-muted)" }, children: "Your cart is empty" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { style: { listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "8px" }, children: cart.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
            item.variantTitle,
            item.price ? ` - R${parseFloat(item.price).toLocaleString()}` : ""
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "qty-btn", onClick: () => onDecrement(item.variantId), children: "-" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { minWidth: "20px", textAlign: "center", fontFamily: "Inter, sans-serif", fontSize: "0.82rem" }, children: item.qty }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "qty-btn", onClick: () => onIncrement(item.variantId), children: "+" })
          ] })
        ]
      },
      item.variantId
    )) }),
    cart.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("hr", { className: "gold-divider", style: { margin: "12px 0" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: "12px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "var(--color-text-muted)" }, children: "Estimated total" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { style: { color: "var(--color-gold-soft)" }, children: [
          "R",
          totalPrice.toLocaleString(void 0, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        disabled: !cart.length || checkoutState === "loading",
        onClick: onCheckout,
        className: "btn-gold",
        style: { width: "100%", padding: "10px", opacity: !cart.length ? 0.45 : 1 },
        children: checkoutState === "loading" ? "Redirecting..." : "Checkout"
      }
    )
  ] });
}

const STORAGE_KEY = 'jnw-cart-v1';
const MAX_ITEM_QTY = 24;
const CART_SYNC_EVENT = 'jnw-cart-sync';

function parseCart(raw) {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
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
    setCart((current) => {
      const index = current.findIndex((item) => item.variantId === variant.id);
      if (index === -1) {
        return [
          ...current,
          {
            variantId: variant.id,
            qty: 1,
            title: product.title,
            variantTitle: variant.title,
            price: variant.price?.amount ?? variant.priceV2?.amount,
            currencyCode: variant.price?.currencyCode ?? variant.priceV2?.currencyCode ?? "ZAR",
          },
        ];
      }
      return current.map((item, idx) =>
        idx === index ? { ...item, qty: Math.min(MAX_ITEM_QTY, item.qty + 1) } : item,
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

  const checkout = reactExports.useCallback(async () => {
    if (!cart.length) return;
    setCheckoutState('loading');
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lineItems: cart }),
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
  { href: "/#collection", label: "Best Sellers" },
  { href: "/#about", label: "About" },
  { href: "/#about", label: "Information" },
  { href: "/#about", label: "Contact" }
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

const CATEGORY_ITEMS = [
  { key: "best-sellers", label: "Best Sellers" },
  { key: "whites", label: "Whites" },
  { key: "reds", label: "Reds" },
  { key: "rose", label: "Rose" },
  { key: "sparkling", label: "Sparkling" }
];
function normalizeCategory(value) {
  if (!value) return "best-sellers";
  const normalized = String(value).toLowerCase();
  return CATEGORY_ITEMS.some((item) => item.key === normalized) ? normalized : "best-sellers";
}
function HeaderCategoryNav() {
  const [activeCategory, setActiveCategory] = reactExports.useState("best-sellers");
  reactExports.useEffect(() => {
    function syncFromUrl() {
      const params = new URLSearchParams(window.location.search);
      setActiveCategory(normalizeCategory(params.get("category")));
    }
    syncFromUrl();
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "header-cats", "aria-label": "Shop categories", children: CATEGORY_ITEMS.map((item) => {
    const isActive = activeCategory === item.key;
    const href = item.key === "best-sellers" ? "/#collection" : `/?category=${encodeURIComponent(item.key)}#collection`;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "a",
      {
        className: isActive ? "header-cat header-cat-active" : "header-cat",
        href,
        children: [
          isActive && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "header-dot", "aria-hidden": "true" }),
          item.label
        ]
      },
      item.key
    );
  }) });
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
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description"', "><title>", '</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">', '</head> <body> <header class="site-header"> <div class="container header-shell"> <nav class="top-nav"> ', ' <a href="/" class="brand"> <span>JNW</span> </a> <div class="header-icons"> <a href="/#about" class="icon-link" aria-label="Notifications"> <svg viewBox="0 0 24 24" aria-hidden="true"> <path d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5"></path> <path d="M10 19a2 2 0 0 0 4 0"></path> </svg> </a> <a href="/#collection" class="icon-link" aria-label="Search"> <svg viewBox="0 0 24 24" aria-hidden="true"> <circle cx="11" cy="11" r="7"></circle> <path d="m20 20-3.5-3.5"></path> </svg> </a> ', " </div> </nav> ", ' </div> </header> <main class="page-content"> ', ' </main> <footer id="about" class="site-footer"> <div class="container footer-shell"> <section class="footer-accordions"> <details> <summary>Shop Wines</summary> <div class="footer-accordion-body"> <a href="/#collection">Best Sellers</a> <a href="/#collection">All Wines</a> </div> </details> <details> <summary>Information</summary> <div class="footer-accordion-body"> <p class="footer-accordion-copy">\nStandard online sale terms for JNW Wine SA:\n</p> <ul class="footer-accordion-copy-list"> <li>Legal Drinking Age: You must be 18 years or older to purchase alcohol.</li> <li>Delivery: Orders are processed after payment confirmation and shipped to valid delivery addresses.</li> <li>Returns: Unopened items may be eligible for return subject to condition and approval.</li> <li>Opened alcohol products are non-returnable unless faulty, damaged, or supplied in error.</li> <li>Damaged or incorrect items must be reported promptly after delivery with proof (photos/order number).</li> <li>Approved refunds are returned to the original payment method after inspection and processing.</li> <li>Pricing and stock are subject to availability and may change without notice.</li> <li>We may cancel or refuse orders where fraud, pricing errors, or compliance concerns are identified.</li> <li>Customer data is handled for order fulfilment, support, and legal compliance purposes.</li> </ul> <p class="footer-accordion-copy">\nFor policy questions, contact\n<a class="footer-inline-link" href="mailto:info@jnwinesa.com">info@jnwinesa.com</a>.\n</p> </div> </details> <details> <summary>Contact</summary> <div class="footer-accordion-body"> <a href="mailto:info@jnwinesa.com">info@jnwinesa.com</a> </div> </details> <details> <summary>About JNW Wine SA</summary> <div class="footer-accordion-body"> <p class="footer-accordion-copy">\nJay Nkosi is the Founder and Owner of JNW Wine SA, a proudly South African brand\n                established in 2021. Born and raised in KwaMashu, he entered the wine industry with\n                a bold vision: to bring premium wines from South Africa to local and global tables.\n</p> <p class="footer-accordion-copy">\nDriven by innovation, authenticity, and service excellence, Jay has built JNW Wine\n                SA into a growing household name with a dedicated team committed to quality in every\n                bottle.\n</p> <p class="footer-accordion-copy">Notable Achievements:</p> <ul class="footer-accordion-copy-list"> <li>Wine of the Year</li> <li>Best Customer Service Award</li> <li>Manufacturer of the Year 2024/2025</li> </ul> </div> </details> </section> <p class="footer-brandmark">JNW</p> <div class="footer-social"> <a href="/#about" aria-label="Facebook"> <svg viewBox="0 0 24 24" aria-hidden="true"> <path d="M14 8h2V5h-2c-2.2 0-4 1.8-4 4v2H8v3h2v5h3v-5h2.2l.8-3H13V9c0-.6.4-1 1-1Z"></path> </svg> </a> <a href="/#about" aria-label="Instagram"> <svg viewBox="0 0 24 24" aria-hidden="true"> <rect x="4" y="4" width="16" height="16" rx="4"></rect> <circle cx="12" cy="12" r="3.6"></circle> <circle cx="17" cy="7" r="1"></circle> </svg> </a> <a href="/#about" aria-label="YouTube"> <svg viewBox="0 0 24 24" aria-hidden="true"> <path d="M20.2 8.2a2.4 2.4 0 0 0-1.7-1.7C16.9 6 12 6 12 6s-4.9 0-6.5.5a2.4 2.4 0 0 0-1.7 1.7C3.3 9.8 3.3 12 3.3 12s0 2.2.5 3.8a2.4 2.4 0 0 0 1.7 1.7C7.1 18 12 18 12 18s4.9 0 6.5-.5a2.4 2.4 0 0 0 1.7-1.7c.5-1.6.5-3.8.5-3.8s0-2.2-.5-3.8Z"></path> <path d="m10 14.8 4.2-2.8L10 9.2Z"></path> </svg> </a> <a href="/#about" aria-label="LinkedIn"> <svg viewBox="0 0 24 24" aria-hidden="true"> <path d="M7.2 9.1H4.3V19h2.9V9.1Zm.2-3.1a1.7 1.7 0 1 0-3.4 0 1.7 1.7 0 0 0 3.4 0ZM19.8 13.3c0-3-1.6-4.4-3.8-4.4-1.8 0-2.5 1-2.9 1.6V9.1h-2.9V19h2.9v-5.5c0-1.5.5-2.9 2.3-2.9s1.9 1.7 1.9 3V19h2.9v-5.7Z"></path> </svg> </a> </div> <div class="footer-legal"> <p>Drink Responsibly</p> <p>Copyright 2026 JNW Wine SA</p> </div> </div> </footer> <script>\n      (() => {\n        const header = document.querySelector(".site-header");\n        if (!header) return;\n\n        const onScroll = () => {\n          header.classList.toggle("site-header-scrolled", window.scrollY > 8);\n        };\n\n        onScroll();\n        window.addEventListener("scroll", onScroll, { passive: true });\n      })();\n    <\/script> </body> </html>'])), addAttribute(description, "content"), title, renderHead(), renderComponent($$result, "HeaderMenuButton", HeaderMenuButton, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Wonga/Desktop/JNW Wine SA FInal/src/components/HeaderMenuButton.jsx", "client:component-export": "default" }), renderComponent($$result, "HeaderCartButton", HeaderCartButton, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Wonga/Desktop/JNW Wine SA FInal/src/components/HeaderCartButton.jsx", "client:component-export": "default" }), renderComponent($$result, "HeaderCategoryNav", HeaderCategoryNav, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Wonga/Desktop/JNW Wine SA FInal/src/components/HeaderCategoryNav.jsx", "client:component-export": "default" }), renderSlot($$result, $$slots["default"]));
}, "C:/Users/Wonga/Desktop/JNW Wine SA FInal/src/layouts/MainLayout.astro", void 0);

export { $$MainLayout as $, jsxRuntimeExports as j, useCart as u };
