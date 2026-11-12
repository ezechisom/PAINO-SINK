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
    name: "Smart Paino Sink",
    tagline: "Tactile Piano Water Keys, Hydroelectric LED Temp Display & Flying Rain Waterfall",
    category: "Multifunctional Kitchen Sink (75 × 45 cm)",
    price: 130000,
    normalPrice: 160000,
    dimensions: "750 × 450 × 220 mm (75 × 45 cm)",
    cutout: "700 × 400 mm (topmount, flushmount, or undermount)",
    badge: "Matching Luxury Piano Sink",
    accentColor: "from-blue-600 to-indigo-600",
    keyFeatures: [
      "Tactile Piano Water Keys: Switch effortlessly between flying rain waterfall, 3-mode pull-out spray, cup rinser, and filtered drinking tap",
      "Self-Powered Digital LED Temp Display (°C): Internal hydroelectric turbine lights up live temperature & timer with zero batteries or wiring",
      "SUS304 Nano Honeycomb Steel: 3mm heavy-duty stainless steel with bionic anti-scratch, oil-repellent embossed finish",
      "High-Pressure Glass Rinser: Multi-angle water jets blast mugs, wine glasses, and baby bottles spotless in 2 seconds",
      "Complete 9-Piece Workstation Kit: Includes solid wood cutting board, triangular colander, nested prep basin, and full siphon drain kit"
    ],
    description: "The perfect luxury companion workstation to pair with your 2-Flip-Up Double Gas Burner. Features tactile piano water keys, battery-free hydroelectric LED temperature display, flying rain waterfall spout, high-pressure cup washer, and nested prep accessories.",
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
