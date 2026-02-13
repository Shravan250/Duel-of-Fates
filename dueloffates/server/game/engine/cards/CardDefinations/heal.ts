import { CardDefination } from "@/types";

export const healCards: CardDefination[] = [
  {
    definitionId: "heal_recover",
    name: "Recover",
    type: "heal",
    desc: "Restores 20 HP and reduces Poison by 2",
    cooldown: 2,
    priority: 3,
    effects: [
      { status: { poison: -2 }, target: "self" },
      { heal: 20, target: "self" },
    ],
  },
  {
    definitionId: "heal_second_wind",
    name: "Second Wind",
    type: "heal",
    desc: "Restore 20 HP if HP is below 50 then restore 40 HP",
    cooldown: 3,
    priority: 3,
    effects: [
      {
        heal: 40,
        target: "self",
        condition: {
          self: { hpBelow: 50 },
        },
        skipElse: true,
      },
      {
        heal: 20,
        target: "self",
      },
    ],
  },
  {
    definitionId: "heal_purifying_heal",
    name: "Purifying Heal",
    type: "heal",
    desc: "Restore 15 HP and reduce Fatigue by 2",
    cooldown: 4,
    priority: 3,
    effects: [
      { status: { fatigue: -2 }, target: "self" },
      { heal: 15, target: "self" },
    ],
  },
  {
    definitionId: "heal_emergency_restore",
    name: "Emergency Restore",
    type: "heal",
    desc: "Restore 30 HP, user gains Fatigue +1",
    cooldown: 4,
    priority: 3,
    effects: [
      { status: { fatigue: 1 }, target: "self" },
      { heal: 30, target: "self" },
    ],
  },
];
