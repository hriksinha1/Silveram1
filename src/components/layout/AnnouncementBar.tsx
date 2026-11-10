
import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export function AnnouncementBar() {
  const { t } = useLanguage();

  return (
    <div className="w-full bg-olive-ink text-linen-cream py-2 px-4 text-center overflow-x-auto whitespace-nowrap">
      <p className="text-[10px] font-sans font-medium tracking-[0.25em] uppercase">
        {t.announcement}
      </p>
    </div>
  );
}
