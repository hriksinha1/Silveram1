
import React, { useState } from "react";
import { Truck, CheckCircle2, AlertCircle } from "lucide-react";

export function PincodeTransitEstimator() {
  const [pincode, setPincode] = useState("");
  const [result, setResult] = useState<{
    valid: boolean;
    city?: string;
    days?: string;
    message?: string;
  } | null>(null);

  const handleCheck = () => {
    const pin = pincode.trim();
    if (pin.length === 6 && /^\d+$/.test(pin)) {
      let city = "your address";
      let days = "2–3 business days";

      if (pin.startsWith("11")) {
        city = "Delhi NCR";
        days = "Next day air (within 24–36 hrs)";
      } else if (pin.startsWith("40")) {
        city = "Mumbai";
        days = "Same day / 24 hrs";
      } else if (pin.startsWith("56")) {
        city = "Bengaluru";
        days = "2 business days";
      } else if (pin.startsWith("50")) {
        city = "Hyderabad";
        days = "2 business days";
      } else if (pin.startsWith("60")) {
        city = "Chennai";
        days = "2–3 business days";
      }

      setResult({
        valid: true,
        city,
        days,
        message: `Available for Express Air Delivery to ${pin} (${city}). Order today before 4 PM for prompt dispatch.`,
      });
    } else {
      setResult({
        valid: false,
        message: "Please enter a valid 6-digit Indian PIN code.",
      });
    }
  };

  return (
    <section id="transit" className="w-full bg-porcelain py-20 px-6 sm:px-10 border-b border-silver/30">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-buttery-peach border border-silver/40 text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-cobalt">
          <Truck className="w-3.5 h-3.5" />
          <span>Pan-India Air Velocity</span>
        </div>

        <h3 className="font-serif text-3xl sm:text-4xl text-midnight font-normal">
          When will your keepsake arrive?
        </h3>

        {/* Minimal Single-Line Form */}
        <div className="max-w-md mx-auto flex items-center gap-2 p-1.5 rounded-full bg-buttery-peach border border-silver/60 focus-within:border-midnight transition-colors">
          <input
            type="text"
            maxLength={6}
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCheck()}
            placeholder="Enter 6-digit Indian PIN code..."
            className="flex-1 px-4 py-2 bg-transparent text-midnight placeholder:text-graphite-muted/50 text-xs font-mono outline-none"
          />
          <button
            type="button"
            onClick={handleCheck}
            className="px-6 py-2.5 rounded-buttons bg-evoo-yellow-green text-olive-ink border border-olive-ink text-xs font-sans font-semibold tracking-wider uppercase hover:bg-evoo-yellow-green/70 transition-all"
          >
            Check
          </button>
        </div>

        {/* Dynamic Result Notice */}
        {result && (
          <div
            className={`max-w-md mx-auto p-4 rounded-[6px] text-left text-xs transition-all border ${
              result.valid
                ? "bg-buttery-peach border-cobalt/30 text-midnight"
                : "bg-red-50 border-red-200 text-red-700"
            }`}
          >
            {result.valid ? (
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-semibold text-cobalt">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Estimated: {result.days}</span>
                </div>
                <p className="text-[11px] text-graphite-muted leading-relaxed">
                  {result.message}
                </p>
              </div>
            ) : (
              <div className="flex items-center gap-2 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{result.message}</span>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] font-sans text-graphite-muted pt-4">
          <span>Delhi NCR & Mumbai: <strong className="text-midnight">24–36 hrs</strong></span>
          <span>•</span>
          <span>Bengaluru, Hyd, Pune: <strong className="text-midnight">48 hrs</strong></span>
          <span>•</span>
          <span>Rest of India: <strong className="text-midnight">3–4 Days</strong></span>
        </div>
      </div>
    </section>
  );
}
