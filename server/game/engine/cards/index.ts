import {
  attackCards,
  buffDebuffCards,
  defenceCards,
  healCards,
  statusDamage,
  utilityCards,
} from "./CardDefinations";

export const allCards = [
  ...attackCards,
  ...defenceCards,
  ...healCards,
  ...buffDebuffCards,
  ...statusDamage,
  ...utilityCards,
];
