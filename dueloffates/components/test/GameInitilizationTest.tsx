"use client";
import { useGameStore } from "@/store/useGameStore";
import { useState } from "react";

export default function DebugPanel() {
  const [isOpen, setIsOpen] = useState(false);

  const {
    playerDeck,
    opponentDeck,
    playerInstances,
    opponentInstances,
    playerCards,
    opponentCards,
    // isGameInitialized,
    initializeGame,
    // resetGame,
  } = useGameStore();

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 px-4 py-2 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700 z-50"
      >
        🐛 Open Debug Panel
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 max-h-96 overflow-y-auto bg-gray-900 text-white p-4 rounded-lg shadow-2xl z-50">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Debug Panel</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white hover:text-gray-300"
        >
          ✕
        </button>
      </div>

      {/* Controls */}
      <div className="space-y-2 mb-4">
        <button
          onClick={initializeGame}
          className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm"
        >
          Initialize Game
        </button>
        {/* <button
          onClick={resetGame}
          className="w-full px-3 py-2 bg-green-600 hover:bg-green-700 rounded text-sm"
        >
          Reset Game
        </button> */}
      </div>

      {/* Status */}
      <div className="space-y-2 text-sm">
        <div className="border-t border-gray-700 pt-2">
          <p className="font-semibold">Game Status</p>
          {/* <p className={isGameInitialized ? "text-green-400" : "text-red-400"}>
            {isGameInitialized ? "✓ Initialized" : "✗ Not Initialized"}
          </p> */}
        </div>

        <div className="border-t border-gray-700 pt-2">
          <p className="font-semibold">Deck Counts</p>
          <p>Player Deck: {playerDeck.length} definitions</p>
          <p>Opponent Deck: {opponentDeck.length} definitions</p>
          <p>Player Instances: {playerInstances.length}</p>
          <p>Opponent Instances: {opponentInstances.length}</p>
          <p>Player UI Cards: {playerCards.length}</p>
          <p>Opponent UI Cards: {opponentCards.length}</p>
        </div>

        <div className="border-t border-gray-700 pt-2">
          <p className="font-semibold">Player Deck Types</p>
          {playerCards.map((card: any, i: any) => (
            <p key={i} className="text-xs">
              {i + 1}. {card.header} ({card.type})
            </p>
          ))}
        </div>

        <div className="border-t border-gray-700 pt-2">
          <p className="font-semibold">Opponent Deck Types</p>
          {opponentCards.map((card: any, i: any) => (
            <p key={i} className="text-xs">
              {i + 1}. {card.header} ({card.type})
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
