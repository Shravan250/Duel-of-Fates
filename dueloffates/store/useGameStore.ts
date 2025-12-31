import { PlayerSide } from "@/context/CardsContext";
import { CardDefination, CardInstance, CardProps } from "@/types";
import { create } from "zustand";

interface GameStoreState {
  playerDeck: CardDefination[];
  opponentDeck: CardDefination[];
  playerInstance: CardInstance[];
  opponentInstance: CardInstance[];
  playerCards: CardProps[];
  opponentCards: CardProps[];
  playerSelectedCard: CardProps | undefined;
  opponentSelectedCard: CardProps | undefined;
  selectCard: (card: CardProps, side: PlayerSide) => void;
  initializeDeck: () => void;
  resetDeck: () => void;
}

export const useGameStore = create<GameStoreState>((set, get) => ({
  playerDeck: [],
  opponentDeck: [],
  playerInstance: [],
  opponentInstance: [],
  playerCards: [],
  opponentCards: [],
  playerSelectedCard: undefined,
  opponentSelectedCard: undefined,
  selectCard: (card, side) => {
    if (side === "PLAYER") {
      set(({ playerSelectedCard }) => ({
        playerSelectedCard: playerSelectedCard === card ? undefined : card,
      }));
    } else {
      set(({ opponentSelectedCard }) => ({
        opponentSelectedCard: opponentSelectedCard === card ? undefined : card,
      }));
    }
  },
  initializeDeck: () => {},
  resetDeck: () => {},
}));
