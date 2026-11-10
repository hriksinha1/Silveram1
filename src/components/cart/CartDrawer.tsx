
import React, { useState, useRef } from "react";
import { 
  X, 
  ShoppingBag, 
  Upload, 
  Trash2, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  Rotate3d,
  Image as ImageIcon,
  CheckCircle2,
  Lock
} from "lucide-react";
import { useCart, RIBBON_OPTIONS, RibbonOption } from "@/context/CartContext";
import { useSound } from "@/context/SoundContext";
import { useLanguage } from "@/context/LanguageContext";

export function CartDrawer() {
  const { 
    isCartOpen, 
    closeCart, 
    cartCount, 
    activeRibbon, 
    setActiveRibbon, 
    uploadedPhoto, 
    setUploadedPhoto,
    photoOption,
    setPhotoOption,
    inscription,
    openCheckout
  } = useCart();

  const { playRustle, playChime, playClick } = useSound();
  const { locale, t } = useLanguage();

  const [previewFace, setPreviewFace] = useState<"front" | "back">("front");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isCartOpen) return null;

  const handleFileUpload = (file: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file (JPEG, PNG, WebP).");
      return;
    }
    playClick();
    const previewUrl = URL.createObjectURL(file);
    const fileSize = (file.size / (1024 * 1024)).toFixed(1) + " MB";
    setUploadedPhoto({
      previewUrl,
      fileName: file.name,
      fileSize,
      file,
    });
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-midnight/70 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md sm:max-w-lg bg-porcelain flex flex-col animate-in slide-in-from-right duration-300 border-l border-silver/40">
          {/* Header */}
          <div className="p-5 sm:p-6 bg-buttery-peach border-b border-silver/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-buttons bg-evoo-yellow-green text-olive-ink border border-olive-ink flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-silver" />
              </div>
              <div>
                <h3 className="font-serif text-lg text-midnight font-normal">
                  Your Keepsake Gift Bag
                </h3>
                <span className="text-[10px] font-mono tracking-widest uppercase text-graphite-muted">
                  {cartCount > 0 ? "1 Bespoke Item Added" : "Bag Empty"}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={closeCart}
              className="p-2 rounded-full hover:bg-silver/20 text-graphite transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
            {/* 1. Item Visual Preview with Front / Back Toggle */}
            <div className="p-4 rounded-[10px] bg-buttery-peach border border-silver/40 space-y-4">
              <div className="flex items-center justify-between text-xs font-sans pb-2 border-b border-silver/20">
                <span className="font-mono text-[9px] uppercase tracking-widest text-cobalt font-semibold">
                  EDITION 01 • LAKSHMI-GANESHA
                </span>
                {/* Toggle Front / Rear Plaque Preview */}
                <button
                  type="button"
                  onClick={() => {
                    playChime();
                    setPreviewFace(previewFace === "front" ? "back" : "front");
                  }}
                  className="inline-flex items-center gap-1.5 text-[10px] font-sans text-graphite-muted hover:text-midnight font-medium transition-colors cursor-pointer"
                >
                  <Rotate3d className="w-3.5 h-3.5 text-cobalt" />
                  <span>{previewFace === "front" ? (locale === "hi" ? "उत्कीर्ण पट्टिका देखें" : "View Engraved Plaque") : (locale === "hi" ? "पवित्र मुख्य भाग देखें" : "View Sacred Front")}</span>
                </button>
              </div>

              {/* Live Preview Card */}
              <div className="relative rounded-[8px] overflow-hidden bg-midnight-dark border border-silver/30">
                {previewFace === "front" ? (
                  /* FRONT PREVIEW */
                  <div className="relative w-full h-56 overflow-hidden">
                    <img 
                      src="/products/frame-01.webp" 
                      alt="The Sacred Keepsake Frame" 
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent" />
                    
                    {/* Active Ribbon Swatch Tag */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-midnight/85 backdrop-blur-md border border-white/20 text-[10px] font-sans text-porcelain">
                      <span 
                        className="w-2.5 h-2.5 rounded-full border border-white/40 shrink-0" 
                        style={{ backgroundColor: activeRibbon.hex }} 
                      />
                      <span>{activeRibbon.name} Ribbon</span>
                    </div>

                    {/* Photo upload status badge */}
                    {uploadedPhoto && (
                      <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950/80 backdrop-blur-md border border-emerald-400/40 text-[10px] font-sans text-emerald-300">
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span>Photo Uploaded</span>
                      </div>
                    )}

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-porcelain">
                      <div>
                        <h4 className="font-serif text-sm">The Sacred Keepsake Frame</h4>
                        <p className="text-[10px] text-silver/70 font-sans">999 Pure Silver Clad • Monolithic Acrylic</p>
                      </div>
                      <span className="font-serif text-sm font-semibold">₹1,200.00</span>
                    </div>
                  </div>
                ) : (
                  /* REAR PLAQUE LIVE PREVIEW */
                  <div className="p-5 bg-[#2b3021] flex flex-col justify-between min-h-56 relative">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <span className="text-[8px] font-mono uppercase tracking-widest text-silver/60">
                        SILVERAM ATELIER • BESPOKE PLAQUE
                      </span>
                      <span className="font-mono text-[8px] text-emerald-400 font-semibold">
                        SLV-INS-999
                      </span>
                    </div>

                    {/* Plaque Graphic */}
                    <div 
                      className="my-3 p-3.5 rounded-[6px] border border-slate-300 text-center relative"
                      style={{
                        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)",
                      }}
                    >
                      <span className="text-[8px] font-sans font-semibold tracking-widest uppercase text-slate-500 block mb-1">
                        Live Inscription
                      </span>
                      <h5 className="font-serif text-sm text-slate-900 font-normal mb-1">
                        {inscription.recipient || "To One Deeply Cherished"}
                      </h5>
                      <p className="font-serif italic text-[11px] text-slate-700 leading-snug line-clamp-3">
                        "{inscription.message}"
                      </p>
                      <span className="text-[7px] font-sans tracking-widest uppercase text-slate-400 mt-2 block">
                        {inscription.date || "Diwali 2026"}
                      </span>
                    </div>

                    <div className="text-[9px] font-sans text-silver/60 text-center">
                      ✦ Engraved directly into brushed silver plaque before dispatch
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 2. Complimentary Archival Photo Upload Dropzone */}
            <div className="p-4 rounded-[10px] bg-buttery-peach border border-silver/40 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-cobalt" />
                  <span className="text-xs font-sans font-semibold text-midnight uppercase tracking-wider">
                    Archival Photo Printing
                  </span>
                </div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                  FREE COMPLIMENTARY
                </span>
              </div>

              <p className="text-[11px] font-sans text-graphite-muted leading-relaxed font-light">
                Upload any personal or devotional photo. We balance and print on museum-grade <strong>260 GSM satin archival paper</strong>.
              </p>

              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/heic"
                className="hidden"
                onChange={(e) => e.target.files && e.target.files[0] && handleFileUpload(e.target.files[0])}
              />

              {uploadedPhoto ? (
                /* Uploaded File Preview */
                <div className="p-3 rounded-[8px] bg-buttery-peach border border-silver/60 flex items-center justify-between gap-3 animate-in fade-in">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-[4px] overflow-hidden bg-buttery-peach border border-silver/40 shrink-0">
                      <img 
                        src={uploadedPhoto.previewUrl} 
                        alt="Uploaded preview" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-xs font-medium text-midnight block truncate max-w-[180px]">
                        {uploadedPhoto.fileName}
                      </span>
                      <span className="text-[10px] text-graphite-muted">
                        {uploadedPhoto.fileSize} • 260 GSM Ready
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setUploadedPhoto(null)}
                    className="p-1.5 rounded-full text-graphite-muted hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    title="Remove photo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                /* Dropzone Area */
                <div
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                  onDrop={onDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`p-5 rounded-[8px] border-2 border-dashed text-center transition-all cursor-pointer ${
                    isDragging
                      ? "border-cobalt bg-cobalt/5 scale-[1.01]"
                      : "border-silver/60 hover:border-midnight/40 bg-porcelain/60 hover:bg-porcelain"
                  }`}
                >
                  <Upload className="w-6 h-6 text-cobalt mx-auto mb-2 animate-bounce-subtle" />
                  <p className="text-xs font-sans font-medium text-midnight">
                    Drag & drop family or milestone photo here
                  </p>
                  <p className="text-[10px] font-sans text-graphite-muted mt-0.5">
                    or click to browse from device (JPEG, PNG, WebP up to 15MB)
                  </p>
                </div>
              )}

              {/* Framing Preference Radio */}
              {uploadedPhoto && (
                <div className="pt-2 border-t border-silver/30 space-y-2 text-xs font-sans">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-graphite-muted block">
                    Installation Preference:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPhotoOption("installed")}
                      className={`p-2.5 rounded-[6px] text-left border transition-all cursor-pointer ${
                        photoOption === "installed"
                          ? "bg-midnight text-porcelain border-midnight"
                          : "bg-buttery-peach text-graphite border-silver/40 hover:bg-porcelain"
                      }`}
                    >
                      <span className="text-xs font-medium block">Pre-Installed in Frame</span>
                      <span className="text-[10px] opacity-75">Ready to gift immediately</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPhotoOption("envelope")}
                      className={`p-2.5 rounded-[6px] text-left border transition-all cursor-pointer ${
                        photoOption === "envelope"
                          ? "bg-midnight text-porcelain border-midnight"
                          : "bg-buttery-peach text-graphite border-silver/40 hover:bg-porcelain"
                      }`}
                    >
                      <span className="text-xs font-medium block">In Gold-Foil Envelope</span>
                      <span className="text-[10px] opacity-75">Recipient frames it themselves</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Active Ceremonial Ribbon Swatch Selector */}
            <div className="p-4 rounded-[10px] bg-buttery-peach border border-silver/40 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cobalt" />
                  <span className="text-xs font-sans font-semibold text-midnight uppercase tracking-wider">
                    Ceremonial Silk Ribbon
                  </span>
                </div>
                <span className="text-[10px] font-sans text-graphite-muted">
                  Tied around presentation box
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {RIBBON_OPTIONS.map((ribbon) => (
                  <button
                    key={ribbon.name}
                    type="button"
                    onClick={() => {
                      playRustle();
                      setActiveRibbon(ribbon);
                    }}
                    className={`p-2.5 rounded-[6px] text-left border flex items-center gap-2.5 transition-all cursor-pointer ${
                      activeRibbon.name === ribbon.name
                        ? "bg-midnight text-porcelain border-midnight scale-[1.02]"
                        : "bg-porcelain text-graphite border-silver/40 hover:bg-silver/30"
                    }`}
                  >
                    <span 
                      className="w-3.5 h-3.5 rounded-full border border-black/20 shrink-0" 
                      style={{ backgroundColor: ribbon.hex }} 
                    />
                    <div className="truncate">
                      <span className="text-xs font-medium block leading-tight">{ribbon.name}</span>
                      <span className="text-[9px] opacity-70 block truncate">{ribbon.meaning}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Complete Complimentary Packaging Summary */}
            <div className="p-4 rounded-[10px] bg-buttery-peach border border-silver/40 space-y-2 text-xs font-sans">
              <span className="text-[10px] font-mono uppercase tracking-widest text-graphite-muted font-bold block mb-2">
                INCLUDED AT NO ADDITIONAL CHARGE
              </span>
              <div className="flex items-center justify-between text-graphite">
                <span>The Sacred Keepsake Frame (4x6 in)</span>
                <span className="font-serif">₹1,200.00</span>
              </div>
              <div className="flex items-center justify-between text-graphite-muted text-[11px]">
                <span className="flex items-center gap-1.5">
                  <Check className="w-3 h-3 text-emerald-600" /> Rear Inscribed Silver Plaque
                </span>
                <span className="text-emerald-700 font-semibold font-mono text-[10px]">FREE</span>
              </div>
              <div className="flex items-center justify-between text-graphite-muted text-[11px]">
                <span className="flex items-center gap-1.5">
                  <Check className="w-3 h-3 text-emerald-600" /> 260 GSM Archival Photo Print
                </span>
                <span className="text-emerald-700 font-semibold font-mono text-[10px]">FREE</span>
              </div>
              <div className="flex items-center justify-between text-graphite-muted text-[11px]">
                <span className="flex items-center gap-1.5">
                  <Check className="w-3 h-3 text-emerald-600" /> Hand-Tied Satin Ribbon ({activeRibbon.name})
                </span>
                <span className="text-emerald-700 font-semibold font-mono text-[10px]">FREE</span>
              </div>
              <div className="flex items-center justify-between text-graphite-muted text-[11px]">
                <span className="flex items-center gap-1.5">
                  <Check className="w-3 h-3 text-emerald-600" /> Sealed Rigid Keepsake Gift Box
                </span>
                <span className="text-emerald-700 font-semibold font-mono text-[10px]">FREE</span>
              </div>
              <div className="flex items-center justify-between text-graphite-muted text-[11px]">
                <span className="flex items-center gap-1.5">
                  <Check className="w-3 h-3 text-emerald-600" /> Pan-India Express Air Courier
                </span>
                <span className="text-emerald-700 font-semibold font-mono text-[10px]">FREE</span>
              </div>
            </div>
          </div>

          {/* Footer Checkout Bar */}
          <div className="p-5 sm:p-6 bg-buttery-peach border-t border-silver/30 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-graphite-muted block">
                  All-Inclusive Total
                </span>
                <span className="font-serif text-2xl text-midnight font-normal">
                  ₹1,200.00
                </span>
              </div>
              <span className="text-[11px] font-sans text-emerald-700 font-medium bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                GST & Air Delivery Included
              </span>
            </div>

            <button
              type="button"
              onClick={openCheckout}
              className="w-full py-4 rounded-buttons bg-evoo-yellow-green text-olive-ink border border-olive-ink text-xs font-sans font-semibold tracking-widest uppercase hover:bg-evoo-yellow-green/70 transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-silver" />
              <span>Proceed to Delivery & Checkout</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <div className="flex items-center justify-center gap-3 text-[10px] font-sans text-graphite-muted">
              <span>Instant UPI</span>
              <span>•</span>
              <span>Cards</span>
              <span>•</span>
              <span>NetBanking</span>
              <span>•</span>
              <span>COD Available</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
