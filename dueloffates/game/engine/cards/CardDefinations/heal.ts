import { CardDefination } from "@/types";

export const healCards: CardDefination[] = [
  {
    definitionId: "heal_recover",
    name: "Recover",
    type: "heal",
    desc: "Restores 10 HP",
    cooldown: 2,
    priority: 3,
    effects: [{ heal: 10, target: "self" }],
  },
  {
    definitionId: "heal_second_wind",
    name: "Second Wind",
    type: "heal",
    desc: "Restore 15 HP if HP is below 50 then restore 30 HP",
    cooldown: 3,
    priority: 3,
    effects: [
      {
        heal: 30,
        target: "self",
        condition: {
          self: { hpBelow: 50 },
        },
      },
      {
        heal: 15,
        target: "self",
      },
    ],
  },
  {
    definitionId: "heal_purifying_heal",
    name: "Purifying Heal",
    type: "heal",
    desc: "Restore 10 HP and reduce Fatigue by 1",
    cooldown: 4,
    priority: 3,
    effects: [
      { heal: 10, target: "self" },
      { status: { fatigue: -1 }, target: "self" },
    ],
  },
  {
    definitionId: "heal_emergency_restore",
    name: "Emergency Restore",
    type: "heal",
    desc: "Restore 20 HP, user gains Fatigue +1",
    cooldown: 4,
    priority: 3,
    effects: [
      { heal: 20, target: "self" },
      { status: { fatigue: 1 }, target: "self" },
    ],
  },
];
