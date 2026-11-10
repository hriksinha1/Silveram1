
import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { PublicProductDto } from "@/types/products";
import { formatRupeesDisplay } from "@/lib/format";

import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { useSound } from "@/context/SoundContext";

interface StickyBottomDockProps {
  product?: PublicProductDto;
  onAddToCart?: () => void;
}

export function StickyBottomDock({ product, onAddToCart }: StickyBottomDockProps) {
  const { addToBag } = useCart();
  const { locale, t } = useLanguage();
  const { playClick } = useSound();
  const [visible, setVisible] = useState(false);
  const priceDisplay = product ? formatRupeesDisplay(product.priceRupees) : "₹1,200.00";

  useEffect(() => {
    const handleScroll = () => {
      // Show dock after scrolling past the hero (e.g. 500px)
      if (window.scrollY > 500) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-xl animate-in fade-in slide-in-from-bottom-6 duration-300">
      <div className="p-3 pl-4 rounded-full bg-midnight/90 backdrop-blur-xl border border-white/10 flex items-center justify-between gap-4 text-porcelain">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-white/10 shrink-0 border border-white/20">
            <img
              src="/products/frame-01.webp"
              alt="Silveram keepsake frame"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="text-xs font-serif font-normal text-porcelain block">
              {locale === "hi" ? "सैक्रेड कीपसेक फ्रेम" : "The Keepsake Frame"}
            </span>
            <span className="text-[10px] font-sans text-silver/70">
              {priceDisplay} • {locale === "hi" ? "निःशुल्क एक्सप्रेस डिलीवरी" : "Free Express Delivery"}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            playClick();
            addToBag();
            onAddToCart?.();
          }}
          className="px-5 py-2.5 rounded-full bg-porcelain text-midnight text-xs font-sans font-semibold tracking-wider uppercase hover:bg-silver transition-all flex items-center gap-2 shrink-0 active:scale-95 cursor-pointer"
        >
          <span>{locale === "hi" ? "ऑर्डर करें" : "Order"}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
