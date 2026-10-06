// TikTok Pixel Tracking Utilities
// Pixel ID: DB2I7I3C77UA626EHF30

export const TIKTOK_PIXEL_ID = 'DB2I7I3C77UA626EHF30';

declare global {
  interface Window {
    ttq?: {
      track: (eventName: string, params?: Record<string, any>) => void;
      page: () => void;
      [key: string]: any;
    };
  }
}

/**
 * Safely triggers a TikTok Pixel tracking event
 */
export function trackTikTokPixel(eventName: string, params?: Record<string, any>) {
  try {
    if (typeof window !== 'undefined' && window.ttq && typeof window.ttq.track === 'function') {
      if (params) {
        window.ttq.track(eventName, params);
      } else {
        window.ttq.track(eventName);
      }
    }
  } catch (err) {
    console.debug('TikTok Pixel event dispatch error:', err);
  }
}

/**
 * Track ViewContent event on TikTok
 */
export function trackTikTokViewContent(productName: string, price: number, currency: string = 'NGN') {
  trackTikTokPixel('ViewContent', {
    content_name: productName,
    content_type: 'product',
    content_id: 'sink',
    value: price,
    currency: currency,
  });
}

/**
 * Track InitiateCheckout event on TikTok
 */
export function trackTikTokInitiateCheckout(value: number, currency: string = 'NGN') {
  trackTikTokPixel('InitiateCheckout', {
    value: value,
    currency: currency,
  });
}

/**
 * Track Purchase & PlaceAnOrder events on TikTok
 */
export function trackTikTokPurchase(orderId: string, totalAmount: number, currency: string = 'NGN', quantity: number = 1) {
  // TikTok standard events for e-commerce purchases
  trackTikTokPixel('CompletePayment', {
    content_id: orderId,
    content_type: 'product',
    content_name: 'Smart Kitchen Piano Sink',
    quantity: quantity,
    value: totalAmount,
    currency: currency,
  });

  trackTikTokPixel('PlaceAnOrder', {
    content_id: orderId,
    content_type: 'product',
    content_name: 'Smart Kitchen Piano Sink',
    quantity: quantity,
    value: totalAmount,
    currency: currency,
  });
}

/**
 * Track Contact event on TikTok
 */
export function trackTikTokContact(channel: 'whatsapp' | 'phone', label?: string) {
  trackTikTokPixel('Contact', {
    channel,
    label,
  });
}
