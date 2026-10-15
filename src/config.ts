import { SiteConfig } from './types';

// 7-Day Promotional Countdown Timer with localStorage persistence
const getInitialPromoEndDate = (): string => {
  const STORAGE_KEY = 'moonlight_promo_7d_timer_end';
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
  target.setDate(target.getDate() + 7);
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
export const FORMSPREE_ENDPOINT = "https://formspree.io/f/xppwqdyj";

export const CONFIG: SiteConfig = {
  productName: "2-Flip-Up Double Gas Burner With Timer",
  normalPrice: 200000,
  promoPrice: 170000,
  currency: "₦",
  countdownEndDate: getInitialPromoEndDate(),
  whatsappNumber: "2349136827730", // Store WhatsApp number (09136827730)
  phoneNumber: "09136827730",
  formspreeEndpoint: FORMSPREE_ENDPOINT,
  
  deliveryInformation: "Nationwide delivery across Nigeria. Lagos orders arrive in 1–2 business days. For other states, delivery takes 3–5 business days: standard orders are picked up at your city's major commercial motor park terminal, while direct doorstep delivery is available for an extra fee of ₦5,000.",
  paymentInformation: "Payment on Delivery available in selected major cities (Lagos, Abuja, PH). Bank transfer and secure online payment available nationwide.",
  returnPolicy: "7-day inspection and exchange period upon delivery. Items must remain unused in original protective packaging.",
  warrantyInformation: "1-Year Manufacturer Warranty covering burner hinges, gas valves, ignition module, and tempered crystal glass.",

  trustStatements: {
    delivery: "Nationwide Delivery (1-5 Days)",
    packaging: "Heavy-Duty Reinforced Packaging",
    support: "100% Genuine Quality Guarantee"
  },

  productImages: [
    {
      id: "hero-cooker",
      url: "https://www.moonlightluxuryhometech.shop/images/cooker_active_blue_flames.jpg",
      title: "2-Flip-Up Double Gas Burner With Timer",
      subtitle: "90° Flip-Up Burners for Instant 1-Wipe Cleaning & Built-In Safety Timer",
      tag: "main",
      alt: "2-Flip-Up Double Gas Burner with active pure blue flames"
    },
    {
      id: "hinge-details",
      url: "https://www.moonlightluxuryhometech.shop/images/burner_flip_hinge.jpg",
      title: "90° Flip-Up Hinged Burner Heads",
      subtitle: "Effortlessly lift burner heads upright with one finger to wipe grease spills underneath in 5 seconds",
      tag: "hinge",
      alt: "Burner head lifted 90 degrees on its hinge showing effortless cleaning access"
    },
    {
      id: "pure-blue-flame",
      url: "https://www.moonlightluxuryhometech.shop/images/pure_blue_flame.jpg",
      title: "Pure Blue Flame & 0–180 Min Auto-Off Safety Timer",
      subtitle: "8-nozzle brass crowns for high heat with zero pot soot, plus integrated mechanical timer that cuts gas automatically",
      tag: "timer",
      alt: "Pure blue flame close up and burner detail with timer dial"
    },
    {
      id: "glass-wok-stands",
      url: "https://www.moonlightluxuryhometech.shop/images/cooker_blue_flames.jpg",
      title: "Explosion-Proof Tempered Crystal Glass & Windproof Wok Stands",
      subtitle: "Heavy-duty cast iron supports heavy Nigerian cooking pots firmly with zero wobbling",
      tag: "details",
      alt: "2-Flip-Up Gas Burner glass panel and cast iron pot supports"
    }
  ],

  features: [
    {
      id: "flip-up-burners",
      title: "90° Flip-Up Burner Heads",
      description: "Both burner heads lift upright with 1 finger so you can wipe spills underneath in 5 seconds without dismantling anything.",
      iconName: "Sliders",
      badge: "Signature Feature",
      highlight: true
    },
    {
      id: "safety-timer",
      title: "Built-In 0–180m Safety Timer",
      description: "Mechanical auto-off timer automatically shuts off the gas supply when cooking time expires. Zero burnt pots or wasted gas!",
      iconName: "Gauge",
      badge: "Auto-Off Safety",
      highlight: true
    },
    {
      id: "pure-blue-flame",
      title: "Pure Blue High-Heat Flame",
      description: "8-nozzle precision brass burner crowns with oxygen damper air balance produce clean, concentrated heat with zero black soot.",
      iconName: "Waves",
      badge: "Zero Pot Soot",
      highlight: true
    },
    {
      id: "cast-iron-stands",
      title: "Windproof Cast Iron Stands",
      description: "Heavy-duty cast iron wok supports provide non-slip stability for heavy Nigerian cooking pots and family-sized pans.",
      iconName: "Maximize2"
    },
    {
      id: "tempered-glass",
      title: "Explosion-Proof Crystal Glass",
      description: "Thermal-shock resistant 8mm tempered crystal glass panel that resists scratches, oil build-up, and wipes clean instantly.",
      iconName: "ShieldCheck"
    },
    {
      id: "pulse-ignition",
      title: "Instant Pulse Battery Ignition",
      description: "Smooth rotary dials with automatic battery-powered pulse ignition for immediate, effortless flame startup every time.",
      iconName: "Sparkles"
    }
  ],

  specifications: [
    {
      feature: "Cooktop Type",
      detail: "Dual 90° Hinged Flip-Up Gas Burners with Integrated Mechanical Timer",
      iconName: "Square"
    },
    {
      feature: "Outer Dimensions",
      detail: "750 × 450 mm (75 × 45 cm)",
      iconName: "Ruler"
    },
    {
      feature: "Counter Cutout Dimensions",
      detail: "650 × 350 mm (fits standard Nigerian kitchen countertop openings)",
      iconName: "Box"
    },
    {
      feature: "Surface Material",
      detail: "Explosion-Proof Tempered Crystal Glass with bevelled edges",
      iconName: "Shield"
    },
    {
      feature: "Burner Crown Material",
      detail: "High-grade 8-nozzle brass burner crowns with oxygen damper air mixture",
      iconName: "Palette"
    },
    {
      feature: "Safety Timer Range",
      detail: "0 to 180 Minutes mechanical countdown with automatic gas cut-off",
      iconName: "Cpu"
    },
    {
      feature: "Pan / Wok Supports",
      detail: "Heavy-duty windproof non-slip cast iron pot supports",
      iconName: "PackageCheck"
    },
    {
      feature: "Gas Compatibility",
      detail: "LPG (Liquefied Petroleum Gas / standard domestic gas cylinder)",
      iconName: "Droplets"
    },
    {
      feature: "Ignition Method",
      detail: "Automatic pulse battery ignition (D-cell battery compartment underneath)",
      iconName: "RotateCw"
    },
    {
      feature: "Installation Style",
      detail: "Built-in countertop drop-in or tabletop rubber-footed placement",
      iconName: "Hammer"
    }
  ],

  reviews: [
    {
      id: "rev-1",
      name: "Mrs. Chioma Okonkwo",
      location: "Magodo Phase 2, Lagos",
      rating: 5,
      review: "The 90-degree flip-up burners have completely transformed my kitchen routine! Previously, scrubbing burned oil around cooker rings was a nightmare. Now I just lift the burner heads and wipe the glass clean in 5 seconds. The auto-off timer is a lifesaver when boiling beans or soups. Absolutely worth every Naira!",
      date: "Verified Homeowner &bull; Lagos",
      verified: true
    }
  ],

  faqs: [
    {
      id: "faq-1",
      question: "1. What is the 2-Flip-Up Double Gas Burner With Timer?",
      answer: "It is a premium luxury gas cooktop featuring revolutionary 90-degree folding burner heads that lift upright for instant 5-second 1-wipe cleaning, combined with a built-in 0–180 minute mechanical auto-off safety timer and pure blue high-heat brass burners."
    },
    {
      id: "faq-2",
      question: "2. How does the 90° flip-up cleaning mechanism work?",
      answer: "Both burner heads are mounted on heavy-duty engineered hinges. When food spills or oil splatters occur, you simply lift the burner upright with one finger and wipe the smooth tempered glass underneath with a cloth. You never need to unscrew or dismantle burner parts."
    },
    {
      id: "faq-3",
      question: "3. How does the built-in 0–180 minute safety timer protect my kitchen?",
      answer: "The mechanical timer operates like an oven timer. When you set it (for example, 45 minutes to boil meat or 90 minutes for beans), it automatically shuts off the gas supply and extinguishes the flame as soon as time is up, preventing burnt food, smoke damage, or wasted cooking gas."
    },
    {
      id: "faq-4",
      question: "4. Will this cooker turn the bottom of my cooking pots black?",
      answer: "No! It features 8-nozzle brass burner crowns with adjustable oxygen damper valves that ensure a 100% pure blue high-efficiency flame. Pure blue flame means complete gas combustion with zero smoke and zero black soot on your expensive cookware."
    },
    {
      id: "faq-5",
      question: "5. What are the product dimensions and countertop cutout size?",
      answer: "Outer Surface Dimensions: 750 mm × 450 mm (75 × 45 cm). Countertop Cutout Dimensions: 650 mm × 350 mm. It easily fits standard countertop cutouts in granite, quartz, or tiles."
    },
    {
      id: "faq-6",
      question: "6. Can it also be used on a tabletop without cutting the counter?",
      answer: "Yes! The cooktop includes heavy-duty non-slip rubber feet on the bottom casing, allowing it to sit safely and securely on top of any kitchen counter slab as a tabletop stove."
    },
    {
      id: "faq-7",
      question: "7. What gas does it use and how is it ignited?",
      answer: "It runs on standard LPG cylinder gas (the regular gas cylinders used across Nigerian homes). It features instant pulse battery ignition powered by a standard battery, ignited effortlessly when pushing and turning the control knob."
    },
    {
      id: "faq-8",
      question: "8. Can I also order the matching Smart Kitchen Piano Sink?",
      answer: "Yes! The Smart Kitchen Piano Sink is available on this website as a matching companion appliance for ₦135,000. When you order both together, you receive an extra ₦5,000 multi-product bundle discount."
    },
    {
      id: "faq-9",
      question: "9. How does delivery work across Nigeria?",
      answer: "We deliver nationwide across all 36 states and the FCT. For Lagos State, doorstep delivery is free and takes 1–2 business days. For other states, delivery takes 3–5 business days to your city's major commercial motor park terminal, or direct doorstep delivery is available for ₦5,000 extra."
    },
    {
      id: "faq-10",
      question: "10. What payment options are available?",
      answer: "We offer Payment on Delivery (POD) in eligible locations (Lagos, Abuja, Port Harcourt). Direct bank transfer and secure online checkout are also supported nationwide."
    },
    {
      id: "faq-11",
      question: "11. What warranty is provided?",
      answer: "The cooker comes with a 1-Year Manufacturer Warranty covering the burner hinges, gas valves, and tempered crystal glass, backed by a 7-day inspection guarantee upon delivery."
    }
  ]
};

// Helper for formatting Nigerian Naira currency
export const formatNaira = (amount: number): string => {
  return "₦" + amount.toLocaleString('en-NG');
};
