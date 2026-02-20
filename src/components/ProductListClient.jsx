import React, { useEffect, useMemo, useState } from 'react';
import ProductCard from './ProductCard';
import useCart from '../hooks/useCart';

const CATEGORIES = [
  { key: 'best-sellers', label: 'Best Sellers' },
  { key: 'whites', label: 'Whites' },
  { key: 'reds', label: 'Reds' },
  { key: 'rose', label: 'Rose' },
  { key: 'sparkling', label: 'Sparkling' },
];

function normalizeCategory(value) {
  if (!value) return 'best-sellers';
  const normalized = String(value).toLowerCase();
  return CATEGORIES.some((item) => item.key === normalized) ? normalized : 'best-sellers';
}

function detectCategory(product) {
  const text = [
    product?.title,
    product?.handle,
    product?.productType,
    ...(Array.isArray(product?.tags) ? product.tags : []),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  if (/(sparkling|champagne|cap classique|prosecco|cava)/.test(text)) return 'sparkling';
  if (/(rose|ros[eé])/.test(text)) return 'rose';
  if (/(white|sauvignon|chenin|chardonnay|semillon|viognier)/.test(text)) return 'whites';
  if (/(red|merlot|cabernet|shiraz|pinot noir|malbec|syrah)/.test(text)) return 'reds';
  return 'best-sellers';
}

export default function ProductListClient({ products = [] }) {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState('best-sellers');

  useEffect(() => {
    function syncFromUrl() {
      const params = new URLSearchParams(window.location.search);
      setActiveCategory(normalizeCategory(params.get('category')));
    }

    syncFromUrl();
    window.addEventListener('popstate', syncFromUrl);
    return () => window.removeEventListener('popstate', syncFromUrl);
  }, []);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'best-sellers') return products;
    return products.filter((product) => detectCategory(product) === activeCategory);
  }, [products, activeCategory]);

  function handleCategoryChange(nextCategory) {
    setActiveCategory(nextCategory);

    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);
    if (nextCategory === 'best-sellers') {
      url.searchParams.delete('category');
    } else {
      url.searchParams.set('category', nextCategory);
    }
    if (url.hash !== '#collection') {
      url.hash = 'collection';
    }
    window.history.replaceState({}, '', url.toString());
  }

  return (
    <section className="catalog-layout">
      <div className="catalog-tabs" role="tablist" aria-label="Collections">
        {CATEGORIES.map((category) => (
          <button
            key={category.key}
            type="button"
            className={
              activeCategory === category.key
                ? 'catalog-tab catalog-tab-active'
                : 'catalog-tab'
            }
            onClick={() => handleCategoryChange(category.key)}
          >
            {category.label}
          </button>
        ))}
      </div>
      <div className="product-grid">
        {filteredProducts.length ? (
          filteredProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} onAddToCart={addToCart} index={i} />
          ))
        ) : (
          <div className="status-card category-empty">
            <p>No products in this category yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
