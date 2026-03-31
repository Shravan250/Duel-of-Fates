import { CardDefination } from "@/types";
import { create } from "zustand";

interface CardLibraryState {
  cards: CardDefination[];

  setCards: (cards: CardDefination[]) => void;
}

export const useCardLibraryStore = create<CardLibraryState>((set) => ({
  cards: [],

  setCards: (cards) => set({ cards }),
}));
