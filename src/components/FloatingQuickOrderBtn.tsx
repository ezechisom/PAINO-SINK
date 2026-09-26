import React from 'react';
import { Zap, ShoppingBag } from 'lucide-react';

interface FloatingQuickOrderBtnProps {
  onClick: () => void;
}

export const FloatingQuickOrderBtn: React.FC<FloatingQuickOrderBtnProps> = ({ onClick }) => {
  return (
    <div className="fixed bottom-20 sm:bottom-24 left-4 z-40">
      <button
        type="button"
        onClick={onClick}
        id="floating-quick-order-pill"
        className="group flex items-center gap-2 bg-[#0a192f] hover:bg-blue-900 text-white pl-3 pr-4 py-2.5 rounded-full shadow-2xl border-2 border-amber-400/80 hover:border-amber-300 transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
        title="Open Quick Order Form Pop Up"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-400" />
        </span>
        <div className="flex items-center gap-1.5">
          <Zap className="w-4 h-4 text-amber-400 fill-amber-400 group-hover:rotate-12 transition-transform" />
          <span className="text-xs sm:text-sm font-black tracking-wide uppercase">
            Quick Order Form
          </span>
        </div>
        <span className="hidden sm:inline-block bg-amber-400 text-slate-950 text-[10px] font-extrabold px-1.5 py-0.5 rounded-full">
          Pop-up
        </span>
      </button>
    </div>
  );
};
