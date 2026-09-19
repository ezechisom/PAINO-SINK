import React from 'react';
import { CheckCircle2, ArrowRight, Truck, Package, ShieldCheck, Zap, Thermometer, Waves } from 'lucide-react';
import { formatNaira } from '../config';
import { SiteConfig } from '../types';

interface HeroSectionProps {
  config: SiteConfig;
  onOrderClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ config, onOrderClick }) => {
  const savings = config.normalPrice - config.promoPrice;

  return (
    <section id="hero-section" className="relative pt-6 pb-14 md:py-16 lg:py-20 overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-slate-50 border-b border-slate-200/80">
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Mobile Header Order: Image first on mobile, text left / image right on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Mobile-Only Product Image placed at top */}
          <div className="block lg:hidden order-1">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-white group">
              {/* Product Badge */}
              <div className="absolute top-3 left-3 z-10 bg-[#0a192f]/90 backdrop-blur-md text-white font-bold text-[11px] tracking-wide px-3 py-1 rounded-full shadow-sm border border-slate-700 flex items-center gap-1.5">
                <span className="text-blue-400 font-extrabold">SUS304</span>
                <span className="text-slate-200">75 × 46 cm</span>
              </div>

              {/* Product Image */}
              <div className="relative overflow-hidden aspect-[4/3] bg-slate-100">
                <img
                  src={config.productImages[0]?.url || "/images/smart_piano_sink_1789548024514.jpg"}
                  alt={config.productImages[0]?.alt || "Smart Kitchen Piano Sink"}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-3 bg-white border-t border-slate-100 flex items-center justify-between text-xs text-slate-700">
                <span className="font-bold text-[#0a192f] flex items-center gap-1.5">
                  <Waves className="w-3.5 h-3.5 text-blue-600" />
                  Multifunctional Piano Sink Set
                </span>
                <span className="text-[11px] text-blue-700 font-bold bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                  Full Set Included
                </span>
              </div>
            </div>
          </div>

          {/* Text Content Block */}
          <div className="lg:col-span-7 order-2 lg:order-1 flex flex-col justify-center">
            
            {/* Attention Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0a192f] text-xs font-bold tracking-wide uppercase mb-4 w-fit shadow-xs">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span>Factory Direct In Nigeria &bull; Premium Quality</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0a192f] tracking-tight leading-[1.15] mb-3">
              UPGRADE YOUR KITCHEN WITH A <span className="text-blue-900 underline decoration-blue-600 decoration-4 underline-offset-4">SMART PIANO SINK</span>
            </h1>

            {/* Supporting line */}
            <p className="text-base sm:text-lg font-bold text-slate-700 mb-3 tracking-wide">
              MORE THAN A SINK — A SMARTER WAY TO PREPARE, WASH &amp; ORGANIZE.
            </p>

            {/* Subheadline */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-5 max-w-2xl">
              Transform your kitchen workspace with a modern multifunctional sink designed to combine style, convenience, and everyday functionality.
            </p>

            {/* Prominent Hydroelectric Temperature & Flow-Activated Light Callout */}
            <div className="bg-gradient-to-r from-blue-50 via-white to-blue-50/50 border border-blue-200 rounded-2xl p-4 mb-6 shadow-xs relative overflow-hidden">
              <div className="flex items-start sm:items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-[#0a192f] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Zap className="w-5 h-5 text-blue-400 animate-pulse" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-[#0a192f] font-bold text-sm sm:text-base tracking-wide flex items-center gap-1.5">
                      <Thermometer className="w-4 h-4 text-blue-600" />
                      Digital Temperature Display &amp; Flow-Activated Light
                    </span>
                    <span className="bg-blue-100 text-blue-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase border border-blue-300">
                      Hydroelectric Self-Powered
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Displays real-time water temperature in °C and running time, with an ambient glow light that <strong>automatically turns on the instant water flows through the sink</strong>. Powered 100% by internal water flow hydraulics — <span className="text-blue-700 font-bold">no electrical socket, no wiring, and no batteries required!</span>
                  </p>
                </div>
              </div>
            </div>

            {/* 4 Short Benefit Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2.5 text-slate-800 text-sm font-medium">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                <span>Real-Time Digital Temp Display (°C)</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-800 text-sm font-medium">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                <span>Light Turns On Automatically With Water</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-800 text-sm font-medium">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                <span>100% Hydroelectric (Zero Batteries)</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-800 text-sm font-medium">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                <span>Piano Key Independent Water Modes</span>
              </div>
            </div>

            {/* Pricing Snapshot in Hero */}
            <div className="bg-white border border-blue-100 rounded-2xl p-5 mb-6 shadow-md relative overflow-hidden">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-2">
                <div className="text-slate-500 text-xs sm:text-sm font-medium uppercase tracking-wider">
                  Regular Price: <span className="line-through text-slate-400 font-semibold">{formatNaira(config.normalPrice)}</span>
                </div>
                {savings > 0 && (
                  <div className="bg-blue-50 text-blue-700 border border-blue-200 text-xs font-extrabold px-2.5 py-0.5 rounded-full">
                    YOU SAVE {formatNaira(savings)}
                  </div>
                )}
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Promo Price:</span>
                <span className="text-3xl sm:text-4xl font-extrabold text-[#0a192f] tracking-tight font-mono">
                  {formatNaira(config.promoPrice)}
                </span>
                <span className="text-xs text-slate-500 hidden sm:inline">(Complete Set &amp; All Accessories)</span>
              </div>
            </div>

            {/* Hero Order CTA */}
            <div className="mb-6">
              <button
                onClick={onOrderClick}
                id="hero-order-btn"
                className="w-full inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-base py-4 px-6 sm:px-8 rounded-xl shadow-xl shadow-blue-600/25 hover:shadow-blue-600/35 transform active:scale-[0.98] transition-all cursor-pointer tracking-wide uppercase animate-action-blink"
              >
                <div className="flex flex-col items-center">
                  <span>ORDER NOW — PAYMENT ON DELIVERY</span>
                  <span className="text-[11px] font-bold text-white/90 normal-case tracking-normal">
                    {formatNaira(config.promoPrice)} &bull; Pay when you receive your sink
                  </span>
                </div>
                <ArrowRight className="w-5 h-5 shrink-0" />
              </button>
            </div>

            {/* Trust statements under CTA */}
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-200 text-slate-600 text-xs">
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-center sm:text-left">
                <Truck className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="font-medium truncate">{config.trustStatements.delivery}</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-center sm:text-left">
                <Package className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="font-medium truncate">{config.trustStatements.packaging}</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-center sm:text-left">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="font-medium truncate">{config.trustStatements.support}</span>
              </div>
            </div>

          </div>

          {/* Desktop Product Image on Right */}
          <div className="hidden lg:block lg:col-span-5 order-2">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-white group">
              {/* Product Badge */}
              <div className="absolute top-4 left-4 z-20 bg-[#0a192f]/90 backdrop-blur-md text-white border border-slate-700 font-bold text-xs tracking-wide px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-2">
                <span className="text-blue-400 font-extrabold">SUS304 NANO STEEL</span>
                <span className="text-slate-300 border-l border-slate-700 pl-2">75 × 46 cm</span>
              </div>

              {/* Genuine Factory Direct Tag */}
              <div className="absolute top-4 right-4 z-20 bg-white/95 backdrop-blur-md border border-slate-200 text-[#0a192f] text-xs px-3 py-1.5 rounded-xl shadow-md flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span className="font-bold">Factory Inspected</span>
              </div>
              
              {/* Main Image Container */}
              <div className="relative overflow-hidden aspect-[4/3] bg-slate-100">
                <img
                  src={config.productImages[0]?.url || "/images/smart_piano_sink_1789548024514.jpg"}
                  alt={config.productImages[0]?.alt || "Smart Kitchen Piano Sink"}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-4 bg-white border-t border-slate-100">
                <div className="flex items-center justify-between text-xs text-slate-700 mb-1">
                  <span className="font-bold text-[#0a192f] text-sm flex items-center gap-1.5">
                    <Waves className="w-4 h-4 text-blue-600" />
                    Multifunctional Piano Sink Workstation
                  </span>
                  <span className="text-blue-700 font-bold flex items-center gap-1.5 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full text-[11px]">
                    In Stock &bull; Ships Nationwide
                  </span>
                </div>
                <p className="text-slate-500 text-xs">
                  Includes Piano Console with Digital Temp (°C) &amp; Water-Flow Light, Waterfall, Pull-Out Faucet, Cutting Board, Colander &amp; Full Plumbing Kit.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
