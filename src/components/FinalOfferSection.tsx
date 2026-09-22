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
    <section id="final-offer-section" className="py-8 sm:py-16 bg-gradient-to-b from-[#0b0f14] via-[#101824] to-[#0b0f14] border-t border-slate-800 relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative text-center">
        
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-[11px] font-bold uppercase tracking-widest mb-2.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Special Offer</span>
        </div>

        <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight mb-2.5">
          READY TO GIVE YOUR KITCHEN A MODERN UPGRADE?
        </h2>

        <p className="text-slate-300 text-xs sm:text-sm max-w-lg mx-auto mb-6">
          Order now to secure your complete Smart Kitchen Piano Sink with LED temperature display, waterfall stream, and nested prep workstation accessories.
        </p>

        {/* Promo Price Card */}
        <div className="bg-slate-950/85 border border-amber-500/30 rounded-2xl p-4 sm:p-6 max-w-md mx-auto mb-6 shadow-xl">
          <div className="flex flex-col items-center justify-center mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Exclusive Promo Price
            </span>
            <div className="text-3xl sm:text-4xl font-black text-white font-display text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-white to-amber-400 mt-0.5">
              {formatNaira(config.promoPrice)}
            </div>
            {savings > 0 && (
              <span className="text-[11px] font-bold text-blue-300 bg-blue-500/20 px-2.5 py-0.5 rounded-full border border-blue-400/30 mt-1.5">
                Save {formatNaira(savings)} off regular price
              </span>
            )}
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-center gap-2 text-xs font-semibold text-slate-300">
            <Truck className="w-3.5 h-3.5 text-amber-400" />
            <span>Complete Full Workstation Set &bull; Free Nationwide Dispatch</span>
          </div>
        </div>

        {/* Value Highlights */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-lg mx-auto mb-6 text-xs text-slate-300">
          <span className="flex items-center gap-1 bg-slate-900/80 px-2.5 py-1 rounded-full border border-slate-800 text-[11px]">
            <Thermometer className="w-3 h-3 text-amber-400" />
            LED Temp Display
          </span>
          <span className="flex items-center gap-1 bg-slate-900/80 px-2.5 py-1 rounded-full border border-slate-800 text-[11px]">
            <Zap className="w-3 h-3 text-blue-400" />
            Water-Flow Ambient Light
          </span>
          <span className="flex items-center gap-1 bg-slate-900/80 px-2.5 py-1 rounded-full border border-slate-800 text-[11px]">
            <CheckCircle2 className="w-3 h-3 text-blue-400" />
            100% Hydroelectric Powered
          </span>
        </div>

        {/* Seamless Transition to Order Form Below */}
        <div className="max-w-md mx-auto mb-4 py-3 px-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-center justify-center gap-2">
          <span>👇 Complete Your Dispatch Details Below (Payment on Delivery)</span>
        </div>

        <div className="flex items-center justify-center gap-3 text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-blue-400" />
            Nationwide Delivery
          </span>
          <span>&bull;</span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-blue-400" />
            Secure Packaging
          </span>
          <span>&bull;</span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-blue-400" />
            1-Year Warranty
          </span>
        </div>

      </div>
    </section>
  );
};
