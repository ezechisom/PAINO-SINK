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
    <section id="urgency-section" className="py-8 sm:py-14 bg-gradient-to-b from-[#0d121a] via-[#121926] to-[#0d121a] border-y border-amber-500/20 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-extrabold tracking-wider uppercase mb-3">
          <Flame className="w-3.5 h-3.5 text-amber-400" />
          <span>Special Promotional Pricing</span>
        </div>

        <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-2">
          YOUR KITCHEN UPGRADE CAN START TODAY
        </h2>

        <p className="text-slate-300 text-xs sm:text-sm max-w-lg mx-auto mb-6">
          Lock in this special promotional rate today. Includes the complete sink workstation and full accessories kit.
        </p>

        {/* Pricing card in urgency */}
        <div className="bg-black/60 border border-slate-700/80 rounded-xl sm:rounded-2xl p-4 sm:p-6 max-w-lg mx-auto mb-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-2.5 text-xs">
            <span className="text-slate-400 uppercase font-semibold">Regular Value:</span>
            <span className="text-slate-500 line-through font-bold">{formatNaira(config.normalPrice)}</span>
          </div>

          <div className="flex items-baseline justify-between border-b border-slate-800 pb-2.5 mb-2.5">
            <span className="text-amber-400 uppercase font-bold text-xs">Promo Price:</span>
            <span className="text-2xl sm:text-4xl font-black text-white font-display">
              {formatNaira(config.promoPrice)}
            </span>
          </div>

          {savings > 0 && (
            <div className="flex items-center justify-between text-xs text-blue-400 font-bold mb-4">
              <span>Instant Savings:</span>
              <span className="text-blue-300 bg-blue-500/20 px-2.5 py-0.5 rounded-full border border-blue-400/30">
                Save {formatNaira(savings)}
              </span>
            </div>
          )}

          {/* Availability & Delivery Status Block */}
          <div className="bg-slate-900/90 rounded-lg p-3 border border-slate-800 flex flex-col sm:flex-row items-center justify-around gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
              <span className="font-semibold text-blue-400">Stock Available in Warehouse</span>
            </div>
            <span className="hidden sm:inline text-slate-700">|</span>
            <div className="text-slate-300 flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-amber-400" />
              <span>Fast Nationwide Dispatch</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-1.5 mt-4 text-[11px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
          <span>Pay On Delivery Available in Lagos &amp; Abuja &bull; 100% Genuine Quality</span>
        </div>

      </div>
    </section>
  );
};
