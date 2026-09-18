import React, { useState } from 'react';
import { ALTERNATIVE_PRODUCTS, AlternativeProduct } from '../data/alternativeProducts';
import { formatNaira } from '../config';
import { 
  Flame, 
  Zap, 
  Clock, 
  ExternalLink, 
  ChevronRight, 
  Sparkles,
  Eye,
  ArrowUpRight
} from 'lucide-react';

interface AlternativeProductsTopBannerProps {
  onViewProduct: (product: AlternativeProduct) => void;
  onOrderProduct?: (product: AlternativeProduct) => void;
}

export const AlternativeProductsTopBanner: React.FC<AlternativeProductsTopBannerProps> = ({
  onViewProduct,
  onOrderProduct
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <section 
      id="alternative-products-top" 
      className="bg-gradient-to-r from-slate-950 via-[#0d141e] to-slate-950 border-b border-amber-500/30 text-white relative z-30 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3.5 sm:py-4">
        
        {/* Banner Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
            </span>
            <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ALSO AVAILABLE FROM MOONLIGHT LUXURY KITCHEN TECH</span>
            </span>
            <span className="hidden md:inline-block text-[11px] text-slate-400 font-medium bg-slate-800/80 px-2 py-0.5 rounded-full border border-slate-700">
              Direct-Match Built-In Gas &amp; Hybrid Cooktops
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://www.moonlightluxuryhometech.shop/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] sm:text-xs text-slate-300 hover:text-amber-400 font-bold flex items-center gap-1 transition-colors"
            >
              <span>Visit Cooktop Store</span>
              <ExternalLink className="w-3 h-3 text-amber-400" />
            </a>

            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-[10px] text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-800/60 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              {isCollapsed ? 'Show Appliances ▲' : 'Collapse ▼'}
            </button>
          </div>
        </div>

        {/* Product Cards Row */}
        {!isCollapsed && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {ALTERNATIVE_PRODUCTS.map((prod) => {
              const is5Burner = prod.id === 'cooker-5burner';

              return (
                <div
                  key={prod.id}
                  onClick={() => onViewProduct(prod)}
                  className="group relative bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-amber-500/60 rounded-2xl p-3 sm:p-4 transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-amber-500/10 cursor-pointer flex items-center gap-3.5"
                >
                  {/* Thumbnail Image with Live Tag */}
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shrink-0">
                    <img
                      src={prod.images[0]}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-1 left-1 bg-black/85 backdrop-blur-sm px-1.5 py-0.5 rounded text-[9px] font-black text-amber-300 flex items-center gap-1">
                      {is5Burner ? <Zap className="w-2.5 h-2.5 text-cyan-400" /> : <Flame className="w-2.5 h-2.5 text-orange-400" />}
                      <span>{is5Burner ? 'GAS+ELEC' : '90° FLIP'}</span>
                    </div>
                  </div>

                  {/* Info Column */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 truncate">
                        {prod.category}
                      </span>
                    </div>

                    <h4 className="text-xs sm:text-sm font-black text-white group-hover:text-amber-300 transition-colors truncate">
                      {prod.name}
                    </h4>

                    <p className="text-[11px] text-slate-300 line-clamp-1 mt-0.5">
                      {is5Burner
                        ? '4 Gas + 1 Electric zone (never get stranded when gas finishes)'
                        : 'Lift burners upright to wipe spills in 5 seconds + built-in timer'}
                    </p>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-800/80">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-sm sm:text-base font-black text-amber-400 font-display">
                          {formatNaira(prod.price)}
                        </span>
                        <span className="text-[10px] sm:text-xs text-slate-500 line-through">
                          {formatNaira(prod.normalPrice)}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-[11px] font-bold text-amber-400 group-hover:translate-x-0.5 transition-transform">
                        <span>View Details</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
