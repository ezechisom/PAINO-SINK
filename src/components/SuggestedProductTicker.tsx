import React from 'react';
import { ALTERNATIVE_PRODUCTS, AlternativeProduct } from '../data/alternativeProducts';
import { formatNaira } from '../config';
import { Flame, Zap, ArrowRight, Sparkles, ChevronRight, Eye, PlusCircle } from 'lucide-react';

interface SuggestedProductTickerProps {
  onViewSpecs: (product: AlternativeProduct) => void;
  onAddToForm: (product: AlternativeProduct) => void;
  onQuickOrder?: (product: AlternativeProduct) => void;
}

export const SuggestedProductTicker: React.FC<SuggestedProductTickerProps> = ({
  onViewSpecs,
  onAddToForm,
  onQuickOrder,
}) => {
  const cooker2b = ALTERNATIVE_PRODUCTS.find(p => p.id === 'cooker-2burner') || ALTERNATIVE_PRODUCTS[0];
  const cooker5b = ALTERNATIVE_PRODUCTS.find(p => p.id === 'cooker-5burner') || ALTERNATIVE_PRODUCTS[1];

  const handleTickerClick = (product: AlternativeProduct) => {
    onViewSpecs(product);
  };

  const handleAddClick = (e: React.MouseEvent, product: AlternativeProduct) => {
    e.stopPropagation();
    onAddToForm(product);
  };

  const handleQuickOrderClick = (e: React.MouseEvent, product: AlternativeProduct) => {
    e.stopPropagation();
    if (onQuickOrder) {
      onQuickOrder(product);
    } else {
      onAddToForm(product);
    }
  };

  // Repeated items array for smooth, gapless infinite marquee
  const tickerItems = [
    {
      product: cooker2b,
      icon: Flame,
      badge: "MOST POPULAR COMPANION",
      badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      title: "2-Flip-Up Double Gas Burner With Timer (75×45cm)",
      highlight: "90° Flip-Up Burners for 1-Wipe Cleaning & Auto-Off Safety Timer",
      price: formatNaira(cooker2b.price),
    },
    {
      product: cooker5b,
      icon: Zap,
      badge: "EXECUTIVE DUAL-FUEL HYBRID",
      badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
      title: "Executive 5-Burner Built-In Gas + Electric Cooktop (90×51cm)",
      highlight: "4 Gas Burners + 1 Central 2000W Radiant Electric Zone (Never Get Stranded)",
      price: formatNaira(cooker5b.price),
    },
    {
      product: cooker2b,
      icon: Sparkles,
      badge: "PERFECT COUNTERTOP MATCH",
      badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      title: "Designed to Pair With Your Smart Piano Sink",
      highlight: "Save ₦5,000 Multi-Product Bundle Discount • Pay On Delivery Nationwide",
      price: "Bundle Available",
    },
  ];

  return (
    <div 
      className="relative z-30 bg-[#070e1c] text-white border-b border-blue-900/60 shadow-md overflow-hidden select-none"
      role="region"
      aria-label="Suggested Companion Appliances Marquee"
    >
      {/* Subtle glowing accent gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/80 via-slate-900/90 to-blue-950/80 pointer-events-none" />

      {/* Floating Sticky Indicator on Left (Desktop & Mobile) */}
      <div className="absolute left-0 top-0 bottom-0 z-20 flex items-center px-2.5 sm:px-3.5 bg-gradient-to-r from-[#070e1c] via-[#070e1c] to-transparent pointer-events-none">
        <div className="flex items-center gap-1.5 bg-blue-600/90 backdrop-blur-md text-white text-[10px] sm:text-xs font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm pointer-events-auto shrink-0 border border-blue-400/40">
          <Flame className="w-3 h-3 text-amber-300 animate-pulse shrink-0" />
          <span className="hidden sm:inline">Suggested Appliances</span>
          <span className="sm:hidden">Suggested</span>
        </div>
      </div>

      {/* Right Gradient Fade to Prevent Harsh Cutoff */}
      <div className="absolute right-0 top-0 bottom-0 z-20 w-12 sm:w-20 bg-gradient-to-l from-[#070e1c] to-transparent pointer-events-none" />

      {/* Marquee Track Container */}
      <div className="py-2.5 sm:py-3 pl-28 sm:pl-48 overflow-hidden">
        <div 
          className="animate-marquee-slide flex items-center gap-6 sm:gap-10 cursor-pointer"
          title="Pause and click any suggested appliance to view specs and add to order form"
        >
          {/* Render track twice to produce continuous loop */}
          {[...tickerItems, ...tickerItems].map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={`${item.product.id}-${index}`}
                onClick={() => handleTickerClick(item.product)}
                className="flex items-center gap-2.5 sm:gap-3 shrink-0 py-0.5 px-2 rounded-xl transition-colors hover:bg-white/5 group"
              >
                {/* Badge */}
                <span className={`inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-extrabold px-2 py-0.5 rounded-full border uppercase tracking-wider shrink-0 ${item.badgeColor}`}>
                  <Icon className="w-2.5 h-2.5 shrink-0" />
                  <span>{item.badge}</span>
                </span>

                {/* Title & Highlight */}
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <span className="font-extrabold text-white group-hover:text-blue-300 transition-colors whitespace-nowrap">
                    {item.title}
                  </span>
                  <span className="hidden md:inline text-slate-400 font-normal">
                    — {item.highlight}
                  </span>
                  <span className="font-mono font-bold text-amber-300 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/30 whitespace-nowrap text-xs">
                    {item.price}
                  </span>
                </div>

                {/* Clickable Arrow & Specs Action Pill */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTickerClick(item.product);
                  }}
                  className="inline-flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-extrabold text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 rounded-full shadow-sm border border-blue-400/40 transition-all transform group-hover:scale-105 active:scale-95 shrink-0 cursor-pointer"
                  title="Click to view full specs & dimensions"
                >
                  <Eye className="w-3 h-3 text-blue-200" />
                  <span>Specs</span>
                  <ChevronRight className="w-3.5 h-3.5 text-blue-200 transition-transform group-hover:translate-x-0.5 animate-pulse" />
                </button>

                {/* Direct Add to Form Arrow Button */}
                <button
                  type="button"
                  onClick={(e) => handleAddClick(e, item.product)}
                  className="inline-flex items-center gap-1 bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white font-bold text-[11px] sm:text-xs px-2.5 py-1 rounded-full shadow-sm transition-all transform hover:scale-105 active:scale-95 shrink-0 cursor-pointer"
                  title={`Add ${item.product.name} directly to your order form`}
                >
                  <PlusCircle className="w-3 h-3 text-blue-300" />
                  <span className="hidden sm:inline">Add to Form</span>
                </button>

                {/* 1-Click Quick Order Pop-Up Button */}
                <button
                  type="button"
                  onClick={(e) => handleQuickOrderClick(e, item.product)}
                  className="inline-flex items-center gap-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 rounded-full shadow-sm transition-all transform hover:scale-105 active:scale-95 shrink-0 cursor-pointer"
                  title={`Open Quick Order Pop Up for ${item.product.name}`}
                >
                  <Zap className="w-3 h-3 fill-slate-950" />
                  <span>Quick Order</span>
                  <ArrowRight className="w-3 h-3 text-slate-950 animate-bounce-x" />
                </button>

                {/* Separator Dot */}
                <span className="text-blue-500/40 font-bold px-1 select-none">&bull;</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
