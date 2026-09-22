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
    <section id="offer-section" className="py-8 sm:py-14 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        <div className="relative rounded-3xl bg-white border-2 border-blue-950/15 p-4 sm:p-8 shadow-lg overflow-hidden">
          
          {/* Subtle brand glow behind card */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />

          {/* Top Badge */}
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0a192f] font-extrabold text-[11px] sm:text-xs tracking-wider uppercase shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              FACTORY-DIRECT SPECIAL OFFER
            </span>
          </div>

          <div className="text-center mb-5">
            <h2 className="text-xl sm:text-3xl font-extrabold text-[#0a192f] tracking-tight mb-1">
              COMPLETE SMART PIANO SINK WORKSTATION (75×45CM)
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-lg mx-auto">
              Everything in one box: piano console, waterfall spout, pull-out sprayer, wood cutting board, colander, and all plumbing fittings.
            </p>
          </div>

          {/* Pricing Box with High Contrast Hierarchy */}
          <div className="bg-slate-50 rounded-xl p-4 sm:p-6 border border-slate-200 text-center mb-5 relative">
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="text-slate-400 text-xs uppercase font-semibold">Regular:</span>
              <span className="text-base sm:text-lg font-bold text-slate-400 line-through">
                {formatNaira(config.normalPrice)}
              </span>
              {savings > 0 && (
                <span className="bg-blue-600 text-white font-extrabold text-[11px] sm:text-xs px-2.5 py-0.5 rounded-full shadow-xs">
                  SAVE {formatNaira(savings)}
                </span>
              )}
            </div>

            <div className="flex flex-col items-center justify-center gap-0.5 mb-3">
              <span className="text-blue-800 font-extrabold text-[10px] sm:text-xs tracking-widest uppercase bg-blue-100 px-2.5 py-0.5 rounded-full border border-blue-200">
                TODAY'S PROMO PRICE
              </span>
              <span className="text-3xl sm:text-5xl font-black text-[#0a192f] tracking-tight font-display mt-1">
                {formatNaira(config.promoPrice)}
              </span>
            </div>

            {/* Reassurance Banner */}
            <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-center gap-2.5 text-[11px] font-semibold text-slate-700">
              <span className="flex items-center gap-1 text-[#0a192f]">
                <Sparkles className="w-3 h-3 text-blue-600" />
                Factory Direct Discount
              </span>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <span className="flex items-center gap-1 text-slate-700">
                <Truck className="w-3 h-3 text-blue-600" />
                Free Nationwide Delivery
              </span>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <span className="flex items-center gap-1 text-blue-700 font-bold">
                <ShieldCheck className="w-3 h-3 text-blue-600" />
                Payment on Delivery Available
              </span>
            </div>
          </div>

          {/* Offer Value Checkpoints */}
          <div className="grid grid-cols-2 gap-2 mb-6 text-xs text-slate-700">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span className="truncate">Digital °C &amp; Auto LED Light</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span className="truncate">Complete Piano Console Faucet</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span className="truncate">Cutting Board &amp; Prep Trays</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span className="truncate">SUS304 Nano Stainless Steel</span>
            </div>
          </div>

          {/* Value Confirmation */}
          <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-700">
            <span className="flex items-center gap-1.5 font-semibold">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              Inspection on Delivery
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1.5 font-semibold">
              <Truck className="w-4 h-4 text-blue-600" />
              Free Nationwide Dispatch
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1.5 font-semibold text-blue-700">
              <Sparkles className="w-4 h-4 text-blue-600" />
              Complete 9-Piece Accessory Set
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
