import React from 'react';
import { AlertCircle, LayoutGrid, Layers, Sparkles, ArrowDown, Droplets } from 'lucide-react';

interface ProblemSectionProps {
  onDiscoverClick: () => void;
}

export const ProblemSection: React.FC<ProblemSectionProps> = ({ onDiscoverClick }) => {
  const problems = [
    {
      id: "splashing",
      title: "UNCONTROLLABLE WATER SPLASHING?",
      description: "Shallow, flat traditional sinks cause water to rebound violently onto your clothes and kitchen floor. Our 220mm extra-deep basin and gentle flying rain waterfall keep countertops completely dry.",
      icon: AlertCircle,
      tag: "Water Splash"
    },
    {
      id: "temperature",
      title: "TEMPERATURE GUESSWORK & BURNS?",
      description: "Standard taps force you to test hot water blindly with your bare fingers. Our hydroelectric digital LED screen shows live water temperature in °C and running timer without batteries.",
      icon: Droplets,
      tag: "Temp Control"
    },
    {
      id: "cup-washing",
      title: "TEDIOUS GLASS & BOTTLE CLEANING?",
      description: "Bulky sponges cannot reach the bottoms of slim wine glasses, thermal mugs, or baby bottles. Simply press down on the high-pressure glass rinser for a 2-second spotless multi-angle jet wash.",
      icon: Sparkles,
      tag: "Hard to Clean"
    },
    {
      id: "rust-stains",
      title: "RUSTY, STAINED, SCRATCHED BASIN?",
      description: "Thin metal sinks dent easily, scratch under heavy pots, and trap foul odors. Our 3mm SUS304 nano stainless steel features a honeycomb embossed coating that repels scratches, stains, and oil.",
      icon: Layers,
      tag: "Basin Damage"
    }
  ];

  return (
    <section id="problem-section" className="py-8 sm:py-14 bg-[#0d121a] border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
          <span className="text-amber-400 font-bold text-[11px] uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 mb-2.5 inline-block">
            The Everyday Kitchen Challenge
          </span>
          <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
            YOUR KITCHEN DESERVES MORE THAN JUST AN ORDINARY SINK.
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2">
            Why settle for wet counters, scalding water, and endless pot scrubbing when your workstation sink can work smarter for you?
          </p>
        </div>

        {/* 4 Problem Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-6 mb-8 sm:mb-10">
          {problems.map((prob) => {
            const Icon = prob.icon;
            return (
              <div
                key={prob.id}
                className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm transition-all hover:bg-slate-900 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[10px] font-semibold text-rose-400/90 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                      {prob.tag}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-amber-400 group-hover:bg-amber-400/10 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-white mb-1.5 tracking-tight">
                    {prob.title}
                  </h3>

                  <p className="text-slate-400 text-xs leading-relaxed">
                    {prob.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Direct-Response Transition to Solution */}
        <div className="text-center pt-2">
          <div className="inline-flex flex-col items-center gap-1.5">
            <span className="text-slate-400 text-[11px] sm:text-xs font-semibold tracking-widest uppercase">
              THE MODERN SOLUTION IS HERE
            </span>
            <div className="text-lg sm:text-2xl font-black text-amber-400 tracking-tight flex items-center gap-2 font-display">
              <span>MEET THE SMART PAINO SINK.</span>
            </div>
            <button
              onClick={onDiscoverClick}
              className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-full border border-slate-700 transition-colors cursor-pointer"
            >
              <span>Explore Features</span>
              <ArrowDown className="w-3.5 h-3.5 text-amber-400" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
