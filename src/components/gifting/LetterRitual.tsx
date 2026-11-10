
import React, { useState, useRef, useEffect } from "react";
import { ArrowRight, ArrowLeft, RotateCcw, Sparkles, Mail, Eye } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useSound } from "@/context/SoundContext";
import { useCart } from "@/context/CartContext";

interface StoryPage {
  stage: string;
  headline: string;
  body: string;
  buttonText?: string;
  closingLine?: string;
}

const STORY_PAGES_EN: StoryPage[] = [
  {
    stage: "The thought",
    headline: "It always starts with someone.",
    body: "A name that crosses your mind. A memory that makes you smile. A feeling you wish you could put into words.",
    buttonText: "Turn the page →",
  },
  {
    stage: "The search",
    headline: "Then you look for a way to say it.",
    body: "You search for something that feels like them—not because you have to give a gift, but because you want them to know you remembered.",
    buttonText: "Turn the page →",
  },
  {
    stage: "The choosing",
    headline: "A little thing can hold a lot of meaning.",
    body: "Chosen with care, a keepsake becomes more than an object. It becomes a small reminder of a person, a promise, or a moment worth keeping.",
    buttonText: "Turn the page →",
  },
  {
    stage: "The moment",
    headline: "And then, the moment is theirs.",
    body: "The envelope opens. Their eyes soften. For a second, the world gets quiet—and they feel remembered.",
    closingLine: "Some gifts are opened once. The feeling stays.",
  },
];

const STORY_PAGES_HI: StoryPage[] = [
  {
    stage: "ख़याल",
    headline: "हर शुरुआत किसी अपने से होती है।",
    body: "एक नाम जो अचानक याद आ जाए। एक याद जो चेहरे पर मुस्कान ले आए। एक एहसास, जिसे शब्दों में कहना आसान न हो।",
    buttonText: "आगे पढ़ें →",
  },
  {
    stage: "तलाश",
    headline: "फिर आप उसे जताने का एक तरीका ढूँढ़ते हैं।",
    body: "कुछ ऐसा, जो उस इंसान जैसा लगे—क्योंकि तोहफ़ा देना ज़रूरी नहीं, उन्हें यह महसूस कराना ज़रूरी है कि आपने उन्हें याद किया।",
    buttonText: "आगे पढ़ें →",
  },
  {
    stage: "चुनाव",
    headline: "छोटी-सी चीज़ में बहुत-सा मतलब हो सकता है।",
    body: "प्यार से चुनी गई एक यादगार चीज़, किसी अपने, किसी वादे या किसी ख़ास पल की निशानी बन सकती है।",
    buttonText: "आगे पढ़ें →",
  },
  {
    stage: "वह पल",
    headline: "और फिर, वह पल उनका हो जाता है।",
    body: "तोहफ़ा खुलता है। चेहरे पर नरम-सी मुस्कान आती है। एक पल को जैसे दुनिया ठहर जाती है—और उन्हें एहसास होता है कि किसी ने उन्हें याद रखा।",
    closingLine: "कुछ तोहफ़े एक बार खुलते हैं। उनका एहसास हमेशा रहता है।",
  },
];

