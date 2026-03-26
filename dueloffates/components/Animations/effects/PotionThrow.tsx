import { Side } from "@/types";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

export function PotionThrow({ from }: { from: Side }) {
  const isPlayer = from === "PLAYER";

  return (
    <motion.div
      initial={{ y: isPlayer ? 150 : -150 }}
      animate={{ y: isPlayer ? -150 : 150, scale: [1, 2, 1] }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
    >
      <Icon
        icon="mdi:flask"
        className="w-24 h-24 text-purple-500 drop-shadow-[0_0_30px_rgba(168,85,247,0.9)]"
      />
    </motion.div>
  );
}
