import React from 'react';
import { X, Check } from 'lucide-react';

interface ComparisonSectionProps {
  onOrderClick: () => void;
}

export const ComparisonSection: React.FC<ComparisonSectionProps> = () => {
  const comparisonItems = [
    {
      feature: "Piano Key 4-Mode Water Console",
      traditional: "Single stiff faucet with weak spray that splashes across your kitchen counter",
      smartSink: "4 independent tactile piano keys switch between flying rain waterfall, pull-out sprayer, drinking water & glass rinser"
    },
    {
      feature: "Live LED Water Temperature (°C)",
      traditional: "No temperature visibility; risk of unexpected hot water splashes",
      smartSink: "Battery-free hydroelectric LED display lights up automatically via water flow to show real-time °C temperature"
    },
    {
      feature: "Flying Rain Cascade Waterfall",
      traditional: "Harsh single stream bruises delicate vegetables and wastes water",
      smartSink: "Wide aerated sheet waterfall gently washes leafy vegetables, fruits, and large family pots with zero splash"
    },
    {
      feature: "SUS304 3mm Nano Honeycomb Steel",
      traditional: "Thin steel basin that scratches easily, stains with palm oil, and dents under heavy pots",
      smartSink: "3mm commercial-grade SUS304 stainless steel with honeycomb nano-embossing resists scratches, grease, and rust"
    },
    {
      feature: "Multi-Tier Sliding Workstation Kit",
      traditional: "Empty basin with no prep accessories; forces chopping and drying onto cluttered counters",
      smartSink: "Integrated dual-tier sliding ledges hold hardwood cutting board, perforated colander & inner basin right over the sink"
    },
    {
      feature: "Rotary Knob Drain & High-Pressure Rinser",
      traditional: "Dipping hands into dirty soapy dishwater to pull the drain plug; hand-scrubbing narrow cups",
      smartSink: "Deck-mounted rotary drain knob opens cleanly from above + one-press cup rinser blasts glasses sparkling clean"
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
            See the practical daily difference between a basic steel sink and the Smart Paino Sink Workstation.
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
                  <h3 className="text-base sm:text-lg font-bold text-slate-300">BASIC STANDARD SINK</h3>
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
              <span className="text-[11px] text-slate-500 italic">Splashing faucet, scratched steel &amp; cramped countertop prep</span>
            </div>
          </div>

          {/* Smart Paino Sink Workstation Column */}
          <div className="rounded-2xl bg-gradient-to-b from-slate-900 via-[#101926] to-slate-950 border-2 border-amber-500/50 p-4 sm:p-6 shadow-xl relative flex flex-col justify-between">
            <div className="absolute -top-2.5 right-4 bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-extrabold text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-full shadow-xs">
              Luxury Smart Workstation
            </div>

            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-700/80 mb-4">
                <div>
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">Modern Upgrade</span>
                  <h3 className="text-base sm:text-lg font-extrabold text-white">SMART PAINO SINK WORKSTATION</h3>
                </div>
                <span className="px-2.5 py-0.5 bg-amber-500/20 text-amber-300 text-[11px] font-bold rounded-full border border-amber-500/30">
                  Piano Keys + LED °C
                </span>
              </div>

              <ul className="space-y-3">
                {comparisonItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-slate-200 text-xs sm:text-sm">
                    <div className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <div>
                      <strong className="text-amber-300 block text-[11px] uppercase font-bold">{item.feature}:</strong>
                      <span>{item.smartSink}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800 text-center text-xs text-amber-300/80 font-medium">
              <span>Tactile piano water console, battery-free LED temp °C, flying rain waterfall &amp; 9-piece kit</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
