import React, { useMemo } from "react";

export default function Cart({
  cart,
  onIncrement,
  onDecrement,
  onCheckout,
  checkoutState,
  sticky = true,
}) {
  const totalItems = useMemo(() => cart.reduce((sum, item) => sum + item.qty, 0), [cart]);
  const totalPrice = useMemo(
    () => cart.reduce((sum, item) => sum + parseFloat(item.price || 0) * item.qty, 0),
    [cart],
  );
  const asideClass = `${sticky ? "cart-sidebar " : ""}glass-strong`.trim();

  return (
    <aside className={asideClass} style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px" }}>
        <h2 style={{ margin: 0, fontSize: "1.3rem" }}>Cart</h2>
        <span className="badge">
          {totalItems} {totalItems === 1 ? "item" : "items"}
        </span>
      </div>

      <hr className="gold-divider" style={{ margin: "12px 0" }} />

      {cart.length === 0 ? (
        <p style={{ margin: 0, fontFamily: "Inter, sans-serif", fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
          Your cart is empty
        </p>
      ) : (
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "8px" }}>
          {cart.map((item) => (
            <li
              key={item.variantId}
              style={{
                borderRadius: "var(--radius-sm)",
                border: "1px solid rgba(197,164,90,0.12)",
                padding: "12px",
                background: "rgba(197,164,90,0.03)",
              }}
            >
              <p style={{ margin: "0 0 2px", fontFamily: "Inter, sans-serif", fontSize: "0.82rem" }}>{item.title}</p>
              <p style={{ margin: "0 0 10px", fontFamily: "Inter, sans-serif", fontSize: "0.72rem", color: "var(--color-text-muted)" }}>
                {item.variantTitle}
                {item.price ? ` - R${parseFloat(item.price).toFixed(2)} per bottle` : ""}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <button type="button" className="qty-btn" onClick={() => onDecrement(item.variantId)}>
                  -
                </button>
                <span style={{ minWidth: "20px", textAlign: "center", fontFamily: "Inter, sans-serif", fontSize: "0.82rem" }}>
                  {item.qty}
                </span>
                <button type="button" className="qty-btn" onClick={() => onIncrement(item.variantId)}>
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {cart.length > 0 && (
        <>
          <hr className="gold-divider" style={{ margin: "12px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
              Estimated total
            </span>
            <strong style={{ color: "var(--color-gold-soft)" }}>
              R{totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </strong>
          </div>
        </>
      )}

      <button
        type="button"
        disabled={!cart.length || checkoutState === "loading"}
        onClick={onCheckout}
        className="btn-gold"
        style={{ width: "100%", padding: "10px", opacity: !cart.length ? 0.45 : 1 }}
      >
        {checkoutState === "loading" ? "Redirecting..." : "Checkout"}
      </button>
    </aside>
  );
}
