import { CardDefination } from "@/types";

export const attackCards: CardDefination[] = [
  {
    definitionId: "attack_quick_attack",
    name: "Quick Attack",
    type: "attack",
    desc: "Deal 8 damage.",
    damage: 8,
    priority: 2,
    cooldown: 1,
  },
  {
    definitionId: "attack_precise_strike",
    name: "Precise Strike",
    type: "attack",
    desc: "Deal 10 damage. Deals double damage if the target has no Shield.",
    damage: 10,
    priority: 1,
    cooldown: 1,
    condition: {
      target: {
        hasShield: false,
      },
    },
  },
  {
    definitionId: "attack_heavy_blow",
    name: "Heavy Blow",
    type: "attack",
    desc: "Deal 16 damage. User gains Fatigue +1.",
    damage: 16,
    priority: 0,
    cooldown: 3,
    sideEffects: {
      self: {
        fatigue: 1,
      },
    },
  },
  {
    definitionId: "attack_crushing_strike",
    name: "Crushing Strike",
    type: "attack",
    desc: "Deal 12 damage. Deals increased damage if the target has Shield.",
    damage: 12,
    priority: 1,
    cooldown: 2,
    condition: {
      target: {
        hasShield: true,
      },
    },
  },
  {
    definitionId: "attack_relentless_slash",
    name: "Relentless Slash",
    type: "attack",
    desc: "Deal 9 damage.",
    damage: 9,
    priority: 2,
    cooldown: 2,
  },
  {
    definitionId: "attack_exhausting_strike",
    name: "Exhausting Strike",
    type: "attack",
    desc: "Deal 7 damage and apply Fatigue +1 to the target.",
    damage: 7,
    priority: 1,
    cooldown: 2,
    sideEffects: {
      target: {
        fatigue: 1,
      },
    },
  },
  {
    definitionId: "attack_opportunist_hit",
    name: "Opportunist Hit",
    type: "attack",
    desc: "Deal 11 damage. Deals increased damage if the target has Fatigue.",
    damage: 11,
    priority: 2,
    cooldown: 2,
    condition: {
      target: {
        hasFatigue: true,
      },
    },
  },
  {
    definitionId: "attack_all_in_strike",
    name: "All-In Strike",
    type: "attack",
    desc: "Deal 20 damage. User gains Fatigue +2.",
    damage: 20,
    priority: 0,
    cooldown: 4,
    sideEffects: {
      self: {
        fatigue: 2,
      },
    },
  },
];
