
import React, { useState } from "react";
import { MapPin, Sparkles, Compass, Eye, ShieldCheck, Quote } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useSound } from "@/context/SoundContext";

interface SanctuaryPlacement {
  id: string;
  image: string;
  city: string;
  coords: string;
  titleEn: string;
  titleHi: string;
  occasionEn: string;
  occasionHi: string;
  quoteEn: string;
  quoteHi: string;
  authorEn: string;
  authorHi: string;
  specsEn: string;
  specsHi: string;
}

const SANCTUARIES: SanctuaryPlacement[] = [
  {
    id: "diwali-altar",
    image: "/lifestyle/diwali-altar.jpg",
    city: "New Delhi",
    coords: "28.6139° N, 77.2090° E",
    titleEn: "The Diwali Puja Altar",
    titleHi: "दीपावली पूजा मंदिर एवं वेदी",
    occasionEn: "Dhanteras & Shubh Labh Sthapana",
    occasionHi: "धनतेरस एवं शुभ लाभ स्थापना",
    quoteEn:
      "On Dhanteras evening, when the brass diyas were lit and marigolds laid, the pure silver Lakshmi-Ganesha caught the warm flame. It created a deep, quiet stillness our family hadn't felt in years.",
    quoteHi:
      "धनतेरस की संध्या पर जब पीतल के दीप प्रज्ज्वलित हुए और ताज़े गेंदे के पुष्प सजे, तो शुद्ध चांदी पर उकेरे गए लक्ष्मी-गणेश दीपशिखा के आलोक में जगमगा उठे। इसने हमारे परिवार में एक असीम शांति का संचार किया।",
    authorEn: "The Kapur Family • Greater Kailash, New Delhi",
    authorHi: "कपूर परिवार • ग्रेटर कैलाश, नई दिल्ली",
    specsEn: "Makrana Marble Altar • Archival Midnight Velvet • Handcrafted Brass Diyas",
    specsHi: "मकराना संगमरमर वेदी • शाही नीला मखमल • पारंपरिक पीतल के दीप",
  },
  {
    id: "office-desk",
    image: "/lifestyle/office-desk.jpg",
    city: "Bengaluru",
    coords: "12.9716° N, 77.5946° E",
    titleEn: "The Executive Sanctuary Desk",
    titleHi: "कार्य कक्ष एवं अध्ययन वेदी",
    occasionEn: "Founders' Milestone & Daily Anchor",
    occasionHi: "संस्थापक स्मृति एवं दैनिक ऊर्जा",
    quoteEn:
      "It rests right beside my morning journal. In between intense board meetings and high-velocity sprints, a quiet glance at the silver reliefs restores breath, humility, and steadfast intention.",
    quoteHi:
      "यह मेरी प्रातःकालीन डायरी के ठीक समीप रहता है। अत्यधिक व्यस्तता और महत्वपूर्ण निर्णयों के बीच, जब भी मेरी दृष्टि इस पवित्र फ्रेम पर पड़ती है, मन में अद्भुत स्थिरता और एकाग्रता लौट आती है।",
    authorEn: "Aditya V. • Technology Founder, Indiranagar",
    authorHi: "आदित्य वी. • संस्थापक, इंदिरानगर, बेंगलुरु",
    specsEn: "Oiled Solid Walnut Desk • Diffused Morning Light • Daily Blessing Anchor",
    specsHi: "अखरोट की लकड़ी की मेज • प्रातःकालीन सूर्य की किरणें • दैनिक आत्म-शांति",
  },
  {
    id: "griha-pravesh",
    image: "/lifestyle/griha-pravesh.jpg",
    city: "Mumbai",
    coords: "19.0760° N, 72.8777° E",
    titleEn: "The Griha Pravesh Threshold Ledge",
    titleHi: "गृह प्रवेश एवं पावन देहरी",
    occasionEn: "Housewarming & Generational Dedication",
    occasionHi: "शुभ गृह प्रवेश एवं पावन आशीर्वाद",
    quoteEn:
      "Our housewarming guests stood by the travertine ledge reading the reverse plaque with tears in their eyes. It is not just decorative—it carries our family's blessing across generations.",
    quoteHi:
      "गृह प्रवेश पर आए सभी अतिथि इस पाषाण वेदी के पास रुककर पीछे की पट्टिका पर लिखा संदेश पढ़कर भावुक हो गए। यह केवल एक सजावट नहीं है—यह हमारे परिवार का चिरस्थाई आशीर्वाद है।",
    authorEn: "Meera & Rohan Singhania • Juhu, Mumbai",
    authorHi: "मीरा एवं रोहन सिंघानिया • जुहू, मुंबई",
    specsEn: "Honed Travertine Console • Fresh Lotus Urli • Laser Engraved Plaque",
    specsHi: "त्रावर्तिन स्टोन कंसोल • कमल पुष्पों से सजी उरली • लेज़र उत्कीर्ण पट्टिका",
  },
];

