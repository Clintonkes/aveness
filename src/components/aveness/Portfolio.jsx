import React, { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const EXHIBITS = [
  {
    name: "Port Royal Residence",
    neighborhood: "Port Royal · Naples",
    species: "Celebration Bermudagrass",
    frequency: "Weekly · Year-round",
    area: "1.4 acres",
    img: "https://media.base44.com/images/public/6a5d5a3dd2e5eb4ee0df1b96/493477298_generated_772bfbd1.png",
  },
  {
    name: "Old Naples Courtyard",
    neighborhood: "Old Naples",
    species: "Floratam St. Augustine",
    frequency: "Bi-weekly · Seasonal",
    area: "0.3 acres",
    img: "https://media.base44.com/images/public/6a5d5a3dd2e5eb4ee0df1b96/9ee7327f1_generated_5fdb9850.png",
  },
  {
    name: "Pelican Bay Estate",
    neighborhood: "Pelican Bay",
    species: "Empire Zoysia",
    frequency: "Weekly · 12-month",
    area: "0.9 acres",
    img: "https://media.base44.com/images/public/6a5d5a3dd2e5eb4ee0df1b96/0643672ee_generated_66730131.png",
  },
  {
    name: "Aqualane Shores Villa",
    neighborhood: "Aqualane Shores",
    species: "Seashore Paspalum",
    frequency: "Weekly · Salt-tolerant",
    area: "0.5 acres",
    img: "https://media.base44.com/images/public/6a5d5a3dd2e5eb4ee0df1b96/858347446_generated_f5cc6c49.png",
  },
];

export default function Portfolio({ onRequestCare }) {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    const amount = 460;
    scrollRef.current?.scrollBy({
      left: dir * amount,
      behavior: "smooth",
    });
  };

  return (
    <section id="portfolio" className="bg-linen py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div>
            <p className="font-mono-coord text-gold text-xs tracking-[0.3em] mb-4">
              04 — THE NAPLES PORTFOLIO
            </p>
            <h2 className="font-display text-blade text-4xl lg:text-6xl font-light leading-[1.05]">
              Selected <span className="italic text-gold">exhibits</span>.
            </h2>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => scroll(-1)}
              className="w-12 h-12 border border-blade/30 text-blade hover:bg-blade hover:text-linen transition-colors flex items-center justify-center"
              aria-label="Previous"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={() => scroll(1)}
              className="w-12 h-12 border border-blade/30 text-blade hover:bg-blade hover:text-linen transition-colors flex items-center justify-center"
              aria-label="Next"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal scroll gallery */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth px-6 lg:px-12 pb-4 snap-x"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="shrink-0 w-[calc(50vw-1400px/2+24px)] hidden lg:block" />
        {EXHIBITS.map((ex, i) => (
          <article
            key={ex.name}
            className="shrink-0 w-[85vw] sm:w-[440px] snap-start group"
          >
            <div className="relative overflow-hidden aspect-[4/5]">
              <img
                src={ex.img}
                alt={ex.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 font-mono-coord text-linen text-[10px] tracking-[0.25em] bg-obsidian/60 px-3 py-1.5">
                EXHIBIT 0{i + 1}
              </div>
            </div>
            <div className="pt-6 border-t border-blade/15 mt-6">
              <h3 className="font-display text-blade text-2xl font-light">
                {ex.name}
              </h3>
              <dl className="mt-4 space-y-2 font-mono-coord text-xs tracking-wide text-blade/70">
                <div className="flex justify-between">
                  <dt className="text-blade/50">NEIGHBORHOOD</dt>
                  <dd>{ex.neighborhood}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-blade/50">SPECIES</dt>
                  <dd className="text-right">{ex.species}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-blade/50">CADENCE</dt>
                  <dd>{ex.frequency}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-blade/50">AREA</dt>
                  <dd>{ex.area}</dd>
                </div>
              </dl>
              <button
                onClick={onRequestCare}
                className="mt-6 inline-flex items-center gap-2 text-gold text-sm tracking-wide border-b border-gold pb-1 hover:gap-3 transition-all"
              >
                Request this level of care
                <ArrowRight size={14} />
              </button>
            </div>
          </article>
        ))}
        <div className="shrink-0 w-6" />
      </div>
    </section>
  );
}