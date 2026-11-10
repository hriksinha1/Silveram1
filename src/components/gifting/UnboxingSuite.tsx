
import React from "react";
import { ShieldCheck, Sparkles, Award, CheckCircle, PackageCheck, Eye } from "lucide-react";
import { useCart, RIBBON_OPTIONS } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { useSound } from "@/context/SoundContext";

export function UnboxingSuite() {
  const { activeRibbon, setActiveRibbon } = useCart();
  const { locale, t } = useLanguage();
  const { playRustle } = useSound();

  return (
    <section id="unboxing" className="w-full bg-mustard-sun text-olive-ink py-24 sm:py-32 px-6 sm:px-10 border-b border-silver/15 relative overflow-hidden">
      {/* Background Hairline Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(60, 66, 46, 0.07) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(60, 66, 46, 0.07) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-olive-ink/70 font-semibold">
              {t.unboxingBadge}
            </span>
            <div className="h-[1px] w-12 bg-silver/30" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-olive-ink font-normal leading-tight">
            {t.unboxingTitle}
          </h2>
          <p className="text-sm font-sans text-olive-ink/70 mt-3 font-light leading-relaxed max-w-lg">
            {t.unboxingDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Interactive Box & Ribbon Showcase */}
          <div className="lg:col-span-6 flex flex-col items-center">
            {/* The Presentation Box Graphic */}
            <div className="relative w-full max-w-md p-8 sm:p-10 rounded-[12px] bg-buttery-peach border border-olive-ink/40 text-center overflow-hidden">
              {/* Dynamic Satin Ribbon Band across Box */}
              <div 
                className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-10 transition-colors duration-500"
                style={{ backgroundColor: activeRibbon.hex }}
              />
              <div 
                className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-10 transition-colors duration-500"
                style={{ backgroundColor: activeRibbon.hex }}
              />

              {/* Box Lid Center Medallion */}
              <div className="relative z-10 w-24 h-24 rounded-full bg-buttery-peach border-2 border-silver/50 mx-auto flex flex-col items-center justify-center p-2">
                <span className="font-serif text-xs font-normal text-olive-ink uppercase tracking-widest block">
                  SILVERAM
                </span>
                <span className="text-[7px] font-mono text-olive-ink/70 uppercase">
                  ATELIER
                </span>
                <div className="w-5 h-[1px] bg-silver/40 my-1" />
                <span className="text-[6px] font-sans text-olive-ink/60">
                  NEW DELHI
                </span>
              </div>

              {/* Box Meta */}
              <div className="relative z-10 mt-8 pt-4 border-t border-olive-ink/20 flex items-center justify-between text-[10px] font-sans text-olive-ink/80">
                <span className="font-mono text-[9px] uppercase tracking-wider text-olive-ink/60">
                  RIGID 1200 GSM CASE
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <span 
                    className="w-2.5 h-2.5 rounded-full border border-olive-ink/60" 
                    style={{ backgroundColor: activeRibbon.hex }}
                  />
                  <span>{activeRibbon.name} Silk</span>
                </span>
              </div>
            </div>

            {/* Ribbon Interactive Switcher Bar */}
            <div className="w-full max-w-md mt-6 p-4 rounded-[8px] bg-olive-ink/5 border border-olive-ink/20 backdrop-blur-sm">
              <span className="text-[10px] font-mono uppercase tracking-widest text-olive-ink/60 block mb-2.5">
                {t.ribbonSelectTitle}
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {RIBBON_OPTIONS.map((ribbon) => (
                  <button
                    key={ribbon.name}
                    type="button"
                    onClick={() => {
                      playRustle();
                      setActiveRibbon(ribbon);
                    }}
                    className={`p-2 rounded-[6px] border text-left flex items-center gap-2 transition-all cursor-pointer ${
                      activeRibbon.name === ribbon.name
                        ? "bg-porcelain text-midnight border-porcelain scale-105"
                        : "bg-olive-ink/5 text-olive-ink border-olive-ink/20 hover:bg-olive-ink/10"
                    }`}
                  >
                    <span 
                      className="w-3 h-3 rounded-full border border-black/20 shrink-0" 
                      style={{ backgroundColor: ribbon.hex }} 
                    />
                    <span className="text-[11px] font-medium truncate">{ribbon.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Physical Certificate of Authenticity Card & Ritual */}
          <div className="lg:col-span-6 space-y-6">
            {/* The Certificate of Clad Authenticity Card */}
            <div 
              className="p-6 sm:p-7 rounded-[10px] border border-slate-300 relative text-slate-800"
              style={{
                background: "linear-gradient(135deg, #fff4ec 0%, #f6e6d9 100%)",
              }}
            >
              {/* Certificate Guilloche Inner Border */}
              <div className="border border-amber-900/20 p-5 rounded-[6px] space-y-3 relative">
                <div className="flex items-center justify-between border-b border-amber-900/15 pb-3">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-800" />
                    <div>
                      <h4 className="font-serif text-sm uppercase tracking-widest text-slate-900 font-semibold">
                        Certificate of Authenticity
                      </h4>
                      <span className="text-[8px] font-mono text-slate-500 uppercase">
                        SILVERAM MASTER ATELIER • NEW DELHI
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-[9px] text-slate-600 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    SLV-CERT-2026
                  </span>
                </div>

                <p className="font-serif italic text-xs text-slate-700 leading-relaxed">
                  "This certificate affirms that this Silveram devotional keepsake frame is electroformed with high-purity <strong>999 Fine Silver cladding</strong> and sealed with our proprietary nano-ceramic molecular anti-tarnish barrier."
                </p>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-amber-900/15 text-[9px] font-mono text-slate-600">
                  <div>
                    <span className="text-slate-400 block text-[7px] uppercase">BATCH CODE</span>
                    <span className="font-bold">2026/DLH-019</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[7px] uppercase">ALLOY PURITY</span>
                    <span className="font-bold">AG 999 CLAD</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[7px] uppercase">SALT CORROSION</span>
                    <span className="font-bold text-emerald-700">ISO 9227 PASS</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 4 Inclusions Matrix */}
            <div className="grid grid-cols-2 gap-3 text-xs font-sans">
              <div className="p-3.5 rounded-[8px] bg-olive-ink/5 border border-olive-ink/20">
                <span className="text-cobalt font-mono text-[9px] font-bold block mb-1">01 // BOX</span>
                <span className="text-olive-ink font-medium block">1200 GSM Rigid Box</span>
                <span className="text-[10px] text-olive-ink/60">Foil hot-stamped seal</span>
              </div>

              <div className="p-3.5 rounded-[8px] bg-olive-ink/5 border border-olive-ink/20">
                <span className="text-cobalt font-mono text-[9px] font-bold block mb-1">02 // CRADLE</span>
                <span className="text-olive-ink font-medium block">Midnight Velvet Bed</span>
                <span className="text-[10px] text-olive-ink/60">Shock-resistant molded core</span>
              </div>

              <div className="p-3.5 rounded-[8px] bg-olive-ink/5 border border-olive-ink/20">
                <span className="text-cobalt font-mono text-[9px] font-bold block mb-1">03 // CARE</span>
                <span className="text-olive-ink font-medium block">Microfiber Lens Cloth</span>
                <span className="text-[10px] text-olive-ink/60">Zero-chemical polishing</span>
              </div>

              <div className="p-3.5 rounded-[8px] bg-olive-ink/5 border border-olive-ink/20">
                <span className="text-cobalt font-mono text-[9px] font-bold block mb-1">04 // GUARANTEE</span>
                <span className="text-olive-ink font-medium block">100% Transit Shield</span>
                <span className="text-[10px] text-olive-ink/60">Instant photo replacement</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
