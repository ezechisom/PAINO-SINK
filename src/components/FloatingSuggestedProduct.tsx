import React, { useState, useEffect } from 'react';
import { ALTERNATIVE_PRODUCTS, AlternativeProduct } from '../data/alternativeProducts';
import { formatNaira } from '../config';
import { Flame, Zap, Eye, PlusCircle, ChevronDown, ChevronUp, Sparkles, X } from 'lucide-react';

interface FloatingSuggestedProductProps {
  onViewSpecs: (product: AlternativeProduct) => void;
  onAddToForm: (product: AlternativeProduct) => void;
  onQuickOrder: (product: AlternativeProduct) => void;
  hasPlacedOrder?: boolean;
}

export const FloatingSuggestedProduct: React.FC<FloatingSuggestedProductProps> = ({
  onViewSpecs,
  onAddToForm,
  onQuickOrder,
  hasPlacedOrder
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const product = ALTERNATIVE_PRODUCTS[0]; // 2-Burner Double Gas Burner with Timer

  useEffect(() => {
    const handleScroll = () => {
      // Show once user has scrolled down past the hero section (~280px)
      if (window.scrollY > 280) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!product || !isVisible || isDismissed || hasPlacedOrder) {
    return null;
  }

  // Minimized Compact Pill Mode
  if (isMinimized) {
    return (
      <div className="fixed bottom-20 sm:bottom-6 right-3 sm:right-6 z-40 animate-fade-in">
        <button
          type="button"
          onClick={() => setIsMinimized(false)}
          className="group flex items-center gap-2 bg-[#070e1c]/95 hover:bg-[#0a192f] text-white pl-2.5 pr-3 py-2 rounded-2xl border-2 border-amber-400 shadow-2xl backdrop-blur-md transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
          title="Show suggested companion 2-burner cooker"
        >
          <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-amber-400/50 bg-black/60 shrink-0">
            <img 
              src={product.images[0]} 
              alt={product.name} 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[10px] text-amber-300 font-black uppercase tracking-wider flex items-center gap-1">
              <Flame className="w-3 h-3 text-amber-400 animate-pulse" />
              Suggested Cooker
            </span>
            <span className="text-xs font-black font-mono text-white">
              {formatNaira(product.price)}
            </span>
          </div>
          <ChevronUp className="w-4 h-4 text-amber-300 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    );
  }

  // Expanded Floating Card Mode
  return (
    <aside
      aria-label="Suggested Companion Product Floating Bar"
      className="fixed bottom-20 sm:bottom-6 right-3 sm:right-6 z-40 max-w-[340px] sm:max-w-sm w-full bg-[#070e1c]/95 backdrop-blur-md text-white border-2 border-amber-400/80 rounded-2xl shadow-2xl p-3 sm:p-3.5 animate-slide-up transition-all"
    >
      {/* Top Banner Tag */}
      <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-white/10">
        <div className="flex items-center gap-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
          <Flame className="w-3 h-3 text-amber-400 animate-pulse shrink-0" />
          <span>SUGGESTED MATCHING COOKER</span>
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
            onClick={() => setIsDismissed(true)}
            className="p-1 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            title="Dismiss"
            aria-label="Dismiss suggested product widget"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Product Image & Info */}
      <div className="flex items-center gap-3 mb-2.5">
        <div 
          onClick={() => onViewSpecs(product)}
          className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-xl overflow-hidden bg-black/60 border border-slate-700 shrink-0 cursor-pointer group"
          title="Click to view full specs"
        >
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
          />
          <div className="absolute bottom-0 inset-x-0 bg-black/80 text-[8px] font-bold text-amber-300 text-center py-0.5">
            75×45cm
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h4 
            onClick={() => onViewSpecs(product)}
            className="text-xs sm:text-sm font-extrabold text-white hover:text-amber-300 leading-snug line-clamp-1 cursor-pointer transition-colors"
          >
            {product.name}
          </h4>
          <p className="text-[10px] text-slate-300 line-clamp-1 mt-0.5">
            90° Flip-Up Burners &bull; Auto-Off Timer
          </p>

          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-sm sm:text-base font-black font-mono text-amber-300">
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

      {/* Action Buttons: ⚡ Quick Order + Specs + Add to Form */}
      <div className="grid grid-cols-3 gap-1.5 pt-1">
        <button
          type="button"
          onClick={() => onQuickOrder(product)}
          className="inline-flex items-center justify-center gap-1 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 text-slate-950 font-black text-[11px] py-2 px-2 rounded-xl shadow-md active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          title="Open Quick Order Pop Up"
        >
          <Zap className="w-3 h-3 fill-slate-950 shrink-0" />
          <span>Quick Order</span>
        </button>

        <button
          type="button"
          onClick={() => onViewSpecs(product)}
          className="inline-flex items-center justify-center gap-1 bg-white/10 hover:bg-white/20 text-white font-bold text-[11px] py-2 px-2 rounded-xl border border-white/20 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          title="View Dimensions & Full Specs"
        >
          <Eye className="w-3 h-3 text-blue-300 shrink-0" />
          <span>Specs</span>
        </button>

        <button
          type="button"
          onClick={() => onAddToForm(product)}
          className="inline-flex items-center justify-center gap-1 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-[11px] py-2 px-2 rounded-xl shadow-md active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          title="Add to main order form below"
        >
          <PlusCircle className="w-3 h-3 text-blue-200 shrink-0" />
          <span>Add to Form</span>
        </button>
      </div>
    </aside>
  );
};
