import React from 'react';
import { Utensils, Waves, CheckCircle } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: "01",
      title: "PREPARE",
      subtitle: "Nested Food Prep Surfaces",
      description: "Slide the solid wood cutting board and stainless prep basin onto the top built-in rails. Chop meat, poultry, and vegetables directly over the sink without transferring drippings onto your countertop.",
      icon: Utensils,
      color: "from-amber-500/20 to-amber-500/5",
      borderColor: "border-amber-500/30"
    },
    {
      number: "02",
      title: "WASH",
      subtitle: "Targeted Water Stream Modes",
      description: "Press the piano keys to activate the gentle Flying Rain waterfall for washing leaves, or pull out the 360° sprayer to clean heavy pots. Use the glass rinser to blast-clean cups with one single downward press.",
      icon: Waves,
      color: "from-blue-500/20 to-blue-500/5",
      borderColor: "border-blue-500/30"
    },
    {
      number: "03",
      title: "ORGANIZE",
      subtitle: "Effortless Drainage & Clean Deck",
      description: "Place freshly rinsed produce or utensils in the perforated colander to drip directly into the drain. Turn the deck-mounted rotary knob to drain the sink without ever getting your hands wet.",
      icon: CheckCircle,
      color: "from-blue-600/20 to-blue-600/5",
      borderColor: "border-blue-500/30"
    }
  ];

  return (
    <section id="how-it-works-section" className="py-16 md:py-24 bg-[#0d121a] border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-amber-400 font-bold text-xs uppercase tracking-widest bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20 mb-3 inline-block">
            Seamless Kitchen Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            HOW IT TRANSFORMS YOUR DAILY ROUTINE
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Three simple, ergonomic steps that turn messy cooking sessions into an organized, joyful kitchen experience.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className={`relative rounded-3xl bg-gradient-to-b ${step.color} bg-slate-900/80 border ${step.borderColor} p-8 flex flex-col justify-between shadow-xl group hover:border-amber-400/50 transition-all`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-4xl sm:text-5xl font-black text-white/20 font-display group-hover:text-amber-400/40 transition-colors">
                      {step.number}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-white mb-1 tracking-tight">
                    {step.title}
                  </h3>
                  <div className="text-xs font-semibold text-amber-400/90 uppercase tracking-wider mb-3">
                    {step.subtitle}
                  </div>

                  <p className="text-slate-300 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>Step {step.number} of 3 in the Smart System</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
