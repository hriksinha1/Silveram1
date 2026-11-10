import { useEffect, useState } from "react";
import { fetchFeaturedProducts } from "@/lib/appwrite/products";
import { FALLBACK_PRODUCT } from "@/data/fallbackProduct";
import type { PublicProductDto } from "@/types/products";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/product/HeroSection";
import { LetterRitual } from "@/components/gifting/LetterRitual";
import { OccasionsSection } from "@/components/gifting/OccasionsSection";
import { UnboxingSuite } from "@/components/gifting/UnboxingSuite";
import { RealMoments } from "@/components/trust/RealMoments";
import { MaterialitySpecs } from "@/components/product/MaterialitySpecs";
import { PincodeTransitEstimator } from "@/components/commerce/PincodeTransitEstimator";
import { CorporateGiftingSection } from "@/components/corporate/CorporateGiftingSection";
import { FaqSection } from "@/components/trust/FaqSection";
import { StickyBottomDock } from "@/components/layout/StickyBottomDock";
import { Footer } from "@/components/layout/Footer";

export function HomePage() {
  const [heroProduct, setHeroProduct] = useState<PublicProductDto>(FALLBACK_PRODUCT);

  useEffect(() => {
    let active = true;
    fetchFeaturedProducts().then((products) => {
      if (active && products[0]) setHeroProduct(products[0]);
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Unified Fixed Header with Announcement Bar */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <AnnouncementBar />
        <Header />
      </header>

      {/* 2. Main Content Container (with top offset for fixed header) */}
      <main className="w-full pt-[116px] bg-porcelain flex-1">
        {/* Section 1: Cinematic Midnight Hero */}
        <HeroSection product={heroProduct} />

        {/* Signature Storytelling Interaction: A letter for someone you love */}
        <LetterRitual />

        {/* Section 2: Intentional Gifting Occasions */}
        <OccasionsSection />

        {/* Section 3: The Ceremonial Unboxing Suite */}
        <UnboxingSuite />

        {/* Section 4: Real Indian Family Moments (Curated Placement Photography) */}
        <RealMoments />

        {/* Section 5: Honest Materiality & Specs */}
        <MaterialitySpecs product={heroProduct} />

        {/* Section 4: Real-Time Pincode Transit Estimator */}
        <PincodeTransitEstimator />

        {/* Section 5: Corporate & Curated Gifting Suite */}
        <CorporateGiftingSection />

        {/* Section 6: Compact Honest FAQ Accordion */}
        <FaqSection />
      </main>

      {/* 4. Sticky Conversion Bottom Dock */}
      <StickyBottomDock product={heroProduct} />

      {/* 5. Footer */}
      <Footer />
    </div>
  );
}
