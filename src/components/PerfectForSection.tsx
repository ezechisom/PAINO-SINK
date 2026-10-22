import React from 'react';
import { Home, Building2, Sparkles, Hammer, Hotel, Building } from 'lucide-react';

export const PerfectForSection: React.FC = () => {
  const useCases = [
    {
      id: "family-homes",
      title: "Family Homes",
      description: "Deep 220mm basin fits large pots, while nested prep boards keep busy family kitchen counters organized and splash-free.",
      icon: Home
    },
    {
      id: "apartments",
      title: "Modern Apartments",
      description: "Integrated double tracks turn the sink basin into an active food prep zone, maximizing compact countertop space.",
      icon: Building2
    },
    {
      id: "new-homes",
      title: "New Architectural Builds",
      description: "Sleek gunmetal nano stainless steel and LED digital ambient display create an instant luxury focal point on quartz slabs.",
      icon: Sparkles
    },
    {
      id: "renovations",
      title: "Kitchen Renovations",
      description: "Directly drop into standard 700×400mm countertop cutouts to replace outdated, leaky sinks without rebuilding cabinetry.",
      icon: Hammer
    },
    {
      id: "shortlets",
      title: "Shortlets & Airbnb",
      description: "Scratch-resistant nano coating and self-powered digital display impress guests with low maintenance and zero battery hassles.",
      icon: Hotel
    },
    {
      id: "chefs",
      title: "Passionate Home Chefs",
      description: "Nested cutting board, prep colander, and instant high-pressure glass rinser make multi-course meal preparation effortless.",
      icon: Building
    }
  ];

  return (
    <section id="perfect-for-section" className="py-8 sm:py-14 bg-[#0b0f14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
          <span className="text-amber-400 font-bold text-[11px] uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 mb-2 inline-block">
            Universal Architectural Fit
          </span>
          <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
            PERFECT FOR MODERN KITCHENS
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2">
            Engineered to fit seamlessly into modern residential and luxury kitchen layouts.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6">
          {useCases.map((uc) => {
            const Icon = uc.icon;
            return (
              <div
                key={uc.id}
                className="bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-xl sm:rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-amber-400 shrink-0 group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white mb-1">
                    {uc.title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {uc.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
