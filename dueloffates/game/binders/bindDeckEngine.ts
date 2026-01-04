import { useGameStore } from "@/store/useGameStore";
import { deckEngine } from "../index";

export interface DeckController {
  resetGame: () => void;
  unsubscribe: () => void;
  selectCard: (instanceId: string, side: "PLAYER" | "OPPONENT") => void;
  canPlayCard: (instanceId: string, side: "PLAYER" | "OPPONENT") => boolean;
}

export function bindDeckEngine(): DeckController {
  const unsubscribe = deckEngine.subscribe(() => {
    const state = deckEngine.getState();
    const store = useGameStore.getState();

    store.setAutoSelectedPlayerCard(state.selectedPlayerCard!);
    store.setAutoSelectedOpponentCard(state.selectedOpponentCard!);
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

    selectCard: (instanceId, side) => {
      deckEngine.selectCard(instanceId, side);
    },

    canPlayCard: (instanceId, side) => {
      return deckEngine.canPlayCard(instanceId, side);
    },

    unsubscribe: () => {
      console.log("Controller: Unsubscribing from engine");
      unsubscribe();
    },
  };
}
