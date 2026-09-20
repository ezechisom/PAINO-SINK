import React, { useState } from 'react';
import { getWhatsAppUrl } from '../utils/whatsapp';
import { trackContact } from '../utils/metaPixel';
import { MessageCircle, X } from 'lucide-react';

interface FloatingWhatsAppProps {
  whatsappNumber: string;
  productName: string;
  visible: boolean;
  orderId?: string | null;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ 
  whatsappNumber, 
  productName,
  visible,
  orderId
}) => {
  const [showTooltip, setShowTooltip] = useState(true);

  if (!visible) {
    return null;
  }

  const customMessage = orderId 
    ? `Hello Moonlight, I just placed order #${orderId} for the ${productName}. Please confirm with me.`
    : undefined;

  const whatsappUrl = getWhatsAppUrl(whatsappNumber, productName, undefined, customMessage);

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40 flex flex-col items-end animate-bounce">
      {showTooltip && (
        <div className="mb-2 bg-emerald-950 border border-emerald-500/60 text-emerald-200 text-xs py-2 px-3 rounded-xl shadow-2xl flex items-center gap-2">
          <span>Order Received! Tap to chat with Moonlight on WhatsApp</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-emerald-400 hover:text-white p-0.5 cursor-pointer"
            aria-label="Close tooltip"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackContact('whatsapp')}
        id="floating-whatsapp-btn"
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all group ring-4 ring-emerald-400/40"
        aria-label="Chat with Moonlight on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-white" />
        <span className="sr-only">Chat with Moonlight on WhatsApp</span>
      </a>
    </div>
  );
};
