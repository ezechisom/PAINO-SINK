import React, { useState, useEffect } from 'react';
import { SiteConfig, OrderData, OrderItem } from '../types';
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
  Flame,
  Tag,
  PackageCheck
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

  // Individual product quantities for multi-product orders
  const [sinkQty, setSinkQty] = useState<number>(1);
  const [cooker2bQty, setCooker2bQty] = useState<number>(0);
  const [cooker5bQty, setCooker5bQty] = useState<number>(0);

  // Sync with incoming cooker addon prop
  useEffect(() => {
    if (selectedCookerAddon === 'cooker-2burner') {
      setCooker2bQty(prev => (prev > 0 ? prev : 1));
    } else if (selectedCookerAddon === 'cooker-5burner') {
      setCooker5bQty(prev => (prev > 0 ? prev : 1));
    } else if (selectedCookerAddon === 'both') {
      setCooker2bQty(prev => (prev > 0 ? prev : 1));
      setCooker5bQty(prev => (prev > 0 ? prev : 1));
    }
  }, [selectedCookerAddon]);

  const [deliveryMethod, setDeliveryMethod] = useState<'park_pickup' | 'doorstep'>('park_pickup');
  const availableParks = getMotorParksForState(formData.state);
  const [selectedMotorPark, setSelectedMotorPark] = useState<string>('');
  const [errors, setErrors] = useState<Partial<Record<keyof OrderData | 'items', string>>>({});
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
  
  // Product Unit Prices
  const SINK_PRICE = config.promoPrice;
  const COOKER_2B_PRICE = 170000;
  const COOKER_5B_PRICE = 280000;

  // Dynamic Subtotals per item
  const sinkSubtotal = sinkQty * SINK_PRICE;
  const cooker2bSubtotal = cooker2bQty * COOKER_2B_PRICE;
  const cooker5bSubtotal = cooker5bQty * COOKER_5B_PRICE;

  // Combined Subtotal across all products
  const itemsSubtotal = sinkSubtotal + cooker2bSubtotal + cooker5bSubtotal;
  const totalItemCount = sinkQty + cooker2bQty + cooker5bQty;

  // Automatic multi-product tiered discount
  let multiItemDiscount = 0;
  if (totalItemCount === 2) {
    multiItemDiscount = 10000;
  } else if (totalItemCount === 3) {
    multiItemDiscount = 20000;
  } else if (totalItemCount >= 4) {
    multiItemDiscount = 30000;
  }

  const totalPrice = Math.max(0, itemsSubtotal - multiItemDiscount) + deliveryFee;
  const estimatedDays = isLagosState ? '1 to 2 business days' : '3 to 5 business days';

  // Itemized array of selected products
  const selectedItems: OrderItem[] = [
    ...(sinkQty > 0 ? [{
      id: 'sink',
      name: config.productName,
      quantity: sinkQty,
      unitPrice: SINK_PRICE,
      totalPrice: sinkSubtotal
    }] : []),
    ...(cooker2bQty > 0 ? [{
      id: 'cooker-2burner',
      name: '2-Flip-Up Double Gas Burner with Timer (75×45cm)',
      quantity: cooker2bQty,
      unitPrice: COOKER_2B_PRICE,
      totalPrice: cooker2bSubtotal
    }] : []),
    ...(cooker5bQty > 0 ? [{
      id: 'cooker-5burner',
      name: 'Executive 5-Burner Gas + Electric Hybrid Cooktop (90×51cm)',
      quantity: cooker5bQty,
      unitPrice: COOKER_5B_PRICE,
      totalPrice: cooker5bSubtotal
    }] : [])
  ];

  // Helper for quick bundle presets
  const handleApplyPreset = (preset: 'single_sink' | 'double_sink' | 'sink_plus_2b' | 'sink_plus_5b' | 'kitchen_trio') => {
    if (preset === 'single_sink') {
      setSinkQty(1);
      setCooker2bQty(0);
      setCooker5bQty(0);
      if (onCookerAddonChange) onCookerAddonChange('none');
    } else if (preset === 'double_sink') {
      setSinkQty(2);
      setCooker2bQty(0);
      setCooker5bQty(0);
      if (onCookerAddonChange) onCookerAddonChange('none');
    } else if (preset === 'sink_plus_2b') {
      setSinkQty(1);
      setCooker2bQty(1);
      setCooker5bQty(0);
      if (onCookerAddonChange) onCookerAddonChange('cooker-2burner');
    } else if (preset === 'sink_plus_5b') {
      setSinkQty(1);
      setCooker2bQty(0);
      setCooker5bQty(1);
      if (onCookerAddonChange) onCookerAddonChange('cooker-5burner');
    } else if (preset === 'kitchen_trio') {
      setSinkQty(1);
      setCooker2bQty(1);
      setCooker5bQty(1);
      if (onCookerAddonChange) onCookerAddonChange('both');
    }
  };

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

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof OrderData | 'items', string>> = {};

    if (totalItemCount < 1) {
      newErrors.quantity = "Please choose at least 1 product to place your order";
    }
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
      const cookerAddonSummary = (cooker2bQty > 0 && cooker5bQty > 0)
        ? 'both'
        : (cooker2bQty > 0 ? 'cooker-2burner' : (cooker5bQty > 0 ? 'cooker-5burner' : 'none'));

      const cookerNamesSummary = (cooker2bQty > 0 && cooker5bQty > 0)
        ? `${cooker2bQty}x 2-Flip-Up Cooker + ${cooker5bQty}x 5-Burner Hybrid`
        : (cooker2bQty > 0 ? `${cooker2bQty}x 2-Flip-Up Double Burner` : (cooker5bQty > 0 ? `${cooker5bQty}x 5-Burner Hybrid` : undefined));

      const newOrder = {
        orderId,
        orderData: { 
          ...formData,
          quantity: totalItemCount,
          items: selectedItems,
          multiItemDiscount,
          deliveryMethod: isLagosState ? 'doorstep' : deliveryMethod,
          pickupMotorPark: effectivePark,
          deliveryFee,
          estimatedDeliveryDays: estimatedDays,
          includedAlternativeCooker: cookerAddonSummary,
          alternativeCookerName: cookerNamesSummary,
          alternativeCookerPrice: (cooker2bSubtotal + cooker5bSubtotal) > 0 ? (cooker2bSubtotal + cooker5bSubtotal) : undefined
        },
        totalAmount: totalPrice,
        timestamp: new Date().toLocaleString('en-NG', { dateStyle: 'medium', timeStyle: 'short' })
      };
      setSubmittedOrder(newOrder);
      if (onOrderPlaced) {
        onOrderPlaced(newOrder);
      }
      setIsSubmitting(false);

      // Fire Meta Pixel Purchase event with total item count
      trackPurchase(orderId, totalPrice, 'NGN', totalItemCount);

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

    const itemsSummaryText = (orderData.items && orderData.items.length > 0)
      ? orderData.items.map(item => `• ${item.quantity}x ${item.name} (${formatNaira(item.totalPrice)})`).join('\n')
      : `• ${orderData.quantity}x ${config.productName}`;

    const msg = `*NEW MULTI-PRODUCT ORDER* 📦\n\n` +
      `*Order ID:* ${orderId}\n` +
      `*Total Products:* ${orderData.quantity} item(s)\n\n` +
      `*ORDERED ITEMS:*\n${itemsSummaryText}\n\n` +
      `*Items Subtotal:* ${formatNaira(itemsSubtotal)}\n` +
      (orderData.multiItemDiscount && orderData.multiItemDiscount > 0 ? `*Multi-Product Discount:* -${formatNaira(orderData.multiItemDiscount)} 🎉\n` : '') +
      `*Delivery Method:* ${deliveryMethodText}\n` +
      (orderData.pickupMotorPark ? `*Pick-Up Station:* ${orderData.pickupMotorPark}\n` : '') +
      `*Estimated Delivery Time:* ${orderData.estimatedDeliveryDays || (isCustomerLagos ? '1 to 2 business days' : '3 to 5 business days')}\n` +
      `*TOTAL PAYABLE ON DELIVERY:* ${formatNaira(totalAmount)}\n\n` +
      `*Customer Details:*\n` +
      `• Name: ${orderData.fullName}\n` +
      `• Phone: ${orderData.phone}\n` +
      `• Destination State: ${orderData.state}\n` +
      (orderData.pickupMotorPark ? `• Designated Park: ${orderData.pickupMotorPark}\n` : '') +
      `• Address/Destination: ${orderData.address}\n` +
      (orderData.email ? `• Email: ${orderData.email}\n` : '') +
      `\nHello! I have just submitted my multi-product order on your website. Please confirm dispatch details with me.`;

    return getWhatsAppUrl(config.whatsappNumber, config.productName, orderData.quantity, msg);
  };

  return (
    <section id="order-section" className="py-16 md:py-24 bg-slate-50 border-t border-slate-200 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {submittedOrder ? (
          /* Order Confirmation / Success View */
          <div 
            id="order-success-receipt"
            className="bg-white border-2 border-blue-500 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 border border-blue-300 flex items-center justify-center mx-auto mb-4 animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <span className="text-xs font-bold text-blue-800 uppercase tracking-widest bg-blue-100 px-3.5 py-1.5 rounded-full border border-blue-200 mb-2 inline-block">
                ORDER RECEIVED SUCCESSFULLY!
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0a192f] tracking-tight">
                Thank You, {submittedOrder.orderData.fullName}!
              </h3>
              <p className="text-slate-600 text-sm mt-2 max-w-lg mx-auto">
                Your order has been recorded in our dispatch system. We will call you shortly to confirm your delivery address before shipment.
              </p>
            </div>

            {/* Order Summary Receipt Box */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 sm:p-6 mb-8 text-sm">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
                <span className="text-slate-500 text-xs font-semibold uppercase">Order Reference:</span>
                <span className="text-[#0a192f] font-mono font-bold text-base sm:text-lg">{submittedOrder.orderId}</span>
              </div>

              <div className="space-y-3 pb-4 border-b border-slate-200 text-slate-700">
                <div className="font-bold text-xs uppercase tracking-wider text-[#0a192f] flex items-center gap-1.5">
                  <PackageCheck className="w-4 h-4 text-blue-600" />
                  <span>Ordered Products Breakdown ({submittedOrder.orderData.quantity} Total Items):</span>
                </div>

                {submittedOrder.orderData.items && submittedOrder.orderData.items.length > 0 ? (
                  <div className="space-y-2 bg-white p-3.5 rounded-xl border border-slate-200">
                    {submittedOrder.orderData.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-start text-xs sm:text-sm py-1 border-b border-slate-100 last:border-0">
                        <div className="pr-2">
                          <span className="font-bold text-blue-700 font-mono">{item.quantity}x</span>{' '}
                          <span className="font-medium text-slate-900">{item.name}</span>
                          <span className="block text-[11px] text-slate-500">@ {formatNaira(item.unitPrice)} each</span>
                        </div>
                        <span className="font-bold text-slate-900 font-mono whitespace-nowrap">{formatNaira(item.totalPrice)}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex justify-between">
                    <span className="text-slate-500">{config.productName} ({submittedOrder.orderData.quantity}x):</span>
                    <span className="font-semibold text-slate-900">{formatNaira(submittedOrder.totalAmount)}</span>
                  </div>
                )}

                {/* Subtotal & Discounts */}
                <div className="pt-2 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>Products Subtotal:</span>
                    <span className="font-semibold text-slate-900">
                      {formatNaira(
                        submittedOrder.orderData.items
                          ? submittedOrder.orderData.items.reduce((acc, it) => acc + it.totalPrice, 0)
                          : SINK_PRICE * submittedOrder.orderData.quantity
                      )}
                    </span>
                  </div>

                  {submittedOrder.orderData.multiItemDiscount && submittedOrder.orderData.multiItemDiscount > 0 ? (
                    <div className="flex justify-between text-blue-700 font-semibold bg-blue-50 px-2.5 py-1.5 rounded-lg border border-blue-200">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Multi-Product Bundle Discount:
                      </span>
                      <span>-{formatNaira(submittedOrder.orderData.multiItemDiscount)}</span>
                    </div>
                  ) : null}

                  <div className="flex justify-between">
                    <span className="text-slate-600">Delivery Method:</span>
                    <span className="font-semibold text-slate-900">
                      {submittedOrder.orderData.state.toLowerCase().trim() === 'lagos'
                        ? 'Lagos Doorstep Delivery (FREE)'
                        : submittedOrder.orderData.deliveryMethod === 'doorstep'
                          ? 'Doorstep Delivery (+₦5,000)'
                          : 'Motor Park Pick-Up (FREE)'}
                    </span>
                  </div>

                  {submittedOrder.orderData.pickupMotorPark ? (
                    <div className="flex justify-between text-xs bg-blue-50 p-2 rounded-lg border border-blue-200">
                      <span className="text-blue-800 font-medium">Pick-Up Motor Park:</span>
                      <span className="font-bold text-blue-900">{submittedOrder.orderData.pickupMotorPark}</span>
                    </div>
                  ) : null}

                  {submittedOrder.orderData.deliveryFee ? (
                    <div className="flex justify-between text-slate-700 font-medium text-xs">
                      <span>Doorstep Delivery Surcharge:</span>
                      <span>+{formatNaira(submittedOrder.orderData.deliveryFee)}</span>
                    </div>
                  ) : null}

                  <div className="flex justify-between">
                    <span className="text-slate-600">Estimated Delivery Time:</span>
                    <span className="font-semibold text-slate-800">{submittedOrder.orderData.estimatedDeliveryDays}</span>
                  </div>

                  <div className="flex justify-between pt-2.5 text-base font-bold border-t border-slate-200">
                    <span className="text-[#0a192f]">Total Payable on Delivery:</span>
                    <span className="text-blue-700 text-lg sm:text-xl font-display">{formatNaira(submittedOrder.totalAmount)}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 space-y-1.5 text-xs text-slate-600">
                <div><strong className="text-slate-800">Destination State:</strong> {submittedOrder.orderData.state}</div>
                <div><strong className="text-slate-800">Delivery Destination / Address:</strong> {submittedOrder.orderData.address}</div>
                <div><strong className="text-slate-800">Phone Number:</strong> {submittedOrder.orderData.phone}</div>
              </div>
            </div>

            {/* Post-Order Customer Service & Merchant Direct Phone Helpline */}
            <div className="bg-slate-50 border-2 border-blue-500/30 rounded-2xl p-5 sm:p-6 mb-6 text-center shadow-sm">
              <span className="text-xs font-bold text-blue-800 uppercase tracking-widest bg-blue-100 px-3 py-1 rounded-full border border-blue-200 inline-block mb-2">
                📞 CUSTOMER SERVICE &amp; DISPATCH HELPLINE
              </span>
              <h4 className="text-[#0a192f] text-base sm:text-lg font-extrabold mb-1">
                Your Order Reference: <span className="text-blue-700 font-mono">#{submittedOrder.orderId}</span>
              </h4>
              <p className="text-slate-600 text-xs sm:text-sm mb-4 max-w-md mx-auto">
                Need instant delivery dispatch or have questions about your sink? Call our dedicated customer service line or chat on WhatsApp now:
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`tel:${config.phoneNumber.replace(/\s+/g, '')}`}
                  onClick={() => trackContact('phone', 'order-success-call')}
                  id="order-success-call-btn"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#0a192f] hover:bg-slate-800 text-white font-black text-sm py-4 px-6 rounded-xl shadow-md transition-transform active:scale-[0.98] cursor-pointer tracking-wide"
                >
                  <Phone className="w-4 h-4 text-blue-400" />
                  <span>CALL CUSTOMER SERVICE: {config.phoneNumber}</span>
                </a>

                <a
                  href={getConfirmationWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackContact('whatsapp', 'order-success-whatsapp')}
                  id="order-confirm-whatsapp-btn"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm py-4 px-6 rounded-xl shadow-md transition-transform active:scale-[0.98] cursor-pointer animate-soft-blink"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>CHAT ON WHATSAPP</span>
                </a>
              </div>
            </div>

            {/* Instant WhatsApp Priority Processing Note */}
            <div className="text-center space-y-4">
              <p className="text-xs text-slate-500">
                You can also save our customer service number <strong className="text-[#0a192f]">{config.phoneNumber}</strong> for order tracking and installation guidance.
              </p>

              <button
                onClick={() => {
                  setSubmittedOrder(null);
                  if (onOrderPlaced) onOrderPlaced(null);
                }}
                className="text-xs text-slate-500 hover:text-slate-800 underline pt-2 cursor-pointer"
              >
                Place another order
              </button>
            </div>
          </div>
        ) : (
          /* Active Checkout Order Form */
          <div 
            id="order-form-card"
            className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl relative"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <span className="text-blue-800 font-bold text-xs uppercase tracking-widest bg-blue-100 px-3.5 py-1.5 rounded-full border border-blue-200 mb-3 inline-block">
                Direct Order Checkout
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0a192f] tracking-tight">
                DELIVERY DETAILS &amp; ORDER FORM
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-lg mx-auto">
                Fill the form below to receive your Smart Kitchen Piano Sink anywhere in Nigeria. Pay upon inspection in eligible locations!
              </p>
            </div>

            {/* MULTI-PRODUCT SELECTION SECTION */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 sm:p-6 mb-8 shadow-xs">
              <div className="border-b border-slate-200 pb-4 mb-5">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h3 className="text-base sm:text-lg font-extrabold text-[#0a192f] flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-blue-600" />
                    <span>Select Your Products &amp; Quantities</span>
                  </h3>
                  <span className="text-xs font-bold text-blue-800 bg-blue-100 px-2.5 py-1 rounded-full border border-blue-200">
                    Payment on Delivery &bull; Ships Together
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  You can order 1 or more products together in a single shipment. Mix &amp; match sinks and cooktops to unlock instant multi-product combo discounts!
                </p>

                {/* Quick Presets / Bundle Shortcuts */}
                <div className="mt-4 pt-3 border-t border-slate-200">
                  <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-2">
                    Popular Package Presets (Click to Auto-Select):
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => handleApplyPreset('single_sink')}
                      className={`text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                        sinkQty === 1 && cooker2bQty === 0 && cooker5bQty === 0
                          ? 'bg-[#0a192f] border-[#0a192f] text-white font-bold shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      1x Piano Sink Only (₦260k)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplyPreset('double_sink')}
                      className={`text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                        sinkQty === 2 && cooker2bQty === 0 && cooker5bQty === 0
                          ? 'bg-[#0a192f] border-[#0a192f] text-white font-bold shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      2x Sinks (Duplex/Villa - Save ₦10k)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplyPreset('sink_plus_2b')}
                      className={`text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                        sinkQty === 1 && cooker2bQty === 1 && cooker5bQty === 0
                          ? 'bg-blue-600 border-blue-600 text-white font-bold shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      Sink + 2-Flip Cooker (Save ₦10k)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplyPreset('sink_plus_5b')}
                      className={`text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                        sinkQty === 1 && cooker2bQty === 0 && cooker5bQty === 1
                          ? 'bg-blue-600 border-blue-600 text-white font-bold shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      Sink + 5-Burner Hybrid (Save ₦10k)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplyPreset('kitchen_trio')}
                      className={`text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                        sinkQty === 1 && cooker2bQty === 1 && cooker5bQty === 1
                          ? 'bg-blue-700 border-blue-700 text-white font-extrabold shadow-sm'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      🔥 Complete Trio Combo (Save ₦20k)
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Selection List */}
              <div className="space-y-4">
                
                {/* Product 1: Multifunctional Piano Sink */}
                <div className={`p-4 rounded-xl border transition-all ${
                  sinkQty > 0 
                    ? 'bg-white border-2 border-blue-500 shadow-sm' 
                    : 'bg-white/70 border-slate-200 opacity-80'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <img 
                        src={config.productImages[0]?.url || 'https://www.moonlightluxuryhometech.shop/images/sink-main.jpg'} 
                        alt={config.productName} 
                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border border-slate-200 bg-slate-100 flex-shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800 px-2 py-0.5 rounded border border-blue-200">
                            Smart Workstation
                          </span>
                          <span className="text-xs text-slate-400 line-through">₦380,000</span>
                          <span className="text-xs font-black text-[#0a192f]">{formatNaira(SINK_PRICE)}</span>
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-[#0a192f] leading-snug">
                          {config.productName} (75×46cm)
                        </h4>
                        <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                          Piano key waterfall, digital °C display, pull-out faucet, cup washer, cutting board &amp; prep basins.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t border-slate-200 sm:border-0">
                      <div className="text-left sm:text-right">
                        <span className="text-[10px] uppercase text-slate-500 block">Item Subtotal</span>
                        <span className="text-sm font-bold font-mono text-blue-700">
                          {sinkQty > 0 ? formatNaira(sinkSubtotal) : '₦0'}
                        </span>
                      </div>

                      <div className="flex items-center bg-slate-100 border border-slate-300 rounded-lg p-1">
                        <button
                          type="button"
                          onClick={() => setSinkQty(prev => Math.max(0, prev - 1))}
                          className="p-1 text-slate-600 hover:text-slate-900 hover:bg-white rounded transition-colors cursor-pointer"
                          aria-label="Decrease sink quantity"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-3 text-sm font-bold text-slate-900 font-mono min-w-[28px] text-center">
                          {sinkQty}
                        </span>
                        <button
                          type="button"
                          onClick={() => setSinkQty(prev => Math.min(10, prev + 1))}
                          className="p-1 text-slate-600 hover:text-slate-900 hover:bg-white rounded transition-colors cursor-pointer"
                          aria-label="Increase sink quantity"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product 2: 2-Flip-Up Double Gas Burner */}
                <div className={`p-4 rounded-xl border transition-all ${
                  cooker2bQty > 0 
                    ? 'bg-white border-2 border-blue-500 shadow-sm' 
                    : 'bg-white/70 border-slate-200 opacity-80'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <img 
                        src="https://www.moonlightluxuryhometech.shop/images/cooker_active_blue_flames.jpg" 
                        alt="2-Flip-Up Double Gas Burner" 
                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border border-slate-200 bg-slate-100 flex-shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-800 px-2 py-0.5 rounded border border-blue-200 flex items-center gap-1">
                            <Flame className="w-3 h-3 text-blue-600" /> 90° Flip-Up Cooker
                          </span>
                          <span className="text-xs text-slate-400 line-through">₦200,000</span>
                          <span className="text-xs font-black text-[#0a192f]">{formatNaira(COOKER_2B_PRICE)}</span>
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-[#0a192f] leading-snug">
                          2-Flip-Up Double Gas Burner With Timer (75×45cm)
                        </h4>
                        <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                          Dual 90° foldable burners for effortless countertop cleaning &amp; 1-180min digital safety auto-off timer.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t border-slate-200 sm:border-0">
                      <div className="text-left sm:text-right">
                        <span className="text-[10px] uppercase text-slate-500 block">Item Subtotal</span>
                        <span className="text-sm font-bold font-mono text-blue-700">
                          {cooker2bQty > 0 ? formatNaira(cooker2bSubtotal) : '₦0'}
                        </span>
                      </div>

                      <div className="flex items-center bg-slate-100 border border-slate-300 rounded-lg p-1">
                        <button
                          type="button"
                          onClick={() => setCooker2bQty(prev => Math.max(0, prev - 1))}
                          className="p-1 text-slate-600 hover:text-slate-900 hover:bg-white rounded transition-colors cursor-pointer"
                          aria-label="Decrease 2-burner quantity"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-3 text-sm font-bold text-slate-900 font-mono min-w-[28px] text-center">
                          {cooker2bQty}
                        </span>
                        <button
                          type="button"
                          onClick={() => setCooker2bQty(prev => Math.min(10, prev + 1))}
                          className="p-1 text-slate-600 hover:text-slate-900 hover:bg-white rounded transition-colors cursor-pointer"
                          aria-label="Increase 2-burner quantity"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product 3: Executive 5-Burner Hybrid Cooktop */}
                <div className={`p-4 rounded-xl border transition-all ${
                  cooker5bQty > 0 
                    ? 'bg-white border-2 border-blue-500 shadow-sm' 
                    : 'bg-white/70 border-slate-200 opacity-80'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <img 
                        src="https://www.moonlightluxuryhometech.shop/images/alternative_5burner/cooktop_showroom_active.jpg" 
                        alt="Executive 5-Burner Gas + Electric Hybrid Cooktop" 
                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border border-slate-200 bg-slate-100 flex-shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-800 px-2 py-0.5 rounded border border-blue-200">
                            5-Burner Gas + Electric
                          </span>
                          <span className="text-xs text-slate-400 line-through">₦340,000</span>
                          <span className="text-xs font-black text-[#0a192f]">{formatNaira(COOKER_5B_PRICE)}</span>
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-[#0a192f] leading-snug">
                          Executive 5-Burner Hybrid Cooktop (90×51cm)
                        </h4>
                        <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                          4 high-velocity gas burners + 1 ceramic electric 2000W zone. Never stop cooking when gas runs out.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t border-slate-200 sm:border-0">
                      <div className="text-left sm:text-right">
                        <span className="text-[10px] uppercase text-slate-500 block">Item Subtotal</span>
                        <span className="text-sm font-bold font-mono text-blue-700">
                          {cooker5bQty > 0 ? formatNaira(cooker5bSubtotal) : '₦0'}
                        </span>
                      </div>

                      <div className="flex items-center bg-slate-100 border border-slate-300 rounded-lg p-1">
                        <button
                          type="button"
                          onClick={() => setCooker5bQty(prev => Math.max(0, prev - 1))}
                          className="p-1 text-slate-600 hover:text-slate-900 hover:bg-white rounded transition-colors cursor-pointer"
                          aria-label="Decrease 5-burner quantity"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-3 text-sm font-bold text-slate-900 font-mono min-w-[28px] text-center">
                          {cooker5bQty}
                        </span>
                        <button
                          type="button"
                          onClick={() => setCooker5bQty(prev => Math.min(10, prev + 1))}
                          className="p-1 text-slate-600 hover:text-slate-900 hover:bg-white rounded transition-colors cursor-pointer"
                          aria-label="Increase 5-burner quantity"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {errors.quantity && (
                <div className="mt-3 p-3 bg-rose-50 border border-rose-300 rounded-lg flex items-center gap-2 text-rose-700 text-xs font-semibold">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errors.quantity}</span>
                </div>
              )}

              {/* DYNAMIC LIVE ORDER SUBTOTAL & BREAKDOWN CARD */}
              <div className="mt-6 pt-5 border-t border-slate-200 bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0a192f] flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-blue-600" />
                    <span>Live Order Subtotal Breakdown</span>
                  </span>
                  <span className="text-xs font-mono font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {totalItemCount} Total Item{totalItemCount !== 1 ? 's' : ''}
                  </span>
                </div>

                {/* Itemized list of selected items */}
                {selectedItems.length > 0 ? (
                  <div className="space-y-1.5 pb-3 border-b border-slate-200 text-xs">
                    {selectedItems.map((item) => (
                      <div key={item.id} className="flex justify-between items-center text-slate-700">
                        <span className="truncate pr-2">
                          <strong className="text-blue-700 font-mono">{item.quantity}x</strong> {item.name}
                        </span>
                        <span className="font-mono font-bold text-slate-900 whitespace-nowrap">{formatNaira(item.totalPrice)}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs text-amber-700 bg-amber-50 p-2.5 rounded-lg border border-amber-200 py-2 italic">
                    No products currently selected. Please set quantity above to place an order.
                  </div>
                )}

                {/* Subtotals & Delivery Details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[11px] uppercase">Products Subtotal</span>
                    <span className="font-bold text-slate-900 text-sm font-mono">{formatNaira(itemsSubtotal)}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[11px] uppercase">Bundle Savings</span>
                    {multiItemDiscount > 0 ? (
                      <span className="font-bold text-blue-700 text-sm flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" /> -{formatNaira(multiItemDiscount)}
                      </span>
                    ) : (
                      <span className="text-slate-400 text-xs">Add 2+ items for ₦10k–₦30k off</span>
                    )}
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[11px] uppercase">Delivery Method</span>
                    <span className="font-semibold text-slate-800">
                      {isLagosState ? (
                        <span className="text-blue-700 font-bold">FREE Doorstep (1–2 Days)</span>
                      ) : deliveryMethod === 'doorstep' ? (
                        <span className="text-blue-900 font-bold">+₦5,000 Doorstep (3–5 Days)</span>
                      ) : (
                        <span className="text-blue-700 font-bold">FREE Park Pickup (3–5 Days)</span>
                      )}
                    </span>
                  </div>
                </div>

                {/* Total Payable Banner */}
                <div className="mt-4 pt-3 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[#0a192f] block text-xs uppercase font-extrabold tracking-wider">
                      TOTAL AMOUNT PAYABLE ON DELIVERY:
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Zero advance payment required &bull; Inspect upon delivery in Nigeria
                    </span>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="font-black text-2xl sm:text-3xl text-blue-700 font-display">
                      {formatNaira(totalPrice)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* The Form Fields */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-[#0a192f] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-blue-600" />
                  <span>Full Name *</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="e.g. Adebayo Ogunlesi"
                  className={`w-full bg-slate-50 border rounded-xl py-3.5 px-4 text-slate-900 placeholder-slate-400 text-sm focus:outline-none transition-colors ${
                    errors.fullName ? 'border-rose-500 focus:border-rose-500 bg-rose-50/40' : 'border-slate-300 focus:border-blue-900 focus:bg-white'
                  }`}
                />
                {errors.fullName && <p className="text-xs text-rose-600 mt-1">{errors.fullName}</p>}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-bold text-[#0a192f] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-blue-600" />
                  <span>Phone Number (Active for calls & order confirmation) *</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="e.g. 08012345678 or 09136827730"
                  className={`w-full bg-slate-50 border rounded-xl py-3.5 px-4 text-slate-900 placeholder-slate-400 text-sm focus:outline-none transition-colors ${
                    errors.phone ? 'border-rose-500 focus:border-rose-500 bg-rose-50/40' : 'border-slate-300 focus:border-blue-900 focus:bg-white'
                  }`}
                />
                {errors.phone && <p className="text-xs text-rose-600 mt-1">{errors.phone}</p>}
              </div>

              {/* Destination State */}
              <div>
                <label className="block text-xs font-bold text-[#0a192f] uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>Destination State *</span>
                  <span className="text-[10px] text-blue-700 font-normal">All 36 states + FCT</span>
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-300 focus:border-blue-900 focus:bg-white rounded-xl py-3.5 px-4 text-slate-900 text-sm focus:outline-none transition-colors cursor-pointer font-medium"
                >
                  {NIGERIAN_STATES.map((st) => (
                    <option key={st} value={st} className="bg-white text-slate-900">
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              {/* Delivery Details & Option Selection */}
              <div className="pt-2">
                {isLagosState ? (
                  <div className="bg-blue-50 border border-blue-300 rounded-2xl p-4 flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 border border-blue-300 flex items-center justify-center shrink-0 mt-0.5">
                      <Home className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-bold text-[#0a192f] text-sm sm:text-base">Lagos Doorstep Delivery</span>
                        <span className="text-[11px] font-extrabold uppercase bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full border border-blue-200">
                          FREE &bull; 1 to 2 Business Days
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Orders within Lagos State are delivered straight to your home or site address with zero delivery fee. Estimated transit: <strong>1 to 2 business days</strong>.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                      <div>
                        <span className="text-xs font-bold text-[#0a192f] uppercase tracking-wider flex items-center gap-1.5">
                          <Truck className="w-4 h-4 text-blue-600" />
                          Delivery Options for {formData.state}
                        </span>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Choose how you would like to receive your sink in {formData.state}
                        </p>
                      </div>
                      <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 px-3 py-1 rounded-full self-start sm:self-auto shadow-xs">
                        <Clock className="w-3.5 h-3.5 text-blue-600" />
                        <span>Estimated Transit: 3 to 5 Business Days</span>
                      </div>
                    </div>

                    {/* Notice for Other States */}
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-slate-700 flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                      <div className="leading-relaxed">
                        <strong className="text-[#0a192f]">Delivery Policy for {formData.state}:</strong> For states outside Lagos, standard dispatch is shipped to your state/city's major commercial motor park for pick-up (FREE). If you want it delivered directly to your doorstep/site, it will attract an extra fee of <strong>₦5,000</strong>.
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
                            ? 'bg-blue-50/80 border-blue-600 shadow-sm'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2 w-full">
                          <div className="flex items-center gap-2">
                            <Building2 className={`w-5 h-5 ${deliveryMethod === 'park_pickup' ? 'text-blue-700' : 'text-slate-500'}`} />
                            <span className="font-bold text-[#0a192f] text-sm">Motor Park Pick-Up</span>
                          </div>
                          <span className="text-[11px] font-black uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200">
                            FREE (₦0)
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                          Standard collection at your city's central commercial transport park or terminal (e.g. Peace Mass, GIGM, Young Shall Grow, ABC).
                        </p>
                        <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-200 text-slate-500 w-full">
                          <span className="flex items-center gap-1 text-slate-600">
                            <Clock className="w-3 h-3 text-blue-600" /> 3–5 Business Days
                          </span>
                          <span className={`font-bold ${deliveryMethod === 'park_pickup' ? 'text-blue-700' : 'text-slate-400'}`}>
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
                            ? 'bg-blue-50/80 border-[#0a192f] shadow-sm'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2 w-full">
                          <div className="flex items-center gap-2">
                            <Home className={`w-5 h-5 ${deliveryMethod === 'doorstep' ? 'text-blue-900' : 'text-slate-500'}`} />
                            <span className="font-bold text-[#0a192f] text-sm">Doorstep Delivery</span>
                          </div>
                          <span className="text-[11px] font-black uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-900 border border-blue-200">
                            +₦5,000 EXTRA
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                          A local dispatch courier brings the heavy package directly to your house, site, or office gate in {formData.state}.
                        </p>
                        <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-200 text-slate-500 w-full">
                          <span className="flex items-center gap-1 text-slate-600">
                            <Clock className="w-3 h-3 text-blue-900" /> 3–5 Business Days
                          </span>
                          <span className={`font-bold ${deliveryMethod === 'doorstep' ? 'text-blue-900' : 'text-slate-400'}`}>
                            {deliveryMethod === 'doorstep' ? '✓ Selected (+₦5K)' : 'Choose this'}
                          </span>
                        </div>
                      </button>
                    </div>

                    {/* Dedicated Pick-Up Motor Park Selector */}
                    {deliveryMethod === 'park_pickup' && availableParks && availableParks.length > 0 && (
                      <div className="pt-3 border-t border-slate-200 mt-2">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2.5">
                          <label className="text-xs font-black text-[#0a192f] uppercase tracking-wider flex items-center gap-1.5">
                            <Building2 className="w-4 h-4 text-blue-600" />
                            <span>Select Pick-Up Motor Park in {formData.state} *</span>
                          </label>
                          <span className="text-[11px] text-slate-500">Choose your preferred park station</span>
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
                                    ? 'bg-blue-50 border-blue-600 text-[#0a192f] shadow-xs ring-1 ring-blue-400'
                                    : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                                }`}
                              >
                                <div className="flex items-center justify-between gap-2 mb-1 w-full">
                                  <span className="font-bold text-sm text-[#0a192f] flex items-center gap-2">
                                    <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${isSelected ? 'border-blue-600 bg-blue-600' : 'border-slate-400'}`}>
                                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                                    </span>
                                    <span>{park.shortName}</span>
                                  </span>
                                  {isSelected && (
                                    <span className="text-[10px] font-extrabold uppercase text-blue-800 bg-blue-100 px-1.5 py-0.5 rounded border border-blue-200">
                                      Selected
                                    </span>
                                  )}
                                </div>
                                <span className="text-xs font-semibold text-slate-800 pl-6 block">{park.name}</span>
                                <span className="text-[11px] text-slate-500 pl-6 mt-0.5 block">{park.area}</span>
                              </button>
                            );
                          })}
                        </div>
                        
                        <div className="mt-2.5 text-[11px] text-slate-700 flex items-center gap-1.5 bg-blue-50/60 p-2.5 rounded-lg border border-blue-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span>Your sink workstation will be booked directly to <strong>{selectedMotorPark || availableParks[0].name}</strong> for easy collection.</span>
                        </div>
                      </div>
                    )}

                    {/* Standard notice for other states without specific park presets */}
                    {deliveryMethod === 'park_pickup' && (!availableParks || availableParks.length === 0) && (
                      <div className="mt-2 p-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 flex items-start gap-2.5">
                        <Building2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-[#0a192f]">Central Motor Park Pick-Up:</span> Your order will be dispatched to the central commercial transport terminal in {formData.state}. You can also mention your preferred transport company (e.g. Peace Mass, GIGM, Young Shall Grow, ABC) in the address field below.
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Delivery Address */}
              <div>
                <label className="block text-xs font-bold text-[#0a192f] uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
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
                  className={`w-full bg-slate-50 border rounded-xl py-3 px-4 text-slate-900 placeholder-slate-400 text-sm focus:outline-none transition-colors ${
                    errors.address ? 'border-rose-500 focus:border-rose-500 bg-rose-50/40' : 'border-slate-300 focus:border-blue-900 focus:bg-white'
                  }`}
                />
                {errors.address && <p className="text-xs text-rose-600 mt-1">{errors.address}</p>}
              </div>

              {/* Email (Optional) */}
              <div>
                <label className="block text-xs font-bold text-[#0a192f] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-blue-600" />
                  <span>Email Address (Optional for order receipt)</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="e.g. yourname@gmail.com"
                  className="w-full bg-slate-50 border border-slate-300 focus:border-blue-900 focus:bg-white rounded-xl py-3.5 px-4 text-slate-900 placeholder-slate-400 text-sm focus:outline-none transition-colors"
                />
              </div>

              {/* Delivery Notice */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
                <Truck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#0a192f]">Estimated Delivery Notice:</span> Lagos orders arrive in <strong>1 to 2 business days</strong>. Other states arrive in <strong>3 to 5 business days</strong> (Park Pickup or Doorstep delivery). Please submit only if you or your representative are available to receive the package and complete payment.
                </div>
              </div>

              {/* Payment on Delivery Assurance Banner */}
              <div className="bg-blue-50 border border-blue-300 rounded-xl p-3 sm:p-3.5 flex items-center justify-between gap-2 text-xs text-blue-800">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="font-bold text-blue-950">Payment on Delivery Available</span>
                </div>
                <span className="text-[11px] text-blue-700 font-medium hidden sm:inline">Pay only when you receive your package</span>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                id="complete-order-btn"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-black text-lg py-5 px-6 sm:px-8 rounded-xl shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 transform active:scale-[0.99] transition-all cursor-pointer uppercase tracking-wider disabled:opacity-50 animate-action-blink"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Recording Your Order...
                  </span>
                ) : (
                  <>
                    <div className="flex flex-col items-center">
                      <span className="text-base sm:text-lg tracking-wide">ORDER NOW — PAYMENT ON DELIVERY</span>
                      <span className="text-[11px] font-medium text-blue-100 normal-case tracking-normal">
                        No advance payment needed &bull; Pay when your sink arrives
                      </span>
                    </div>
                    <ArrowRight className="w-6 h-6 shrink-0" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-3 pt-2 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  100% Privacy Protected
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-blue-600" />
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
