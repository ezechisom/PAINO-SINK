import React from 'react';
import { SiteConfig } from '../types';
import { formatNaira } from '../config';
import { ArrowRight, ShieldCheck, Flame, CheckCircle2, Truck } from 'lucide-react';

interface UrgencySectionProps {
  config: SiteConfig;
  onOrderClick: () => void;
}

export const UrgencySection: React.FC<UrgencySectionProps> = ({ config, onOrderClick }) => {
  const savings = config.normalPrice - config.promoPrice;

  return (
    <section id="urgency-section" className="py-16 md:py-20 bg-gradient-to-b from-[#0d121a] via-[#121926] to-[#0d121a] border-y border-amber-500/20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-extrabold tracking-wider uppercase mb-6">
          <Flame className="w-4 h-4 text-amber-400" />
          <span>Special Promotional Pricing</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
          YOUR KITCHEN UPGRADE CAN START TODAY
        </h2>

        <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8 font-light">
          Lock in this special promotional price today. Includes the complete sink workstation and full accessories kit.
        </p>

        {/* Pricing card in urgency */}
        <div className="bg-black/60 border border-slate-700/80 rounded-2xl p-6 sm:p-8 max-w-xl mx-auto mb-8 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4 text-xs sm:text-sm">
            <span className="text-slate-400 uppercase font-semibold">Regular Value:</span>
            <span className="text-slate-500 line-through font-bold">{formatNaira(config.normalPrice)}</span>
          </div>

          <div className="flex items-baseline justify-between border-b border-slate-800 pb-4 mb-4">
            <span className="text-amber-400 uppercase font-bold text-xs sm:text-sm">Promo Price:</span>
            <span className="text-3xl sm:text-4xl font-black text-white font-display">
              {formatNaira(config.promoPrice)}
            </span>
          </div>

          {savings > 0 && (
            <div className="flex items-center justify-between text-xs sm:text-sm text-emerald-400 font-bold mb-6">
              <span>Instant Savings:</span>
              <span className="bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30">
                Save {formatNaira(savings)}
              </span>
            </div>
          )}

          {/* Availability & Delivery Status Block */}
          <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800 flex flex-col sm:flex-row items-center justify-around gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-semibold text-emerald-400">Stock Available in Warehouse</span>
            </div>
            <span className="hidden sm:inline text-slate-700">|</span>
            <div className="text-slate-300 flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-amber-400" />
              <span>Fast Nationwide Dispatch within 24 Hours</span>
            </div>
          </div>
        </div>

        <button
          onClick={onOrderClick}
          id="urgency-order-btn"
          className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-black font-black text-base sm:text-lg py-4.5 px-8 rounded-xl shadow-xl shadow-amber-500/25 hover:shadow-amber-500/35 transform active:scale-[0.98] transition-all cursor-pointer uppercase tracking-wider"
        >
          <span>ORDER MY SMART PIANO SINK</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-center gap-2 mt-4 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Pay On Delivery Available in Lagos &amp; Abuja &bull; 100% Genuine Quality</span>
        </div>

      </div>
    </section>
  );
};
