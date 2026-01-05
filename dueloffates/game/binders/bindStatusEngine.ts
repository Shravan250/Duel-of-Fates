import { useStatusStore } from "@/store/useStatusStore";
import { statusEngine } from "../index";

interface statusEngineController {
  unsubscribe: () => void;
}

export function bindStatusEngine(): statusEngineController {
  const unsubscribe = statusEngine.subscribe(() => {
    const state = statusEngine;
    const store = useStatusStore.getState();

    store.setState(state.getState());
  });
  return {
    unsubscribe: () => {
      console.log("Controller: Unsubscribing from engine");
      unsubscribe();
    },
  };
}
