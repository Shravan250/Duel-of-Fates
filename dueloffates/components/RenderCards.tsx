import useCards from "@/hooks/useCards";
import Cards from "./Cards";

interface RenderCardsProps {
  user: boolean;
}

export default function RenderCards({ user }: RenderCardsProps) {
  const { opponentCards, userCards } = useCards();
  const cards = user ? userCards : opponentCards;
  const keyPrefix = user ? "player" : "opp";

  return (
    <div className="relative">
      <div className="grid grid-cols-10 lg:grid-cols-10 md:grid-cols-6 sm:grid-cols-5 gap-2 md:gap-3 auto-rows-fr">
        {cards.map((card, i) => (
          <div key={`${keyPrefix}-${i}`} className="h-full">
            <Cards {...card} />
          </div>
        ))}
      </div>
    </div>
  );
}
