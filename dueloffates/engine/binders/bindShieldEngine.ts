import { useShieldEngineStore } from "@/store/useShieldEngineStore";
import { shieldEngine } from "../index";

export function bindShieldEngine() {
  return shieldEngine.subscribe(() => {
    useShieldEngineStore.getState().setShield(shieldEngine.getShield());
  });
}
