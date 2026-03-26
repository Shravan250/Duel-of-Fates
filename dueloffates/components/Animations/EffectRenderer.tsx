import { AnimationEffect as Effect } from "@/types";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { SwordSlash } from "./effects/SwordSlash";
import { ZoneIcon } from "./effects/ZoneIcon";
import { PotionThrow } from "./effects/PotionThrow";

export function EffectRenderer({ effect }: { effect: Effect }) {
  switch (effect.type) {
    case "ATTACK":
      return <SwordSlash from={effect.side} />;

    case "SHIELD":
      return (
        <ZoneIcon
          icon="mdi:shield"
          color="text-blue-400"
          side={effect.side}
          glow="rgba(59,130,246,0.8)"
        />
      );

    case "HEAL":
      return (
        <ZoneIcon
          icon="mdi:plus-circle"
          color="text-green-400"
          side={effect.side}
          glow="rgba(34,197,94,0.9)"
          pulse
        />
      );

    case "POISON":
      return <PotionThrow from={effect.side} />;

    case "BUFF":
      return (
        <ZoneIcon
          icon="mdi:arrow-up-bold"
          color="text-yellow-400"
          side={effect.side}
          glow="rgba(250,204,21,0.9)"
          pulse
        />
      );

    case "DEBUFF":
      return (
        <ZoneIcon
          icon="mdi:arrow-down-bold"
          color="text-red-500"
          side={effect.side}
          glow="rgba(239,68,68,0.9)"
          pulse
        />
      );

    case "SWAP":
      return (
        <motion.div
          initial={{ rotate: 0, opacity: 0 }}
          animate={{ rotate: 360, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <Icon icon="mdi:swap-vertical" className="w-28 h-28 text-amber-400" />
        </motion.div>
      );

    default:
      return null;
  }
}
