import React from 'react';
import { X, Check } from 'lucide-react';

interface ComparisonSectionProps {
  onOrderClick: () => void;
}

export const ComparisonSection: React.FC<ComparisonSectionProps> = () => {
  const comparisonItems = [
    {
      feature: "Burner Cleaning & Spill Access",
      traditional: "Fixed screwed burners trap burnt stew and grease underneath; requires screwdrivers to clean",
      flipCooker: "90° Flip-Up hinged burners lift upright with one finger so you wipe underneath spotless in 5 seconds"
    },
    {
      feature: "Cooking Timer & Auto Shut-Off",
      traditional: "Zero safety timer; walking away risks burnt food, ruined pots, and wasted gas",
      flipCooker: "Integrated 0–180 minute mechanical safety timer cuts off gas supply automatically when time expires"
    },
    {
      feature: "Flame Color & Pot Cleanliness",
      traditional: "Unbalanced yellow smoky flame that leaves stubborn black soot stains on expensive pots",
      flipCooker: "8-nozzle brass burner crowns + oxygen damper produce crisp, pure blue high-heat flame with zero soot"
    },
    {
      feature: "Cooktop Surface & Hygiene",
      traditional: "Thin painted metal tops that rust, stain permanently, and peel around burner edges",
      flipCooker: "8mm explosion-proof tempered crystal glass panel wipes clean in one swipe without rusting"
    },
    {
      feature: "Heavy Pot Support & Wind Shield",
      traditional: "Light wire grates that bend or wobble under heavy family pots and let drafts blow flames",
      flipCooker: "Heavy-duty windproof cast iron pot stands keep large pots rock-steady and block kitchen drafts"
    },
    {
      feature: "Installation Versatility",
      traditional: "Locked to only tabletop OR only recessed cabinet installation",
      flipCooker: "Dual-use engineering works seamlessly built-in (650×350mm cutout) or straight on your countertop"
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
            NOT JUST A STOVE. A SMARTER, SAFER WAY TO COOK.
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2">
            See the practical daily difference between a regular gas cooker and the 2-Flip-Up Double Gas Burner With Timer.
          </p>
        </div>

        {/* Comparison Table / Dual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10">
          
          {/* Traditional Cooker Column */}
          <div className="rounded-2xl bg-slate-900/50 border border-slate-800 p-4 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <div>
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Standard Option</span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-300">BASIC FIXED GAS COOKER</h3>
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
              <span className="text-[11px] text-slate-500 italic">Trapped grease, blackened pots &amp; zero auto shut-off safety</span>
            </div>
          </div>

          {/* 2-Flip-Up Double Gas Burner Column */}
          <div className="rounded-2xl bg-gradient-to-b from-slate-900 via-[#101926] to-slate-950 border-2 border-amber-500/50 p-4 sm:p-6 shadow-xl relative flex flex-col justify-between">
            <div className="absolute -top-2.5 right-4 bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-extrabold text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-full shadow-xs">
              Luxury Flip-Up System
            </div>

            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-700/80 mb-4">
                <div>
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">Modern Upgrade</span>
                  <h3 className="text-base sm:text-lg font-extrabold text-white">2-FLIP-UP GAS BURNER WITH TIMER</h3>
                </div>
                <span className="px-2.5 py-0.5 bg-amber-500/20 text-amber-300 text-[11px] font-bold rounded-full border border-amber-500/30">
                  90° Flip + 180m Timer
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
                      <span>{item.flipCooker}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800 text-center text-xs text-amber-300/80 font-medium">
              <span>90° one-finger flip-up hinges, 0–180m auto-off timer, pure blue flame &amp; 8mm crystal glass</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
