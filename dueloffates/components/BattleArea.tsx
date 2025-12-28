import { Icon } from "@iconify/react";

export default function BattleArea() {
  return (
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
