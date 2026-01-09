import React, { useState } from "react";
import { useLogStore } from "@/store/useLogStore";
import { Icon } from "@iconify/react";

interface BattleLogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BattleLogModal: React.FC<BattleLogModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedTurn, setSelectedTurn] = useState<number | null>(null);
  const completedTurns = useLogStore((state) => state.completedTurns);

  if (!isOpen) return null;

  // Show all turns or specific turn
  const displayLogs = selectedTurn
    ? completedTurns.find((t) => t.turnNumber === selectedTurn)
        ?.formattedMessages || []
    : completedTurns.flatMap((turn) => [...turn.formattedMessages, ""]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl h-[85vh] bg-slate-900 rounded-xl border border-slate-700 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700 bg-linear-to-r from-purple-900/50 to-slate-900">
          <div className="flex items-center gap-3">
            <Icon
              icon="mdi:book-open-variant"
              className="w-6 h-6 text-purple-400"
            />
            <h2 className="text-2xl font-bold text-white">Battle Log</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <Icon icon="mdi:close" className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Turn Navigator */}
        {completedTurns.length > 0 && (
          <div className="px-6 py-4 border-b border-slate-700 bg-slate-800/50">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm text-gray-400 font-medium">View:</span>
              <button
                onClick={() => setSelectedTurn(null)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedTurn === null
                    ? "bg-purple-600 text-white"
                    : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                }`}
              >
                All Turns
              </button>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-gray-400 font-medium">
                Jump to:
              </span>
              {completedTurns.map((turn) => (
                <button
                  key={turn.turnNumber}
                  onClick={() => setSelectedTurn(turn.turnNumber)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    selectedTurn === turn.turnNumber
                      ? "bg-blue-600 text-white"
                      : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                  }`}
                >
                  Turn {turn.turnNumber}
                </button>
              ))}
            </div>

            {/* Turn Navigation Arrows */}
            {selectedTurn !== null && (
              <div className="flex items-center gap-2 mt-3">
                <button
                  onClick={() => {
                    const currentIndex = completedTurns.findIndex(
                      (t) => t.turnNumber === selectedTurn
                    );
                    if (currentIndex > 0) {
                      setSelectedTurn(
                        completedTurns[currentIndex - 1].turnNumber
                      );
                    }
                  }}
                  disabled={selectedTurn === completedTurns[0]?.turnNumber}
                  className="px-3 py-1.5 rounded-lg bg-slate-700 text-gray-300 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
                >
                  <Icon icon="mdi:chevron-left" className="w-4 h-4" />
                  Previous
                </button>
                <button
                  onClick={() => {
                    const currentIndex = completedTurns.findIndex(
                      (t) => t.turnNumber === selectedTurn
                    );
                    if (currentIndex < completedTurns.length - 1) {
                      setSelectedTurn(
                        completedTurns[currentIndex + 1].turnNumber
                      );
                    }
                  }}
                  disabled={
                    selectedTurn ===
                    completedTurns[completedTurns.length - 1]?.turnNumber
                  }
                  className="px-3 py-1.5 rounded-lg bg-slate-700 text-gray-300 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
                >
                  Next
                  <Icon icon="mdi:chevron-right" className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Log Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-950">
          {displayLogs.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <Icon
                icon="mdi:book-open-variant"
                className="w-16 h-16 mb-4 opacity-50"
              />
              <p className="text-lg font-medium">No battle logs yet</p>
              <p className="text-sm text-gray-600 mt-1">
                Play some turns to see the battle history
              </p>
            </div>
          ) : (
            <div className="font-mono text-sm space-y-1">
              {displayLogs.map((line, idx) => {
                const isDivider = line.includes("────");
                const isHeader =
                  line.includes("triggered") || line.includes("effects");

                return (
                  <div
                    key={idx}
                    className={`py-0.5 ${
                      isDivider
                        ? "text-yellow-400 font-bold my-2"
                        : isHeader
                        ? "text-orange-400 font-semibold mt-3"
                        : line.includes("Player")
                        ? "text-blue-300"
                        : line.includes("Opponent")
                        ? "text-red-300"
                        : "text-gray-300"
                    }`}
                  >
                    {line || "\u00A0"}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Stats */}
        <div className="px-6 py-3 border-t border-slate-700 bg-slate-800/50 flex items-center justify-between text-sm text-gray-400">
          <span>{completedTurns.length} turns logged</span>
          <span>
            {displayLogs.length} lines
            {selectedTurn && ` (Turn ${selectedTurn})`}
          </span>
        </div>
      </div>
    </div>
  );
};
