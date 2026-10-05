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
    id: "cooker-2burner",
    name: "2-Flip-Up Double Gas Burner With Timer",
    tagline: "90° Flip-Up Burners for Instant 1-Wipe Cleaning & Built-In Safety Timer",
    category: "Hinged Gas Cooktop (75 × 45 cm)",
    price: 170000,
    normalPrice: 200000,
    dimensions: "750 × 450 mm (75 × 45 cm)",
    cutout: "650 × 350 mm (fits standard counter openings)",
    badge: "Most Popular Matching Cooker",
    accentColor: "from-amber-500 to-orange-600",
    keyFeatures: [
      "90° Flip-Up Burner Heads: Easily lift burners upright to wipe spills underneath in 5 seconds",
      "Built-In Mechanical Timer (0–180 mins): Automatically shuts off flame when cooking timer finishes",
      "Pure Blue Flame Energy Efficiency: 8-nozzle brass burner crowns with oxygen damper valves",
      "Heavy-Duty Windproof Cast Iron Wok Stands: Supports heavy Nigerian cooking pots securely",
      "Explosion-Proof Tempered Crystal Glass: Thermal resistant and easy to clean"
    ],
    description: "The perfect companion appliance to your Smart Piano Sink. Features revolutionary 90-degree folding burner heads so you never struggle with grease build-up, plus an integrated mechanical timer that prevents burnt pots and wasted gas.",
    images: [
      "https://www.moonlightluxuryhometech.shop/images/cooker_active_blue_flames.jpg",
      "https://www.moonlightluxuryhometech.shop/images/cooker_blue_flames.jpg",
      "https://www.moonlightluxuryhometech.shop/images/burner_flip_hinge.jpg",
      "https://www.moonlightluxuryhometech.shop/images/pure_blue_flame.jpg"
    ],
    officialUrl: "https://www.moonlightluxuryhometech.shop/"
  }
];
