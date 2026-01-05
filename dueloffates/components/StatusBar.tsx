import { StatusState } from "@/game/engine/status/StatusEngine";
import { Icon } from "@iconify/react";
import clsx from "clsx";

interface StatusBarProps {
  status: StatusState;
}

export default function StatusBar({ status }: StatusBarProps) {
  const effects = [
    status.poison > 0 && {
      key: "poison",
      label: "Poison",
      value: `${status.poison}`,
      icon: "game-icons:poison-gas",
      className: "text-green-600",
    },
    status.fatigue > 0 && {
      key: "fatigue",
      label: "Fatigue",
      value: `${status.fatigue}`,
      icon: "mdi:weather-night",
      className: "text-yellow-600",
    },
    // ---------- MODIFIERS ----------

    status.modifiers.nextAttackMultiplier > 1 && {
      key: "atk-buff",
      label: "Attack ↑",
      value: `${status.modifiers.nextAttackMultiplier}`,
      icon: "mdi:sword",
      className: "text-red-500",
    },

    status.modifiers.incomingAttackMultiplier < 1 && {
      key: "atk-debuff",
      label: "Incoming ↓",
      value: `${status.modifiers.incomingAttackMultiplier}`,
      icon: "mdi:shield-alert",
      className: "text-blue-500",
    },

    status.modifiers.nextShieldMultiplier > 1 && {
      key: "shield-buff",
      label: "Shield ↑",
      value: `${status.modifiers.nextShieldMultiplier}`,
      icon: "mdi:shield",
      className: "text-cyan-500",
    },

    status.modifiers.cooldownReduction > 0 && {
      key: "cooldown",
      label: "Cooldown",
      value: `${status.modifiers.cooldownReduction}`,
      icon: "mdi:timer-minus",
      className: "text-purple-500",
    },

    status.modifiers.halveShield && {
      key: "halve-shield",
      label: "Shield Halved",
      value: "",
      icon: "mdi:shield-off",
      className: "text-orange-500",
    },
  ].filter(Boolean) as {
    key: string;
    label: string;
    value: string;
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
            "flex items-center gap-1 py-1 text-sm font-semibold ",
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
