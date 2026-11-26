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
    tagline: "90° Flip-Up Hinged Burners, 0–180m Mechanical Safety Timer & Pure Blue Flame",
    category: "Luxury 2-Burner Flip-Up Gas Cooktop (75 × 45 cm)",
    price: 160000,
    normalPrice: 200000,
    dimensions: "750 × 450 mm (75 × 45 cm)",
    cutout: "650 × 350 mm (built-in recessed or tabletop placement)",
    badge: "Matching 2-Flip-Up Gas Burner",
    accentColor: "from-amber-500 to-orange-600",
    keyFeatures: [
      "90° Flip-Up Hinged Burners: Lift both burner heads upright with one finger to wipe burnt spills underneath in 5 seconds",
      "Built-In 0–180m Auto-Off Timer: Mechanical safety timer automatically shuts off gas flow when cooking time finishes",
      "Pure Blue Zero-Soot Flame: 8-nozzle brass burner crowns with precision oxygen damper keep cooking pots clean and spotless",
      "8mm Explosion-Proof Crystal Glass: Thermal-shock resistant tempered glass panel with heavy windproof cast iron pot stands",
      "Dual Built-In or Tabletop Fit: Drops cleanly into a 650 × 350 mm cutout or sits directly on top of your counter slab"
    ],
    description: "The perfect luxury companion gas cooktop to pair with your Smart Paino Sink. Features 90° one-finger flip-up hinged burners for 5-second cleaning, an integrated 0–180 minute mechanical safety auto-off timer, pure blue zero-soot flames, and 8mm explosion-proof tempered crystal glass.",
    images: [
      "https://www.moonlightluxuryhometech.shop/images/cooker_active_blue_flames.jpg",
      "https://www.moonlightluxuryhometech.shop/images/burner_flip_hinge.jpg",
      "https://www.moonlightluxuryhometech.shop/images/pure_blue_flame.jpg",
      "https://www.moonlightluxuryhometech.shop/images/cooker_blue_flames.jpg"
    ],
    officialUrl: ""
  }
];
