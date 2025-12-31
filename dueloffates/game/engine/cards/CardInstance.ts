import { createCardInstances, deckRandomizer } from "@/lib/helper";
import { CardInstance } from "@/types";

export const playerDeck = deckRandomizer();
export const opponentDeck = deckRandomizer();

const playerInstances = createCardInstances(playerDeck, "PLAYER");
const opponentInstances = createCardInstances(opponentDeck, "OPPONENT");

// export const cardInstances: CardInstance[] =
