import { StatusState } from "@/game/engine/status/StatusEngine";
import { Icon } from "@iconify/react";
import clsx from "clsx";
import { label } from "motion/react-client";

interface StatusBarProps {
  status: StatusState;
}

export default function StatusBar({ status }: StatusBarProps) {
  const effects = [
    status.poison > 0 && {
      key: "poison",
      label: "Poison",
      value: status.poison,
      icon: "game-icons:poison-gas",
      className: "text-green-600",
    },
    status.fatigue > 0 && {
      key: "fatigue",
      label: "Fatigue",
      value: status.fatigue,
      icon: "mdi:weather-night",
      className: "text-yellow-600",
    },
  ].filter(Boolean) as {
    key: string;
    label: string;
    value: number;
    icon: string;
    className?: string;
  }[];

  if (effects.length === 0) {
    return (
      <div className="text-xs text-gray-400 italic text-center">
        No active effects
      </div>
    );
  }
  return (
    <div className={clsx("flex gap-2 flex-wrap")}>
      {effects.map((effect) => (
        <div
          key={effect.key}
          className={clsx(
            "flex items-center gap-1  py-1 text-sm font-semibold ",
            effect.className
          )}
        >
          <Icon icon={effect.icon} className="w-6 h-6" />
          <span>{effect.label}</span>
          <span className="opacity-80">x{effect.value}</span>
        </div>
      ))}
    </div>
  );
}
