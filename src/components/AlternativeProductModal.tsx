import React, { useState, useEffect } from 'react';
import { AlternativeProduct } from '../data/alternativeProducts';
import { formatNaira } from '../config';
import { 
  X, 
  Check, 
  Flame, 
  Zap, 
  MessageCircle, 
  Maximize2, 
  ShieldCheck, 
  Truck,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Camera
} from 'lucide-react';
import { getWhatsAppUrl } from '../utils/whatsapp';
import { trackContact } from '../utils/metaPixel';

interface AlternativeProductModalProps {
  product: AlternativeProduct | null;
  onClose: () => void;
  onSelectForOrder?: (product: AlternativeProduct) => void;
  onQuickOrder?: (product: AlternativeProduct) => void;
  whatsappNumber: string;
  hasPlacedOrder?: boolean;
}

const SINK_IMAGE_CAPTIONS = [
  "Main Workstation View — Multifunctional Smart Piano Sink (75 × 45 cm)",
  "Digital Console — Piano Water Keys, Hydroelectric LED Temp Display & Waterfall Spout",
  "Workstation Accessories — Solid Wood Prep Board, Nested Colander & Drain Basket",
  "Luxury Installation — Gunmetal Nano Steel in Modern Kitchen Countertop",
  "Complete Package Kit — Unboxed 9-Piece Accessories & Full Plumbing Siphon"
];

