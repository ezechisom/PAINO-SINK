import React, { useState, useMemo, useRef, useEffect } from 'react';
import { FaqItem } from '../types';
import { 
  HelpCircle, 
  X, 
  Search, 
  PhoneCall, 
  MessageCircle, 
  ChevronRight, 
  Sparkles,
  Bot,
  User,
  RotateCcw
} from 'lucide-react';
import { getWhatsAppUrl } from '../utils/whatsapp';
import { trackContact } from '../utils/metaPixel';

interface FloatingFaqChatProps {
  faqs: FaqItem[];
  phoneNumber?: string;
  whatsappNumber?: string;
  productName?: string;
  hasPlacedOrder?: boolean;
}

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  faqId?: string;
}

export const FloatingFaqChat: React.FC<FloatingFaqChatProps> = ({
  faqs,
  phoneNumber = '09136827730',
  whatsappNumber = '09136827730',
  productName = 'Smart Luxury Piano Sink',
  hasPlacedOrder = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFaqId, setSelectedFaqId] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Filter FAQs based on user search query
  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) return faqs;
    const q = searchQuery.toLowerCase().trim();
    return faqs.filter(
      (f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)
    );
  }, [faqs, searchQuery]);

  const getTimeString = () => {
    return new Date().toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' });
  };

  // When user selects a question from the list
  const handleSelectFaq = (faq: FaqItem) => {
    setSelectedFaqId(faq.id);
    const now = getTimeString();
    
    // Add user question message, then assistant answer message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: faq.question,
      time: now,
      faqId: faq.id
    };

    const botMsg: ChatMessage = {
      id: `bot-${Date.now() + 1}`,
      sender: 'bot',
      text: faq.answer,
      time: now,
      faqId: faq.id
    };

    setChatHistory((prev) => [...prev, userMsg, botMsg]);
  };

  const handleResetChat = () => {
    setChatHistory([]);
    setSelectedFaqId(null);
    setSearchQuery('');
  };

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory, isOpen]);

  const whatsappInquiryUrl = getWhatsAppUrl(
    whatsappNumber,
    productName,
    undefined,
    `Hello Moonlight! I was reading your FAQ on the website and have a specific question about the ${productName}: `
  );

  return (
    <>
      {/* 1. FLOATING CHAT BUTTON AT THE TOP OF THE WEBSITE */}
      <div className="fixed top-20 right-3 sm:right-6 z-40">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          id="floating-faq-chat-btn"
          aria-label="Open Frequently Asked Questions Chat"
          className="group flex items-center gap-2.5 bg-gradient-to-r from-[#0a192f] to-[#172a46] hover:from-[#112240] hover:to-[#1e3a63] text-white px-3.5 py-2.5 rounded-full shadow-xl border-2 border-blue-400/40 hover:border-amber-400 transition-all duration-300 cursor-pointer active:scale-95 animate-soft-blink"
        >
          {/* Animated pulsing chat icon */}
          <div className="relative flex items-center justify-center">
            <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full absolute -top-1 -right-1 ring-2 ring-[#0a192f] animate-pulse" />
            <div className="w-8 h-8 rounded-full bg-blue-600/60 border border-blue-400/50 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform">
              <HelpCircle className="w-4 h-4 text-amber-300" />
            </div>
          </div>

          <div className="text-left hidden xs:block sm:block pr-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-300">
                FAQ Chat
              </span>
              <span className="text-[9px] bg-emerald-500/20 text-emerald-300 font-bold px-1.5 py-0.2 rounded-full border border-emerald-400/30">
                Instant
              </span>
            </div>
            <span className="text-[10px] text-slate-300 block -mt-0.5 font-medium">
              Got Questions? Ask Here 💬
            </span>
          </div>

          <div className="xs:hidden sm:hidden pr-0.5">
            <span className="text-[11px] font-black uppercase tracking-wider text-amber-300">
              FAQs
            </span>
          </div>
        </button>
      </div>

      {/* 2. CHAT DRAWER / POPUP WINDOW */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:justify-end p-2 sm:p-6 bg-black/50 backdrop-blur-xs transition-opacity"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          <div 
            id="floating-faq-chat-modal"
            className="w-full sm:w-[440px] max-h-[85vh] sm:max-h-[640px] bg-slate-900 border-2 border-blue-500/40 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
          >
            {/* Header */}
            <div className="p-4 bg-[#0a192f] border-b border-slate-800 flex items-center justify-between text-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold border border-blue-400/30 shadow-xs">
                    <Bot className="w-5 h-5 text-amber-300" />
                  </div>
                  <span className="w-3 h-3 bg-emerald-400 rounded-full absolute bottom-0 right-0 ring-2 ring-[#0a192f]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-extrabold text-sm sm:text-base text-white tracking-tight">
                      Moonlight FAQ Assistant
                    </h3>
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <p className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-ping" />
                    Online &bull; Instant Answers
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {chatHistory.length > 0 && (
                  <button
                    type="button"
                    onClick={handleResetChat}
                    className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                    title="Reset Conversation"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                  aria-label="Close FAQ Chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="p-3 bg-slate-950/60 border-b border-slate-800/80 shrink-0">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search questions (dimensions, delivery, parts...)"
                  className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-xl pl-9 pr-8 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
                  >
                    &times;
                  </button>
                )}
              </div>
            </div>

            {/* Chat Body & Conversation */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/30">
              {/* Welcome Bot Message */}
              <div className="flex items-start gap-2.5 max-w-[92%]">
                <div className="w-7 h-7 rounded-full bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-amber-300 shrink-0 mt-0.5">
                  <Bot className="w-4 h-4 text-amber-300" />
                </div>
                <div className="bg-slate-800/90 border border-slate-700/80 text-slate-200 text-xs sm:text-sm p-3.5 rounded-2xl rounded-tl-sm shadow-sm leading-relaxed">
                  <p>
                    Hello! 👋 Welcome to <strong>Moonlight Luxury Home Tech</strong>. Have a question about our Smart Kitchen Piano Sink, installations, or pay-on-delivery across Nigeria?
                  </p>
                  <p className="mt-2 text-slate-300 font-semibold text-[11px] text-amber-300/90">
                    👇 Tap any question below for an immediate answer:
                  </p>
                </div>
              </div>

              {/* Chat History Messages */}
              {chatHistory.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${
                    msg.sender === 'user' ? 'justify-end' : 'justify-start max-w-[92%]'
                  }`}
                >
                  {msg.sender === 'bot' && (
                    <div className="w-7 h-7 rounded-full bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-amber-300 shrink-0 mt-0.5">
                      <Bot className="w-4 h-4 text-amber-300" />
                    </div>
                  )}

                  <div
                    className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-sm max-w-[85%]'
                        : 'bg-slate-800/90 border border-slate-700/80 text-slate-200 rounded-tl-sm'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                    <span className="text-[9px] opacity-60 block text-right mt-1.5 font-mono">
                      {msg.time}
                    </span>
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-7 h-7 rounded-full bg-blue-900 border border-blue-700 flex items-center justify-center text-white shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              ))}

              {/* Quick Question Chips / Selectable FAQ Options */}
              <div className="pt-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2 px-1">
                  {searchQuery ? `Matching Questions (${filteredFaqs.length})` : 'Frequently Asked Questions:'}
                </span>

                <div className="space-y-1.5">
                  {filteredFaqs.map((faq) => {
                    const isCurrent = selectedFaqId === faq.id;
                    return (
                      <button
                        key={faq.id}
                        type="button"
                        onClick={() => handleSelectFaq(faq)}
                        className={`w-full text-left p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between gap-2 transition-all cursor-pointer ${
                          isCurrent
                            ? 'bg-blue-600/20 border-blue-500 text-blue-200'
                            : 'bg-slate-900/80 hover:bg-slate-800 border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white'
                        }`}
                      >
                        <span className="line-clamp-1">{faq.question}</span>
                        <ChevronRight className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                      </button>
                    );
                  })}

                  {filteredFaqs.length === 0 && (
                    <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800 text-center text-xs text-slate-400">
                      No matching questions found for &quot;{searchQuery}&quot;. Ask us directly below!
                    </div>
                  )}
                </div>
              </div>

              <div ref={chatBottomRef} />
            </div>

            {/* Footer: Direct Human Contact CTAs only AFTER order placed */}
            <div className="p-3 bg-slate-900 border-t border-slate-800 shrink-0">
              {hasPlacedOrder ? (
                <>
                  <div className="text-[10px] text-slate-400 text-center mb-2 font-medium">
                    Need more details or custom kitchen advice?
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={`tel:${phoneNumber.replace(/\s+/g, '')}`}
                      onClick={() => trackContact('phone', 'faq-chat-call')}
                      className="inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold rounded-xl text-xs border border-slate-700 transition-colors"
                    >
                      <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                      <span>Call {phoneNumber}</span>
                    </a>

                    <a
                      href={whatsappInquiryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackContact('whatsapp', 'faq-chat-whatsapp')}
                      className="inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-xs transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-white" />
                      <span>WhatsApp Moonlight</span>
                    </a>
                  </div>
                </>
              ) : (
                <div className="text-[11px] text-slate-300 text-center py-1 font-medium">
                  Tap any question above for instant answers, or scroll to the order form below.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
