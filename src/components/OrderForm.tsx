import React, { useState, useEffect } from 'react';
import { SiteConfig, OrderData, OrderItem } from '../types';
import { NIGERIAN_STATES, getMotorParksForState } from '../data/nigeria';
import { formatNaira, FORMSPREE_ENDPOINT } from '../config';
import { getWhatsAppUrl } from '../utils/whatsapp';
import { trackPurchase, trackContact } from '../utils/metaPixel';
import { ALTERNATIVE_PRODUCTS, AlternativeProduct } from '../data/alternativeProducts';
import confetti from 'canvas-confetti';
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
  Tag,
  PackageCheck,
  Check,
  Lock,
  BadgeCheck,
  Flame,
  Zap,
  Sliders,
  FileText
} from 'lucide-react';

// Celebratory multi-stage confetti burst to boost customer excitement when placing an order
export const triggerOrderConfetti = () => {
  try {
    // 1. Initial vibrant center explosion
    confetti({
      particleCount: 100,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#2563eb', '#10b981', '#f59e0b', '#3b82f6', '#ec4899', '#6366f1'],
      zIndex: 99999,
    });

    // 2. Left side cannon wave
    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 60,
        origin: { x: 0.1, y: 0.7 },
        colors: ['#2563eb', '#10b981', '#fbbf24', '#38bdf8'],
        zIndex: 99999,
      });
    }, 250);

    // 3. Right side cannon wave
    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 60,
        origin: { x: 0.9, y: 0.7 },
        colors: ['#2563eb', '#10b981', '#fbbf24', '#38bdf8'],
        zIndex: 99999,
      });
    }, 450);

    // 4. Grand finale celebration shower
    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.4 },
        colors: ['#ffd700', '#f59e0b', '#2563eb', '#10b981'],
        zIndex: 99999,
      });
    }, 700);
  } catch (error) {
    console.warn('Confetti trigger encountered an issue:', error);
  }
};

interface OrderFormProps {
  config: SiteConfig;
  onOrderPlaced?: (order: { orderId: string; orderData: OrderData; totalAmount: number; timestamp: string } | null) => void;
  onViewSuggestedProduct?: (product: AlternativeProduct) => void;
  productToAddToForm?: { productId: string; timestamp: number } | null;
}

