import { create } from "zustand";

export type getterResponse = { player: number; opponent: number; max: number };

interface PlayerShieldState {
  playerShield: number;
  opponentShield: number;
  maxShield: number;

  setShieldState: (res: {
    player: number;
    opponent: number;
    max: number;
  }) => void;
}

export const useShieldStore = create<PlayerShieldState>((set) => ({
  playerShield: 50,
  opponentShield: 50,
  maxShield: 50,

  setShieldState: (res) =>
    set({
      playerShield: res.player,
      opponentShield: res.opponent,
      maxShield: res.max,
    }),
}));
