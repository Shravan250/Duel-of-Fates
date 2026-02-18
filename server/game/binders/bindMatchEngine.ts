import { useMatchStore } from "@/store/useMatchStore";
import { matchEngine } from "../index";

export interface matchEngineController {
  unsubscribe: () => void;
  startMatch: () => void;
  pauseMatch: () => void
  resumeMatch: () => void
}

export function bindMatchEngine(): matchEngineController {
  const unsubscribe = matchEngine.subscribe(() => {
    const state = matchEngine.getState();

    useMatchStore.setState({
      timer: state.timer,
      phase: state.phase,
      currentTurn: state.currentTurn,
      isMatchOver: state.isMatchOver,
      winner: state.winner,
      canSelectCard: state.canSelectCard,
      isPaused: state.isPaused,
    });
  });

  return {
    startMatch: () => {
      console.log("Starting Match....");
      matchEngine.startMatch();
    },

    unsubscribe: () => {
      console.log("Controller: Unsubscribing from engine");
      unsubscribe();
    },

    pauseMatch: () => {
      console.log("Pausing Match....");
      matchEngine.pause();
    },

    resumeMatch: () => {
      console.log("Resuming Match....");
      matchEngine.resume();
    },
  };
}
