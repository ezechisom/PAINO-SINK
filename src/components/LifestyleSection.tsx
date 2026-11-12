import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';

interface LifestyleSectionProps {
  onOrderClick: () => void;
}

export const LifestyleSection: React.FC<LifestyleSectionProps> = () => {
  return (
    <section id="lifestyle-section" className="py-8 sm:py-16 bg-[#0d121a] border-y border-slate-800/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-6">
            <span className="text-amber-400 font-bold text-[11px] uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 mb-2.5 inline-block">
              Modern Lifestyle &bull; Everyday Luxury
            </span>

            <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight mb-3">
              COOK FASTER, CLEAN IN 5 SECONDS, STAY SAFE.
            </h2>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-5">
              Designed to bring sleek crystal glass elegance, zero-soot brass power, and automatic timer security into your home kitchen.
            </p>

            <div className="space-y-2.5 mb-6 text-slate-300 text-xs sm:text-sm">
              <div className="flex items-center gap-2.5">
                <div className="w-4.5 h-4.5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>90° flip-up burners lift with one finger so grease never builds up</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-4.5 h-4.5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>Mechanical 0–180m auto shut-off timer protects every meal without electricity</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-4.5 h-4.5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>Oxygen-balanced pure blue flames keep stainless pots clean and spotless</span>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-slate-700 shadow-xl bg-slate-900 group">
              <img
                src="https://www.moonlightluxuryhometech.shop/images/cooker_active_blue_flames.jpg"
                alt="2-Flip-Up Double Gas Burner With Timer active pure blue flames"
                className="w-full aspect-[16/10] object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              
              <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-slate-700 text-[11px] font-semibold text-amber-300 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>8mm Tempered Crystal Glass</span>
              </div>

              <div className="p-3 bg-slate-950/90 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                <span>750 × 450 mm Outer Dimensions</span>
                <span className="text-slate-300 font-medium">Built-In Recessed / Tabletop</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
