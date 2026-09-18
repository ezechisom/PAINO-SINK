import React, { useState } from 'react';
import { FaqItem } from '../types';
import { ChevronDown, HelpCircle, PhoneCall } from 'lucide-react';

interface FaqSectionProps {
  faqs: FaqItem[];
  phoneNumber?: string;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ faqs, phoneNumber = "09136827730" }) => {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq-section" className="py-16 md:py-24 bg-[#0b0f14]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-amber-400 font-bold text-xs uppercase tracking-widest bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20 mb-3 inline-block">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            EVERYTHING YOU NEED TO KNOW
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Honest and straightforward answers about dimensions, installation, included parts, and nationwide delivery.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5 mb-10">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden transition-all hover:border-slate-700"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-white text-sm sm:text-base flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{faq.question}</span>
                  </span>
                  <div className={`p-1.5 rounded-full bg-slate-800 text-slate-300 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 bg-amber-500/20 text-amber-300' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-slate-800/60 pt-4 bg-slate-950/40">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Question Still Unanswered Box */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="font-bold text-white text-sm">Have a unique plumbing or countertop question?</h4>
            <p className="text-xs text-slate-400 mt-0.5">Call our product specialist directly for prompt assistance.</p>
          </div>
          <a
            href={`tel:${phoneNumber.replace(/\s+/g, '')}`}
            className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-colors cursor-pointer shrink-0"
          >
            <PhoneCall className="w-4 h-4 text-amber-400" />
            <span>Call {phoneNumber}</span>
          </a>
        </div>

      </div>
    </section>
  );
};
