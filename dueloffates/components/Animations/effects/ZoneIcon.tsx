import { Side } from "@/types";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

export function ZoneIcon({
  icon,
  color,
  side,
  glow,
  pulse = false,
}: {
  icon: string;
  color: string;
  side: Side;
  glow: string;
  pulse?: boolean;
}) {
  const isPlayer = side === "PLAYER";

  return (
    <motion.div
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{
        scale: pulse ? [1, 1.3, 1] : 1.2,
        opacity: 1,
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className={`absolute left-1/2 -translate-x-1/2 ${
        isPlayer ? "bottom-1/4" : "top-1/4"
      } pointer-events-none`}
    >
      <Icon
        icon={icon}
        className={`w-32 h-32 ${color}`}
        style={{ filter: `drop-shadow(0 0 30px ${glow})` }}
      />
    </motion.div>
  );
}