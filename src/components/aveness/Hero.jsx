import React, { useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HERO_IMG = "https://media.base44.com/images/public/6a5d5a3dd2e5eb4ee0df1b96/d65c989dd_generated_4e375043.png";
const BEFORE_IMG = "https://media.base44.com/images/public/6a5d5a3dd2e5eb4ee0df1b96/493477298_generated_772bfbd1.png";

export default function Hero() {
  const [pos, setPos] = useState(55);
  const containerRef = useRef(null);
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX) => {
    const rect = containerRef.current.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(2, Math.min(98, pct)));
  }, []);

  const onMove = useCallback(
    (e) => {
      if (!dragging.current) return;
      updateFromClientX(e.touches ? e.touches[0].clientX : e.clientX);
    },
    [updateFromClientX]
  );

  const startDrag = () => {
    dragging.current = true;
  };
  const stopDrag = () => {
    dragging.current = false;
  };

  return (
    <section id="top" className="relative h-screen min-h-[680px] w-full overflow-hidden">
      {/* After (Aveness) image - base layer */}
      <img
        src={HERO_IMG}
        alt="Perfectly striped Aveness estate lawn at golden hour"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Before image - clipped to left portion */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <img
          src={BEFORE_IMG}
          alt="Standard lawn before Aveness care"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute top-8 left-8 bg-obsidian/70 text-linen font-mono-coord text-xs tracking-[0.2em] px-4 py-2">
          BEFORE
        </div>
      </div>

      <div className="absolute top-8 right-8 bg-blade/80 text-gold font-mono-coord text-xs tracking-[0.2em] px-4 py-2">
        AVENESS
      </div>

      {/* Slider handle */}
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-gold z-20 cursor-ew-resize"
        style={{ left: `${pos}%` }}
        onMouseDown={startDrag}
        onTouchStart={startDrag}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gold flex items-center justify-center shadow-2xl">
          <ChevronLeft className="text-obsidian" size={18} />
          <ChevronRight className="text-obsidian -ml-1" size={18} />
        </div>
      </div>

      {/* Mouse move overlay */}
      <div
        className="absolute inset-0 z-10"
        onMouseMove={onMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        onTouchMove={onMove}
        onTouchEnd={stopDrag}
      />

      {/* Dark gradient for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/40 via-transparent to-obsidian/70 pointer-events-none" />

      {/* Headline */}
      <div className="relative z-30 h-full flex flex-col justify-end pb-24 px-6 lg:px-12 max-w-[1400px] mx-auto pointer-events-none">
        <p className="font-mono-coord text-gold text-xs tracking-[0.3em] mb-5">
          ESTATE PRECISION · NAPLES, FL
        </p>
        <h1 className="font-display text-linen text-5xl sm:text-6xl lg:text-8xl font-light leading-[0.95] max-w-4xl">
          The Art of the Blade.
          <br />
          <span className="text-gold italic">The Science</span> of the Soil.
        </h1>
        <p className="text-linen/80 text-lg lg:text-xl mt-8 max-w-xl font-light">
          Botanic curation and architectural topography for the estates of
          Naples. Every blade, a structural element. Every lawn, a gallery.
        </p>
        <div className="flex flex-wrap gap-4 mt-10 pointer-events-auto">
          <a
            href="#estimator"
            className="inline-flex items-center px-8 py-4 bg-gold text-obsidian text-sm font-medium tracking-wide hover:bg-gold/90 transition-colors"
          >
            Instant Estimate
          </a>
          <a
            href="#portfolio"
            className="inline-flex items-center px-8 py-4 border border-linen/40 text-linen text-sm font-medium tracking-wide hover:border-gold hover:text-gold transition-colors"
          >
            View Portfolio
          </a>
        </div>
      </div>

      {/* Drag hint */}
      <div className="absolute bottom-8 right-8 z-30 font-mono-coord text-linen/60 text-[10px] tracking-[0.2em] hidden md:block">
        ← DRAG TO COMPARE →
      </div>
    </section>
  );
}