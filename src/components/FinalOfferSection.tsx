import React from 'react';
import { SiteConfig } from '../types';
import { formatNaira } from '../config';
import { ArrowRight, Sparkles, CheckCircle2, Truck, Thermometer, Zap } from 'lucide-react';

interface FinalOfferSectionProps {
  config: SiteConfig;
  onOrderClick: () => void;
}

export const FinalOfferSection: React.FC<FinalOfferSectionProps> = ({ config, onOrderClick }) => {
  const savings = config.normalPrice - config.promoPrice;

  return (
    <section id="final-offer-section" className="py-16 md:py-24 bg-gradient-to-b from-[#0b0f14] via-[#101824] to-[#0b0f14] border-t border-slate-800 relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative text-center">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-widest mb-4">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Special Offer</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
          READY TO GIVE YOUR KITCHEN A MODERN UPGRADE?
        </h2>

        <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8 font-light leading-relaxed">
          Order now to secure your complete Smart Kitchen Piano Sink with real-time digital temperature display, water-flow ambient light, piano controls, waterfall stream, and nested prep workstation accessories.
        </p>

        {/* Promo Price Card */}
        <div className="bg-slate-950/85 border-2 border-amber-500/30 rounded-3xl p-6 sm:p-8 max-w-lg mx-auto mb-8 shadow-2xl">
          <div className="flex flex-col items-center justify-center mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Exclusive Promo Price
            </span>
            <div className="text-4xl sm:text-5xl font-black text-white font-display text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-white to-amber-400 mt-1">
              {formatNaira(config.promoPrice)}
            </div>
            {savings > 0 && (
              <span className="text-xs font-bold text-blue-300 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-400/30 mt-2">
                Save {formatNaira(savings)} off regular price
              </span>
            )}
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-center gap-2 text-xs font-semibold text-slate-300">
            <Truck className="w-4 h-4 text-amber-400" />
            <span>Complete Full Workstation Set &bull; Free Nationwide Dispatch</span>
          </div>
        </div>

        {/* Value Highlights */}
        <div className="flex flex-wrap items-center justify-center gap-4 max-w-xl mx-auto mb-8 text-xs text-slate-300">
          <span className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-800">
            <Thermometer className="w-3.5 h-3.5 text-amber-400" />
            LED Temp Display (°C)
          </span>
          <span className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-800">
            <Zap className="w-3.5 h-3.5 text-blue-400" />
            Light Turns On With Water Flow
          </span>
          <span className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
            100% Hydroelectric Powered
          </span>
        </div>

        {/* Primary CTA — BLINKING */}
        <div className="max-w-md mx-auto mb-6">
          <button
            onClick={onOrderClick}
            id="final-offer-order-btn"
            className="w-full inline-flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-base py-4.5 px-6 sm:px-8 rounded-xl shadow-xl shadow-amber-500/30 transform active:scale-[0.98] transition-all cursor-pointer uppercase tracking-wider animate-action-blink"
          >
            <div className="flex flex-col items-center">
              <span>ORDER NOW — PAYMENT ON DELIVERY</span>
              <span className="text-[11px] font-bold text-black/80 normal-case tracking-normal">
                {formatNaira(config.promoPrice)} &bull; Pay when you receive your sink
              </span>
            </div>
            <ArrowRight className="w-5 h-5 shrink-0" />
          </button>
        </div>

        <div className="flex items-center justify-center gap-3 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
            Nationwide Delivery
          </span>
          <span>&bull;</span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
            Secure Packaging
          </span>
          <span>&bull;</span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
            1-Year Warranty
          </span>
        </div>

      </div>
    </section>
  );
};
