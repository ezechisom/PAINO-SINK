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
              WASH, PREP, RINSE &amp; DRAIN — ALL IN ONE PLACE.
            </h2>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-5">
              Designed to bring gunmetal nano-steel elegance, whisper-quiet sound dampening, and effortless workstation organization into your daily kitchen routine.
            </p>

            <div className="space-y-2.5 mb-6 text-slate-300 text-xs sm:text-sm">
              <div className="flex items-center gap-2.5">
                <div className="w-4.5 h-4.5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>Tactile piano water keys switch smoothly between waterfall, pull-out sprayer &amp; cup rinser</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-4.5 h-4.5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>Hydroelectric LED display tracks real-time water temperature (°C) with zero batteries</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-4.5 h-4.5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>Sliding cutting board, colanders &amp; rotary drain knob keep countertops dry and spotless</span>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-slate-700 shadow-xl bg-slate-900 group">
              <img
                src="/images/luxury_kitchen_lifestyle_1789548098794.jpg"
                alt="Smart Paino Sink Workstation installed in a modern luxury kitchen"
                className="w-full aspect-[16/10] object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              
              <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-slate-700 text-[11px] font-semibold text-amber-300 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>SUS304 Honeycomb Nano Steel</span>
              </div>

              <div className="p-3 bg-slate-950/90 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                <span>750 × 450 × 220 mm Deep Basin</span>
                <span className="text-slate-300 font-medium">Topmount • Flushmount • Undermount</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
