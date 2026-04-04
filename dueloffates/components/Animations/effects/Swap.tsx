import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

export default function Swap({ onDone }: { onDone: () => void }) {
  return (
    <motion.div className="absolute inset-0 pointer-events-none">
      {/* TOP DOT */}
      <motion.div
        initial={{ y: -200, opacity: 0 }}
        animate={{
          y: [-200, 0, 0, 200], // <-- HOLD at center
          opacity: [0, 1, 0, 1, 0], // <-- stay visible
        }}
        transition={{
          duration: 1.2,
          times: [0, 0.4, 0.6, 1], // <-- HOLD between 0.4–0.6
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2"
      >
        <Icon icon="mdi:circle" className="w-6 h-6 text-amber-400" />
      </motion.div>

      {/* BOTTOM DOT */}
      <motion.div
        initial={{ y: 200, opacity: 0 }}
        animate={{
          y: [200, 0, 0, -200], // <-- HOLD at center
          opacity: [0, 1, 0, 1, 0],
        }}
        transition={{
          duration: 1.2,
          times: [0, 0.4, 0.6, 1],
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2"
      >
        <Icon icon="mdi:circle" className="w-6 h-6 text-amber-400" />
      </motion.div>

      {/* 🔥 OPTIONAL: CENTER IMPACT (small but powerful) */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.3, 0], opacity: [0, 0.8, 0] }}
        transition={{ duration: 0.4, delay: 0.45 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-amber-400 blur-xl"
      />

      {/* CENTER SWAP ICON */}
      <motion.div
        initial={{ rotate: 0, opacity: 0, scale: 0.8 }}
        animate={{
          rotate: [0, 0, 180], // rotate during HOLD
          opacity: [0, 1, 0.5, 0],
          scale: [0.8, 1.2, 1],
        }}
        transition={{
          duration: 1.2,
          times: [0, 0.4, 1], // starts rotating after meet
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <Icon icon="mdi:swap-vertical" className="w-28 h-28 text-amber-400" />
      </motion.div>
    </motion.div>
  );
}
