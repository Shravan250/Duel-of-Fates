import { CardDefination } from "@/types";

export const attackCards: CardDefination[] = [
  {
    definitionId: "attack_quick_attack",
    name: "Quick Attack",
    type: "attack",
    desc: "Deal 8 damage.",
    cooldown: 1,
    priority: 2,
    effects: [{ damage: 8, target: "opponent" }],
  },
  {
    definitionId: "attack_precise_strike",
    name: "Precise Strike",
    type: "attack",
    desc: "Deal 10 damage. Deals double damage if the target has no Shield.",
    cooldown: 1,
    priority: 1,
    effects: [
      {
        damage: 20,
        target: "opponent",
        condition: {
          opponent: { hasShield: false },
        },
      },
      {
        damage: 10,
        target: "opponent",
      },
    ],
  },
  {
    definitionId: "attack_heavy_blow",
    name: "Heavy Blow",
    type: "attack",
    desc: "Deal 16 damage. User gains Fatigue +1.",
    cooldown: 3,
    priority: 0,
    effects: [
      { damage: 16, target: "opponent" },
      { status: { fatigue: 1 }, target: "self" },
    ],
  },
  {
    definitionId: "attack_crushing_strike",
    name: "Crushing Strike",
    type: "attack",
    desc: "Deal 12 damage. Deals increased damage if the target has Shield.",
    cooldown: 2,
    priority: 1,
    effects: [
      {
        damage: 16,
        target: "opponent",
        condition: {
          opponent: { hasShield: true },
        },
      },
      {
        damage: 12,
        target: "opponent",
      },
    ],
  },
  {
    definitionId: "attack_relentless_slash",
    name: "Relentless Slash",
    type: "attack",
    desc: "Deal 9 damage.",
    cooldown: 2,
    priority: 2,
    effects: [{ damage: 9, target: "opponent" }],
  },
  {
    definitionId: "attack_exhausting_strike",
    name: "Exhausting Strike",
    type: "attack",
    desc: "Deal 7 damage and apply Fatigue +1 to the target.",
    cooldown: 2,
    priority: 1,
    effects: [
      { damage: 7, target: "opponent" },
      { status: { fatigue: 1 }, target: "opponent" },
    ],
  },
  {
    definitionId: "attack_opportunist_hit",
    name: "Opportunist Hit",
    type: "attack",
    desc: "Deal 11 damage. Deals increased damage if the target has Fatigue.",
    cooldown: 2,
    priority: 2,
    effects: [
      {
        damage: 15,
        target: "opponent",
        condition: {
          opponent: { hasFatigue: true },
        },
      },
      {
        damage: 11,
        target: "opponent",
      },
    ],
  },
  {
    definitionId: "attack_all_in_strike",
    name: "All-In Strike",
    type: "attack",
    desc: "Deal 20 damage. User gains Fatigue +2.",
    cooldown: 4,
    priority: 0,
    effects: [
      { damage: 20, target: "opponent" },
      { status: { fatigue: 2 }, target: "self" },
    ],
  },
];
