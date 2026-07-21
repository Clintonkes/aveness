import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { handleSectionLinkClick } from "@/lib/scrollToSection";

const NAV_LINKS = [
  { label: "Services", id: "services" },
  { label: "Portfolio", id: "portfolio" },
  { label: "Approach", id: "approach" },
  { label: "Estimator", id: "estimator" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-linen/95 backdrop-blur-md border-b border-blade/10 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Brand + coordinates */}
        <a
          href="#top"
          onClick={handleSectionLinkClick("top")}
          className="flex flex-col leading-none"
        >
          <span
            className={`font-display text-2xl font-semibold tracking-tight ${
              scrolled ? "text-blade" : "text-linen"
            }`}
          >
            AVENESS
          </span>
          <span
            className={`font-mono-coord text-[10px] tracking-[0.2em] mt-1 ${
              scrolled ? "text-blade/60" : "text-linen/70"
            }`}
          >
            26.1420°N · 81.7948°W
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={handleSectionLinkClick(l.id)}
              className={`text-sm tracking-wide transition-colors ${
                scrolled
                  ? "text-blade/80 hover:text-gold"
                  : "text-linen/85 hover:text-gold"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#estimator"
          onClick={handleSectionLinkClick("estimator")}
          className="hidden lg:inline-flex items-center px-5 py-2.5 bg-gold text-obsidian text-sm font-medium tracking-wide hover:bg-gold/90 transition-colors"
        >
          Request Care
        </a>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className={`lg:hidden ${scrolled ? "text-blade" : "text-linen"}`}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-linen border-t border-blade/10 mt-3">
          <nav className="flex flex-col px-6 py-6 gap-5">
            {NAV_LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={(e) => {
                  handleSectionLinkClick(l.id)(e);
                  setOpen(false);
                }}
                className="text-blade text-base tracking-wide"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#estimator"
              onClick={(e) => {
                handleSectionLinkClick("estimator")(e);
                setOpen(false);
              }}
              className="inline-flex items-center justify-center px-5 py-3 bg-gold text-obsidian text-sm font-medium"
            >
              Request Care
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}