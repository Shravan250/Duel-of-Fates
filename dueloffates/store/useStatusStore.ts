import { Modifiers } from "@/types";
import { create } from "zustand";

interface StatusState {
  poison: number;
  fatigue: number;
  modifiers: Modifiers;
}

interface StatusEffectState {
  player: StatusState;
  opponent: StatusState;

  setStatusState: (state: {
    player: StatusState;
    opponent: StatusState;
  }) => void;
}

export const useStatusStore = create<StatusEffectState>((set, get) => ({
  player: {
    poison: 0,
    fatigue: 0,
    modifiers: {
      nextAttackMultiplier: 1,
      incomingAttackMultiplier: 1,
      nextShieldMultiplier: 1,
      cooldownReduction: 0,
      halveShield: false,
    },
  },
  opponent: {
    poison: 0,
    fatigue: 0,
    modifiers: {
      nextAttackMultiplier: 1,
      incomingAttackMultiplier: 1,
      nextShieldMultiplier: 1,
      cooldownReduction: 0,
      halveShield: false,
    },
  },

  setStatusState: (state) =>
    set({
      player: state.player,
      opponent: state.opponent,
    }),
}));
