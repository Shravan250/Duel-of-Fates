import { create } from "zustand";

export interface DebugEvent {
  id: string;
  side: "player" | "opponent";
  type:
    | "damage"
    | "heal"
    | "shield"
    | "poison"
    | "fatigue"
    | "buff"
    | "debuff"
    | "utility";
  message: string;
  value?: number;
  timestamp: number;
}

interface DebugStoreState {
  events: DebugEvent[];
  isDebugEnabled: boolean;

  addEvent: (event: Omit<DebugEvent, "id" | "timestamp">) => void;
  clearEvents: () => void;
  toggleDebug: () => void;
}

export const useDebugStore = create<DebugStoreState>((set, get) => ({
  events: [],
  isDebugEnabled: true, // Set to false to disable all debug features

  addEvent: (event) => {
    if (!get().isDebugEnabled) return;

    const newEvent: DebugEvent = {
      ...event,
      id: `${event.side}-${Date.now()}-${Math.random()}`,
      timestamp: Date.now(),
    };

    set((state) => ({
      events: [...state.events, newEvent],
    }));

    // Auto-clear after 3 seconds
    setTimeout(() => {
      set((state) => ({
        events: state.events.filter((e) => e.id !== newEvent.id),
      }));
    }, 3000);
  },

  clearEvents: () => set({ events: [] }),

  toggleDebug: () =>
    set((state) => ({ isDebugEnabled: !state.isDebugEnabled })),
}));
