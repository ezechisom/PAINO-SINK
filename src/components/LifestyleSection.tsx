import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface LifestyleSectionProps {
  onOrderClick: () => void;
}

export const LifestyleSection: React.FC<LifestyleSectionProps> = ({ onOrderClick }) => {
  return (
    <section id="lifestyle-section" className="py-16 md:py-24 bg-[#0d121a] border-y border-slate-800/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-6">
            <span className="text-amber-400 font-bold text-xs uppercase tracking-widest bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20 mb-4 inline-block">
              Luxury Living &bull; Everyday Convenience
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              TURN YOUR KITCHEN INTO A SPACE YOU'LL LOVE.
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6 font-light">
              Designed to bring a modern look and practical functionality into your everyday kitchen.
            </p>

            <div className="space-y-3.5 mb-8 text-slate-300 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span>Architectural gunmetal finish matches contemporary appliances</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span>Smart hydroelectric digital LED shows real-time temperature</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span>Sliding nested preparation trays eliminate messy counter spills</span>
              </div>
            </div>

            <button
              onClick={onOrderClick}
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-base py-4 px-8 rounded-xl shadow-lg shadow-amber-500/20 transform active:scale-[0.98] transition-all cursor-pointer uppercase tracking-wider"
            >
              <span>UPGRADE MY KITCHEN</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-900 group">
              <img
                src="/images/luxury_kitchen_lifestyle_1789548098794.jpg"
                alt="Smart Kitchen Piano Sink installed in modern kitchen"
                className="w-full aspect-[16/10] object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              
              <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700 text-xs font-semibold text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Installed View</span>
              </div>

              <div className="p-4 bg-slate-950/90 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                <span>750mm x 450mm Universal Cutout</span>
                <span className="text-slate-300 font-medium">Topmount / Flushmount / Undermount</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
