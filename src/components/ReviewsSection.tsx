import React from 'react';
import { CustomerReview } from '../types';
import { Star, CheckCircle2, MapPin, Quote } from 'lucide-react';

interface ReviewsSectionProps {
  reviews: CustomerReview[];
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews }) => {
  const singleReview = reviews[0] || {
    id: "rev-1",
    name: "Engr. Babatunde A.",
    location: "Lekki Phase 1, Lagos",
    rating: 5,
    review: "We installed this piano sink during our kitchen remodeling last month. The waterfall feature for washing vegetables is simply incredible. The water temperature display also keeps my kids safe from accidental hot water burns. The heavy-duty 304 nano finish resists scratches completely. Premium quality through and through!",
    date: "Verified Homeowner • Lagos",
    verified: true
  };

  return (
    <section id="reviews-section" className="py-8 sm:py-14 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-6">
          <span className="text-blue-700 font-extrabold text-[11px] uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200 mb-2 inline-block">
            Verified Customer Review
          </span>
          <h2 className="text-xl sm:text-3xl font-extrabold text-[#0a192f] tracking-tight leading-tight">
            WHAT OUR CUSTOMER SAYS
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1.5">
            Real feedback from verified installation and everyday home kitchen usage in Nigeria.
          </p>
        </div>

        {/* Single Centered Review Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white border border-blue-900/15 rounded-2xl p-4 sm:p-6 shadow-md relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center justify-between gap-4 mb-4">
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(singleReview.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                  <span className="text-xs text-slate-500 ml-1.5 font-mono font-bold">5.0 / 5.0</span>
                </div>

                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 border border-blue-100">
                  <Quote className="w-4 h-4" />
                </div>
              </div>

              {/* Review Quote */}
              <p className="text-slate-800 text-xs sm:text-sm leading-relaxed mb-5 font-medium italic">
                "{singleReview.review}"
              </p>

              {/* Author & Verification Details */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-extrabold text-[#0a192f] text-sm sm:text-base">
                      {singleReview.name}
                    </h4>
                    {singleReview.verified && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Verified Buyer
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{singleReview.location}</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 font-mono">
                  {singleReview.date}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
