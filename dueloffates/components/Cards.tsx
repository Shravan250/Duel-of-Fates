import { useMatchStore } from "@/store/useMatchStore";
import { CardProps } from "@/types";
import { Icon } from "@iconify/react";
import clsx from "clsx";

interface Cards2Props {
  card: CardProps;
  side?: "PLAYER" | "OPPONENT";
  battleArea?: boolean;
}

const styles = {
  attack: "card-attack",
  defense: "card-defense",
  buff: "card-buff",
  debuff: "card-buff",
  heal: "card-heal",
  utility: "card-neutral",
  "status damage": "card-poison",
};

const Cards = ({ card, side, battleArea = false }: Cards2Props) => {
  const { header, icon, effect, type, onCooldown, userCards } = card;
  const { selectCard } = useMatchStore();

  return (
    <div className="relative group">
      <div
        className={clsx(
          "card flex flex-col justify-around items-center text-center cursor-pointer transition-transform hover:scale-105",
          userCards ? "border-2 bg-white border-gray-400" : " bg-gray-800 ",
          battleArea ? "card-selected" : "rounded",
          styles[type],
          {
            "on-cooldown": onCooldown,
          }
        )}
        onClick={() => side && selectCard(card, side)}
      >
        <h2>{header}</h2>
        <Icon icon={icon} width={50} height={50} className="shrink-0" />
      </div>

      {/* Hover Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 bg-gray-900 text-white text-sm rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none z-50">
        {/* Arrow */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
          <div className="border-8 border-transparent border-t-gray-900"></div>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <div className="font-bold text-base border-b border-gray-700 pb-1">
            {header}
          </div>

          <div>
            <span className="text-gray-400">Type:</span>
            <span className="capitalize">{type}</span>
          </div>

          <div>
            <span className="text-gray-400">Effect:</span> <span>{effect}</span>
          </div>

          <div>
            <span className="text-gray-400">Status:</span>
            <span className={onCooldown ? "text-red-400" : "text-green-400"}>
              {onCooldown ? "On Cooldown" : "Ready"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
