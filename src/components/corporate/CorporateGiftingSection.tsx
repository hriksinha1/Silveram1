
import React, { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { submitCorporateEnquiry } from "@/lib/appwrite/enquiries";

export function CorporateGiftingSection() {
  const [email, setEmail] = useState("");
  const [units, setUnits] = useState("50");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSending(true);
    setError("");
    try {
      await submitCorporateEnquiry({
        companyName: email.split("@")[1] || "Corporate enquiry",
        contactName: "Sample request",
        businessEmail: email,
        estimatedQuantity: parseInt(units, 10) || 50,
        message: `Corporate sample request for ${units} units`,
        locale: "en",
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError("We could not send your request. Please try again in a moment.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="corporate" className="w-full bg-squeeze-bottle-green text-olive-ink py-24 sm:py-32 px-6 sm:px-10 border-b border-silver/10">
      <div className="max-w-5xl mx-auto text-center space-y-8">
        <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-olive-ink/70 block">
          B2B & Milestone Honors
        </span>

        <h2 className="font-serif text-3xl sm:text-5xl text-olive-ink font-normal leading-tight max-w-2xl mx-auto">
          Thoughtful corporate keepsakes.
        </h2>

        <p className="text-sm sm:text-base font-sans text-olive-ink/70 font-light max-w-lg mx-auto leading-relaxed">
          Replace generic vouchers with enduring silver keepsakes. Custom etched crest plaques and individual multi-drop delivery across 40+ Indian cities.
        </p>

        {submitted ? (
          <div className="max-w-md mx-auto p-8 rounded-[8px] bg-olive-ink/5 border border-olive-ink/20 space-y-3">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <h4 className="font-serif text-xl text-olive-ink">Sample Request Received</h4>
            <p className="text-xs font-sans text-olive-ink/70">
              Our corporate desk will reach out within 24 business hours to coordinate delivery.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 p-1.5 rounded-full sm:rounded-full bg-olive-ink/5 border border-olive-ink/20 focus-within:border-olive-ink/60 transition-all"
          >
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter work email..."
              className="flex-1 px-5 py-3 bg-transparent text-olive-ink placeholder:text-olive-ink/60 text-xs font-sans outline-none"
            />
            <button
              type="submit"
              disabled={sending}
              className="px-6 py-3 rounded-full bg-porcelain text-midnight text-xs font-sans font-semibold tracking-wider uppercase hover:bg-silver transition-all whitespace-nowrap inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span>Request Sample</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        {error && (
          <p role="alert" className="text-xs font-sans text-red-300">
            {error}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-center gap-8 text-[11px] font-sans text-olive-ink/60 pt-4">
          <span>Laser-Etched Crests</span>
          <span>•</span>
          <span>From 25 Units</span>
          <span>•</span>
          <span>Doorstep Multi-Drop</span>
        </div>
      </div>
    </section>
  );
}
