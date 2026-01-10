import { useGameStore } from "@/store/useGameStore";
import Cards from "./Cards";
import { clsx } from "clsx";

interface RenderCardsProps {
  player: boolean;
}

type PlayerSide = "PLAYER" | "OPPONENT";

const lgColStartMap: Record<number, string> = {
  8: "lg:col-start-3",
  9: "lg:col-start-4",
  10: "lg:col-start-5",
  11: "lg:col-start-6",
};

//Define row positioning for opponent
const lgRowStartMap: Record<number, string> = {
  0: "lg:row-start-2",
  1: "lg:row-start-2",
  2: "lg:row-start-2",
  3: "lg:row-start-2",
  4: "lg:row-start-2",
  5: "lg:row-start-2",
  6: "lg:row-start-2",
  7: "lg:row-start-2",
};

export default function RenderCards({ player }: RenderCardsProps) {
  const { playerCards, opponentCards } = useGameStore();
  const cards = player ? playerCards : opponentCards;
  const side: PlayerSide = player ? "PLAYER" : "OPPONENT";
  const keyPrefix = player ? "player" : "opp";

  return (
    <div className="relative">
      <div
        className={clsx(
          "grid grid-cols-5 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2 md:gap-3 auto-rows-fr",
          {
            "lg:auto-rows-fr": !player, // Ensure rows are same height
          }
        )}
      >
        {cards.map((card, i) => (
          <div
            key={`${keyPrefix}-${i}`}
            className={clsx(
              "h-full",
              lgColStartMap[i] ?? "",
              !player && lgRowStartMap[i] // Apply row positioning only for opponent
            )}
          >
            <Cards card={card} side={side} />
          </div>
        ))}
      </div>
    </div>
  );
}
