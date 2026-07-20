import React, { useState, useEffect } from "react";
import { Mail, MapPin, ArrowUp } from "lucide-react";

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <footer id="contact" className="bg-blade text-linen relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20 lg:py-28">
        <p className="font-mono-coord text-gold text-xs tracking-[0.3em] mb-8">
          06 — FINAL SIGNATURE
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left — brand + tagline */}
          <div>
            <h2 className="font-display text-5xl lg:text-7xl font-light leading-[0.95]">
              AVENESS
            </h2>
            <p className="font-mono-coord text-linen/50 text-xs tracking-[0.25em] mt-3">
              26.1420°N · 81.7948°W · NAPLES, FL
            </p>
            <p className="text-linen/70 text-lg font-light mt-8 max-w-md leading-relaxed">
              Estate lawncare and mowing for the discerning properties of Naples.
              Botanic curation. Architectural topography. Surgical execution.
            </p>
          </div>

          {/* Right — contact hierarchy */}
          <div className="space-y-10">
            <div>
              <p className="font-mono-coord text-gold/70 text-[10px] tracking-[0.25em] mb-2">
                THE DIRECT LINE
              </p>
              <a
                href="tel:+12392347465"
                className="font-display text-3xl lg:text-5xl font-light text-linen hover:text-gold transition-colors block"
              >
                +1 239 234 7465
              </a>
            </div>

            <div>
              <p className="font-mono-coord text-gold/70 text-[10px] tracking-[0.25em] mb-2">
                THE DIGITAL GATEWAY
              </p>
              <a
                href="mailto:avenessllc@proton.me"
                className="text-lg lg:text-xl text-linen hover:text-gold transition-colors inline-flex items-center gap-3"
              >
                <Mail size={18} className="text-gold" />
                avenessllc@proton.me
              </a>
            </div>

            <div>
              <p className="font-mono-coord text-gold/70 text-[10px] tracking-[0.25em] mb-2">
                THE PHYSICAL ANCHOR
              </p>
              <p className="text-lg text-linen/80 font-light inline-flex items-start gap-3">
                <MapPin size={18} className="text-gold mt-1 shrink-0" />
                2114 55th St de Naples, FL 34116
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-4">
              <a
                href="#estimator"
                className="inline-flex items-center px-8 py-4 bg-gold text-obsidian text-sm font-medium tracking-wide hover:bg-gold/90 transition-colors"
              >
                Request Care
              </a>
              <a
                href="#contact-form"
                className="inline-flex items-center px-8 py-4 border border-linen/30 text-linen text-sm font-medium tracking-wide hover:border-gold hover:text-gold transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-20 pt-8 border-t border-linen/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono-coord text-linen/40 text-xs tracking-wide">
            © {new Date().getFullYear()} AVENESS LLC · ALL RIGHTS RESERVED
          </p>
          <div className="flex gap-6 font-mono-coord text-linen/40 text-xs tracking-wide">
            <span>LICENSED · INSURED</span>
            <span>FLORIDA · COLLIER COUNTY</span>
            <a href="/admin" className="hover:text-gold transition-colors">ADMIN</a>
          </div>
        </div>
      </div>

      {/* Back to top — vertical mowing path */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-8 left-6 z-50 flex flex-col items-center gap-2 transition-all duration-500 ${
          showTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        aria-label="Back to top"
      >
        <span className="font-mono-coord text-gold text-[10px] tracking-[0.2em] rotate-180 [writing-mode:vertical-rl]">
          RETURN TO TOP
        </span>
        <div className="w-px h-12 bg-gold/50" />
        <div className="w-8 h-8 border border-gold rounded-full flex items-center justify-center bg-blade">
          <ArrowUp size={14} className="text-gold" />
        </div>
      </button>
    </footer>
  );
}