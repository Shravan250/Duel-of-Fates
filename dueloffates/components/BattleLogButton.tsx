import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { BattleLogModal } from "./BattleLogModal";
import { useLogStore } from "@/store/useLogStore";

export const BattleLogButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const completedTurns = useLogStore((state) => state.completedTurns);
  const turnCount = completedTurns.length;

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="relative group px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-purple-500/50 flex items-center gap-2"
      >
        <Icon icon="mdi:book-open-variant" className="w-5 h-5" />
        <span>Battle Log</span>
        {turnCount > 0 && (
          <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
            {turnCount}
          </span>
        )}
      </button>

      <BattleLogModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
