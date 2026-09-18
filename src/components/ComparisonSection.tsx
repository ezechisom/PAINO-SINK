import React from 'react';
import { X, Check, ArrowRight } from 'lucide-react';

interface ComparisonSectionProps {
  onOrderClick: () => void;
}

export const ComparisonSection: React.FC<ComparisonSectionProps> = ({ onOrderClick }) => {
  const comparisonItems = [
    {
      feature: "Primary Function",
      traditional: "Single water stream for basic washing only",
      smartPiano: "4 independent water modes (waterfall, pull-out spray, pure tap, cup rinser)"
    },
    {
      feature: "Workspace Utility",
      traditional: "Limited sink area; accessories sit on counter",
      smartPiano: "Integrated double-track rails for sliding cutting board, colander & prep basin"
    },
    {
      feature: "Water Temperature & Safety",
      traditional: "Manual touch guessing; risk of hot scalding",
      smartPiano: "Real-time LED digital water temperature display (hydroelectric powered)"
    },
    {
      feature: "Glass & Cup Cleaning",
      traditional: "Awkward sponge scrubbing inside deep glasses",
      smartPiano: "High-pressure glass rinser cleans cups & bottles in 2 seconds"
    },
    {
      feature: "Drainage Operation",
      traditional: "Must reach hands into dirty or greasy water",
      smartPiano: "Knurled deck-mounted rotary switch opens and closes the drain"
    },
    {
      feature: "Surface Finish & Hygiene",
      traditional: "Prone to scratches, oil staining, and watermarks",
      smartPiano: "Micro-textured bionic nano stainless steel resists grease and abrasions"
    },
    {
      feature: "Aesthetic Impact",
      traditional: "Generic, standard utilitarian appearance",
      smartPiano: "Luxury gunmetal architectural centerpiece with tactile piano keys"
    }
  ];

  return (
    <section id="comparison-section" className="py-16 md:py-24 bg-[#0b0f14] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-amber-400 font-bold text-xs uppercase tracking-widest bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20 mb-3 inline-block">
            Functional Comparison
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            NOT JUST A SINK. A COMPLETE KITCHEN WORKSTATION.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Compare the features and daily kitchen workflow between a standard conventional basin and the Smart Piano Sink workstation.
          </p>
        </div>

        {/* Comparison Table / Dual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
          
          {/* Traditional Sink Column */}
          <div className="rounded-3xl bg-slate-900/50 border border-slate-800 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Standard Option</span>
                  <h3 className="text-xl font-bold text-slate-300">TRADITIONAL SINK</h3>
                </div>
                <span className="px-3 py-1 bg-slate-800 text-slate-400 text-xs font-medium rounded-full">
                  Basic Utility
                </span>
              </div>

              <ul className="space-y-4">
                {comparisonItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-400 text-sm">
                    <div className="w-5 h-5 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                      <X className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="text-slate-300 block text-xs uppercase font-semibold mb-0.5">{item.feature}:</strong>
                      <span>{item.traditional}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800 text-center">
              <span className="text-xs text-slate-500 italic">Separate accessories required for basic kitchen tasks</span>
            </div>
          </div>

          {/* Smart Piano Sink Column */}
          <div className="rounded-3xl bg-gradient-to-b from-slate-900 via-[#101926] to-slate-950 border-2 border-amber-500/40 p-6 sm:p-8 shadow-2xl relative flex flex-col justify-between">
            <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-amber-500 to-amber-400 text-black font-extrabold text-xs tracking-wider uppercase px-3.5 py-1 rounded-full shadow-md">
              Integrated Workstation
            </div>

            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-700/80 mb-6">
                <div>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">Modern Upgrade</span>
                  <h3 className="text-xl font-extrabold text-white">SMART PIANO SINK</h3>
                </div>
                <span className="px-3 py-1 bg-amber-500/20 text-amber-300 text-xs font-bold rounded-full border border-amber-500/30">
                  Multifunctional
                </span>
              </div>

              <ul className="space-y-4">
                {comparisonItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-200 text-sm">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="text-amber-300 block text-xs uppercase font-bold mb-0.5">{item.feature}:</strong>
                      <span>{item.smartPiano}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800">
              <button
                onClick={onOrderClick}
                className="w-full inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm py-3.5 px-6 rounded-xl shadow-lg transition-transform active:scale-[0.98] uppercase tracking-wider cursor-pointer"
              >
                <span>CHOOSE THE SMART PIANO SINK</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
