import React, { useState } from 'react';
import { ALTERNATIVE_PRODUCTS, AlternativeProduct } from '../data/alternativeProducts';
import { formatNaira } from '../config';
import { Flame, ArrowRight } from 'lucide-react';

interface AlternativeProductsTopBannerProps {
  onViewProduct: (product: AlternativeProduct) => void;
  onOrderProduct?: (product: AlternativeProduct) => void;
}

export const AlternativeProductsTopBanner: React.FC<AlternativeProductsTopBannerProps> = ({
  onViewProduct
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Quadruple the products to guarantee a seamless, infinite loop on any screen width
  const loopProducts = [
    ...ALTERNATIVE_PRODUCTS,
    ...ALTERNATIVE_PRODUCTS,
    ...ALTERNATIVE_PRODUCTS,
    ...ALTERNATIVE_PRODUCTS
  ];

  return (
    <div 
      id="alternative-products-top" 
      className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 border-y-2 border-yellow-400 py-2 px-2 sm:px-4 relative z-30 shadow-lg overflow-hidden select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <div className="max-w-7xl mx-auto flex items-center gap-2 sm:gap-3">
        
        {/* High-Notice Red & Yellow Sticky Announcement Badge */}
        <div className="shrink-0 z-20 flex items-center">
          <div className="bg-yellow-400 text-red-950 font-black text-[10px] sm:text-xs px-2.5 py-1.5 rounded-lg uppercase tracking-wider flex items-center gap-1.5 shadow-md border border-yellow-300 animate-pulse">
            <Flame className="w-3.5 h-3.5 fill-red-600 text-red-600 shrink-0" />
            <span className="hidden sm:inline">MATCHING COOKTOPS &bull; SPECIAL DEALS:</span>
            <span className="sm:hidden">MATCHING COOKERS:</span>
          </div>
        </div>

        {/* Continuous Smooth Sliding Ticker Track */}
        <div className="relative flex-1 min-w-0 overflow-hidden">
          {/* Subtle Red Gradients on edges for smooth fading into track */}
          <div className="pointer-events-none absolute left-0 inset-y-0 w-4 bg-gradient-to-r from-red-600 to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 inset-y-0 w-4 bg-gradient-to-l from-red-600 to-transparent z-10" />

          <div 
            className="animate-marquee-slide flex items-center gap-3 py-0.5 cursor-pointer"
            style={{ animationPlayState: isHovered ? 'paused' : 'running' }}
          >
            {/* Set 1 */}
            {loopProducts.map((prod, idx) => {
              const is5Burner = prod.id === 'cooker-5burner';
              const savings = prod.normalPrice - prod.price;

              return (
                <div
                  key={`top-alt-prod-1-${prod.id}-${idx}`}
                  onClick={() => onViewProduct(prod)}
                  className="group bg-yellow-400 hover:bg-yellow-300 border-2 border-yellow-500 hover:border-yellow-200 rounded-xl p-2 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-md flex items-center gap-3 shrink-0 w-[330px] sm:w-[370px]"
                >
                  {/* Large High-Visibility Product Picture */}
                  <div className="relative w-28 sm:w-36 h-20 sm:h-24 rounded-lg overflow-hidden bg-black/80 border-2 border-red-700/60 shrink-0 shadow-inner">
                    <img
                      src={prod.images[0]}
                      alt={prod.name}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-0 left-0 bg-red-600 text-yellow-300 px-1.5 py-0.5 rounded-br text-[9px] font-black tracking-tight shadow-sm">
                      {is5Burner ? '⚡ 5-BURNER DUAL-FUEL' : '🔥 90° FLIP-UP 2-BURNER'}
                    </div>
                    <div className="absolute bottom-0 inset-x-0 bg-black/75 backdrop-blur-xs text-yellow-300 text-[8px] font-extrabold px-1 py-0.5 text-center truncate">
                      {is5Burner ? '4 Gas + 1 Electric Plate' : 'Twin Flip Burners + Timer'}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-black text-red-950 group-hover:text-red-900 transition-colors truncate">
                        {prod.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[9px] font-black text-yellow-300 bg-red-600 px-1.5 py-0.5 rounded border border-red-700 shrink-0">
                        SAVE {formatNaira(savings)}
                      </span>
                      <span className="text-[9px] text-red-900 font-extrabold truncate">
                        {prod.dimensions.split(' ')[0]}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-1.5 pt-1 border-t border-yellow-500/50">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xs sm:text-sm font-black text-red-950 font-mono">
                          {formatNaira(prod.price)}
                        </span>
                        <span className="text-[9px] text-red-800 line-through font-semibold">
                          {formatNaira(prod.normalPrice)}
                        </span>
                      </div>

                      <div className="inline-flex items-center gap-1 bg-red-600 hover:bg-red-700 text-yellow-300 font-extrabold text-[9px] px-2 py-0.5 rounded shadow-xs uppercase tracking-tight">
                        <span>VIEW</span>
                        <ArrowRight className="w-2.5 h-2.5" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Set 2 (Duplicated for seamless continuous loop) */}
            {loopProducts.map((prod, idx) => {
              const is5Burner = prod.id === 'cooker-5burner';
              const savings = prod.normalPrice - prod.price;

              return (
                <div
                  key={`top-alt-prod-2-${prod.id}-${idx}`}
                  onClick={() => onViewProduct(prod)}
                  className="group bg-yellow-400 hover:bg-yellow-300 border-2 border-yellow-500 hover:border-yellow-200 rounded-xl p-2 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-md flex items-center gap-3 shrink-0 w-[330px] sm:w-[370px]"
                >
                  {/* Large High-Visibility Product Picture */}
                  <div className="relative w-28 sm:w-36 h-20 sm:h-24 rounded-lg overflow-hidden bg-black/80 border-2 border-red-700/60 shrink-0 shadow-inner">
                    <img
                      src={prod.images[0]}
                      alt={prod.name}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-0 left-0 bg-red-600 text-yellow-300 px-1.5 py-0.5 rounded-br text-[9px] font-black tracking-tight shadow-sm">
                      {is5Burner ? '⚡ 5-BURNER DUAL-FUEL' : '🔥 90° FLIP-UP 2-BURNER'}
                    </div>
                    <div className="absolute bottom-0 inset-x-0 bg-black/75 backdrop-blur-xs text-yellow-300 text-[8px] font-extrabold px-1 py-0.5 text-center truncate">
                      {is5Burner ? '4 Gas + 1 Electric Plate' : 'Twin Flip Burners + Timer'}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-black text-red-950 group-hover:text-red-900 transition-colors truncate">
                        {prod.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[9px] font-black text-yellow-300 bg-red-600 px-1.5 py-0.5 rounded border border-red-700 shrink-0">
                        SAVE {formatNaira(savings)}
                      </span>
                      <span className="text-[9px] text-red-900 font-extrabold truncate">
                        {prod.dimensions.split(' ')[0]}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-1.5 pt-1 border-t border-yellow-500/50">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xs sm:text-sm font-black text-red-950 font-mono">
                          {formatNaira(prod.price)}
                        </span>
                        <span className="text-[9px] text-red-800 line-through font-semibold">
                          {formatNaira(prod.normalPrice)}
                        </span>
                      </div>

                      <div className="inline-flex items-center gap-1 bg-red-600 hover:bg-red-700 text-yellow-300 font-extrabold text-[9px] px-2 py-0.5 rounded shadow-xs uppercase tracking-tight">
                        <span>VIEW</span>
                        <ArrowRight className="w-2.5 h-2.5" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

