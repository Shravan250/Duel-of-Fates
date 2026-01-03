import { matchEngineController } from "@/game/binders/bindMatchEngine";
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

  // controller
  matchController: matchEngineController | null;

  //actions
  bindMatchController: (controller: matchEngineController | null) => void;
  selectCard: (card: CardProps, side: "PLAYER" | "OPPONENT") => void;
  startMatch: () => void;
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
  matchController: null,

  // bind Controller
  bindMatchController: (controller) => {
    set({ matchController: controller });
  },

  // public Actions
  startMatch: () => {
    const { matchController } = get();

    if (!matchController) {
      console.log("matchController not Bound");
      return;
    }

    matchController.startMatch();
  },

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
