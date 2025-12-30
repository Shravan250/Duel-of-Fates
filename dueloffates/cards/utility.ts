import { CardDefination } from "@/types";

export const utilityCards: CardDefination[] = [
  {
    definitionId: "utility_reversal",
    name: "Reversal",
    type: "utility",
    effect: "all Poison and Fatigue stacks from self to opponent",
    cooldown: 99999,
    priority: 3,
  },
  {
    definitionId: "utility_swap",
    name: "Swap",
    type: "utility",
    effect: "Swap User and Opponents HP and Shield",
    cooldown: 99999,
    priority: 3,
  },
];
