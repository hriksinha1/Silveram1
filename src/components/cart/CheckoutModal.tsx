
import React, { useState } from "react";
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  ArrowRight, 
  Truck, 
  CreditCard, 
  Smartphone, 
  QrCode,
  Gift
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { placeOrder, uploadOrderPhoto } from "@/lib/appwrite/orders";
import { FALLBACK_PRODUCT } from "@/data/fallbackProduct";

export function CheckoutModal() {
  const { 
    isCheckoutOpen, 
    closeCheckout, 
    activeRibbon, 
    uploadedPhoto, 
    inscription, 
    photoOption,
    clearBag 
  } = useCart();
  const { locale } = useLanguage();

  const [step, setStep] = useState<"details" | "payment" | "success">("details");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [isDirectGift, setIsDirectGift] = useState(false);
  const [giftNote, setGiftNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "cod">("upi");
  const [placing, setPlacing] = useState(false);
  const [orderError, setOrderError] = useState("");
  const [orderNumber, setOrderNumber] = useState("");

  if (!isCheckoutOpen) return null;

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[6-9]d{9}$/.test(phone)) {
      setOrderError("Please enter a valid 10-digit Indian mobile number.");
      return;
    }
    if (!/^d{6}$/.test(pincode)) {
      setOrderError("Please enter a valid 6-digit PIN code.");
      return;
    }
    setOrderError("");
    setStep("payment");
  };

  const handlePaymentComplete = async () => {
    setPlacing(true);
    setOrderError("");
    try {
      const photoFileId = uploadedPhoto?.file ? await uploadOrderPhoto(uploadedPhoto.file) : undefined;
      const order = await placeOrder({
        locale,
        productSlug: FALLBACK_PRODUCT.slug,
        variantKey: "default",
        quantity: 1,
        customer: { name: name.trim(), email: email.trim(), phone },
        shippingAddress: { recipientName: name.trim(), addressLine1: address.trim(), postalCode: pincode, countryCode: "IN" },
        gift: { isGift: isDirectGift, giftMessage: giftNote.trim() || undefined },
        personalisation: {
          recipient: inscription.recipient,
          message: inscription.message,
          date: inscription.date,
          ribbon: activeRibbon.name,
          photoOption,
          photoFileId,
        },
        paymentMethod,
      });
      setOrderNumber(order.orderNumber);
      setStep("success");
      clearBag();
    } catch (err) {
      setOrderError(err instanceof Error ? err.message : "We could not place your order. Please try again.");
    } finally {
      setPlacing(false);
    }
  };

  const resetAndClose = () => {
    setStep("details");
    setOrderError("");
    closeCheckout();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-midnight/80 backdrop-blur-md transition-opacity duration-300"
        onClick={resetAndClose}
      />

      <div className="min-h-screen px-4 text-center flex items-center justify-center p-4">
        <div 
          className="relative inline-block w-full max-w-lg p-6 sm:p-8 overflow-hidden text-left align-middle bg-porcelain rounded-[12px] border border-silver/40 transition-all z-10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-silver/30 mb-6">
            <div className="flex items-center gap-2.5">
              <span className="font-serif text-xl text-midnight font-normal uppercase tracking-wider">
                SILVERAM
              </span>
              <span className="text-[10px] font-mono text-graphite-muted uppercase">
                • SECURE CHECKOUT
              </span>
            </div>

            <button
              type="button"
              onClick={resetAndClose}
              className="p-1.5 rounded-full hover:bg-silver/20 text-graphite transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* STEP 1: DELIVERY DETAILS */}
          {step === "details" && (
            <form onSubmit={handleDetailsSubmit} className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-sans font-semibold text-midnight uppercase tracking-wider">
                  1. Delivery Destination
                </span>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Free Express Air
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-sans uppercase tracking-wider text-graphite-muted block mb-1">
                    Full Name *
                  </label>
                  <input
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Recipient / Customer name"
                    className="w-full px-3.5 py-2.5 rounded-[6px] bg-buttery-peach border border-silver/60 text-midnight text-xs font-sans focus:outline-none focus:border-midnight"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-sans uppercase tracking-wider text-graphite-muted block mb-1">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    required
                    type="tel"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="10-digit mobile for tracking"
                    className="w-full px-3.5 py-2.5 rounded-[6px] bg-buttery-peach border border-silver/60 text-midnight text-xs font-sans focus:outline-none focus:border-midnight"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-sans uppercase tracking-wider text-graphite-muted block mb-1">
                  Email Address (for Tax Invoice) *
                </label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 rounded-[6px] bg-buttery-peach border border-silver/60 text-midnight text-xs font-sans focus:outline-none focus:border-midnight"
                />
              </div>

              <div>
                <label className="text-[10px] font-sans uppercase tracking-wider text-graphite-muted block mb-1">
                  Full Postal Address *
                </label>
                <textarea
                  required
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House/Apartment, Street, Landmark, City, State"
                  className="w-full px-3.5 py-2.5 rounded-[6px] bg-buttery-peach border border-silver/60 text-midnight text-xs font-sans focus:outline-none focus:border-midnight resize-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-sans uppercase tracking-wider text-graphite-muted block mb-1">
                  6-Digit Indian Pincode *
                </label>
                <input
                  required
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="e.g. 110001, 400001, 560001"
                  className="w-full px-3.5 py-2.5 rounded-[6px] bg-buttery-peach border border-silver/60 text-midnight text-xs font-mono focus:outline-none focus:border-midnight"
                />
              </div>

              {orderError && (
                <p role="alert" className="text-xs font-sans text-red-700 bg-red-50 border border-red-200 rounded-[6px] px-3 py-2">
                  {orderError}
                </p>
              )}

              {/* Direct Gift Checkbox */}
              <div className="p-3 rounded-[8px] bg-buttery-peach border border-silver/40 space-y-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-sans text-midnight font-medium">
                  <input
                    type="checkbox"
                    checked={isDirectGift}
                    onChange={(e) => setIsDirectGift(e.target.checked)}
                    className="w-4 h-4 text-midnight rounded"
                  />
                  <span>This is a direct gift shipped to recipient (omit invoice pricing)</span>
                </label>

                {isDirectGift && (
                  <input
                    type="text"
                    maxLength={100}
                    value={giftNote}
                    onChange={(e) => setGiftNote(e.target.value)}
                    placeholder="Short handwritten note on gold-foil card (optional)"
                    className="w-full px-3 py-2 rounded-[6px] bg-porcelain border border-silver/40 text-midnight text-xs font-sans focus:outline-none mt-2"
                  />
                )}
              </div>

              {/* Inclusions summary pill */}
              <div className="p-3 rounded-[8px] bg-buttery-peach border border-silver/40 flex items-center justify-between text-xs font-sans text-graphite-muted">
                <span className="flex items-center gap-1.5">
                  <Gift className="w-3.5 h-3.5 text-cobalt" />
                  <span>Ribbon: <strong>{activeRibbon.name}</strong> • Plaque: <strong>Engraved</strong></span>
                </span>
                <span className="font-serif font-bold text-midnight">₹1,200.00</span>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-buttons bg-evoo-yellow-green text-olive-ink border border-olive-ink text-xs font-sans font-semibold tracking-widest uppercase hover:bg-evoo-yellow-green/70 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Continue to Secure Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* STEP 2: PAYMENT METHOD */}
          {step === "payment" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-sans font-semibold text-midnight uppercase tracking-wider">
                  2. Select Payment Mode
                </span>
                <button
                  type="button"
                  onClick={() => setStep("details")}
                  className="text-[10px] font-sans text-cobalt hover:underline cursor-pointer"
                >
                  Edit Address
                </button>
              </div>

              {/* Payment Option Tabs */}
              <div className="space-y-2.5">
                {/* Instant UPI */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("upi")}
                  className={`w-full p-4 rounded-[8px] border text-left flex items-center justify-between transition-all cursor-pointer ${
                    paymentMethod === "upi"
                      ? "border-midnight bg-buttery-peach ring-1 ring-midnight"
                      : "border-silver/50 bg-white/70 hover:bg-buttery-peach"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-cobalt" />
                    <div>
                      <span className="text-xs font-sans font-semibold text-midnight block">
                        Instant UPI / QR (Zero Fees)
                      </span>
                      <span className="text-[10px] text-graphite-muted">
                        Google Pay • PhonePe • Paytm • BHIM
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">
                    RECOMMENDED
                  </span>
                </button>

                {/* Cards / NetBanking */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`w-full p-4 rounded-[8px] border text-left flex items-center justify-between transition-all cursor-pointer ${
                    paymentMethod === "card"
                      ? "border-midnight bg-buttery-peach ring-1 ring-midnight"
                      : "border-silver/50 bg-white/70 hover:bg-buttery-peach"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-midnight" />
                    <div>
                      <span className="text-xs font-sans font-semibold text-midnight block">
                        Credit / Debit Card & NetBanking
                      </span>
                      <span className="text-[10px] text-graphite-muted">
                        Visa • Mastercard • RuPay • Amex
                      </span>
                    </div>
                  </div>
                </button>

                {/* Cash on Delivery */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`w-full p-4 rounded-[8px] border text-left flex items-center justify-between transition-all cursor-pointer ${
                    paymentMethod === "cod"
                      ? "border-midnight bg-buttery-peach ring-1 ring-midnight"
                      : "border-silver/50 bg-white/70 hover:bg-buttery-peach"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-midnight" />
                    <div>
                      <span className="text-xs font-sans font-semibold text-midnight block">
                        Cash on Delivery (COD)
                      </span>
                      <span className="text-[10px] text-graphite-muted">
                        Pay cash or UPI upon doorstep arrival
                      </span>
                    </div>
                  </div>
                </button>
              </div>

              {/* UPI Simulator Box */}
              {paymentMethod === "upi" && (
                <div className="p-4 rounded-[8px] bg-buttery-peach border border-silver/40 text-center space-y-3">
                  <div className="w-32 h-32 mx-auto rounded-[6px] bg-midnight-dark text-porcelain p-3 flex flex-col items-center justify-center border border-silver/40">
                    <QrCode className="w-20 h-20 text-silver" />
                    <span className="text-[8px] font-mono text-silver/80 mt-1">SILVERAM MERCHANT</span>
                  </div>
                  <p className="text-[11px] font-sans text-graphite-muted">
                    Confirm your order and we will send a secure UPI payment link to your WhatsApp and email. Your frame goes into production once payment is received.
                  </p>
                </div>
              )}

              {orderError && (
                <p role="alert" className="text-xs font-sans text-red-700 bg-red-50 border border-red-200 rounded-[6px] px-3 py-2">
                  {orderError}
                </p>
              )}

              {/* Order Breakdown */}
              <div className="p-3.5 rounded-[8px] bg-buttery-peach border border-silver/40 flex items-center justify-between text-xs font-sans">
                <span className="text-graphite-muted">Total Payable:</span>
                <span className="font-serif text-xl font-bold text-midnight">₹1,200.00</span>
              </div>

              <button
                type="button"
                onClick={handlePaymentComplete}
                disabled={placing}
                className="w-full py-4 disabled:opacity-60 disabled:cursor-not-allowed rounded-buttons bg-evoo-yellow-green text-olive-ink border border-olive-ink text-xs font-sans font-semibold tracking-widest uppercase hover:bg-evoo-yellow-green/70 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-silver" />
                <span>{placing ? "Placing order…" : "Confirm Order — ₹1,200.00"}</span>
              </button>
            </div>
          )}

          {/* STEP 3: ORDER SUCCESS & CONCIERGE */}
          {step === "success" && (
            <div className="text-center py-6 space-y-5 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-700 font-bold block mb-1">
                  ORDER PLACED • {orderNumber}
                </span>
                <h3 className="font-serif text-2xl text-midnight font-normal">
                  May this keepsake bring enduring light.
                </h3>
                <p className="text-xs font-sans text-graphite-muted mt-2 max-w-sm mx-auto leading-relaxed">
                  Your silver keepsake frame is now queued for precision laser engraving and ceremonial ribbon finishing at our New Delhi workshop.
                </p>
              </div>

              <div className="p-4 rounded-[8px] bg-buttery-peach border border-silver/40 text-left text-xs font-sans space-y-2">
                <div className="flex items-center justify-between border-b border-silver/20 pb-2">
                  <span className="text-graphite-muted">Recipient / Dedication:</span>
                  <span className="font-medium text-midnight">{inscription.recipient}</span>
                </div>
                <div className="flex items-center justify-between border-b border-silver/20 pb-2">
                  <span className="text-graphite-muted">Ceremonial Ribbon:</span>
                  <span className="font-medium text-midnight">{activeRibbon.name}</span>
                </div>
                <div className="flex items-center justify-between border-b border-silver/20 pb-2">
                  <span className="text-graphite-muted">Archival Photo:</span>
                  <span className="font-medium text-emerald-700">
                    {uploadedPhoto ? "Uploaded (Archival 260 GSM)" : "Sri Lakshmi-Ganesh Devotional Art"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-graphite-muted">Estimated Dispatch:</span>
                  <span className="font-medium text-midnight">Within 24–36 Hours</span>
                </div>
              </div>

              <button
                type="button"
                onClick={resetAndClose}
                className="w-full py-3.5 rounded-buttons bg-evoo-yellow-green text-olive-ink border border-olive-ink text-xs font-sans font-semibold tracking-widest uppercase hover:bg-evoo-yellow-green/70 transition-all cursor-pointer"
              >
                Return to Storefront
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
