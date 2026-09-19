export interface ProductFeature {
  id: string;
  title: string;
  description: string;
  iconName: string;
  badge?: string;
  highlight?: boolean;
}

export interface ProductSpec {
  feature: string;
  detail: string;
  iconName: string;
}

export interface CustomerReview {
  id: string;
  name: string;
  location: string;
  rating: number;
  review: string;
  date: string;
  verified: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  subtitle: string;
  tag: string;
  alt: string;
  productId?: 'sink' | 'cooker-2burner' | 'cooker-5burner' | string;
  productName?: string;
  price?: number;
  dimensions?: string;
  badge?: string;
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface OrderData {
  fullName: string;
  phone: string;
  whatsapp?: string;
  address: string;
  city?: string;
  state: string;
  email: string;
  quantity: number;
  items?: OrderItem[];
  multiItemDiscount?: number;
  deliveryMethod?: 'park_pickup' | 'doorstep';
  pickupMotorPark?: string;
  deliveryFee?: number;
  estimatedDeliveryDays?: string;
  notes?: string;
  includedAlternativeCooker?: 'none' | 'cooker-2burner' | 'cooker-5burner' | 'both';
  alternativeCookerName?: string;
  alternativeCookerPrice?: number;
}

export interface SiteConfig {
  productName: string;
  normalPrice: number;
  promoPrice: number;
  currency: string;
  countdownEndDate: string; // ISO format or date string
  whatsappNumber: string; // international format e.g. 2348012345678
  phoneNumber: string;
  deliveryInformation: string;
  paymentInformation: string;
  returnPolicy: string;
  warrantyInformation: string;
  trustStatements: {
    delivery: string;
    packaging: string;
    support: string;
  };
  productImages: GalleryImage[];
  features: ProductFeature[];
  specifications: ProductSpec[];
  reviews: CustomerReview[];
  faqs: FaqItem[];
}
