import { SiteConfig } from './types';

// Default countdown set to 2 days from initial load, with persistent fallback
const getInitialPromoEndDate = (): string => {
  const now = new Date();
  now.setDate(now.getDate() + 2);
  now.setHours(23, 59, 59, 999);
  return now.toISOString();
};

// Central Formspree Form Submission Endpoint
export const FORMSPREE_ENDPOINT = "https://formspree.io/f/xppwqdyj";

export const CONFIG: SiteConfig = {
  productName: "Smart Kitchen Piano Sink",
  normalPrice: 160000,
  promoPrice: 140000,
  currency: "₦",
  countdownEndDate: getInitialPromoEndDate(),
  whatsappNumber: "2349136827730", // Store WhatsApp number (09136827730)
  phoneNumber: "09136827730",
  formspreeEndpoint: FORMSPREE_ENDPOINT,
  
  deliveryInformation: "Nationwide delivery across Nigeria. Lagos orders arrive in 1–2 business days. For other states, delivery takes 3–5 business days: standard orders are picked up at your city's major commercial motor park terminal, while direct doorstep delivery is available for an extra fee of ₦5,000.",
  paymentInformation: "Payment on Delivery available in selected major cities (Lagos, Abuja, PH). Bank transfer and secure online payment available nationwide.",
  returnPolicy: "7-day inspection and exchange period upon delivery. Items must remain unused in original protective packaging.",
  warrantyInformation: "1-Year Manufacturer Warranty covering the piano valve core, LED hydroelectric module, and faucet cartridge.",

  trustStatements: {
    delivery: "Nationwide Delivery (1-5 Days)",
    packaging: "Heavy-Duty Wooden/Foam Packaging",
    support: "100% Genuine Quality Guarantee"
  },

  productImages: [
    {
      id: "hero-sink",
      url: "/images/smart_piano_sink_1789548024514.jpg",
      title: "Smart Kitchen Piano Sink",
      subtitle: "Nano Stainless Steel Workstation with Digital Display",
      tag: "main",
      alt: "Smart Kitchen Piano Sink with piano keys and digital temperature display"
    },
    {
      id: "console-details",
      url: "/images/piano_console_details_1789548059707.jpg",
      title: "Digital Temperature Display & Flow-Activated Light",
      subtitle: "LED screen shows real-time temperature in °C; elegant ambient light turns on automatically as water passes through",
      tag: "console",
      alt: "Close up of piano keys, LED digital screen and ambient light illuminating as water passes through"
    },
    {
      id: "accessories-nesting",
      url: "/images/workstation_accessories_1789548079842.jpg",
      title: "Technical Dimensions & Fit Guide",
      subtitle: "Standard 750mm × 450mm cutout with 205mm deep basin & console layout",
      tag: "details",
      alt: "Technical dimension diagram of the Smart Piano Sink with standard 750x450mm fit"
    },
    {
      id: "water-modes-controls",
      url: "/images/luxury_kitchen_lifestyle_1789548098794.jpg",
      title: "4 Water Modes & Piano Controls",
      subtitle: "Independent piano keys for pull-out tap, flying rain, waterfall & high-pressure cup washer",
      tag: "console",
      alt: "Piano key control console demonstrating tap water, rain stream, waterfall, and cup washer modes"
    },
    {
      id: "complete-package",
      url: "/images/complete_package_kit_1789548119458.jpg",
      title: "Full Set & Plumbing Accessories",
      subtitle: "Includes sink, faucet console, pipes, valves, and sliding trays",
      tag: "unboxing",
      alt: "Unboxing package layout showing all included components and fittings"
    }
  ],

  features: [
    {
      id: "piano-controls",
      title: "Piano-Key Water Controls",
      description: "Tactile mechanical piano buttons switch instantly between waterfall, pull-out sprayer, glass rinser, and drinking tap.",
      iconName: "Sliders",
      badge: "Signature Feature",
      highlight: true
    },
    {
      id: "digital-display",
      title: "Digital Temp (°C) & Flow Light",
      description: "Real-time LED °C screen and auto-glow light powered 100% by hydroelectric water flow — zero batteries or wiring required!",
      iconName: "Gauge",
      badge: "Lights Up On Flow",
      highlight: true
    },
    {
      id: "flying-rain",
      title: "Flying Rain Waterfall Spout",
      description: "Gentle horizontal cascading waterfall for effortless, splash-free rinsing of delicate fruits and leafy vegetables.",
      iconName: "Waves",
      badge: "Splash-Free",
      highlight: true
    },
    {
      id: "pull-out-faucet",
      title: "360° Pull-Out Faucet",
      description: "Flexible pull-out sprayer with dual stream & high-pressure blade spray modes for deep pot cleaning.",
      iconName: "Maximize2"
    },
    {
      id: "cup-washer",
      title: "High-Pressure Glass Rinser",
      description: "Multi-angle high-velocity jets clean cups, mugs, and bottles in 2 seconds with a simple downward press.",
      iconName: "Sparkles"
    },
    {
      id: "nested-workstation",
      title: "Double-Track Workstation",
      description: "Slide the solid wood cutting board, colander, and prep basin over the basin to save counter space.",
      iconName: "Layers"
    },
    {
      id: "nano-coating",
      title: "Anti-Scratch Nano Finish",
      description: "Heavy-duty SUS304 stainless steel with micro-honeycomb nano coating that repels oil, watermarks, and abrasions.",
      iconName: "ShieldCheck"
    },
    {
      id: "drinking-tap",
      title: "Filtered Drinking Water Tap",
      description: "Dedicated gooseneck tap connects directly to your water purifier for clean drinking water on deck.",
      iconName: "Droplet"
    }
  ],

  specifications: [
    {
      feature: "Sink Design",
      detail: "Single deep bowl workstation with integrated piano console & double-track rails",
      iconName: "Square"
    },
    {
      feature: "Outer Dimensions",
      detail: "750 × 450 × 205 mm (75 × 45 × 20.5 cm)",
      iconName: "Ruler"
    },
    {
      feature: "Inner Basin Dimensions",
      detail: "700 × 350 × 200 mm",
      iconName: "Box"
    },
    {
      feature: "Material & Craft",
      detail: "Heavy-duty SUS304 Stainless Steel with scratch-resistant Nano Bionic finish",
      iconName: "Shield"
    },
    {
      feature: "Color / Finish",
      detail: "Gunmetal Gray / Matte Black Nano Metallic",
      iconName: "Palette"
    },
    {
      feature: "Faucet System",
      detail: "Integrated Piano Console with Waterfall, 360° pull-out sprayer, drinking tap & cup washer",
      iconName: "Droplets"
    },
    {
      feature: "Digital Display & Flow Light",
      detail: "Real-time LED °C & auto ambient glow (100% hydroelectric, zero batteries or wiring)",
      iconName: "Cpu"
    },
    {
      feature: "Included Accessories",
      detail: "Wood cutting board, colander basket, prep basin, cup washer, soap dispenser & full plumbing kit",
      iconName: "PackageCheck"
    },
    {
      feature: "Installation Type",
      detail: "Compatible with Top-mount, Flush-mount, or Undermount configurations",
      iconName: "Hammer"
    },
    {
      feature: "Drainage System",
      detail: "110mm drain with deck rotary control knob & anti-odor trap",
      iconName: "RotateCw"
    }
  ],

  reviews: [
    {
      id: "rev-1",
      name: "Engr. Babatunde A.",
      location: "Lekki Phase 1, Lagos",
      rating: 5,
      review: "We installed this piano sink during our kitchen remodeling last month. The waterfall feature for washing vegetables is simply incredible. The water temperature display also keeps my kids safe from accidental hot water burns. The heavy-duty 304 nano finish resists scratches completely. Premium quality through and through!",
      date: "Verified Homeowner &bull; Lagos",
      verified: true
    }
  ],

  faqs: [
    {
      id: "faq-1",
      question: "1. What is a Smart Kitchen Piano Sink?",
      answer: "A Smart Kitchen Piano Sink is a luxury, multifunctional kitchen workstation sink equipped with mechanical piano-style push buttons to control multiple water streams, an integrated LED digital temperature display, a cascading flying rain waterfall, a pull-out spray faucet, a high-pressure glass rinser, and nested preparation accessories."
    },
    {
      id: "faq-2",
      question: "2. What functions does the sink have, and how does the light work?",
      answer: "The sink integrates four key water dispensing modes: (1) Flying Rain horizontal waterfall for washing fruits and vegetables, (2) Pull-out flexible spray faucet with aerated stream and blade spray modes, (3) High-pressure glass cup washer, and (4) Dedicated filtered drinking water tap. Additionally, it features a real-time digital temperature display (°C) and an ambient glow light that automatically turns on whenever water passes through the sink, powered 100% by an internal hydroelectric turbine with zero batteries or electricity needed."
    },
    {
      id: "faq-3",
      question: "3. What accessories come with it?",
      answer: "The complete set includes: (1) Main 750x450mm nano stainless steel sink, (2) Complete piano faucet console with waterfall & pull-out tap, (3) Solid natural wood chopping board, (4) Triangular/rectangular perforated draining colander, (5) Nested secondary prep basin, (6) High-pressure cup washer, (7) Soap/lotion dispenser, (8) 110mm pop-up drain strainer with rotary knob, and (9) Complete plumbing pipes, hot & cold hoses, and angle valves."
    },
    {
      id: "faq-4",
      question: "4. What material is it made from?",
      answer: "It is constructed from heavy-gauge, premium SUS304 food-grade stainless steel treated with an advanced bionic nano textured coating that provides superior resistance against rust, corrosion, oil adhesion, and surface scratches."
    },
    {
      id: "faq-5",
      question: "5. What are the dimensions?",
      answer: "External Dimensions: 750mm (Length) x 450mm (Width) x 205mm (Depth). Inner Bowl Dimensions: 700mm (Length) x 350mm (Width) x 200mm (Depth). The piano console measures 750mm long by 75mm wide."
    },
    {
      id: "faq-6",
      question: "6. Does it come with the faucet?",
      answer: "Yes! The faucet system is pre-integrated into the piano console bar. It includes both the high-arc 360° pull-out sprayer and the separate dedicated drinking water faucet, as well as the horizontal waterfall bar."
    },
    {
      id: "faq-7",
      question: "7. Does it require professional installation?",
      answer: "Yes, we recommend that a licensed or experienced plumber installs the sink to connect the standard 1/2-inch hot and cold water inlet pipes, the drainage trap, and the optional drinking water purifier line correctly."
    },
    {
      id: "faq-8",
      question: "8. Is it suitable for a new kitchen?",
      answer: "Absolutely. It is one of the most requested modern sinks for new architectural builds, custom homes, and luxury kitchen renovations across Nigeria."
    },
    {
      id: "faq-9",
      question: "9. Can it be installed in an existing kitchen?",
      answer: "Yes. As long as your countertop cutout accommodates the 750 x 450 mm dimensions (or can be adjusted by your installer), it easily replaces conventional double or single sinks."
    },
    {
      id: "faq-10",
      question: "10. How does delivery work for my state?",
      answer: "We ship nationwide across all 36 states and the FCT. For Lagos State, doorstep delivery is included (1–2 business days). For other states, standard orders arrive in 3–5 business days and are picked up at your city's major commercial motor park terminal. If you prefer delivery directly to your home/doorstep in other states, it is gladly arranged for an extra delivery fee of ₦5,000."
    },
    {
      id: "faq-11",
      question: "11. What payment options are available?",
      answer: "We offer Payment on Delivery (POD) in eligible locations (such as Lagos, Abuja, and Port Harcourt). We also accept direct bank transfers and secure online payments for all locations nationwide."
    },
    {
      id: "faq-12",
      question: "12. What are the estimated delivery days?",
      answer: "Lagos State: 1 to 2 business days. Abuja (FCT) and other states: 3 to 5 business days. You will receive SMS/phone call updates with tracking information as soon as your unit is dispatched."
    },
    {
      id: "faq-13",
      question: "13. What is the return/warranty policy?",
      answer: "We offer a 7-day inspection guarantee upon receipt of goods. In addition, the sink and valve mechanisms are backed by a 1-Year Manufacturer Warranty."
    }
  ]
};

// Helper for formatting Nigerian Naira currency
export const formatNaira = (amount: number): string => {
  return "₦" + amount.toLocaleString('en-NG');
};
