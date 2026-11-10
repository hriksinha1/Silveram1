
import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FaqItem {
  q: string;
  a: string;
}

const faqs: FaqItem[] = [
  {
    q: "Is this solid sterling silver or silver-coated?",
    a: "We are strictly transparent: this is not solid sterling silver throughout, which would weigh over a kilogram and cost upwards of ₹25,000. Instead, Silveram uses an architectural heavy composite core electro-deposited with pure 999 Fine Silver and sealed with a nano-ceramic protective barrier for lifelong luster at an honest ₹1,200.",
  },
  {
    q: "Can I include a printed photograph inside the frame before it ships?",
    a: "Yes, complimentary. Upload any high-resolution photo during checkout. We balance, print on archival 260 GSM satin paper, and install it securely behind the optical glass so it arrives gift-ready.",
  },
  {
    q: "What happens if the optical glass or frame arrives damaged?",
    a: "Damage is rare due to custom high-density foam packaging. However, if any transit fracture occurs, WhatsApp a photo within 7 days and we dispatch an immediate replacement free of charge.",
  },
  {
    q: "How do I clean and maintain the luster?",
    a: "Thanks to nano-ceramic sealing, you never need abrasive polish pastes. Simply dust with the microfiber cloth included in your keepsake box. Avoid harsh chemical sprays.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="w-full bg-porcelain py-24 sm:py-32 px-6 sm:px-10 border-b border-silver/30">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-cobalt block mb-3">
            Questions & Confidence
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-midnight font-normal">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="divide-y divide-silver/40 border-y border-silver/40">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={faq.q} className="py-6 transition-colors">
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between text-left gap-6 group"
                >
                  <span className="font-serif text-lg sm:text-xl text-midnight font-normal group-hover:text-cobalt transition-colors">
                    {faq.q}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-buttery-peach flex items-center justify-center text-midnight shrink-0 transition-transform duration-300">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="mt-4 text-xs sm:text-sm font-sans text-graphite-muted leading-relaxed font-light pr-12 animate-in fade-in duration-300">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
