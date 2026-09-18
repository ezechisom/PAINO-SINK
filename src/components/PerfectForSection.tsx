import React from 'react';
import { Home, Building2, Sparkles, Hammer, Hotel, Building } from 'lucide-react';

export const PerfectForSection: React.FC = () => {
  const useCases = [
    {
      id: "family-homes",
      title: "Family Homes",
      description: "Ideal for busy households preparing hearty family meals. Deep basin accommodates oversized stock pots, while the food-prep accessories keep counter space tidy.",
      icon: Home
    },
    {
      id: "apartments",
      title: "Apartments",
      description: "When countertop real estate is at a premium, the sliding workstation accessories let you wash, prep, and drain over the sink to maximize your kitchen space.",
      icon: Building2
    },
    {
      id: "new-homes",
      title: "New Home Construction",
      description: "Add a striking designer focal point to your brand-new kitchen island. Elevates the resale and appraised luxury feel of modern residential builds.",
      icon: Sparkles
    },
    {
      id: "renovations",
      title: "Kitchen Renovations",
      description: "Instantly upgrade from outdated chrome or stained ceramic sinks. Compatible with standard 750x450mm cutouts in granite, quartz, or solid surfaces.",
      icon: Hammer
    },
    {
      id: "shortlets",
      title: "Shortlet & Airbnb Properties",
      description: "Impression matters for premium short-stay rentals in Lagos, Abuja, and Port Harcourt. Guests love the modern piano keys and high-tech digital display.",
      icon: Hotel
    },
    {
      id: "executive-offices",
      title: "Executive Offices & Lounges",
      description: "Sophisticated executive kitchenettes and board lounges where clean aesthetics, quick cup rinsing, and dedicated filtered drinking water are valued.",
      icon: Building
    }
  ];

  return (
    <section id="perfect-for-section" className="py-16 md:py-20 bg-[#0b0f14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-amber-400 font-bold text-xs uppercase tracking-widest bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20 mb-3 inline-block">
            Universal Architectural Fit
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            PERFECT FOR MODERN KITCHENS
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Designed to fit seamlessly into diverse Nigerian residential and executive kitchen layouts.
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((uc) => {
            const Icon = uc.icon;
            return (
              <div
                key={uc.id}
                className="bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 transition-all hover:bg-slate-900 shadow-md group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
                    {uc.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
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
