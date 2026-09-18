/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CONFIG as initialConfig } from './config';
import { SiteConfig } from './types';
import { PromoTopBar } from './components/PromoTopBar';
import { HeroSection } from './components/HeroSection';
import { PriceOfferCard } from './components/PriceOfferCard';
import { ProblemSection } from './components/ProblemSection';
import { WhyLoveSection } from './components/WhyLoveSection';
import { ImageGallery } from './components/ImageGallery';
import { ComparisonSection } from './components/ComparisonSection';
import { HowItWorks } from './components/HowItWorks';
import { PerfectForSection } from './components/PerfectForSection';
import { LifestyleSection } from './components/LifestyleSection';
import { SpecsSection } from './components/SpecsSection';
import { ReviewsSection } from './components/ReviewsSection';
import { TrustSection } from './components/TrustSection';
import { UrgencySection } from './components/UrgencySection';
import { FaqSection } from './components/FaqSection';
import { FinalOfferSection } from './components/FinalOfferSection';
import { OrderForm } from './components/OrderForm';
import { StickyMobileBar } from './components/StickyMobileBar';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ConfigEditorModal } from './components/ConfigEditorModal';
import { Footer } from './components/Footer';
import { AlternativeProductsTopBanner } from './components/AlternativeProductsTopBanner';
import { AlternativeProductsSection } from './components/AlternativeProductsSection';
import { AlternativeProductModal } from './components/AlternativeProductModal';
import { AlternativeProduct } from './data/alternativeProducts';
import { getWhatsAppUrl } from './utils/whatsapp';
import { trackViewContent, trackInitiateCheckout, trackContact } from './utils/metaPixel';
import { Sparkles, Phone, MessageCircle, ShoppingBag, Headphones, Flame } from 'lucide-react';

