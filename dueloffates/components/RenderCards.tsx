import { useGameStore } from "@/store/useGameStore";
import Cards from "./Cards";
import { PlayerSide } from "@/context/CardsContext";

interface RenderCardsProps {
  player: boolean;
}

export default function RenderCards({ player }: RenderCardsProps) {
  const { playerCards, opponentCards } = useGameStore();
  const cards = player ? playerCards : opponentCards;
  const side: PlayerSide = player ? "PLAYER" : "OPPONENT";
  const keyPrefix = player ? "player" : "opp";

  return (
    <div className="relative">
      <div className="grid grid-cols-10 lg:grid-cols-10 md:grid-cols-6 sm:grid-cols-5 gap-2 md:gap-3 auto-rows-fr">
        {cards.map((card, i) => (
          <div key={`${keyPrefix}-${i}`} className="h-full">
            <Cards card={card} side={side} />
          </div>
        ))}
      </div>
    </div>
  );
}
