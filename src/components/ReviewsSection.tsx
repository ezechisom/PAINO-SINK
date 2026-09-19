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
    <section id="reviews-section" className="py-14 md:py-20 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-blue-700 font-extrabold text-xs uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200 mb-3 inline-block">
            Verified Customer Review
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0a192f] tracking-tight leading-tight">
            WHAT OUR CUSTOMER SAYS
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Real feedback from verified installation and everyday home kitchen usage in Nigeria.
          </p>
        </div>

        {/* Single Centered Review Card */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white border-2 border-blue-900/15 rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
            {/* Ambient subtle glow */}
            <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-blue-100/40 rounded-full blur-2xl pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between gap-4 mb-6">
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(singleReview.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400" />
                  ))}
                  <span className="text-xs text-slate-500 ml-2 font-mono font-bold">5.0 / 5.0 (Top Rating)</span>
                </div>

                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 border border-blue-100">
                  <Quote className="w-5 h-5" />
                </div>
              </div>

              {/* Review Quote */}
              <p className="text-slate-800 text-base sm:text-lg leading-relaxed mb-8 font-medium italic">
                "{singleReview.review}"
              </p>

              {/* Author & Verification Details */}
              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-extrabold text-[#0a192f] text-base">
                      {singleReview.name}
                    </h4>
                    {singleReview.verified && (
                      <span className="inline-flex items-center gap-1 text-xs text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{singleReview.location}</span>
                  </div>
                </div>

                <div className="text-xs font-semibold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 self-start sm:self-auto">
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
