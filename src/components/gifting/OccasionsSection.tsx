
import React, { useState, useRef } from "react";
import { ArrowUpRight, Check, Sparkles } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { useCart, RIBBON_OPTIONS, RibbonOption } from "@/context/CartContext";
import { useSound } from "@/context/SoundContext";
import { useLanguage } from "@/context/LanguageContext";

interface OccasionsSectionProps {
  onSelectOccasion?: (occasionName: string) => void;
}

const occasions = [
  {
    number: "01",
    coordinate: "GEO-01 // SANCTUARY",
    title: "Griha Pravesh & Sanctuaries",
    subtitle: "New thresholds, blessed hearths, and lasting abundance",
    spec: "Gold-Gilt Dedication Card",
    imageUrl: "/products/frame-04.webp",
  },
  {
    number: "02",
    coordinate: "GEO-02 // GENERATIONS",
    title: "Parents & Reverence",
    subtitle: "For the pillars whose quiet sacrifices built everything",
    spec: "Bespoke Engraved Plaque",
    imageUrl: "/products/frame-02.webp",
  },
  {
    number: "03",
    coordinate: "GEO-03 // DEVOTION",
    title: "Weddings & Milestones",
    subtitle: "Two distinct paths united under sacred light and blessings",
    spec: "Free Printed Memory Inscription",
    imageUrl: "/products/frame-06.webp",
  },
];

export function OccasionsSection({ onSelectOccasion }: OccasionsSectionProps) {
  const { activeRibbon, setActiveRibbon, addToBag } = useCart();
  const { playRustle, playClick } = useSound();
  const { locale } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!cardsRef.current) return;
      const cards = cardsRef.current.children;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      id="occasions"
      ref={containerRef}
      className="w-full bg-porcelain py-24 sm:py-32 px-6 sm:px-10 border-b border-silver/30 relative overflow-hidden"
    >
      {/* Hairline Grid Ambient Backdrop */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Geometrical Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-cobalt font-semibold">
              + SECTION 02 // INTENTIONAL RITUALS
            </span>
            <div className="h-[1px] w-12 bg-cobalt/30" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl text-midnight font-normal leading-tight">
            An object crafted for life's sacred thresholds.
          </h2>
          <p className="text-sm font-sans text-graphite-muted mt-3 font-light leading-relaxed">
            Every Silveram keepsake frame is unboxed inside a sealed rigid presentation case, 
            complete with your hand-chosen ceremonial ribbon and custom engraved plaque.
          </p>
        </div>

        {/* 3 Visual Emotion Cards with Geometric Accents */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {occasions.map((occ) => (
            <div
              key={occ.number}
              onClick={() => {
                playClick();
                addToBag();
                onSelectOccasion?.(occ.title);
              }}
              className="group cursor-pointer flex flex-col bg-buttery-peach rounded-[8px] overflow-hidden border border-silver/40 hover:border-midnight/40 transition-all duration-500 relative"
            >
              {/* Corner Coordinate Crosshairs */}
              <div className="absolute top-2 left-2 z-20 text-[9px] font-mono text-white/90 bg-midnight/70 backdrop-blur-sm px-2 py-0.5 rounded">
                {occ.coordinate}
              </div>

              {/* Image with subtle zoom */}
              <div className="w-full h-72 overflow-hidden bg-buttery-peach relative">
                <img
                  src={occ.imageUrl}
                  alt={occ.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 via-transparent to-transparent pointer-events-none" />

                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center text-midnight opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Minimal Meta */}
              <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-sans uppercase tracking-widest text-graphite-muted mb-1">
                    <span>Occasion {occ.number}</span>
                    <span className="text-midnight font-semibold font-serif">₹1,200.00</span>
                  </div>
                  <h3 className="font-serif text-2xl text-midnight font-normal">
                    {occ.title}
                  </h3>
                  <p className="text-xs font-sans text-graphite-muted mt-1 font-light leading-relaxed">
                    {occ.subtitle}
                  </p>
                </div>

                <div className="pt-3 border-t border-silver/30 flex items-center justify-between text-[11px] font-sans text-graphite-muted">
                  <span className="font-medium text-midnight">{occ.spec}</span>
                  <span className="text-cobalt font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Personalize <span>→</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Minimal Packaging Palette & Ribbon Bar */}
        <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-[8px] bg-buttery-peach border border-silver/40 flex flex-col md:flex-row items-center justify-between gap-6 relative">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-cobalt" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-graphite-muted">
                CEREMONIAL SILK RIBBON
              </span>
            </div>
            <p className="font-serif text-xl text-midnight">
              Hand-tied satin packaging finish
            </p>
            <p className="text-xs text-graphite-muted font-light mt-0.5">
              Included with every order at no additional charge
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {RIBBON_OPTIONS.map((ribbon) => (
              <button
                key={ribbon.name}
                type="button"
                onClick={() => {
                  playRustle();
                  setActiveRibbon(ribbon);
                }}
                className={`px-4 py-2.5 rounded-full text-xs font-sans font-medium flex items-center gap-2.5 transition-all duration-300 border cursor-pointer ${
                  activeRibbon.name === ribbon.name
                    ? "bg-midnight text-porcelain border-midnight scale-105"
                    : "bg-porcelain text-graphite hover:bg-silver/30 border-silver/40"
                }`}
              >
                <span
                  className="w-3 h-3 rounded-full border border-black/20 shrink-0"
                  style={{ backgroundColor: ribbon.hex }}
                />
                <span className="font-medium">{ribbon.name}</span>
                <span className="text-[10px] opacity-70">({ribbon.meaning})</span>
                {activeRibbon.name === ribbon.name && (
                  <Check className="w-3 h-3 text-silver ml-0.5" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
