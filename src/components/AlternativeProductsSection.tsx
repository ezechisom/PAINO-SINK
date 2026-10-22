import React from 'react';
import { ALTERNATIVE_PRODUCTS, AlternativeProduct } from '../data/alternativeProducts';
import { formatNaira } from '../config';
import { 
  Flame, 
  Zap, 
  ArrowRight,
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
            <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-1 border border-amber-200">
              <Flame className="w-3.5 h-3.5 text-amber-600" />
              <span>Matching Kitchen Appliance</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-[#0a192f] tracking-tight">
              Optional 2-Flip-Up Double Gas Burner With Timer from Moonlight Luxury
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Pair your Smart Paino Sink with our matching 90° flip-up double gas burner with built-in safety timer.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 text-[#0a192f] text-xs font-bold px-3 py-1.5 rounded-full shadow-xs self-start md:self-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Order On This Page &bull; Pay On Delivery</span>
          </div>
        </div>

        {/* Featured Companion Card */}
        <div className="max-w-4xl mx-auto">
          {ALTERNATIVE_PRODUCTS.map((prod) => {
            const savings = prod.normalPrice - prod.price;

            return (
              <div
                key={prod.id}
                className="bg-white border-2 border-slate-200 hover:border-amber-500/60 rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-start gap-5"
              >
                {/* Large Product Picture & Thumbnail Strip */}
                <div className="w-full sm:w-72 shrink-0">
                  <div 
                    onClick={() => onViewProduct(prod)}
                    className="relative w-full h-48 sm:h-44 rounded-xl overflow-hidden bg-slate-900 border border-slate-200 cursor-pointer group shadow-inner"
                  >
                    <img
                      src={prod.images[0]}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 left-2 bg-[#0a192f]/90 backdrop-blur-xs text-white text-[10px] font-black px-2.5 py-1 rounded-md shadow-sm border border-slate-700">
                      🔥 {prod.badge || "MATCHING GAS COOKER"}
                    </div>
                    <div className="absolute bottom-2 inset-x-2 bg-black/80 backdrop-blur-xs text-amber-300 text-[9px] font-bold px-2 py-1 rounded text-center">
                      90° Flip-Up Burners + Safety Timer
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
