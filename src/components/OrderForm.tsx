import React, { useState, useEffect } from 'react';
import { SiteConfig, OrderData } from '../types';
import { NIGERIAN_STATES, getMotorParksForState } from '../data/nigeria';
import { formatNaira } from '../config';
import { getWhatsAppUrl } from '../utils/whatsapp';
import { trackPurchase, trackContact } from '../utils/metaPixel';
import { 
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
  Mail,
  Plus,
  Minus,
  Clock,
  Building2,
  Home,
  AlertCircle,
  Flame
} from 'lucide-react';

interface OrderFormProps {
  config: SiteConfig;
  onOrderPlaced?: (order: { orderId: string; orderData: OrderData; totalAmount: number; timestamp: string } | null) => void;
  selectedCookerAddon?: 'none' | 'cooker-2burner' | 'cooker-5burner' | 'both';
  onCookerAddonChange?: (addon: 'none' | 'cooker-2burner' | 'cooker-5burner' | 'both') => void;
}

export const OrderForm: React.FC<OrderFormProps> = ({ 
  config, 
  onOrderPlaced,
  selectedCookerAddon = 'none',
  onCookerAddonChange
}) => {
  const [formData, setFormData] = useState<OrderData>({
    fullName: '',
    phone: '',
    address: '',
    state: 'Lagos',
    email: '',
    quantity: 1,
    notes: '',
  });

  const [cookerAddon, setCookerAddon] = useState<'none' | 'cooker-2burner' | 'cooker-5burner' | 'both'>(selectedCookerAddon);

  useEffect(() => {
    if (selectedCookerAddon !== undefined) {
      setCookerAddon(selectedCookerAddon);
    }
  }, [selectedCookerAddon]);

  const handleCookerSelect = (addon: 'none' | 'cooker-2burner' | 'cooker-5burner' | 'both') => {
    setCookerAddon(addon);
    if (onCookerAddonChange) {
      onCookerAddonChange(addon);
    }
  };

  const [deliveryMethod, setDeliveryMethod] = useState<'park_pickup' | 'doorstep'>('park_pickup');
  const availableParks = getMotorParksForState(formData.state);
  const [selectedMotorPark, setSelectedMotorPark] = useState<string>('');
  const [errors, setErrors] = useState<Partial<Record<keyof OrderData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<{
    orderId: string;
    orderData: OrderData;
    totalAmount: number;
    timestamp: string;
  } | null>(null);

  // Automatically select the first motor park when switching to a state that has defined motor parks
  useEffect(() => {
    const parks = getMotorParksForState(formData.state);
    if (parks && parks.length > 0) {
      setSelectedMotorPark(parks[0].name);
    } else {
      setSelectedMotorPark('');
    }
  }, [formData.state]);

  const isLagosState = formData.state.toLowerCase().trim() === 'lagos';
  const deliveryFee = isLagosState ? 0 : (deliveryMethod === 'doorstep' ? 5000 : 0);
  const unitPrice = config.promoPrice;
  const subtotal = unitPrice * formData.quantity;
  
  const cookerAddonPrices = {
    'none': 0,
    'cooker-2burner': 170000,
    'cooker-5burner': 280000,
    'both': 430000 // 170,000 + 280,000 - 20,000 combo discount
  };

  const cookerAddonNames = {
    'none': '',
    'cooker-2burner': '2-Flip-Up Double Gas Burner with Timer (75×45cm)',
    'cooker-5burner': 'Executive 5-Burner Gas + Electric Hybrid Cooktop (90×51cm)',
    'both': 'Combo: 2-Flip-Up (75×45cm) + 5-Burner Hybrid Cooktop (90×51cm)'
  };

  const cookerPrice = cookerAddonPrices[cookerAddon] || 0;
  const totalPrice = subtotal + deliveryFee + cookerPrice;
  const estimatedDays = isLagosState ? '1 to 2 business days' : '3 to 5 business days';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name as keyof OrderData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleQuantityChange = (delta: number) => {
    setFormData(prev => ({
      ...prev,
      quantity: Math.max(1, Math.min(10, prev.quantity + delta))
    }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof OrderData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please enter your full name";
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 9) {
      newErrors.phone = "Please enter a valid active phone number";
    }
    if (!formData.address.trim()) {
      newErrors.address = "Please enter your delivery street or pickup address";
    }
    if (!formData.state) {
      newErrors.state = "Please select your state";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      const firstError = document.getElementById("order-form-card");
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    setIsSubmitting(true);

    const effectivePark = (!isLagosState && deliveryMethod === 'park_pickup')
      ? (selectedMotorPark || (availableParks && availableParks.length > 0 ? availableParks[0].name : 'Central Motor Park'))
      : undefined;

    setTimeout(() => {
      const orderId = `SKS-${Math.floor(100000 + Math.random() * 900000)}`;
      const newOrder = {
        orderId,
        orderData: { 
          ...formData,
          deliveryMethod: isLagosState ? 'doorstep' : deliveryMethod,
          pickupMotorPark: effectivePark,
          deliveryFee,
          estimatedDeliveryDays: estimatedDays,
          includedAlternativeCooker: cookerAddon,
          alternativeCookerName: cookerAddon !== 'none' ? cookerAddonNames[cookerAddon] : undefined,
          alternativeCookerPrice: cookerPrice > 0 ? cookerPrice : undefined
        },
        totalAmount: totalPrice,
        timestamp: new Date().toLocaleString('en-NG', { dateStyle: 'medium', timeStyle: 'short' })
      };
      setSubmittedOrder(newOrder);
      if (onOrderPlaced) {
        onOrderPlaced(newOrder);
      }
      setIsSubmitting(false);

      // Fire Meta Pixel Purchase event
      trackPurchase(orderId, totalPrice, 'NGN', formData.quantity);

      // Scroll smoothly to order receipt
      setTimeout(() => {
        const receipt = document.getElementById("order-success-receipt");
        if (receipt) {
          receipt.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }, 750);
  };

  // WhatsApp link generator for the confirmed order
  const getConfirmationWhatsAppLink = () => {
    if (!submittedOrder) return '';
    const { orderId, orderData, totalAmount } = submittedOrder;
    const isCustomerLagos = orderData.state.toLowerCase().trim() === 'lagos';
    const deliveryMethodText = isCustomerLagos
      ? 'Direct Doorstep Delivery (FREE)'
      : (orderData.deliveryMethod === 'doorstep'
          ? 'Doorstep Delivery (+₦5,000 Extra Fee)'
          : `Motor Park Pick-Up (FREE)${orderData.pickupMotorPark ? ` - ${orderData.pickupMotorPark}` : ''}`);

    const msg = `*NEW ORDER CONFIRMATION* 📦\n\n` +
      `*Order ID:* ${orderId}\n` +
      `*Product:* ${config.productName}\n` +
      `*Quantity:* ${orderData.quantity} set(s)\n` +
      `*Subtotal:* ${formatNaira(unitPrice * orderData.quantity)}\n` +
      (orderData.alternativeCookerName ? `*Included Cooker Add-on:* ${orderData.alternativeCookerName} (+${formatNaira(orderData.alternativeCookerPrice || 0)})\n` : '') +
      `*Delivery Method:* ${deliveryMethodText}\n` +
      (orderData.pickupMotorPark ? `*Pick-Up Station:* ${orderData.pickupMotorPark}\n` : '') +
      `*Estimated Delivery Time:* ${orderData.estimatedDeliveryDays || (isCustomerLagos ? '1 to 2 business days' : '3 to 5 business days')}\n` +
      `*Total Payable:* ${formatNaira(totalAmount)}\n\n` +
      `*Customer Details:*\n` +
      `• Name: ${orderData.fullName}\n` +
      `• Phone: ${orderData.phone}\n` +
      `• Destination State: ${orderData.state}\n` +
      (orderData.pickupMotorPark ? `• Designated Park: ${orderData.pickupMotorPark}\n` : '') +
      `• Address/Destination: ${orderData.address}\n` +
      (orderData.email ? `• Email: ${orderData.email}\n` : '') +
      `\nHello! I have just submitted my order on your website. Please confirm dispatch details with me.`;

    return getWhatsAppUrl(config.whatsappNumber, config.productName, orderData.quantity, msg);
  };

  return (
    <section id="order-section" className="py-16 md:py-24 bg-[#090d12] border-t border-slate-800 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {submittedOrder ? (
          /* Order Confirmation / Success View */
          <div 
            id="order-success-receipt"
            className="bg-slate-900 border-2 border-emerald-500/60 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4 animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-500/20 mb-2 inline-block">
                ORDER RECEIVED SUCCESSFULLY!
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Thank You, {submittedOrder.orderData.fullName}!
              </h3>
              <p className="text-slate-300 text-sm mt-2 max-w-lg mx-auto">
                Your order has been recorded in our dispatch system. We will call you shortly to confirm your delivery address before shipment.
              </p>
            </div>

            {/* Order Summary Receipt Box */}
            <div className="bg-slate-950/90 rounded-2xl border border-slate-800 p-5 sm:p-6 mb-8 text-sm">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <span className="text-slate-400 text-xs font-semibold uppercase">Order Reference:</span>
                <span className="text-amber-400 font-mono font-bold text-base sm:text-lg">{submittedOrder.orderId}</span>
              </div>

              <div className="space-y-2.5 pb-4 border-b border-slate-800 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Product:</span>
                  <span className="font-semibold text-white">{config.productName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Quantity:</span>
                  <span className="font-semibold text-white">{submittedOrder.orderData.quantity} set(s)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Unit Promo Price:</span>
                  <span className="font-semibold text-white">{formatNaira(unitPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Estimated Delivery Time:</span>
                  <span className="font-semibold text-amber-300">{submittedOrder.orderData.estimatedDeliveryDays}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Delivery Method:</span>
                  <span className="font-semibold text-white">
                    {submittedOrder.orderData.state.toLowerCase().trim() === 'lagos'
                      ? 'Lagos Doorstep Delivery (FREE)'
                      : submittedOrder.orderData.deliveryMethod === 'doorstep'
                        ? 'Doorstep Delivery (+₦5,000)'
                        : 'Motor Park Pick-Up (FREE)'}
                  </span>
                </div>
                {submittedOrder.orderData.includedAlternativeCooker && submittedOrder.orderData.includedAlternativeCooker !== 'none' ? (
                  <div className="flex justify-between text-xs sm:text-sm bg-amber-500/15 p-2.5 rounded-lg border border-amber-500/40">
                    <span className="text-amber-300 font-medium">Included Cooktop Add-on:</span>
                    <span className="font-bold text-amber-200 text-right">
                      {submittedOrder.orderData.alternativeCookerName} (+{formatNaira(submittedOrder.orderData.alternativeCookerPrice || 0)})
                    </span>
                  </div>
                ) : null}
                {submittedOrder.orderData.pickupMotorPark ? (
                  <div className="flex justify-between text-xs sm:text-sm bg-amber-500/10 p-2 rounded-lg border border-amber-500/30">
                    <span className="text-amber-300 font-medium">Pick-Up Motor Park:</span>
                    <span className="font-bold text-amber-200">{submittedOrder.orderData.pickupMotorPark}</span>
                  </div>
                ) : null}
                {submittedOrder.orderData.deliveryFee ? (
                  <div className="flex justify-between text-amber-400 font-medium text-xs">
                    <span>Doorstep Delivery Surcharge:</span>
                    <span>+{formatNaira(submittedOrder.orderData.deliveryFee)}</span>
                  </div>
                ) : null}
                <div className="flex justify-between pt-2 text-base font-bold border-t border-slate-800/80">
                  <span className="text-amber-300">Total Payable:</span>
                  <span className="text-amber-400 text-lg sm:text-xl font-display">{formatNaira(submittedOrder.totalAmount)}</span>
                </div>
              </div>

              <div className="pt-4 space-y-1.5 text-xs text-slate-400">
                <div><strong className="text-slate-300">Destination State:</strong> {submittedOrder.orderData.state}</div>
                <div><strong className="text-slate-300">Delivery Destination / Address:</strong> {submittedOrder.orderData.address}</div>
                <div><strong className="text-slate-300">Phone Number:</strong> {submittedOrder.orderData.phone}</div>
              </div>
            </div>

            {/* Post-Order Customer Service & Merchant Direct Phone Helpline */}
            <div className="bg-gradient-to-r from-amber-500/15 via-slate-900 to-amber-500/15 border-2 border-amber-500/60 rounded-2xl p-5 sm:p-6 mb-6 text-center shadow-xl">
              <span className="text-xs font-black text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30 inline-block mb-2">
                📞 CUSTOMER SERVICE &amp; DISPATCH HELPLINE
              </span>
              <h4 className="text-white text-base sm:text-lg font-extrabold mb-1">
                Your Order Reference: <span className="text-amber-400 font-mono">#{submittedOrder.orderId}</span>
              </h4>
              <p className="text-slate-300 text-xs sm:text-sm mb-4 max-w-md mx-auto">
                Need instant delivery dispatch or have questions about your sink? Call our dedicated customer service line or chat on WhatsApp now:
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`tel:${config.phoneNumber.replace(/\s+/g, '')}`}
                  onClick={() => trackContact('phone', 'order-success-call')}
                  id="order-success-call-btn"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-amber-500 hover:bg-amber-400 text-black font-black text-sm py-4 px-6 rounded-xl shadow-xl transition-transform active:scale-[0.98] cursor-pointer tracking-wide animate-action-blink"
                >
                  <Phone className="w-4 h-4 text-black" />
                  <span>CALL CUSTOMER SERVICE: {config.phoneNumber}</span>
                </a>

                <a
                  href={getConfirmationWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackContact('whatsapp', 'order-success-whatsapp')}
                  id="order-confirm-whatsapp-btn"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-sm py-4 px-6 rounded-xl shadow-xl transition-transform active:scale-[0.98] cursor-pointer animate-soft-blink"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>CHAT ON WHATSAPP</span>
                </a>
              </div>
            </div>

            {/* Instant WhatsApp Priority Processing Note */}
            <div className="text-center space-y-4">
              <p className="text-xs text-slate-400">
                You can also save our customer service number <strong className="text-amber-400">{config.phoneNumber}</strong> for order tracking and installation guidance.
              </p>

              <button
                onClick={() => {
                  setSubmittedOrder(null);
                  if (onOrderPlaced) onOrderPlaced(null);
                }}
                className="text-xs text-slate-400 hover:text-slate-200 underline pt-2 cursor-pointer"
              >
                Place another order
              </button>
            </div>
          </div>
        ) : (
          /* Active Checkout Order Form */
          <div 
            id="order-form-card"
            className="bg-slate-900/90 border-2 border-amber-500/50 rounded-3xl p-6 sm:p-10 shadow-2xl relative"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <span className="text-amber-400 font-bold text-xs uppercase tracking-widest bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20 mb-3 inline-block">
                Direct Order Checkout
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                DELIVERY DETAILS &amp; ORDER FORM
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-lg mx-auto">
                Fill the form below to receive your Smart Kitchen Piano Sink anywhere in Nigeria. Pay upon inspection in eligible locations!
              </p>
            </div>

            {/* Dynamic Product & Price Summary Card */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 sm:p-6 mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
                <div>
                  <h4 className="font-bold text-white text-base sm:text-lg flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-amber-400" />
                    <span>{config.productName}</span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Includes Piano Console with Digital Temp (°C) &amp; Water-Flow Light, Waterfall, Pull-Out Faucet, Cutting Board &amp; Prep Trays.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 font-medium">Quantity:</span>
                  <div className="flex items-center bg-slate-900 border border-slate-700 rounded-lg p-1">
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(-1)}
                      className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-3 text-sm font-bold text-white font-mono">
                      {formData.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(1)}
                      className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Price Calculation Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs sm:text-sm">
                <div>
                  <span className="text-slate-400 block text-[11px] uppercase">Unit Promo Price</span>
                  <span className="font-semibold text-slate-200">{formatNaira(unitPrice)}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px] uppercase">Selected Units</span>
                  <span className="font-semibold text-slate-200">{formData.quantity} Set(s)</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px] uppercase">Delivery Method</span>
                  <span className="font-semibold text-slate-200">
                    {isLagosState ? (
                      <span className="text-emerald-400">FREE Doorstep (1–2 Days)</span>
                    ) : deliveryMethod === 'doorstep' ? (
                      <span className="text-amber-400">+₦5,000 Doorstep (3–5 Days)</span>
                    ) : (
                      <span className="text-emerald-400">FREE Park Pickup (3–5 Days)</span>
                    )}
                  </span>
                </div>
                <div className="col-span-2 sm:col-span-1 sm:text-right">
                  <span className="text-amber-400 block text-[11px] uppercase font-bold">Total Payable</span>
                  <span className="font-black text-xl text-amber-400 font-display">
                    {formatNaira(totalPrice)}
                  </span>
                </div>
              </div>
            </div>

            {/* OPTIONAL MATCHING LUXURY COOKTOP ADD-ON (MOONLIGHT LUXURY HOME TECH) */}
            <div className="bg-slate-950/90 border border-amber-500/30 rounded-2xl p-4 sm:p-5 mb-6">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-black text-white uppercase tracking-wider">
                    ALSO AVAILABLE: ADD MATCHING LUXURY COOKTOP (DELIVERED TOGETHER)
                  </span>
                </div>
                <span className="text-[10px] text-amber-400 font-bold bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                  Payment on Delivery &bull; Ships Together
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* Option 1: None */}
                <button
                  type="button"
                  onClick={() => handleCookerSelect('none')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    cookerAddon === 'none'
                      ? 'bg-amber-500/15 border-amber-500 text-white shadow-md'
                      : 'bg-slate-900/90 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white">Sink Only</span>
                    <span className="text-[11px] text-slate-400">Standard</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Just the Smart Piano Sink workstation</p>
                </button>

                {/* Option 2: 2-Flip-Up Double Burner */}
                <button
                  type="button"
                  onClick={() => handleCookerSelect('cooker-2burner')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    cookerAddon === 'cooker-2burner'
                      ? 'bg-amber-500/15 border-amber-500 text-white shadow-md'
                      : 'bg-slate-900/90 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-amber-300">2-Flip-Up Double Burner</span>
                    <span className="text-xs font-extrabold text-amber-400">+₦170,000</span>
                  </div>
                  <p className="text-[11px] text-slate-300">75×45cm &bull; 90° Flip-Up &bull; Built-in Timer</p>
                </button>

                {/* Option 3: 5-Burner Hybrid */}
                <button
                  type="button"
                  onClick={() => handleCookerSelect('cooker-5burner')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    cookerAddon === 'cooker-5burner'
                      ? 'bg-cyan-500/15 border-cyan-500 text-white shadow-md'
                      : 'bg-slate-900/90 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-cyan-300">5-Burner Gas+Electric</span>
                    <span className="text-xs font-extrabold text-cyan-400">+₦280,000</span>
                  </div>
                  <p className="text-[11px] text-slate-300">90×51cm &bull; 4 Gas + 1 Electric 2000W zone</p>
                </button>

                {/* Option 4: Both Cookers Combo */}
                <button
                  type="button"
                  onClick={() => handleCookerSelect('both')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    cookerAddon === 'both'
                      ? 'bg-emerald-500/15 border-emerald-500 text-white shadow-md'
                      : 'bg-slate-900/90 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-emerald-300">Both Cookers (Combo)</span>
                    <span className="text-xs font-extrabold text-emerald-400">+₦430,000</span>
                  </div>
                  <p className="text-[11px] text-emerald-400/90 font-semibold">Includes Extra ₦20,000 Bundle Bonus</p>
                </button>
              </div>
            </div>

            {/* The Form Fields */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-amber-400" />
                  <span>Full Name *</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="e.g. Adebayo Ogunlesi"
                  className={`w-full bg-slate-950 border rounded-xl py-3.5 px-4 text-white placeholder-slate-500 text-sm focus:outline-none transition-colors ${
                    errors.fullName ? 'border-rose-500 focus:border-rose-400' : 'border-slate-700 focus:border-amber-400'
                  }`}
                />
                {errors.fullName && <p className="text-xs text-rose-400 mt-1">{errors.fullName}</p>}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Phone Number (Active for calls & order confirmation) *</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="e.g. 08012345678 or 09136827730"
                  className={`w-full bg-slate-950 border rounded-xl py-3.5 px-4 text-white placeholder-slate-500 text-sm focus:outline-none transition-colors ${
                    errors.phone ? 'border-rose-500 focus:border-rose-400' : 'border-slate-700 focus:border-amber-400'
                  }`}
                />
                {errors.phone && <p className="text-xs text-rose-400 mt-1">{errors.phone}</p>}
              </div>

              {/* Destination State */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>Destination State *</span>
                  <span className="text-[10px] text-amber-400 font-normal">All 36 states + FCT</span>
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-xl py-3.5 px-4 text-white text-sm focus:outline-none transition-colors cursor-pointer font-medium"
                >
                  {NIGERIAN_STATES.map((st) => (
                    <option key={st} value={st} className="bg-slate-900 text-white">
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              {/* Delivery Details & Option Selection */}
              <div className="pt-2">
                {isLagosState ? (
                  <div className="bg-emerald-950/30 border border-emerald-500/40 rounded-2xl p-4 flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shrink-0 mt-0.5">
                      <Home className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-bold text-white text-sm sm:text-base">Lagos Doorstep Delivery</span>
                        <span className="text-[11px] font-extrabold uppercase bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                          FREE &bull; 1 to 2 Business Days
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Orders within Lagos State are delivered straight to your home or site address with zero delivery fee. Estimated transit: <strong>1 to 2 business days</strong>.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 bg-slate-950/70 border border-slate-800 rounded-2xl p-4 sm:p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                      <div>
                        <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                          <Truck className="w-4 h-4 text-amber-400" />
                          Delivery Options for {formData.state}
                        </span>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Choose how you would like to receive your sink in {formData.state}
                        </p>
                      </div>
                      <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 bg-amber-500/15 border border-amber-500/30 px-3 py-1 rounded-full self-start sm:self-auto">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        <span>Estimated Transit: 3 to 5 Business Days</span>
                      </div>
                    </div>

                    {/* Notice for Other States */}
                    <div className="bg-amber-950/40 border border-amber-500/30 rounded-xl p-3 text-xs text-amber-200/90 flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div className="leading-relaxed">
                        <strong className="text-white">Delivery Policy for {formData.state}:</strong> For states outside Lagos, standard dispatch is shipped to your state/city's major commercial motor park for pick-up (FREE). If you want it delivered directly to your doorstep/site, it will attract an extra fee of <strong>₦5,000</strong>.
                      </div>
                    </div>

                    {/* Interactive Selection Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {/* Option 1: Motor Park Pick-Up */}
                      <button
                        type="button"
                        onClick={() => setDeliveryMethod('park_pickup')}
                        className={`text-left p-4 rounded-xl border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                          deliveryMethod === 'park_pickup'
                            ? 'bg-amber-500/10 border-amber-400 shadow-md shadow-amber-500/10'
                            : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2 w-full">
                          <div className="flex items-center gap-2">
                            <Building2 className={`w-5 h-5 ${deliveryMethod === 'park_pickup' ? 'text-amber-400' : 'text-slate-400'}`} />
                            <span className="font-bold text-white text-sm">Motor Park Pick-Up</span>
                          </div>
                          <span className="text-[11px] font-black uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            FREE (₦0)
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 mb-3 leading-relaxed">
                          Standard collection at your city's central commercial transport park or terminal (e.g. Peace Mass, GIGM, Young Shall Grow, ABC).
                        </p>
                        <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-800 text-slate-400 w-full">
                          <span className="flex items-center gap-1 text-slate-300">
                            <Clock className="w-3 h-3 text-amber-400" /> 3–5 Business Days
                          </span>
                          <span className={`font-bold ${deliveryMethod === 'park_pickup' ? 'text-amber-400' : 'text-slate-400'}`}>
                            {deliveryMethod === 'park_pickup' ? '✓ Selected' : 'Choose this'}
                          </span>
                        </div>
                      </button>

                      {/* Option 2: Doorstep Delivery */}
                      <button
                        type="button"
                        onClick={() => setDeliveryMethod('doorstep')}
                        className={`text-left p-4 rounded-xl border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                          deliveryMethod === 'doorstep'
                            ? 'bg-amber-500/10 border-amber-400 shadow-md shadow-amber-500/10'
                            : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2 w-full">
                          <div className="flex items-center gap-2">
                            <Home className={`w-5 h-5 ${deliveryMethod === 'doorstep' ? 'text-amber-400' : 'text-slate-400'}`} />
                            <span className="font-bold text-white text-sm">Doorstep Delivery</span>
                          </div>
                          <span className="text-[11px] font-black uppercase px-2 py-0.5 rounded bg-amber-500/25 text-amber-300 border border-amber-500/40">
                            +₦5,000 EXTRA
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 mb-3 leading-relaxed">
                          A local dispatch courier brings the heavy package directly to your house, site, or office gate in {formData.state}.
                        </p>
                        <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-800 text-slate-400 w-full">
                          <span className="flex items-center gap-1 text-slate-300">
                            <Clock className="w-3 h-3 text-amber-400" /> 3–5 Business Days
                          </span>
                          <span className={`font-bold ${deliveryMethod === 'doorstep' ? 'text-amber-400' : 'text-slate-400'}`}>
                            {deliveryMethod === 'doorstep' ? '✓ Selected (+₦5K)' : 'Choose this'}
                          </span>
                        </div>
                      </button>
                    </div>

                    {/* Dedicated Pick-Up Motor Park Selector for Ibadan, Abuja, Port Harcourt, Abia, Delta */}
                    {deliveryMethod === 'park_pickup' && availableParks && availableParks.length > 0 && (
                      <div className="pt-3 border-t border-slate-800/80 mt-2">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2.5">
                          <label className="text-xs font-black text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                            <Building2 className="w-4 h-4 text-amber-400" />
                            <span>Select Pick-Up Motor Park in {formData.state} *</span>
                          </label>
                          <span className="text-[11px] text-slate-400">Choose your preferred park station</span>
                        </div>

                        <div className={`grid grid-cols-1 ${availableParks.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-3'} gap-2.5`}>
                          {availableParks.map((park) => {
                            const isSelected = selectedMotorPark === park.name;
                            return (
                              <button
                                key={park.id}
                                type="button"
                                onClick={() => setSelectedMotorPark(park.name)}
                                className={`text-left p-3 rounded-xl border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                                  isSelected
                                    ? 'bg-amber-500/20 border-amber-400 text-white shadow-md shadow-amber-500/10 ring-1 ring-amber-400/40'
                                    : 'bg-slate-900/90 border-slate-800 hover:border-slate-700 text-slate-300'
                                }`}
                              >
                                <div className="flex items-center justify-between gap-2 mb-1 w-full">
                                  <span className="font-bold text-sm text-white flex items-center gap-2">
                                    <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${isSelected ? 'border-amber-400 bg-amber-400' : 'border-slate-500'}`}>
                                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-slate-950"></span>}
                                    </span>
                                    <span>{park.shortName}</span>
                                  </span>
                                  {isSelected && (
                                    <span className="text-[10px] font-extrabold uppercase text-amber-300 bg-amber-400/20 px-1.5 py-0.5 rounded border border-amber-400/30">
                                      Selected
                                    </span>
                                  )}
                                </div>
                                <span className="text-xs font-semibold text-slate-200 pl-6 block">{park.name}</span>
                                <span className="text-[11px] text-slate-400 pl-6 mt-0.5 block">{park.area}</span>
                              </button>
                            );
                          })}
                        </div>
                        
                        <div className="mt-2.5 text-[11px] text-slate-300 flex items-center gap-1.5 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>Your sink workstation will be booked directly to <strong>{selectedMotorPark || availableParks[0].name}</strong> for easy collection.</span>
                        </div>
                      </div>
                    )}

                    {/* Standard notice for other states without specific park presets */}
                    {deliveryMethod === 'park_pickup' && (!availableParks || availableParks.length === 0) && (
                      <div className="mt-2 p-3 bg-slate-900/80 border border-slate-800 rounded-xl text-xs text-slate-300 flex items-start gap-2.5">
                        <Building2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-white">Central Motor Park Pick-Up:</span> Your order will be dispatched to the central commercial transport terminal in {formData.state}. You can also mention your preferred transport company (e.g. Peace Mass, GIGM, Young Shall Grow, ABC) in the address field below.
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Delivery Address */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>
                      {isLagosState || deliveryMethod === 'doorstep'
                        ? 'Doorstep Delivery Address (House No, Street, Landmark) *'
                        : selectedMotorPark
                          ? `Receiver Contact Area / Nearest Landmark (Near ${selectedMotorPark}) *`
                          : 'Receiver Pickup Area / Town Address (For Waybill Identification) *'}
                    </span>
                  </span>
                </label>
                <textarea
                  name="address"
                  rows={2}
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder={
                    isLagosState || deliveryMethod === 'doorstep'
                      ? "e.g. Plot 14, Admiralty Way, near Prince Ebeano Supermarket, Lekki Phase 1"
                      : selectedMotorPark
                        ? `e.g. Near ${selectedMotorPark} area (Parcel will be picked up at ${selectedMotorPark})`
                        : "e.g. Near Central Commercial Motor Park (For package waybill identification)"
                  }
                  className={`w-full bg-slate-950 border rounded-xl py-3 px-4 text-white placeholder-slate-500 text-sm focus:outline-none transition-colors ${
                    errors.address ? 'border-rose-500 focus:border-rose-400' : 'border-slate-700 focus:border-amber-400'
                  }`}
                />
                {errors.address && <p className="text-xs text-rose-400 mt-1">{errors.address}</p>}
              </div>

              {/* Email (Optional) */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <span>Email Address (Optional for order receipt)</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="e.g. yourname@gmail.com"
                  className="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-xl py-3.5 px-4 text-white placeholder-slate-500 text-sm focus:outline-none transition-colors"
                />
              </div>

              {/* Delivery Notice */}
              <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-3">
                <Truck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white">Estimated Delivery Notice:</span> Lagos orders arrive in <strong>1 to 2 business days</strong>. Other states arrive in <strong>3 to 5 business days</strong> (Park Pickup or Doorstep delivery). Please submit only if you or your representative are available to receive the package and complete payment.
                </div>
              </div>

              {/* Payment on Delivery Assurance Banner */}
              <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-xl p-3 sm:p-3.5 flex items-center justify-between gap-2 text-xs text-emerald-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-bold text-white">Payment on Delivery Available</span>
                </div>
                <span className="text-[11px] text-emerald-200/90 font-medium hidden sm:inline">Pay only when you receive your package</span>
              </div>

              {/* Submit CTA — BLINKING */}
              <button
                type="submit"
                id="complete-order-btn"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-black font-black text-lg py-5 px-6 sm:px-8 rounded-xl shadow-xl shadow-amber-500/30 hover:shadow-amber-500/40 transform active:scale-[0.99] transition-all cursor-pointer uppercase tracking-wider disabled:opacity-50 animate-action-blink"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Recording Your Order...
                  </span>
                ) : (
                  <>
                    <div className="flex flex-col items-center">
                      <span className="text-base sm:text-lg tracking-wide">ORDER NOW — PAYMENT ON DELIVERY</span>
                      <span className="text-[11px] font-bold text-black/80 normal-case tracking-normal">
                        No online payment needed &bull; Pay when your sink arrives
                      </span>
                    </div>
                    <ArrowRight className="w-6 h-6 shrink-0" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-3 pt-2 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  100% Privacy Protected
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-emerald-400" />
                  Inspected Before Dispatch
                </span>
              </div>

            </form>
          </div>
        )}

      </div>
    </section>
  );
};
