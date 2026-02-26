import { useEffect, useState, useCallback } from 'react';
import { formatVariantLabel, getVariantVintage } from '../lib/productVariants';

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

export default function useCart() {
  const [cart, setCart] = useState([]);
  const [checkoutState, setCheckoutState] = useState('idle');

  // Hydrate from localStorage on mount
  useEffect(() => {
    setCart(parseCart(localStorage.getItem(STORAGE_KEY)));
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent(CART_SYNC_EVENT, { detail: cart }));
  }, [cart]);

  // Keep multiple cart widgets in sync on the same page and across tabs.
  useEffect(() => {
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

  const addToCart = useCallback((variant, product) => {
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

  const increment = useCallback((variantId) => {
    setCart((current) =>
      current.map((item) =>
        item.variantId === variantId
          ? { ...item, qty: Math.min(MAX_ITEM_QTY, item.qty + 1) }
          : item,
      ),
    );
  }, []);

  const decrement = useCallback((variantId) => {
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

  const checkout = useCallback(async (checkoutMeta = {}) => {
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
