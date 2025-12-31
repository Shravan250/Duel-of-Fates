import { attackCards } from "./attack";
import { defenceCards } from "./defence";
import { healCards } from "./heal";
import { buffDebuffCards } from "./buffdebuff";
import { statusDamage } from "./statusDamage";
import { utilityCards } from "./utility";

export {
  attackCards,
  defenceCards,
  healCards,
  buffDebuffCards,
  statusDamage,
  utilityCards,
};

export const priority={
  0:"low",
  1:"medium",
  2:"high",
  3:"immediate"
}

// 3 everycard except attack def