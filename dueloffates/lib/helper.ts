import { Card, CardProps } from "@/types";
import {
  attackCards,
  defenceCards,
  healCards,
  buffDebuffCards,
  statusDamage,
  utilityCards,
} from "../cards/index";

/*  ---------------------------------------------------
    1. Total 10 cards
    2. Atleast 3 attack cards, 2 defence cards , 1 heal cards
    --------------------------------------------------- */
export function deckRandomizer() {
  const deck: any = [];
  let attackCardsCopy = shuffleArray(attackCards);
  let defenceCardsCopy = shuffleArray(defenceCards);
  let healCardsCopy = shuffleArray(healCards);
  let restCardsCopy = shuffleArray([
    ...buffDebuffCards,
    ...statusDamage,
    ...utilityCards,
  ]);

  //3 attack
  deck.push(...attackCardsCopy.splice(0, 3));

  //2 defence
  deck.push(...defenceCardsCopy.splice(0, 2));

  //1 heal
  deck.push(...healCardsCopy.splice(0, 1));

  //rest
  deck.push(...restCardsCopy.splice(0, 4));

  // console.log(deck);
  const formattedDeck: CardProps[] = deck.map((card: Card) => {
    return {
      header: card.name,
      type: card.type.toLocaleLowerCase(),
      icon: "mdi:sword",
      effect: getEffect(card),
      onCooldown: false,
      userCards: true,
    };
  });
  // console.log(formattedDeck);
  return formattedDeck;
}

function getEffect(card: Card) {
  switch (card.type.toLocaleLowerCase()) {
    case "attack":
      return `${card.damage} Damage`;

    case "defense":
      return `${card.shield_gain} Shield Gain`;

    default:
      return card.effect;
  }
}



function shuffleArray(array: any) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// function random(limit: number) {
//   return Math.floor(Math.random() * limit);
// }
