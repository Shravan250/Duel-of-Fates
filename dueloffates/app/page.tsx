import Cards from "@/components/Cards";
import HeadUpDisplay from "@/components/HeadUpDisplay";
import { OpponentCards, userCards } from "@/mock/mockHand";
import { Icon } from "@iconify/react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <HeadUpDisplay player="Player 2" flip={false} />

        {/* Opponent's Cards Row - Hidden */}
        <div className="relative">
          <div className="grid grid-cols-10 lg:grid-cols-10 md:grid-cols-6 sm:grid-cols-5 gap-2 md:gap-3 auto-rows-fr">
            {OpponentCards.map((card, i) => (
              <div key={`opp-${i}`} className="h-full">
                <Cards {...card} />
              </div>
            ))}
          </div>
        </div>

        {/* Middle Section - Battle Area */}
        <div className="grid grid-cols-[auto_1fr_1fr_1fr_auto] gap-4 items-center py-4">
          {/* Timer */}
          <div className="flex flex-col items-center gap-1 mr-20">
            <Icon
              icon="lets-icons:clock-light"
              className="w-12 h-12 text-gray-700"
            />
            <div className="text-sm font-medium">10 sec</div>
          </div>

          {/* Player 1 Selected Card */}
          <div className="border-2 border-gray-400 bg-white aspect-2/3 flex items-center justify-center text-sm text-gray-600">
            Player 1 Card
            <br />
            (Selected)
          </div>

          <div className="mx-auto">V/S</div>

          {/* Player 2 Selected Card */}
          <div className="border-2 border-gray-400 bg-white aspect-2/3 flex items-center justify-center text-sm text-gray-600">
            Player 2 Card
            <br />
            (Selected)
          </div>

          {/* Menu */}
          <div className="flex flex-col items-center gap-1 ml-20">
            <Icon
              icon="material-symbols:menu"
              className="w-8 h-8 text-gray-700"
            />
            <div className="text-xs">
              Library(all
              <br />
              card details),
              <br />
              Exit Game
            </div>
          </div>
        </div>

        {/* Player's Cards Row - Visible */}
        <div className="relative">
          <div className="grid grid-cols-10 lg:grid-cols-10 md:grid-cols-6 sm:grid-cols-5 gap-2 md:gap-3 auto-rows-fr">
            {userCards.map((card, i) => {
              return (
                <div key={`player-${i}`} className="h-full">
                  <Cards {...card} />
                </div>
              );
            })}
          </div>
        </div>

        <HeadUpDisplay player="Player 1" flip={true} />
      </div>
    </div>
  );
}
