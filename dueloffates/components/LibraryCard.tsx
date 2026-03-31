"use client";

import { Icon } from "@iconify/react";
import clsx from "clsx";
import { CardDefination } from "@/types";

interface LibraryCardProps {
  card: CardDefination;
  onClick: () => void;
}

const styles = {
  attack: "card-attack",
  defense: "card-defense",
  buff: "card-buff",
  debuff: "card-buff",
  heal: "card-heal",
  utility: "card-neutral",
  status: "card-poison",
};

const LibraryCard = ({ card, onClick }: LibraryCardProps) => {
  return (
    <div className="relative group">
      <div
        onClick={onClick}
        className={clsx(
          "card flex flex-col justify-around items-center text-center cursor-pointer transition-transform hover:scale-105 rounded",
          styles[card.type],
        )}
      >
        <h3 className="text-sm font-bold">{card.name}</h3>

        <Icon icon="mdi:cards-outline" width={40} height={40} />
      </div>
    </div>
  );
};

export default LibraryCard;
