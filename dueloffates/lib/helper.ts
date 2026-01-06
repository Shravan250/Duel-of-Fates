import { CardDefination, CardInstance, CardProps } from "@/types";
import {
  attackCards,
  defenceCards,
  healCards,
  buffDebuffCards,
  statusDamage,
  utilityCards,
} from "../game/engine/cards/CardDefinations";

/*  ---------------------------------------------------
    1. Total 10 cards
    2. Atleast 3 attack cards, 2 defence cards , 1 heal cards
    --------------------------------------------------- */
export function deckRandomizer() {
  const deck: CardDefination[] = [];
  let attackCardsCopy: CardDefination[] = shuffleArray([...attackCards]);
  let defenceCardsCopy: CardDefination[] = shuffleArray([...defenceCards]);
  let healCardsCopy: CardDefination[] = shuffleArray([...healCards]);
  let restCardsCopy: CardDefination[] = shuffleArray([
    ...[...buffDebuffCards],
    ...[...statusDamage],
    ...[...utilityCards],
  ]);

  //3 attack
  deck.push(...attackCardsCopy.splice(0, 3));

  //2 defence
  deck.push(...defenceCardsCopy.splice(0, 2));

  //1 heal
  deck.push(...healCardsCopy.splice(0, 1));

  //rest
  deck.push(...restCardsCopy.splice(0, 4));

  return deck;
}

// function getEffect(card: CardDefination): string {
//   switch (card.type.toLocaleLowerCase()) {
//     case "attack":
//       return `${card.damage ?? 0} Damage`;

//     case "defense":
//       return `${card.shield_gain ?? 0} Shield Gain`;

//     default:
//       return card.effect ?? "";
//   }
// }

export function createCardInstances(deck: CardDefination[], owner: string) {
  const cardInstances: CardInstance[] = deck.map(
    (card: CardDefination, i: number) => {
      return {
        id: `${owner}-${i}`,
        definitionId: card.definitionId,
        cooldown: 0,
        multiplier: card.multiplier,
        owner: owner as CardInstance["owner"],
      };
    }
  );

  return cardInstances;
}

export function formattedDeckGenerator(
  instances: CardInstance[],
  definitions: CardDefination[]
): CardProps[] {
  return instances.map((instance) => {
    const definition = definitions.find(
      (d) => d.definitionId === instance.definitionId
    );

    if (!definition) {
      throw new Error(`Card definition not found for ${instance.definitionId}`);
    }

    return {
      instanceId: instance.id,
      definitionId: definition.definitionId,
      header: definition.name,
      type: definition.type,
      icon: "mdi:sword",
      // effect: getEffect(definition),
      desc: definition.desc,
      cooldown: definition.cooldown,
      // onCooldown: instance.cooldown > 0,
      userCards: instance.owner === "PLAYER",
    };
  });
}

function shuffleArray(array: CardDefination[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// function random(limit: number) {
//   return Math.floor(Math.random() * limit);
// }
