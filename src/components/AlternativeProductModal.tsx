import React, { useState } from 'react';
import { AlternativeProduct } from '../data/alternativeProducts';
import { formatNaira } from '../config';
import { 
  X, 
  Check, 
  Flame, 
  Zap, 
  ExternalLink, 
  MessageCircle, 
  Maximize2, 
  ShieldCheck, 
  Truck,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  ArrowRight
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

export const AlternativeProductModal: React.FC<AlternativeProductModalProps> = ({
  product,
  onClose,
  onSelectForOrder,
  onQuickOrder,
  whatsappNumber,
  hasPlacedOrder = false
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!product) return null;

  const whatsappInquiryUrl = getWhatsAppUrl(
    whatsappNumber,
    product.name,
    1,
    `Hello! I saw the ${product.name} (${formatNaira(product.price)}) on your website as an alternative/matching appliance for the smart piano sink. I would like to order or get more details about dispatch.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl bg-[#0e141d] border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-xs font-black tracking-widest text-amber-400 uppercase">
              ALTERNATIVE LUXURY APPLIANCE
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

        <div className="p-6 max-h-[80vh] overflow-y-auto space-y-6">
          
          {/* Gallery View */}
          <div className="relative aspect-[16/10] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 group">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />

            {/* Top Badge */}
            <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md border border-amber-500/40 px-3 py-1 rounded-full text-xs font-bold text-amber-300">
              {product.badge}
            </div>

            {/* Navigation Arrows */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : product.images.length - 1))}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/90 text-white rounded-full transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActiveImageIndex((prev) => (prev < product.images.length - 1 ? prev + 1 : 0))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/90 text-white rounded-full transition-all cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2.5 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-18 h-14 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                    activeImageIndex === idx ? 'border-amber-500 scale-105' : 'border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}

          {/* Product Title & Pricing */}
          <div className="border-b border-slate-800 pb-5">
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
                <span className="text-xs font-bold text-blue-300 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-500/30">
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
                <span className="text-[11px] text-slate-400 uppercase font-semibold block">Glass Top Dimensions</span>
                <span className="text-sm font-bold text-white">{product.dimensions}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                {product.id === 'cooker-5burner' ? <Zap className="w-4 h-4" /> : <Flame className="w-4 h-4" />}
              </div>
              <div>
                <span className="text-[11px] text-slate-400 uppercase font-semibold block">Countertop Cutout Needed</span>
                <span className="text-sm font-bold text-white">{product.cutout}</span>
              </div>
            </div>
          </div>

          {/* Key Features List */}
          <div>
            <h4 className="text-xs font-black text-slate-300 uppercase tracking-wider mb-3">
              Why Homeowners Love This Cooktop:
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

          {/* Trust Guarantees */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 text-blue-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              Payment on Delivery Available
            </span>
            <span className="flex items-center gap-1.5 text-amber-400 font-medium">
              <Truck className="w-4 h-4" />
              Can Ship Together With Sink
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
                <span>⚡ QUICK ORDER (POP-UP FORM)</span>
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
                <span>Add to Main Form</span>
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

            <a
              href={product.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-xs py-3.5 px-4 rounded-xl border border-slate-700 transition-colors"
            >
              <span>Visit Official Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};
