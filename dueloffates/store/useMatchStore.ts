import { CardProps } from "@/types";
import { create } from "zustand";

type MatchPhase = "SETUP" | "PLAY" | "RESOLVE" | "END";

interface MatchStoreState {
  phase: MatchPhase;
  currentTurn: number;
  isMatchOver: boolean;
  winner: "PLAYER" | "OPPONENT" | null;

  // selection
  selectedPlayerCard: CardProps | null;
  selectedOpponentCard: CardProps | null;

  // permissoin
  canSelectCard: boolean;
  canPlay: boolean;

  // controller
  matchController: MatchController | null;

  //actions
  bindMatchController: (controller: MatchController | null) => void;
  selectCard: (card: CardProps, side: "PLAYER" | "OPPONENT") => void;
}

export const useMatchStore = create<MatchStoreState>((set, get) => ({
  // initial state
  phase: "SETUP",
  currentTurn: 0,
  isMatchOver: false,
  winner: null,
  selectedPlayerCard: null,
  selectedOpponentCard: null,
  canSelectCard: false,
  canPlay: false,
  matchController: null,

  // bind Controller
  bindMatchController: (controller) => {
    set({ matchController: controller });
  },

  // public Actions
  selectCard: (card: CardProps, side) => {
    const controller = get().matchController;
    if (!controller) return;

    controller.selectCard(card.instanceId, side);

    if (side === "PLAYER") {
      set({ selectedPlayerCard: card });
    } else {
      set({ selectedOpponentCard: card });
    }
  },
}));
