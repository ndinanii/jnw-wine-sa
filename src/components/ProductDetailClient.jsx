import React, { useState } from "react";
import useCart from "../hooks/useCart";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?auto=format&fit=crop&w=900&q=80";
const BOTTLE_PRICE_ZAR = 155;

export default function ProductDetailClient({ product }) {
  const { addToCart } = useCart();
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  const images = product.images?.edges?.map((edge) => edge.node) ?? [];
  const variants = product.variants?.edges?.map((edge) => edge.node) ?? [];
  const selectedVariant = variants[selectedVariantIdx];
  const selectedImage = images[selectedImageIdx]?.url || FALLBACK_IMAGE;
  const selectedPrice = `R${BOTTLE_PRICE_ZAR.toFixed(2)} per bottle`;

  function handleAddToCart() {
    if (!selectedVariant?.availableForSale) return;
    addToCart(selectedVariant, product);
  }

  return (
    <section className="product-detail-layout pdp-tight">
      <div className="pdp-media">
        <div className="gold-outline pdp-main-image">
          <img
            src={selectedImage}
            alt={product.title}
            style={{ width: "74%", height: "88%", objectFit: "contain", margin: "0 auto" }}
          />
        </div>

        {images.length > 1 && (
          <div style={{ display: "flex", gap: "4px", marginTop: "6px", flexWrap: "wrap" }}>
            {images.map((image, idx) => (
              <button
                key={image.url}
                onClick={() => setSelectedImageIdx(idx)}
                style={{
                  width: "42px",
                  height: "54px",
                  borderRadius: "var(--radius-sm)",
                  overflow: "hidden",
                  border: idx === selectedImageIdx ? "2px solid var(--color-gold)" : "1px solid rgba(197,164,90,0.2)",
                  padding: 0,
                  background: "var(--color-surface)",
                }}
              >
                <img src={image.url} alt={image.altText || `${product.title} ${idx + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="pdp-info">
        <p className="section-label" style={{ margin: "0 0 4px" }}>
          JNW Collection
        </p>
        <h1 style={{ margin: "0 0 6px", fontSize: "clamp(1.2rem, 2.8vw, 1.7rem)", lineHeight: 1.1 }}>{product.title}</h1>
        <p style={{ margin: "0 0 8px", fontSize: "0.95rem", color: "var(--color-gold-soft)" }}>{selectedPrice}</p>
        {product.description && (
          <p style={{ margin: "0 0 10px", fontFamily: "Inter, sans-serif", fontSize: "0.76rem", lineHeight: 1.45, color: "var(--color-text-muted)" }}>
            {product.description}
          </p>
        )}

        {variants.length > 1 && (
          <div style={{ marginBottom: "8px" }}>
            <p style={{ margin: "0 0 4px", fontFamily: "Inter, sans-serif", fontSize: "0.62rem", color: "var(--color-text-muted)" }}>
              Choose variant
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
              {variants.map((variant, idx) => (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => setSelectedVariantIdx(idx)}
                  disabled={!variant.availableForSale}
                  className={idx === selectedVariantIdx ? "variant-pill variant-pill-active" : "variant-pill"}
                >
                  {variant.title}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          type="button"
          className={selectedVariant?.availableForSale ? "btn-gold" : "btn-outline"}
          onClick={handleAddToCart}
          disabled={!selectedVariant?.availableForSale}
          style={{ width: "100%", maxWidth: "240px", padding: "7px 11px" }}
        >
          {selectedVariant?.availableForSale ? "Add to cart" : "Sold out"}
        </button>

        {selectedVariant?.sku && (
          <p style={{ marginTop: "6px", fontFamily: "Inter, sans-serif", fontSize: "0.6rem", color: "var(--color-text-muted)" }}>
            SKU: {selectedVariant.sku}
          </p>
        )}
      </div>
    </section>
  );
}
