import React from 'react';
import { AlertCircle, Flame, Clock, Sparkles, ArrowDown, ShieldAlert } from 'lucide-react';

interface ProblemSectionProps {
  onDiscoverClick: () => void;
}

export const ProblemSection: React.FC<ProblemSectionProps> = ({ onDiscoverClick }) => {
  const problems = [
    {
      id: "burnt-food",
      title: "TIRED OF BURNT FOOD & WASTED GAS?",
      description: "Getting distracted while boiling beans, meat, or stews often leads to ruined meals and burnt pots. Our built-in 0–180m mechanical timer cuts off the gas flame automatically.",
      icon: Clock,
      tag: "Cooking Frustration"
    },
    {
      id: "cleaning",
      title: "EXHAUSTED SCRUBBING GREASY BURNERS?",
      description: "Traditional stoves have fixed burner heads that trap grease, soup spills, and baked-on oil underneath. Cleaning takes 20 painful minutes of unscrewing parts.",
      icon: AlertCircle,
      tag: "Stubborn Grease"
    },
    {
      id: "soot",
      title: "BLACK SOOT RUINING YOUR POTS?",
      description: "Inferior gas burners produce smoky yellow flames that stain your expensive stainless and non-stick cookware with thick black carbon soot.",
      icon: Flame,
      tag: "Cookware Damage"
    },
    {
      id: "wobble",
      title: "WOBBLY STANDS FOR HEAVY POTS?",
      description: "Thin wire pot stands bend under heavy soup pots, creating dangerous tipping risks when stirring family-sized meals.",
      icon: ShieldAlert,
      tag: "Kitchen Hazard"
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
            YOUR KITCHEN DESERVES MORE THAN AN ORDINARY GAS STOVE.
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2">
            Why struggle with burnt food, soot-covered pots, and greasy scrub downs when a smart cooker solves them all?
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
              <span>MEET THE 2-FLIP-UP GAS COOKER WITH TIMER.</span>
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
