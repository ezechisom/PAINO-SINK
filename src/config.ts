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
  productName: "Smart Paino Sink",
  normalPrice: 160000,
  promoPrice: 130000,
  currency: "₦",
  countdownEndDate: getInitialPromoEndDate(),
  whatsappNumber: "2349136827730", // Store WhatsApp number (09136827730)
  phoneNumber: "09136827730",
  formspreeEndpoint: FORMSPREE_ENDPOINT,
  
  deliveryInformation: "Nationwide delivery across Nigeria. Abuja (FCT) orders enjoy 24 hrs / Same-Day Delivery. Lagos orders arrive in 1–2 business days. For other states, delivery takes 3–5 business days: standard orders are picked up at your city's major commercial motor park terminal, while direct doorstep delivery is available for an extra fee of ₦5,000.",
  paymentInformation: "Payment on Delivery available in selected major cities (Lagos, Abuja, PH). Bank transfer and secure online payment available nationwide. Inspect your sink workstation before payment!",
  returnPolicy: "7-day inspection and exchange period upon delivery. Items must remain unused in original protective packaging.",
  warrantyInformation: "1-Year Manufacturer Warranty covering the SUS304 stainless steel basin, piano water control valves, pull-out waterfall faucet, and hydroelectric LED display module.",

  trustStatements: {
    delivery: "Nationwide Delivery (1-5 Days)",
    packaging: "Heavy-Duty Reinforced Packaging",
    support: "100% Genuine Quality Guarantee"
  },

  productImages: [
    {
      id: "sink-main",
      url: "/images/smart_piano_sink_1789548024514.jpg",
      title: "Smart Paino Sink Workstation (75 × 45 cm)",
      subtitle: "SUS304 honeycomb nano stainless steel with mechanical piano water keys, flying rain waterfall, and LED temp console",
      tag: "main",
      alt: "Smart Paino Sink with tactile piano water keys and LED temperature display"
    },
    {
      id: "sink-console",
      url: "/images/piano_console_details_1789548059707.jpg",
      title: "Hydroelectric LED Temp Console & Piano Keys",
      subtitle: "Real-time water temperature (°C) and running timer powered 100% by water flow — zero batteries or electrical wiring",
      tag: "console",
      alt: "Close up of tactile piano keys and hydroelectric digital LED temperature display"
    },
    {
      id: "sink-accessories",
      url: "/images/workstation_accessories_1789548079842.jpg",
      title: "Multi-Tier Sliding Workstation & Blueprint",
      subtitle: "Fits standard 750 × 450 mm countertop opening with 220 mm deep basin, sliding wood cutting board, and nested colanders",
      tag: "accessories",
      alt: "Smart Paino Sink multi-tier workstation accessories and standard dimensions"
    },
    {
      id: "sink-lifestyle",
      url: "/images/luxury_kitchen_lifestyle_1789548098794.jpg",
      title: "4 Water Modes in Luxury Kitchen Installation",
      subtitle: "Independent piano keys for 360° pull-out spray faucet, flying rain waterfall, high-pressure cup rinser, and drinking tap",
      tag: "lifestyle",
      alt: "Smart Paino Sink installed in a modern luxury kitchen countertop"
    },
    {
      id: "sink-unboxing",
      url: "/images/complete_package_kit_1789548119458.jpg",
      title: "Complete 9-Piece Unboxing Package Kit",
      subtitle: "Includes piano sink, solid wood cutting board, stainless colander, triangular prep basin, cup washer, angle valves & trap pipes",
      tag: "unboxing",
      alt: "Complete 9-piece Smart Paino Sink package contents and fittings"
    }
  ],

  features: [
    {
      id: "piano-water-keys",
      title: "Tactile Piano Water Keys",
      description: "Independent mechanical piano keys switch cleanly between flying rain waterfall, 3-mode pull-out spray, cup rinser, and filtered drinking tap with a single press.",
      iconName: "Sliders",
      badge: "Signature Feature",
      highlight: true
    },
    {
      id: "hydroelectric-led",
      title: "Battery-Free Hydroelectric LED",
      description: "Built-in water micro-turbine automatically illuminates the real-time water temperature (°C) and duration timer as soon as water flows—zero batteries or electrical wiring.",
      iconName: "Gauge",
      badge: "No Electricity Needed",
      highlight: true
    },
    {
      id: "flying-rain-waterfall",
      title: "Flying Rain Cascade Waterfall",
      description: "Wide, gentle waterfall curtain rinses fruits, vegetables, and large cookware evenly without splashing water across your clothes or countertop.",
      iconName: "Waves",
      badge: "Splash-Free Flow",
      highlight: true
    },
    {
      id: "nano-honeycomb-steel",
      title: "SUS304 Honeycomb Nano Steel",
      description: "3mm thick genuine SUS304 stainless steel with bionic embossed honeycomb texture resists scratches, heavy pot impacts, oil buildup, and rust.",
      iconName: "ShieldCheck"
    },
    {
      id: "high-pressure-cup-washer",
      title: "High-Pressure Glass & Cup Rinser",
      description: "Press any mug, wine glass, blender cup, or baby bottle downward onto the jet nozzle to blast away residue in 2 seconds flat.",
      iconName: "Droplet"
    },
    {
      id: "complete-workstation-kit",
      title: "9-Piece Nested Workstation Kit",
      description: "Multi-tier sliding ledges hold the included solid wood cutting board, stainless colander, and inner wash basin right over the sink to double your counter space.",
      iconName: "Layers"
    }
  ],

  specifications: [
    {
      feature: "Workstation Type",
      detail: "Multifunctional Smart Paino Sink with Tactile Piano Water Keys & Hydroelectric LED Display",
      iconName: "Droplets"
    },
    {
      feature: "Outer Basin Dimensions",
      detail: "750 × 450 × 220 mm (75 × 45 cm) — deep single-bowl luxury workstation",
      iconName: "Ruler"
    },
    {
      feature: "Countertop Cutout Fit",
      detail: "700 × 400 mm to 720 × 420 mm (supports Topmount, Flushmount, and Undermount installation)",
      iconName: "Box"
    },
    {
      feature: "Material & Thickness",
      detail: "3mm Heavy-Duty SUS304 Stainless Steel with Bionic Anti-Scratch Honeycomb Nano Coating",
      iconName: "Shield"
    },
    {
      feature: "Digital Display Power",
      detail: "100% Self-Powered Hydroelectric Water Turbine — Live Temp (°C) & Timer (Zero Batteries / Wiring)",
      iconName: "Cpu"
    },
    {
      feature: "Water Flow Modes",
      detail: "4 Independent Outputs: Flying Rain Waterfall, 360° Pull-Out Spray (3-Mode), Cup Rinser & Drinking Tap",
      iconName: "Sliders"
    },
    {
      feature: "Finish & Hygiene",
      detail: "Gunmetal Grey Nano PVD Lotus-Leaf Oil-Repellent & Anti-Fingerprint Coating",
      iconName: "Palette"
    },
    {
      feature: "Drainage & Odor Trap",
      detail: "Rotary Knob Pop-Up Drain Control (drain water without dipping hands) + Anti-Odor Siphon Trap",
      iconName: "RotateCw"
    },
    {
      feature: "Included Accessories",
      detail: "Solid Wood Cutting Board, Inner Prep Basin, Triangular Colander, Cup Washer, Drinking Tap & Full Pipes",
      iconName: "PackageCheck"
    },
    {
      feature: "Plumbing Compatibility",
      detail: "Universal Nigerian Standard Cold/Hot Plumbing Lines (Hot & Cold Angle Valves + Braided Hoses Included)",
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
      question: "1. Does the digital LED temperature display require NEPA electricity or batteries?",
      answer: "No! The Smart Paino Sink uses an internal hydroelectric micro-turbine powered 100% by water pressure. The moment you press any piano water key, the LED screen automatically lights up to display live water temperature (°C) and running time."
    },
    {
      id: "faq-2",
      question: "2. What comes inside the complete 9-piece workstation package?",
      answer: "Every box includes the 75×45cm SUS304 Honeycomb Nano Sink, Piano Key Waterfall Console, 360° Pull-Out Spray Faucet, High-Pressure Cup Washer, Filtered Drinking Tap, Solid Wood Cutting Board, Stainless Steel Colander, Nested Inner Basin, Rotary Drain Knob, Angle Valves, and complete anti-odor siphon drain pipes."
    },
    {
      id: "faq-3",
      question: "3. Will it fit my existing kitchen countertop and standard Nigerian plumbing?",
      answer: "Yes! Outer dimensions are 750 × 450 mm (220 mm deep) with a standard 700 × 400 mm to 720 × 420 mm cutout. It supports topmount, flushmount, and undermount installation and includes universal braided hoses and angle valves for standard Nigerian plumbing (works with cold-only or hot-and-cold water lines)."
    },
    {
      id: "faq-4",
      question: "4. Does the Gunmetal Grey Nano Honeycomb coating scratch or peel?",
      answer: "No. It is engineered from genuine 3mm thick SUS304 stainless steel with a bionic honeycomb embossed pattern and PVD nano oil-repellent coating. Pots and knives glide over the micro-embossed peaks without leaving harsh scratches or oil stains."
    },
    {
      id: "faq-5",
      question: "5. What if my house only has cold water piping (no water heater)?",
      answer: "It works perfectly with cold water only! Your plumber simply uses a standard T-connector or connects the included valve so all 4 water modes—waterfall, pull-out spray, cup rinser, and drinking tap—work smoothly at full pressure."
    },
    {
      id: "faq-6",
      question: "6. How does the rotary drain knob work?",
      answer: "Instead of dipping your hands into dirty oily dishwater to pull a sink plug, you simply twist the dedicated rotary knob mounted on the sink ledge to open or seal the drain effortlessly."
    },
    {
      id: "faq-7",
      question: "7. Can I also order the matching 2-Flip-Up Double Gas Burner With Timer?",
      answer: "Yes! Our matching 2-Flip-Up Double Gas Burner With Timer (75×45cm) is available on this website as a companion appliance for ₦160,000. When you order both together, you automatically get an extra ₦5,000 multi-product bundle discount!"
    },
    {
      id: "faq-8",
      question: "8. How does delivery work across Nigeria?",
      answer: "We deliver nationwide across all 36 states and the FCT. Abuja (FCT) orders qualify for express 24 hrs / Same-Day Delivery. Lagos doorstep delivery is free and takes 1–2 business days. Other states take 3–5 business days to your city's major commercial motor park terminal (free) or direct doorstep delivery (+₦5,000)."
    },
    {
      id: "faq-9",
      question: "9. What payment options are available?",
      answer: "We offer Payment on Delivery (POD) in eligible locations (Lagos, Abuja, Port Harcourt). Direct bank transfer and secure online checkout are also supported nationwide. Inspect your sink workstation before payment!"
    },
    {
      id: "faq-10",
      question: "10. What warranty is provided?",
      answer: "The Smart Paino Sink comes with a 1-Year Manufacturer Warranty covering the SUS304 stainless steel structure, piano valve block, waterfall faucet, and hydroelectric LED display, backed by our 7-day inspection guarantee."
    }
  ]
};

// Helper for formatting Nigerian Naira currency
export const formatNaira = (amount: number): string => {
  return "₦" + amount.toLocaleString('en-NG');
};
