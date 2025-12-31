import { CardDefination } from "@/types";

export const statusDamage: CardDefination[] = [
  {
    definitionId: "status_poison_infusion",
    name: "Poison Infusion",
    type: "status damage",
    effect: "Apply Poison +2 to opponent",
    cooldown: 3,
    priority: 3,
  },
  {
    definitionId: "status_fatigue_hex",
    name: "Fatigue Hex",
    type: "status damage",
    effect: "Apply Fatigue +2 to opponent",
    cooldown: 3,
    priority: 3,
  },
  {
    definitionId: "status_corrosion",
    name: "Corrosion",
    type: "status damage",
    effect: "Apply Poison +1 and Fatigue +1 to opponent",
    cooldown: 4,
    priority: 3,
  },
  {
    definitionId: "status_frenzy",
    name: "Frenzy",
    type: "status damage",
    effect: "Apply (-3 to +3) Fatigue/Poison",
    cooldown: 5,
    priority: 3,
  },
];