export function LetterRitual() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0); // 0 to 3
  const [animating, setAnimating] = useState(false);

  const { locale } = useLanguage();
  const { playRustle, playChime, playClick } = useSound();
  const { addToBag } = useCart();

  const letterRef = useRef<HTMLDivElement>(null);
  const pages = locale === "hi" ? STORY_PAGES_HI : STORY_PAGES_EN;
  const totalPages = pages.length;

  // Non-sensitive analytics dispatcher
  const trackAnalytics = (eventName: string, data?: Record<string, unknown>) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("silveram_analytics", {
          detail: { event: eventName, ...data, timestamp: Date.now() },
        })
      );
    }
  };

  const handleOpenLetter = () => {
    playRustle();
    setIsOpen(true);
    setCurrentPage(0);
    trackAnalytics("gift_story_opened");
    trackAnalytics("gift_story_page_viewed", { pageIndex: 1 });
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1 && !animating) {
      setAnimating(true);
      playRustle();
      setTimeout(() => {
        setCurrentPage((prev) => {
          const next = prev + 1;
          trackAnalytics("gift_story_page_viewed", { pageIndex: next + 1 });
          if (next === totalPages - 1) {
            trackAnalytics("gift_story_completed");
          }
          return next;
        });
        setAnimating(false);
      }, 250);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0 && !animating) {
      setAnimating(true);
      playClick();
      setTimeout(() => {
        setCurrentPage((prev) => prev - 1);
        trackAnalytics("gift_story_previous_clicked", { pageIndex: currentPage });
        setAnimating(false);
      }, 250);
    }
  };

  const handleReset = () => {
    playClick();
    setIsOpen(false);
    setCurrentPage(0);
  };

  const handleCtaClick = () => {
    playChime();
    trackAnalytics("gift_story_cta_clicked");
    addToBag();
    const heroEl = document.getElementById("hero");
    if (heroEl) {
      heroEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const current = pages[currentPage];
  const pageNumberString = `0${currentPage + 1} / 0${totalPages}`;

  return (
    <section
      id="letter"
      className="w-full bg-squeeze-bottle-green text-olive-ink py-24 sm:py-32 px-6 sm:px-10 border-b border-silver/15 relative overflow-hidden select-none"
      aria-label={locale === "hi" ? "एक ख़त आपके नाम" : "A letter for someone you love"}
    >
      {/* Background Subtle Radial Glow & Hairline Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(60, 66, 46, 0.07) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(60, 66, 46, 0.07) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center text-center">
        {/* Section Pre-title Header */}
        <div className="mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-olive-ink/5 border border-olive-ink/20 text-[10px] font-mono tracking-[0.25em] text-olive-ink/80 uppercase mb-3">
            <Sparkles className="w-3 h-3 text-olive-ink" />
            <span>
              {locale === "hi"
                ? "पावन उपहार गाथा // ख़त अपनों के नाम"
                : "SIGNATURE GIFTING RITUAL // A LETTER FOR YOU"}
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-olive-ink font-normal">
            {locale === "hi"
              ? "एक ख़त उनके नाम, जिन्हें आप सबसे अधिक चाहते हैं"
              : "A letter for someone you love"}
          </h2>
          <p className="text-xs sm:text-sm font-sans text-olive-ink/70 max-w-md mx-auto mt-2 font-light">
            {locale === "hi"
              ? "तोहफ़ा केवल एक वस्तु नहीं, एक एहसास है। इसे आहिस्ता से खोलें।"
              : "Gifting begins before the box arrives. Press gently to reveal the story."}
          </p>
        </div>

        {/* ======================================================== */}
        {/* THE INTERACTIVE CEREMONIAL ENVELOPE STAGE                 */}
        {/* ======================================================== */}
        <div className="relative w-full max-w-lg min-h-[460px] sm:min-h-[500px] flex flex-col items-center justify-end pb-4">
          {/* 1. THE LETTER CONTAINER (Slides up when open) */}
          <div
            ref={letterRef}
            className={`w-full max-w-md bg-[#fff4ec] text-midnight rounded-[12px] p-7 sm:p-9 border border-[#3c422e] transition-all duration-700 ease-out z-20 text-left relative ${
              isOpen
                ? "-translate-y-20 sm:-translate-y-28 opacity-100 scale-100 pointer-events-auto"
                : "translate-y-12 opacity-0 scale-95 pointer-events-none"
            }`}
            style={{
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {/* Fine Archival Letter Inner Hairline Border */}
            <div className="border border-[#3c422e]/10 p-5 sm:p-6 rounded-[8px] flex flex-col justify-between min-h-[300px] relative">
              {/* Letter Top Bar: Monogram & Progress */}
              <div className="flex items-center justify-between border-b border-[#3c422e]/10 pb-3 text-[10px] font-mono tracking-widest text-graphite-muted uppercase">
                <span className="font-medium text-[#3c422e]/80 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cobalt" />
                  {locale === "hi" ? "सिल्वरम · एक ख़त आपके लिए" : "SILVERAM · A LETTER FOR YOU"}
                </span>
                <span className="bg-[#3c422e]/5 px-2 py-0.5 rounded text-[#3c422e] font-semibold">
                  {pageNumberString}
                </span>
              </div>

              {/* Letter Narrative Body (Smooth Slide/Fade Transition) */}
              <div
                className={`py-6 space-y-3 transition-all duration-250 ${
                  animating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
                }`}
              >
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-cobalt font-semibold block">
                  {current.stage}
                </span>

                <h3 className="font-serif text-2xl sm:text-3xl text-midnight font-normal leading-tight">
                  {current.headline}
                </h3>

                <p className="text-xs sm:text-sm font-sans text-graphite font-light leading-relaxed">
                  {current.body}
                </p>

                {current.closingLine && (
                  <p className="font-serif italic text-xs sm:text-[13px] text-midnight/90 pt-3 border-t border-[#3c422e]/10 font-normal">
                    &ldquo;{current.closingLine}&rdquo;
                  </p>
                )}
              </div>

              {/* Letter Controls Row */}
              <div className="pt-3 border-t border-[#3c422e]/10 flex items-center justify-between text-xs font-sans">
                {/* Previous Page Button (visible from page 2 onward) */}
                <div>
                  {currentPage > 0 && currentPage < totalPages - 1 && (
                    <button
                      type="button"
                      onClick={handlePrevPage}
                      className="inline-flex items-center gap-1.5 text-graphite-muted hover:text-midnight transition-colors cursor-pointer py-1 font-medium"
                      aria-label="Previous story page"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>{locale === "hi" ? "पिछला" : "Previous"}</span>
                    </button>
                  )}
                  {currentPage === totalPages - 1 && (
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center gap-1.5 text-graphite-muted hover:text-midnight transition-colors cursor-pointer py-1 text-[11px]"
                      aria-label="Read the letter again"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{locale === "hi" ? "ख़त फिर से पढ़ें" : "Read again"}</span>
                    </button>
                  )}
                </div>

                {/* Next Page / Final CTA Button */}
                <div>
                  {currentPage < totalPages - 1 ? (
                    <button
                      type="button"
                      onClick={handleNextPage}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-buttons bg-evoo-yellow-green text-olive-ink border border-olive-ink text-xs font-sans font-medium tracking-wider uppercase hover:bg-evoo-yellow-green/70 transition-all active:scale-95 cursor-pointer"
                    >
                      <span>{current.buttonText}</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleCtaClick}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cobalt hover:bg-cobalt-light text-white text-xs font-sans font-semibold tracking-wider uppercase transition-all active:scale-95 cursor-pointer"
                    >
                      <span>
                        {locale === "hi" ? "उनके लिए कुछ ख़ास चुनें ↗" : "Find their keepsake ↗"}
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 2. THE PHYSICAL ENVELOPE (Stays gracefully behind the letter) */}
          <div className="absolute bottom-0 w-full max-w-md h-52 sm:h-56 z-10 flex flex-col justify-end">
            {/* The Envelope Pocket Body */}
            <div
              className="relative w-full h-44 sm:h-48 rounded-[12px] bg-[#fff4ec] border border-[#3c422e] overflow-hidden flex flex-col items-center justify-center p-6 text-center"
              style={{
                background: "linear-gradient(180deg, #fff4ec 0%, #f6e6d9 100%)",
              }}
            >
              {/* Envelope V-Pocket Fold Lines */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: `
                    linear-gradient(135deg, rgba(12, 27, 54, 0.04) 50%, transparent 50%),
                    linear-gradient(225deg, rgba(12, 27, 54, 0.04) 50%, transparent 50%)
                  `,
                }}
              />

              {/* Closed Envelope State (Initial Invitation & Seal) */}
              {!isOpen ? (
                <div className="relative z-10 flex flex-col items-center space-y-3.5 animate-in fade-in duration-500">
                  {/* Geometric Wax Seal Emblem */}
                  <div className="w-14 h-14 rounded-full bg-[#3c422e] border-2 border-[#3c422e] flex flex-col items-center justify-center text-[#fff4ec] p-1 select-none">
                    <span className="font-serif text-[11px] font-normal tracking-widest uppercase">
                      SLV
                    </span>
                    <div className="w-3 h-[1px] bg-[#3c422e]/60 my-0.5" />
                    <span className="text-[6px] font-mono tracking-wider text-silver/80">
                      RITUAL
                    </span>
                  </div>

                  <div>
                    <span className="text-xs font-serif text-[#3c422e] font-medium block">
                      {locale === "hi" ? "सिल्वरम पावन उपहार पत्र" : "The Silveram Gifting Letter"}
                    </span>
                    <span className="text-[10px] font-sans text-graphite-muted block">
                      {locale === "hi" ? "व्यक्तिगत समर्पण एवं अनुभव" : "Intimate narrative of thoughtful keepsakes"}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleOpenLetter}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-buttons bg-evoo-yellow-green text-olive-ink border border-olive-ink text-xs font-sans font-medium tracking-widest uppercase hover:bg-evoo-yellow-green/70 transition-all active:scale-95 cursor-pointer mt-1"
                  >
                    <Mail className="w-3.5 h-3.5 text-silver" />
                    <span>{locale === "hi" ? "ख़त खोलें" : "Open your letter"}</span>
                  </button>
                </div>
              ) : (
                /* Envelope Rim when Open (supporting the letter) */
                <div className="relative z-10 flex items-center justify-between w-full px-4 text-[9px] font-mono uppercase tracking-widest text-[#3c422e]/60">
                  <span>SILVERAM ARCHIVE</span>
                  <span className="font-semibold text-cobalt">SEAL UNBROKEN</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
