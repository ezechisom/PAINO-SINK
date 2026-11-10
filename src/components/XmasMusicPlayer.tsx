import React, { useState, useEffect } from 'react';
import { xmasMusic, CarolTrack } from '../utils/xmasMusic';
import { Music, Volume2, VolumeX, Play, Pause, SkipForward, SkipBack, X, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

interface XmasMusicPlayerProps {
  onToggleSnow?: () => void;
  isSnowing?: boolean;
}

export const XmasMusicPlayer: React.FC<XmasMusicPlayerProps> = ({
  onToggleSnow,
  isSnowing = true
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<CarolTrack>(xmasMusic.getState().track);
  const [volume, setVolume] = useState(xmasMusic.getVolume());
  const [isMuted, setIsMuted] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true); // Minimized by default for clean UX
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const unsubscribe = xmasMusic.subscribe((state) => {
      setIsPlaying(state.isPlaying);
      setCurrentTrack(state.track);
      setVolume(state.volume);
    });
    return unsubscribe;
  }, []);

  const handleTogglePlay = () => {
    setHasInteracted(true);
    xmasMusic.toggle();
  };

  const handleNext = () => {
    setHasInteracted(true);
    xmasMusic.nextTrack();
  };

  const handlePrev = () => {
    setHasInteracted(true);
    xmasMusic.prevTrack();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (val === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
    xmasMusic.setVolume(val);
  };

  const handleToggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      xmasMusic.setVolume(volume > 0 ? volume : 0.5);
    } else {
      setIsMuted(true);
      xmasMusic.setVolume(0);
    }
  };

  // Minimized Floating Pill Mode
  if (isMinimized) {
    return (
      <div className="fixed bottom-20 sm:bottom-6 left-3 sm:left-6 z-40 animate-fadeIn">
        <button
          type="button"
          onClick={() => {
            if (!hasInteracted && !isPlaying) {
              xmasMusic.play();
              setHasInteracted(true);
            }
            setIsMinimized(false);
          }}
          className={`group flex items-center gap-2 pl-2.5 pr-3 py-2 rounded-2xl border-2 shadow-2xl backdrop-blur-md transition-all transform hover:scale-105 active:scale-95 cursor-pointer ${
            isPlaying 
              ? 'bg-gradient-to-r from-[#0a192f]/95 via-emerald-950/90 to-[#0a192f]/95 text-white border-amber-400 ring-2 ring-amber-400/30' 
              : 'bg-[#0a192f]/95 hover:bg-[#0f2342] text-white border-emerald-500/60'
          }`}
          title="Click to open Gentle Xmas Music Player"
          aria-label="Gentle Christmas Music Player"
        >
          {/* Animated Music Note / Disc Icon */}
          <div className="relative w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shrink-0">
            <Music className={`w-4 h-4 text-amber-300 ${isPlaying ? 'animate-bounce' : 'group-hover:rotate-12 transition-transform'}`} />
            {isPlaying && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            )}
          </div>

          <div className="flex flex-col text-left">
            <span className="text-[10px] text-amber-300 font-black uppercase tracking-wider flex items-center gap-1">
              <span>🎄 Xmas Carol</span>
              {isPlaying && (
                <span className="text-[9px] text-emerald-300 font-bold">• Playing</span>
              )}
            </span>
            <span className="text-xs font-bold text-white max-w-[130px] sm:max-w-[170px] truncate">
              {isPlaying ? currentTrack.title.replace(' (Gentle Music Box)', '') : 'Tap to Play Music'}
            </span>
          </div>

          {/* Quick Play/Pause button on pill */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              handleTogglePlay();
            }}
            className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-amber-300 transition-colors"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 fill-amber-300" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-amber-300" />
            )}
          </div>

          <ChevronUp className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
        </button>
      </div>
    );
  }

  // Expanded Floating Player Mode
  return (
    <div className="fixed bottom-20 sm:bottom-6 left-3 sm:left-6 z-40 max-w-[320px] sm:max-w-xs w-full bg-[#0a192f]/95 backdrop-blur-md text-white border-2 border-amber-400/90 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.7)] p-3 sm:p-4 animate-slide-up transition-all">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-white/10">
        <div className="flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
          <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
          <span>GENTLE XMAS MUSIC BOX</span>
        </div>

        <div className="flex items-center gap-1">
          {onToggleSnow && (
            <button
              type="button"
              onClick={onToggleSnow}
              className={`p-1 rounded-lg text-xs transition-colors cursor-pointer ${
                isSnowing ? 'text-cyan-300 bg-cyan-950/60 border border-cyan-500/30' : 'text-slate-400 hover:text-white'
              }`}
              title={isSnowing ? 'Snowfall: Active' : 'Snowfall: Paused'}
            >
              ❄
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsMinimized(true)}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            title="Minimize Player"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Song Info & Animated Visualizer */}
      <div className="flex items-center gap-3 mb-3 bg-black/40 border border-amber-500/30 rounded-xl p-2.5">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/30 to-red-600/30 border border-amber-400/40 flex items-center justify-center shrink-0">
          <Music className={`w-5 h-5 text-amber-300 ${isPlaying ? 'animate-pulse' : ''}`} />
        </div>

        <div className="flex-1 min-w-0">
          <span className="text-[10px] text-amber-300/90 font-bold block uppercase tracking-wider">
            Acoustic Chime
          </span>
          <h4 className="text-xs sm:text-sm font-extrabold text-white truncate leading-tight">
            {currentTrack.title}
          </h4>
          <span className="text-[10px] text-slate-400 block mt-0.5">
            Soothing holiday lullaby
          </span>
        </div>

        {/* Animated Equalizer Wave Bars */}
        <div className="flex items-end gap-1 h-5 px-1 shrink-0">
          <span 
            className={`w-1 bg-amber-400 rounded-full transition-all duration-300 ${isPlaying ? 'animate-pulse' : 'h-1'}`} 
            style={{ height: isPlaying ? '16px' : '4px' }} 
          />
          <span 
            className={`w-1 bg-emerald-400 rounded-full transition-all duration-300 ${isPlaying ? 'animate-pulse' : 'h-1'}`} 
            style={{ height: isPlaying ? '12px' : '4px', animationDelay: '150ms' }} 
          />
          <span 
            className={`w-1 bg-amber-300 rounded-full transition-all duration-300 ${isPlaying ? 'animate-pulse' : 'h-1'}`} 
            style={{ height: isPlaying ? '18px' : '4px', animationDelay: '300ms' }} 
          />
          <span 
            className={`w-1 bg-red-400 rounded-full transition-all duration-300 ${isPlaying ? 'animate-pulse' : 'h-1'}`} 
            style={{ height: isPlaying ? '10px' : '4px', animationDelay: '450ms' }} 
          />
        </div>
      </div>

      {/* Main Controls: Prev, Play/Pause, Next */}
      <div className="flex items-center justify-center gap-3 mb-3">
        <button
          type="button"
          onClick={handlePrev}
          className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
          title="Previous Track"
          aria-label="Previous Christmas Song"
        >
          <SkipBack className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={handleTogglePlay}
          className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black shadow-lg shadow-amber-500/30 active:scale-95 transition-all cursor-pointer"
          title={isPlaying ? 'Pause Christmas Carol' : 'Play Christmas Carol'}
          aria-label={isPlaying ? 'Pause Music' : 'Play Music'}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 fill-slate-950" />
          ) : (
            <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
          )}
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
          title="Next Track"
          aria-label="Next Christmas Song"
        >
          <SkipForward className="w-4 h-4" />
        </button>
      </div>

      {/* Volume Slider & Mute */}
      <div className="flex items-center gap-2 pt-2 border-t border-white/10 text-slate-400">
        <button
          type="button"
          onClick={handleToggleMute}
          className="p-1 hover:text-white transition-colors cursor-pointer"
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted || volume === 0 ? (
            <VolumeX className="w-4 h-4 text-red-400" />
          ) : (
            <Volume2 className="w-4 h-4 text-amber-300" />
          )}
        </button>

        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          className="w-full accent-amber-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
          title="Adjust Volume"
          aria-label="Music volume slider"
        />

        <span className="text-[10px] font-mono font-bold text-slate-400 w-7 text-right">
          {Math.round((isMuted ? 0 : volume) * 100)}%
        </span>
      </div>
    </div>
  );
};
