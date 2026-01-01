import { PlayerSide } from "@/context/CardsContext";
import { DeckController } from "@/game/binders/bindDeckEngine";
import { formattedDeckGenerator } from "@/lib/helper";
import { CardDefination, CardInstance, CardProps } from "@/types";
import { create } from "zustand";

interface GameStoreState {
  // Deck data
  playerDeck: CardDefination[];
  opponentDeck: CardDefination[];
  playerInstances: CardInstance[];
  opponentInstances: CardInstance[];

  // UI formatted cards
  playerCards: CardProps[];
  opponentCards: CardProps[];

  // Selected cards
  playerSelectedCard: CardProps | undefined;
  opponentSelectedCard: CardProps | undefined;

  // Game status
  isGameInitialized: boolean;

  // returned by binders
  deckController: DeckController | null;

  // Internal Setters (Called by binders)
  setPlayerDeck: (d: CardDefination[]) => void;
  setOpponentDeck: (d: CardDefination[]) => void;
  setPlayerInstances: (i: CardInstance[]) => void;
  setOpponentInstances: (i: CardInstance[]) => void;

  // public actions (called by UI)
  bindDeckController: (controller: DeckController) => void;
  initializeGame: () => void;
  resetGame: () => void;
}

export const useGameStore = create<GameStoreState>((set, get) => ({
  //initial states
  playerDeck: [],
  opponentDeck: [],
  playerInstances: [],
  opponentInstances: [],
  playerCards: [],
  opponentCards: [],
  playerSelectedCard: undefined,
  opponentSelectedCard: undefined,
  isGameInitialized: false,
  deckController: null,

  //internal Setters
  setPlayerDeck: (d) => set({ playerDeck: d }),
  setOpponentDeck: (d) => set({ opponentDeck: d }),

  setPlayerInstances: (i) => {
    const defs = get().playerDeck;
    set({
      playerInstances: i,
      playerCards: formattedDeckGenerator(i, defs),
    });
  },
  setOpponentInstances: (i) => {
    const defs = get().opponentDeck;
    set({
      opponentInstances: i,
      opponentCards: formattedDeckGenerator(i, defs),
    });
  },

  // bind Controller
  bindDeckController: (controller) => {
    set({ deckController: controller });
  },

  initializeGame: () => {
    const { deckController } = get();

    if (!deckController) {
      console.log("DeckENgine not Bound");
      return;
    }

    deckController.initializeGame();
    set({ isGameInitialized: true });
  },

  resetGame: () => {
    const { deckController } = get();

    if (!deckController) {
      console.log("DeckENgine not Bound");
      return;
    }

    deckController.resetGame();
    set({
      playerSelectedCard: undefined,
      opponentSelectedCard: undefined,
    });
  },
}));
