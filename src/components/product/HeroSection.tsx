
import React, { useRef, useState, useEffect } from "react";
import { ArrowRight, ShieldCheck, Compass, CheckCircle } from "lucide-react";
import { PublicProductDto } from "@/types/products";
import { formatRupeesDisplay } from "@/lib/format";
import { gsap } from "gsap";
import { FrameViewer3D, InscriptionData } from "./FrameViewer3D";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { useSound } from "@/context/SoundContext";

interface HeroSectionProps {
  product?: PublicProductDto;
  onAddToCart?: () => void;
}

export function HeroSection({ product, onAddToCart }: HeroSectionProps) {
  const { addToBag } = useCart();
  const { locale, t, presets } = useLanguage();
  const { playClick, playChime } = useSound();

  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const [currentInscription, setCurrentInscription] = useState<InscriptionData>({
    recipient: presets[0].recipient,
    message: presets[0].message,
    date: presets[0].date,
    themeTitle: presets[0].title,
  });

  const [addedToast, setAddedToast] = useState(false);

  const priceDisplay = product ? formatRupeesDisplay(product.priceRupees) : "₹1,200.00";

  // GSAP Entrance Animations
  useEffect(() => {
    if (!containerRef.current) return;
    const elements = [
      badgeRef.current,
      titleRef.current,
      subtitleRef.current,
      specsRef.current,
      ctaRef.current,
    ].filter(Boolean);

    gsap.fromTo(
      elements,
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power2.out" }
    );
  }, []);

  const handleOrderClick = () => {
    playClick();
    addToBag();
    onAddToCart?.();
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full bg-mustard-sun text-olive-ink overflow-hidden py-16 sm:py-24 lg:py-28 border-b border-silver/15"
    >
      {/* GEOMETRICAL ARCHITECTURAL DRAFTING GRID BACKDROP */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(60, 66, 46, 0.07) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(60, 66, 46, 0.07) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Ambient Lighting Orbs */}

      {/* Geometrical Architectural Corner Markers */}
      <div className="hidden lg:flex justify-between items-center max-w-7xl mx-auto px-10 mb-8 text-[9px] font-mono tracking-widest text-olive-ink/60 uppercase select-none border-b border-olive-ink/20 pb-3">
        <span className="flex items-center gap-1.5">
          <span className="text-olive-ink">+</span> 28°36'50" N • 77°12'32" E [NEW DELHI WORKSHOP]
        </span>
        <span className="flex items-center gap-1.5">
          <Compass className="w-3 h-3 text-olive-ink/60" /> SACRED GOLDEN RATIO Φ = 1.618
        </span>
        <span className="flex items-center gap-1.5">
          <span>DIM: 185 × 235 × 28 mm</span> <span className="text-olive-ink">+</span>
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT: Restrained Minimal Editorial Narrative */}
          <div className="lg:col-span-5 flex flex-col space-y-6 pt-2">
            <div ref={badgeRef}>
              <span className="inline-flex items-center gap-2 text-[10px] font-sans font-bold tracking-[0.25em] uppercase text-olive-ink/90 px-3.5 py-1.5 rounded-full bg-olive-ink/5 border border-olive-ink/20">
                <span className="w-1.5 h-1.5 rounded-full bg-cobalt animate-ping" />
                {t.collectionBadge}
              </span>
            </div>

            <h1
              ref={titleRef}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-olive-ink leading-[1.08] font-normal whitespace-pre-line"
            >
              {t.heroTitle}
            </h1>

            <div className="space-y-2">
              <span className="text-xs font-mono tracking-widest uppercase text-olive-ink/90 font-medium block">
                {t.heroHindiSubtitle}
              </span>
              <p
                ref={subtitleRef}
                className="text-olive-ink/80 text-base sm:text-lg max-w-md font-light leading-relaxed font-sans"
              >
                {t.heroDesc}
              </p>
            </div>

            {/* Geometrical Architectural Dimension Matrix */}
            <div
              ref={specsRef}
              className="grid grid-cols-2 gap-3 pt-2 text-xs font-sans text-olive-ink/80"
            >
              <div className="p-3 rounded-[6px] bg-olive-ink/5 border border-olive-ink/20">
                <span className="text-[9px] font-mono uppercase tracking-widest text-olive-ink/60 block mb-1">
                  01 // ALLOY CLAD
                </span>
                <span className="font-medium text-olive-ink block">
                  {locale === "hi" ? "999 शुद्ध सिल्वर क्लैड" : "999 Fine Silver Clad"}
                </span>
                <span className="text-[10px] text-olive-ink/60">
                  {locale === "hi" ? "इलेक्ट्रोफॉर्म्ड देव नक्काशी" : "Laser electroformed relief"}
                </span>
              </div>

              <div className="p-3 rounded-[6px] bg-olive-ink/5 border border-olive-ink/20">
                <span className="text-[9px] font-mono uppercase tracking-widest text-olive-ink/60 block mb-1">
                  02 // CASING
                </span>
                <span className="font-medium text-olive-ink block">
                  {locale === "hi" ? "ऑप्टिकल ऐक्रेलिक" : "Monolithic Acrylic"}
                </span>
                <span className="text-[10px] text-olive-ink/60">
                  {locale === "hi" ? "इनबिल्ट टेबलटॉप स्टैंड" : "Built-in angled easel stand"}
                </span>
              </div>

              <div className="p-3 rounded-[6px] bg-olive-ink/5 border border-olive-ink/20">
                <span className="text-[9px] font-mono uppercase tracking-widest text-olive-ink/60 block mb-1">
                  03 // PROTECTION
                </span>
                <span className="font-medium text-olive-ink block">
                  {locale === "hi" ? "नैनो-सिरेमिक शील्ड" : "Nano-Ceramic Sealed"}
                </span>
                <span className="text-[10px] text-olive-ink/60">
                  {locale === "hi" ? "आजीवन एंटी-टार्निश सुरक्षा" : "Permanent anti-tarnish barrier"}
                </span>
              </div>

              <div className="p-3 rounded-[6px] bg-olive-ink/5 border border-olive-ink/20">
                <span className="text-[9px] font-mono uppercase tracking-widest text-olive-ink/60 block mb-1">
                  04 // DEDICATION
                </span>
                <span className="font-medium text-olive-ink block">
                  {locale === "hi" ? "निशुल्क उत्कीर्णन" : "Bespoke Inscription"}
                </span>
                <span className="text-[10px] text-olive-ink/60">
                  {locale === "hi" ? "सिल्वर फिनिश पट्टिका" : "Free engraved rear plaque"}
                </span>
              </div>
            </div>

            {/* Minimal High-Impact CTAs */}
            <div ref={ctaRef} className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                type="button"
                onClick={handleOrderClick}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-porcelain text-midnight text-xs font-sans font-semibold tracking-widest uppercase hover:bg-silver transition-all duration-300 active:scale-95 cursor-pointer"
              >
                <span>{t.addToBagBtn} — {priceDisplay}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href="#moments"
                className="px-5 py-4 text-center text-xs font-sans font-medium tracking-widest uppercase text-olive-ink/80 hover:text-olive-ink transition-colors flex items-center justify-center gap-2"
              >
                <span>{locale === "hi" ? "शुभ स्थान देखें" : "View Sanctuaries"}</span>
              </a>
            </div>

            {/* Added to Bag Toast feedback */}
            {addedToast && (
              <div className="p-3.5 rounded-[8px] bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs font-sans flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    Keepsake frame with <strong>"{currentInscription.themeTitle}"</strong> inscription added to your bag!
                  </span>
                </div>
                <span className="text-[10px] font-mono uppercase text-emerald-400/80">
                  Ready
                </span>
              </div>
            )}

            {/* Honest Trust Guarantee */}
            <div className="pt-3 border-t border-olive-ink/20 flex items-center gap-3 text-xs font-sans text-olive-ink/70">
              <ShieldCheck className="w-4 h-4 text-cobalt shrink-0" />
              <span>{t.guaranteeText}</span>
            </div>
          </div>

          {/* RIGHT: Interactive 3D Frame Turn & Bespoke Inscription */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <FrameViewer3D onInscriptionChange={setCurrentInscription} />
          </div>
        </div>
      </div>
    </section>
  );
}
