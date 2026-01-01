import { useMatchStore } from "@/store/useMatchStore";
import { matchEngine } from "../index";

interface matchEngineController {}

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
    selectCard: (instanceId: string, side: "PLAYER" | "OPPONENT") => {
      matchEngine.selectCard(instanceId, side);
    },

    unsubscribe: () => {
      console.log("Controller: Unsubscribing from engine");
      unsubscribe();
    },
  };
}
