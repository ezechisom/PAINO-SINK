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
  },
  {
    id: "cooker-5burner",
    name: "Executive 5-Burner Built-In Gas + Electric Hybrid Cooktop",
    tagline: "Never Get Stranded: 4 High-Heat Gas Burners + 1 Central 2000W Radiant Electric Zone",
    category: "Dual-Fuel Hybrid Cooktop (90 × 51 cm)",
    price: 280000,
    normalPrice: 340000,
    dimensions: "900 × 510 mm (90 × 51 cm)",
    cutout: "830 × 470 mm",
    badge: "Executive Dual-Fuel Hybrid",
    accentColor: "from-cyan-500 to-blue-600",
    keyFeatures: [
      "Dual-Fuel Reliability: Switch to the 2000W instant electric ceramic plate whenever gas runs out unexpectedly",
      "90° Flip-Up Hinged Gas Burners: Effortless 1-wipe cleanups without dismantling heavy components",
      "Digital Touch Controls & Timer: Independent LED touch interface for the electric cooking zone",
      "4 High-Power Gas Burners: Triple-ring wok burner for rapid boiling and high-heat frying",
      "Bevelled Luxury Black Glass: Designed for modern open-concept luxury kitchen architectural spaces"
    ],
    description: "The ultimate solution for uninterrupted Nigerian kitchen cooking. Powered by both gas and electricity, ensuring your meal is never interrupted even if your gas cylinder runs empty mid-cooking.",
    images: [
      "https://www.moonlightluxuryhometech.shop/images/alternative_5burner/cooktop_showroom_active.jpg",
      "https://www.moonlightluxuryhometech.shop/images/alternative_5burner/cooktop_main_diagram.png",
      "https://www.moonlightluxuryhometech.shop/images/alternative_5burner/cooktop_hinged_burners.png",
      "https://www.moonlightluxuryhometech.shop/images/alternative_5burner/cooktop_kitchen_installed.jpeg"
    ],
    officialUrl: "https://www.moonlightluxuryhometech.shop/"
  }
];
