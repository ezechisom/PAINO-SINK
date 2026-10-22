import { SiteConfig } from './types';

// 14-Day Promotional Countdown Timer with localStorage persistence
const getInitialPromoEndDate = (): string => {
  const STORAGE_KEY = 'moonlight_promo_14d_timer_end';
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
  target.setDate(target.getDate() + 14);
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
  productName: "Smart Paino Sink",
  normalPrice: 160000,
  promoPrice: 135000,
  currency: "₦",
  countdownEndDate: getInitialPromoEndDate(),
  whatsappNumber: "2349136827730", // Store WhatsApp number (09136827730)
  phoneNumber: "09136827730",
  formspreeEndpoint: FORMSPREE_ENDPOINT,
  
  deliveryInformation: "Nationwide delivery across Nigeria. Lagos orders arrive in 1–2 business days. For other states, delivery takes 3–5 business days: standard orders are picked up at your city's major commercial motor park terminal, while direct doorstep delivery is available for an extra fee of ₦5,000.",
  paymentInformation: "Payment on Delivery available in selected major cities (Lagos, Abuja, PH). Bank transfer and secure online payment available nationwide. Inspect your sink before payment!",
  returnPolicy: "7-day inspection and exchange period upon delivery. Items must remain unused in original protective packaging.",
  warrantyInformation: "1-Year Manufacturer Warranty covering the digital LED turbine display, piano keys valve core, pull-out sprayer, and stainless steel basin.",

  trustStatements: {
    delivery: "Nationwide Delivery (1-5 Days)",
    packaging: "Heavy-Duty Reinforced Packaging",
    support: "100% Genuine Quality Guarantee"
  },

  productImages: [
    {
      id: "hero-sink",
      url: "/images/smart_piano_sink_1789548024514.jpg",
      title: "Smart Multifunctional Paino Sink",
      subtitle: "75×45cm SUS304 Nano Stainless Steel Workstation with Digital Display & Waterfall",
      tag: "main",
      alt: "Smart Multifunctional Paino Sink workstation with cutting board and accessories"
    },
    {
      id: "console-details",
      url: "/images/piano_console_details_1789548059707.jpg",
      title: "Tactile Piano Keys & LED Temperature Display",
      subtitle: "Hydro-powered digital display shows water temperature and running time without batteries",
      tag: "console",
      alt: "Piano key buttons, digital temperature display and waterfall spout"
    },
    {
      id: "workstation-kit",
      url: "/images/workstation_accessories_1789548079842.jpg",
      title: "Dual-Tier Workstation Accessories",
      subtitle: "Solid wood cutting board, triangular colander, and nested prep basin slide on built-in ledges",
      tag: "accessories",
      alt: "Cutting board, colander, and prep basin nested inside sink"
    },
    {
      id: "kitchen-lifestyle",
      url: "/images/luxury_kitchen_lifestyle_1789548098794.jpg",
      title: "Gunmetal Nano Finish in Modern Kitchen",
      subtitle: "Premium honeycomb embossed surface resists oil, scratches, and water spots",
      tag: "lifestyle",
      alt: "Modern kitchen featuring installed gunmetal smart paino sink"
    },
    {
      id: "package-kit",
      url: "/images/complete_package_kit_1789548119458.jpg",
      title: "Complete Unboxed Package Kit",
      subtitle: "Everything included: faucet, cutting board, baskets, cup washer, and plumbing fittings",
      tag: "unboxing",
      alt: "Complete 9-piece kit laid out including drain pipes and valves"
    }
  ],

  features: [
    {
      id: "piano-keys",
      title: "Tactile Piano Water Keys",
      description: "Effortlessly switch between flying rain waterfall, pull-out sprayer, glass rinser, and drinking tap with satisfying mechanical buttons.",
      iconName: "Sliders",
      badge: "Signature Feature",
      highlight: true
    },
    {
      id: "hydro-display",
      title: "Digital LED Temp Display (°C)",
      description: "Self-powered internal hydroelectric turbine lights up the real-time water temperature in °C and running timer with zero batteries or wiring.",
      iconName: "Thermometer",
      badge: "Self-Powered",
      highlight: true
    },
    {
      id: "waterfall-spout",
      title: "Flying Rain Waterfall Spout",
      description: "Wide gentle curtain of water makes rinsing delicate fruits, leafy vegetables, and large cutting boards fast with zero counter splashing.",
      iconName: "Waves",
      badge: "Splash-Free",
      highlight: true
    },
    {
      id: "cup-washer",
      title: "High-Pressure Glass Rinser",
      description: "Inverted high-pressure multi-angle spray jets blast glasses, baby bottles, and mugs spotless in 2 seconds with a simple downward press.",
      iconName: "Maximize2"
    },
    {
      id: "nano-steel",
      title: "SUS304 Nano Stainless Steel",
      description: "Heavy-duty 3mm thick SUS304 steel with honeycomb bionic embossed finish that resists knives, scratches, oil stains, and rust.",
      iconName: "ShieldCheck"
    },
    {
      id: "double-track",
      title: "Double-Track Multi-Tier Ledge",
      description: "Built-in stepped tracks allow solid wood cutting board and stainless colander baskets to slide smoothly across the basin.",
      iconName: "Sparkles"
    }
  ],

  specifications: [
    {
      feature: "Workstation Sink Type",
      detail: "Multifunctional Nano SUS304 Stainless Steel Workstation Sink with Piano Water Keys",
      iconName: "Square"
    },
    {
      feature: "Outer Basin Dimensions",
      detail: "750 × 450 × 220 mm (75 × 45 × 22 cm deep)",
      iconName: "Ruler"
    },
    {
      feature: "Counter Cutout Dimensions",
      detail: "700 × 400 mm (compatible with topmount, flushmount, and undermount installs)",
      iconName: "Box"
    },
    {
      feature: "Basin Material & Finish",
      detail: "3mm Heavy-Duty SUS304 Food-Grade Stainless Steel with Honeycomb Nano Bionic Coating",
      iconName: "Shield"
    },
    {
      feature: "Digital Display & LED",
      detail: "Hydroelectric internal turbine (100% self-powered by water flow, zero batteries or AC wiring)",
      iconName: "Cpu"
    },
    {
      feature: "Water Dispensing Modes",
      detail: "Tactile Piano Keys: Flying Rain Waterfall, 3-Function Pull-Out Spray, Cup Rinser, Filtered Water Tap",
      iconName: "Droplets"
    },
    {
      feature: "Pull-Out Hose Reach",
      detail: "Up to 60cm flexible braided pull-out hose with 360° swivel sprayer head",
      iconName: "RotateCw"
    },
    {
      feature: "Included Accessories",
      detail: "Solid Ebony Wood Cutting Board, Triangular Colander, Prep Basin, High-Pressure Glass Rinser, Full Siphon Drain Kit",
      iconName: "PackageCheck"
    },
    {
      feature: "Drainage System",
      detail: "Right-offset fast-drain vortex outlet with rotary control knob and anti-odor siphon pipe",
      iconName: "Sliders"
    },
    {
      feature: "Installation Style",
      detail: "Universal drop-in topmount, flushmount, or undermount into granite, marble, or tile slabs",
      iconName: "Hammer"
    }
  ],

  reviews: [
    {
      id: "rev-1",
      name: "Mrs. Chioma Okonkwo",
      location: "Magodo Phase 2, Lagos",
      rating: 5,
      review: "The waterfall faucet and piano keys have completely transformed my kitchen! The digital temperature display works smoothly without any batteries, and the sliding wooden cutting board saves so much counter space when prepping meals. Cleaning oily soup pots is effortless with the nano honeycomb finish. Absolutely worth every single Naira!",
      date: "Verified Homeowner &bull; Lagos",
      verified: true
    }
  ],

  faqs: [
    {
      id: "faq-1",
      question: "1. What is the Smart Paino Sink?",
      answer: "It is an all-in-one luxury kitchen workstation featuring mechanical piano-key controls, a self-powered hydroelectric LED temperature display, flying rain waterfall rinser, 3-mode pull-out spray faucet, high-pressure glass rinser, and nested double-track accessories."
    },
    {
      id: "faq-2",
      question: "2. Does the digital LED temperature display require electrical wiring or batteries?",
      answer: "No electrical wiring or batteries are needed! The display is powered by an internal micro-hydroelectric water turbine. Whenever water runs through the faucet, the turbine instantly powers the LED screen showing the exact water temperature in °C and running time."
    },
    {
      id: "faq-3",
      question: "3. What are the product dimensions and countertop cutout size?",
      answer: "Outer Basin Dimensions: 750 mm × 450 mm × 220 mm (75 × 45 × 22 cm). Countertop Cutout Dimensions: 700 mm × 400 mm. It fits standard Nigerian kitchen countertop openings and can be installed as topmount, undermount, or flushmount."
    },
    {
      id: "faq-4",
      question: "4. What accessories come in the complete unboxed package?",
      answer: "The package includes the SUS304 Nano Stainless Steel Basin, Piano Key Digital Console & Pull-Out Faucet, Solid Wood Chopping Board, Triangular Stainless Colander Basket, Nested Prep Basin, High-Pressure Glass Rinser, Soap Dispenser, Filtered Water Drinking Tap, and complete Anti-Odor Siphon Drainage Fittings."
    },
    {
      id: "faq-5",
      question: "5. Will the sink scratch or stain easily from Nigerian cooking pots?",
      answer: "No! The sink is engineered with heavy-duty 3mm SUS304 stainless steel coated in a micro-embossed honeycomb nano bionic finish. It is resistant to knife scratches, prevents oil and grease adhesion, and resists heavy hard-water spots."
    },
    {
      id: "faq-6",
      question: "6. How does the high-pressure cup/glass rinser work?",
      answer: "Simply invert any glass, mug, or baby bottle over the rinser nozzle and press down gently. Multi-directional high-pressure water jets blast the inside clean in 2 seconds, then automatically shut off when released."
    },
    {
      id: "faq-7",
      question: "7. Can I also order the matching 2-Flip-Up Double Gas Burner?",
      answer: "Yes! The 2-Flip-Up Double Gas Burner With Timer is available on this website as a matching companion appliance for ₦170,000. When you order both together, you receive an extra ₦5,000 multi-product bundle discount."
    },
    {
      id: "faq-8",
      question: "8. How does delivery work across Nigeria?",
      answer: "We deliver nationwide across all 36 states and the FCT. For Lagos State, doorstep delivery is free and takes 1–2 business days. For other states, delivery takes 3–5 business days to your city's major commercial motor park terminal, or direct doorstep delivery is available for ₦5,000 extra."
    },
    {
      id: "faq-9",
      question: "9. What payment options are available?",
      answer: "We offer Payment on Delivery (POD) in eligible locations (Lagos, Abuja, Port Harcourt). Direct bank transfer and secure online checkout are also supported nationwide. Inspect your sink before payment!"
    },
    {
      id: "faq-10",
      question: "10. What warranty is provided?",
      answer: "The Smart Paino Sink comes with a 1-Year Manufacturer Warranty covering the digital turbine display, valve cartridges, pull-out sprayer, and stainless steel basin, backed by our 7-day inspection guarantee upon delivery."
    }
  ]
};

// Helper for formatting Nigerian Naira currency
export const formatNaira = (amount: number): string => {
  return "₦" + amount.toLocaleString('en-NG');
};
