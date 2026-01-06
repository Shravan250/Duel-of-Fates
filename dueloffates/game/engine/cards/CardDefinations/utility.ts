import { CardDefination } from "@/types";

export const utilityCards: CardDefination[] = [
  {
    definitionId: "utility_reversal",
    name: "Reversal",
    type: "utility",
    desc: "All Poison and Fatigue stacks from self to opponent",
    cooldown: 99999,
    priority: 3,
    effects: [
      {
        status: {
          poison: 0,
          fatigue: 0,
        },
        target: "opponent",
      },
    ],
  },
  {
    definitionId: "utility_swap",
    name: "Swap",
    type: "utility",
    desc: "Swap User and Opponent HP and Shield",
    cooldown: 99999,
    priority: 3,
    effects: [
      {
        modifiers: {},
        target: "self",
      },
    ],
  },
];
