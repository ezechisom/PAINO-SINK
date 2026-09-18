import React, { useState, useEffect } from 'react';
import { GalleryImage } from '../types';
import { ZoomIn, ChevronLeft, ChevronRight, X, Sparkles, Waves, Play, Pause, Thermometer } from 'lucide-react';

interface ImageGalleryProps {
  images: GalleryImage[];
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [isLiveTourActive, setIsLiveTourActive] = useState(true);
  const [simulatedTemp, setSimulatedTemp] = useState(38);

  const tags = [
    { id: 'all', label: 'All Photos' },
    { id: 'main', label: 'Main Sink' },
    { id: 'console', label: 'Piano Controls & LED' },
    { id: 'accessories', label: 'Workstation Ledge' },
    { id: 'lifestyle', label: 'Installed In Kitchen' },
    { id: 'unboxing', label: 'Full Package Box' },
  ];

  const filteredImages = selectedTag === 'all' 
    ? images 
    : images.filter(img => img.tag === selectedTag);

  const activeImage = filteredImages[currentIndex] || images[0];

  // Auto-tour live picture rotation
  useEffect(() => {
    if (!isLiveTourActive || filteredImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredImages.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isLiveTourActive, filteredImages.length]);

  // Simulated live water temp
  useEffect(() => {
    const tempInterval = setInterval(() => {
      setSimulatedTemp((prev) => (prev === 38 ? 39 : prev === 39 ? 37 : 38));
    }, 2800);
    return () => clearInterval(tempInterval);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? filteredImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === filteredImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="gallery-section" className="py-16 md:py-24 bg-[#0d121a] border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-amber-400 font-bold text-xs uppercase tracking-widest bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20 mb-3 inline-block">
            Visual Proof &amp; Inspection
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            SEE EVERY DETAIL OF THE SMART PIANO SINK
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Inspect the high-grade SUS304 nano-coated finish, digital temperature console, flying rain waterfall, and complete accessory workstation.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {tags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => {
                setSelectedTag(tag.id);
                setCurrentIndex(0);
              }}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedTag === tag.id
                  ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20 font-bold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* Main Display Frame — LIVE PICTURE */}
        <div className="max-w-4xl mx-auto mb-6">
          <div className="relative rounded-3xl overflow-hidden bg-slate-950 border-2 border-amber-500/40 shadow-2xl aspect-[16/10] sm:aspect-[16/9] group">
            
            {activeImage && (
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src={activeImage.url}
                  alt={activeImage.alt}
                  className="w-full h-full object-cover object-center cursor-zoom-in transition-transform duration-700 group-hover:scale-105"
                  onClick={() => setIsZoomOpen(true)}
                  referrerPolicy="no-referrer"
                />

                {/* Animated Light Shimmer and Water Sheen */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-cyan-300/15 to-transparent animate-live-shimmer" />
                </div>
              </div>
            )}

            {/* Overlay Badges */}
            <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2">
              <span className="bg-black/85 backdrop-blur-md border border-red-500/50 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                <span className="text-red-400 font-black">● LIVE INSPECTION</span>
              </span>

              <span className="bg-black/80 backdrop-blur-md border border-slate-700 text-amber-300 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{activeImage?.title || 'Genuine Product'}</span>
              </span>
            </div>

            {/* Top Right Controls (Live Tour + Zoom) */}
            <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
              <button
                onClick={() => setIsLiveTourActive(!isLiveTourActive)}
                className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-md border transition-all cursor-pointer ${
                  isLiveTourActive
                    ? 'bg-amber-500 text-black border-amber-400 shadow-md'
                    : 'bg-black/70 text-slate-300 border-slate-700 hover:text-white'
                }`}
                title="Toggle Live Camera Auto-Rotation"
              >
                {isLiveTourActive ? (
                  <>
                    <Pause className="w-3.5 h-3.5 fill-current" />
                    <span className="hidden sm:inline">Live Tour: ON</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span className="hidden sm:inline">Live Tour: PAUSED</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setIsZoomOpen(true)}
                className="bg-black/70 hover:bg-black/90 text-white p-2 sm:p-2.5 rounded-full backdrop-blur-md border border-slate-700 transition-colors cursor-pointer"
                title="Click to Zoom"
              >
                <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Navigation Arrows */}
            {filteredImages.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 text-white p-2.5 sm:p-3 rounded-full backdrop-blur-md border border-slate-700 transition-all opacity-80 hover:opacity-100 cursor-pointer z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleNext(); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 text-white p-2.5 sm:p-3 rounded-full backdrop-blur-md border border-slate-700 transition-all opacity-80 hover:opacity-100 cursor-pointer z-10"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </>
            )}

            {/* Bottom Caption Bar with Live Simulation Reading */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-4 sm:p-6 text-white flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2 z-10">
              <div>
                <h3 className="font-bold text-sm sm:text-lg text-white flex items-center gap-2">
                  <span>{activeImage?.title}</span>
                  {activeImage?.tag === 'console' && (
                    <span className="text-[11px] font-mono font-bold text-cyan-300 bg-cyan-950/80 border border-cyan-500/40 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Thermometer className="w-3 h-3 text-cyan-400" />
                      Live {simulatedTemp}°C
                    </span>
                  )}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  {activeImage?.subtitle}
                </p>
              </div>
              <span className="text-xs text-amber-400 font-mono bg-black/60 px-2.5 py-1 rounded-md border border-slate-800 shrink-0">
                {currentIndex + 1} / {filteredImages.length}
              </span>
            </div>

          </div>
        </div>

        {/* Thumbnail Carousel */}
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-3 overflow-x-auto py-2">
          {filteredImages.map((img, idx) => (
            <button
              key={img.id}
              onClick={() => setCurrentIndex(idx)}
              className={`relative rounded-xl overflow-hidden w-20 h-16 sm:w-28 sm:h-20 shrink-0 border-2 transition-all cursor-pointer ${
                currentIndex === idx
                  ? 'border-amber-400 scale-105 shadow-md shadow-amber-500/20'
                  : 'border-slate-800 opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={img.url}
                alt={img.alt}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </button>
          ))}
        </div>

      </div>

      {/* Lightbox Zoom Modal */}
      {isZoomOpen && activeImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setIsZoomOpen(false)}
        >
          <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setIsZoomOpen(false)}
              className="absolute -top-12 right-0 text-slate-400 hover:text-white p-2 cursor-pointer"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={activeImage.url}
              alt={activeImage.alt}
              className="max-h-[80vh] w-auto object-contain rounded-xl shadow-2xl border border-slate-800"
              onClick={(e) => e.stopPropagation()}
              referrerPolicy="no-referrer"
            />
            <div className="mt-3 text-center text-slate-300">
              <p className="font-bold text-white text-base">{activeImage.title}</p>
              <p className="text-xs text-slate-400">{activeImage.subtitle}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
