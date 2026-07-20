import React from "react";

const SERVICES = [
  {
    name: "Precision Mowing",
    desc: "Geometric stripe patterns engineered to your estate's topography, cut at species-optimal height.",
    detail: "Alternating directional cuts · 22-inch reels · Debris-free finish",
    img: "https://media.base44.com/images/public/6a5d5a3dd2e5eb4ee0df1b96/0643672ee_generated_66730131.png",
    span: "lg:col-span-7",
  },
  {
    name: "Surgical Edging",
    desc: "Crisp, architectural borders where turf meets stone, shell, and marble.",
    detail: "30-degree bevel lines · weekly re-definition",
    img: "https://media.base44.com/images/public/6a5d5a3dd2e5eb4ee0df1b96/44eaa2275_generated_5f653fb1.png",
    span: "lg:col-span-5",
  },
  {
    name: "Soil & Fertilization",
    desc: "Data-driven nutrient programs calibrated to Southwest Florida's sandy loam and salt air.",
    detail: "Quarterly soil panels · slow-release formulations",
    img: "https://media.base44.com/images/public/6a5d5a3dd2e5eb4ee0df1b96/858347446_generated_f5cc6c49.png",
    span: "lg:col-span-5",
  },
  {
    name: "Estate Curation",
    desc: "Full-season stewardship — aeration, pest scouting, palm detailing, and seasonal top-dressing.",
    detail: "Dedicated estate specialist · 12-month programs",
    img: "https://media.base44.com/images/public/6a5d5a3dd2e5eb4ee0df1b96/493477298_generated_772bfbd1.png",
    span: "lg:col-span-7",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-linen py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <p className="font-mono-coord text-gold text-xs tracking-[0.3em] mb-4">
              02 — SERVICE INVENTORY
            </p>
            <h2 className="font-display text-blade text-4xl lg:text-6xl font-light max-w-2xl leading-[1.05]">
              Four disciplines.
              <br />
              One standard of <span className="italic text-gold">precision</span>.
            </h2>
          </div>
          <p className="text-blade/70 max-w-sm text-base">
            Each service is a tier of mastery — not a checkbox. We maintain a
            limited roster of Naples estates to guarantee obsessive attention.
          </p>
        </div>

        {/* Asymmetrical grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {SERVICES.map((s, i) => (
            <article
              key={s.name}
              className={`group relative overflow-hidden ${s.span} aspect-[4/3] lg:aspect-auto lg:min-h-[440px]`}
            >
              <img
                src={s.img}
                alt={s.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-blade/20 group-hover:bg-blade/75 transition-colors duration-500" />
              <div className="absolute inset-0 p-8 lg:p-10 flex flex-col justify-end">
                <p className="font-mono-coord text-gold text-[10px] tracking-[0.25em] mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  0{i + 1}
                </p>
                <h3 className="font-display text-linen text-3xl lg:text-4xl font-light">
                  {s.name}
                </h3>
                <div className="max-h-0 group-hover:max-h-40 overflow-hidden transition-all duration-500">
                  <p className="text-linen/90 text-base mt-4 font-light leading-relaxed">
                    {s.desc}
                  </p>
                  <p className="font-mono-coord text-gold text-xs tracking-wide mt-4">
                    {s.detail}
                  </p>
                </div>
              </div>
              {/* Diagonal blade accent */}
              <div className="absolute top-0 right-0 w-16 h-16 blade-divider opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}