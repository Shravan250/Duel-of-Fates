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

  // selection
  selectedPlayerCard: CardProps | null;
  selectedOpponentCard: CardProps | null;

  // Game status
  isGameInitialized: boolean;

  // returned by binders
  deckController: DeckController | null;

  // Internal Setters (Called by binders)
  setPlayerDeck: (d: CardDefination[]) => void;
  setOpponentDeck: (d: CardDefination[]) => void;
  setPlayerInstances: (i: CardInstance[]) => void;
  setOpponentInstances: (i: CardInstance[]) => void;
  setAutoSelectedPlayerCard: (cardId: string) => void;
  setAutoSelectedOpponentCard: (cardId: string) => void;

  // public actions (called by UI)
  bindDeckController: (controller: DeckController) => void;
  selectCard: (card: CardProps, side: "PLAYER" | "OPPONENT") => void;
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
  selectedPlayerCard: null,
  selectedOpponentCard: null,
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

  setAutoSelectedPlayerCard: (cardId: string) => {
    const card = get().playerCards.find((c) => c.instanceId === cardId);
    set({
      selectedPlayerCard: card,
    });
  },

  setAutoSelectedOpponentCard: (cardId: string) => {
    const card = get().opponentCards.find((c) => c.instanceId === cardId);
    set({
      selectedOpponentCard: card,
    });
  },

  // bind Controller
  bindDeckController: (controller) => {
    set({ deckController: controller });
  },

  resetGame: () => {
    const { deckController } = get();

    if (!deckController) {
      console.log("DeckEngine not Bound");
      return;
    }

    deckController.resetGame();
    set({
      selectedPlayerCard: undefined,
      selectedOpponentCard: undefined,
    });
  },

  selectCard: (card: CardProps, side) => {
    const controller = get().deckController;
    if (!controller) return;

    controller.selectCard(card.instanceId, side);

    if (side === "PLAYER") {
      set({ selectedPlayerCard: card });
    } else {
      set({ selectedOpponentCard: card });
    }
  },
}));
