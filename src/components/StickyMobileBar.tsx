import React, { useState, useEffect } from 'react';
import { SiteConfig } from '../types';
import { formatNaira } from '../config';
import { ArrowRight, ShoppingCart } from 'lucide-react';

interface StickyMobileBarProps {
  config: SiteConfig;
  onOrderClick: () => void;
}

export const StickyMobileBar: React.FC<StickyMobileBarProps> = ({ config, onOrderClick }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // If the order section is visible in screen, hide the sticky bar
          if (entry.isIntersecting) {
            setIsVisible(false);
          } else {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const target = document.getElementById('order-section');
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) observer.unobserve(target);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      id="sticky-mobile-cta"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#0a192f]/95 backdrop-blur-md border-t border-blue-500/30 p-3 shadow-2xl transition-transform duration-300 animate-in slide-in-from-bottom"
    >
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="flex flex-col">
          <span className="text-[11px] text-slate-300 font-semibold uppercase tracking-wider truncate max-w-[170px]">
            {config.productName}
          </span>
          <span className="text-base font-extrabold text-blue-400 font-display">
            {formatNaira(config.promoPrice)}
          </span>
        </div>

        <button
          onClick={onOrderClick}
          id="sticky-order-btn"
          className="flex-1 inline-flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs sm:text-sm py-3 px-3 rounded-xl shadow-xl shadow-blue-600/30 active:scale-95 transition-transform uppercase tracking-wider cursor-pointer whitespace-nowrap animate-action-blink"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>ORDER NOW &bull; PAY ON DELIVERY</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
