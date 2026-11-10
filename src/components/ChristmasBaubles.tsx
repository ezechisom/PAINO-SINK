import React, { useState } from 'react';
import { xmasMusic } from '../utils/xmasMusic';
import { Sparkles } from 'lucide-react';

interface BaubleItem {
  id: string;
  leftPercent: number; // Position across screen
  stringLength: number; // in pixels
  ballSize: number; // in pixels
  colorScheme: 'ruby' | 'sapphire' | 'gold' | 'emerald' | 'amber';
  animationClass: string;
  pattern: 'snowflake' | 'stars' | 'stripes' | 'diamonds';
  label: string;
}

const BAUBLES: BaubleItem[] = [
  {
    id: 'b1',
    leftPercent: 4,
    stringLength: 52,
    ballSize: 38,
    colorScheme: 'ruby',
    animationClass: 'animate-bauble-1',
    pattern: 'snowflake',
    label: 'Xmas Promo'
  },
  {
    id: 'b2',
    leftPercent: 18,
    stringLength: 74,
    ballSize: 42,
    colorScheme: 'gold',
    animationClass: 'animate-bauble-2',
    pattern: 'stars',
    label: '₦120K Unit'
  },
  {
    id: 'b3',
    leftPercent: 32,
    stringLength: 44,
    ballSize: 34,
    colorScheme: 'sapphire',
    animationClass: 'animate-bauble-3',
    pattern: 'diamonds',
    label: 'Paino Sink'
  },
  {
    id: 'b4',
    leftPercent: 68,
    stringLength: 48,
    ballSize: 36,
    colorScheme: 'emerald',
    animationClass: 'animate-bauble-1',
    pattern: 'snowflake',
    label: 'Cooker ₦160K'
  },
  {
    id: 'b5',
    leftPercent: 82,
    stringLength: 76,
    ballSize: 42,
    colorScheme: 'ruby',
    animationClass: 'animate-bauble-2',
    pattern: 'stripes',
    label: 'Holiday Deal'
  },
  {
    id: 'b6',
    leftPercent: 95,
    stringLength: 50,
    ballSize: 36,
    colorScheme: 'amber',
    animationClass: 'animate-bauble-3',
    pattern: 'stars',
    label: 'Free Lagos Delivery'
  }
];

