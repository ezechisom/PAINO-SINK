import React from 'react';
import { SiteConfig } from '../types';
import { Phone, MessageCircle, ShieldCheck, Truck, Sparkles, Headphones, Clock, MapPin } from 'lucide-react';

interface FooterProps {
  config: SiteConfig;
  onOrderClick: () => void;
  hasPlacedOrder?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ config, onOrderClick, hasPlacedOrder = false }) => {

  return (
    <footer id="customer-service-section" className="bg-[#070a0e] text-slate-400 border-t border-slate-800/80 pt-12 pb-32 sm:pb-28 text-xs scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Support & Dispatch Card: Shows Direct Call/WhatsApp AFTER order is placed */}
        {hasPlacedOrder ? (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 mb-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <span className="text-blue-400 font-bold uppercase tracking-widest text-[11px] block">
                  Official Moonlight Support Desk
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  Call or WhatsApp Moonlight
                </h3>
                <p className="text-slate-300 text-xs mt-1 max-w-xl">
                  Need help with your kitchen countertop cutout dimensions, installation advice, or tracking your order? Contact Moonlight directly:
                </p>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-blue-400" />
                    Mon – Sat: 8:00 AM – 8:00 PM
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-400" />
                    Nationwide Distribution Hubs (Lagos, Abuja, PH, Ibadan)
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
              <a
                href={`tel:${config.phoneNumber.replace(/\s+/g, '')}`}
                id="footer-call-support-btn"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0a192f] hover:bg-slate-800 text-white border border-slate-700 font-extrabold text-xs py-3.5 px-5 rounded-xl shadow-lg transition-transform active:scale-95 cursor-pointer"
              >
                <Phone className="w-4 h-4 text-blue-400" />
                <span>CALL MOONLIGHT: {config.phoneNumber}</span>
              </a>

              <a
                href={`https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent("Hello Moonlight Luxury Home Tech, I just placed an order for the Smart Kitchen Piano Sink.")}`}
                target="_blank"
                rel="noopener noreferrer"
                id="footer-whatsapp-support-btn"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs py-3.5 px-5 rounded-xl shadow-lg transition-transform active:scale-95 cursor-pointer animate-soft-blink"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WHATSAPP MOONLIGHT</span>
              </a>
            </div>
          </div>
        ) : (
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <span className="text-blue-400 font-bold uppercase tracking-widest text-[11px] block">
                  Customer Care &amp; Nationwide Delivery
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                  Verified Dispatch &amp; Order Protection
                </h3>
                <p className="text-slate-300 text-xs mt-1 max-w-2xl">
                  Every order is personally confirmed with you prior to package dispatch. Our dedicated customer helpline and direct priority support are provided instantly on your order receipt upon submitting the dispatch form.
                </p>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                    Payment On Delivery Available
                  </span>
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-blue-400" />
                    Fast Nationwide Delivery
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full md:w-auto shrink-0">
              <button
                onClick={onOrderClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-3 px-5 rounded-xl shadow transition-colors cursor-pointer"
              >
                <span>Go to Order Form</span>
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold font-display">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-white text-base tracking-tight font-display">
                {config.productName}
              </span>
            </div>
            <p className="text-slate-400 max-w-md leading-relaxed mb-4">
              Modern multifunctional kitchen workstation engineered with SUS304 nano stainless steel, flying rain cascade waterfall, piano key controls, and integrated preparation accessories.
            </p>
            {hasPlacedOrder ? (
              <div className="flex items-center gap-4 text-slate-300">
                <a 
                  href={`tel:${config.phoneNumber.replace(/\s+/g, '')}`}
                  className="flex items-center gap-1.5 hover:text-blue-400 transition-colors font-semibold"
                >
                  <Phone className="w-3.5 h-3.5 text-blue-400" />
                  <span>Call or WhatsApp Moonlight: {config.phoneNumber}</span>
                </a>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-slate-400 text-xs">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>Customer service contact line provided immediately upon order submission.</span>
              </div>
            )}
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3">
              Quick Navigation
            </h4>
            <ul className="space-y-2">
              <li><a href="#hero-section" className="hover:text-blue-400 transition-colors">Overview</a></li>
              <li><a href="#features-section" className="hover:text-blue-400 transition-colors">Key Features</a></li>
              <li><a href="#gallery-section" className="hover:text-blue-400 transition-colors">Product Gallery</a></li>
              <li><a href="#specs-section" className="hover:text-blue-400 transition-colors">Specifications</a></li>
              <li><a href="#faq-section" className="hover:text-blue-400 transition-colors">Questions &amp; Answers</a></li>
              <li><a href="#order-section" className="hover:text-blue-400 transition-colors">Dispatch &amp; Order Form</a></li>
            </ul>
          </div>

          {/* Trust & Dispatch */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3">
              Delivery Coverage
            </h4>
            <p className="text-slate-400 leading-relaxed mb-3">
              Nationwide dispatch to Lagos, Abuja, Port Harcourt, Ibadan, Abia, Delta, Kano, and all 36 states of Nigeria.
            </p>
            <div className="flex items-center gap-2 text-blue-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Inspection on Delivery Available</span>
            </div>
          </div>

        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} {config.productName}. All rights reserved. Designed for Nigerian homes and modern living.
          </p>
          <div className="flex items-center gap-3">
            <span>Standard Plumbing Fit</span>
            <span>&bull;</span>
            <span>750 x 450 mm</span>
            <span>&bull;</span>
            <span>1-Year Valve Warranty</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
