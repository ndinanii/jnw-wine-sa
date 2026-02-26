import React, { useEffect, useMemo, useState } from "react";

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
      phone: typeof parsed.phone === "string" ? parsed.phone : "",
    };
  } catch {
    return null;
  }
}

function normalizePostalCode(value) {
  return String(value || "")
    .toUpperCase()
    .replace(/[^A-Z0-9 -]/g, "")
    .trim()
    .slice(0, 10);
}

function normalizePhone(value) {
  return String(value || "")
    .replace(/\D/g, "")
    .slice(0, 15);
}

function isPostalCodeValid(value) {
  return /^[A-Z0-9][A-Z0-9 -]{2,9}$/.test(value);
}

function isPhoneValid(value) {
  const digitsOnly = value.replace(/\D/g, "");
  return digitsOnly.length >= 9 && digitsOnly.length <= 15;
}

export default function Cart({
  cart,
  onIncrement,
  onDecrement,
  onCheckout,
  checkoutState,
  sticky = true,
}) {
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [deliveryPolicyAccepted, setDeliveryPolicyAccepted] = useState(false);
  const [returnsPolicyAccepted, setReturnsPolicyAccepted] = useState(false);
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
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

  useEffect(() => {
    const payload = {
      ageConfirmed,
      deliveryPolicyAccepted,
      returnsPolicyAccepted,
      postalCode,
      phone,
    };
    try {
      localStorage.setItem(CHECKOUT_COMPLIANCE_STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Ignore storage failures and keep runtime checkout checks active.
    }
  }, [ageConfirmed, deliveryPolicyAccepted, returnsPolicyAccepted, postalCode, phone]);

  const totalItems = useMemo(() => cart.reduce((sum, item) => sum + item.qty, 0), [cart]);
  const totalPrice = useMemo(
    () => cart.reduce((sum, item) => sum + parseFloat(item.price || 0) * item.qty, 0),
    [cart],
  );
  const postalCodeNormalized = normalizePostalCode(postalCode);
  const phoneNormalized = normalizePhone(phone);
  const postalCodeReady = isPostalCodeValid(postalCodeNormalized);
  const phoneReady = isPhoneValid(phoneNormalized);
  const checkoutComplianceReady =
    ageConfirmed &&
    deliveryPolicyAccepted &&
    returnsPolicyAccepted &&
    postalCodeReady &&
    phoneReady;
  const checkoutDisabled = !cart.length || checkoutState === "loading" || !checkoutComplianceReady;

  function handleCheckout() {
    if (checkoutDisabled) return;
    onCheckout({
      compliance: {
        ageConfirmed: true,
        deliveryPolicyAccepted: true,
        returnsPolicyAccepted: true,
      },
      addressCheck: {
        postalCode: postalCodeNormalized,
        phone: phoneNormalized,
      },
    });
  }

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
          {cart.map((item) => {
            const hasReadableVariantTitle =
              item.variantTitle && !/^default title$/i.test(item.variantTitle.trim());
            const variantMeta = hasReadableVariantTitle
              ? item.variantTitle
              : item.vintage
                ? `Vintage ${item.vintage}`
                : "";

            return (
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
                  {variantMeta}
                  {item.price ? `${variantMeta ? " - " : ""}R${parseFloat(item.price).toFixed(2)} per bottle` : ""}
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
            );
          })}
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

          <div className="checkout-compliance-card">
            <p className="checkout-compliance-heading">Before Checkout</p>
            <label className="checkout-check">
              <input
                type="checkbox"
                checked={ageConfirmed}
                onChange={(event) => setAgeConfirmed(event.target.checked)}
              />
              <span>I confirm I am 18 years or older and legally allowed to purchase alcohol.</span>
            </label>
            <label className="checkout-check">
              <input
                type="checkbox"
                checked={deliveryPolicyAccepted}
                onChange={(event) => setDeliveryPolicyAccepted(event.target.checked)}
              />
              <span>I accept delivery terms: valid ID required, no delivery to minors, no unattended drop-offs.</span>
            </label>
            <label className="checkout-check">
              <input
                type="checkbox"
                checked={returnsPolicyAccepted}
                onChange={(event) => setReturnsPolicyAccepted(event.target.checked)}
              />
              <span>I understand returns are for unopened approved returns and damaged/incorrect items reported quickly.</span>
            </label>

            <div className="address-check-grid">
              <label>
                Postal code
                <input
                  type="text"
                  value={postalCode}
                  onChange={(event) => setPostalCode(event.target.value)}
                  placeholder="e.g. 4001"
                  autoComplete="postal-code"
                />
              </label>
              <label>
                Mobile number
                <input
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="e.g. 0821234567"
                  autoComplete="tel"
                />
              </label>
            </div>

            <p className="checkout-compliance-note">
              Address pre-check helps reduce failed deliveries. Please use your final delivery contact details.
            </p>
            <p className="checkout-compliance-error">
              {!postalCodeReady ? "Enter a valid postal code. " : ""}
              {!phoneReady ? "Enter a reachable phone number." : ""}
            </p>
          </div>
        </>
      )}

      <button
        type="button"
        disabled={checkoutDisabled}
        onClick={handleCheckout}
        className="btn-gold"
        style={{ width: "100%", padding: "10px", opacity: checkoutDisabled ? 0.45 : 1 }}
      >
        {checkoutState === "loading" ? "Redirecting..." : "Checkout"}
      </button>
    </aside>
  );
}
