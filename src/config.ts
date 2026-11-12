import { SiteConfig } from './types';

// 30-Day Promotional Countdown Timer with localStorage persistence
const getInitialPromoEndDate = (): string => {
  const STORAGE_KEY = 'moonlight_promo_30d_timer_end';
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const savedDate = new Date(saved);
        if (!isNaN(savedDate.getTime()) && savedDate.getTime() > Date.now()) {
          return saved;
        }
      }
    }
  } catch (e) {
    // Ignore storage errors
  }

  const target = new Date();
  target.setDate(target.getDate() + 30);
  target.setHours(23, 59, 59, 999);
  const targetIso = target.toISOString();
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(STORAGE_KEY, targetIso);
    }
  } catch (e) {
    // Ignore storage errors
  }
  return targetIso;
};

// Central Formspree Form Submission Endpoint
export const FORMSPREE_ENDPOINT = "https://formspree.io/f/xzeeegpw";

export const CONFIG: SiteConfig = {
  productName: "2-Flip-Up Double Gas Burner With Timer",
  normalPrice: 200000,
  promoPrice: 160000,
  currency: "₦",
  countdownEndDate: getInitialPromoEndDate(),
  whatsappNumber: "2349136827730", // Store WhatsApp number (09136827730)
  phoneNumber: "09136827730",
  formspreeEndpoint: FORMSPREE_ENDPOINT,
  
  deliveryInformation: "Nationwide delivery across Nigeria. Lagos orders arrive in 1–2 business days. For other states, delivery takes 3–5 business days: standard orders are picked up at your city's major commercial motor park terminal, while direct doorstep delivery is available for an extra fee of ₦5,000.",
  paymentInformation: "Payment on Delivery available in selected major cities (Lagos, Abuja, PH). Bank transfer and secure online payment available nationwide. Inspect your cooker before payment!",
  returnPolicy: "7-day inspection and exchange period upon delivery. Items must remain unused in original protective packaging.",
  warrantyInformation: "1-Year Manufacturer Warranty covering the 90° flip-up burner hinges, mechanical auto-off timer, brass burner crowns, and 8mm explosion-proof tempered crystal glass.",

  trustStatements: {
    delivery: "Nationwide Delivery (1-5 Days)",
    packaging: "Heavy-Duty Reinforced Packaging",
    support: "100% Genuine Quality Guarantee"
  },

  productImages: [
    {
      id: "cooker-active",
      url: "https://www.moonlightluxuryhometech.shop/images/cooker_active_blue_flames.jpg",
      title: "2-Flip-Up Double Gas Burner With Timer",
      subtitle: "Dual high-heat pure blue flames with 8-nozzle brass burner crowns and built-in auto-off safety timer",
      tag: "main",
      alt: "2-Flip-Up Double Gas Burner With Timer firing pure blue flames"
    },
    {
      id: "cooker-hinge",
      url: "https://www.moonlightluxuryhometech.shop/images/burner_flip_hinge.jpg",
      title: "90° Flip-Up Hinged Burner Mechanism",
      subtitle: "Lift both burner heads upright with one finger to wipe spills and grease underneath in 5 seconds",
      tag: "hinge",
      alt: "Burner head flipped up 90 degrees showing effortless cleaning access underneath"
    },
    {
      id: "cooker-flame",
      url: "https://www.moonlightluxuryhometech.shop/images/pure_blue_flame.jpg",
      title: "Pure Blue Zero-Soot Flame & Auto-Off Timer",
      subtitle: "Oxygen-balanced combustion keeps pots spotless while the 0–180m mechanical timer shuts off gas automatically",
      tag: "timer",
      alt: "Pure blue flame close-up showing zero soot combustion"
    },
    {
      id: "cooker-overview",
      url: "https://www.moonlightluxuryhometech.shop/images/cooker_blue_flames.jpg",
      title: "8mm Tempered Crystal Glass & Cast Iron Stands",
      subtitle: "Explosion-proof crystal glass panel with heavy-duty windproof cast iron pot supports",
      tag: "overview",
      alt: "2-Flip-Up Double Gas Burner glass surface and windproof cast iron stands"
    }
  ],

  features: [
    {
      id: "flip-up-hinge",
      title: "90° Flip-Up Burner Heads",
      description: "Lift both burner heads upright with one finger to wipe burnt food and oil spills underneath in 5 seconds without unscrewing or dismantling anything.",
      iconName: "Sliders",
      badge: "Signature Feature",
      highlight: true
    },
    {
      id: "safety-timer",
      title: "Built-In 0–180m Safety Timer",
      description: "Mechanical auto-off timer automatically shuts off the gas supply when your cooking countdown finishes—preventing burnt meals and forgotten stoves.",
      iconName: "Clock",
      badge: "Auto-Off Safety",
      highlight: true
    },
    {
      id: "pure-blue-flame",
      title: "Pure Blue Zero-Soot Flame",
      description: "8-nozzle solid brass burner crowns with precision oxygen damper air balance deliver fast high heat with zero black soot on your cooking pots.",
      iconName: "Flame",
      badge: "Zero Pot Soot",
      highlight: true
    },
    {
      id: "crystal-glass",
      title: "8mm Tempered Crystal Glass",
      description: "Explosion-proof, thermal-shock resistant 8mm crystal glass panel wipes sparkling clean in one sweep and resists scratches and staining.",
      iconName: "ShieldCheck"
    },
    {
      id: "cast-iron-stands",
      title: "Windproof Cast Iron Stands",
      description: "Heavy-duty non-slip cast iron pot supports hold large Nigerian family cooking pots and heavy woks rock-steady without wobbling.",
      iconName: "Layers"
    },
    {
      id: "dual-install",
      title: "Dual Built-In or Tabletop Fit",
      description: "Install recessed into your granite/marble countertop cutout (650 × 350 mm) or place directly on top of your counter as a luxury tabletop stove.",
      iconName: "Sparkles"
    }
  ],

  specifications: [
    {
      feature: "Cooktop Type",
      detail: "Dual-Burner 90° Flip-Up Hinged Luxury Gas Cooker with Integrated Safety Timer",
      iconName: "Flame"
    },
    {
      feature: "Outer Frame Dimensions",
      detail: "750 × 450 mm (75 × 45 cm) — matches standard luxury kitchen workstations",
      iconName: "Ruler"
    },
    {
      feature: "Counter Cutout Dimensions",
      detail: "650 × 350 mm (supports both Built-In recessed cutout & Countertop tabletop placement)",
      iconName: "Box"
    },
    {
      feature: "Burner Cleaning Mechanism",
      detail: "90° One-Finger Flip-Up Stainless Steel Hinged Burner Heads for 5-second wipe cleaning",
      iconName: "Sliders"
    },
    {
      feature: "Safety Timer Control",
      detail: "Independent 0–180 Minute Mechanical Auto-Off Timer (automatically cuts gas supply at zero)",
      iconName: "Clock"
    },
    {
      feature: "Flame & Burner Crowns",
      detail: "8-Nozzle Brass Burner Crowns producing Pure Blue High-Heat Flame (Zero Pot Soot)",
      iconName: "Zap"
    },
    {
      feature: "Top Surface Panel",
      detail: "8mm Heavy-Duty Explosion-Proof Tempered Crystal Glass (thermal-shock & scratch resistant)",
      iconName: "Shield"
    },
    {
      feature: "Pot & Wok Supports",
      detail: "Windproof Heavy-Duty Cast Iron Stands designed for large Nigerian cooking pots",
      iconName: "Layers"
    },
    {
      feature: "Ignition & Air Control",
      detail: "Push-and-turn automatic piezo pulse ignition with underside oxygen damper adjustment",
      iconName: "Cpu"
    },
    {
      feature: "Gas Compatibility",
      detail: "Standard Nigerian LPG Cooking Gas Cylinder (universal hose barb connection included)",
      iconName: "Hammer"
    }
  ],

  reviews: [
    {
      id: "rev-1",
      name: "Mrs. Chioma Okonkwo",
      location: "Magodo Phase 2, Lagos",
      rating: 5,
      review: "The 90-degree flip-up burners are a complete lifesaver! Whenever stew boils over, I just lift the burner head up with one finger, wipe underneath in 5 seconds, and flip it back down. The pure blue flame cooks super fast with zero black soot on my pots, and the built-in timer automatically turns off the gas when I'm busy. Worth every single Naira!",
      date: "Verified Homeowner &bull; Lagos",
      verified: true
    }
  ],

  faqs: [
    {
      id: "faq-1",
      question: "1. What makes the 2-Flip-Up Double Gas Burner With Timer special?",
      answer: "Unlike fixed gas cookers where spilled soup gets trapped around screws, both burner heads hinge upward 90 degrees with one finger so you can wipe the crystal glass spotless in 5 seconds. It also features a built-in 0–180 minute safety auto-off timer and pure blue zero-soot flames."
    },
    {
      id: "faq-2",
      question: "2. How does the 0–180 minute auto-off safety timer work?",
      answer: "Simply turn the timer dial to your desired cooking duration (from 1 to 180 minutes). Once the countdown reaches zero, the mechanical valve automatically shuts off the gas flow to that burner—no electricity required and zero risk of forgotten food burning."
    },
    {
      id: "faq-3",
      question: "3. What are the dimensions and can I use it both built-in and on tabletop?",
      answer: "Outer Dimensions: 750 mm × 450 mm (75 × 45 cm). Countertop Cutout Dimensions: 650 mm × 350 mm. Yes! It includes non-slip rubber base feet so you can either drop it into a granite/marble cutout or place it directly on top of your kitchen slab."
    },
    {
      id: "faq-4",
      question: "4. Will it stain my pots with black soot?",
      answer: "No! The cooker uses 8-nozzle brass burner crowns paired with an adjustable oxygen damper valve underneath. This guarantees balanced air-to-gas combustion that burns as a crisp, pure blue flame with zero black smoke or pot soot."
    },
    {
      id: "faq-5",
      question: "5. Is the tempered crystal glass strong enough for heavy Nigerian pots?",
      answer: "Yes. It is built with an 8mm thick explosion-proof tempered crystal glass top supported by a reinforced metal chassis and windproof cast iron stands rated for heavy family-sized pots, pressure cookers, and pounding pots."
    },
    {
      id: "faq-6",
      question: "6. Can the 90° flip-up hinges loosen or leak gas?",
      answer: "No. The heavy-duty stainless steel hinge mechanism uses sealed flexible gas piping engineered specifically for thousands of lift cycles without loosening or leaking."
    },
    {
      id: "faq-7",
      question: "7. Can I also order the matching Smart Paino Sink?",
      answer: "Yes! The Smart Paino Sink Workstation (75×45cm) is available on this website as a matching companion appliance for ₦130,000. When you order both together, you receive an extra ₦5,000 multi-product bundle discount."
    },
    {
      id: "faq-8",
      question: "8. How does delivery work across Nigeria?",
      answer: "We deliver nationwide across all 36 states and the FCT. For Lagos State, doorstep delivery is free and takes 1–2 business days. For other states, delivery takes 3–5 business days to your city's major commercial motor park terminal, or direct doorstep delivery is available for ₦5,000 extra."
    },
    {
      id: "faq-9",
      question: "9. What payment options are available?",
      answer: "We offer Payment on Delivery (POD) in eligible locations (Lagos, Abuja, Port Harcourt). Direct bank transfer and secure online checkout are also supported nationwide. Inspect your cooker before payment!"
    },
    {
      id: "faq-10",
      question: "10. What warranty is provided?",
      answer: "The 2-Flip-Up Double Gas Burner With Timer comes with a 1-Year Manufacturer Warranty covering the 90° hinges, mechanical timer valve, brass burners, and tempered crystal glass panel, backed by our 7-day inspection guarantee."
    }
  ]
};

// Helper for formatting Nigerian Naira currency
export const formatNaira = (amount: number): string => {
  return "₦" + amount.toLocaleString('en-NG');
};
