import React from 'react';
import { SiteConfig } from '../types';
import { Phone, ShieldCheck, Truck, Sparkles, Headphones, Clock, MapPin } from 'lucide-react';

interface FooterProps {
  config: SiteConfig;
  onOrderClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ config, onOrderClick }) => {

  return (
    <footer id="customer-service-section" className="bg-[#070a0e] text-slate-400 border-t border-slate-800/80 pt-12 pb-24 md:pb-12 text-xs scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Customer Service & Support Spotlight Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 mb-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <span className="text-amber-400 font-bold uppercase tracking-widest text-[11px] block">
                Official Support Desk
              </span>
              <h3 className="text-lg font-bold text-white mt-0.5">
                Customer Service &amp; Delivery Dispatch
              </h3>
              <p className="text-slate-300 text-xs mt-1 max-w-xl">
                Need help with your kitchen countertop cutout dimensions, installation advice, or tracking an ongoing parcel? Our dedicated customer care team is here to assist you.
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  Mon – Sat: 8:00 AM – 8:00 PM
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  Nationwide Dispatch Hubs (Lagos, Abuja, PH, Ibadan)
                </span>
              </div>
            </div>
          </div>

          <a
            href={`tel:${config.phoneNumber.replace(/\s+/g, '')}`}
            id="footer-call-support-btn"
            className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-xs py-3.5 px-6 rounded-xl shadow-lg transition-transform active:scale-95 cursor-pointer shrink-0 animate-soft-blink"
          >
            <Phone className="w-4 h-4" />
            <span>CUSTOMER SERVICE: {config.phoneNumber}</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold font-display">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-white text-base tracking-tight font-display">
                {config.productName}
              </span>
            </div>
            <p className="text-slate-400 max-w-md leading-relaxed mb-4">
              Modern multifunctional kitchen workstation engineered with SUS304 nano stainless steel, flying rain cascade waterfall, piano key controls, and integrated preparation accessories.
            </p>
            <div className="flex items-center gap-4 text-slate-300">
              <a 
                href={`tel:${config.phoneNumber.replace(/\s+/g, '')}`}
                className="flex items-center gap-1.5 hover:text-amber-400 transition-colors font-semibold"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Customer Care Line: {config.phoneNumber}</span>
              </a>
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3">
              Quick Navigation
            </h4>
            <ul className="space-y-2">
              <li><a href="#hero-section" className="hover:text-amber-400 transition-colors">Overview</a></li>
              <li><a href="#features-section" className="hover:text-amber-400 transition-colors">Key Features</a></li>
              <li><a href="#gallery-section" className="hover:text-amber-400 transition-colors">Product Gallery</a></li>
              <li><a href="#specs-section" className="hover:text-amber-400 transition-colors">Specifications</a></li>
              <li><a href="#faq-section" className="hover:text-amber-400 transition-colors">Questions &amp; Answers</a></li>
              <li><a href="#customer-service-section" className="hover:text-amber-400 transition-colors font-semibold text-amber-400">Customer Service</a></li>
              <li>
                <button onClick={onOrderClick} className="text-amber-400 hover:underline cursor-pointer">
                  Order Now (Pay on Delivery)
                </button>
              </li>
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
            <div className="flex items-center gap-2 text-emerald-400 font-medium">
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
