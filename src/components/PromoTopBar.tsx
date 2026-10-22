import React from 'react';
import { Flame, Truck } from 'lucide-react';
import { formatNaira, CONFIG } from '../config';
import { CountdownTimer } from './CountdownTimer';

interface PromoTopBarProps {
  countdownEndDate?: string;
  promoPrice?: number;
}

export const PromoTopBar: React.FC<PromoTopBarProps> = ({ 
  countdownEndDate = CONFIG.countdownEndDate, 
  promoPrice = CONFIG.promoPrice 
}) => {
  return (
    <div id="promo-top-bar" className="bg-[#0a192f] text-white py-2 px-3 sm:px-4 shadow-sm border-b border-blue-900/60 transition-all duration-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-center md:text-left">
        <div className="flex flex-wrap items-center justify-center gap-2 font-bold tracking-wide text-xs sm:text-sm">
          <Flame className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
          <span>
            LIMITED 14-DAY PROMO: <strong className="text-amber-300 font-extrabold">{formatNaira(promoPrice)}</strong> — SMART PAINO SINK WORKSTATION
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs">
          {/* 14 Days Countdown Timer */}
          <CountdownTimer 
            targetDate={countdownEndDate} 
            variant="banner" 
            title="14-DAY TIMER" 
          />

          <span className="hidden lg:inline-flex bg-blue-500/20 text-blue-200 border border-blue-400/40 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide items-center gap-1">
            <Truck className="w-3 h-3 text-blue-300" />
            PAY ON DELIVERY
          </span>
        </div>
      </div>
    </div>
  );
};
