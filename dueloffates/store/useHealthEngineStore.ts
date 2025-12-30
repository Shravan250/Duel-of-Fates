import { create } from "zustand";

interface PlayerHPState {
  hp: number;
  setHp: (hp: number) => void;
}

export const useHealthEngineStore = create<PlayerHPState>((set) => ({
  hp: 100,
  setHp: (hp) => set({ hp }),
}));