export default function App() {
  const [config, setConfig] = useState<SiteConfig>(initialConfig);
  const [selectedAltProduct, setSelectedAltProduct] = useState<AlternativeProduct | null>(null);
  const [selectedCookerAddon, setSelectedCookerAddon] = useState<'none' | 'cooker-2burner' | 'cooker-5burner' | 'both'>('none');
  const [placedOrder, setPlacedOrder] = useState<{
    orderId: string;
    orderData: any;
    totalAmount: number;
    timestamp: string;
  } | null>(null);

  // Meta Pixel ViewContent event on page load
  useEffect(() => {
    trackViewContent(config.productName, config.promoPrice);
  }, [config.productName, config.promoPrice]);

  const scrollToOrder = () => {
    trackInitiateCheckout(config.promoPrice);
    const orderSection = document.getElementById('order-section');
    if (orderSection) {
      orderSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectAltForOrder = (product: AlternativeProduct) => {
    if (product.id === 'cooker-2burner') {
      setSelectedCookerAddon('cooker-2burner');
    } else if (product.id === 'cooker-5burner') {
      setSelectedCookerAddon('cooker-5burner');
    }
    scrollToOrder();
  };

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features-section');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const headerWhatsAppUrl = getWhatsAppUrl(
    config.whatsappNumber,
    config.productName,
    undefined,
    placedOrder
      ? `Hello, I just completed order #${placedOrder.orderId} for the ${config.productName}. Please confirm my priority dispatch.`
      : undefined
  );

  return (
    <div className="min-h-screen bg-[#0b0f14] text-[#e2e8f0] flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* 1. TOP PROMOTIONAL BAR */}
      <PromoTopBar promoPrice={config.promoPrice} />

      {/* Main Brand Navigation Bar */}
      <header className="bg-[#0b0f14]/95 backdrop-blur-md border-b border-slate-800/80 sticky top-[42px] z-40 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Logo & Product Badge */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-black font-extrabold shadow-md shadow-amber-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-white text-base sm:text-lg tracking-tight font-display block leading-tight">
                SMART PIANO SINK
              </span>
              <span className="text-[10px] text-amber-400 font-semibold tracking-widest uppercase">
                SUS304 Nano Workstation
              </span>
            </div>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Quick jump to Alternative Cooktops */}
            <a
              href="#alternative-products-section"
              className="hidden xl:inline-flex items-center gap-1.5 text-xs text-amber-400 font-bold bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 px-3 py-2 rounded-xl transition-all"
            >
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>Matching Cooktops</span>
            </a>

            {/* If Order is Placed: SHOW MERCHANT NUMBER PROMINENTLY AT TOP */}
            {placedOrder ? (
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${config.phoneNumber.replace(/\s+/g, '')}`}
                  onClick={() => trackContact('phone', 'header-call')}
                  id="header-placed-order-call-btn"
                  className="flex items-center gap-1.5 text-xs text-white font-extrabold bg-amber-500 hover:bg-amber-400 px-3 py-2 rounded-xl transition-all shadow-md cursor-pointer animate-action-blink"
                >
                  <Phone className="w-3.5 h-3.5 text-black" />
                  <span className="text-black hidden sm:inline">Call Dispatch: {config.phoneNumber}</span>
                  <span className="text-black sm:hidden">{config.phoneNumber}</span>
                </a>

                <a
                  href={headerWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackContact('whatsapp', 'header-whatsapp')}
                  id="header-whatsapp-btn"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] px-3 py-2 rounded-xl transition-all shadow-md cursor-pointer animate-soft-blink"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  <span className="hidden md:inline">WhatsApp Dispatch</span>
                  <span className="md:hidden">WhatsApp</span>
                </a>
              </div>
            ) : (
              /* Before order: Customer Service link without printing raw phone number at top */
              <a
                href="#customer-service-section"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-amber-400 bg-slate-900/80 border border-slate-800 hover:border-slate-700 px-3 py-2 rounded-xl transition-colors"
              >
                <Headphones className="w-3.5 h-3.5 text-amber-400" />
                <span>Customer Service</span>
              </a>
            )}

            {/* Header Order CTA — BLINKING */}
            <button
              onClick={scrollToOrder}
              id="header-order-btn"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-xs sm:text-sm py-2 sm:py-2.5 px-3.5 sm:px-5 rounded-xl shadow-lg cursor-pointer uppercase tracking-wider transition-all animate-action-blink"
            >
              <ShoppingBag className="w-4 h-4 shrink-0" />
              <span>
                <span className="hidden md:inline">ORDER NOW (PAY ON DELIVERY)</span>
                <span className="md:hidden">ORDER NOW</span>
              </span>
            </button>
          </div>

        </div>
      </header>

      {/* ALTERNATIVE APPLIANCES TOP SHOWCASE BAR - PROMINENT AT TOP */}
      <AlternativeProductsTopBanner 
        onViewProduct={(p) => setSelectedAltProduct(p)}
        onOrderProduct={handleSelectAltForOrder}
      />

      {/* Main Landing Page Content */}
      <main className="flex-1">
        
        {/* 2. HERO SECTION */}
        <HeroSection config={config} onOrderClick={scrollToOrder} />

        {/* 3. PRICE & OFFER CARD */}
        <PriceOfferCard config={config} onOrderClick={scrollToOrder} />

        {/* 4. EMOTIONAL PROBLEM SECTION */}
        <ProblemSection onDiscoverClick={scrollToFeatures} />

        {/* 5. WHY YOU'LL LOVE IT (Features & Benefits) */}
        <WhyLoveSection config={config} onOrderClick={scrollToOrder} />

        {/* 6. PRODUCT IMAGE SHOWCASE (Interactive Gallery) */}
        <ImageGallery images={config.productImages} />

        {/* ALTERNATIVE & MATCHING LUXURY COOKTOPS (MOONLIGHT LUXURY HOME TECH) */}
        <AlternativeProductsSection 
          onViewProduct={(p) => setSelectedAltProduct(p)}
          onSelectForOrder={handleSelectAltForOrder}
        />

        {/* 7. "WHAT MAKES IT DIFFERENT?" (Comparison Table) */}
        <ComparisonSection onOrderClick={scrollToOrder} />

        {/* 8. HOW IT WORKS (3-Step Visual Section) */}
        <HowItWorks />

        {/* 9. PERFECT FOR MODERN KITCHENS */}
        <PerfectForSection />

        {/* 10. LIFESTYLE SECTION */}
        <LifestyleSection onOrderClick={scrollToOrder} />

        {/* 11. PRODUCT FEATURES & SPECIFICATIONS */}
        <SpecsSection config={config} />

        {/* 12. CUSTOMER REVIEWS */}
        <ReviewsSection reviews={config.reviews} />

        {/* 13. TRUST SECTION ("SHOP WITH CONFIDENCE") */}
        <TrustSection config={config} />

        {/* 14. URGENCY SECTION */}
        <UrgencySection config={config} onOrderClick={scrollToOrder} />

        {/* 15. FAQ ACCORDION (13 Verified Questions) */}
        <FaqSection 
          faqs={config.faqs} 
          phoneNumber={config.phoneNumber}
        />

        {/* 16. FINAL OFFER SECTION */}
        <FinalOfferSection config={config} onOrderClick={scrollToOrder} />

        {/* 17. ORDER FORM (Checkout with Nigerian States & Cooktop Option) */}
        <OrderForm 
          config={config} 
          onOrderPlaced={setPlacedOrder}
          selectedCookerAddon={selectedCookerAddon}
          onCookerAddonChange={setSelectedCookerAddon}
        />

      </main>

      {/* Footer */}
      <Footer config={config} onOrderClick={scrollToOrder} />

      {/* Floating WhatsApp Bubble — Only visible after placing order */}
      <FloatingWhatsApp 
        whatsappNumber={config.whatsappNumber} 
        productName={config.productName} 
        visible={!!placedOrder}
        orderId={placedOrder?.orderId}
      />

      {/* Mobile Sticky Bottom CTA Bar */}
      <StickyMobileBar config={config} onOrderClick={scrollToOrder} />

      {/* Optional Live Config Editor Drawer for Seller Customization */}
      <ConfigEditorModal
        currentConfig={config}
        onSaveConfig={(updated) => setConfig(updated)}
        onResetConfig={() => setConfig(initialConfig)}
      />

      {/* Alternative Product Details & Image Modal */}
      <AlternativeProductModal
        product={selectedAltProduct}
        onClose={() => setSelectedAltProduct(null)}
        onSelectForOrder={handleSelectAltForOrder}
        whatsappNumber={config.whatsappNumber}
      />

    </div>
  );
}
