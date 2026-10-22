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
    cutout: "650 × 350 mm / standard 750 × 450 mm counter fit",
    badge: "Matching Luxury Gas Cooker",
    accentColor: "from-amber-600 to-red-600",
    keyFeatures: [
      "90° Flip-Up Burner Heads: Lift burner heads upright with one finger to wipe spills in 5 seconds without dismantling",
      "Built-In 0–180m Safety Timer: Mechanical auto-off timer cuts gas supply automatically when cooking finishes",
      "Pure Blue High-Heat Flame: 8-nozzle brass burner crowns with oxygen damper air balance produce zero pot soot",
      "Explosion-Proof Tempered Crystal Glass: Thermal-shock resistant 8mm glass panel that wipes clean effortlessly",
      "Windproof Heavy-Duty Cast Iron Stands: Rock-solid stability for heavy Nigerian cooking pots and family-sized pans"
    ],
    description: "The perfect luxury companion appliance to pair with your Smart Paino Sink. Features 90-degree flip-up burners for instant cleaning, 0–180 min mechanical safety auto-off timer, and pure blue flame with zero smoke.",
    images: [
      "https://www.moonlightluxuryhometech.shop/images/cooker_active_blue_flames.jpg",
      "https://www.moonlightluxuryhometech.shop/images/burner_flip_hinge.jpg",
      "https://www.moonlightluxuryhometech.shop/images/pure_blue_flame.jpg",
      "https://www.moonlightluxuryhometech.shop/images/cooker_blue_flames.jpg"
    ],
    officialUrl: ""
  }
];
