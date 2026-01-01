"use client";

import { useEffect } from "react";
import { bindDeckEngine } from "@/game/binders/bindDeckEngine";
import DebugPanel from "@/components/test/GameInitilizationTest";
import { useGameStore } from "@/store/useGameStore";

export default function Test() {
  useEffect(() => {
    console.log("🚀 Setting up game...");

    // Step 1: Create controller by binding engine
    const deckController = bindDeckEngine();

    // Step 2: Store the controller in Zustand (NOT the engine!)
    useGameStore.getState().bindDeckController(deckController);

    // Step 3: Initialize the game through Zustand action
    // (which internally calls controller.initializeGame())
    useGameStore.getState().initializeGame();

    console.log("✅ Game setup complete");

    // Cleanup on unmount
    return () => {
      console.log("🧹 Cleaning up...");
      deckController.unsubscribe();
    };
  }, []);

  return (
    <div>
      {/* <HPTest/> */}
      <DebugPanel />
    </div>
  );
}
