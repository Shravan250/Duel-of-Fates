"use client";

import BattleArea from "@/components/BattleArea";
import { BattleLogButton } from "@/components/BattleLogButton";
import DebugWindow from "@/components/DebugWindow";
import HeadUpDisplay from "@/components/HeadUpDisplay";
import RenderCards from "@/components/RenderCards";
// import { bindDeckEngine } from "@/game/binders/bindDeckEngine";
// import { bindHealthEngine } from "@/game/binders/bindHealthEngine";
// import { bindMatchEngine } from "@/game/binders/bindMatchEngine";
// import { bindShieldEngine } from "@/game/binders/bindShieldEngine";
// import { bindStatusEngine } from "@/game/binders/bindStatusEngine";
import { useDebugStore } from "@/store/useDebugStore";
import { useGameStore } from "@/store/useGameStore";
import { useMatchStore } from "@/store/useMatchStore";
import { useEffect, useState } from "react";

export default function Game() {
  const [startGame, setStartGame] = useState<boolean>(false);
  const { isDebugEnabled, toggleDebug } = useDebugStore();

  // useEffect(() => {
  //   const deckController = bindDeckEngine();
  //   const statusController = bindStatusEngine();
  //   const shieldController = bindShieldEngine();
  //   const healthController = bindHealthEngine();
  //   const matchController = bindMatchEngine();

  //   useMatchStore.getState().bindMatchController(matchController);
  //   useGameStore.getState().bindDeckController(deckController);

  //   useMatchStore.getState().startMatch();

  //   return () => {
  //     deckController.unsubscribe();
  //     matchController.unsubscribe();
  //   };
  // }, []);

  return (
    <div className="relative min-h-screen bg-gray-100 p-4 md:p-6 lg:p-8 game-background">
      {/* Debug Toggle Button */}
      {/* <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleDebug}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            isDebugEnabled
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-gray-400 text-white hover:bg-gray-500"
          }`}
        >
          {isDebugEnabled ? "🐛 Debug: ON" : "Debug: OFF"}
        </button>
      </div> */}

      {/* DEBUG WINDOWS - Float near each player */}
      {/* <DebugWindow side="player" />
      <DebugWindow side="opponent" /> */}

      <div className="absolute top-4 right-4">
        <BattleLogButton />
      </div>

      <div className="max-w-7xl mx-auto space-y-6">
        <HeadUpDisplay player="Player 2" flip={false} />

        {/* Opponent Cards - Hidden */}
        <RenderCards player={false} />

        {/* Middle Section - Battle Area */}
        <BattleArea />

        {/* Player Cards - Visible */}
        <RenderCards player={true} />

        <HeadUpDisplay player="Player 1" flip={true} />
      </div>
    </div>
  );
}
