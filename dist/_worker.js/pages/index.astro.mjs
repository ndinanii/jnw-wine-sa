globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead, g as addAttribute } from '../chunks/astro/server_DIV_hU0m.mjs';
import { p as pickDefaultVariant, a as formatProductVintageText, j as jsxRuntimeExports, u as useCart, $ as $$MainLayout } from '../chunks/MainLayout_S5y0kMji.mjs';
import { a as reactExports } from '../chunks/_@astro-renderers_CHBVxjnt.mjs';
export { r as renderers } from '../chunks/_@astro-renderers_CHBVxjnt.mjs';
import { s as shopifyIsConfigured, a as getProducts } from '../chunks/shopify_DbqIhcKi.mjs';

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?auto=format&fit=crop&w=900&q=80";
const BOTTLE_PRICE_ZAR = 155;
function ProductCard({ product, onAddToCart, index = 0 }) {
  const [added, setAdded] = reactExports.useState(false);
  const firstImage = product.images?.edges?.[0]?.node?.url;
  const defaultVariant = pickDefaultVariant(product);
  const vintageText = formatProductVintageText(product);
  const bottlePrice = `R${BOTTLE_PRICE_ZAR.toFixed(2)} per bottle`;
  function handleAdd() {
    if (!defaultVariant?.availableForSale) return;
    onAddToCart(defaultVariant, product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "product-card", style: { animationDelay: `${index * 60}ms` }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `/product/${product.handle}`, style: { display: "block" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-image", style: { aspectRatio: "1/1", position: "relative" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: firstImage || FALLBACK_IMAGE,
        alt: product.title,
        style: { width: "70%", height: "84%", objectFit: "contain", margin: "0 auto" },
        loading: "lazy"
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "product-card-body", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "product-meta-label", children: "Estate Label" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `/product/${product.handle}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "product-meta-title", children: product.title }) }),
      vintageText && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "product-meta-vintage", children: vintageText }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "product-meta-price", children: bottlePrice }),
      defaultVariant?.availableForSale ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: "btn-gold product-card-cta",
          onClick: handleAdd,
          style: { padding: "8px 12px", fontSize: "0.64rem" },
          children: added ? "Added" : "Add to cart"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "btn-outline product-card-cta",
          style: {
            justifyContent: "center",
            padding: "8px 12px",
            fontSize: "0.64rem",
            opacity: 0.6,
            cursor: "not-allowed"
          },
          children: "Sold out"
        }
      )
    ] })
  ] });
}

const CATEGORIES = [
  { key: "best-sellers", label: "Best Sellers" },
  { key: "whites", label: "Whites" },
  { key: "reds", label: "Reds" },
  { key: "rose", label: "Rose" },
  { key: "sparkling", label: "Sparkling" }
];
function normalizeCategory(value) {
  if (!value) return "best-sellers";
  const normalized = String(value).toLowerCase();
  return CATEGORIES.some((item) => item.key === normalized) ? normalized : "best-sellers";
}
function detectCategory(product) {
  const text = [
    product?.title,
    product?.handle,
    product?.productType,
    ...Array.isArray(product?.tags) ? product.tags : []
  ].filter(Boolean).join(" ").toLowerCase();
  if (/(sparkling|champagne|cap classique|prosecco|cava)/.test(text)) return "sparkling";
  if (/(rose|ros[eé])/.test(text)) return "rose";
  if (/(white|sauvignon|chenin|chardonnay|semillon|viognier)/.test(text)) return "whites";
  if (/(red|merlot|cabernet|shiraz|pinot noir|malbec|syrah)/.test(text)) return "reds";
  return "best-sellers";
}
function ProductListClient({ products = [] }) {
  const { addToCart } = useCart();
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
  const filteredProducts = reactExports.useMemo(() => {
    if (activeCategory === "best-sellers") return products;
    return products.filter((product) => detectCategory(product) === activeCategory);
  }, [products, activeCategory]);
  function handleCategoryChange(nextCategory) {
    setActiveCategory(nextCategory);
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    if (nextCategory === "best-sellers") {
      url.searchParams.delete("category");
    } else {
      url.searchParams.set("category", nextCategory);
    }
    if (url.hash !== "#collection") {
      url.hash = "collection";
    }
    window.history.replaceState({}, "", url.toString());
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "catalog-layout", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "catalog-tabs", role: "tablist", "aria-label": "Collections", children: CATEGORIES.map((category) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        className: activeCategory === category.key ? "catalog-tab catalog-tab-active" : "catalog-tab",
        onClick: () => handleCategoryChange(category.key),
        children: category.label
      },
      category.key
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "product-grid", children: filteredProducts.length ? filteredProducts.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product, onAddToCart: addToCart, index: i }, product.id)) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "status-card category-empty", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No products in this category yet." }) }) })
  ] });
}

const $$Astro = createAstro();
const $$ProductList = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ProductList;
  const { products } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "ProductListClient", ProductListClient, { "client:load": true, "products": products, "client:component-hydration": "load", "client:component-path": "C:/Users/Wonga/Desktop/JNW Wine SA FInal/src/components/ProductListClient.jsx", "client:component-export": "default" })}`;
}, "C:/Users/Wonga/Desktop/JNW Wine SA FInal/src/components/ProductList.astro", void 0);

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const configured = shopifyIsConfigured();
  const products = configured ? await getProducts(24) : [];
  const heroProducts = products.slice(0, 5);
  const fallbackImage = "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?auto=format&fit=crop&w=900&q=80";
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "JNW Storefront" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="promo-hero"> <div class="container promo-inner"> <p class="section-label">Limited Release</p> <h1>Free Shipping On Curated 6-Packs</h1> <p class="hero-copy">
Celebrate with premium wines selected for sharing, delivered fast, with secure checkout.
</p> <a href="#collection" class="btn-gold">Shop The Collection</a> ${heroProducts.length > 0 && renderTemplate`<div class="hero-bottle-row" aria-label="Featured products"> ${heroProducts.map((product) => renderTemplate`<a${addAttribute(product.id, "key")} class="hero-bottle"${addAttribute(`/product/${product.handle}`, "href")}> <img${addAttribute(product.images?.edges?.[0]?.node?.url || fallbackImage, "src")}${addAttribute(product.title, "alt")} loading="lazy"> </a>`)} </div>`} </div> </section> <section id="collection" class="section"> <div class="container"> <div class="section-head"> <div> <p class="section-label">Collection</p> </div> </div> ${configured ? products.length ? renderTemplate`${renderComponent($$result2, "ProductList", $$ProductList, { "products": products })}` : renderTemplate`<div class="status-card"> <p>No products found in Shopify.</p> </div>` : renderTemplate`<div class="status-card"> <p>Storefront is not configured. Add Shopify env vars to run this store.</p> </div>`} </div> </section> ` })}`;
}, "C:/Users/Wonga/Desktop/JNW Wine SA FInal/src/pages/index.astro", void 0);

const $$file = "C:/Users/Wonga/Desktop/JNW Wine SA FInal/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
