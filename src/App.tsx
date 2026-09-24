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
import { FloatingFaqChat } from './components/FloatingFaqChat';
import { ConfigEditorModal } from './components/ConfigEditorModal';
import { Footer } from './components/Footer';
import { AlternativeProductModal } from './components/AlternativeProductModal';
import { SuggestedProductTicker } from './components/SuggestedProductTicker';
import { ALTERNATIVE_PRODUCTS, AlternativeProduct } from './data/alternativeProducts';
import { getWhatsAppUrl } from './utils/whatsapp';
import { trackViewContent, trackInitiateCheckout, trackContact } from './utils/metaPixel';
import { Sparkles, Phone, MessageCircle, ShoppingBag, ShieldCheck } from 'lucide-react';

export default function App() {
  const [config, setConfig] = useState<SiteConfig>(initialConfig);
  const [selectedAltProduct, setSelectedAltProduct] = useState<AlternativeProduct | null>(null);
  const [productToAddToForm, setProductToAddToForm] = useState<{ productId: string; timestamp: number } | null>(null);
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

  const handleViewProductSpecs = (productIdOrProduct: string | AlternativeProduct) => {
    let prod: AlternativeProduct | undefined;
    if (typeof productIdOrProduct === 'string') {
      if (productIdOrProduct === 'sink') {
        const specsSection = document.getElementById('specs-section');
        if (specsSection) {
          specsSection.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
      prod = ALTERNATIVE_PRODUCTS.find(p => p.id === productIdOrProduct);
    } else {
      prod = productIdOrProduct;
    }

    if (prod) {
      setSelectedAltProduct(prod);
    }
  };

  const handleAddProductToOrder = (productIdOrProduct?: string | AlternativeProduct) => {
    if (!productIdOrProduct) {
      scrollToOrder();
      return;
    }

    const pId = typeof productIdOrProduct === 'string' ? productIdOrProduct : productIdOrProduct.id;
    setProductToAddToForm({ productId: pId, timestamp: Date.now() });
    setSelectedAltProduct(null);
    scrollToOrder();
  };

  const handleSelectAltForOrder = (product: AlternativeProduct) => {
    handleAddProductToOrder(product);
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
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-blue-500/20 selection:text-blue-900">
      
      {/* Floating FAQ Chat Icon at the top of the website */}
      <FloatingFaqChat 
        faqs={config.faqs}
        phoneNumber={config.phoneNumber}
        whatsappNumber={config.whatsappNumber}
        productName={config.productName}
        hasPlacedOrder={!!placedOrder}
      />

      {/* 1. TOP PROMOTIONAL BAR (Dark Blue & Emerald Green) */}
      <PromoTopBar promoPrice={config.promoPrice} />

      {/* Main Brand Navigation Bar */}
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-[41px] z-40 transition-colors shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Logo & Product Badge */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#0a192f] flex items-center justify-center text-white font-extrabold shadow-sm">
              <Sparkles className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <span className="font-extrabold text-[#0a192f] text-base sm:text-lg tracking-tight font-display block leading-tight">
                SMART PIANO SINK
              </span>
              <span className="text-[10px] text-blue-700 font-bold tracking-wider uppercase">
                SUS304 Nano Workstation
              </span>
            </div>
          </div>

          {/* Header Action Buttons: Only visible AFTER client fills the form */}
          {placedOrder ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href={`tel:${config.phoneNumber.replace(/\s+/g, '')}`}
                onClick={() => trackContact('phone', 'header-call')}
                id="header-call-btn"
                className="flex items-center gap-1.5 text-xs text-white font-extrabold bg-[#0a192f] hover:bg-slate-800 px-3 py-2 rounded-xl transition-all shadow-sm cursor-pointer"
                title="Call Moonlight"
              >
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <span className="hidden sm:inline">Call Moonlight: {config.phoneNumber}</span>
                <span className="sm:hidden">Call</span>
              </a>

              <a
                href={headerWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackContact('whatsapp', 'header-whatsapp')}
                id="header-whatsapp-btn"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 px-3 py-2 rounded-xl transition-all shadow-sm cursor-pointer animate-soft-blink"
                title="WhatsApp Moonlight"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                <span className="hidden md:inline">WhatsApp Moonlight</span>
                <span className="md:hidden">WhatsApp</span>
              </a>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-slate-100/90 border border-slate-200 px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Payment on Delivery Available</span>
            </div>
          )}

        </div>
      </header>

      {/* Suggested Product Continuous Screen Ticker */}
      <SuggestedProductTicker 
        onViewSpecs={handleViewProductSpecs} 
        onAddToForm={handleAddProductToOrder} 
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

        {/* 6. PRODUCT IMAGE SHOWCASE (3-Product Interactive Gallery with Click-to-Specs & Direct Buy) */}
        <ImageGallery 
          onOrderClick={handleAddProductToOrder} 
          onViewSpecs={handleViewProductSpecs} 
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

        {/* 15. FAQ ACCORDION */}
        <FaqSection 
          faqs={config.faqs} 
          phoneNumber={config.phoneNumber}
          hasPlacedOrder={!!placedOrder}
        />

        {/* 16. FINAL OFFER SECTION */}
        <FinalOfferSection config={config} onOrderClick={scrollToOrder} />

        {/* 17. ORDER FORM (Checkout with Multi-Product Appliance Selection & Bundle Discounts) */}
        <OrderForm 
          config={config} 
          onOrderPlaced={setPlacedOrder}
          onViewSuggestedProduct={(prod) => setSelectedAltProduct(prod)}
          productToAddToForm={productToAddToForm}
        />

      </main>

      {/* Footer */}
      <Footer 
        config={config} 
        onOrderClick={scrollToOrder} 
        hasPlacedOrder={!!placedOrder}
      />

      {/* Floating WhatsApp Bubble */}
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
        hasPlacedOrder={!!placedOrder}
      />

    </div>
  );
}
