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
  selectCard: (card: CardProps, side: PlayerSide) => void;
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
  setPlayerDeck: (d) =>
    set({ playerDeck: d, playerCards: formattedDeckGenerator(d) }),
  setOpponentDeck: (d) =>
    set({ opponentDeck: d, opponentCards: formattedDeckGenerator(d) }),

  setPlayerInstances: (i) => set({ playerInstances: i }),
  setOpponentInstances: (i) => set({ opponentInstances: i }),

  // bind Controller
  bindDeckController: (controller) => {
    set({ deckController: controller });
  },

  // public Actions
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
