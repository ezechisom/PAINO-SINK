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
      detail: config.deliveryInformation || "[DELIVERY INFORMATION]",
      icon: Truck,
      tag: "Reliable Transit"
    },
    {
      title: "SECURE PACKAGING",
      detail: "Double-reinforced carton with thick molded foam and corner impact protectors ensuring zero denting or scratch during shipping.",
      icon: Package,
      tag: "Zero Damage Guarantee"
    },
    {
      title: "CUSTOMER SUPPORT",
      detail: "Dedicated human support on WhatsApp and direct phone calls to assist you with order confirmation, tracking, and plumbing advice.",
      icon: PhoneCall,
      tag: "Prompt Assistance"
    },
    {
      title: "SECURE ORDER PROCESS",
      detail: "Transparent checkout with no hidden charges. Inspect your parcel upon arrival to confirm all parts before completion.",
      icon: ShieldCheck,
      tag: "Buyer Peace of Mind"
    }
  ];

  const policyItems = [
    {
      label: "Delivery Details",
      text: config.deliveryInformation || "[DELIVERY INFORMATION]",
      icon: Truck
    },
    {
      label: "Payment Terms",
      text: config.paymentInformation || "[PAYMENT INFORMATION]",
      icon: CreditCard
    },
    {
      label: "Inspection & Returns",
      text: config.returnPolicy || "[RETURN POLICY]",
      icon: RotateCcw
    },
    {
      label: "Product Warranty",
      text: config.warrantyInformation || "[WARRANTY INFORMATION]",
      icon: Award
    }
  ];

  return (
    <section id="trust-section" className="py-16 md:py-24 bg-[#0b0f14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-amber-400 font-bold text-xs uppercase tracking-widest bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20 mb-3 inline-block">
            Buyer Protection &amp; Guarantees
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            SHOP WITH CONFIDENCE
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            We understand that ordering luxury building materials online requires trust. Here is our exact service commitment to you.
          </p>
        </div>

        {/* 4 Trust Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {trustCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition-colors"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400 mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold text-amber-400/90 uppercase tracking-wider block mb-1">
                    {card.tag}
                  </span>
                  <h3 className="text-base font-bold text-white mb-2 tracking-tight">
                    {card.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {card.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Editable Policy Breakdown Box */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 sm:p-8">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-amber-400" />
            <span>Store Order &amp; Delivery Policies</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {policyItems.map((policy, idx) => {
              const Icon = policy.icon;
              return (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="p-2 rounded-lg bg-slate-800 text-amber-400 shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">{policy.label}</h4>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{policy.text}</p>
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
