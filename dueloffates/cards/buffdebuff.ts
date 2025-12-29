export const buffDebuffCards = [
  {
    name: "Battle Focus",
    type: "Buff",
    effect: "Increase damage of next attack card by +1x",
    effect_multiplier: "+1x",
    cooldown: 3,
    priority:3
  },
  {
    name: "Defensive Posture",
    type: "Buff",
    effect: "Increase next shield gain by +1x",
    effect_multiplier: "+1x",
    cooldown: 3,
    priority:3
  },
  {
    name: "Adrenaline Rush",
    type: "Buff",
    effect: "Reduce cooldown of next played card by 2 turn",
    effect_multiplier: "-2 Cooldown",
    cooldown: 4,
    priority:3
  },
  {
    name: "Weaken",
    type: "Debuff",
    effect: "Opponent's next Attack card deals 40% less damage",
    effect_multiplier: "-0.4x",
    cooldown: 3,
    priority:3
  },
  {
    name: "Crippling Pressure",
    type: "Debuff",
    effect: "Opponent's next Attack card damage reduced by 60%",
    effect_multiplier: "-0.6x",
    cooldown: 4,
    priority:3
  },
  {
    name: "Guard Break Prep",
    type: "Debuff",
    effect: "Lowers Opponents shield by half",
    effect_multiplier: "Opponent shield -50%",
    cooldown: 4,
    priority:3
  },
];
