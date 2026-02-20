import { RawLogEvent, TurnLog } from "@/types/battleLogs";
import { create } from "zustand";

export const useLogStore = create<{
  currentTurn: number;
  currentTurnEvents: RawLogEvent[];
  completedTurns: TurnLog[];
  setLogs: (logs: {
    currentTurn: number;
    currentTurnEvents: RawLogEvent[];
    completedTurns: TurnLog[];
  }) => void;
  clearLogs: () => void;
}>((set) => ({
  currentTurn: 1,
  currentTurnEvents: [],
  completedTurns: [],

  setLogs: (logs) => {
    set({
      currentTurn: logs.currentTurn,
      currentTurnEvents: logs.currentTurnEvents,
      completedTurns: logs.completedTurns,
    });
  },

  clearLogs: () => {
    set({
      currentTurn: 1,
      currentTurnEvents: [],
      completedTurns: [],
    });
  },
}));
