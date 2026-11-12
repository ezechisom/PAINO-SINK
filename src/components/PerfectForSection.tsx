import React from 'react';
import { Home, Building2, Sparkles, Hammer, Hotel, Building } from 'lucide-react';

export const PerfectForSection: React.FC = () => {
  const useCases = [
    {
      id: "family-homes",
      title: "Family Homes",
      description: "Heavy-duty windproof cast iron pot stands support large Nigerian cooking pots, while 90° flip-up hinges make post-meal cleaning effortless.",
      icon: Home
    },
    {
      id: "apartments",
      title: "Modern Apartments",
      description: "Dual-use tabletop or built-in design fits neatly onto compact counters without complicated masonry work.",
      icon: Building2
    },
    {
      id: "new-homes",
      title: "New Architectural Builds",
      description: "8mm glossy black tempered crystal glass and pure blue flames create a refined luxury centerpiece on marble or quartz slabs.",
      icon: Sparkles
    },
    {
      id: "renovations",
      title: "Kitchen Renovations",
      description: "Drops directly into standard 650×350mm countertop cutouts (750×450mm outer glass frame) to upgrade outdated cooktops immediately.",
      icon: Hammer
    },
    {
      id: "shortlets",
      title: "Shortlets & Airbnb",
      description: "Built-in 0–180 minute mechanical auto-off timer prevents forgotten stoves and gives property hosts lasting peace of mind.",
      icon: Hotel
    },
    {
      id: "chefs",
      title: "Busy Professionals & Parents",
      description: "Set the timer and step away safely without burning rice, stews, or soups while multitasking around the house.",
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
            Engineered to fit seamlessly as either a recessed built-in hob or a freestanding tabletop gas stove.
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
