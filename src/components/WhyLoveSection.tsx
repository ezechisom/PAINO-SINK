import React from 'react';
import { SiteConfig } from '../types';
import { 
  Sliders, 
  Gauge, 
  Waves, 
  Maximize2, 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  Droplet,
  Check,
  ArrowRight
} from 'lucide-react';

interface WhyLoveSectionProps {
  config: SiteConfig;
  onOrderClick: () => void;
}

export const WhyLoveSection: React.FC<WhyLoveSectionProps> = ({ config, onOrderClick }) => {
  const iconMap: Record<string, React.ElementType> = {
    Sliders,
    Gauge,
    Waves,
    Maximize2,
    Sparkles,
    Layers,
    ShieldCheck,
    Droplet,
  };

  return (
    <section id="features-section" className="py-16 md:py-24 bg-[#0b0f14] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <span className="text-amber-400 font-bold text-xs uppercase tracking-widest bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20 mb-3 inline-block">
            Verified Product Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            WHY THIS SMART PIANO SINK BELONGS IN YOUR KITCHEN
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
            Every button, water stream, and nested accessory has been intentionally engineered to simplify everyday Nigerian kitchen cooking, washing, and meal preparation.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {config.features.map((feat) => {
            const IconComponent = iconMap[feat.iconName] || Sparkles;
            return (
              <div
                key={feat.id}
                className={`rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between relative group ${
                  feat.highlight 
                    ? 'bg-gradient-to-b from-slate-900 to-[#121924] border border-amber-500/40 shadow-lg shadow-amber-500/5' 
                    : 'bg-slate-900/60 border border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      feat.highlight ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-300'
                    }`}>
                      <IconComponent className="w-6 h-6" />
                    </div>

                    {feat.badge && (
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                        {feat.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2.5 tracking-tight group-hover:text-amber-300 transition-colors">
                    {feat.title}
                  </h3>

                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-1.5 text-xs text-slate-400">
                  <Check className="w-3.5 h-3.5 text-blue-400" />
                  <span>Tested &amp; Confirmed</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mid-page conversion callout */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700/80 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h4 className="text-xl font-bold text-white mb-1">
              Ready to upgrade your daily kitchen experience?
            </h4>
            <p className="text-slate-300 text-xs sm:text-sm">
              Get the genuine Smart Kitchen Piano Sink delivered securely to your doorstep anywhere in Nigeria.
            </p>
          </div>
          <button
            onClick={onOrderClick}
            className="shrink-0 inline-flex items-center justify-center gap-2.5 bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-sm py-3.5 px-6 rounded-xl shadow-lg transition-transform active:scale-[0.98] uppercase tracking-wider cursor-pointer"
          >
            <span>ORDER TODAY</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
