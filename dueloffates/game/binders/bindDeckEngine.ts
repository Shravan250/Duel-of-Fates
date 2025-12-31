import { deckEngine } from "../index";

export function bindDeckEngine() {
  return deckEngine.subscribe(() => {
    // useHealthStore.getState().setHp(healthEngine.getHp());
  });
}
