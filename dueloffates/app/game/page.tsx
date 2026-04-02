"use client";

import { EffectRenderer } from "@/components/Animations/EffectRenderer";
import BattleArea from "@/components/BattleArea";
import { BattleLogButton } from "@/components/BattleLogButton";
import HeadUpDisplay from "@/components/HeadUpDisplay";
import RenderCards from "@/components/RenderCards";
import { socket } from "@/network/socket";
import { AnimationEffect as Effect } from "@/types";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

export default function Game() {
  const [effects, setEffects] = useState<Effect[]>([]);
  const [counter, setCounter] = useState(0);

  const trigger = (effect: Omit<Effect, "id">) => {
    const id = counter + 1;
    setCounter(id);
    setEffects((prev) => [...prev, { ...effect, id }]);

    setTimeout(() => {
      setEffects((prev) => prev.filter((e) => e.id !== id));
    }, 800);
  };

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

      <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
        <AnimatePresence>
          {effects.map((effect) => (
            <EffectRenderer key={effect.id} effect={effect} />
          ))}
        </AnimatePresence>
      </div>

      <div className=" fixed bottom-8 flex flex-wrap gap-3 ">
        <Button onClick={() => trigger({ type: "ATTACK", side: "PLAYER" })}>
          Player Attack
        </Button>
        <Button onClick={() => trigger({ type: "ATTACK", side: "OPPONENT" })}>
          Opp Attack
        </Button>
        <Button onClick={() => trigger({ type: "SHIELD", side: "PLAYER" })}>
          Player Shield
        </Button>
        <Button onClick={() => trigger({ type: "SHIELD", side: "OPPONENT" })}>
          Opp Shield
        </Button>
        <Button onClick={() => trigger({ type: "HEAL", side: "PLAYER" })}>
          Player Heal
        </Button>
        <Button onClick={() => trigger({ type: "HEAL", side: "OPPONENT" })}>
          Opp Heal
        </Button>
        <Button onClick={() => trigger({ type: "POISON", side: "PLAYER" })}>
          Player Poison
        </Button>
        <Button onClick={() => trigger({ type: "BUFF", side: "PLAYER" })}>
          Player Buff
        </Button>
        <Button onClick={() => trigger({ type: "BUFF", side: "OPPONENT" })}>
          Opp Buff
        </Button>
        <Button onClick={() => trigger({ type: "DEBUFF", side: "PLAYER" })}>
          Player Debuff
        </Button>
        <Button onClick={() => trigger({ type: "DEBUFF", side: "OPPONENT" })}>
          Opp Debuff
        </Button>
        <Button onClick={() => trigger({ type: "SWAP" })}>Swap</Button>
      </div>
    </div>
  );
}

function Button({ children, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 border border-amber-400 rounded-full text-amber-400 bg-black/70 hover:bg-amber-400 hover:text-black transition-all"
    >
      {children}
    </button>
  );
}
