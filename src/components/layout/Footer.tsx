
import React from "react";
import { Volume2, VolumeX, Sparkles, Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useSound } from "@/context/SoundContext";

export function Footer() {
  const { locale, setLocale, t } = useLanguage();
  const { isMuted, toggleMute, playClick } = useSound();

  const handleAudioToggle = () => {
    playClick();
    toggleMute();
  };

  const handleLangToggle = (newLocale: "en" | "hi") => {
    if (newLocale !== locale) {
      playClick();
      setLocale(newLocale);
    }
  };

  return (
    <footer className="w-full bg-porcelain py-20 px-6 sm:px-10 border-t border-silver/40 text-graphite">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
        <div className="space-y-2">
          <span className="font-serif text-2xl tracking-[0.2em] font-normal text-midnight uppercase block">
            SILVERAM
          </span>
          <p className="text-xs font-sans text-graphite-muted max-w-sm font-light">
            {t.footerTagline}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-xs font-sans tracking-widest uppercase font-medium text-graphite-muted">
          <a href="#hero" className="hover:text-midnight transition-colors">
            {t.navFrame}
          </a>
          <a href="#unboxing" className="hover:text-midnight transition-colors">
            {t.navUnboxing}
          </a>
          <a href="#moments" className="hover:text-midnight transition-colors text-cobalt font-semibold">
            {t.navMoments}
          </a>
          <a href="#materiality" className="hover:text-midnight transition-colors">
            {t.navCraft}
          </a>
          <a href="#transit" className="hover:text-midnight transition-colors">
            Transit
          </a>
          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cobalt hover:text-midnight transition-colors"
          >
            WhatsApp Desk
          </a>
        </div>
      </div>

      {/* Micro-Interactions & Preferences Control Row */}
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-silver/20 flex flex-wrap items-center justify-between gap-4">
        {/* Discreet Audio Micro-Interactions Toggle in Footer */}
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono uppercase tracking-wider text-graphite-muted">
            {t.footerAudioToggle}
          </span>
          <button
            type="button"
            onClick={handleAudioToggle}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-buttery-peach border border-silver/40 text-[11px] font-sans text-graphite hover:text-midnight hover:border-midnight/40 transition-all cursor-pointer shadow-2xs"
            title={isMuted ? "Unmute subtle audio effects" : "Mute subtle audio effects"}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-graphite-muted" />
                <span className="text-graphite-muted">{t.soundMuted}</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-cobalt" />
                <span className="text-midnight font-medium">{t.soundOn}</span>
              </>
            )}
          </button>
        </div>

        {/* Footer Language Switcher */}
        <div className="flex items-center gap-2 text-[11px] font-sans text-graphite-muted">
          <Globe className="w-3.5 h-3.5 text-graphite-muted" />
          <button
            type="button"
            onClick={() => handleLangToggle("en")}
            className={`cursor-pointer transition-colors ${locale === "en" ? "text-midnight font-semibold underline underline-offset-4" : "hover:text-midnight"}`}
          >
            English
          </button>
          <span>/</span>
          <button
            type="button"
            onClick={() => handleLangToggle("hi")}
            className={`cursor-pointer transition-colors ${locale === "hi" ? "text-midnight font-semibold underline underline-offset-4" : "hover:text-midnight"}`}
          >
            हिंदी
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-silver/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-sans text-graphite-muted/80">
        <p>{t.footerAllRights}</p>
        <div className="flex items-center gap-3 font-mono text-[10px]">
          <span>UPI</span>
          <span>•</span>
          <span>Cards</span>
          <span>•</span>
          <span>NetBanking</span>
          <span>•</span>
          <span>RuPay</span>
        </div>
      </div>
    </footer>
  );
}
