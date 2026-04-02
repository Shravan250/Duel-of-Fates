"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/useGameStore";
import { useMatchStore } from "@/store/useMatchStore";
import { useRouter } from "next/navigation";

export default function ResultOverlay() {
  const role = useGameStore((s) => s.role);
  const winner = useMatchStore((s) => s.winner);
  const router = useRouter();

  if (!winner) return null;

  let state: "win" | "lose" | "draw";
  if (winner === "DRAW") state = "draw";
  else state = role === winner ? "win" : "lose";

  const styles = {
    win: {
      title: "VICTORY",
      color: "bg-amber-500",
      accent: "text-amber-300",
    },
    lose: {
      title: "DEFEAT",
      color: "bg-red-600",
      accent: "text-red-300",
    },
    draw: {
      title: "DRAW",
      color: "bg-blue-600",
      accent: "text-blue-300",
    },
  }[state];

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 z-50 flex items-center justify-center"
      >
        {/* 🔴 DEEP BACKGROUND FADE */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          className="absolute inset-0 bg-black"
        />

        {/* 🎨 COLOR FLOOD LAYER */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.55 }}
          transition={{ delay: 0.2 }}
          className={`absolute inset-0 ${styles.color}`}
        />

        {/* 🌑 VIGNETTE (dark edges) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,black_85%)]" />

        {/* 💥 CENTER SHOCKWAVE */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 14 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className={`absolute w-40 h-40 rounded-full ${styles.color} blur-3xl opacity-70`}
        />

        {/* 🏆 CONTENT */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 120 }}
          className="relative text-center"
        >
          <h1
            className={`text-7xl md:text-8xl tracking-[0.4em] font-extrabold ${styles.accent}`}
          >
            {styles.title}
          </h1>

          {/* Buttons */}
          <div className="mt-12 flex justify-center gap-8">
            {/* PRIMARY BUTTON */}
            <button
              onClick={() => location.reload()}
              className="px-10 py-4 text-lg font-bold tracking-widest
                         rounded-full bg-white text-black
                         shadow-[0_0_30px_rgba(255,255,255,0.7)]
                         hover:scale-105 hover:shadow-[0_0_45px_rgba(255,255,255,1)]
                         active:scale-95 transition-all"
            >
              PLAY AGAIN
            </button>

            {/* SECONDARY BUTTON */}
            <button
              onClick={() => router.push("/")}
              className="px-10 py-4 text-lg tracking-widest
                         rounded-full border border-white/50 text-white
                         hover:bg-white hover:text-black
                         transition-all"
            >
              EXIT
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
