import React, { useEffect, useState } from "react";

const AGE_GATE_STORAGE_KEY = "jnw-age-gate-v1";
const AGE_GATE_VALIDITY_MS = 1000 * 60 * 60 * 24 * 30;

function hasValidAgeGate() {
  try {
    const raw = localStorage.getItem(AGE_GATE_STORAGE_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    const verifiedAt = Number(parsed?.verifiedAt);
    if (!Number.isFinite(verifiedAt)) return false;
    return Date.now() - verifiedAt < AGE_GATE_VALIDITY_MS;
  } catch {
    return false;
  }
}

function storeAgeGateConfirmation() {
  try {
    localStorage.setItem(
      AGE_GATE_STORAGE_KEY,
      JSON.stringify({
        verifiedAt: Date.now(),
      }),
    );
  } catch {
    // Ignore storage failures and continue session.
  }
}

export default function AgeGate() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(!hasValidAgeGate());
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow || "";
    };
  }, [isOpen]);

  function handleConfirmAge() {
    storeAgeGateConfirmation();
    setIsOpen(false);
  }

  function handleExitSite() {
    window.location.href = "https://www.responsibility.org/";
  }

  if (!isOpen) return null;

  return (
    <div className="age-gate-overlay" role="dialog" aria-modal="true" aria-labelledby="age-gate-title">
      <div className="age-gate-card">
        <p className="section-label" style={{ marginBottom: "6px" }}>
          Age Verification
        </p>
        <h2 id="age-gate-title" className="age-gate-title">
          This store is for adults 18+ only
        </h2>
        <p className="age-gate-copy">
          By entering, you confirm you are of legal drinking age in your region. ID may be required on delivery.
        </p>
        <div className="age-gate-actions">
          <button type="button" className="btn-gold" onClick={handleConfirmAge}>
            I am 18 or older
          </button>
          <button type="button" className="btn-outline" onClick={handleExitSite}>
            Exit Site
          </button>
        </div>
      </div>
    </div>
  );
}
