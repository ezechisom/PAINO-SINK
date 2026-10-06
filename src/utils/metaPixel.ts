// Meta Pixel (Facebook Pixel) & TikTok Pixel Tracking Utilities
// Meta Pixel ID: 947636671276929
// TikTok Pixel ID: DB2I7I3C77UA626EHF30

import { 
  trackTikTokViewContent, 
  trackTikTokInitiateCheckout, 
  trackTikTokPurchase, 
  trackTikTokContact 
} from './tiktokPixel';

export const META_PIXEL_ID = '947636671276929';

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: any;
  }
}

/**
 * Safely triggers a Meta Pixel tracking event
 */
export function trackMetaPixel(eventName: string, params?: Record<string, any>) {
  try {
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      if (params) {
        window.fbq('track', eventName, params);
      } else {
        window.fbq('track', eventName);
      }
    }
  } catch (err) {
    console.debug('Meta Pixel event dispatch error:', err);
  }
}

/**
 * Track ViewContent event for product page
 */
export function trackViewContent(productName: string, price: number, currency: string = 'NGN') {
  trackMetaPixel('ViewContent', {
    content_name: productName,
    content_category: 'Kitchen Fixtures',
    value: price,
    currency: currency,
  });
  trackTikTokViewContent(productName, price, currency);
}

/**
 * Track InitiateCheckout when user starts order process
 */
export function trackInitiateCheckout(value: number, currency: string = 'NGN') {
  trackMetaPixel('InitiateCheckout', {
    value: value,
    currency: currency,
  });
  trackTikTokInitiateCheckout(value, currency);
}

/**
 * Track Purchase event on successful order placement
 */
export function trackPurchase(orderId: string, totalAmount: number, currency: string = 'NGN', quantity: number = 1) {
  trackMetaPixel('Purchase', {
    content_name: 'Smart Kitchen Piano Sink',
    content_type: 'product',
    content_ids: [orderId],
    num_items: quantity,
    value: totalAmount,
    currency: currency,
  });
  // Also track Lead as common in direct response landing pages
  trackMetaPixel('Lead', {
    content_name: 'Smart Kitchen Piano Sink Order',
    value: totalAmount,
    currency: currency,
  });
  // Track on TikTok (both CompletePayment and PlaceAnOrder)
  trackTikTokPurchase(orderId, totalAmount, currency, quantity);
}

/**
 * Track Contact (WhatsApp or Phone call)
 */
export function trackContact(channel: 'whatsapp' | 'phone', label?: string) {
  trackMetaPixel('Contact', {
    channel,
    label,
  });
  trackTikTokContact(channel, label);
}
