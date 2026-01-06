import { CardDefination } from "@/types";

export const statusDamage: CardDefination[] = [
  {
    definitionId: "status_poison_infusion",
    name: "Poison Infusion",
    type: "status",
    desc: "Apply Poison +2 to opponent",
    cooldown: 3,
    priority: 3,
    effects: [{ status: { poison: 2 }, target: "opponent" }],
  },
  {
    definitionId: "status_fatigue_hex",
    name: "Fatigue Hex",
    type: "status",
    desc: "Apply Fatigue +2 to opponent",
    cooldown: 3,
    priority: 3,
    effects: [{ status: { fatigue: 2 }, target: "opponent" }],
  },
  {
    definitionId: "status_corrosion",
    name: "Corrosion",
    type: "status",
    desc: "Apply Poison +1 and Fatigue +1 to opponent",
    cooldown: 4,
    priority: 3,
    effects: [{ status: { poison: 1, fatigue: 1 }, target: "opponent" }],
  },

  {
    definitionId: "status_frenzy",
    name: "Frenzy",
    type: "status damage",
    desc: "Apply random (-3 to +3) Poison or Fatigue",
    cooldown: 5,
    priority: 3,
    effects: [
      {
        status: {
          random: {
            poison: [-3, -2, 0, 2, 3],
            fatigue: [-3, -2, 0, 2, 3],
          },
        },
      },
    ],
  },
];
