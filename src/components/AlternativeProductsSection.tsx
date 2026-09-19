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

        {/* Compact 2-Item Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ALTERNATIVE_PRODUCTS.map((prod) => {
            const is5Burner = prod.id === 'cooker-5burner';
            const savings = prod.normalPrice - prod.price;

            return (
              <div
                key={prod.id}
                className="bg-white border border-slate-200 hover:border-blue-500/50 rounded-2xl p-3.5 sm:p-4 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row items-center gap-4"
              >
                {/* Thumbnail */}
                <div 
                  onClick={() => onViewProduct(prod)}
                  className="relative w-full sm:w-36 h-32 sm:h-28 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 cursor-pointer"
                >
                  <img
                    src={prod.images[0]}
                    alt={prod.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-1.5 left-1.5 bg-[#0a192f]/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-md">
                    {is5Burner ? '5-BURNER HYBRID' : '90° FLIP-UP'}
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 w-full">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[10px] font-bold uppercase text-slate-500">
                      {prod.dimensions}
                    </span>
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                      Save {formatNaira(savings)}
                    </span>
                  </div>

                  <h4 
                    onClick={() => onViewProduct(prod)}
                    className="text-sm sm:text-base font-bold text-[#0a192f] hover:text-blue-600 cursor-pointer line-clamp-1"
                  >
                    {prod.name}
                  </h4>

                  <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                    {prod.description}
                  </p>

                  <div className="flex items-center justify-between gap-2 mt-3 pt-2 border-t border-slate-100">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-base font-extrabold text-[#0a192f] font-mono">
                        {formatNaira(prod.price)}
                      </span>
                      <span className="text-xs text-slate-400 line-through">
                        {formatNaira(prod.normalPrice)}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onViewProduct(prod)}
                      className="inline-flex items-center gap-1 text-xs font-bold bg-[#0a192f] hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <span>View Specs</span>
                      <ArrowRight className="w-3 h-3" />
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
