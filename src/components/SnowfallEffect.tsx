import React, { useMemo } from 'react';

interface Snowflake {
  id: number;
  left: number; // percentage
  size: number; // pixels
  duration: number; // seconds
  delay: number; // seconds
  opacity: number;
}

interface DroppingTree {
  id: number;
  left: number; // percentage
  size: number; // font size in px
  duration: number; // seconds
  delay: number; // seconds
  opacity: number;
}

export const SnowfallEffect: React.FC<{ enabled?: boolean }> = ({ enabled = true }) => {
  const snowflakes: Snowflake[] = useMemo(() => {
    return Array.from({ length: 28 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 5 + 3, // 3px to 8px
      duration: Math.random() * 6 + 7, // 7s to 13s
      delay: Math.random() * 8, // 0s to 8s
      opacity: Math.random() * 0.45 + 0.35 // 0.35 to 0.8
    }));
  }, []);

  // Dropping Christmas Trees floating gently down like snow
  const droppingTrees: DroppingTree[] = useMemo(() => {
    return Array.from({ length: 14 }, (_, i) => ({
      id: i,
      left: (i * 7 + Math.random() * 5) % 100, // evenly distributed across screen width
      size: Math.random() * 10 + 16, // 16px to 26px
      duration: Math.random() * 6 + 9, // 9s to 15s gentle drop
      delay: Math.random() * 9, // 0s to 9s
      opacity: Math.random() * 0.35 + 0.55 // 0.55 to 0.9
    }));
  }, []);

  if (!enabled) return null;

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-20 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Soft Dropping Snowflakes */}
      {snowflakes.map((flake) => (
        <div
          key={`flake-${flake.id}`}
          className="absolute rounded-full bg-white animate-snow shadow-[0_0_4px_rgba(255,255,255,0.8)]"
          style={{
            left: `${flake.left}%`,
            top: '-20px',
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            opacity: flake.opacity,
            animationDuration: `${flake.duration}s`,
            animationDelay: `${flake.delay}s`
          }}
        />
      ))}

      {/* Dropping Christmas Trees */}
      {droppingTrees.map((tree) => (
        <div
          key={`tree-${tree.id}`}
          className="absolute animate-tree-drop filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.18)]"
          style={{
            left: `${tree.left}%`,
            top: '-40px',
            fontSize: `${tree.size}px`,
            opacity: tree.opacity,
            animationDuration: `${tree.duration}s`,
            animationDelay: `${tree.delay}s`,
            lineHeight: 1
          }}
        >
          <span className="inline-block transform hover:scale-125 transition-transform">
            🎄
          </span>
        </div>
      ))}
    </div>
  );
};
