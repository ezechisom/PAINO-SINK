import React from 'react';
import { SiteConfig } from '../types';
import { formatNaira } from '../config';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, Truck } from 'lucide-react';

interface PriceOfferCardProps {
  config: SiteConfig;
  onOrderClick: () => void;
}

export const PriceOfferCard: React.FC<PriceOfferCardProps> = ({ config, onOrderClick }) => {
  const savings = config.normalPrice - config.promoPrice;

  return (
    <section id="offer-section" className="py-12 md:py-16 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        <div className="relative rounded-3xl bg-white border-2 border-blue-950/15 p-6 sm:p-10 shadow-xl overflow-hidden">
          
          {/* Subtle brand glow behind card */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />

          {/* Top Badge */}
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0a192f] font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-xs">
              <Sparkles className="w-4 h-4 text-blue-600" />
              SPECIAL FACTORY-DIRECT INTRODUCTORY OFFER
            </span>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0a192f] tracking-tight mb-2">
              GET THE COMPLETE SMART PIANO SINK SET
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
              Everything you need in one box: piano faucet console, waterfall bar, pull-out sprayer, cutting board, colander, and all installation pipes.
            </p>
          </div>

          {/* Pricing Box with High Contrast Hierarchy */}
          <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 text-center mb-8 relative">
            <div className="flex flex-col items-center justify-center gap-1 mb-4">
              <span className="text-slate-500 text-xs sm:text-sm font-semibold tracking-widest uppercase">
                REGULAR PRICE
              </span>
              <span className="text-xl sm:text-2xl font-bold text-slate-400 line-through">
                {formatNaira(config.normalPrice)}
              </span>
            </div>

            <div className="flex flex-col items-center justify-center gap-1 mb-4">
              <span className="text-blue-800 font-extrabold text-xs sm:text-sm tracking-widest uppercase bg-blue-100 px-3 py-1 rounded-full border border-blue-200">
                TODAY'S PROMO PRICE
              </span>
              <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0a192f] tracking-tight font-display">
                {formatNaira(config.promoPrice)}
              </span>
            </div>

            {savings > 0 && (
              <div className="inline-block bg-blue-600 text-white font-extrabold text-sm sm:text-base px-4 py-1.5 rounded-full mb-6 shadow-sm">
                YOU SAVE {formatNaira(savings)}
              </div>
            )}

            {/* Reassurance Banner */}
            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-700">
              <span className="flex items-center gap-1.5 text-[#0a192f]">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                Special Discount Applied
              </span>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5 text-slate-700">
                <Truck className="w-3.5 h-3.5 text-blue-600" />
                Free Nationwide Delivery
              </span>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5 text-blue-700 font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                Payment on Delivery Available
              </span>
            </div>
          </div>

          {/* Offer Value Checkpoints */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-xs sm:text-sm text-slate-700">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Real-Time LED Temperature Display (°C)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Light Turns On Automatically When Water Flows</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Complete Piano Faucet Console Included</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Full Workstation Accessories Kit Included</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Heavy-Duty SUS304 Nano Stainless Steel</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
              <span>100% Hydroelectric (Zero Batteries or Electricity)</span>
            </div>
          </div>

          {/* Primary CTA Button — BLINKING */}
          <button
            onClick={onOrderClick}
            id="offer-card-order-btn"
            className="w-full inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-black text-lg py-5 px-6 sm:px-8 rounded-xl shadow-xl shadow-blue-600/30 hover:shadow-blue-600/40 transform active:scale-[0.99] transition-all cursor-pointer tracking-wider uppercase animate-action-blink"
          >
            <div className="flex flex-col items-center">
              <span>ORDER NOW — PAYMENT ON DELIVERY</span>
              <span className="text-xs font-bold text-white/90 normal-case tracking-normal">
                Inspect Before Payment &bull; Zero Upfront Risk
              </span>
            </div>
            <ArrowRight className="w-6 h-6 shrink-0" />
          </button>

          <div className="flex items-center justify-center gap-2 mt-4 text-xs text-slate-600">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Fast Dispatch &bull; Nationwide Safe Delivery Across Nigeria</span>
          </div>

        </div>

      </div>
    </section>
  );
};
