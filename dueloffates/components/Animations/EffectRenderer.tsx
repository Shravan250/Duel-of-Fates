import { AnimationEffect as Effect } from "@/types";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { SwordSlash } from "./effects/SwordSlash";
import { ZoneIcon } from "./effects/ZoneIcon";
import { PotionThrow } from "./effects/PotionThrow";
import Swap from "./effects/Swap";

export function EffectRenderer({
  effect,
  onDone,
}: {
  effect: Effect;
  onDone: () => void;
}) {
  if (!effect.side) return <Swap onDone={onDone} />;
  switch (effect.type) {
    case "ATTACK":
      return <SwordSlash from={effect.side} onDone={onDone} />;

    case "SHIELD":
      return (
        <ZoneIcon
          icon="mdi:shield"
          color="text-blue-400"
          side={effect.side}
          glow="rgba(59,130,246,0.8)"
          onDone={onDone}
        />
      );

    case "HEAL":
      return (
        <ZoneIcon
          icon="map:health"
          color="text-green-400"
          side={effect.side}
          glow="rgba(34,197,94,0.9)"
          pulse
          onDone={onDone}
        />
      );

    case "POISON":
      return <PotionThrow from={effect.side} onDone={onDone} />;

    case "BUFF":
      return (
        <ZoneIcon
          icon="mdi:arrow-up-bold"
          color="text-yellow-400"
          side={effect.side}
          glow="rgba(250,204,21,0.9)"
          pulse
          onDone={onDone}
        />
      );

    case "DEBUFF":
      return (
        <ZoneIcon
          icon="mdi:arrow-down-bold"
          color="text-red-500"
          side={effect.side}
          glow="rgba(239,68,68,0.9)"
          isDebuff
          pulse
          onDone={onDone}
        />
      );

    default:
      return null;
  }
}
