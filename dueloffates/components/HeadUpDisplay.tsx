import { useHealthStore } from "@/store/useHealthStore";
import { useShieldStore } from "@/store/useShieldStore";
import { useStatusStore } from "@/store/useStatusStore";
import { Icon } from "@iconify/react";
import clsx from "clsx";
import StatusBar from "./StatusBar";
import StatBar from "./StatBar";

interface HeadUpDisplayProps {
  player: string;
  flip: boolean;
}

export default function HeadUpDisplay({ player, flip }: HeadUpDisplayProps) {
  const shield = useShieldStore((s) =>
    flip ? s.playerShield : s.opponentShield
  );
  const maxShield = useShieldStore((s) => s.maxShield);

  const hp = useHealthStore((s) => (flip ? s.playerHp : s.opponentHp));
  const maxHp = useHealthStore((s) => s.maxHp);

  const status = useStatusStore((s) => (flip ? s.player : s.opponent));

  return (
    <>
      {/* Top Section - Player 2 */}
      <div
        className={clsx(
          "grid gap-4 items-start",
          flip ? "grid-cols-[1fr_4fr_4fr]" : "grid-cols-[4fr_4fr_1fr]"
        )}
      >
        {/* Status Effects */}
        <div
          className={clsx(
            "border-2 border-gray-400 bg-white p-4",
            flip ? "order-3" : "order-1"
          )}
        >
          <div className="text-sm font-semibold mb-2">
            Status Effects
            <StatusBar status={status} />
          </div>
        </div>

        {/* Health/Shield Bars */}
        <div className="space-y-2 order-2">
          <StatBar
            value={shield}
            max={maxShield}
            colorClass="bg-blue-500"
            flip={flip}
          />
          <StatBar value={hp} max={maxHp} colorClass="bg-red-500" flip={flip} />
        </div>

        {/* Player 2 Icon */}
        <div
          className={clsx(
            "flex flex-col items-center gap-2",
            flip ? "order-1" : "order-3"
          )}
        >
          <div className="w-16 h-16 border-2 border-gray-400 bg-white rounded-full flex items-center justify-center">
            <Icon icon="tdesign:user" className="w-10 h-10 text-gray-600" />
          </div>
          <div className="border border-gray-400 px-4 py-1 bg-white text-sm">
            {player}
          </div>
        </div>
      </div>
    </>
  );
}
