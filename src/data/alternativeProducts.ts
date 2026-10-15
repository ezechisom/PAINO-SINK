export interface AlternativeProduct {
  id: string;
  name: string;
  tagline: string;
  category: string;
  price: number;
  normalPrice: number;
  dimensions: string;
  cutout: string;
  badge: string;
  accentColor: string;
  keyFeatures: string[];
  description: string;
  images: string[];
  officialUrl: string;
}

export const ALTERNATIVE_PRODUCTS: AlternativeProduct[] = [
  {
    id: "sink",
    name: "Smart Kitchen Piano Sink",
    tagline: "SUS304 Nano Workstation with Digital Display, Waterfall & 4 Water Modes",
    category: "Multifunctional Workstation Sink (75 × 45 cm)",
    price: 135000,
    normalPrice: 160000,
    dimensions: "750 × 450 mm (75 × 45 cm)",
    cutout: "700 × 400 mm / standard 750 × 450 mm counter fit",
    badge: "Matching Luxury Piano Sink",
    accentColor: "from-blue-600 to-indigo-700",
    keyFeatures: [
      "Tactile Piano Water Keys: Effortlessly switch between flying rain waterfall, pull-out sprayer, cup washer, and drinking tap",
      "Hydroelectric LED Temp Display (°C): Real-time temperature & ambient glow with zero batteries or wiring",
      "Anti-Scratch Honeycomb SUS304 Nano Stainless Steel: Resists scratches, oil adhesion, and stains",
      "Double-Track Multi-Level Workstation: Includes solid wood cutting board, colander basket & prep basin",
      "High-Pressure Glass Rinser: Blasts glasses and mugs clean in 2 seconds"
    ],
    description: "The perfect luxury companion appliance to your 2-Burner Gas Cooktop. Features mechanical piano-key controls, vegetable waterfall rinser, and self-powered hydroelectric temperature display.",
    images: [
      "/images/smart_piano_sink_1789548024514.jpg",
      "/images/piano_console_details_1789548059707.jpg",
      "/images/workstation_accessories_1789548079842.jpg",
      "/images/luxury_kitchen_lifestyle_1789548098794.jpg",
      "/images/complete_package_kit_1789548119458.jpg"
    ],
    officialUrl: ""
  }
];

