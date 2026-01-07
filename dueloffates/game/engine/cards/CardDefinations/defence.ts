import { CardDefination } from "@/types";

export const defenceCards: CardDefination[] = [
  {
    definitionId: "defense_guard",
    name: "Guard",
    type: "defense",
    desc: "Gain 8 Shield.",
    cooldown: 1,
    priority: 2,
    effects: [{ shield: 8, target: "self" }],
  },
  {
    definitionId: "defense_reinforced_guard",
    name: "Reinforced Guard",
    type: "defense",
    desc: "Gain 12 Shield.",
    cooldown: 2,
    priority: 1,
    effects: [{ shield: 12, target: "self" }],
  },
  {
    definitionId: "defense_brace",
    name: "Brace",
    type: "defense",
    desc: "Gain 10 Shield and reduce Fatigue by 1.",
    cooldown: 2,
    priority: 2,
    effects: [
      { status: { fatigue: -1 }, target: "self" },
      { shield: 10, target: "self" },
    ],
  },
  {
    definitionId: "defense_fortify",
    name: "Fortify",
    type: "defense",
    desc: "Gain 15 Shield.",
    cooldown: 3,
    priority: 0,
    effects: [{ shield: 15, target: "self" }],
  },
  {
    definitionId: "defense_reactive_barrier",
    name: "Reactive Barrier",
    type: "defense",
    desc: "Gain 6 Shield. Shield gain increases based on the user's Fatigue.",
    cooldown: 2,
    priority: 2,
    effects: [
      {
        shield: 6,
        target: "self",
        condition: {
          self: { fatigueBelow: 1 },
        },
        skipElse: true,
      },
      {
        shield: 6,
        target: "self",
      },
    ],
  },
  {
    definitionId: "defense_iron_stance",
    name: "Iron Stance",
    type: "defense",
    desc: "Gain 10 Shield. User gains Fatigue +1.",
    cooldown: 3,
    priority: 2,
    effects: [
      { status: { fatigue: 1 }, target: "self" },
      { shield: 10, target: "self" },
    ],
  },
];
