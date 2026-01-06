import { CardDefination } from "@/types";

export const defenceCards: CardDefination[] = [
  {
    definitionId: "defense_guard",
    name: "Guard",
    type: "defense",
    desc: "Gain 8 Shield.",
    shield_gain: 8,
    priority: 2,
    cooldown: 1,
  },
  {
    definitionId: "defense_reinforced_guard",
    name: "Reinforced Guard",
    type: "defense",
    desc: "Gain 12 Shield.",
    shield_gain: 12,
    priority: 1,
    cooldown: 2,
  },
  {
    definitionId: "defense_brace",
    name: "Brace",
    type: "defense",
    desc: "Gain 10 Shield and reduce Fatigue by 1.",
    shield_gain: 10,
    priority: 2,
    cooldown: 2,
    sideEffects: {
      self: {
        fatigue: -1,
      },
    },
  },
  {
    definitionId: "defense_fortify",
    name: "Fortify",
    type: "defense",
    desc: "Gain 15 Shield.",
    shield_gain: 15,
    priority: 0,
    cooldown: 3,
  },
  {
    definitionId: "defense_reactive_barrier",
    name: "Reactive Barrier",
    type: "defense",
    desc: "Gain 6 Shield. Shield gain increases based on the user's Fatigue.",
    shield_gain: 6,
    priority: 2,
    cooldown: 2,
    condition: {
      self: {
        fatigueAbove: 0,
      },
    },
  },
  {
    definitionId: "defense_iron_stance",
    name: "Iron Stance",
    type: "defense",
    desc: "Gain 10 Shield. User gains Fatigue +1.",
    shield_gain: 10,
    priority: 2,
    cooldown: 3,
    sideEffects: {
      self: {
        fatigue: 1,
      },
    },
  },
];
