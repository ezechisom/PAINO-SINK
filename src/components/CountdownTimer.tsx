import React from 'react';
import { useCountdown } from '../hooks/useCountdown';
import { Clock, Flame, AlertCircle } from 'lucide-react';

interface CountdownTimerProps {
  targetDate: string;
  variant?: 'banner' | 'card' | 'compact' | 'hero';
  title?: string;
  className?: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate,
  variant = 'card',
  title = '14-DAY PROMOTIONAL OFFER ENDS IN',
  className = '',
}) => {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(targetDate);

  // Variant: Top bar inline banner
  if (variant === 'banner') {
    return (
      <div className={`inline-flex items-center gap-1.5 font-mono font-bold text-xs ${className}`}>
        <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0 animate-pulse" />
        <span className="text-slate-300 font-sans text-[11px] font-semibold hidden md:inline">
          {title}:
        </span>
        <div className="flex items-center gap-1 text-white bg-slate-900/90 border border-amber-500/30 px-2 py-0.5 rounded-md shadow-xs">
          <span className="text-amber-400">{days}d</span>
          <span className="text-slate-500">:</span>
          <span className="text-amber-400">{hours}h</span>
          <span className="text-slate-500">:</span>
          <span className="text-amber-400">{minutes}m</span>
          <span className="text-slate-500">:</span>
          <span className="text-amber-300 animate-pulse">{seconds}s</span>
        </div>
      </div>
    );
  }

  // Variant: Compact pill (for modals, headers, sticky bar)
  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center gap-2 bg-[#0a192f] text-white px-3 py-1.5 rounded-xl border border-amber-500/30 shadow-sm ${className}`}>
        <Flame className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
        <span className="text-[11px] font-semibold text-slate-300 font-sans">
          {title}:
        </span>
        <div className="flex items-center gap-1 font-mono font-black text-xs text-amber-300">
          <span>{days}d</span>
          <span className="text-slate-600">:</span>
          <span>{hours}h</span>
          <span className="text-slate-600">:</span>
          <span>{minutes}m</span>
          <span className="text-slate-600">:</span>
          <span className="text-white">{seconds}s</span>
        </div>
      </div>
    );
  }

  // Variant: Hero section prominent widget
  if (variant === 'hero') {
    return (
      <div className={`w-full bg-gradient-to-r from-[#0a192f] via-[#0f2342] to-[#0a192f] border border-amber-500/40 rounded-2xl p-3 sm:p-4 text-white shadow-lg ${className}`}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 pb-2.5 border-b border-blue-900/60">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Clock className="w-4 h-4 animate-spin-slow" />
            </span>
            <div>
              <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-amber-300 block">
                {title}
              </span>
              <span className="text-[10px] text-slate-300 font-medium">
                Guaranteed Promo Rate &bull; Free Lagos Delivery
              </span>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase bg-red-500/20 text-red-300 border border-red-500/30 px-2 py-0.5 rounded-full animate-pulse">
            <AlertCircle className="w-3 h-3" />
            Limited Units Available
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2 pt-2.5 max-w-sm mx-auto sm:max-w-none text-center">
          <div className="bg-slate-950/80 border border-slate-700/80 rounded-xl p-1.5 sm:p-2 shadow-inner">
            <span className="font-mono text-xl sm:text-2xl font-black text-amber-400 block tracking-tight">
              {days}
            </span>
            <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
              Days
            </span>
          </div>
          <div className="bg-slate-950/80 border border-slate-700/80 rounded-xl p-1.5 sm:p-2 shadow-inner">
            <span className="font-mono text-xl sm:text-2xl font-black text-white block tracking-tight">
              {hours}
            </span>
            <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
              Hours
            </span>
          </div>
          <div className="bg-slate-950/80 border border-slate-700/80 rounded-xl p-1.5 sm:p-2 shadow-inner">
            <span className="font-mono text-xl sm:text-2xl font-black text-white block tracking-tight">
              {minutes}
            </span>
            <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
              Mins
            </span>
          </div>
          <div className="bg-slate-950/80 border border-slate-700/80 rounded-xl p-1.5 sm:p-2 shadow-inner">
            <span className="font-mono text-xl sm:text-2xl font-black text-amber-400 block tracking-tight animate-pulse">
              {seconds}
            </span>
            <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
              Secs
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Variant: Standard Card (used in PriceOfferCard, UrgencySection, FinalOfferSection)
  return (
    <div className={`w-full max-w-md mx-auto bg-[#0a192f] border border-amber-500/40 rounded-2xl p-4 text-white shadow-xl ${className}`}>
      <div className="flex items-center justify-center gap-2 mb-3">
        <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
        <span className="text-xs font-black uppercase tracking-wider text-amber-300 font-display">
          {title}
        </span>
        <Clock className="w-4 h-4 text-amber-400" />
      </div>

      <div className="grid grid-cols-4 gap-2 text-center font-mono">
        {/* Days */}
        <div className="bg-black/60 border border-amber-500/30 rounded-xl p-2 shadow-inner flex flex-col items-center">
          <span className="text-2xl sm:text-3xl font-black text-amber-400 tracking-tight leading-none">
            {days}
          </span>
          <span className="text-[9px] font-sans font-bold text-slate-400 uppercase tracking-wider mt-1">
            Days
          </span>
        </div>

        {/* Hours */}
        <div className="bg-black/60 border border-slate-700/60 rounded-xl p-2 shadow-inner flex flex-col items-center">
          <span className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-none">
            {hours}
          </span>
          <span className="text-[9px] font-sans font-bold text-slate-400 uppercase tracking-wider mt-1">
            Hours
          </span>
        </div>

        {/* Minutes */}
        <div className="bg-black/60 border border-slate-700/60 rounded-xl p-2 shadow-inner flex flex-col items-center">
          <span className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-none">
            {minutes}
          </span>
          <span className="text-[9px] font-sans font-bold text-slate-400 uppercase tracking-wider mt-1">
            Minutes
          </span>
        </div>

        {/* Seconds */}
        <div className="bg-black/60 border border-amber-500/30 rounded-xl p-2 shadow-inner flex flex-col items-center">
          <span className="text-2xl sm:text-3xl font-black text-amber-300 tracking-tight leading-none animate-pulse">
            {seconds}
          </span>
          <span className="text-[9px] font-sans font-bold text-slate-400 uppercase tracking-wider mt-1">
            Seconds
          </span>
        </div>
      </div>

      <div className="mt-3 pt-2.5 border-t border-slate-800 text-center">
        <span className="text-[11px] text-slate-300 font-medium flex items-center justify-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>Special 14-Day Discount Rate Active &bull; Pay on Delivery</span>
        </span>
      </div>
    </div>
  );
};
