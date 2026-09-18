import React from 'react';
import { SiteConfig } from '../types';
import { 
  Square, 
  Ruler, 
  Box, 
  Shield, 
  Palette, 
  Droplets, 
  Cpu, 
  PackageCheck, 
  Hammer, 
  RotateCw,
  Info
} from 'lucide-react';

interface SpecsSectionProps {
  config: SiteConfig;
}

export const SpecsSection: React.FC<SpecsSectionProps> = ({ config }) => {
  const iconMap: Record<string, React.ElementType> = {
    Square,
    Ruler,
    Box,
    Shield,
    Palette,
    Droplets,
    Cpu,
    PackageCheck,
    Hammer,
    RotateCw,
  };

  return (
    <section id="specs-section" className="py-16 md:py-24 bg-[#0b0f14]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-amber-400 font-bold text-xs uppercase tracking-widest bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20 mb-3 inline-block">
            Technical Specifications
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            DETAILED PRODUCT SPECIFICATIONS
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Accurate measurements and structural data confirmed directly from factory engineering diagrams.
          </p>
        </div>

        {/* Specs Table / Grid */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl divide-y divide-slate-800/80">
          {config.specifications.map((spec, idx) => {
            const IconComponent = iconMap[spec.iconName] || Info;
            return (
              <div 
                key={idx}
                className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-800/30 transition-colors"
              >
                <div className="flex items-center gap-3.5 sm:w-1/3">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700/80 flex items-center justify-center text-amber-400 shrink-0">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-white text-sm sm:text-base">
                    {spec.feature}
                  </span>
                </div>

                <div className="sm:w-2/3 text-slate-300 text-xs sm:text-sm font-medium pl-13 sm:pl-0">
                  {spec.detail || "[ADD PRODUCT SPECIFICATION]"}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
          <Info className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Need custom plumbing or sizing advice? Contact our technical team for assistance.</span>
        </div>

      </div>
    </section>
  );
};