export const OrderForm: React.FC<OrderFormProps> = ({ 
  config, 
  onOrderPlaced,
  onViewSuggestedProduct,
  productToAddToForm
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

  // Multi-product quantities for checkout
  const [sinkQty, setSinkQty] = useState<number>(1);
  const [cooker2bQty, setCooker2bQty] = useState<number>(0);
  const [cooker5bQty, setCooker5bQty] = useState<number>(0);
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  // Automatically react to product additions from gallery or ticker
  useEffect(() => {
    if (!productToAddToForm) return;
    const { productId } = productToAddToForm;
    if (productId === 'cooker-2burner') {
      setCooker2bQty(prev => (prev === 0 ? 1 : prev + 1));
      setRecentlyAddedId('cooker-2burner');
    } else if (productId === 'cooker-5burner') {
      setCooker5bQty(prev => (prev === 0 ? 1 : prev + 1));
      setRecentlyAddedId('cooker-5burner');
    } else if (productId === 'sink') {
      setSinkQty(prev => (prev === 0 ? 1 : prev));
      setRecentlyAddedId('sink');
    }

    const timer = setTimeout(() => {
      setRecentlyAddedId(null);
    }, 4500);
    return () => clearTimeout(timer);
  }, [productToAddToForm]);

  // Post-order suggested companion product state (after customer submits order)
  const [addedSuggestedIds, setAddedSuggestedIds] = useState<string[]>([]);
  const [suggestedQuantities, setSuggestedQuantities] = useState<Record<string, number>>({});
  const [isAddingSuggested, setIsAddingSuggested] = useState<string | null>(null);
  const [suggestedFeedback, setSuggestedFeedback] = useState<string | null>(null);

  const getSuggestedQty = (id: string): number => suggestedQuantities[id] || 1;
  const setSuggestedQty = (id: string, qty: number) => {
    setSuggestedQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, Math.min(10, qty))
    }));
  };

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

  // Itemized array of selected products
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

  // Multi-product bundle discount: ₦5,000 (5K) for 2 or more products
  let multiItemDiscount = 0;
  if (totalItemCount >= 2) {
    multiItemDiscount = 5000;
  }

  const totalPrice = Math.max(0, itemsSubtotal - multiItemDiscount) + deliveryFee;
  const estimatedDays = isLagosState ? '1 to 2 business days' : '3 to 5 business days';

  // Handler when customer adds a suggested companion cooktop on the order receipt screen
  const handleAddSuggestedProduct = async (product: AlternativeProduct, qtyToAdd?: number) => {
    if (!submittedOrder) return;
    const quantity = qtyToAdd || getSuggestedQty(product.id);

    setIsAddingSuggested(product.id);

    const currentItems = submittedOrder.orderData.items || [];
    const existingIndex = currentItems.findIndex(it => it.id === product.id);

    let updatedItems: OrderItem[];
    if (existingIndex >= 0) {
      const existing = currentItems[existingIndex];
      const newQty = existing.quantity + quantity;
      updatedItems = [...currentItems];
      updatedItems[existingIndex] = {
        ...existing,
        quantity: newQty,
        totalPrice: newQty * existing.unitPrice
      };
    } else {
      const newItem: OrderItem = {
        id: product.id,
        name: product.name,
        quantity: quantity,
        unitPrice: product.price,
        totalPrice: quantity * product.price
      };
      updatedItems = [...currentItems, newItem];
    }

    const newItemsCount = updatedItems.reduce((acc, it) => acc + it.quantity, 0);

    // Multi-product bundle discount is 5K (₦5,000) whenever 2 or more products are ordered
    const updatedDiscount = newItemsCount >= 2 ? 5000 : 0;
    const rawSubtotal = updatedItems.reduce((acc, it) => acc + it.totalPrice, 0);
    const deliverySurcharge = submittedOrder.orderData.deliveryFee || 0;
    const newTotal = Math.max(0, rawSubtotal - updatedDiscount) + deliverySurcharge;

    const updatedOrder = {
      ...submittedOrder,
      orderData: {
        ...submittedOrder.orderData,
        quantity: newItemsCount,
        items: updatedItems,
        multiItemDiscount: updatedDiscount,
        includedAlternativeCooker: product.id,
        alternativeCookerName: product.name,
        alternativeCookerPrice: product.price
      },
      totalAmount: newTotal
    };

    setSubmittedOrder(updatedOrder);
    setAddedSuggestedIds(prev => Array.from(new Set([...prev, product.id])));
    setSuggestedFeedback(`🎉 Fantastic! We've added ${quantity > 1 ? `${quantity}x ` : ''}${product.name} to your order #${submittedOrder.orderId}. Your ₦5,000 multi-product bundle discount was applied, bringing your updated total payable on delivery to ${formatNaira(newTotal)}.`);
    setIsAddingSuggested(null);
    triggerOrderConfetti();

    if (onOrderPlaced) {
      onOrderPlaced(updatedOrder);
    }

    // Inform seller via Formspree in background
    const formspreeUrl = config.formspreeEndpoint || FORMSPREE_ENDPOINT;
    try {
      await fetch(formspreeUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          order_id: submittedOrder.orderId,
          update_type: 'CUSTOMER_ADDED_SUGGESTED_COMPANION_PRODUCT',
          customer_name: submittedOrder.orderData.fullName,
          phone_number: submittedOrder.orderData.phone,
          state: submittedOrder.orderData.state,
          delivery_address: submittedOrder.orderData.address,
          added_product: `${quantity}x ${product.name} (${formatNaira(product.price * quantity)})`,
          bundle_discount: '-₦5,000 Multi-Product Bundle Discount',
          updated_total_payable_on_delivery: formatNaira(newTotal),
          all_items_in_order: updatedItems.map(it => `${it.quantity}x ${it.name}`).join(' | '),
          submission_time: new Date().toLocaleString('en-NG'),
          _subject: `[ADD-ON ADDED] Order ${submittedOrder.orderId}: ${submittedOrder.orderData.fullName} added ${quantity}x ${product.name} - New Total: ${formatNaira(newTotal)}`
        })
      });
    } catch (err) {
      console.warn('Formspree add-on update error:', err);
    }
  };

  // Handler to adjust quantity of an already added suggested product directly from receipt
  const handleModifyAddedSuggestedQty = (productId: string, newQty: number) => {
    if (!submittedOrder) return;
    const currentItems = submittedOrder.orderData.items || [];
    const existing = currentItems.find(it => it.id === productId);
    if (!existing) return;

    let updatedItems: OrderItem[];
    if (newQty <= 0) {
      updatedItems = currentItems.filter(it => it.id !== productId);
      setAddedSuggestedIds(prev => prev.filter(id => id !== productId));
    } else {
      updatedItems = currentItems.map(it => {
        if (it.id === productId) {
          return {
            ...it,
            quantity: newQty,
            totalPrice: newQty * it.unitPrice
          };
        }
        return it;
      });
    }

    const newItemsCount = updatedItems.reduce((acc, it) => acc + it.quantity, 0);
    const updatedDiscount = newItemsCount >= 2 ? 5000 : 0;
    const rawSubtotal = updatedItems.reduce((acc, it) => acc + it.totalPrice, 0);
    const deliverySurcharge = submittedOrder.orderData.deliveryFee || 0;
    const newTotal = Math.max(0, rawSubtotal - updatedDiscount) + deliverySurcharge;

    const updatedOrder = {
      ...submittedOrder,
      orderData: {
        ...submittedOrder.orderData,
        quantity: newItemsCount,
        items: updatedItems,
        multiItemDiscount: updatedDiscount,
      },
      totalAmount: newTotal
    };

    setSubmittedOrder(updatedOrder);
    setSuggestedFeedback(
      newQty <= 0
        ? `Item removed from order #${submittedOrder.orderId}. Updated total: ${formatNaira(newTotal)}.`
        : `Updated to ${newQty}x ${existing.name}. Updated total payable on delivery: ${formatNaira(newTotal)}.`
    );

    if (onOrderPlaced) {
      onOrderPlaced(updatedOrder);
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

  const handleSubmit = async (e: React.FormEvent) => {
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

    const orderId = `SKS-${Math.floor(100000 + Math.random() * 900000)}`;

    const deliveryMethodText = isLagosState
      ? 'Direct Doorstep Delivery (Lagos - FREE)'
      : (deliveryMethod === 'doorstep'
          ? 'Doorstep Delivery (+₦5,000 Extra Fee)'
          : `Motor Park Pick-Up (FREE)${effectivePark ? ` - ${effectivePark}` : ''}`);

    const itemsSummaryText = selectedItems.map(item => `${item.quantity}x ${item.name} (${formatNaira(item.totalPrice)})`).join(' | ');

    // Send customer order details to Formspree endpoint so the merchant receives the submission
    const formspreeUrl = config.formspreeEndpoint || FORMSPREE_ENDPOINT;
    try {
      await fetch(formspreeUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          order_id: orderId,
          customer_name: formData.fullName,
          phone_number: formData.phone,
          delivery_state: formData.state,
          delivery_address: formData.address,
          email: formData.email || "Not provided",
          delivery_method: deliveryMethodText,
          pickup_motor_park: effectivePark || "N/A",
          ordered_items: itemsSummaryText,
          total_products_count: totalItemCount,
          subtotal: formatNaira(itemsSubtotal),
          multi_item_discount: multiItemDiscount > 0 ? `-${formatNaira(multiItemDiscount)}` : "None",
          delivery_fee: formatNaira(deliveryFee),
          total_amount_payable: formatNaira(totalPrice),
          customer_notes: formData.notes || "None",
          submission_time: new Date().toLocaleString('en-NG', { dateStyle: 'medium', timeStyle: 'short' }),
          _subject: `New Order ${orderId}: ${formData.fullName} - ${formatNaira(totalPrice)}`
        })
      });
    } catch (err) {
      console.warn("Formspree submission notification error (proceeding with order receipt):", err);
    }

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
      },
      totalAmount: totalPrice,
      timestamp: new Date().toLocaleString('en-NG', { dateStyle: 'medium', timeStyle: 'short' })
    };

    setSubmittedOrder(newOrder);
    setAddedSuggestedIds([]);
    setSuggestedFeedback(null);
    if (onOrderPlaced) {
      onOrderPlaced(newOrder);
    }
    setIsSubmitting(false);

    // Trigger celebratory confetti explosion effect to boost customer excitement
    triggerOrderConfetti();

    // Fire Meta Pixel Purchase event with total item count
    trackPurchase(orderId, totalPrice, 'NGN', totalItemCount);

    // Scroll smoothly to order receipt
    setTimeout(() => {
      const receipt = document.getElementById("order-success-receipt");
      if (receipt) {
        receipt.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
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

    const rawSubtotal = (orderData.items && orderData.items.length > 0)
      ? orderData.items.reduce((acc, it) => acc + it.totalPrice, 0)
      : (orderData.quantity * SINK_PRICE);

    const msg = `*CONFIRMED ORDER - MOONLIGHT LUXURY HOME TECH* 📦\n\n` +
      `*Order ID:* ${orderId}\n` +
      `*Total Products:* ${orderData.quantity} item(s)\n\n` +
      `*ORDERED ITEMS:*\n${itemsSummaryText}\n\n` +
      `*Subtotal:* ${formatNaira(rawSubtotal)}\n` +
      (orderData.multiItemDiscount && orderData.multiItemDiscount > 0 ? `*Package Discount:* -${formatNaira(orderData.multiItemDiscount)} 🎉\n` : '') +
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
      `\nHello Moonlight! I have just submitted my order on your website. Please confirm dispatch details with me.`;

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

            {/* SUGGESTED COMPANION APPLIANCES SECTION (SHOWN ONLY AFTER ORDER SUBMISSION) */}
            <div className="bg-gradient-to-br from-amber-500/10 via-slate-50 to-blue-50/40 border-2 border-amber-400/80 rounded-2xl p-5 sm:p-7 mb-8 shadow-md relative">
              {/* Top Badge */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-black tracking-wider uppercase text-amber-900 bg-amber-200/80 border border-amber-400 px-3 py-1 rounded-full shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                  <span>SUGGESTED COMPANIONS FOR YOUR NEW SINK</span>
                </span>
                <span className="text-[11px] font-bold text-blue-900 bg-blue-100 px-2.5 py-0.5 rounded-md border border-blue-200">
                  Ships in Same Parcel &bull; Free Combined Dispatch
                </span>
              </div>

              <h4 className="text-lg sm:text-xl font-black text-[#0a192f] tracking-tight mb-1">
                Complete Your Luxury Kitchen Before We Dispatch!
              </h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-5 max-w-2xl">
                Customers who ordered the <strong>Smart Piano Sink</strong> often add one of Moonlight's matching executive built-in cooktops to their package. Add one or more now to your existing order <span className="font-mono font-bold text-blue-700">#{submittedOrder.orderId}</span> to enjoy an instant <strong>₦5,000 multi-product bundle discount</strong> and combined pay-on-delivery inspection.
              </p>

              {/* Live Feedback banner if product was added */}
              {suggestedFeedback && (
                <div className="mb-5 p-3.5 bg-emerald-50 border-2 border-emerald-400 text-emerald-900 rounded-xl text-xs sm:text-sm font-semibold flex items-start gap-2.5 shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>{suggestedFeedback}</div>
                </div>
              )}

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                {ALTERNATIVE_PRODUCTS.map((prod) => {
                  const currentItems = submittedOrder.orderData.items || [];
                  const addedItem = currentItems.find(it => it.id === prod.id);
                  const isAdded = !!addedItem && addedItem.quantity > 0;
                  const isProcessing = isAddingSuggested === prod.id;
                  const previewImg = prod.images[0] || 'https://www.moonlightluxuryhometech.shop/images/cooker_active_blue_flames.jpg';
                  const qtyToSelect = getSuggestedQty(prod.id);

                  return (
                    <div 
                      key={prod.id}
                      className={`bg-white rounded-xl border-2 transition-all p-4 flex flex-col justify-between shadow-xs ${
                        isAdded ? 'border-emerald-500 bg-emerald-50/20' : 'border-slate-200 hover:border-amber-400'
                      }`}
                    >
                      <div>
                        {/* Image & Badges */}
                        <div className="relative rounded-lg overflow-hidden border border-slate-200 bg-slate-900 mb-3 group">
                          <img 
                            src={previewImg} 
                            alt={prod.name} 
                            className="w-full h-44 sm:h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute top-2 left-2 flex flex-col gap-1 items-start">
                            <span className="text-[10px] font-black uppercase tracking-wider bg-amber-400 text-black px-2 py-0.5 rounded shadow-sm">
                              {prod.badge}
                            </span>
                          </div>
                          <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-xs text-white text-[11px] font-bold px-2 py-0.5 rounded">
                            {prod.dimensions}
                          </div>
                        </div>

                        {/* Title & Pricing */}
                        <div className="mb-2">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="text-xs text-slate-400 line-through">{formatNaira(prod.normalPrice)}</span>
                            <span className="text-base sm:text-lg font-black text-[#0a192f] font-mono">{formatNaira(prod.price)}</span>
                            <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                              Save {formatNaira(prod.normalPrice - prod.price)}
                            </span>
                          </div>
                          <h5 className="font-extrabold text-sm sm:text-base text-[#0a192f] leading-snug">
                            {prod.name}
                          </h5>
                          <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                            {prod.description}
                          </p>
                        </div>

                        {/* Key Features */}
                        <ul className="space-y-1 my-3 text-xs text-slate-700 border-t border-b border-slate-100 py-2.5">
                          {prod.keyFeatures.slice(0, 3).map((feat, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Action CTAs */}
                      <div className="space-y-2.5 pt-2">
                        {isAdded ? (
                          <div className="p-3 bg-emerald-50 border-2 border-emerald-400 rounded-xl space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-xs font-black text-emerald-800 flex items-center gap-1.5">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                <span>IN ORDER #{submittedOrder.orderId}:</span>
                              </span>
                              <span className="text-xs font-mono font-black text-emerald-900">
                                {addedItem.quantity} unit{addedItem.quantity > 1 ? 's' : ''} ({formatNaira(addedItem.totalPrice)})
                              </span>
                            </div>

                            <div className="flex items-center justify-between gap-2 pt-2 border-t border-emerald-200">
                              <span className="text-[11px] font-bold text-slate-600">Adjust Quantity:</span>
                              <div className="flex items-center gap-1.5 bg-white border border-emerald-300 rounded-lg p-0.5">
                                <button
                                  type="button"
                                  onClick={() => handleModifyAddedSuggestedQty(prod.id, addedItem.quantity - 1)}
                                  className="w-7 h-7 flex items-center justify-center rounded text-slate-700 hover:bg-slate-100 font-black cursor-pointer text-sm"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="w-8 text-center text-xs font-black font-mono text-emerald-950">
                                  {addedItem.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleModifyAddedSuggestedQty(prod.id, addedItem.quantity + 1)}
                                  className="w-7 h-7 flex items-center justify-center rounded text-slate-700 hover:bg-slate-100 font-black cursor-pointer text-sm"
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            {/* Quantity Selector Before Adding */}
                            <div className="flex items-center justify-between gap-2 p-2 bg-slate-50 border border-slate-200 rounded-xl">
                              <span className="text-xs font-bold text-slate-700">Choose Quantity:</span>
                              <div className="flex items-center gap-1.5 bg-white border border-slate-300 rounded-lg p-0.5">
                                <button
                                  type="button"
                                  onClick={() => setSuggestedQty(prod.id, qtyToSelect - 1)}
                                  className="w-7 h-7 flex items-center justify-center rounded text-slate-700 hover:bg-slate-100 font-bold cursor-pointer"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="w-8 text-center text-xs font-black font-mono text-[#0a192f]">
                                  {qtyToSelect}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => setSuggestedQty(prod.id, qtyToSelect + 1)}
                                  className="w-7 h-7 flex items-center justify-center rounded text-slate-700 hover:bg-slate-100 font-bold cursor-pointer"
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            <button
                              type="button"
                              disabled={isProcessing}
                              onClick={() => handleAddSuggestedProduct(prod, qtyToSelect)}
                              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-black tracking-wide flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-[0.99] animate-action-blink"
                            >
                              {isProcessing ? (
                                <>
                                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                  <span>Adding to Order #{submittedOrder.orderId}...</span>
                                </>
                              ) : (
                                <>
                                  <Plus className="w-4 h-4 shrink-0" />
                                  <span>
                                    ADD {qtyToSelect > 1 ? `${qtyToSelect}x ` : ''}TO ORDER (PAY {formatNaira(prod.price * qtyToSelect)} ON DELIVERY)
                                  </span>
                                </>
                              )}
                            </button>
                          </div>
                        )}

                        {/* View Specs Button without WhatsApp */}
                        {onViewSuggestedProduct && (
                          <button
                            type="button"
                            onClick={() => onViewSuggestedProduct(prod)}
                            className="w-full py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold text-center border border-slate-200 transition-colors cursor-pointer"
                          >
                            Inspect Full Photos &amp; Specs
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Post-Order Moonlight Phone & WhatsApp Helpline */}
            <div className="bg-slate-50 border-2 border-blue-500/30 rounded-2xl p-5 sm:p-6 mb-6 text-center shadow-sm">
              <span className="text-xs font-bold text-blue-800 uppercase tracking-widest bg-blue-100 px-3 py-1 rounded-full border border-blue-200 inline-block mb-2">
                📞 CALL OR WHATSAPP MOONLIGHT
              </span>
              <h4 className="text-[#0a192f] text-base sm:text-lg font-extrabold mb-1">
                Your Order Reference: <span className="text-blue-700 font-mono">#{submittedOrder.orderId}</span>
              </h4>
              <p className="text-slate-600 text-xs sm:text-sm mb-4 max-w-md mx-auto">
                Need immediate assistance or have questions about your order? Call or WhatsApp Moonlight directly:
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`tel:${config.phoneNumber.replace(/\s+/g, '')}`}
                  onClick={() => trackContact('phone', 'order-success-call')}
                  id="order-success-call-btn"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#0a192f] hover:bg-slate-800 text-white font-black text-sm py-4 px-6 rounded-xl shadow-md transition-transform active:scale-[0.98] cursor-pointer tracking-wide"
                >
                  <Phone className="w-4 h-4 text-blue-400" />
                  <span>CALL MOONLIGHT: {config.phoneNumber}</span>
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
                  <span>WHATSAPP MOONLIGHT</span>
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
                    <span>Select Products For Your Order</span>
                  </h3>
                  <span className="text-xs font-bold text-blue-800 bg-blue-100 px-2.5 py-1 rounded-full border border-blue-200">
                    Payment on Delivery &bull; Inspect Before Payment
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  Choose your Smart Piano Sink and/or matching Luxury Gas &amp; Hybrid Burners. Order 2 or more products to get an instant <strong>₦5,000 multi-product bundle discount</strong>!
                </p>

                {/* Quick Presets / Bundle Shortcuts */}
                <div className="mt-4 pt-3 border-t border-slate-200">
                  <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-2">
                    Popular Configurations (Click to Select):
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => { setSinkQty(1); setCooker2bQty(0); setCooker5bQty(0); }}
                      className={`text-xs px-3.5 py-2 rounded-xl border transition-all cursor-pointer font-bold ${
                        sinkQty === 1 && cooker2bQty === 0 && cooker5bQty === 0
                          ? 'bg-[#0a192f] border-[#0a192f] text-white shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      1x Piano Sink ({formatNaira(SINK_PRICE)})
                    </button>
                    <button
                      type="button"
                      onClick={() => { setSinkQty(1); setCooker2bQty(1); setCooker5bQty(0); }}
                      className={`text-xs px-3.5 py-2 rounded-xl border transition-all cursor-pointer font-bold ${
                        sinkQty === 1 && cooker2bQty === 1 && cooker5bQty === 0
                          ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      Sink + 2-Burner Cooker Bundle (Save ₦5k 🎉)
                    </button>
                    <button
                      type="button"
                      onClick={() => { setSinkQty(1); setCooker2bQty(0); setCooker5bQty(1); }}
                      className={`text-xs px-3.5 py-2 rounded-xl border transition-all cursor-pointer font-bold ${
                        sinkQty === 1 && cooker2bQty === 0 && cooker5bQty === 1
                          ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      Sink + 5-Burner Hybrid Bundle (Save ₦5k 🎉)
                    </button>
                    <button
                      type="button"
                      onClick={() => { setSinkQty(0); setCooker2bQty(1); setCooker5bQty(0); }}
                      className={`text-xs px-3.5 py-2 rounded-xl border transition-all cursor-pointer font-bold ${
                        sinkQty === 0 && cooker2bQty === 1 && cooker5bQty === 0
                          ? 'bg-[#0a192f] border-[#0a192f] text-white shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      Only 2-Burner Cooktop ({formatNaira(COOKER_2B_PRICE)})
                    </button>
                    <button
                      type="button"
                      onClick={() => { setSinkQty(0); setCooker2bQty(0); setCooker5bQty(1); }}
                      className={`text-xs px-3.5 py-2 rounded-xl border transition-all cursor-pointer font-bold ${
                        sinkQty === 0 && cooker2bQty === 0 && cooker5bQty === 1
                          ? 'bg-[#0a192f] border-[#0a192f] text-white shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      Only 5-Burner Hybrid ({formatNaira(COOKER_5B_PRICE)})
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Selection List */}
              <div className="space-y-4">
                
                {/* Product 1: Multifunctional Piano Sink */}
                <div 
                  id="product-card-sink"
                  className={`p-4 rounded-xl border transition-all ${
                    recentlyAddedId === 'sink'
                      ? 'ring-4 ring-blue-400 bg-blue-50/50 border-blue-500 shadow-md animate-pulse'
                      : sinkQty > 0 
                        ? 'bg-white border-2 border-blue-500 shadow-sm' 
                        : 'bg-white/70 border-slate-200 opacity-80'
                  }`}
                >
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
                            Smart Workstation Sink
                          </span>
                          <span className="text-xs text-slate-400 line-through">{formatNaira(config.normalPrice)}</span>
                          <span className="text-xs font-black text-[#0a192f]">{formatNaira(SINK_PRICE)}</span>
                          {recentlyAddedId === 'sink' && (
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300 animate-pulse">
                              ✨ Just Selected
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-[#0a192f] leading-snug">
                          {config.productName} (75×45cm)
                        </h4>
                        <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                          Piano key waterfall, digital °C display, pull-out faucet, cup washer, cutting board &amp; prep basins.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t border-slate-200 sm:border-0">
                      <div className="text-left sm:text-right">
                        <span className="text-[10px] uppercase text-slate-500 block">Subtotal</span>
                        <span className="text-sm font-bold font-mono text-blue-700">
                          {sinkQty > 0 ? formatNaira(sinkQty * SINK_PRICE) : '₦0'}
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

                {/* Product 2: 2-Flip-Up Double Gas Burner With Timer */}
                <div 
                  id="product-card-cooker-2burner"
                  className={`p-4 rounded-xl border transition-all ${
                    recentlyAddedId === 'cooker-2burner'
                      ? 'ring-4 ring-amber-400 bg-amber-50/60 border-amber-500 shadow-md animate-pulse'
                      : cooker2bQty > 0 
                        ? 'bg-white border-2 border-amber-500 shadow-sm' 
                        : 'bg-white/70 border-slate-200 opacity-90'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <img 
                        src="https://www.moonlightluxuryhometech.shop/images/cooker_active_blue_flames.jpg" 
                        alt="2-Flip-Up Double Gas Burner" 
                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border border-slate-200 bg-slate-100 flex-shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 px-2 py-0.5 rounded border border-amber-200 flex items-center gap-1">
                            <Flame className="w-3 h-3 text-amber-600" />
                            <span>90° Flip-Up Gas Burner</span>
                          </span>
                          <span className="text-xs text-slate-400 line-through">₦200,000</span>
                          <span className="text-xs font-black text-[#0a192f]">{formatNaira(COOKER_2B_PRICE)}</span>
                          {recentlyAddedId === 'cooker-2burner' && (
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300 animate-pulse">
                              ✨ Added to Your Form!
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-sm sm:text-base font-bold text-[#0a192f] leading-snug">
                            2-Flip-Up Double Gas Burner With Timer (75×45cm)
                          </h4>
                          <button
                            type="button"
                            onClick={() => {
                              const prod = ALTERNATIVE_PRODUCTS.find(p => p.id === 'cooker-2burner');
                              if (prod && onViewSuggestedProduct) onViewSuggestedProduct(prod);
                            }}
                            className="text-[11px] font-bold text-blue-700 hover:text-blue-900 underline inline-flex items-center gap-1 cursor-pointer"
                          >
                            <FileText className="w-3 h-3" />
                            <span>View Specs &amp; Blueprint</span>
                          </button>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                          90° hinged burners for instant 1-wipe cleanups underneath, 0–180m mechanical auto-off safety timer, pure blue flame.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t border-slate-200 sm:border-0">
                      <div className="text-left sm:text-right">
                        <span className="text-[10px] uppercase text-slate-500 block">Subtotal</span>
                        <span className="text-sm font-bold font-mono text-amber-700">
                          {cooker2bQty > 0 ? formatNaira(cooker2bQty * COOKER_2B_PRICE) : '₦0'}
                        </span>
                      </div>

                      {cooker2bQty === 0 ? (
                        <button
                          type="button"
                          onClick={() => setCooker2bQty(1)}
                          className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black rounded-lg transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Order</span>
                        </button>
                      ) : (
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
                      )}
                    </div>
                  </div>
                </div>

                {/* Product 3: Executive 5-Burner Built-In Gas + Electric Hybrid Cooktop */}
                <div 
                  id="product-card-cooker-5burner"
                  className={`p-4 rounded-xl border transition-all ${
                    recentlyAddedId === 'cooker-5burner'
                      ? 'ring-4 ring-cyan-400 bg-cyan-50/60 border-cyan-500 shadow-md animate-pulse'
                      : cooker5bQty > 0 
                        ? 'bg-white border-2 border-cyan-500 shadow-sm' 
                        : 'bg-white/70 border-slate-200 opacity-90'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <img 
                        src="https://www.moonlightluxuryhometech.shop/images/alternative_5burner/cooktop_showroom_active.jpg" 
                        alt="Executive 5-Burner Hybrid Cooktop" 
                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border border-slate-200 bg-slate-100 flex-shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-cyan-100 text-cyan-900 px-2 py-0.5 rounded border border-cyan-200 flex items-center gap-1">
                            <Zap className="w-3 h-3 text-cyan-600" />
                            <span>Dual-Fuel Gas + Electric</span>
                          </span>
                          <span className="text-xs text-slate-400 line-through">₦340,000</span>
                          <span className="text-xs font-black text-[#0a192f]">{formatNaira(COOKER_5B_PRICE)}</span>
                          {recentlyAddedId === 'cooker-5burner' && (
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300 animate-pulse">
                              ✨ Added to Your Form!
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-sm sm:text-base font-bold text-[#0a192f] leading-snug">
                            Executive 5-Burner Built-In Gas + Electric Hybrid Cooktop (90×51cm)
                          </h4>
                          <button
                            type="button"
                            onClick={() => {
                              const prod = ALTERNATIVE_PRODUCTS.find(p => p.id === 'cooker-5burner');
                              if (prod && onViewSuggestedProduct) onViewSuggestedProduct(prod);
                            }}
                            className="text-[11px] font-bold text-blue-700 hover:text-blue-900 underline inline-flex items-center gap-1 cursor-pointer"
                          >
                            <FileText className="w-3 h-3" />
                            <span>View Specs &amp; Blueprint</span>
                          </button>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                          4 High-power gas burners + central 2000W instant electric radiant ceramic plate. Never get stranded even when gas cylinder runs out unexpectedly.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t border-slate-200 sm:border-0">
                      <div className="text-left sm:text-right">
                        <span className="text-[10px] uppercase text-slate-500 block">Subtotal</span>
                        <span className="text-sm font-bold font-mono text-cyan-700">
                          {cooker5bQty > 0 ? formatNaira(cooker5bQty * COOKER_5B_PRICE) : '₦0'}
                        </span>
                      </div>

                      {cooker5bQty === 0 ? (
                        <button
                          type="button"
                          onClick={() => setCooker5bQty(1)}
                          className="px-3.5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-black rounded-lg transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Order</span>
                        </button>
                      ) : (
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
                      )}
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
                    <span className="text-slate-500 block text-[11px] uppercase">Multi-Product Bundle Savings</span>
                    {multiItemDiscount > 0 ? (
                      <span className="font-bold text-blue-700 text-sm flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" /> -{formatNaira(multiItemDiscount)}
                      </span>
                    ) : (
                      <span className="text-slate-400 text-xs">Order 2+ items for ₦5k bundle discount</span>
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
            <form 
              action={config.formspreeEndpoint || FORMSPREE_ENDPOINT} 
              method="POST" 
              onSubmit={handleSubmit} 
              className="space-y-5"
            >
              
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
                      <span className="text-base sm:text-lg tracking-wide">CONFIRM ORDER &amp; DISPATCH (PAY ON DELIVERY)</span>
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

              {/* Row of Conversion Trust Badges directly below the Order Form */}
              <div className="mt-8 pt-6 border-t border-slate-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  
                  {/* Badge 1: Payment Secured */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100/80 border border-blue-200 flex items-center justify-center text-blue-700 shrink-0">
                      <Lock className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-black text-[#0a192f] tracking-tight">Payment Secured</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      </div>
                      <span className="text-[11px] text-slate-500 block leading-tight mt-0.5">
                        256-Bit SSL &bull; Pay On Delivery Available
                      </span>
                    </div>
                  </div>

                  {/* Badge 2: Verified Vendor */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100/80 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
                      <BadgeCheck className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-black text-[#0a192f] tracking-tight">Verified Vendor</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      </div>
                      <span className="text-[11px] text-slate-500 block leading-tight mt-0.5">
                        Moonlight Luxury Home Tech Official
                      </span>
                    </div>
                  </div>

                  {/* Badge 3: Inspect Before Paying */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-100/80 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
                      <PackageCheck className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-black text-[#0a192f] tracking-tight">Inspect On Arrival</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      </div>
                      <span className="text-[11px] text-slate-500 block leading-tight mt-0.5">
                        Inspect items before payment
                      </span>
                    </div>
                  </div>

                  {/* Badge 4: Guaranteed Genuine Steel */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-100/80 border border-purple-200 flex items-center justify-center text-purple-700 shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-black text-[#0a192f] tracking-tight">SUS304 Certified</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                      </div>
                      <span className="text-[11px] text-slate-500 block leading-tight mt-0.5">
                        Original Honeycomb Nano Steel
                      </span>
                    </div>
                  </div>

                </div>
              </div>

            </form>
          </div>
        )}

      </div>
    </section>
  );
};
