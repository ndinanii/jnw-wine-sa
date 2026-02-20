import React, { useEffect, useState } from "react";

const CATEGORY_ITEMS = [
  { key: "best-sellers", label: "Best Sellers" },
  { key: "whites", label: "Whites" },
  { key: "reds", label: "Reds" },
  { key: "rose", label: "Rose" },
  { key: "sparkling", label: "Sparkling" },
];

function normalizeCategory(value) {
  if (!value) return "best-sellers";
  const normalized = String(value).toLowerCase();
  return CATEGORY_ITEMS.some((item) => item.key === normalized) ? normalized : "best-sellers";
}

export default function HeaderCategoryNav() {
  const [activeCategory, setActiveCategory] = useState("best-sellers");

  useEffect(() => {
    function syncFromUrl() {
      const params = new URLSearchParams(window.location.search);
      setActiveCategory(normalizeCategory(params.get("category")));
    }

    syncFromUrl();
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, []);

  return (
    <nav className="header-cats" aria-label="Shop categories">
      {CATEGORY_ITEMS.map((item) => {
        const isActive = activeCategory === item.key;
        const href =
          item.key === "best-sellers"
            ? "/#collection"
            : `/?category=${encodeURIComponent(item.key)}#collection`;

        return (
          <a
            key={item.key}
            className={isActive ? "header-cat header-cat-active" : "header-cat"}
            href={href}
          >
            {isActive && (
              <span className="header-dot" aria-hidden="true"></span>
            )}
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
