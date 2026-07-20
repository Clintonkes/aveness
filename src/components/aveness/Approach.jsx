import React from "react";

export default function Approach() {
  return (
    <section id="approach" className="bg-obsidian text-linen py-24 lg:py-32 relative overflow-hidden">
      {/* Coordinate watermark */}
      <div className="absolute top-10 right-10 font-mono-coord text-linen/10 text-xs tracking-[0.3em]">
        NAPLES · FL · 34116
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <p className="font-mono-coord text-gold text-xs tracking-[0.3em] mb-6">
          03 — THE AVENESS METHOD
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <h2 className="font-display text-4xl lg:text-6xl font-light leading-[1.05]">
            We reject the
            <span className="italic text-gold"> "man-with-mower" </span>
            aesthetic. Every lawn is a high-end estate gallery.
          </h2>

          <div className="space-y-10">
            {[
              {
                n: "I.",
                t: "Botanic Curation",
                d: "We identify your grass species, sun exposure, and soil profile before a single blade is cut — then build a species-specific height and frequency protocol.",
              },
              {
                n: "II.",
                t: "Architectural Topography",
                d: "Mowing lines are laid out to complement sightlines from your terrace, pool, and entry — turning the lawn into composed geometry.",
              },
              {
                n: "III.",
                t: "Surgical Execution",
                d: "Clean equipment, sharp reels, 30-degree edge bevels, and a debris-free finish. The Naples 4:00 PM sun reveals every detail — we make sure it's flawless.",
              },
            ].map((item) => (
              <div key={item.n} className="flex gap-6 border-t border-linen/15 pt-8">
                <span className="font-display text-gold text-2xl font-light w-12 shrink-0">
                  {item.n}
                </span>
                <div>
                  <h3 className="font-display text-2xl font-light mb-2">{item.t}</h3>
                  <p className="text-linen/70 text-base font-light leading-relaxed">
                    {item.d}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}