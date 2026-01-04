import { StatusState } from "@/game/engine/status/StatusEngine";
import { create } from "zustand";

interface StatusEffectState {
  player: StatusState;
  opponent: StatusState;
  setState: (state: Record<"player" | "opponent", StatusState>) => void;
}

export const useStatusStore = create<StatusEffectState>((set, get) => ({
  player: { poison: 0, fatigue: 0 },
  opponent: { poison: 0, fatigue: 0 },
  setState: (state) =>
    set({
      player: state.player,
      opponent: state.opponent,
    }),
}));
