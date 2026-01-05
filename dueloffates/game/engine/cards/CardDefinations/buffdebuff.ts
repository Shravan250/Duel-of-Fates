import { CardDefination } from "@/types";

export const buffDebuffCards: CardDefination[] = [
  {
    definitionId: "buff_battle_focus",
    name: "Battle Focus",
    type: "buff",
    desc: "Increase damage of next attack card by +1x",
    modifiers: {
      nextAttackMultiplier: 2,
    },
    cooldown: 3,
    priority: 3,
  },
  {
    definitionId: "buff_defensive_posture",
    name: "Defensive Posture",
    type: "buff",
    desc: "Increase next shield gain by +1x",
    modifiers: {
      nextShieldMultiplier: 2,
    },
    cooldown: 3,
    priority: 3,
  },
  {
    definitionId: "buff_adrenaline_rush",
    name: "Adrenaline Rush",
    type: "buff",
    desc: "Reduce cooldown of next played card by 2 turns",
    modifiers: {
      cooldownReduction: 2,
    },
    cooldown: 4,
    priority: 3,
  },
  {
    definitionId: "debuff_weaken",
    name: "Weaken",
    type: "debuff",
    desc: "Opponent's next attack deals 40% less damage",
    modifiers: {
      incomingAttackMultiplier: 0.6,
    },
    cooldown: 3,
    priority: 3,
  },
  {
    definitionId: "debuff_crippling_pressure",
    name: "Crippling Pressure",
    type: "debuff",
    desc: "Opponent's next attack deals 60% less damage",
    modifiers: {
      incomingAttackMultiplier: 0.4,
    },
    cooldown: 4,
    priority: 3,
  },
  {
    definitionId: "debuff_guard_break_prep",
    name: "Guard Break Prep",
    type: "debuff",
    desc: "Opponent's shield gain is halved",
    modifiers: {
      halveShield: true,
    },
    cooldown: 4,
    priority: 3,
  },
];
