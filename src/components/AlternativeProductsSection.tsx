import React from 'react';
import { ALTERNATIVE_PRODUCTS, AlternativeProduct } from '../data/alternativeProducts';
import { formatNaira } from '../config';
import { 
  Flame, 
  Zap, 
  Clock, 
  Check, 
  ExternalLink, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Truck
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
    <section id="alternative-products-section" className="py-16 bg-[#0a0e14] border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-amber-400 uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ALTERNATIVE &amp; MATCHING KITCHEN APPLIANCES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Complete Your Modern Kitchen Setup
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2">
            Looking for luxury cooktops designed to complement your Smart Piano Sink? Explore our official 2-Flip-Up Double Burner and 5-Burner Gas + Electric Hybrid Cooktops from Moonlight Luxury Home Tech.
          </p>
        </div>

        {/* 2-Column Product Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {ALTERNATIVE_PRODUCTS.map((prod) => {
            const is5Burner = prod.id === 'cooker-5burner';

            return (
              <div
                key={prod.id}
                className="bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 flex flex-col group"
              >
                {/* Image Showcase */}
                <div 
                  onClick={() => onViewProduct(prod)}
                  className="relative aspect-[16/10] bg-slate-950 overflow-hidden cursor-pointer"
                >
                  <img
                    src={prod.images[0]}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-amber-500/40 text-amber-300 text-xs font-black px-3 py-1.5 rounded-full flex items-center gap-1.5">
                    {is5Burner ? <Zap className="w-3.5 h-3.5 text-cyan-400" /> : <Flame className="w-3.5 h-3.5 text-orange-400" />}
                    <span>{prod.badge}</span>
                  </div>

                  <div className="absolute bottom-4 right-4 bg-black/75 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-mono text-slate-300 border border-slate-700">
                    Panel: {prod.dimensions}
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-0.5 rounded-full">
                        {prod.category}
                      </span>
                      <span className="text-xs font-semibold text-emerald-400">
                        In Stock &bull; Ships Nationwide
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-amber-300 transition-colors">
                      {prod.name}
                    </h3>
                    
                    <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
                      {prod.description}
                    </p>

                    {/* Features List */}
                    <div className="mt-4 space-y-2 border-t border-slate-800/80 pt-4">
                      {prod.keyFeatures.slice(0, 3).map((feat, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                          <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5" />
                          </div>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price & Action Footer */}
                  <div className="mt-6 pt-5 border-t border-slate-800">
                    <div className="flex items-baseline justify-between mb-4">
                      <div>
                        <span className="text-xs text-slate-400 block">Promotional Price</span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl sm:text-3xl font-black text-amber-400 font-display">
                            {formatNaira(prod.price)}
                          </span>
                          <span className="text-xs sm:text-sm text-slate-500 line-through">
                            {formatNaira(prod.normalPrice)}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/30">
                        Save {formatNaira(prod.normalPrice - prod.price)}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <button
                        onClick={() => onViewProduct(prod)}
                        className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-xs py-3 px-4 rounded-xl shadow-lg transition-transform active:scale-95 cursor-pointer uppercase tracking-wider"
                      >
                        <span>VIEW SPECS &amp; PHOTOS</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <a
                        href={prod.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs py-3 px-4 rounded-xl border border-slate-700 transition-colors"
                      >
                        <span>Visit Official Store</span>
                        <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Combo Note */}
        <div className="mt-10 bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-6 text-center max-w-2xl mx-auto">
          <p className="text-xs sm:text-sm text-slate-300">
            💡 <strong className="text-amber-400">Want to order a Sink + Cooktop Combo?</strong> You can add either cooker directly in the Order Form below or speak with customer care to arrange combined delivery anywhere in Nigeria!
          </p>
        </div>

      </div>
    </section>
  );
};
