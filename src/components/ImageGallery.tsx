import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { GalleryImage } from '../types';
import { ALL_GALLERY_IMAGES } from '../data/galleryImages';
import { formatNaira } from '../config';
import { 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Sparkles, 
  Flame, 
  Zap, 
  Waves, 
  Layers, 
  ShoppingBag, 
  Maximize2,
  FileText,
  ArrowRight,
  CheckCircle2,
  Sliders
} from 'lucide-react';

interface ImageGalleryProps {
  images?: GalleryImage[];
  onOrderClick?: (productId?: string) => void;
  onViewSpecs?: (productId: string) => void;
  onQuickOrderClick?: (productId?: string) => void;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ 
  images = ALL_GALLERY_IMAGES,
  onOrderClick,
  onViewSpecs,
  onQuickOrderClick 
}) => {
  const [selectedProduct, setSelectedProduct] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  // Filter gallery items by product first
  const productFilteredImages = useMemo(() => {
    if (selectedProduct === 'all') return images;
    return images.filter(img => img.productId === selectedProduct);
  }, [images, selectedProduct]);

  // Derive available tags for current product filter
  const availableTags = useMemo(() => {
    const tagsSet = new Set<string>();
    productFilteredImages.forEach(img => {
      if (img.tag) tagsSet.add(img.tag);
    });
    return Array.from(tagsSet);
  }, [productFilteredImages]);

  // Filter by tag if selected
  const filteredImages = useMemo(() => {
    if (selectedTag === 'all') return productFilteredImages;
    return productFilteredImages.filter(img => img.tag === selectedTag);
  }, [productFilteredImages, selectedTag]);

  // Ensure current index is within bounds
  const activeImage = filteredImages[currentIndex] || filteredImages[0] || images[0];

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? filteredImages.length - 1 : prev - 1));
  }, [filteredImages.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= filteredImages.length - 1 ? 0 : prev + 1));
  }, [filteredImages.length]);

  // Keyboard navigation for carousel & zoom modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'Escape') {
        setIsZoomOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  const handleProductTabChange = (prodId: string) => {
    setSelectedProduct(prodId);
    setSelectedTag('all');
    setCurrentIndex(0);
  };

  const handleOrderTarget = (productId?: string) => {
    if (onOrderClick) {
      onOrderClick(productId);
    } else {
      const el = document.getElementById('order-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickOrderTarget = (productId?: string) => {
    const targetId = productId || activeImage?.productId || 'sink';
    if (onQuickOrderClick) {
      onQuickOrderClick(targetId);
    } else {
      handleOrderTarget(targetId);
    }
  };

  const handleSpecsTarget = (productId?: string) => {
    const targetId = productId || activeImage?.productId || 'cooker-2burner';
    if (onViewSpecs) {
      onViewSpecs(targetId);
    } else if (targetId === 'sink') {
      const el = document.getElementById('specs-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Product counts
  const totalCount = images.length;
  const sinkCount = images.filter(i => i.productId === 'sink').length;
  const cooker2bCount = images.filter(i => i.productId === 'cooker-2burner').length;
  const cooker5bCount = images.filter(i => i.productId === 'cooker-5burner').length;

  return (
    <section id="gallery-section" className="py-8 sm:py-16 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-5 sm:mb-8">
          <div className="inline-flex items-center gap-1 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full text-[11px] font-bold text-blue-800 uppercase tracking-widest mb-2">
            <Sparkles className="w-3 h-3 text-blue-600" />
            <span>High-Definition Visual Gallery</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-[#0a192f] tracking-tight leading-tight">
            Explore All 3 Kitchen Appliances
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1.5">
            Inspect every angle, finish, and dimension for our Smart Piano Sink and companion kitchen appliances.
          </p>
        </div>

        {/* 1. Main Product Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-5">
          <button
            type="button"
            onClick={() => handleProductTabChange('all')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
              selectedProduct === 'all'
                ? 'bg-[#0a192f] text-white border-[#0a192f] shadow-md'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-4 h-4 text-blue-400" />
            <span>All Appliances ({totalCount})</span>
          </button>

          <button
            type="button"
            onClick={() => handleProductTabChange('sink')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
              selectedProduct === 'sink'
                ? 'bg-[#0a192f] text-white border-[#0a192f] shadow-md'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
            }`}
          >
            <Waves className="w-4 h-4 text-blue-400" />
            <span>Smart Piano Sink ({sinkCount})</span>
          </button>

          <button
            type="button"
            onClick={() => handleProductTabChange('cooker-2burner')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
              selectedProduct === 'cooker-2burner'
                ? 'bg-[#0a192f] text-white border-[#0a192f] shadow-md'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
            }`}
          >
            <Flame className="w-4 h-4 text-blue-400" />
            <span>2-Flip Gas Cooker ({cooker2bCount})</span>
          </button>

          <button
            type="button"
            onClick={() => handleProductTabChange('cooker-5burner')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
              selectedProduct === 'cooker-5burner'
                ? 'bg-[#0a192f] text-white border-[#0a192f] shadow-md'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
            }`}
          >
            <Zap className="w-4 h-4 text-blue-400" />
            <span>5-Burner Hybrid ({cooker5bCount})</span>
          </button>
        </div>

        {/* 2. Secondary Tag Filter */}
        {availableTags.length > 1 && (
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-3 mb-5 no-scrollbar text-xs">
            <button
              type="button"
              onClick={() => { setSelectedTag('all'); setCurrentIndex(0); }}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                selectedTag === 'all'
                  ? 'bg-slate-800 text-white font-bold'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              All Views
            </button>
            {availableTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => { setSelectedTag(tag); setCurrentIndex(0); }}
                className={`px-3 py-1 rounded-full whitespace-nowrap transition-all cursor-pointer ${
                  selectedTag === tag
                    ? 'bg-slate-800 text-white font-bold'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* 3. Main Showcase Photo Frame */}
        <div className="max-w-4xl mx-auto mb-6">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-xl group">
            
            {/* Image Container with Zoom On Click */}
            <div 
              className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden cursor-zoom-in bg-slate-100"
              onClick={() => setIsZoomOpen(true)}
            >
              {activeImage ? (
                <img
                  src={activeImage.url}
                  alt={activeImage.alt}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-slate-400">
                  Image loading...
                </div>
              )}

              {/* Product Badge (Top Left) */}
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10 flex flex-wrap items-center gap-2">
                <span className="bg-[#0a192f]/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full border border-slate-700 shadow-md flex items-center gap-1.5">
                  {activeImage?.productId === 'sink' ? (
                    <Waves className="w-3.5 h-3.5 text-blue-400" />
                  ) : activeImage?.productId === 'cooker-2burner' ? (
                    <Flame className="w-3.5 h-3.5 text-blue-400" />
                  ) : (
                    <Zap className="w-3.5 h-3.5 text-blue-400" />
                  )}
                  <span>{activeImage?.badge || activeImage?.productName}</span>
                </span>

                {activeImage?.dimensions && (
                  <span className="hidden sm:inline-flex bg-white/90 backdrop-blur-md text-slate-700 text-xs font-mono font-semibold px-2.5 py-1.5 rounded-full border border-slate-200 shadow-xs">
                    {activeImage.dimensions}
                  </span>
                )}
              </div>

              {/* Top Right Zoom Button */}
              <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10 flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsZoomOpen(true);
                  }}
                  className="bg-white/90 hover:bg-white text-slate-800 p-2 rounded-full backdrop-blur-md border border-slate-200 transition-colors shadow-md cursor-pointer"
                  title="Click to view full-screen image"
                >
                  <Maximize2 className="w-4 h-4 text-[#0a192f]" />
                </button>
              </div>

              {/* Navigation Arrows on Image */}
              {filteredImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrev();
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-800 p-2.5 sm:p-3 rounded-full backdrop-blur-md border border-slate-200 transition-all opacity-90 hover:opacity-100 shadow-md cursor-pointer z-10"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-800 p-2.5 sm:p-3 rounded-full backdrop-blur-md border border-slate-200 transition-all opacity-90 hover:opacity-100 shadow-md cursor-pointer z-10"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Interactive Quick Action Overlay on Image */}
              <div className="absolute bottom-3 right-3 z-10 flex flex-wrap items-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSpecsTarget(activeImage?.productId);
                  }}
                  className="inline-flex items-center gap-1.5 bg-[#0a192f]/90 hover:bg-[#0a192f] text-white text-[11px] sm:text-xs font-bold px-3 py-1.5 rounded-full border border-slate-600 shadow-lg backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  title="Click to view complete technical specs"
                >
                  <Sliders className="w-3.5 h-3.5 text-blue-400" />
                  <span>Click for Specs</span>
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleQuickOrderTarget(activeImage?.productId);
                  }}
                  className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 text-[11px] sm:text-xs font-black px-3.5 py-1.5 rounded-full shadow-lg border border-amber-300 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  title="Open Quick Order Pop Up for this product"
                >
                  <Zap className="w-3.5 h-3.5 fill-slate-950" />
                  <span>⚡ Quick Order</span>
                </button>
              </div>
            </div>

            {/* Bottom Caption Bar */}
            <div className="p-4 sm:p-6 bg-white border-t border-slate-200 text-slate-800">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {activeImage?.productName}
                    </span>
                    <span className="text-slate-300">&bull;</span>
                    <span className="text-xs text-slate-500 font-mono">
                      Photo {currentIndex + 1} of {filteredImages.length}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#0a192f] leading-snug">
                    {activeImage?.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {activeImage?.subtitle}
                  </p>
                </div>

                {/* Price Display */}
                {activeImage?.price && (
                  <div className="flex sm:flex-col items-center sm:items-end justify-between gap-1 pt-3 md:pt-0 border-t md:border-0 border-slate-100 shrink-0">
                    <span className="text-[11px] text-slate-500 uppercase block font-semibold">Special Promo Price</span>
                    <span className="text-lg sm:text-xl font-extrabold text-[#0a192f] font-mono">
                      {formatNaira(activeImage.price)}
                    </span>
                  </div>
                )}
              </div>

              {/* Dedicated Burner / Sink Specs & Order Actions Card */}
              <div className="mt-4 pt-4 border-t border-slate-200">
                <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col lg:flex-row lg:items-center justify-between gap-3.5">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-extrabold text-[#0a192f] uppercase tracking-wide flex items-center gap-1.5">
                        <Sliders className="w-3.5 h-3.5 text-blue-600" />
                        <span>Specifications &amp; Fit:</span>
                      </span>
                      <span className="font-mono text-xs font-bold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {activeImage?.dimensions || 'Standard Countertop Fit'}
                      </span>
                      {activeImage?.productId === 'cooker-2burner' && (
                        <span className="text-xs font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          Cutout: 650 × 350 mm
                        </span>
                      )}
                      {activeImage?.productId === 'cooker-5burner' && (
                        <span className="text-xs font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          Cutout: 830 × 470 mm
                        </span>
                      )}
                      {activeImage?.productId === 'sink' && (
                        <span className="text-xs font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          Cutout: 720 × 420 mm
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] sm:text-xs text-slate-600">
                      {activeImage?.productId === 'cooker-2burner' ? (
                        <span>✨ 90° flip-up burners for 5-second wipe downs • 0–180m mechanical auto shut-off timer • Pure blue flames</span>
                      ) : activeImage?.productId === 'cooker-5burner' ? (
                        <span>⚡ 4 gas burners + central 2000W radiant electric zone (dual-fuel reliability) • Digital touch controls</span>
                      ) : (
                        <span>💧 Hydroelectric LED temperature display • Piano key controls • Pull-out spray faucet + cup washer</span>
                      )}
                    </p>
                  </div>

                  {/* Action Buttons: Specs, Quick Order Pop-Up, and Fill Form */}
                  <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleSpecsTarget(activeImage?.productId)}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-800 bg-white border border-slate-300 hover:bg-slate-100 transition-all shadow-xs cursor-pointer active:scale-95"
                    >
                      <FileText className="w-3.5 h-3.5 text-blue-600" />
                      <span>See Specs</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleQuickOrderTarget(activeImage?.productId)}
                      className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black text-slate-950 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 transition-all shadow-sm cursor-pointer active:scale-95 whitespace-nowrap"
                    >
                      <Zap className="w-3.5 h-3.5 fill-slate-950" />
                      <span>⚡ Quick Order</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOrderTarget(activeImage?.productId)}
                      className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all shadow-md cursor-pointer whitespace-nowrap"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Order Form</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 4. Thumbnail Carousel Strip */}
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-2 sm:gap-2.5 overflow-x-auto py-2 px-1">
          {filteredImages.map((img, idx) => {
            const isSelected = currentIndex === idx;
            return (
              <button
                key={img.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`relative rounded-xl overflow-hidden w-16 h-12 sm:w-24 sm:h-16 shrink-0 border-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'border-blue-600 ring-2 ring-blue-300 scale-105 shadow-sm'
                    : 'border-slate-200 opacity-70 hover:opacity-100 hover:border-slate-300 bg-white'
                }`}
                title={img.title}
              >
                <img
                  src={img.url}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </button>
            );
          })}
        </div>

      </div>

      {/* 5. Fullscreen Lightbox Zoom Modal */}
      {isZoomOpen && activeImage && (
        <div
          className="fixed inset-0 z-50 bg-[#0a192f]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setIsZoomOpen(false)}
        >
          <div 
            className="relative max-w-5xl w-full max-h-[92vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsZoomOpen(false)}
              className="absolute -top-11 right-0 text-white hover:text-blue-300 p-1.5 rounded-lg bg-slate-800/80 border border-slate-700 transition-colors cursor-pointer z-10 flex items-center gap-1.5 text-xs font-semibold"
            >
              <span>Close</span>
              <X className="w-4 h-4" />
            </button>

            {/* Modal Image Frame with Prev/Next Navigation */}
            <div className="relative w-full flex items-center justify-center overflow-hidden">
              <img
                src={activeImage.url}
                alt={activeImage.alt}
                className="max-h-[75vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl border border-slate-700 bg-black"
                referrerPolicy="no-referrer"
              />

              {filteredImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black text-white p-3 rounded-full backdrop-blur-md border border-slate-600 transition-all cursor-pointer"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black text-white p-3 rounded-full backdrop-blur-md border border-slate-600 transition-all cursor-pointer"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Modal Image Info */}
            <div className="mt-4 text-center max-w-3xl text-white">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block mb-1">
                {activeImage.productName} &bull; Photo {currentIndex + 1} of {filteredImages.length}
              </span>
              <p className="font-extrabold text-white text-base sm:text-lg">{activeImage.title}</p>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">{activeImage.subtitle}</p>

              {/* Action Buttons in Zoom Lightbox */}
              <div className="mt-4 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsZoomOpen(false);
                    handleSpecsTarget(activeImage.productId);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 transition-all cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-blue-400" />
                  <span>View Product Specs</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsZoomOpen(false);
                    handleOrderTarget(activeImage.productId);
                  }}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-black bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-lg cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Fill Form to Buy</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
