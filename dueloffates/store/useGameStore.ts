import { CardProps } from "@/types";
import { create } from "zustand";

interface GameStoreState {
  // UI cards
  playerCards: CardProps[];
  opponentCards: CardProps[];

  // player selected cards
  selectedPlayerCard: string | null;
  selectedOpponentCard: string | null;

  //setter
  setGameState: (state: {
    player: CardProps[];
    opponent: CardProps[];
    selectedPlayerCard: string | null;
    selectedOpponentCard: string | null;
  }) => void;
  setRole: (role: "PLAYER" | "OPPONENT") => void;

  // player role
  role: "PLAYER" | "OPPONENT" | null;

  //reste
  reset: () => void;
}

export const useGameStore = create<GameStoreState>((set) => ({
  playerCards: [],
  opponentCards: [],
  selectedPlayerCard: null,
  selectedOpponentCard: null,
  role: null,

  setGameState: (state) =>
    set(() => {
      const selectedPlayer =
        state.player.find((c) => c.instanceId === state.selectedPlayerCard) ||
        null;

      const selectedOpponent =
        state.opponent.find(
          (c) => c.instanceId === state.selectedOpponentCard,
        ) || null;

      return {
        playerCards: state.player,
        opponentCards: state.opponent,
        selectedPlayerCard: selectedPlayer,
        selectedOpponentCard: selectedOpponent,
      };
    }),

  setRole: (role) => set({ role }),

  reset: () =>
    set({
      playerCards: [],
      opponentCards: [],
      selectedPlayerCard: null,
      selectedOpponentCard: null,
    }),
}));
