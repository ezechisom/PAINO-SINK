import React from 'react';
import { Utensils, Waves, CheckCircle, Sparkles } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: "01",
      title: "PREP ON SLIDING LEDGES",
      subtitle: "Multi-Tier Dual Track",
      description: "Slide the solid wood cutting board and stainless colander directly across the sink ledge to chop, rinse, and prep without taking up dry counter space.",
      icon: Utensils,
      color: "from-blue-500/20 to-blue-500/5",
      borderColor: "border-blue-500/30"
    },
    {
      number: "02",
      title: "PIANO KEYS & WATERFALL",
      subtitle: "Tactile Valves + LED Temp",
      description: "Press mechanical piano buttons to switch between gentle flying rain waterfall and 3-mode pull-out sprayer while the hydroelectric screen shows real-time °C.",
      icon: Waves,
      color: "from-amber-500/20 to-amber-500/5",
      borderColor: "border-amber-500/30"
    },
    {
      number: "03",
      title: "2-SEC CUP WASH & DRAIN",
      subtitle: "High-Pressure Rinser",
      description: "Invert drinking glasses over the cup rinser for an instant multi-angle high-pressure blast, then turn the rotary knob to drain the vortex basin effortlessly.",
      icon: Sparkles,
      color: "from-emerald-500/20 to-emerald-500/5",
      borderColor: "border-emerald-500/30"
    }
  ];

  return (
    <section id="how-it-works-section" className="py-8 sm:py-16 bg-[#0d121a] border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
          <span className="text-amber-400 font-bold text-[11px] uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 mb-2 inline-block">
            Seamless Kitchen Workflow
          </span>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
            HOW IT TRANSFORMS YOUR DAILY ROUTINE
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2">
            Three simple ergonomic steps that turn cooking and washing into an organized, effortless experience.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className={`relative rounded-2xl bg-gradient-to-b ${step.color} bg-slate-900/80 border ${step.borderColor} p-5 sm:p-6 flex flex-col justify-between shadow-md group hover:border-amber-400/50 transition-all`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl sm:text-4xl font-black text-white/20 font-display group-hover:text-amber-400/40 transition-colors">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-black text-white mb-0.5 tracking-tight">
                    {step.title}
                  </h3>
                  <div className="text-[11px] font-semibold text-amber-400/90 uppercase tracking-wider mb-2">
                    {step.subtitle}
                  </div>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>Step {step.number} of 3 in the Smart Workstation System</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
