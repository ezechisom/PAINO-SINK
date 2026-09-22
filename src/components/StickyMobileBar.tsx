import React from 'react';
import { SiteConfig } from '../types';
import { formatNaira } from '../config';
import { ArrowRight, ShoppingCart, ShieldCheck } from 'lucide-react';

interface StickyMobileBarProps {
  config: SiteConfig;
  onOrderClick: () => void;
}

export const StickyMobileBar: React.FC<StickyMobileBarProps> = ({ config, onOrderClick }) => {
  return (
    <aside 
      id="floating-bottom-cta"
      aria-label="Floating Order Action"
      className="fixed bottom-2.5 sm:bottom-4 inset-x-3 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 z-40 sm:max-w-xl sm:w-full bg-[#0a192f]/95 backdrop-blur-md border border-blue-500/40 p-2.5 sm:px-5 sm:py-3 rounded-2xl shadow-2xl shadow-black/60 transition-transform duration-300"
    >
      <div className="flex items-center justify-between gap-3 sm:gap-4">
        {/* Left: Product & Price */}
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] sm:text-xs text-slate-200 font-bold uppercase tracking-wider truncate">
              {config.productName}
            </span>
            <span className="hidden sm:inline-block text-[10px] text-blue-300 font-mono bg-blue-500/20 px-1.5 py-0.5 rounded border border-blue-400/30">
              75 × 45 cm
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base sm:text-lg font-black text-white font-display">
              {formatNaira(config.promoPrice)}
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              Pay On Delivery
            </span>
          </div>
        </div>

        {/* Right: The Persistent ORDER NOW Button */}
        <button
          onClick={onOrderClick}
          id="floating-order-btn"
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 hover:from-blue-500 hover:to-blue-400 text-white font-extrabold text-xs sm:text-sm py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl shadow-lg shadow-blue-600/30 active:scale-95 transition-transform uppercase tracking-wider cursor-pointer whitespace-nowrap animate-action-blink shrink-0"
        >
          <ShoppingCart className="w-4 h-4 shrink-0" />
          <span>ORDER NOW</span>
          <ArrowRight className="w-3.5 h-3.5 shrink-0" />
        </button>
      </div>
    </aside>
  );
};
