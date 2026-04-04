import { Side } from "@/types";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { useRef, useState } from "react";

export function PotionThrow({
  from,
  onDone,
}: {
  from: Side;
  onDone: () => void;
}) {
  const isPlayer = from === "PLAYER";
  const [showSplash, setShowSplash] = useState(false);
  const [showBottle, setShowBottle] = useState(true);
  const hasCompleted = useRef(false);

  return (
    <>
      {/* 🧪 POTION */}
      <motion.div
        onAnimationComplete={() => {
          if (!hasCompleted.current) {
            hasCompleted.current = true;
            setShowBottle(false);
            setShowSplash(true);
          }
        }}
        initial={{ y: isPlayer ? 150 : -150 }}
        animate={{ y: isPlayer ? -150 : 150 }}
        transition={{ duration: 0.5 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      >
        {showBottle && (
          <Icon
            icon="game-icons:round-potion"
            className="w-24 h-24 text-purple-500 drop-shadow-[0_0_30px_rgba(168,85,247,0.9)]"
          />
        )}
      </motion.div>

      {/* 💥 BIG PUDDLE */}
      {showSplash && (
        <motion.div
          initial={{ scale: 0.5, opacity: 0.8 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          onAnimationComplete={onDone}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            // 👉 EXACT SAME POSITION AS POTION END
            y: isPlayer ? -230 : 230,
          }}
        >
          <div className="w-60 h-40 bg-purple-600 rounded-full blur-xl opacity-70" />
        </motion.div>
      )}
    </>
  );
}
