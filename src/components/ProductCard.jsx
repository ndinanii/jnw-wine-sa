import React, { useState } from "react";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?auto=format&fit=crop&w=900&q=80";
const BOTTLE_PRICE_ZAR = 155;

export default function ProductCard({ product, onAddToCart, index = 0 }) {
  const [added, setAdded] = useState(false);
  const firstImage = product.images?.edges?.[0]?.node?.url;
  const firstVariant = product.variants?.edges?.[0]?.node;
  const bottlePrice = `R${BOTTLE_PRICE_ZAR.toFixed(2)} per bottle`;

  function handleAdd() {
    if (!firstVariant?.availableForSale) return;
    onAddToCart(firstVariant, product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <article className="product-card" style={{ animationDelay: `${index * 60}ms` }}>
      <a href={`/product/${product.handle}`} style={{ display: "block" }}>
        <div className="card-image" style={{ aspectRatio: "1/1", position: "relative" }}>
          <img
            src={firstImage || FALLBACK_IMAGE}
            alt={product.title}
            style={{ width: "70%", height: "84%", objectFit: "contain", margin: "0 auto" }}
            loading="lazy"
          />
        </div>
      </a>

      <div className="product-card-body">
        <p className="product-meta-label">Estate Label</p>
        <a href={`/product/${product.handle}`}>
          <h3 className="product-meta-title">
            {product.title}
          </h3>
        </a>
        <p className="product-meta-price">{bottlePrice}</p>

        {firstVariant?.availableForSale ? (
          <button
            type="button"
            className="btn-gold product-card-cta"
            onClick={handleAdd}
            style={{ padding: "8px 12px", fontSize: "0.58rem" }}
          >
            {added ? "Added" : "Add to cart"}
          </button>
        ) : (
          <span
            className="btn-outline product-card-cta"
            style={{
              justifyContent: "center",
              padding: "8px 12px",
              fontSize: "0.58rem",
              opacity: 0.6,
              cursor: "not-allowed",
            }}
          >
            Sold out
          </span>
        )}
      </div>
    </article>
  );
}
