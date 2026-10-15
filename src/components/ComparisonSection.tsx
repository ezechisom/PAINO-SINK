import React from 'react';
import { X, Check, ArrowRight, Flame } from 'lucide-react';

interface ComparisonSectionProps {
  onOrderClick: () => void;
}

export const ComparisonSection: React.FC<ComparisonSectionProps> = ({ onOrderClick }) => {
  const comparisonItems = [
    {
      feature: "Daily Cleaning",
      traditional: "Must dismantle screws, remove greasy burner caps, and scrub for 20 minutes",
      smartCooker: "90° Flip-Up burners lift upright with 1 finger for instant 1-wipe cleaning in 5 seconds"
    },
    {
      feature: "Cooking Safety",
      traditional: "No timer; easy to forget boiling food, causing burnt meals and dangerous gas waste",
      smartCooker: "Built-in 0–180 min mechanical timer automatically shuts off the gas flame when time is up"
    },
    {
      feature: "Flame & Pot Care",
      traditional: "Yellow uneven flame produces thick black soot that ruins expensive cookware",
      smartCooker: "Pure blue flame with 8-nozzle brass crowns and oxygen damper ensures 100% soot-free pots"
    },
    {
      feature: "Pot Support & Balance",
      traditional: "Thin wire racks that wobble or bend under heavy Nigerian soup pots",
      smartCooker: "Heavy-duty windproof cast iron wok supports hold family-sized pots securely with zero tilting"
    },
    {
      feature: "Surface Durability",
      traditional: "Thin sheet metal or cheap enamel that rusts, dents, and peels over time",
      smartCooker: "Explosion-proof 8mm tempered crystal glass that resists thermal shock and scratches"
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
            NOT JUST A STOVE. A SMARTER COOKING EXPERIENCE.
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2">
            See the practical daily difference between conventional gas cookers and the 2-Flip-Up Double Gas Burner.
          </p>
        </div>

        {/* Comparison Table / Dual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10">
          
          {/* Traditional Stove Column */}
          <div className="rounded-2xl bg-slate-900/50 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <div>
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Standard Option</span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-300">CONVENTIONAL GAS STOVE</h3>
                </div>
                <span className="px-2.5 py-0.5 bg-slate-800 text-slate-400 text-[11px] font-medium rounded-full">
                  Basic &amp; High Maintenance
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
              <span className="text-[11px] text-slate-500 italic">Trapped oil stains and constant risk of burnt meals</span>
            </div>
          </div>

          {/* 2-Flip-Up Cooker Column */}
          <div className="rounded-2xl bg-gradient-to-b from-slate-900 via-[#101926] to-slate-950 border-2 border-amber-500/40 p-4 sm:p-6 shadow-xl relative flex flex-col justify-between">
            <div className="absolute -top-2.5 right-4 bg-gradient-to-r from-amber-500 to-amber-400 text-black font-extrabold text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-full shadow-xs">
              Smarter Cooktop
            </div>

            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-700/80 mb-4">
                <div>
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">Modern Upgrade</span>
                  <h3 className="text-base sm:text-lg font-extrabold text-white">2-FLIP-UP GAS COOKER</h3>
                </div>
                <span className="px-2.5 py-0.5 bg-amber-500/20 text-amber-300 text-[11px] font-bold rounded-full border border-amber-500/30">
                  90° Flip + Timer
                </span>
              </div>

              <ul className="space-y-3">
                {comparisonItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-slate-200 text-xs sm:text-sm">
                    <div className="w-4 h-4 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <div>
                      <strong className="text-amber-300 block text-[11px] uppercase font-bold">{item.feature}:</strong>
                      <span>{item.smartCooker}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800 text-center text-xs text-amber-300/80 font-medium">
              <span>Fast 1-wipe cleaning, built-in safety shutoff &amp; pure blue flame efficiency</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
