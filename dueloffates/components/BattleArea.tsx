import { Icon } from "@iconify/react";
import Cards from "./Cards";
import { useEffect, useState } from "react";
import { useMatchStore } from "@/store/useMatchStore";

export default function BattleArea() {
  const { selectedPlayerCard, selectedOpponentCard } = useMatchStore();
  const [timer, setTimer] = useState(15);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-[auto_1fr_1fr_1fr_auto] gap-4 items-center py-4">
      {/* Timer */}
      <div className="flex flex-col items-center gap-1 mr-20">
        <Icon
          icon="lets-icons:clock-light"
          className="w-12 h-12 text-gray-700"
        />
        <div className="text-sm font-medium">{timer} sec</div>
      </div>

      {/* Player 1 Selected Card */}
      <div className="aspect-2/3 min-h-80 text-sm text-gray-600">
        {selectedPlayerCard ? (
          <Cards card={selectedPlayerCard!} battleArea={true} />
        ) : (
          <div className="border-2 border-gray-400 bg-white w-full h-full flex justify-center items-center">
            Player 1 Card
            <br />
            (Selected)
          </div>
        )}
      </div>

      <div className="mx-auto text-black">V/S</div>

      {/* Player 2 Selected Card */}
      <div className=" aspect-2/3 min-h-80 text-sm text-gray-600">
        {selectedOpponentCard ? (
          <Cards card={selectedOpponentCard!} battleArea={true} />
        ) : (
          <div className="border-2 border-gray-400 bg-white w-full h-full flex justify-center items-center">
            Player 2 Card
            <br />
            (Selected)
          </div>
        )}
      </div>

      {/* Menu */}
      <div className="flex flex-col items-center gap-1 ml-20">
        <Icon icon="material-symbols:menu" className="w-8 h-8 text-gray-700" />
        <div className="text-xs">
          Library(all
          <br />
          card details),
          <br />
          Exit Game
        </div>
      </div>
    </div>
  );
}
