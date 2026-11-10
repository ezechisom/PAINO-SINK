import React, { useState, useEffect } from 'react';
import { Flame, Truck, Music, Volume2 } from 'lucide-react';
import { formatNaira, CONFIG } from '../config';
import { CountdownTimer } from './CountdownTimer';
import { xmasMusic } from '../utils/xmasMusic';

interface PromoTopBarProps {
  countdownEndDate?: string;
  promoPrice?: number;
}

export const PromoTopBar: React.FC<PromoTopBarProps> = ({ 
  countdownEndDate = CONFIG.countdownEndDate, 
  promoPrice = CONFIG.promoPrice 
}) => {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  useEffect(() => {
    const unsub = xmasMusic.subscribe((state) => {
      setIsPlayingMusic(state.isPlaying);
    });
    return unsub;
  }, []);

  return (
    <div id="promo-top-bar" className="relative bg-gradient-to-r from-[#070e1c] via-[#0a192f] to-[#070e1c] text-white py-2 px-3 sm:px-4 shadow-sm border-b border-amber-500/30 transition-all duration-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-center md:text-left">
        <div className="flex flex-wrap items-center justify-center gap-2 font-bold tracking-wide text-xs sm:text-sm">
          <span className="text-sm">🎄</span>
          <span className="flex items-center gap-1.5 flex-wrap justify-center">
            <span className="bg-red-600 text-white font-black px-2 py-0.5 rounded border border-amber-300 shadow-xs uppercase tracking-wider text-[10px] sm:text-xs">
              LIMITED 30-DAY XMAS DISCOUNT
            </span>
            <strong className="text-amber-300 font-black text-sm sm:text-base font-mono">
              {formatNaira(promoPrice)}
            </strong>
            <span className="text-slate-200 font-extrabold">— SMART PAINO SINK WORKSTATION</span>
          </span>
          <span className="text-amber-400 text-xs hidden sm:inline">❄️</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs">
          {/* Gentle Christmas Carol Audio Toggle */}
          <button
            type="button"
            onClick={() => xmasMusic.toggle()}
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide transition-all cursor-pointer shadow-xs active:scale-95 border ${
              isPlayingMusic
                ? 'bg-emerald-500/30 text-emerald-300 border-emerald-400/50 ring-1 ring-emerald-400/40'
                : 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border-amber-400/40'
            }`}
            title={isPlayingMusic ? 'Pause gentle Christmas carol' : 'Play gentle Christmas carol (Silent Night)'}
          >
            <Music className={`w-3 h-3 text-amber-300 ${isPlayingMusic ? 'animate-bounce' : ''}`} />
            <span>{isPlayingMusic ? 'Pause Carol ⏸' : '🎵 Gentle Xmas Carol'}</span>
          </button>

          {/* 30 Days Countdown Timer */}
          <CountdownTimer 
            targetDate={countdownEndDate} 
            variant="banner" 
            title="30-DAY TIMER" 
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
