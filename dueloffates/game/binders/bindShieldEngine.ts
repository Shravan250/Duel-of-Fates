import { useShieldStore } from "@/store/useShieldStore";
import { shieldEngine } from "../index";

export function bindShieldEngine() {
  return shieldEngine.subscribe(() => {
    useShieldStore.getState().setShield(shieldEngine.getShield());
  });
}
