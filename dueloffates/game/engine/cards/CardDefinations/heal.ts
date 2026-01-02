import { CardDefination } from "@/types";

export const healCards: CardDefination[] = [
  {
    definitionId: "heal_recover",
    name: "Recover",
    type: "heal",
    effect: "Restores 10 HP",
    health_gain: 10,
    cooldown: 2,
    priority: 3,
  },
  {
    definitionId: "heal_second_wind",
    name: "Second Wind",
    type: "heal",
    effect: "Restore 15 HP if HP is below 50",
    health_gain: 15,
    condition: "userHp < 50",
    cooldown: 3,
    priority: 3,
  },
  {
    definitionId: "heal_purifying_heal",
    name: "Purifying Heal",
    type: "heal",
    effect: "Restore 10 HP and reduce Fatigue by 1",
    health_gain: 10,
    cooldown: 4,
    priority: 3,
  },
  {
    definitionId: "heal_emergency_restore",
    name: "Emergency Restore",
    type: "heal",
    effect: "Restore 20 HP, user gains Fatigue +1",
    health_gain: 20,
    cooldown: 4,
    priority: 3,
  },
];
