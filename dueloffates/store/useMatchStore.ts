import { create } from "zustand";

type MatchPhase = "SETUP" | "PLAY" | "RESOLVE" | "END";

interface MatchStoreState {
  phase: MatchPhase;
  currentTurn: number;
  isMatchOver: boolean;
  winner: "PLAYER" | "OPPONENT" | "DRAW" | null;
  timer: number;
  isPaused: boolean;
  canSelectCard: boolean;

  setMatchState: (state: {
    phase: MatchPhase;
    currentTurn: number;
    isMatchOver: boolean;
    winner: "PLAYER" | "OPPONENT" | null;
    timer: number;
    isPaused: boolean;
    canSelectCard: boolean;
  }) => void;

  setWinner: (winner: "PLAYER" | "OPPONENT" | "DRAW" | null) => void;

  reset: () => void;
}

export const useMatchStore = create<MatchStoreState>((set) => ({
  phase: "SETUP",
  currentTurn: 0,
  isMatchOver: false,
  winner: null,
  timer: 15,
  isPaused: false,
  canSelectCard: false,

  setMatchState: (state) => set(state),

  setWinner: (winner) => set({ winner }),

  reset: () =>
    set({
      phase: "SETUP",
      currentTurn: 0,
      isMatchOver: false,
      winner: null,
      timer: 15,
      isPaused: false,
      canSelectCard: false,
    }),
}));
