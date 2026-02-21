globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createComponent, k as renderComponent, r as renderTemplate, h as createAstro, m as maybeRenderHead } from '../../chunks/astro/server_DIV_hU0m.mjs';
import { u as useCart, j as jsxRuntimeExports, $ as $$MainLayout } from '../../chunks/MainLayout_BmzsD3Yj.mjs';
import { a as reactExports } from '../../chunks/_@astro-renderers_CHBVxjnt.mjs';
export { r as renderers } from '../../chunks/_@astro-renderers_CHBVxjnt.mjs';
import { g as getProductByHandle, s as shopifyIsConfigured } from '../../chunks/shopify_CZJlNPZv.mjs';

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?auto=format&fit=crop&w=900&q=80";
const BOTTLE_PRICE_ZAR = 155;
function ProductDetailClient({ product }) {
  const { addToCart } = useCart();
  const [selectedVariantIdx, setSelectedVariantIdx] = reactExports.useState(0);
  const [selectedImageIdx, setSelectedImageIdx] = reactExports.useState(0);
  const images = product.images?.edges?.map((edge) => edge.node) ?? [];
  const variants = product.variants?.edges?.map((edge) => edge.node) ?? [];
  const selectedVariant = variants[selectedVariantIdx];
  const selectedImage = images[selectedImageIdx]?.url || FALLBACK_IMAGE;
  const selectedPrice = `R${BOTTLE_PRICE_ZAR.toFixed(2)} per bottle`;
  function handleAddToCart() {
    if (!selectedVariant?.availableForSale) return;
    addToCart(selectedVariant, product);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "product-detail-layout pdp-tight", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pdp-media", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "gold-outline pdp-main-image", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: selectedImage,
          alt: product.title,
          style: { width: "74%", height: "88%", objectFit: "contain", margin: "0 auto" }
        }
      ) }),
      images.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: "4px", marginTop: "6px", flexWrap: "wrap" }, children: images.map((image, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setSelectedImageIdx(idx),
          style: {
            width: "42px",
            height: "54px",
            borderRadius: "var(--radius-sm)",
            overflow: "hidden",
            border: idx === selectedImageIdx ? "2px solid var(--color-gold)" : "1px solid rgba(197,164,90,0.2)",
            padding: 0,
            background: "var(--color-surface)"
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: image.url, alt: image.altText || `${product.title} ${idx + 1}`, style: { width: "100%", height: "100%", objectFit: "cover" } })
        },
        image.url
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pdp-info", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "section-label", style: { margin: "0 0 4px" }, children: "JNW Collection" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { style: { margin: "0 0 6px", fontSize: "clamp(1.2rem, 2.8vw, 1.7rem)", lineHeight: 1.1 }, children: product.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { margin: "0 0 8px", fontSize: "0.95rem", color: "var(--color-gold-soft)" }, children: selectedPrice }),
      product.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { margin: "0 0 10px", fontFamily: "Inter, sans-serif", fontSize: "0.76rem", lineHeight: 1.45, color: "var(--color-text-muted)" }, children: product.description }),
      variants.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: "8px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { margin: "0 0 4px", fontFamily: "Inter, sans-serif", fontSize: "0.62rem", color: "var(--color-text-muted)" }, children: "Choose variant" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: "4px" }, children: variants.map((variant, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setSelectedVariantIdx(idx),
            disabled: !variant.availableForSale,
            className: idx === selectedVariantIdx ? "variant-pill variant-pill-active" : "variant-pill",
            children: variant.title
          },
          variant.id
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: selectedVariant?.availableForSale ? "btn-gold" : "btn-outline",
          onClick: handleAddToCart,
          disabled: !selectedVariant?.availableForSale,
          style: { width: "100%", maxWidth: "240px", padding: "7px 11px" },
          children: selectedVariant?.availableForSale ? "Add to cart" : "Sold out"
        }
      ),
      selectedVariant?.sku && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: { marginTop: "6px", fontFamily: "Inter, sans-serif", fontSize: "0.6rem", color: "var(--color-text-muted)" }, children: [
        "SKU: ",
        selectedVariant.sku
      ] })
    ] })
  ] });
}

const $$Astro = createAstro();
const $$handle = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$handle;
  const { handle } = Astro2.params;
  const configured = shopifyIsConfigured();
  const product = configured && handle ? await getProductByHandle(handle) : null;
  if (configured && handle && !product) {
    Astro2.response.status = 404;
  }
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": product ? `${product.title} | JNW Wine SA` : "Product | JNW Wine SA", "description": product?.description || "JNW Wine SA product page" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="section section-tight"> <div class="container"> <nav class="breadcrumbs"> <a href="/">Collection</a> <span>/</span> <span>${product?.title || "Product"}</span> </nav> ${product ? renderTemplate`${renderComponent($$result2, "ProductDetailClient", ProductDetailClient, { "client:load": true, "product": product, "client:component-hydration": "load", "client:component-path": "C:/Users/Wonga/Desktop/JNW Wine SA FInal/src/components/ProductDetailClient.jsx", "client:component-export": "default" })}` : renderTemplate`<div class="status-card"> <p> ${configured ? "Product not found." : "Storefront is not configured. Add Shopify env vars."} </p> <a class="btn-outline" href="/">Back to collection</a> </div>`} </div> </section> ` })}`;
}, "C:/Users/Wonga/Desktop/JNW Wine SA FInal/src/pages/product/[handle].astro", void 0);

const $$file = "C:/Users/Wonga/Desktop/JNW Wine SA FInal/src/pages/product/[handle].astro";
const $$url = "/product/[handle]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$handle,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
