import React, { useState } from "react";
import { Send, Mail, Phone, User, MessageSquare } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function ContactForm() {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/api/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone || null,
          subject: data.subject || null,
          message: data.message,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Failed to send message");
      }
      setData({ name: "", email: "", phone: "", subject: "", message: "" });
      toast({
        title: "Message Sent",
        description: "Thank you for reaching out. We'll respond within one business day.",
        variant: "default",
      });
    } catch (err) {
      toast({
        title: "Failed to Send",
        description: err.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact-form" className="bg-linen text-blade py-24 lg:py-32">
      <div className="max-w-[1100px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-14">
          <p className="font-mono-coord text-gold text-xs tracking-[0.3em] mb-4">
            GET IN TOUCH
          </p>
          <h2 className="font-display text-4xl lg:text-6xl font-light leading-[1.05]">
            Speak with an <span className="italic text-gold">estate specialist</span>.
          </h2>
          <p className="text-blade/60 mt-5 max-w-md mx-auto font-light">
            Questions about our services? We're here to help.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 lg:p-14 max-w-2xl mx-auto border border-blade/10"
        >
          <div className="space-y-6">
            <div>
              <label className="flex items-center gap-2 font-mono-coord text-xs tracking-[0.2em] text-blade/60 mb-3">
                <User size={14} /> NAME
              </label>
              <input
                type="text"
                required
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                placeholder="Your full name"
                className="w-full bg-transparent border-b-2 border-blade/20 focus:border-gold py-3 text-lg font-light outline-none transition-colors"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 font-mono-coord text-xs tracking-[0.2em] text-blade/60 mb-3">
                <Mail size={14} /> EMAIL
              </label>
              <input
                type="email"
                required
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                placeholder="you@example.com"
                className="w-full bg-transparent border-b-2 border-blade/20 focus:border-gold py-3 text-lg font-light outline-none transition-colors"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 font-mono-coord text-xs tracking-[0.2em] text-blade/60 mb-3">
                <Phone size={14} /> PHONE (OPTIONAL)
              </label>
              <input
                type="tel"
                value={data.phone}
                onChange={(e) => setData({ ...data, phone: e.target.value })}
                placeholder="+1 (239) 000-0000"
                className="w-full bg-transparent border-b-2 border-blade/20 focus:border-gold py-3 text-lg font-light outline-none transition-colors"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 font-mono-coord text-xs tracking-[0.2em] text-blade/60 mb-3">
                <MessageSquare size={14} /> SUBJECT
              </label>
              <input
                type="text"
                value={data.subject}
                onChange={(e) => setData({ ...data, subject: e.target.value })}
                placeholder="How can we help?"
                className="w-full bg-transparent border-b-2 border-blade/20 focus:border-gold py-3 text-lg font-light outline-none transition-colors"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 font-mono-coord text-xs tracking-[0.2em] text-blade/60 mb-3">
                <MessageSquare size={14} /> MESSAGE
              </label>
              <textarea
                required
                rows={4}
                value={data.message}
                onChange={(e) => setData({ ...data, message: e.target.value })}
                placeholder="Tell us about your property and what you need..."
                className="w-full bg-transparent border-b-2 border-blade/20 focus:border-gold py-3 text-lg font-light outline-none transition-colors resize-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-obsidian text-sm font-medium tracking-wide hover:bg-gold/90 transition-colors mt-8 w-full justify-center disabled:opacity-50"
          >
            {submitting ? "Sending..." : "Send Message"} <Send size={16} />
          </button>
        </form>
      </div>
    </section>
  );
}
