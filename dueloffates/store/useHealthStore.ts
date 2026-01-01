import { create } from "zustand";
import { getterResponse } from "./useShieldStore";

interface PlayerHPState {
  playerHp: number;
  opponentHp: number;
  setHp: (res: getterResponse) => void;
}

export const useHealthStore = create<PlayerHPState>((set) => ({
  playerHp: 100,
  opponentHp: 100,
  setHp: (res) => set({ playerHp: res.player, opponentHp: res.opponent }),
}));
