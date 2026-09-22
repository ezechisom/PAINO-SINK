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
    <section id="specs-section" className="py-8 sm:py-16 bg-[#0b0f14]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
          <span className="text-amber-400 font-bold text-[11px] uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 mb-2 inline-block">
            Technical Specifications
          </span>
          <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
            DETAILED PRODUCT SPECIFICATIONS
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2">
            Measurements and structural data confirmed directly from factory engineering diagrams.
          </p>
        </div>

        {/* Specs Table / Grid */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden shadow-xl divide-y divide-slate-800/80">
          {config.specifications.map((spec, idx) => {
            const IconComponent = iconMap[spec.iconName] || Info;
            return (
              <div 
                key={idx}
                className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 hover:bg-slate-800/30 transition-colors"
              >
                <div className="flex items-center gap-3 sm:w-1/3">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700/80 flex items-center justify-center text-amber-400 shrink-0">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-white text-xs sm:text-sm">
                    {spec.feature}
                  </span>
                </div>

                <div className="sm:w-2/3 text-slate-300 text-xs sm:text-sm font-medium pl-11 sm:pl-0">
                  {spec.detail || "[ADD PRODUCT SPECIFICATION]"}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-slate-400">
          <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>Universal plumbing fit. Compatible with standard Nigerian countertop cutouts (75 × 45 cm).</span>
        </div>

      </div>
    </section>
  );
};
