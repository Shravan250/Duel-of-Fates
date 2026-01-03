"use client";

import BattleArea from "@/components/BattleArea";
import HeadUpDisplay from "@/components/HeadUpDisplay";
import RenderCards from "@/components/RenderCards";
import { bindDeckEngine } from "@/game/binders/bindDeckEngine";
import { bindMatchEngine } from "@/game/binders/bindMatchEngine";
import { useGameStore } from "@/store/useGameStore";
import { useMatchStore } from "@/store/useMatchStore";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const matchController = bindMatchEngine();
    const deckController = bindDeckEngine();

    useMatchStore.getState().bindMatchController(matchController);
    useGameStore.getState().bindDeckController(deckController);

    useMatchStore.getState().startMatch();

    return () => {
      deckController.unsubscribe();
      matchController.unsubscribe();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6 lg:p-8 game-background">
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
