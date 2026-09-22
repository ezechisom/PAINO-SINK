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
    <section id="features-section" className="py-8 sm:py-16 bg-[#0b0f14] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
          <span className="text-amber-400 font-bold text-[11px] uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 mb-2.5 inline-block">
            Verified Product Capabilities
          </span>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
            WHY THIS SMART PIANO SINK BELONGS IN YOUR KITCHEN
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-xl mx-auto leading-relaxed">
            Engineered to make everyday cooking, washing, and food preparation effortless and organized.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 mb-8 sm:mb-12">
          {config.features.map((feat) => {
            const IconComponent = iconMap[feat.iconName] || Sparkles;
            return (
              <div
                key={feat.id}
                className={`rounded-xl sm:rounded-2xl p-4 sm:p-5 transition-all duration-200 flex flex-col justify-between relative group ${
                  feat.highlight 
                    ? 'bg-gradient-to-b from-slate-900 to-[#121924] border border-amber-500/40 shadow-sm' 
                    : 'bg-slate-900/60 border border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                      feat.highlight ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-300'
                    }`}>
                      <IconComponent className="w-4.5 h-4.5" />
                    </div>

                    {feat.badge && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                        {feat.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-white mb-1.5 tracking-tight group-hover:text-amber-300 transition-colors">
                    {feat.title}
                  </h3>

                  <p className="text-slate-400 text-xs leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center gap-1 text-[11px] text-slate-400">
                  <Check className="w-3 h-3 text-blue-400" />
                  <span>Tested &amp; Confirmed</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
