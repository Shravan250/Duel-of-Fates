import { useGameStore } from "@/store/useGameStore";
import { deckEngine } from "../index";

export interface DeckController {
  resetGame: () => void;
  unsubscribe: () => void;
}

export function bindDeckEngine(): DeckController {
  const unsubscribe = deckEngine.subscribe(() => {
    const state = deckEngine.getState();
    const store = useGameStore.getState();

    store.setPlayerDeck(state.playerDeck);
    store.setOpponentDeck(state.opponentDeck);
    store.setPlayerInstances(state.playerInstances);
    store.setOpponentInstances(state.opponentInstances);
  });

  return {
    resetGame: () => {
      console.log("Controller: Resetting game...");
      deckEngine.resetCards();
    },

    unsubscribe: () => {
      console.log("Controller: Unsubscribing from engine");
      unsubscribe();
    },
  };
}
