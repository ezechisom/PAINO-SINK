import React from 'react';
import { Flame, Truck, Sparkles } from 'lucide-react';
import { formatNaira } from '../config';

interface PromoTopBarProps {
  countdownEndDate?: string;
  promoPrice?: number;
}

export const PromoTopBar: React.FC<PromoTopBarProps> = ({ promoPrice = 140000 }) => {
  return (
    <div id="promo-top-bar" className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-black py-2 px-4 shadow-md sticky top-0 z-50 transition-all duration-200">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center justify-center gap-2 font-black tracking-wide text-xs sm:text-sm uppercase">
          <Flame className="w-4 h-4 fill-black text-black shrink-0 animate-bounce" />
          <span>SPECIAL PROMO PRICE: {formatNaira(promoPrice)} — COMPLETE WORKSTATION SET</span>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs font-bold">
          <span className="bg-black/90 text-amber-300 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase flex items-center gap-1.5 shadow-inner">
            <Truck className="w-3.5 h-3.5 text-amber-400" />
            FREE NATIONWIDE DELIVERY &amp; PAYMENT ON DELIVERY
          </span>
        </div>
      </div>
    </div>
  );
};
