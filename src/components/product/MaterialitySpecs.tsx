
import React, { useRef } from "react";
import { PublicProductDto } from "@/types/products";
import { formatRupeesDisplay } from "@/lib/format";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { useCart } from "@/context/CartContext";

interface MaterialitySpecsProps {
  product?: PublicProductDto;
  onAddToCart?: () => void;
}

export function MaterialitySpecs({ product, onAddToCart }: MaterialitySpecsProps) {
  const { addToBag } = useCart();
  const containerRef = useRef<HTMLDivElement>(null);
  const priceDisplay = product ? formatRupeesDisplay(product.priceRupees) : "₹1,200.00";

  useGSAP(
    () => {
      gsap.from(".material-card", {
        opacity: 0,
        y: 25,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="materiality"
      ref={containerRef}
      className="w-full bg-buttery-peach py-24 sm:py-32 px-6 sm:px-10 border-b border-silver/30 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-lg">
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-cobalt block mb-3">
              + SECTION 03 // RADICAL CRAFT HONESTY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-midnight font-normal leading-tight">
              Radical transparency in our materials.
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-sans text-graphite-muted max-w-sm mt-4 md:mt-0 font-light leading-relaxed">
            Every specification is verified. Pure 999 fine silver electroformed clad over architectural composite, sealed against tarnishing.
          </p>
        </div>

        {/* 3-Tier Layering System Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="material-card p-8 rounded-[8px] bg-buttery-peach border border-silver/40 space-y-3 relative">
            <span className="font-mono text-xs font-bold text-cobalt tracking-widest block">01 / SUBSTRATE CORE</span>
            <h4 className="font-serif text-xl text-midnight font-normal">Architectural Base Alloy</h4>
            <p className="text-xs font-sans text-graphite-muted leading-relaxed font-light">
              High-density structural composite core. Dimensionally stable, resilient, and reassuringly weighted in hand.
            </p>
          </div>

          <div className="material-card p-8 rounded-[8px] bg-buttery-peach border border-silver/40 space-y-3 relative">
            <span className="font-mono text-xs font-bold text-cobalt tracking-widest block">02 / SILVER RELIEF</span>
            <h4 className="font-serif text-xl text-midnight font-normal">999 Fine Silver Clad</h4>
            <p className="text-xs font-sans text-graphite-muted leading-relaxed font-light">
              High-purity fine silver electroformed relief capturing the intricate iconography of Lakshmi & Ganesha.
            </p>
          </div>

          <div className="material-card p-8 rounded-[8px] bg-buttery-peach border border-silver/40 space-y-3 relative">
            <span className="font-mono text-xs font-bold text-cobalt tracking-widest block">03 / CASING & ARMOR</span>
            <h4 className="font-serif text-xl text-midnight font-normal">Monolithic Clear Casing</h4>
            <p className="text-xs font-sans text-graphite-muted leading-relaxed font-light">
              Baked nano-ceramic anti-tarnish molecular barrier encased within pristine optical-grade display acrylic.
            </p>
          </div>
        </div>

        {/* Guarantee Banner & CTA */}
        <div className="p-6 sm:p-8 rounded-[8px] bg-buttery-peach border border-silver/40 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3.5">
            <ShieldCheck className="w-6 h-6 text-cobalt shrink-0" />
            <div>
              <p className="text-xs sm:text-sm font-sans text-midnight font-semibold">
                100% Transit Integrity Guarantee
              </p>
              <p className="text-xs font-sans text-graphite-muted font-light">
                Replaced immediately without friction if damaged during shipping.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              addToBag();
              onAddToCart?.();
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-buttons bg-evoo-yellow-green text-olive-ink border border-olive-ink text-xs font-sans font-semibold tracking-wider uppercase hover:bg-evoo-yellow-green/70 transition-all whitespace-nowrap active:scale-95 cursor-pointer shrink-0"
          >
            <span>Order Keepsake Frame — {priceDisplay}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
