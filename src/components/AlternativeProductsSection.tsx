import React from 'react';
import { ALTERNATIVE_PRODUCTS, AlternativeProduct } from '../data/alternativeProducts';
import { formatNaira } from '../config';
import { 
  Flame, 
  Zap, 
  ArrowRight,
  ExternalLink,
  PlusCircle,
  ShieldCheck,
  Check
} from 'lucide-react';

interface AlternativeProductsSectionProps {
  onViewProduct: (product: AlternativeProduct) => void;
  onSelectForOrder?: (product: AlternativeProduct) => void;
}

export const AlternativeProductsSection: React.FC<AlternativeProductsSectionProps> = ({
  onViewProduct,
  onSelectForOrder
}) => {
  return (
    <section id="alternative-products-section" className="py-10 bg-slate-50 border-t border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Compact Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-1">
              <span>Matching Kitchen Appliances</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-[#0a192f] tracking-tight">
              Optional Cooktops from Moonlight Luxury Home Tech
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Easily pair your smart piano sink with a matching built-in luxury cooktop.
            </p>
          </div>

          <a
            href="https://www.moonlightluxuryhometech.shop/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-[#0a192f] hover:text-blue-600 font-bold self-start md:self-auto"
          >
            <span>Visit Cooktop Catalog</span>
            <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
          </a>
        </div>

        {/* 2-Item Grid with Large Visible Pictures */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ALTERNATIVE_PRODUCTS.map((prod) => {
            const is5Burner = prod.id === 'cooker-5burner';
            const savings = prod.normalPrice - prod.price;

            return (
              <div
                key={prod.id}
                className="bg-white border-2 border-slate-200 hover:border-blue-500/60 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-start gap-4"
              >
                {/* Large Product Picture & Thumbnail Strip */}
                <div className="w-full sm:w-60 shrink-0">
                  <div 
                    onClick={() => onViewProduct(prod)}
                    className="relative w-full h-44 sm:h-40 rounded-xl overflow-hidden bg-slate-900 border border-slate-200 cursor-pointer group shadow-inner"
                  >
                    <img
                      src={prod.images[0]}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 left-2 bg-[#0a192f]/90 backdrop-blur-xs text-white text-[10px] font-black px-2.5 py-1 rounded-md shadow-sm">
                      {is5Burner ? '⚡ 5-BURNER DUAL-FUEL' : '🔥 90° FLIP-UP 2-BURNER'}
                    </div>
                    <div className="absolute bottom-2 inset-x-2 bg-black/75 backdrop-blur-xs text-yellow-300 text-[9px] font-bold px-2 py-1 rounded text-center">
                      {is5Burner ? '4 High-Heat Gas + 1 Electric Zone' : 'Dual Foldable Burners + 180min Timer'}
                    </div>
                  </div>

                  {/* Multi-Photo Preview Strip (Visible without clicking details) */}
                  <div className="grid grid-cols-3 gap-1.5 mt-2">
                    {prod.images.slice(1, 4).map((imgUrl, imgIdx) => (
                      <div
                        key={`mini-thumb-${prod.id}-${imgIdx}`}
                        onClick={() => onViewProduct(prod)}
                        className="relative h-12 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 cursor-pointer hover:border-blue-500 transition-colors"
                      >
                        <img
                          src={imgUrl}
                          alt={`${prod.name} view ${imgIdx + 2}`}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 w-full flex flex-col justify-between self-stretch">
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[10px] font-bold uppercase text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {prod.dimensions}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        Save {formatNaira(savings)}
                      </span>
                    </div>

                    <h4 
                      onClick={() => onViewProduct(prod)}
                      className="text-base sm:text-lg font-black text-[#0a192f] hover:text-blue-600 cursor-pointer leading-tight mt-1"
                    >
                      {prod.name}
                    </h4>

                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed line-clamp-3">
                      {prod.description}
                    </p>

                    {/* Quick Specs Highlight */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {prod.keyFeatures.slice(0, 2).map((feat, fIdx) => (
                        <span 
                          key={fIdx} 
                          className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium"
                        >
                          &bull; {feat.split(':')[0]}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-slate-100">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-lg font-black text-[#0a192f] font-mono">
                        {formatNaira(prod.price)}
                      </span>
                      <span className="text-xs text-slate-400 line-through font-semibold">
                        {formatNaira(prod.normalPrice)}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onViewProduct(prod)}
                      className="inline-flex items-center gap-1.5 text-xs font-black bg-[#0a192f] hover:bg-blue-600 text-white px-3.5 py-2 rounded-xl transition-colors shadow-xs cursor-pointer"
                    >
                      <span>View Full Specs</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
