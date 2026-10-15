import React from 'react';
import { Home, Building2, Sparkles, Hammer, Hotel, Building } from 'lucide-react';

export const PerfectForSection: React.FC = () => {
  const useCases = [
    {
      id: "family-homes",
      title: "Busy Family Homes",
      description: "Dual high-heat burners boil soups and fry simultaneously, while the 0–180m auto timer prevents burnt family meals.",
      icon: Home
    },
    {
      id: "apartments",
      title: "Modern Apartments",
      description: "Standard 750×450mm surface fits seamlessly into compact counters; 90° flip-up burners eliminate messy stove maintenance.",
      icon: Building2
    },
    {
      id: "new-homes",
      title: "New Architectural Builds",
      description: "Sleek explosion-proof tempered crystal glass panel creates an instant luxury focal point on granite or quartz slabs.",
      icon: Sparkles
    },
    {
      id: "renovations",
      title: "Kitchen Upgrades",
      description: "Directly drop into standard 650×350mm countertop cutouts to replace outdated, soot-producing metal stoves.",
      icon: Hammer
    },
    {
      id: "shortlets",
      title: "Shortlets & Airbnb",
      description: "Timer auto-shutoff protects property from accidental fires, while pure blue flame keeps Airbnb cookware spotless.",
      icon: Hotel
    },
    {
      id: "outdoor-kitchens",
      title: "Chef & Party Cooking",
      description: "Heavy-duty windproof cast iron wok stands easily support large heavy Nigerian cooking pots without bending.",
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

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
          {useCases.map((uc) => {
            const Icon = uc.icon;
            return (
              <div
                key={uc.id}
                className="bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-xl sm:rounded-2xl p-4 sm:p-5 transition-all hover:bg-slate-900 shadow-sm group flex flex-col justify-between"
              >
                <div>
                  <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-amber-400 mb-3 group-hover:scale-105 transition-transform">
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white mb-1.5 tracking-tight">
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
