import { create } from "zustand";

export type getterResponse = { player: number; opponent: number };

interface PlayerShieldState {
  playerShield: number;
  opponentShield: number;
  setShield: (res: getterResponse) => void;
}

export const useShieldStore = create<PlayerShieldState>((set) => ({
  playerShield: 50,
  opponentShield: 50,
  setShield: (res) =>
    set({ playerShield: res.player, opponentShield: res.opponent }),
}));
