import { formatTurnLogs } from "@/lib/battleLogFormatter";
import { RawLogEvent, TurnLog } from "@/types/battleLogs";
import { create } from "zustand";

export const useLogStore = create<{
  currentTurn: number;
  currentTurnEvents: RawLogEvent[];
  completedTurns: TurnLog[];
  addEvent: (event: RawLogEvent) => void;
  finalizeTurn: () => void;
  clearLogs: () => void;
}>((set, get) => ({
  currentTurn: 1,
  currentTurnEvents: [],
  completedTurns: [],

  addEvent: (event: RawLogEvent) => {
    set((state) => ({
      currentTurnEvents: [...state.currentTurnEvents, event],
    }));
  },

  finalizeTurn: () => {
    const { currentTurn, currentTurnEvents } = get();
    const formattedMessages = formatTurnLogs(currentTurnEvents, currentTurn);

    const turnLog: TurnLog = {
      turnNumber: currentTurn,
      rawEvents: currentTurnEvents,
      formattedMessages,
    };

    set((state) => ({
      completedTurns: [...state.completedTurns, turnLog],
      currentTurn: state.currentTurn + 1,
      currentTurnEvents: [],
    }));
  },

  clearLogs: () => {
    set({
      currentTurn: 1,
      currentTurnEvents: [],
      completedTurns: [],
    });
  },
}));
