
import React, { useState } from "react";
import { ShoppingBag, Menu, X, Volume2, VolumeX, Globe } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { useSound } from "@/context/SoundContext";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount, openCart } = useCart();
  const { locale, setLocale, t } = useLanguage();
  const { isMuted, toggleMute, playClick } = useSound();

  const handleLanguageChange = (newLocale: "en" | "hi") => {
    if (newLocale !== locale) {
      playClick();
      setLocale(newLocale);
    }
  };

  const handleAudioToggle = () => {
    playClick();
    toggleMute();
  };

  return (
    <div className="w-full bg-porcelain/90 backdrop-blur-md border-b border-silver/30 transition-all">
      <div className="max-w-7xl mx-auto h-20 px-4 sm:px-10 flex items-center justify-between">
        {/* Brand Wordmark */}
        <a href="/" className="group flex flex-col">
          <span className="font-serif text-2xl tracking-[0.25em] text-midnight font-normal uppercase transition-opacity group-hover:opacity-75">
            SILVERAM
          </span>
          <span className="text-[9px] tracking-[0.3em] text-graphite-muted uppercase -mt-0.5 font-sans font-medium">
            {t.tagline}
          </span>
        </a>

        {/* Minimal Editorial Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-[12px] tracking-widest uppercase font-sans text-graphite/80 font-medium">
          <a
            href="#hero"
            className="hover:text-midnight transition-colors duration-200"
          >
            {t.navFrame}
          </a>
          <a
            href="#letter"
            className="hover:text-midnight transition-colors duration-200 text-cobalt/90 font-medium"
          >
            {t.navLetter}
          </a>
          <a
            href="#occasions"
            className="hover:text-midnight transition-colors duration-200"
          >
            {t.navRitual}
          </a>
          <a
            href="#unboxing"
            className="hover:text-midnight transition-colors duration-200"
          >
            {t.navUnboxing}
          </a>
          <a
            href="#moments"
            className="hover:text-midnight transition-colors duration-200 text-cobalt/90 font-semibold"
          >
            {t.navMoments}
          </a>
          <a
            href="#materiality"
            className="hover:text-midnight transition-colors duration-200"
          >
            {t.navCraft}
          </a>
          <a
            href="#corporate"
            className="hover:text-midnight transition-colors duration-200"
          >
            {t.navCorporate}
          </a>
        </nav>

        {/* Right Utility Group: Bilingual Switcher, Audio Toggle, Cart Trigger */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          {/* Bilingual Hindi / English Pill */}
          <div 
            className="inline-flex items-center p-0.5 rounded-full bg-midnight/5 border border-silver/40 text-[10px] font-sans font-medium tracking-wider"
            role="group"
            aria-label="Language selection"
          >
            <button
              type="button"
              onClick={() => handleLanguageChange("en")}
              className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                locale === "en"
                  ? "bg-midnight text-porcelain font-semibold"
                  : "text-graphite hover:text-midnight"
              }`}
              title="English"
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => handleLanguageChange("hi")}
              className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                locale === "hi"
                  ? "bg-midnight text-porcelain font-semibold"
                  : "text-graphite hover:text-midnight"
              }`}
              title="हिंदी (Hindi)"
            >
              हिंदी
            </button>
          </div>

          {/* Discreet Audio Micro-Interactions Toggle */}
          <button
            type="button"
            onClick={handleAudioToggle}
            className={`p-2 rounded-full border transition-all cursor-pointer flex items-center justify-center ${
              isMuted
                ? "bg-stone-100 text-graphite-muted border-silver/40 hover:text-midnight"
                : "bg-midnight/5 text-midnight border-silver/50 hover:bg-midnight/10"
            }`}
            title={isMuted ? "Enable subtle haptic audio" : "Mute subtle haptic audio"}
            aria-label={isMuted ? t.soundMuted : t.soundOn}
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-graphite-muted" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-midnight animate-pulse" />
            )}
          </button>

          {/* Real Slide-Over Cart Trigger */}
          <button
            type="button"
            onClick={openCart}
            className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-buttons bg-evoo-yellow-green text-olive-ink border border-olive-ink text-[11px] font-sans font-medium tracking-widest uppercase hover:bg-evoo-yellow-green/70 transition-all cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-silver" />
            <span>{t.bag} ({cartCount})</span>
            {cartCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            )}
          </button>

          {/* Mobile Menu Icon */}
          <button
            type="button"
            className="lg:hidden p-2 text-midnight"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-porcelain/95 backdrop-blur-xl border-b border-silver/40 px-8 py-6 space-y-4">
          <nav className="flex flex-col gap-4 text-xs tracking-widest uppercase font-medium text-graphite">
            <a
              href="#hero"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-midnight"
            >
              {t.navFrame}
            </a>
            <a
              href="#letter"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-midnight text-cobalt font-medium"
            >
              {t.navLetter}
            </a>
            <a
              href="#occasions"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-midnight"
            >
              {t.navRitual}
            </a>
            <a
              href="#unboxing"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-midnight"
            >
              {t.navUnboxing}
            </a>
            <a
              href="#moments"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-midnight text-cobalt font-semibold"
            >
              {t.navMoments}
            </a>
            <a
              href="#materiality"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-midnight"
            >
              {t.navCraft}
            </a>
            <a
              href="#transit"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-midnight"
            >
              Transit
            </a>
            <a
              href="#corporate"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-midnight"
            >
              {t.navCorporate}
            </a>
          </nav>
        </div>
      )}
    </div>
  );
}
