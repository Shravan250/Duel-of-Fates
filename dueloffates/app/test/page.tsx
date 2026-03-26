"use client";

import ResultOverlay from "@/components/ResultOverlay";
import { useMatchStore } from "@/store/useMatchStore";

export default function ResultTestPage() {
  const setWinner = useMatchStore((s) => s.setWinner);

  return (
    <div className="h-screen bg-gray-900 flex items-center justify-center">
      {/* Fake battlefield background */}
      <div className="absolute inset-0 bg-[url('/test-bg.jpg')] opacity-40" />

      <ResultOverlay />

      {/* Debug buttons */}
      <div className="fixed bottom-8 flex gap-4">
        <button
          onClick={() => setWinner("PLAYER")}
          className="bg-green-500 px-4 py-2"
        >
          WIN
        </button>
        <button
          onClick={() => setWinner("OPPONENT")}
          className="bg-red-500 px-4 py-2"
        >
          LOSE
        </button>
        <button
          onClick={() => setWinner("DRAW")}
          className="bg-blue-500 px-4 py-2"
        >
          DRAW
        </button>
      </div>
    </div>
  );
}
