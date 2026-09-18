export const NIGERIAN_STATES = [
  "Lagos",
  "Abuja (FCT)",
  "Rivers (Port Harcourt)",
  "Oyo (Ibadan)",
  "Delta",
  "Edo (Benin City)",
  "Enugu",
  "Anambra",
  "Imo",
  "Ogun",
  "Akwa Ibom",
  "Kano",
  "Kaduna",
  "Abia",
  "Adamawa",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Ebonyi",
  "Ekiti",
  "Gombe",
  "Jigawa",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Nasarawa",
  "Niger",
  "Ondo",
  "Osun",
  "Plateau",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara"
];

export interface MotorParkChoice {
  id: string;
  name: string;
  shortName: string;
  area: string;
}

export const STATE_MOTOR_PARKS: Record<string, MotorParkChoice[]> = {
  "Oyo (Ibadan)": [
    { id: "ojoo", name: "Ojoo Motor Park", shortName: "Ojoo", area: "Ibadan North / Express" },
    { id: "challenge", name: "Challenge Motor Park", shortName: "Challenge", area: "Ibadan South-West" },
    { id: "iwo_road", name: "Iwo Road Motor Park", shortName: "Iwo Road", area: "Ibadan North-East / Central" }
  ],
  "Abuja (FCT)": [
    { id: "utako", name: "Utako Motor Park", shortName: "Utako", area: "Utako District / Central Abuja" },
    { id: "gwagwalada", name: "Gwagwalada Motor Park", shortName: "Gwagwalada", area: "Gwagwalada / Airport Axis" }
  ],
  "Rivers (Port Harcourt)": [
    { id: "waterline", name: "Waterline Motor Park", shortName: "Waterline", area: "Aba Road / Central Port Harcourt" },
    { id: "rumuokoro", name: "Rumuokoro Motor Park", shortName: "Rumuokoro", area: "Rumuokoro Junction / Obio-Akpor" }
  ],
  "Abia": [
    { id: "aba", name: "Aba Motor Park", shortName: "Aba", area: "Aba Central Commercial Park" },
    { id: "umuahia", name: "Umuahia Motor Park", shortName: "Umuahia", area: "Umuahia Capital Park" }
  ],
  "Delta": [
    { id: "warri", name: "Warri Motor Park", shortName: "Warri", area: "Warri Commercial Transport Park" },
    { id: "asaba", name: "Asaba Motor Park", shortName: "Asaba", area: "Asaba Central Motor Terminal" },
    { id: "sapele", name: "Sapele Motor Park", shortName: "Sapele", area: "Sapele Commercial Park" }
  ]
};

export function getMotorParksForState(stateName: string): MotorParkChoice[] | null {
  if (!stateName) return null;
  const s = stateName.toLowerCase();
  if (s.includes("ibadan") || s.includes("oyo")) {
    return STATE_MOTOR_PARKS["Oyo (Ibadan)"];
  }
  if (s.includes("abuja") || s.includes("fct")) {
    return STATE_MOTOR_PARKS["Abuja (FCT)"];
  }
  if (s.includes("port harcourt") || s.includes("rivers") || s.includes("portharcout")) {
    return STATE_MOTOR_PARKS["Rivers (Port Harcourt)"];
  }
  if (s.includes("abia")) {
    return STATE_MOTOR_PARKS["Abia"];
  }
  if (s.includes("delta")) {
    return STATE_MOTOR_PARKS["Delta"];
  }
  return null;
}

