"use client";
import { useGameStore } from "@/store/useGameStore";
import { useMatchStore } from "@/store/useMatchStore";
import { useRouter } from "next/navigation";

export default function Result() {
  const role = useGameStore((state) => state.role);
  const winner = useMatchStore((state) => state.winner);
  const router=useRouter();

  return (
    <div className="font-fell start-screen flex flex-col items-center justify-center">
      <h1 className="text-7xl tracking-[0.22em] uppercase text-black drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
        GAME
      </h1>
      <h1 className=" text-7xl tracking-[0.22em] uppercase text-black drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
        OVER
      </h1>

      <div className=" text-5xl text-black mt-10">
        {role === winner ? `You Won` : `You Lose`}
      </div>
      <button
            className="mt-10 font-inter uppercase tracking-[0.35em] px-14 py-4 text-amber-200 bg-black/70 border-2 border-amber-400 rounded-full shadow-[0_0_30px_rgba(0,0,0,0.7)] transition-all duration-300 hover:bg-black/85 hover:text-white hover:shadow-[0_0_40px_rgba(251,191,36,0.6)] active:scale-95"
            onClick={() => router.push("/")}
          >
            Back to Home
          </button>
      
    </div>
  );
}
