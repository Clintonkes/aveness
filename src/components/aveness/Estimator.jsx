import React, { useState } from "react";
import { Check, MapPin, Calendar, User, ArrowRight, ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { extractErrorMessage } from "@/lib/apiError";

const API_URL = import.meta.env.VITE_API_URL || "";

const FREQUENCIES = [
  { id: "weekly", label: "Weekly", desc: "Peak-season estate standard" },
  { id: "biweekly", label: "Bi-weekly", desc: "Balanced maintenance" },
  { id: "seasonal", label: "Seasonal", desc: "Quarterly deep programs" },
];

export default function Estimator() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    address: "",
    frequency: "",
    name: "",
    email: "",
    phone: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState("");
  const { toast } = useToast();

  const canNext =
    (step === 1 && data.address.trim().length > 3) ||
    (step === 2 && data.frequency) ||
    step === 3;

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: data.address,
          frequency: data.frequency,
          name: data.name,
          email: data.email,
          phone: data.phone || null,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(extractErrorMessage(err.detail, "Submission failed"));
      }
      const result = await res.json();
      setReference(result.reference);
      setSubmitted(true);
      toast({
        title: "Request Submitted",
        description: `Your reference number is ${result.reference}. Check your email for confirmation.`,
        variant: "default",
      });
    } catch (err) {
      toast({
        title: "Submission Failed",
        description: err.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="estimator" className="bg-blade text-linen py-24 lg:py-32">
      <div className="max-w-[1100px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-14">
          <p className="font-mono-coord text-gold text-xs tracking-[0.3em] mb-4">
            05 — INSTANT ESTIMATOR
          </p>
          <h2 className="font-display text-4xl lg:text-6xl font-light leading-[1.05]">
            Three steps to <span className="italic text-gold">estate care</span>.
          </h2>
          <p className="text-linen/60 mt-5 max-w-md mx-auto font-light">
            No clutter. No obligation. A specialist responds within one business day.
          </p>
        </div>

        {/* Progress */}
        {!submitted && (
          <div className="flex items-center justify-center gap-3 mb-12">
            {[1, 2, 3].map((n) => (
              <React.Fragment key={n}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-mono-coord text-xs border transition-colors ${
                    step >= n
                      ? "bg-gold text-obsidian border-gold"
                      : "border-linen/30 text-linen/50"
                  }`}
                >
                  {step > n ? <Check size={14} /> : n}
                </div>
                {n < 3 && (
                  <div
                    className={`w-16 h-px ${
                      step > n ? "bg-gold" : "bg-linen/20"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        <div className="bg-linen text-blade p-8 lg:p-14 max-w-2xl mx-auto">
          {submitted ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-6">
                <Check className="text-gold" size={28} />
              </div>
              <h3 className="font-display text-3xl font-light mb-3">
                Request received.
              </h3>
              <p className="text-blade/70 font-light">
                Thank you, {data.name || "neighbor"}. An Aveness estate specialist
                will contact you at {data.email || data.phone || "your provided details"} within one business day.
              </p>
              <p className="font-mono-coord text-xs tracking-wide text-blade/50 mt-6">
                REF · {reference}
              </p>
            </div>
          ) : (
            <form onSubmit={submit}>
              {step === 1 && (
                <div>
                  <label className="flex items-center gap-2 font-mono-coord text-xs tracking-[0.2em] text-blade/60 mb-4">
                    <MapPin size={14} /> STEP 01 — PROPERTY ADDRESS
                  </label>
                  <input
                    type="text"
                    value={data.address}
                    onChange={(e) => setData({ ...data, address: e.target.value })}
                    placeholder="e.g. 2114 55th St, Naples, FL 34116"
                    className="w-full bg-transparent border-b-2 border-blade/20 focus:border-gold py-3 text-xl font-light outline-none transition-colors"
                    autoFocus
                  />
                  <p className="text-sm text-blade/50 mt-3 font-light">
                    We assess lot size and access from the address you provide.
                  </p>
                </div>
              )}

              {step === 2 && (
                <div>
                  <label className="flex items-center gap-2 font-mono-coord text-xs tracking-[0.2em] text-blade/60 mb-6">
                    <Calendar size={14} /> STEP 02 — SERVICE FREQUENCY
                  </label>
                  <div className="space-y-3">
                    {FREQUENCIES.map((f) => (
                      <button
                        type="button"
                        key={f.id}
                        onClick={() => setData({ ...data, frequency: f.id })}
                        className={`w-full text-left p-5 border-2 transition-colors ${
                          data.frequency === f.id
                            ? "border-gold bg-gold/10"
                            : "border-blade/15 hover:border-blade/40"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-display text-xl">{f.label}</span>
                          <div
                            className={`w-5 h-5 rounded-full border-2 ${
                              data.frequency === f.id
                                ? "border-gold bg-gold"
                                : "border-blade/30"
                            }`}
                          />
                        </div>
                        <p className="text-sm text-blade/60 mt-1 font-light">
                          {f.desc}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <label className="flex items-center gap-2 font-mono-coord text-xs tracking-[0.2em] text-blade/60">
                    <User size={14} /> STEP 03 — CONTACT DETAILS
                  </label>
                  <input
                    type="text"
                    required
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    placeholder="Full name"
                    className="w-full bg-transparent border-b-2 border-blade/20 focus:border-gold py-3 text-lg font-light outline-none transition-colors"
                  />
                  <input
                    type="email"
                    required
                    value={data.email}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                    placeholder="Email address"
                    className="w-full bg-transparent border-b-2 border-blade/20 focus:border-gold py-3 text-lg font-light outline-none transition-colors"
                  />
                  <input
                    type="tel"
                    value={data.phone}
                    onChange={(e) => setData({ ...data, phone: e.target.value })}
                    placeholder="Phone (optional)"
                    className="w-full bg-transparent border-b-2 border-blade/20 focus:border-gold py-3 text-lg font-light outline-none transition-colors"
                  />
                </div>
              )}

              {/* Controls */}
              <div className="flex items-center justify-between mt-10">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="inline-flex items-center gap-2 text-blade/60 text-sm tracking-wide hover:text-blade transition-colors"
                  >
                    <ArrowLeft size={16} /> Back
                  </button>
                ) : (
                  <span />
                )}
                {step < 3 ? (
                  <button
                    type="button"
                    disabled={!canNext}
                    onClick={() => setStep(step + 1)}
                    className="inline-flex items-center gap-2 px-7 py-3 bg-blade text-linen text-sm font-medium tracking-wide disabled:opacity-30 hover:bg-obsidian transition-colors"
                  >
                    Continue <ArrowRight size={16} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 px-7 py-3 bg-gold text-obsidian text-sm font-medium tracking-wide hover:bg-gold/90 transition-colors disabled:opacity-50"
                  >
                    {submitting ? "Submitting..." : "Request Estimate"} <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
