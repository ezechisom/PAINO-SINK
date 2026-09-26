import React, { useState, useEffect } from 'react';
import { SiteConfig, OrderData, OrderItem } from '../types';
import { NIGERIAN_STATES, getMotorParksForState } from '../data/nigeria';
import { formatNaira, FORMSPREE_ENDPOINT } from '../config';
import { getWhatsAppUrl } from '../utils/whatsapp';
import { trackPurchase, trackContact } from '../utils/metaPixel';
import { triggerOrderConfetti } from './OrderForm';
import { 
  X, 
  ShoppingBag, 
  CheckCircle2, 
  ShieldCheck, 
  Truck, 
  MessageCircle, 
  ArrowRight, 
  Sparkles,
  Phone,
  User,
  MapPin,
  Plus,
  Minus,
  Lock,
  BadgeCheck,
  Flame,
  Zap,
  Check,
  PackageCheck,
  Copy
} from 'lucide-react';

interface QuickOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: SiteConfig;
  initialProductId?: string | null;
  onOrderPlaced?: (order: { orderId: string; orderData: OrderData; totalAmount: number; timestamp: string } | null) => void;
}

export const QuickOrderModal: React.FC<QuickOrderModalProps> = ({
  isOpen,
  onClose,
  config,
  initialProductId,
  onOrderPlaced
}) => {
  // Product quantities
  const [sinkQty, setSinkQty] = useState<number>(1);
  const [cooker2bQty, setCooker2bQty] = useState<number>(0);
  const [cooker5bQty, setCooker5bQty] = useState<number>(0);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('Lagos');
  const [deliveryMethod, setDeliveryMethod] = useState<'park_pickup' | 'doorstep'>('park_pickup');
  const [selectedMotorPark, setSelectedMotorPark] = useState<string>('');
  const [notes, setNotes] = useState('');

  // Status & Validation
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedId, setCopiedId] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<{
    orderId: string;
    orderData: OrderData;
    totalAmount: number;
    timestamp: string;
  } | null>(null);

  // Synchronize initial preselection when modal opens
  useEffect(() => {
    if (!isOpen) return;

    if (initialProductId === 'cooker-2burner') {
      setCooker2bQty(1);
      setSinkQty(0);
      setCooker5bQty(0);
    } else if (initialProductId === 'cooker-5burner') {
      setCooker5bQty(1);
      setSinkQty(0);
      setCooker2bQty(0);
    } else if (initialProductId === 'sink') {
      setSinkQty(1);
      setCooker2bQty(0);
      setCooker5bQty(0);
    }
  }, [isOpen, initialProductId]);

  // Update motor parks when state changes
  const availableParks = getMotorParksForState(state);
  useEffect(() => {
    if (availableParks && availableParks.length > 0) {
      setSelectedMotorPark(availableParks[0].name);
    } else {
      setSelectedMotorPark('');
    }
  }, [state]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Prices
  const SINK_PRICE = config.promoPrice;
  const COOKER_2B_PRICE = 170000;
  const COOKER_5B_PRICE = 280000;

  const isLagosState = state.toLowerCase().trim() === 'lagos';
  const deliveryFee = isLagosState ? 0 : (deliveryMethod === 'doorstep' ? 5000 : 0);

  // Selected items array
  const selectedItems: OrderItem[] = [];
  if (sinkQty > 0) {
    selectedItems.push({
      id: 'sink',
      name: `${config.productName} (75×45cm)`,
      quantity: sinkQty,
      unitPrice: SINK_PRICE,
      totalPrice: sinkQty * SINK_PRICE
    });
  }
  if (cooker2bQty > 0) {
    selectedItems.push({
      id: 'cooker-2burner',
      name: '2-Flip-Up Double Gas Burner With Timer (75×45cm)',
      quantity: cooker2bQty,
      unitPrice: COOKER_2B_PRICE,
      totalPrice: cooker2bQty * COOKER_2B_PRICE
    });
  }
  if (cooker5bQty > 0) {
    selectedItems.push({
      id: 'cooker-5burner',
      name: 'Executive 5-Burner Gas + Electric Hybrid Cooktop (90×51cm)',
      quantity: cooker5bQty,
      unitPrice: COOKER_5B_PRICE,
      totalPrice: cooker5bQty * COOKER_5B_PRICE
    });
  }

  const totalItemCount = sinkQty + cooker2bQty + cooker5bQty;
  const itemsSubtotal = selectedItems.reduce((acc, it) => acc + it.totalPrice, 0);

  // Multi-product discount (₦5,000 for 2 or more products)
  const multiItemDiscount = totalItemCount >= 2 ? 5000 : 0;
  const totalPrice = Math.max(0, itemsSubtotal - multiItemDiscount) + deliveryFee;

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (totalItemCount < 1) {
      newErrors.items = 'Please select at least 1 product to order';
    }
    if (!fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }
    if (!phone.trim() || phone.trim().length < 9) {
      newErrors.phone = 'Valid phone number is required for dispatch confirmation';
    }
    if (!address.trim()) {
      newErrors.address = 'Delivery address or landmark is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const effectivePark = (!isLagosState && deliveryMethod === 'park_pickup')
      ? (selectedMotorPark || (availableParks && availableParks.length > 0 ? availableParks[0].name : 'Central Motor Park'))
      : undefined;

    const orderId = `SKS-${Math.floor(100000 + Math.random() * 900000)}`;

    const deliveryMethodText = isLagosState
      ? 'Direct Doorstep Delivery (Lagos - FREE)'
      : (deliveryMethod === 'doorstep'
          ? 'Doorstep Delivery (+₦5,000 Extra Fee)'
          : `Motor Park Pick-Up (FREE)${effectivePark ? ` - ${effectivePark}` : ''}`);

    const itemsSummaryText = selectedItems.map(item => `${item.quantity}x ${item.name} (${formatNaira(item.totalPrice)})`).join(' | ');

    // Post to Formspree
    const formspreeUrl = config.formspreeEndpoint || FORMSPREE_ENDPOINT;
    try {
      await fetch(formspreeUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          order_id: orderId,
          order_channel: 'QUICK_ORDER_POPUP',
          customer_name: fullName,
          phone_number: phone,
          delivery_state: state,
          delivery_address: address,
          delivery_method: deliveryMethodText,
          pickup_motor_park: effectivePark || 'N/A',
          ordered_items: itemsSummaryText,
          total_products_count: totalItemCount,
          subtotal: formatNaira(itemsSubtotal),
          multi_item_discount: multiItemDiscount > 0 ? `-${formatNaira(multiItemDiscount)}` : 'None',
          delivery_fee: formatNaira(deliveryFee),
          total_amount_payable: formatNaira(totalPrice),
          customer_notes: notes || 'None',
          submission_time: new Date().toLocaleString('en-NG'),
          _subject: `[QUICK POPUP ORDER] ${orderId}: ${fullName} - ${formatNaira(totalPrice)}`
        })
      });
    } catch (err) {
      console.warn('Quick Order Formspree submission error:', err);
    }

    const newOrder = {
      orderId,
      orderData: {
        fullName,
        phone,
        address,
        state,
        email: '',
        quantity: totalItemCount,
        items: selectedItems,
        multiItemDiscount,
        deliveryMethod: isLagosState ? 'doorstep' : deliveryMethod,
        pickupMotorPark: effectivePark,
        deliveryFee,
        estimatedDeliveryDays: isLagosState ? '1 to 2 business days' : '3 to 5 business days',
        notes
      },
      totalAmount: totalPrice,
      timestamp: new Date().toLocaleString('en-NG', { dateStyle: 'medium', timeStyle: 'short' })
    };

    setSubmittedOrder(newOrder);
    setIsSubmitting(false);

    // Trigger celebration & Pixel
    triggerOrderConfetti();
    trackPurchase(orderId, totalPrice, 'NGN', totalItemCount);

    if (onOrderPlaced) {
      onOrderPlaced(newOrder);
    }
  };

  const handleCopyOrderId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2500);
  };

  // Build WhatsApp url for the completed order
  const getSuccessWhatsAppUrl = () => {
    if (!submittedOrder) return '';
    const message = `Hello Moonlight, I just placed Quick Order #${submittedOrder.orderId} for:\n${submittedOrder.orderData.items?.map(it => `• ${it.quantity}x ${it.name}`).join('\n')}\nTotal Payable on Delivery: ${formatNaira(submittedOrder.totalAmount)}.\nName: ${submittedOrder.orderData.fullName}\nAddress: ${submittedOrder.orderData.address}, ${submittedOrder.orderData.state}.\nPlease confirm and fast-track my delivery dispatch.`;
    return getWhatsAppUrl(config.whatsappNumber, config.productName, undefined, message);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
      />

      {/* Modal Dialog Content */}
      <div 
        className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 flex flex-col max-h-[92vh] my-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-order-title"
      >
        {/* Modal Top Header Bar */}
        <div className="bg-[#0a192f] text-white px-5 sm:px-6 py-4 flex items-center justify-between border-b border-blue-900/60 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-4 h-4 text-blue-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-xs font-black bg-blue-500/30 text-blue-300 border border-blue-400/30 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Express Checkout
                </span>
                <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Ready to Dispatch
                </span>
              </div>
              <h2 id="quick-order-title" className="text-base sm:text-lg font-black text-white tracking-tight mt-0.5 font-display">
                ⚡ Quick Order Form
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
            aria-label="Close Quick Order Pop Up"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body: Scrollable */}
        <div className="overflow-y-auto px-4 sm:px-6 py-5 flex-1 space-y-5">
          
          {submittedOrder ? (
            /* SUCCESS CONFIRMATION RECEIPT SCREEN */
            <div className="space-y-5 animate-fadeIn text-center">
              
              <div className="w-16 h-16 rounded-full bg-emerald-100 border-4 border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-xs font-black tracking-widest text-emerald-600 uppercase bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                  Order Successfully Placed!
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-[#0a192f] mt-2">
                  Thank You, {submittedOrder.orderData.fullName}!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-md mx-auto">
                  Your quick order has been recorded and queued for priority packaging &amp; dispatch. 
                  <span className="block font-bold text-slate-800 mt-0.5">Pay only when your package arrives!</span>
                </p>
              </div>

              {/* Order ID Pill */}
              <div className="bg-slate-100 border border-slate-300 rounded-2xl p-3 max-w-sm mx-auto flex items-center justify-between">
                <div className="text-left">
                  <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">Order Reference ID</span>
                  <span className="text-base font-black text-[#0a192f] font-mono tracking-tight">{submittedOrder.orderId}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyOrderId(submittedOrder.orderId)}
                  className="flex items-center gap-1 text-xs font-bold text-blue-700 bg-white hover:bg-blue-50 border border-slate-200 px-2.5 py-1.5 rounded-xl transition-all cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedId ? 'Copied!' : 'Copy ID'}</span>
                </button>
              </div>

              {/* Order Summary Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-xs font-bold text-slate-700">
                  <span>Selected Products</span>
                  <span>Total Amount</span>
                </div>

                <div className="space-y-2 text-xs">
                  {submittedOrder.orderData.items?.map((it) => (
                    <div key={it.id} className="flex justify-between items-center text-slate-800">
                      <span className="font-semibold">
                        {it.quantity}x {it.name}
                      </span>
                      <span className="font-mono font-bold text-slate-900">{formatNaira(it.totalPrice)}</span>
                    </div>
                  ))}
                  
                  {submittedOrder.orderData.multiItemDiscount && submittedOrder.orderData.multiItemDiscount > 0 ? (
                    <div className="flex justify-between items-center text-emerald-600 font-bold pt-1 border-t border-slate-200">
                      <span>Multi-Product Bundle Discount</span>
                      <span>-{formatNaira(submittedOrder.orderData.multiItemDiscount)}</span>
                    </div>
                  ) : null}

                  <div className="flex justify-between items-center text-slate-600">
                    <span>Delivery ({submittedOrder.orderData.state})</span>
                    <span className="font-bold">
                      {submittedOrder.orderData.deliveryFee && submittedOrder.orderData.deliveryFee > 0
                        ? formatNaira(submittedOrder.orderData.deliveryFee)
                        : 'FREE'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-sm font-black text-[#0a192f] pt-2 border-t-2 border-slate-300">
                    <span>Total Payable on Delivery:</span>
                    <span className="text-base text-blue-700 font-mono font-black">{formatNaira(submittedOrder.totalAmount)}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-600">
                  <p><strong>Deliver to:</strong> {submittedOrder.orderData.address}, {submittedOrder.orderData.state}</p>
                  <p><strong>Phone:</strong> {submittedOrder.orderData.phone}</p>
                </div>
              </div>

              {/* DIRECT CONTACT UNLOCKED AFTER ORDER COMPLETION */}
              {/* This fulfills the explicit user instruction to make WhatsApp & Phone visible after the form is filled */}
              <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-4 text-left space-y-3">
                <div className="flex items-center gap-2 text-emerald-800">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className="text-xs font-black uppercase tracking-wide">
                    Fast-Track Your Dispatch Via WhatsApp
                  </span>
                </div>
                <p className="text-xs text-emerald-900">
                  Need instant priority dispatch or have special questions? Click below to chat directly with Moonlight Luxury Home Tech on WhatsApp.
                </p>

                <div className="flex flex-col sm:flex-row gap-2 pt-1">
                  <a
                    href={getSuccessWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackContact('whatsapp', 'quick-popup-whatsapp')}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-black text-xs sm:text-sm py-3 px-4 rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Chat on WhatsApp With Moonlight</span>
                  </a>

                  <a
                    href={`tel:${config.phoneNumber.replace(/\s+/g, '')}`}
                    onClick={() => trackContact('phone', 'quick-popup-call')}
                    className="inline-flex items-center justify-center gap-1.5 bg-[#0a192f] hover:bg-slate-800 text-white font-extrabold text-xs py-3 px-4 rounded-xl shadow-sm transition-all cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5 text-blue-400" />
                    <span>Call Moonlight: {config.phoneNumber}</span>
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs sm:text-sm rounded-xl transition-all cursor-pointer"
                >
                  Done &bull; Continue Browsing
                </button>
              </div>

            </div>
          ) : (
            /* QUICK ORDER FORM */
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Product Selector Section */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-black text-[#0a192f] uppercase tracking-wider flex items-center gap-1.5">
                    <ShoppingBag className="w-3.5 h-3.5 text-blue-600" />
                    <span>1. Choose Products to Order</span>
                  </label>
                  {totalItemCount >= 2 && (
                    <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
                      ₦5,000 Bundle Discount Active!
                    </span>
                  )}
                </div>

                {errors.items && (
                  <p className="text-red-600 text-xs font-bold mb-2">{errors.items}</p>
                )}

                <div className="space-y-2.5">
                  {/* Product 1: Smart Piano Sink */}
                  <div className={`p-3 rounded-2xl border transition-all ${
                    sinkQty > 0 
                      ? 'bg-blue-50/60 border-blue-500/60 ring-1 ring-blue-500/30' 
                      : 'bg-white border-slate-200 opacity-80 hover:opacity-100'
                  }`}>
                    <div className="flex items-center gap-3">
                      <img 
                        src="/images/smart_piano_sink_1789548024514.jpg" 
                        alt="Smart Piano Sink"
                        className="w-14 h-14 rounded-xl object-cover border border-slate-200 shrink-0" 
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-black text-[#0a192f] truncate">Smart Piano Sink</span>
                          <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.2 rounded shrink-0">75×45cm</span>
                        </div>
                        <p className="text-[11px] text-slate-500 truncate">Digital °C, Waterfall &amp; Full Prep Set</p>
                        <span className="text-xs font-extrabold text-blue-700 font-mono">{formatNaira(SINK_PRICE)}</span>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0 bg-white border border-slate-200 rounded-xl p-1 shadow-2xs">
                        <button
                          type="button"
                          onClick={() => setSinkQty(prev => Math.max(0, prev - 1))}
                          className="w-6 h-6 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs cursor-pointer transition-colors"
                          aria-label="Decrease sink quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-black font-mono">{sinkQty}</span>
                        <button
                          type="button"
                          onClick={() => setSinkQty(prev => Math.min(10, prev + 1))}
                          className="w-6 h-6 rounded-lg bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center font-bold text-xs cursor-pointer transition-colors"
                          aria-label="Increase sink quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Product 2: 2-Flip-Up Cooker */}
                  <div className={`p-3 rounded-2xl border transition-all ${
                    cooker2bQty > 0 
                      ? 'bg-amber-50/70 border-amber-500/60 ring-1 ring-amber-500/30' 
                      : 'bg-white border-slate-200 opacity-80 hover:opacity-100'
                  }`}>
                    <div className="flex items-center gap-3">
                      <img 
                        src="https://www.moonlightluxuryhometech.shop/images/cooker_active_blue_flames.jpg" 
                        alt="2-Flip-Up Double Gas Cooker"
                        className="w-14 h-14 rounded-xl object-cover border border-slate-200 shrink-0" 
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-black text-[#0a192f] truncate">2-Flip-Up Gas Burner</span>
                          <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-1.5 py-0.2 rounded shrink-0">Timer</span>
                        </div>
                        <p className="text-[11px] text-slate-500 truncate">90° Flip-Up Hinges &amp; Safety Auto-Off</p>
                        <span className="text-xs font-extrabold text-amber-700 font-mono">{formatNaira(COOKER_2B_PRICE)}</span>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0 bg-white border border-slate-200 rounded-xl p-1 shadow-2xs">
                        <button
                          type="button"
                          onClick={() => setCooker2bQty(prev => Math.max(0, prev - 1))}
                          className="w-6 h-6 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs cursor-pointer transition-colors"
                          aria-label="Decrease cooker quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-black font-mono">{cooker2bQty}</span>
                        <button
                          type="button"
                          onClick={() => setCooker2bQty(prev => Math.min(10, prev + 1))}
                          className="w-6 h-6 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs cursor-pointer transition-colors"
                          aria-label="Increase cooker quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Product 3: Executive 5-Burner Cooker */}
                  <div className={`p-3 rounded-2xl border transition-all ${
                    cooker5bQty > 0 
                      ? 'bg-cyan-50/70 border-cyan-500/60 ring-1 ring-cyan-500/30' 
                      : 'bg-white border-slate-200 opacity-80 hover:opacity-100'
                  }`}>
                    <div className="flex items-center gap-3">
                      <img 
                        src="https://www.moonlightluxuryhometech.shop/images/5burner_dual_fuel_overview.jpg" 
                        alt="5-Burner Hybrid Cooker"
                        className="w-14 h-14 rounded-xl object-cover border border-slate-200 shrink-0" 
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-black text-[#0a192f] truncate">Executive 5-Burner Cooker</span>
                          <span className="text-[10px] bg-cyan-100 text-cyan-900 font-bold px-1.5 py-0.2 rounded shrink-0">90×51cm</span>
                        </div>
                        <p className="text-[11px] text-slate-500 truncate">4 Gas + 2000W Electric Ceramic Zone</p>
                        <span className="text-xs font-extrabold text-cyan-800 font-mono">{formatNaira(COOKER_5B_PRICE)}</span>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0 bg-white border border-slate-200 rounded-xl p-1 shadow-2xs">
                        <button
                          type="button"
                          onClick={() => setCooker5bQty(prev => Math.max(0, prev - 1))}
                          className="w-6 h-6 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs cursor-pointer transition-colors"
                          aria-label="Decrease 5-burner quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-black font-mono">{cooker5bQty}</span>
                        <button
                          type="button"
                          onClick={() => setCooker5bQty(prev => Math.min(10, prev + 1))}
                          className="w-6 h-6 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white flex items-center justify-center font-bold text-xs cursor-pointer transition-colors"
                          aria-label="Increase 5-burner quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Contact Details */}
              <div className="space-y-3 pt-2 border-t border-slate-200">
                <label className="text-xs font-black text-[#0a192f] uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-blue-600" />
                  <span>2. Delivery Contact &amp; Address</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name <span className="text-red-600">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          if (errors.fullName) setErrors(prev => ({ ...prev, fullName: '' }));
                        }}
                        placeholder="e.g. Chief Dr. Emeka Okafor"
                        className={`w-full bg-slate-50 border rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                          errors.fullName ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300'
                        }`}
                      />
                    </div>
                    {errors.fullName && <p className="text-red-500 text-[11px] mt-0.5">{errors.fullName}</p>}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Active Phone / WhatsApp <span className="text-red-600">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
                        }}
                        placeholder="e.g. 0803 123 4567"
                        className={`w-full bg-slate-50 border rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                          errors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300'
                        }`}
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-[11px] mt-0.5">{errors.phone}</p>}
                  </div>
                </div>

                {/* State & Delivery Method */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Delivery State <span className="text-red-600">*</span>
                    </label>
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
                    >
                      {NIGERIAN_STATES.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Delivery Method
                    </label>
                    {isLagosState ? (
                      <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2.5 text-xs text-emerald-800 font-bold flex items-center justify-between">
                        <span>Direct Doorstep Delivery (Lagos)</span>
                        <span className="text-emerald-700 uppercase text-[10px]">FREE</span>
                      </div>
                    ) : (
                      <select
                        value={deliveryMethod}
                        onChange={(e) => setDeliveryMethod(e.target.value as any)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
                      >
                        <option value="park_pickup">Motor Park Pick-Up (FREE)</option>
                        <option value="doorstep">Doorstep Delivery (+₦5,000)</option>
                      </select>
                    )}
                  </div>
                </div>

                {/* Motor Park Choice if outside Lagos and choosing park pickup */}
                {!isLagosState && deliveryMethod === 'park_pickup' && availableParks && availableParks.length > 0 && (
                  <div className="bg-blue-50/70 border border-blue-200 p-3 rounded-xl">
                    <label className="block text-xs font-bold text-blue-950 mb-1">
                      Select Preferred Park in {state}:
                    </label>
                    <select
                      value={selectedMotorPark}
                      onChange={(e) => setSelectedMotorPark(e.target.value)}
                      className="w-full bg-white border border-blue-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      {availableParks.map(p => (
                        <option key={p.name} value={p.name}>{p.name} ({p.area})</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Street Address */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Street Address / Bus Stop / Area Landmark <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <textarea
                      rows={2}
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                        if (errors.address) setErrors(prev => ({ ...prev, address: '' }));
                      }}
                      placeholder="e.g. Plot 14, Admiralty Way, Lekki Phase 1, near Ebeano Supermarket"
                      className={`w-full bg-slate-50 border rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                        errors.address ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300'
                      }`}
                    />
                  </div>
                  {errors.address && <p className="text-red-500 text-[11px] mt-0.5">{errors.address}</p>}
                </div>
              </div>

              {/* Order Cost Summary */}
              <div className="bg-slate-900 text-white rounded-2xl p-4 space-y-2 text-xs">
                <div className="flex justify-between items-center text-slate-300">
                  <span>Selected Products Subtotal:</span>
                  <span className="font-mono font-bold">{formatNaira(itemsSubtotal)}</span>
                </div>

                {multiItemDiscount > 0 && (
                  <div className="flex justify-between items-center text-emerald-400 font-bold">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-emerald-400" />
                      Multi-Product Bundle Discount (2+ items):
                    </span>
                    <span className="font-mono">-{formatNaira(multiItemDiscount)}</span>
                  </div>
                )}

                <div className="flex justify-between items-center text-slate-300">
                  <span>Delivery ({isLagosState ? 'Lagos Doorstep' : (deliveryMethod === 'doorstep' ? 'Doorstep Extra' : 'Motor Park')}):</span>
                  <span className="font-mono font-bold">{deliveryFee > 0 ? formatNaira(deliveryFee) : 'FREE'}</span>
                </div>

                <div className="flex justify-between items-center text-base sm:text-lg font-black pt-2 border-t border-slate-800 text-white">
                  <span>Total Payable on Delivery:</span>
                  <span className="text-blue-400 font-mono tracking-tight font-black">{formatNaira(totalPrice)}</span>
                </div>

                <div className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Zero advance payment required &bull; Inspect before paying</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || totalItemCount < 1}
                className="w-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 hover:from-blue-500 hover:to-blue-400 text-white font-black text-sm sm:text-base py-3.5 px-6 rounded-2xl shadow-xl shadow-blue-600/30 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Recording Your Quick Order...
                  </span>
                ) : (
                  <>
                    <span>CONFIRM QUICK ORDER &bull; {formatNaira(totalPrice)}</span>
                    <ArrowRight className="w-5 h-5 shrink-0" />
                  </>
                )}
              </button>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-slate-500 pt-1">
                <div className="flex items-center justify-center gap-1">
                  <Lock className="w-3 h-3 text-blue-600 shrink-0" />
                  <span>256-Bit SSL</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <BadgeCheck className="w-3 h-3 text-emerald-600 shrink-0" />
                  <span>Verified Vendor</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <PackageCheck className="w-3 h-3 text-amber-600 shrink-0" />
                  <span>Inspect On Arrival</span>
                </div>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
