import { Side } from "@/types";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";


export function SwordSlash({ from }: { from: Side }) {
  const isPlayer = from === "PLAYER";

  return (
    <motion.div
      initial={{
        x: isPlayer ? -150 : 150,
        y: isPlayer ? 20 : -20,
        rotate: isPlayer ? -100 : -100,
        opacity: 100,
      }}
      animate={{
        x: isPlayer ? 150 : -150,
        y: isPlayer ? -50 : 50,
        rotate: isPlayer ? 0 : 0,
        opacity: 1,
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
    >
      <Icon
        icon="game-icons:broadsword"
        className={`w-28 h-28 text-red-500 drop-shadow-[0_0_25px_rgba(255,0,0,0.9)] ${!isPlayer && "-scale-100"}`}
      />
    </motion.div>
  );
}