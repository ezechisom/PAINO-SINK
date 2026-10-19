import React, { useState, useEffect } from 'react';
import { ALTERNATIVE_PRODUCTS, AlternativeProduct } from '../data/alternativeProducts';
import { formatNaira } from '../config';
import { Zap, Eye, PlusCircle, ChevronDown, ChevronUp, Sparkles, X, Camera, ArrowRight } from 'lucide-react';

interface FloatingSuggestedProductProps {
  onViewSpecs: (product: AlternativeProduct) => void;
  onAddToForm: (product: AlternativeProduct) => void;
  onQuickOrder: (product: AlternativeProduct) => void;
  hasPlacedOrder?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

export const FloatingSuggestedProduct: React.FC<FloatingSuggestedProductProps> = ({
  onViewSpecs,
  onAddToForm,
  onQuickOrder,
  hasPlacedOrder = false,
  isOpen = true,
  onClose
}) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasScrolledPastHero, setHasScrolledPastHero] = useState(false);

  const product = ALTERNATIVE_PRODUCTS[0]; // Smart Kitchen Piano Sink

  // Scroll detection as secondary trigger
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 280) {
        setHasScrolledPastHero(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // When isOpen changes from false to true (45-second timer trigger), un-minimize and display
  useEffect(() => {
    if (isOpen) {
      setIsMinimized(false);
    }
  }, [isOpen]);

  // Visible if triggered by the 45-second timer OR scrolled past hero (when not dismissed)
  const isVisible = (isOpen || hasScrolledPastHero) && !hasPlacedOrder;

  if (!product || !isVisible) {
    return null;
  }

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClose) {
      onClose();
    } else {
      setIsMinimized(true);
    }
  };

  // Minimized Compact Pill Mode
  if (isMinimized) {
    return (
      <div className="fixed bottom-20 sm:bottom-6 right-3 sm:right-6 z-40 animate-fadeIn">
        <button
          type="button"
          onClick={() => setIsMinimized(false)}
          className="group flex items-center gap-2 bg-[#070e1c]/95 hover:bg-[#0a192f] text-white pl-2.5 pr-3 py-2 rounded-2xl border-2 border-blue-400 shadow-2xl backdrop-blur-md transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
          title="Click to view Suggested Piano Sink & Photos"
        >
          <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-blue-400/50 bg-black/60 shrink-0">
            <img 
              src={product.images[0]} 
              alt={product.name} 
              className="w-full h-full object-cover" 
            />
            <span className="absolute bottom-0 right-0 bg-black/80 text-[8px] font-bold text-amber-300 px-1 rounded-tl">
              +4
            </span>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[10px] text-blue-300 font-black uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-blue-400 animate-pulse" />
              Suggested Sink (5 Photos)
            </span>
            <span className="text-xs font-black font-mono text-white">
              {formatNaira(product.price)}
            </span>
          </div>
          <ChevronUp className="w-4 h-4 text-blue-300 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    );
  }

  // Expanded Floating Card Mode (Pops up every 45s)
  return (
    <aside
      aria-label="Suggested Companion Product Popup"
      className="fixed bottom-20 sm:bottom-6 right-3 sm:right-6 z-40 max-w-[340px] sm:max-w-sm w-full bg-[#070e1c]/95 backdrop-blur-md text-white border-2 border-amber-400/90 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.7)] p-3 sm:p-4 animate-slide-up transition-all"
    >
      {/* Top Banner Tag */}
      <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-white/10">
        <div className="flex items-center gap-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
          <Sparkles className="w-3 h-3 text-amber-400 animate-pulse shrink-0" />
          <span>SUGGESTED COMPANION SINK</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setIsMinimized(true)}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            title="Minimize"
            aria-label="Minimize suggested product widget"
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleDismiss}
            className="p-1 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            title="Close popup (will re-appear in 45s)"
            aria-label="Close suggested product popup"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Clickable Product Card Body - Clicking opens full photos & details modal */}
      <div 
        onClick={() => onViewSpecs(product)}
        className="group cursor-pointer rounded-xl p-1.5 hover:bg-white/5 transition-colors border border-transparent hover:border-blue-500/30 mb-2"
        title="Click to view all 5 pictures & full details"
      >
        <div className="flex items-center gap-3">
          {/* Thumbnail with Photo Counter badge */}
          <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-black/60 border border-blue-400/60 shrink-0 group-hover:scale-105 transition-transform duration-200 shadow-md">
            <img 
              src={product.images[0]} 
              alt={product.name} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors" />
            <div className="absolute bottom-0 inset-x-0 bg-black/85 text-[8px] font-bold text-blue-300 text-center py-0.5 flex items-center justify-center gap-1">
              <Camera className="w-2.5 h-2.5 text-blue-400" />
              <span>5 Photos</span>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1 text-[10px] text-amber-300 font-extrabold mb-0.5">
              <span>👉 CLICK TO VIEW DETAILS</span>
            </div>

            <h4 className="text-xs sm:text-sm font-extrabold text-white group-hover:text-blue-300 leading-snug line-clamp-1 transition-colors">
              {product.name}
            </h4>

            <p className="text-[10px] text-slate-300 line-clamp-1 mt-0.5">
              Waterfall Spout &bull; LED Temp &bull; Workstation
            </p>

            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-sm sm:text-base font-black font-mono text-amber-400">
                {formatNaira(product.price)}
              </span>
              <span className="text-[10px] text-slate-400 line-through">
                {formatNaira(product.normalPrice)}
              </span>
              <span className="text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.2 rounded font-extrabold">
                Save ₦5k Bundle
              </span>
            </div>
          </div>
        </div>

        {/* Click hint strip */}
        <div className="mt-2 py-1 px-2 rounded-lg bg-blue-500/15 border border-blue-400/30 flex items-center justify-between text-[10px] text-blue-300 font-bold group-hover:bg-blue-500/25 transition-colors">
          <span className="flex items-center gap-1">
            <Camera className="w-3 h-3 text-blue-400" />
            <span>Click to see other pictures &amp; full specs</span>
          </span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>

      {/* Action Buttons: 📸 View Pictures & Details + ⚡ Quick Order + Add to Form */}
      <div className="grid grid-cols-3 gap-1.5 pt-1 border-t border-white/10">
        <button
          type="button"
          onClick={() => onViewSpecs(product)}
          className="inline-flex items-center justify-center gap-1 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-[11px] py-2 px-1.5 rounded-xl shadow-md active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          title="View all 5 pictures & detailed specifications"
        >
          <Camera className="w-3 h-3 text-blue-200 shrink-0" />
          <span>Pictures</span>
        </button>

        <button
          type="button"
          onClick={() => onQuickOrder(product)}
          className="inline-flex items-center justify-center gap-1 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 text-slate-950 font-black text-[11px] py-2 px-1.5 rounded-xl shadow-md active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          title="Open Quick Order Pop Up for Sink"
        >
          <Zap className="w-3 h-3 fill-slate-950 shrink-0" />
          <span>Quick Order</span>
        </button>

        <button
          type="button"
          onClick={() => onAddToForm(product)}
          className="inline-flex items-center justify-center gap-1 bg-white/10 hover:bg-white/20 text-white font-bold text-[11px] py-2 px-1.5 rounded-xl border border-white/20 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          title="Add sink to main order checkout form"
        >
          <PlusCircle className="w-3 h-3 text-blue-200 shrink-0" />
          <span>+ Add</span>
        </button>
      </div>
    </aside>
  );
};
