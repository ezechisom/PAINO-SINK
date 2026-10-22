import React from 'react';
import { X, Check, ArrowRight, Waves } from 'lucide-react';

interface ComparisonSectionProps {
  onOrderClick: () => void;
}

export const ComparisonSection: React.FC<ComparisonSectionProps> = ({ onOrderClick }) => {
  const comparisonItems = [
    {
      feature: "Water Dispensing Controls",
      traditional: "Single stiff lever that is hard to toggle with soapy hands and lacks dedicated spray modes",
      smartSink: "Tactile piano key valves: dedicated mechanical buttons for waterfall, pull-out sprayer, glass rinser, and filtered tap"
    },
    {
      feature: "Gentle Produce & Dish Rinsing",
      traditional: "Violent single tap stream that splashes water onto counters, floors, and clothing",
      smartSink: "Wide flying rain waterfall curtain gently washes vegetables, delicate fruits, and wide cutting boards with zero splashing"
    },
    {
      feature: "Real-Time Water Temperature",
      traditional: "Zero temperature indicator; stepping under tap risks painful scalding or freezing shocks",
      smartSink: "Hydroelectric digital LED display shows live water temperature in °C and running timer without batteries"
    },
    {
      feature: "Glass & Mug Washing",
      traditional: "Awkward sponge twisting that cannot reach deep into thermal tumblers or slim wine glasses",
      smartSink: "High-pressure inverted cup washer blasts multi-angle water jets in 2 seconds with a light downward press"
    },
    {
      feature: "Workstation Prep Capacity",
      traditional: "Cluttered countertops with wet cutting boards and separate colander bowls taking up space",
      smartSink: "Double-track stepped ledges fit solid wood cutting board and stainless prep baskets directly over the basin"
    },
    {
      feature: "Basin Durability & Cleanliness",
      traditional: "Thin, noisy sheet steel prone to deep scratches, grease stains, and permanent water spotting",
      smartSink: "Heavy 3mm SUS304 food-grade stainless steel with bionic honeycomb nano embossing that wipes clean in seconds"
    }
  ];

  return (
    <section id="comparison-section" className="py-8 sm:py-16 bg-[#0b0f14] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
          <span className="text-amber-400 font-bold text-[11px] uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 mb-2 inline-block">
            Functional Comparison
          </span>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
            NOT JUST A SINK. A COMPLETE KITCHEN WORKSTATION.
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2">
            See the practical daily difference between an ordinary kitchen sink and the Smart Paino Sink Workstation.
          </p>
        </div>

        {/* Comparison Table / Dual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10">
          
          {/* Traditional Sink Column */}
          <div className="rounded-2xl bg-slate-900/50 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <div>
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Standard Option</span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-300">BASIC TRADITIONAL SINK</h3>
                </div>
                <span className="px-2.5 py-0.5 bg-slate-800 text-slate-400 text-[11px] font-medium rounded-full">
                  Basic Utility
                </span>
              </div>

              <ul className="space-y-3">
                {comparisonItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-slate-400 text-xs sm:text-sm">
                    <div className="w-4 h-4 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                      <X className="w-3 h-3" />
                    </div>
                    <div>
                      <strong className="text-slate-300 block text-[11px] uppercase font-semibold">{item.feature}:</strong>
                      <span>{item.traditional}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800 text-center">
              <span className="text-[11px] text-slate-500 italic">Splashing water, stained basins &amp; cluttered countertops</span>
            </div>
          </div>

          {/* Smart Piano Sink Column */}
          <div className="rounded-2xl bg-gradient-to-b from-slate-900 via-[#101926] to-slate-950 border-2 border-blue-500/40 p-4 sm:p-6 shadow-xl relative flex flex-col justify-between">
            <div className="absolute -top-2.5 right-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-extrabold text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-full shadow-xs">
              Luxury Workstation
            </div>

            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-700/80 mb-4">
                <div>
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block">Modern Upgrade</span>
                  <h3 className="text-base sm:text-lg font-extrabold text-white">SMART PAINO SINK WORKSTATION</h3>
                </div>
                <span className="px-2.5 py-0.5 bg-blue-500/20 text-blue-300 text-[11px] font-bold rounded-full border border-blue-500/30">
                  Piano Keys + Waterfall + LED
                </span>
              </div>

              <ul className="space-y-3">
                {comparisonItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-slate-200 text-xs sm:text-sm">
                    <div className="w-4 h-4 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <div>
                      <strong className="text-blue-300 block text-[11px] uppercase font-bold">{item.feature}:</strong>
                      <span>{item.smartSink}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800 text-center text-xs text-blue-300/80 font-medium">
              <span>Piano key valves, flying rain waterfall, hydroelectric LED temp &amp; full 9-piece kit</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
