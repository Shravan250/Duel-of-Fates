"use client";

import { useState } from "react";
import { useCardLibraryStore } from "@/store/useCardsLibraryStore";
import LibraryCard from "./LibraryCard";
import CardDetailsOverlay from "./CardDetailsOverlay";
import { CardDefination } from "@/types";
import { CircleChevronRight } from "lucide-react";
import { CircleChevronLeft } from "lucide-react";

interface Props {
  onClose: () => void;
}

const CARDS_PER_PAGE = 8;

const CardsLibrary = ({ onClose }: Props) => {
  const cards = useCardLibraryStore((s) => s.cards);

  const [page, setPage] = useState(0);
  const [selectedCard, setSelectedCard] = useState<CardDefination | null>(null);

  const start = page * CARDS_PER_PAGE;
  const visibleCards = cards.slice(start, start + CARDS_PER_PAGE);
  const totalPages = Math.ceil(cards.length / CARDS_PER_PAGE);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute inset-0 bg-black/50" />

      <div
        className="relative w-full h-full bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/grimore.png')" }}
      >
        <div className="w-2/3 h-screen mx-auto flex items-center justify-around">
          <div className="w-full flex flex-row gap-8">
            {/* Left */}
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              className="text-yellow-700 text-4xl">
              <CircleChevronLeft />
            </button>


            <div className="grid grid-cols-4 grid-rows-2 gap-8">
              {visibleCards.map((card) => (
                <LibraryCard
                  key={card.definitionId}
                  card={card}
                  onClick={() => setSelectedCard(card)}
                />
              ))}
            </div>
            {/* Right */}
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              className="text-yellow-700 text-4xl"
            >
              <CircleChevronRight />
            </button>
          </div>
        </div>

        {selectedCard && (
          <CardDetailsOverlay
            card={selectedCard}
            onClose={() => setSelectedCard(null)}
          />
        )}
      </div>
    </div>
  );
};

export default CardsLibrary;
