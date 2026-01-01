import { useHealthStore } from "@/store/useHealthStore";
import { healthEngine } from "../index";

interface healthEngineController {
  resetHealth: () => void;
  unsubscribe: () => void;
}

export function bindHealthEngine(): healthEngineController {
  const unsubscribe = healthEngine.subscribe(() => {
    const state = healthEngine;
    const store = useHealthStore.getState();

    store.setHp(state.getHp());
  });

  return {
    resetHealth: () => {
      console.log("Controller: Resetting health...");
      healthEngine.reset(100);
    },
    unsubscribe: () => {
      console.log("Health Controller: Unsubscribing from engine");
      unsubscribe();
    },
  };
}