export function RealMoments() {
  const [activeTab, setActiveTab] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const { locale, t } = useLanguage();
  const { playClick } = useSound();

  const current = SANCTUARIES[activeTab];

  const handleSelect = (idx: number) => {
    playClick();
    setActiveTab(idx);
  };

  return (
    <section
      id="moments"
      className="w-full bg-squeeze-bottle-green text-olive-ink py-24 sm:py-32 px-6 sm:px-10 border-b border-silver/20 relative overflow-hidden"
    >
      {/* Subtle Background Radial Glow */}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-20">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-olive-ink/70 font-semibold">
              {t.momentsBadge}
            </span>
            <div className="h-[1px] w-12 bg-silver/30" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-olive-ink font-normal leading-tight">
            {t.momentsTitle}
          </h2>
          <p className="text-sm font-sans text-olive-ink/70 mt-3.5 font-light leading-relaxed max-w-2xl">
            {t.momentsDesc}
          </p>
        </div>

        {/* Sanctuary Location Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 mb-10 pb-4 border-b border-olive-ink/20">
          {SANCTUARIES.map((sanctuary, idx) => {
            const isSelected = activeTab === idx;
            return (
              <button
                key={sanctuary.id}
                type="button"
                onClick={() => handleSelect(idx)}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-sans font-medium tracking-wider transition-all cursor-pointer flex items-center gap-2.5 ${
                  isSelected
                    ? "bg-porcelain text-midnight scale-102"
                    : "bg-olive-ink/5 hover:bg-olive-ink/10 text-olive-ink/80 border border-olive-ink/20"
                }`}
              >
                <MapPin className={`w-3.5 h-3.5 ${isSelected ? "text-cobalt" : "text-olive-ink/60"}`} />
                <span>{locale === "hi" ? sanctuary.titleHi : sanctuary.titleEn}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${isSelected ? "bg-olive-ink/10 text-olive-ink" : "bg-olive-ink/10 text-olive-ink/60"}`}>
                  {sanctuary.city}
                </span>
              </button>
            );
          })}
        </div>

        {/* Featured Sanctuary Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: High-Fidelity Editorial Lifestyle Photograph */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] rounded-[16px] overflow-hidden border border-olive-ink/30 bg-olive-ink/10 group">
              <img
                src={current.image}
                alt={locale === "hi" ? current.titleHi : current.titleEn}
                decoding="async"
                fetchPriority="high"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
              />

              {/* Architectural Ambient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

              {/* Top Floating Geolocation Coordinates Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-linen-cream/90 backdrop-blur-md border border-olive-ink/30 text-[10px] font-mono text-olive-ink tracking-wider">
                <Compass className="w-3 h-3 text-olive-ink/80 animate-spin-slow" />
                <span>{current.coords}</span>
                <span className="w-1 h-1 rounded-full bg-emerald-400" />
              </div>

              {/* Bottom Caption Pill */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-sans text-olive-ink">
                <span className="px-3 py-1 rounded-[6px] bg-linen-cream/90 backdrop-blur-md border border-olive-ink/30 text-[11px] font-medium tracking-wide">
                  {locale === "hi" ? current.occasionHi : current.occasionEn}
                </span>
                <span className="text-[10px] font-mono text-olive-ink/70 hidden sm:inline-block">
                  CURATED SANCTUARY 0{activeTab + 1}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative & Provenance */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-olive-ink/60 block">
                {current.city} • {locale === "hi" ? current.occasionHi : current.occasionEn}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-olive-ink font-normal leading-snug">
                {locale === "hi" ? current.titleHi : current.titleEn}
              </h3>
            </div>

            {/* Testimonial Quote Box */}
            <div className="relative p-6 sm:p-7 rounded-[12px] bg-white/[0.04] border border-olive-ink/20 backdrop-blur-sm space-y-4">
              <Quote className="w-6 h-6 text-olive-ink/50" />
              <p className="font-serif italic text-base sm:text-lg text-olive-ink font-light leading-relaxed">
                &ldquo;{locale === "hi" ? current.quoteHi : current.quoteEn}&rdquo;
              </p>
              <div className="pt-3 border-t border-olive-ink/20 flex items-center justify-between">
                <span className="text-xs font-sans font-medium text-olive-ink/90 tracking-wide">
                  {locale === "hi" ? current.authorHi : current.authorEn}
                </span>
                <span title="Verified Silveram Keepsake Placement">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </span>
              </div>
            </div>

            {/* Architectural Placement Specs */}
            <div className="p-4 rounded-[8px] bg-olive-ink/5 border border-olive-ink/20 space-y-1.5">
              <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-olive-ink/60 block">
                {locale === "hi" ? "वास्तु एवं स्थान विवरण:" : "ARCHITECTURAL PLACEMENT SPECS:"}
              </span>
              <p className="text-xs font-sans text-olive-ink/80 font-light">
                {locale === "hi" ? current.specsHi : current.specsEn}
              </p>
            </div>
          </div>
        </div>

        {/* Thumbnail Navigation Row */}
        <div className="grid grid-cols-3 gap-4 mt-12 sm:mt-16 pt-8 border-t border-olive-ink/20">
          {SANCTUARIES.map((sanctuary, idx) => (
            <button
              key={sanctuary.id}
              type="button"
              onClick={() => handleSelect(idx)}
              className={`group text-left p-2.5 sm:p-3 rounded-[10px] border transition-all cursor-pointer ${
                activeTab === idx
                  ? "bg-olive-ink/10 border-porcelain"
                  : "bg-white/[0.02] border-olive-ink/20 hover:border-olive-ink/40"
              }`}
            >
              <div className="relative aspect-[16/9] rounded-[6px] overflow-hidden mb-2.5 bg-olive-ink/10">
                <img
                  src={sanctuary.image}
                  alt={sanctuary.city}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-sans font-medium text-olive-ink group-hover:text-olive-ink transition-colors truncate">
                  {sanctuary.city}
                </span>
                <span className="text-[9px] font-mono text-olive-ink/60">
                  0{idx + 1}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
