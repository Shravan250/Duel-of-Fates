import {
  attackCards,
  defenceCards,
  healCards,
  buffDebuffCards,
  statusDamage,
  utilityCards,
} from "../cards/index";

interface CardProps {
  header: string;
  icon: string;
  effect: string;
  type: "attack" | "defense" | "buff" | "neutral" | "poison";
  onCooldown: boolean;
  userCards: boolean;
}

const restCatogery = [buffDebuffCards, statusDamage, utilityCards];
/*  ---------------------------------------------------
    1. Total 10 cards
    2. Atleast 3 attack cards, 2 defence cards , 1 heal cards
    --------------------------------------------------- */
export function deckRandomizer() {
  const deck: any = [];

  //3 attack
  for (let i = 0; i < 3; i++) {
    deck.push(attackCards[random(attackCards.length)]);
  }

  //2 defence
  for (let i = 0; i < 2; i++) {
    deck.push(defenceCards[random(defenceCards.length)]);
  }

  //1 heal
  for (let i = 0; i < 1; i++) {
    deck.push(healCards[random(healCards.length)]);
  }

  //rest
  for (let i = 0; i < 4; i++) {
    const category = restCatogery[random(restCatogery.length)];
    deck.push(category[random(category.length)]);
  }
  console.log(deck);
  return deck;
}

function random(limit: number) {
  return Math.floor(Math.random() * limit);
}
