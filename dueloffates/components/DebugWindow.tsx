import { useDebugStore, DebugEvent } from "@/store/useDebugStore";
import { Icon } from "@iconify/react";
import clsx from "clsx";

interface DebugWindowProps {
  side: "player" | "opponent";
}

const eventIcons: Record<DebugEvent["type"], string> = {
  damage: "mdi:sword",
  heal: "mdi:heart-plus",
  shield: "mdi:shield",
  poison: "game-icons:poison-gas",
  fatigue: "mdi:weather-night",
  buff: "mdi:arrow-up-bold",
  debuff: "mdi:arrow-down-bold",
  utility: "mdi:tools",
};

const eventColors: Record<DebugEvent["type"], string> = {
  damage: "text-red-600 bg-red-50 border-red-300",
  heal: "text-green-600 bg-green-50 border-green-300",
  shield: "text-blue-600 bg-blue-50 border-blue-300",
  poison: "text-green-700 bg-green-100 border-green-400",
  fatigue: "text-yellow-700 bg-yellow-50 border-yellow-300",
  buff: "text-purple-600 bg-purple-50 border-purple-300",
  debuff: "text-orange-600 bg-orange-50 border-orange-300",
  utility: "text-gray-700 bg-gray-100 border-gray-300",
};

export default function DebugWindow({ side }: DebugWindowProps) {
  const { events, isDebugEnabled } = useDebugStore();

  if (!isDebugEnabled) return null;

  // Filter events for this side
  const sideEvents = events.filter((e) => e.side === side);

  if (sideEvents.length === 0) return null;

  return (
    <div
      className={clsx(
        "fixed z-50 pointer-events-none",
        side === "player" ? "bottom-48 left-8" : "top-48 right-8"
      )}
    >
      <div className="space-y-2 max-w-xs">
        {sideEvents.map((event) => (
          <div
            key={event.id}
            className={clsx(
              "flex items-center gap-2 px-3 py-2 rounded-lg border-2 shadow-lg",
              "animate-in slide-in-from-bottom-2 fade-in duration-300",
              eventColors[event.type]
            )}
          >
            <Icon icon={eventIcons[event.type]} className="w-5 h-5 shrink-0" />
            <div className="flex-1 font-semibold text-sm">
              {event.message}
              {event.value !== undefined && (
                <span className="ml-1 font-bold">
                  {event.value > 0 ? `+${event.value}` : event.value}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
