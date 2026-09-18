import React from 'react';
import { CustomerReview } from '../types';
import { Star, CheckCircle2, MapPin } from 'lucide-react';

interface ReviewsSectionProps {
  reviews: CustomerReview[];
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews }) => {
  return (
    <section id="reviews-section" className="py-16 md:py-24 bg-[#0d121a] border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-amber-400 font-bold text-xs uppercase tracking-widest bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20 mb-3 inline-block">
            Customer Feedback
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            WHAT OUR CUSTOMERS ARE SAYING
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Real feedback from verified homeowners, builders, and interior renovators across Nigeria.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-lg flex flex-col justify-between hover:border-slate-700 transition-colors"
            >
              <div>
                {/* Star rating */}
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {[...Array(rev.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                  <span className="text-xs text-slate-400 ml-2 font-mono">5.0 / 5.0</span>
                </div>

                {/* Review Text */}
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 italic">
                  "{rev.review || '[INSERT REAL CUSTOMER REVIEW]'}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-white text-sm">
                      {rev.name || '[CUSTOMER NAME]'}
                    </h4>
                    {rev.verified && (
                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-medium">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{rev.location || '[CITY / STATE]'}</span>
                  </div>
                </div>

                <span className="text-xs text-slate-400">
                  {rev.date}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