export const ChristmasBaubles: React.FC = () => {
  const [activeSparkleId, setActiveSparkleId] = useState<string | null>(null);

  const handleBaubleClick = (b: BaubleItem, index: number) => {
    // Play gentle acoustic ornament chime
    xmasMusic.playOrnamentChime(1.0 + index * 0.12);

    // Show temporary sparkle burst
    setActiveSparkleId(b.id);
    setTimeout(() => {
      setActiveSparkleId((curr) => (curr === b.id ? null : curr));
    }, 1200);
  };

  return (
    <div 
      className="absolute top-0 inset-x-0 h-28 pointer-events-none z-30 overflow-hidden select-none"
      aria-hidden="true"
    >
      {BAUBLES.map((b, idx) => {
        // Color gradients for realistic 3D reflective glass baubles
        const colorStyles = {
          ruby: {
            bg: 'radial-gradient(circle at 35% 30%, #ff8080 0%, #dc2626 40%, #7f1d1d 95%)',
            highlight: 'radial-gradient(circle at 30% 25%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 60%)',
            glow: 'rgba(239, 68, 68, 0.45)',
            accent: '#fef08a'
          },
          gold: {
            bg: 'radial-gradient(circle at 35% 30%, #fef08a 0%, #eab308 45%, #854d0e 95%)',
            highlight: 'radial-gradient(circle at 30% 25%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 60%)',
            glow: 'rgba(234, 179, 8, 0.45)',
            accent: '#ffffff'
          },
          sapphire: {
            bg: 'radial-gradient(circle at 35% 30%, #93c5fd 0%, #2563eb 45%, #1e3a8a 95%)',
            highlight: 'radial-gradient(circle at 30% 25%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 60%)',
            glow: 'rgba(37, 99, 235, 0.45)',
            accent: '#e0f2fe'
          },
          emerald: {
            bg: 'radial-gradient(circle at 35% 30%, #86efac 0%, #16a34a 45%, #14532d 95%)',
            highlight: 'radial-gradient(circle at 30% 25%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 60%)',
            glow: 'rgba(22, 163, 74, 0.45)',
            accent: '#fef08a'
          },
          amber: {
            bg: 'radial-gradient(circle at 35% 30%, #fde68a 0%, #f59e0b 45%, #78350f 95%)',
            highlight: 'radial-gradient(circle at 30% 25%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 60%)',
            glow: 'rgba(245, 158, 11, 0.45)',
            accent: '#ffffff'
          }
        }[b.colorScheme];

        // Hide some baubles on very small screens to avoid cluttering mobile navigation
        const hideOnMobile = idx === 2 || idx === 3;

        return (
          <div
            key={b.id}
            className={`absolute top-0 pointer-events-auto cursor-pointer group ${hideOnMobile ? 'hidden md:block' : 'block'}`}
            style={{ left: `${b.leftPercent}%` }}
            onClick={() => handleBaubleClick(b, idx)}
            title={`Christmas Ornament: ${b.label} (Tap to chime!)`}
          >
            {/* Swinging container with top-center pivot */}
            <div className={`${b.animationClass} flex flex-col items-center group-hover:scale-110 transition-transform duration-300`}>
              
              {/* Golden hanging thread */}
              <div 
                className="w-[1.5px] bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600 shadow-xs"
                style={{ height: `${b.stringLength}px` }}
              />

              {/* Brass metallic ornament cap with hanging ring */}
              <div className="relative -mt-[1px] flex flex-col items-center">
                {/* Ring */}
                <div className="w-2.5 h-2 rounded-full border border-amber-300 -mb-1 bg-transparent" />
                {/* Cap */}
                <div className="w-4 h-2 bg-gradient-to-r from-amber-300 via-amber-100 to-amber-500 rounded-xs shadow-xs border-t border-amber-200" />
              </div>

              {/* 3D Glass Ornament Ball */}
              <div
                className="relative rounded-full transition-transform duration-200 shadow-lg active:scale-95"
                style={{
                  width: `${b.ballSize}px`,
                  height: `${b.ballSize}px`,
                  background: colorStyles.bg,
                  boxShadow: `0 4px 14px ${colorStyles.glow}, inset -2px -2px 6px rgba(0,0,0,0.5)`
                }}
              >
                {/* Glossy top-left 3D highlight */}
                <div 
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{ background: colorStyles.highlight }}
                />

                {/* Decorative Christmas Pattern */}
                <div className="absolute inset-0 flex items-center justify-center opacity-80 pointer-events-none">
                  {b.pattern === 'snowflake' && (
                    <span className="text-[11px] font-black leading-none drop-shadow-xs" style={{ color: colorStyles.accent }}>
                      ❄
                    </span>
                  )}
                  {b.pattern === 'stars' && (
                    <span className="text-[10px] font-black leading-none drop-shadow-xs" style={{ color: colorStyles.accent }}>
                      ✦
                    </span>
                  )}
                  {b.pattern === 'stripes' && (
                    <div className="w-full h-1 border-y border-dashed border-white/60 transform rotate-12" />
                  )}
                  {b.pattern === 'diamonds' && (
                    <span className="text-[9px] font-bold leading-none drop-shadow-xs" style={{ color: colorStyles.accent }}>
                      ❖
                    </span>
                  )}
                </div>

                {/* Bottom reflective glow rim */}
                <div className="absolute bottom-1 right-2 w-2 h-1 rounded-full bg-white/40 blur-[1px] pointer-events-none" />

                {/* Interactive Click Sparkles */}
                {activeSparkleId === b.id && (
                  <div className="absolute -inset-2 flex items-center justify-center pointer-events-none animate-ping">
                    <Sparkles className="w-8 h-8 text-amber-300" />
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
