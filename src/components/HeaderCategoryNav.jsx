import React from "react";

const PROMO_TEXT =
  "PREMIUM SOUTH AFRICAN WINES  •  R155.00 PER BOTTLE  •  SECURE CHECKOUT  •  SHOP THE JNW COLLECTION";

export default function HeaderCategoryNav() {
  return (
    <section className="header-promo" aria-label="Promotions">
      <div className="header-promo-track">
        <span>{PROMO_TEXT}</span>
        <span aria-hidden="true">{PROMO_TEXT}</span>
      </div>
    </section>
  );
}
