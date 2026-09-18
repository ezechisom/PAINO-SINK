import React from 'react';
import { AlertCircle, LayoutGrid, Layers, Sparkles, ArrowDown } from 'lucide-react';

interface ProblemSectionProps {
  onDiscoverClick: () => void;
}

export const ProblemSection: React.FC<ProblemSectionProps> = ({ onDiscoverClick }) => {
  const problems = [
    {
      id: "clutter",
      title: "TIRED OF A CLUTTERED WORKTOP?",
      description: "When cutting boards, strainers, and bowls crowd your kitchen counters, meal preparation becomes slow and messy. An integrated multifunctional sink moves chopping, rinsing, and draining directly inside the basin so your worktops remain clean and uncluttered.",
      icon: LayoutGrid,
      tag: "Workspace Chaos"
    },
    {
      id: "basic",
      title: "STILL USING A BASIC SINK?",
      description: "A traditional sink is merely a hollow bucket with a static tap. It splatters water everywhere, cannot rinse vegetables gently, lacks glass cleaning pressure, and provides no built-in preparation surface.",
      icon: AlertCircle,
      tag: "Outdated Utility"
    },
    {
      id: "space",
      title: "LIMITED KITCHEN SPACE?",
      description: "Small or medium kitchens suffer when separate appliances and accessories take up precious slab room. By combining washing, waterfall rinsing, chopping, and draining into one workstation, you maximize every square centimeter.",
      icon: Layers,
      tag: "Space Constraints"
    },
    {
      id: "aesthetic",
      title: "WANT A MORE MODERN KITCHEN?",
      description: "You've invested in fine cabinetry, granite or quartz countertops, and modern lighting—yet an old, tarnished chrome sink immediately cheapens the look. A gunmetal nano piano sink instantly brings a luxury designer centerpiece to your home.",
      icon: Sparkles,
      tag: "Visual Appeal"
    }
  ];

  return (
    <section id="problem-section" className="py-16 md:py-20 bg-[#0d121a] border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-amber-400 font-bold text-xs uppercase tracking-widest bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20 mb-4 inline-block">
            The Everyday Kitchen Challenge
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
            YOUR KITCHEN DESERVES MORE THAN JUST A BASIC SINK.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Cooking and washing are the heart of daily home life. Why settle for frustration and clutter when your kitchen can work smarter for you?
          </p>
        </div>

        {/* 4 Problem Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-14">
          {problems.map((prob) => {
            const Icon = prob.icon;
            return (
              <div
                key={prob.id}
                className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 sm:p-7 shadow-lg transition-all hover:shadow-xl hover:bg-slate-900 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold text-rose-400/90 bg-rose-500/10 px-2.5 py-1 rounded-md border border-rose-500/20">
                      {prob.tag}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-amber-400 group-hover:bg-amber-400/10 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2.5 tracking-tight">
                    {prob.title}
                  </h3>

                  <p className="text-slate-400 text-sm leading-relaxed">
                    {prob.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Direct-Response Transition to Solution */}
        <div className="text-center pt-4">
          <div className="inline-flex flex-col items-center gap-2">
            <span className="text-slate-400 text-xs sm:text-sm font-semibold tracking-widest uppercase">
              THE MODERN SOLUTION IS HERE
            </span>
            <div className="text-2xl sm:text-3xl font-black text-amber-400 tracking-tight flex items-center gap-2 font-display">
              <span>MEET THE SMART KITCHEN PIANO SINK.</span>
            </div>
            <button
              onClick={onDiscoverClick}
              className="mt-4 inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-5 py-2.5 rounded-full border border-slate-700 transition-colors cursor-pointer"
            >
              <span>Explore Confirmed Features</span>
              <ArrowDown className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
