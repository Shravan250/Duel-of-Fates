import { useHealthStore } from "@/store/useHealthStore";
import { healthEngine } from "../index";

export function bindHealthEngine() {
  return healthEngine.subscribe(() => {
    useHealthStore.getState().setHp(healthEngine.getHp());
  });
}
