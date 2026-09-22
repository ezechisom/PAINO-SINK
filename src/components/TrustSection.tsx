import React from 'react';
import { SiteConfig } from '../types';
import { Truck, Package, PhoneCall, ShieldCheck, CreditCard, RotateCcw, Award, CheckCircle } from 'lucide-react';

interface TrustSectionProps {
  config: SiteConfig;
}

export const TrustSection: React.FC<TrustSectionProps> = ({ config }) => {
  const trustCards = [
    {
      title: "NATIONWIDE DELIVERY",
      detail: config.deliveryInformation || "Fast dispatch to all 36 states in Nigeria. Pay on Delivery in Lagos & Abuja.",
      icon: Truck,
      tag: "Reliable Transit"
    },
    {
      title: "SECURE PACKAGING",
      detail: "Reinforced carton with thick molded foam and corner guards to prevent any transport dents.",
      icon: Package,
      tag: "Zero Damage Guarantee"
    },
    {
      title: "CUSTOMER SUPPORT",
      detail: "Dedicated customer care for order confirmation, dispatch tracking, and installation advice.",
      icon: PhoneCall,
      tag: "Prompt Assistance"
    },
    {
      title: "SECURE ORDER PROCESS",
      detail: "Transparent pricing with no hidden charges. Inspect package upon arrival.",
      icon: ShieldCheck,
      tag: "Buyer Peace of Mind"
    }
  ];

  const policyItems = [
    {
      label: "Delivery Details",
      text: config.deliveryInformation || "Fast dispatch to all 36 states across Nigeria.",
      icon: Truck
    },
    {
      label: "Payment Terms",
      text: config.paymentInformation || "Payment on Delivery in select cities, secure bank transfer nationwide.",
      icon: CreditCard
    },
    {
      label: "Inspection & Returns",
      text: config.returnPolicy || "Inspect upon delivery. 7-day replacement policy for verified transit defects.",
      icon: RotateCcw
    },
    {
      label: "Product Warranty",
      text: config.warrantyInformation || "12-month manufacturer quality warranty on structure and faucet valves.",
      icon: Award
    }
  ];

  return (
    <section id="trust-section" className="py-8 sm:py-16 bg-[#0b0f14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
          <span className="text-amber-400 font-bold text-[11px] uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 mb-2 inline-block">
            Buyer Protection &amp; Guarantees
          </span>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
            SHOP WITH CONFIDENCE
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2">
            Every order is backed by prompt customer support and verified buyer protection.
          </p>
        </div>

        {/* 4 Trust Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 mb-6 sm:mb-8">
          {trustCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="bg-slate-900/60 border border-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-5 flex flex-col justify-between hover:border-slate-700 transition-colors"
              >
                <div>
                  <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400 mb-3">
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-[10px] font-bold text-amber-400/90 uppercase tracking-wider block mb-1">
                    {card.tag}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white mb-1 tracking-tight">
                    {card.title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {card.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Editable Policy Breakdown Box */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4 sm:p-6">
          <h3 className="text-sm sm:text-base font-bold text-white mb-4 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-amber-400" />
            <span>Store Order &amp; Delivery Policies</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {policyItems.map((policy, idx) => {
              const Icon = policy.icon;
              return (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="p-1.5 rounded-lg bg-slate-800 text-amber-400 shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white mb-0.5">{policy.label}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{policy.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
