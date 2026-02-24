"use client";

import { motion } from "framer-motion";

interface MatchmakingScreenProps {
  handleLeaveQueue: () => void;
}

export default function MatchmakingScreen({
  handleLeaveQueue,
}: MatchmakingScreenProps) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black text-amber-200 overflow-hidden">
      {/* bg glow */}
      <div className="absolute w-125 h-125 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />

      {/* heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative text-5xl text-center tracking-[0.3em] uppercase font-bold 
                   drop-shadow-[0_0_20px_rgba(251,191,36,0.8)] z-10"
      >
        Searching For Opponent
      </motion.h1>

      {/* spinner bith internal and external */}
      <div className="relative mt-12 flex items-center justify-center z-10">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="w-32 h-32 border-[6px] border-amber-400/30 
                     border-t-amber-400 rounded-full"
        />

        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          className="absolute w-20 h-20 border-4 border-amber-300/40 
                     border-b-amber-300 rounded-full"
        />
      </div>

      {/* animated dots */}
      <motion.p className="mt-8 text-lg tracking-widest z-10 flex">
        MATCHMAKING
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
            className="ml-1"
          >
            .
          </motion.span>
        ))}
      </motion.p>

      {/* Cancel Button */}
      <button
        onClick={handleLeaveQueue}
        className="mt-10 px-8 py-2 text-xl border border-amber-400 rounded-full 
                   hover:bg-amber-400 hover:text-black transition-all z-10"
      >
        Cancel
      </button>
    </div>
  );
}
