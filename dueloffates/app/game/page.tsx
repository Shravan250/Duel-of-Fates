"use client";

import BattleArea from "@/components/BattleArea";
import { BattleLogButton } from "@/components/BattleLogButton";
import HeadUpDisplay from "@/components/HeadUpDisplay";
import RenderCards from "@/components/RenderCards";
import { socket } from "@/network/socket";
import { useEffect } from "react";

export default function Game() {
  useEffect(() => {
    return () => {
        socket.emit("leaveRoom");
        socket.disconnect();
    };
  }, []);
  return (
    <div className="relative min-h-screen bg-gray-100 p-4 md:p-6 lg:p-8 game-background">
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
