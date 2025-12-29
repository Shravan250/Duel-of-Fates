// Helper to determine type mapping based on source data
// Attack -> attack, Defense -> defense, Buff/Debuff -> buff,
// Status Damage -> poison, Heal/Utility -> neutral

import { CardProps } from "@/types";


export const userCards: CardProps[] = [
  {
    header: "Quick Attack",
    icon: "mdi:sword",
    effect: "8 dmg (1x)",
    type: "attack",
    onCooldown: false,
    userCards: true,
  }, // [cite: 9]
  {
    header: "Precise Strike",
    icon: "mdi:target",
    effect: "10 dmg (2x if no Shield)",
    type: "attack",
    onCooldown: false,
    userCards: true,
  }, // [cite: 11, 12]
  {
    header: "Heavy Blow",
    icon: "mdi:hammer",
    effect: "16 dmg + Fatigue +1",
    type: "attack",
    onCooldown: true,
    userCards: true,
  }, // [cite: 14, 15]
  {
    header: "Guard",
    icon: "mdi:shield",
    effect: "8 Shield",
    type: "defense",
    onCooldown: false,
    userCards: true,
  }, // [cite: 33]
  {
    header: "Brace",
    icon: "mdi:shield-check",
    effect: "10 Shield, Fatigue -1",
    type: "defense",
    onCooldown: false,
    userCards: true,
  }, // [cite: 38, 39]
  {
    header: "Battle Focus",
    icon: "mdi:lightning-bolt",
    effect: "Next Attack +1x",
    type: "buff",
    onCooldown: false,
    userCards: true,
  }, // [cite: 51]
  {
    header: "Recover",
    icon: "mdi:heart-plus",
    effect: "Restores 10 HP",
    type: "utility",
    onCooldown: false,
    userCards: true,
  }, //
  {
    header: "Poison Infusion",
    icon: "mdi:skull",
    effect: "Apply Poison +2",
    type: "status damage",
    onCooldown: false,
    userCards: true,
  }, // [cite: 74]
  {
    header: "Reversal",
    icon: "mdi:swap-horizontal",
    effect: "Transfer Stacks to Foe",
    type: "utility",
    onCooldown: false,
    userCards: true,
  }, // [cite: 83]
  {
    header: "Crushing Strike",
    icon: "mdi:mace",
    effect: "12 dmg (1.3x vs Shield)",
    type: "attack",
    onCooldown: false,
    userCards: true,
  }, // [cite: 17, 18]
];

export const OpponentCards: CardProps[] = [
  {
    header: "All-In Strike",
    icon: "mdi:sword-cross",
    effect: "20 dmg + Fatigue +2",
    type: "attack",
    onCooldown: false,
    userCards: false,
  }, // [cite: 28, 30]
  {
    header: "Relentless Slash",
    icon: "mdi:knife-military",
    effect: "9 dmg (High Priority)",
    type: "attack",
    onCooldown: false,
    userCards: false,
  }, // [cite: 20]
  {
    header: "Exhausting Strike",
    icon: "mdi:sleep",
    effect: "7 dmg + Fatigue +1",
    type: "attack",
    onCooldown: false,
    userCards: false,
  }, // [cite: 22, 24]
  {
    header: "Reinforced Guard",
    icon: "mdi:shield-plus",
    effect: "12 Shield",
    type: "defense",
    onCooldown: false,
    userCards: false,
  }, // [cite: 35, 36]
  {
    header: "Iron Stance",
    icon: "mdi:shield-lock",
    effect: "10 Shield + Fatigue +1",
    type: "defense",
    onCooldown: true,
    userCards: false,
  }, // [cite: 46, 48]
  {
    header: "Weaken",
    icon: "mdi:trending-down",
    effect: "Foe Atk -40%",
    type: "buff",
    onCooldown: false,
    userCards: false,
  }, // [cite: 57]
  {
    header: "Second Wind",
    icon: "mdi:leaf",
    effect: "Restore 15 HP (if <50)",
    type: "utility",
    onCooldown: false,
    userCards: false,
  }, //
  {
    header: "Corrosion",
    icon: "mdi:bottle-tonic-skull",
    effect: "+1 Poison, +1 Fatigue",
    type: "status damage",
    onCooldown: false,
    userCards: false,
  }, // [cite: 78]
  {
    header: "Swap",
    icon: "mdi:sync",
    effect: "Swap HP and Shield",
    type: "utility",
    onCooldown: false,
    userCards: false,
  }, // [cite: 85]
  {
    header: "Adrenaline Rush",
    icon: "mdi:run-fast",
    effect: "Reduce Cooldown 2 Turns",
    type: "buff",
    onCooldown: false,
    userCards: false,
  }, // [cite: 55]
];
