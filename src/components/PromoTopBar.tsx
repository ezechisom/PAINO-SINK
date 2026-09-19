import React from 'react';
import { Flame, Truck } from 'lucide-react';
import { formatNaira } from '../config';

interface PromoTopBarProps {
  countdownEndDate?: string;
  promoPrice?: number;
}

export const PromoTopBar: React.FC<PromoTopBarProps> = ({ promoPrice = 260000 }) => {
  return (
    <div id="promo-top-bar" className="bg-[#0a192f] text-white py-2 px-4 shadow-sm border-b border-blue-900/60 sticky top-0 z-50 transition-all duration-200">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center justify-center gap-2 font-bold tracking-wide text-xs sm:text-sm">
          <Flame className="w-4 h-4 text-blue-400 shrink-0 animate-pulse" />
          <span>
            LIMITED PROMO: <strong className="text-blue-300 font-extrabold">{formatNaira(promoPrice)}</strong> — COMPLETE MULTIFUNCTIONAL WORKSTATION SET
          </span>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs font-semibold">
          <span className="bg-blue-500/20 text-blue-200 border border-blue-400/40 px-3 py-0.5 rounded-full text-xs font-bold tracking-wide flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-blue-300" />
            FREE NATIONWIDE DELIVERY &bull; PAYMENT ON DELIVERY
          </span>
        </div>
      </div>
    </div>
  );
};
