import React, { useState, useEffect } from 'react';
import { CheckCircle2, ArrowRight, Truck, Package, PhoneCall, ShieldCheck, Sparkles, Zap, Thermometer, Waves, Droplets, Headphones } from 'lucide-react';
import { formatNaira } from '../config';
import { SiteConfig } from '../types';

interface HeroSectionProps {
  config: SiteConfig;
  onOrderClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ config, onOrderClick }) => {
  const savings = config.normalPrice - config.promoPrice;
  const [liveTemp, setLiveTemp] = useState(38);
  const [liveMode, setLiveMode] = useState<'waterfall' | 'faucet' | 'rinser'>('waterfall');

  // Gently cycle live digital water temperature display to simulate active running water
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveTemp(prev => (prev === 38 ? 39 : prev === 39 ? 37 : 38));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero-section" className="relative pt-6 pb-14 md:py-16 lg:py-20 overflow-hidden bg-gradient-to-b from-[#0f141c] via-[#0b0f14] to-[#0b0f14] border-b border-slate-800/80">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Mobile Header Order: Image first on mobile, text left / image right on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Mobile-Only LIVE Image block placed at top */}
          <div className="block lg:hidden order-1">
            <div className="relative rounded-2xl overflow-hidden border-2 border-amber-500/50 shadow-2xl bg-slate-900/80 group">
              {/* Live Status Badge */}
              <div className="absolute top-3 left-3 z-20 bg-black/85 backdrop-blur-md text-white font-extrabold text-[11px] tracking-wider uppercase px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1.5 border border-red-500/40">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                <span className="text-red-400 font-black">● LIVE DEMO</span>
                <span className="text-slate-300 border-l border-slate-700 pl-1.5">Flow Active</span>
              </div>

              {/* Digital Temperature Gauge (Live hydro-electric simulation) */}
              <div className="absolute top-3 right-3 z-20 bg-slate-950/90 backdrop-blur-md border border-cyan-500/40 text-cyan-300 font-mono font-bold text-xs px-2.5 py-1 rounded-lg shadow-lg flex items-center gap-1.5">
                <Thermometer className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>{liveTemp}°C</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              </div>

              {/* Product Image with Water Shimmer effect */}
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={config.productImages[0]?.url || "/images/smart_piano_sink_1789548024514.jpg"}
                  alt={config.productImages[0]?.alt || "Smart Kitchen Piano Sink"}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />

                {/* Animated Water Ripple / Sheen Overlay */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-cyan-400/15 to-transparent animate-live-shimmer" />
                </div>

                {/* Live Mode Visual Water Tag */}
                <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between gap-1.5 bg-black/85 backdrop-blur-md border border-slate-800 p-1.5 rounded-xl text-[11px]">
                  <button
                    type="button"
                    onClick={() => setLiveMode('waterfall')}
                    className={`flex-1 py-1 px-2 rounded-lg font-bold transition-all ${
                      liveMode === 'waterfall' ? 'bg-amber-500 text-black shadow-md' : 'text-slate-400'
                    }`}
                  >
                    🌧️ Waterfall
                  </button>
                  <button
                    type="button"
                    onClick={() => setLiveMode('faucet')}
                    className={`flex-1 py-1 px-2 rounded-lg font-bold transition-all ${
                      liveMode === 'faucet' ? 'bg-amber-500 text-black shadow-md' : 'text-slate-400'
                    }`}
                  >
                    🚰 Faucet
                  </button>
                  <button
                    type="button"
                    onClick={() => setLiveMode('rinser')}
                    className={`flex-1 py-1 px-2 rounded-lg font-bold transition-all ${
                      liveMode === 'rinser' ? 'bg-amber-500 text-black shadow-md' : 'text-slate-400'
                    }`}
                  >
                    🥤 Rinser
                  </button>
                </div>
              </div>

              <div className="p-2.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
                <span className="font-semibold text-amber-400 flex items-center gap-1">
                  <Waves className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  Live Hydro-Electric Console
                </span>
                <span className="text-[11px] text-emerald-400 font-bold">● Running Live</span>
              </div>
            </div>
          </div>

          {/* Text Content Block */}
          <div className="lg:col-span-7 order-2 lg:order-1 flex flex-col justify-center">
            
            {/* Attention Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-slate-700 text-amber-400 text-xs font-semibold tracking-wide uppercase mb-4 w-fit shadow-sm">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>Direct-From-Factory Exclusive In Nigeria</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-3">
              UPGRADE YOUR KITCHEN WITH A <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">SMART PIANO SINK</span>
            </h1>

            {/* Supporting line */}
            <p className="text-base sm:text-lg font-semibold text-amber-300/90 mb-3 tracking-wide">
              MORE THAN A SINK — A SMARTER WAY TO PREPARE, WASH &amp; ORGANIZE.
            </p>

            {/* Subheadline */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-5 max-w-2xl font-light">
              Transform your kitchen workspace with a modern multifunctional sink designed to combine style, convenience, and everyday functionality.
            </p>

            {/* Prominent Hydroelectric Temperature & Flow-Activated Light Callout */}
            <div className="bg-gradient-to-r from-blue-950/80 via-slate-900 to-amber-950/40 border border-blue-500/40 rounded-2xl p-4 mb-6 shadow-xl relative overflow-hidden">
              <div className="flex items-start sm:items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/40 flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 text-blue-400 animate-pulse" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-white font-bold text-sm sm:text-base tracking-wide flex items-center gap-1.5">
                      <Thermometer className="w-4 h-4 text-amber-400" />
                      Digital Temperature Display &amp; Flow-Activated Light
                    </span>
                    <span className="bg-blue-500/25 text-blue-300 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase border border-blue-500/40">
                      Hydroelectric Self-Powered
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                    Displays real-time water temperature in °C and running time, with an ambient glow light that <strong>automatically turns on the instant water flows through the sink</strong>. Powered 100% by internal water flow hydraulics — <span className="text-amber-300 font-semibold">no electrical socket, no wiring, and no batteries required!</span>
                  </p>
                </div>
              </div>
            </div>

            {/* 4 Short Benefit Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2.5 text-slate-200 text-sm font-medium">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Real-Time Digital Temp Display (°C)</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-200 text-sm font-medium">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Light Turns On Automatically With Water</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-200 text-sm font-medium">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>100% Hydroelectric (Zero Batteries)</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-200 text-sm font-medium">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Piano Key Independent Water Modes</span>
              </div>
            </div>

            {/* Pricing Snapshot in Hero */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-800/80 to-slate-900 border border-amber-500/30 rounded-2xl p-5 mb-6 shadow-xl relative overflow-hidden">
              <div className="absolute -right-8 -bottom-8 w-28 h-28 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />
              
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-2">
                <div className="text-slate-400 text-xs sm:text-sm font-medium uppercase tracking-wider">
                  Regular Price: <span className="line-through text-slate-500">{formatNaira(config.normalPrice)}</span>
                </div>
                {savings > 0 && (
                  <div className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold px-2.5 py-0.5 rounded-full">
                    YOU SAVE {formatNaira(savings)}
                  </div>
                )}
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-xs text-amber-300 font-semibold uppercase tracking-wider">Promo Price:</span>
                <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
                  {formatNaira(config.promoPrice)}
                </span>
                <span className="text-xs text-slate-400 hidden sm:inline">(Complete Set &amp; All Accessories)</span>
              </div>
            </div>

            {/* CTAs (Order Now + Customer Service) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-6">
              <button
                onClick={onOrderClick}
                id="hero-order-btn"
                className="flex-1 inline-flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-base py-4 px-6 sm:px-8 rounded-xl shadow-xl shadow-amber-500/25 hover:shadow-amber-500/35 transform active:scale-[0.98] transition-all cursor-pointer tracking-wide uppercase animate-action-blink"
              >
                <div className="flex flex-col items-center">
                  <span>ORDER NOW — PAYMENT ON DELIVERY</span>
                  <span className="text-[11px] font-bold text-black/80 normal-case tracking-normal">
                    {formatNaira(config.promoPrice)} &bull; Pay when you receive your sink
                  </span>
                </div>
                <ArrowRight className="w-5 h-5 shrink-0" />
              </button>

              <a
                href="#customer-service-section"
                id="hero-call-btn"
                className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-sm py-4 px-6 rounded-xl shadow-md transition-all transform active:scale-[0.98] cursor-pointer"
              >
                <Headphones className="w-4 h-4 text-amber-400" />
                <span>Customer Service</span>
              </a>
            </div>

            {/* Trust statements under CTA (Configurable) */}
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-800/80 text-slate-300 text-xs">
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-center sm:text-left">
                <Truck className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-medium truncate">{config.trustStatements.delivery}</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-center sm:text-left">
                <Package className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-medium truncate">{config.trustStatements.packaging}</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-center sm:text-left">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-medium truncate">{config.trustStatements.support}</span>
              </div>
            </div>

          </div>

          {/* Desktop Product Image on Right — LIVE PICTURE */}
          <div className="hidden lg:block lg:col-span-5 order-2">
            <div className="relative rounded-3xl overflow-hidden border-2 border-amber-500/50 shadow-2xl bg-slate-900 group">
              {/* Live Status Badge */}
              <div className="absolute top-4 left-4 z-20 bg-black/85 backdrop-blur-md text-white border border-red-500/50 font-bold text-xs tracking-wider uppercase px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                <span className="text-red-400 font-black">● LIVE DEMO</span>
                <span className="text-slate-300 border-l border-slate-700 pl-2">SUS304 Nano Steel</span>
              </div>

              {/* Real-time Digital Temperature Display Badge */}
              <div className="absolute top-4 right-4 z-20 bg-slate-950/95 backdrop-blur-md border border-cyan-400/50 text-cyan-300 font-mono font-extrabold text-xs px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span>WATER TEMP: {liveTemp}°C</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
              
              {/* Main Image Container with Live Shimmer & Water Ripple */}
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={config.productImages[0]?.url || "/images/smart_piano_sink_1789548024514.jpg"}
                  alt={config.productImages[0]?.alt || "Smart Kitchen Piano Sink"}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />

                {/* Animated Light Shimmer & Waterfall Reflection */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-cyan-300/15 to-transparent animate-live-shimmer" />
                </div>

                {/* Interactive Live Mode Selector overlay */}
                <div className="absolute bottom-4 left-4 right-4 z-20 bg-black/85 backdrop-blur-md border border-slate-800 p-2 rounded-2xl flex items-center justify-between gap-2 shadow-xl">
                  <button
                    type="button"
                    onClick={() => setLiveMode('waterfall')}
                    className={`flex-1 py-1.5 px-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      liveMode === 'waterfall'
                        ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                        : 'text-slate-400 hover:text-white bg-slate-900/80'
                    }`}
                  >
                    🌧️ Waterfall Stream
                  </button>
                  <button
                    type="button"
                    onClick={() => setLiveMode('faucet')}
                    className={`flex-1 py-1.5 px-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      liveMode === 'faucet'
                        ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                        : 'text-slate-400 hover:text-white bg-slate-900/80'
                    }`}
                  >
                    🚰 3-Way Faucet
                  </button>
                  <button
                    type="button"
                    onClick={() => setLiveMode('rinser')}
                    className={`flex-1 py-1.5 px-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      liveMode === 'rinser'
                        ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                        : 'text-slate-400 hover:text-white bg-slate-900/80'
                    }`}
                  >
                    🥤 Cup Rinser
                  </button>
                </div>
              </div>

              <div className="p-4 bg-slate-950/95 border-t border-slate-800">
                <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                  <span className="font-bold text-white text-sm flex items-center gap-1.5">
                    <Waves className="w-4 h-4 text-cyan-400 animate-pulse" />
                    Live Smart Multifunctional Piano Sink
                  </span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full text-[11px]">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    Live In-Stock
                  </span>
                </div>
                <p className="text-slate-400 text-xs">
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
