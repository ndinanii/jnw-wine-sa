import React, { useEffect, useState } from "react";
import Cart from "./Cart";
import useCart from "../hooks/useCart";

export default function HeaderCartButton() {
  const { cart, totalItems, checkoutState, increment, decrement, checkout } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
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

  useEffect(() => {
    function onKeydown(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", onKeydown);
    return () => window.removeEventListener("keydown", onKeydown);
  }, []);

  return (
    <div className="header-cart-wrap">
      <button
        type="button"
        className="icon-link cart-trigger"
        aria-label={`Cart (${totalItems} items)`}
        onClick={() => setIsOpen(true)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 7h14l-1.4 8.2a2 2 0 0 1-2 1.7H8.4a2 2 0 0 1-2-1.7L5 7Z"></path>
          <path d="M9 7V5a3 3 0 0 1 6 0v2"></path>
        </svg>
        {totalItems > 0 && <span className="header-cart-badge">{totalItems > 99 ? "99+" : totalItems}</span>}
      </button>

      {isOpen && (
        <>
          <button
            type="button"
            className="header-cart-overlay"
            aria-label="Close cart"
            onClick={() => setIsOpen(false)}
          />
          <aside className="header-cart-panel" aria-label="Shopping cart panel">
            <div className="header-cart-panel-head">
              <p>Cart</p>
              <button
                type="button"
                className="header-cart-close"
                aria-label="Close cart"
                onClick={() => setIsOpen(false)}
              >
                x
              </button>
            </div>
            <div className="header-cart-panel-body">
              <Cart
                cart={cart}
                onIncrement={increment}
                onDecrement={decrement}
                onCheckout={checkout}
                checkoutState={checkoutState}
                sticky={false}
              />
            </div>
          </aside>
        </>
      )}
    </div>
  );
}
