import { create } from "zustand";

interface PlayerShieldState {
  shield: number;
  setShield: (shield: number) => void;
}

export const useShieldStore = create<PlayerShieldState>((set) => ({
  shield: 50,
  setShield: (shield) => set({ shield }),
}));
