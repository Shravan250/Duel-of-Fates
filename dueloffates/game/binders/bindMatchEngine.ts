import { useMatchStore } from "@/store/useMatchStore";
import { matchEngine } from "../index";

export interface matchEngineController {
  selectCard: (instanceId: string, side: "PLAYER" | "OPPONENT") => void;
  unsubscribe: () => void;
  startMatch: () => void;
}

export function bindMatchEngine(): matchEngineController {
  const unsubscribe = matchEngine.subscribe(() => {
    const state = matchEngine.getState();

    useMatchStore.setState({
      phase: state.phase,
      currentTurn: state.currentTurn,
      isMatchOver: state.isMatchOver,
      winner: state.winner,
      canSelectCard: state.canSelectCard,
    });
  });

  return {
    startMatch: () => {
      console.log("Starting Match....");
      matchEngine.startMatch();
    },

    selectCard: (instanceId, side) => {
      matchEngine.selectCard(instanceId, side);
    },

    unsubscribe: () => {
      console.log("Controller: Unsubscribing from engine");
      unsubscribe();
    },
  };
}
