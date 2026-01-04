import { CardDefination } from "@/types";

export const statusDamage: CardDefination[] = [
  {
    definitionId: "status_poison_infusion",
    name: "Poison Infusion",
    type: "status damage",
    desc: "Apply Poison +2 to opponent",
    effect: {
      poison: 2,
    },
    cooldown: 3,
    priority: 3,
  },
  {
    definitionId: "status_fatigue_hex",
    name: "Fatigue Hex",
    type: "status damage",
    desc: "Apply Fatigue +2 to opponent",
    effect: {
      fatigue: 2,
    },
    cooldown: 3,
    priority: 3,
  },
  {
    definitionId: "status_corrosion",
    name: "Corrosion",
    type: "status damage",
    desc: "Apply Poison +1 and Fatigue +1 to opponent",
    effect: {
      poison: 1,
      fatigue: 1,
    },
    cooldown: 4,
    priority: 3,
  },

  {
    definitionId: "status_frenzy",
    name: "Frenzy",
    type: "status damage",
    desc: "Apply random (-3 to +3) Poison or Fatigue",
    effect: {
      random: {
        poison: [-3, -2, 0, 2, 3],
        fatigue: [-3, -2, 0, 2, 3],
      },
    },
    cooldown: 5,
    priority: 3,
  },
];