export const AlternativeProductModal: React.FC<AlternativeProductModalProps> = ({
  product,
  onClose,
  onSelectForOrder,
  onQuickOrder,
  whatsappNumber,
  hasPlacedOrder = false
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Reset to first photo whenever product changes
  useEffect(() => {
    setActiveImageIndex(0);
  }, [product?.id]);

  // Keyboard controls: Escape to close, Left/Right arrows to cycle images
  useEffect(() => {
    if (!product) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && product.images.length > 1) {
        setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : product.images.length - 1));
      } else if (e.key === 'ArrowRight' && product.images.length > 1) {
        setActiveImageIndex((prev) => (prev < product.images.length - 1 ? prev + 1 : 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, product]);

  if (!product) return null;

  const whatsappInquiryUrl = getWhatsAppUrl(
    whatsappNumber,
    product.name,
    1,
    `Hello! I saw the ${product.name} (${formatNaira(product.price)}) on your website as a matching appliance for the 2-Burner Gas Cooker. I would like to order or get more details about dispatch.`
  );

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl bg-[#0e141d] border-2 border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-4 sm:my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-800 bg-slate-900/95">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-black tracking-widest text-blue-400 uppercase">
              SUGGESTED COMPANION APPLIANCE • PHOTO GALLERY &amp; DETAILS
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 max-h-[82vh] overflow-y-auto space-y-5">
          
          {/* Main Gallery Viewer */}
          <div className="space-y-2">
            <div className="relative aspect-[16/10] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 group shadow-lg">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={`${product.name} view ${activeImageIndex + 1}`}
                className="w-full h-full object-cover object-center transition-all duration-300"
                referrerPolicy="no-referrer"
              />

              {/* Top Badge: Product badge & Photo counter */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
                <span className="bg-black/85 backdrop-blur-md border border-amber-500/50 px-3 py-1 rounded-full text-xs font-bold text-amber-300 shadow-sm">
                  {product.badge}
                </span>

                <span className="bg-black/85 backdrop-blur-md border border-slate-700 px-3 py-1 rounded-full text-xs font-mono font-bold text-slate-200 flex items-center gap-1.5 shadow-sm">
                  <Camera className="w-3.5 h-3.5 text-blue-400" />
                  <span>Photo {activeImageIndex + 1} of {product.images.length}</span>
                </span>
              </div>

              {/* Photo Caption Overlay at Bottom */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/75 to-transparent px-4 py-2.5 text-center">
                <p className="text-xs sm:text-sm font-semibold text-white drop-shadow-sm">
                  {SINK_IMAGE_CAPTIONS[activeImageIndex] || `${product.name} - View ${activeImageIndex + 1}`}
                </p>
              </div>

              {/* Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : product.images.length - 1));
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 bg-black/70 hover:bg-black/90 text-white rounded-full transition-all cursor-pointer border border-white/20 active:scale-95"
                    aria-label="Previous image"
                    title="Previous photo (ArrowLeft)"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImageIndex((prev) => (prev < product.images.length - 1 ? prev + 1 : 0));
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-black/70 hover:bg-black/90 text-white rounded-full transition-all cursor-pointer border border-white/20 active:scale-95"
                    aria-label="Next image"
                    title="Next photo (ArrowRight)"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Clickable Image Thumbnails Row */}
            {product.images.length > 1 && (
              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold mb-1.5 px-0.5">
                  <span>CLICK ANY THUMBNAIL TO SWITCH PHOTO:</span>
                  <span className="text-blue-400">{product.images.length} High-Res Photos</span>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all cursor-pointer group ${
                        activeImageIndex === idx 
                          ? 'border-blue-400 ring-2 ring-blue-400/30 scale-[1.03]' 
                          : 'border-slate-800 opacity-60 hover:opacity-100'
                      }`}
                      title={`View Photo ${idx + 1}`}
                    >
                      <img 
                        src={img} 
                        alt={`Photo ${idx + 1}`} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                        referrerPolicy="no-referrer" 
                      />
                      <span className="absolute bottom-1 right-1 bg-black/80 text-[9px] font-bold text-white px-1 rounded">
                        #{idx + 1}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Product Title & Pricing */}
          <div className="border-b border-slate-800 pb-4">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
              <span className="text-xs font-semibold text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-3 py-1 rounded-full">
                {product.category}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black text-amber-400 font-display">
                  {formatNaira(product.price)}
                </span>
                <span className="text-sm text-slate-500 line-through">
                  {formatNaira(product.normalPrice)}
                </span>
                <span className="text-xs font-bold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                  SAVE {formatNaira(product.normalPrice - product.price)}
                </span>
              </div>
            </div>
            
            <h3 className="text-xl sm:text-2xl font-black text-white">
              {product.name}
            </h3>
            <p className="text-slate-300 text-sm mt-1">
              {product.tagline}
            </p>
          </div>

          {/* Cutout & Dimensions Specs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                <Maximize2 className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] text-slate-400 uppercase font-semibold block">Outer Basin Dimensions</span>
                <span className="text-sm font-bold text-white">{product.dimensions}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] text-slate-400 uppercase font-semibold block">Countertop Fit</span>
                <span className="text-sm font-bold text-white">{product.cutout}</span>
              </div>
            </div>
          </div>

          {/* Key Features List */}
          <div>
            <h4 className="text-xs font-black text-slate-300 uppercase tracking-wider mb-3">
              Key Appliance Capabilities:
            </h4>
            <div className="space-y-2.5">
              {product.keyFeatures.map((feat, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                  <div className="w-4 h-4 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/80 text-xs text-slate-300 leading-relaxed">
            <strong className="text-amber-300 block mb-1">Product Description:</strong>
            {product.description}
          </div>

          {/* Trust Guarantees */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 text-blue-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              Payment on Delivery Available
            </span>
            <span className="flex items-center gap-1.5 text-amber-400 font-medium">
              <Truck className="w-4 h-4" />
              Ships Together With Your 2-Burner Cooker (Save ₦5,000 Bundle)
            </span>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            {onQuickOrder && (
              <button
                type="button"
                onClick={() => {
                  onQuickOrder(product);
                  onClose();
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-black font-black text-sm py-3.5 px-5 rounded-xl shadow-lg transition-transform active:scale-95 cursor-pointer uppercase tracking-wider animate-action-blink"
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                <span>⚡ QUICK ORDER PIANO SINK ({formatNaira(product.price)})</span>
              </button>
            )}

            {onSelectForOrder && (
              <button
                onClick={() => {
                  onSelectForOrder(product);
                  onClose();
                }}
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs sm:text-sm py-3.5 px-4 rounded-xl shadow-md transition-transform active:scale-95 cursor-pointer uppercase tracking-wider"
              >
                <ShoppingBag className="w-4 h-4 text-white" />
                <span>Add to Main Checkout Form</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            )}

            {hasPlacedOrder && (
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackContact('whatsapp', `alt-${product.id}`)}
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm py-3.5 px-5 rounded-xl transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>INQUIRE ON WHATSAPP</span>
              </a>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
