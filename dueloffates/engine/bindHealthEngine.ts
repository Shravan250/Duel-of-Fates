import { useHealthEngineStore } from "@/store/useHealthEngineStore";
import { healthEngine } from "./index";

export function bindHealthEngine() {
  return healthEngine.subscribe(() => {
    useHealthEngineStore.getState().setHp(healthEngine.getHp());
  });
}
