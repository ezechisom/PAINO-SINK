import React, { useState } from 'react';
import { FaqItem } from '../types';
import { ChevronDown, HelpCircle, PhoneCall } from 'lucide-react';

interface FaqSectionProps {
  faqs: FaqItem[];
  phoneNumber?: string;
  hasPlacedOrder?: boolean;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ faqs, phoneNumber = "09136827730", hasPlacedOrder = false }) => {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq-section" className="py-8 sm:py-16 bg-[#0b0f14]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
          <span className="text-amber-400 font-bold text-[11px] uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 mb-2 inline-block">
            Frequently Asked Questions
          </span>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
            EVERYTHING YOU NEED TO KNOW
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2">
            Quick answers about dimensions, installation, parts, and nationwide delivery.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-2.5 mb-6 sm:mb-8">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-slate-900/70 border border-slate-800 rounded-xl overflow-hidden transition-all hover:border-slate-700"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-3.5 sm:p-4 text-left flex items-center justify-between gap-3 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-white text-xs sm:text-sm flex items-center gap-2.5">
                    <HelpCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{faq.question}</span>
                  </span>
                  <div className={`p-1 rounded-full bg-slate-800 text-slate-300 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 bg-amber-500/20 text-amber-300' : ''}`}>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-3.5 pb-3.5 sm:px-4 sm:pb-4 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-slate-800/60 pt-3 bg-slate-950/40">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Question Still Unanswered Box */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4 sm:p-5 text-center flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-left">
            <h4 className="font-bold text-white text-xs sm:text-sm">Have a plumbing or installation question?</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {hasPlacedOrder
                ? "Call our product specialist directly for immediate assistance."
                : "Our technical dispatch team will verify all your installation measurements and plumbing requirements on your order confirmation call."}
            </p>
          </div>
          {hasPlacedOrder && (
            <a
              href={`tel:${phoneNumber.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 font-bold text-xs px-4 py-2 rounded-lg shadow-sm transition-colors cursor-pointer shrink-0"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              <span>Call {phoneNumber}</span>
            </a>
          )}
        </div>

      </div>
    </section>
  );
};
