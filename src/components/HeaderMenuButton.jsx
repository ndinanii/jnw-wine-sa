import React, { useEffect, useState } from "react";

const MENU_LINKS = [
  { href: "/#collection", label: "Shop Wines" },
  { href: "/#information", label: "Information" },
  { href: "/#about-jnw", label: "About" },
  { href: "/#contact", label: "Contact" },
];

const CATEGORY_LINKS = [
  { href: "/#collection", label: "Whites" },
  { href: "/#collection", label: "Reds" },
  { href: "/#collection", label: "Rose" },
  { href: "/#collection", label: "Sparkling" },
];

export default function HeaderMenuButton() {
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
    <div className="header-menu-wrap">
      <button
        type="button"
        className="icon-btn menu-trigger"
        aria-label="Open menu"
        onClick={() => setIsOpen(true)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h16"></path>
        </svg>
      </button>

      {isOpen && (
        <>
          <button
            type="button"
            className="header-menu-overlay"
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}
          />
          <aside className="header-menu-panel" aria-label="Navigation menu">
            <div className="header-menu-head">
              <p>Menu</p>
              <button
                type="button"
                className="header-menu-close"
                aria-label="Close menu"
                onClick={() => setIsOpen(false)}
              >
                x
              </button>
            </div>

            <nav className="header-menu-links" aria-label="Main navigation">
              {MENU_LINKS.map((item) => (
                <a key={item.label} href={item.href} onClick={() => setIsOpen(false)}>
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="header-menu-categories">
              <p>Collections</p>
              <div className="header-menu-tags">
                {CATEGORY_LINKS.map((item) => (
                  <a key={item.label} href={item.href} onClick={() => setIsOpen(false)}>
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </>
      )}
    </div>
  );
}
