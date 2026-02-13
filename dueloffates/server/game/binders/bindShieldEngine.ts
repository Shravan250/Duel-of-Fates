import { useShieldStore } from "@/store/useShieldStore";
import { shieldEngine } from "../index";

interface shieldEngineController {
  resetShield: () => void;
  unsubscribe: () => void;
}

export function bindShieldEngine(): shieldEngineController {
  const unsubscribe = shieldEngine.subscribe(() => {
    const state = shieldEngine;
    const store = useShieldStore.getState();

    store.setShield(state.getShield());
  });
  return {
    resetShield: () => {
      console.log("Controller: Resetting shield...");
      shieldEngine.reset(100);
    },
    unsubscribe: () => {
      console.log("Shield Controller: Unsubscribing from engine");
      unsubscribe();
    },
  };
}
