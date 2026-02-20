import { create } from "zustand";

interface PlayerHPState {
  playerHp: number;
  opponentHp: number;
  maxHp: number;

  setHealthState: (res: {
    player: number;
    opponent: number;
    max: number;
  }) => void;
}

export const useHealthStore = create<PlayerHPState>((set) => ({
  playerHp: 100,
  opponentHp: 100,
  maxHp: 100,

  setHealthState: (res) =>
    set({ playerHp: res.player, opponentHp: res.opponent, maxHp: res.max }),
}));
