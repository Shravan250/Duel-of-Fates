"use client";

import { CardDefination } from "@/types";

interface Props {
  card: CardDefination;
  onClose: () => void;
}

const CardDetailsOverlay = ({ card, onClose }: Props) => {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div className="relative z-10 w-[500px] bg-gray-900 text-white p-6 rounded-xl shadow-xl">
        <h2 className="text-2xl font-bold mb-4">{card.name}</h2>

        <div className="space-y-2">
          <div>Type: {card.type}</div>
          <div>Cooldown: {card.cooldown}</div>
          <div>Priority: {card.priority}</div>

          {card.desc && (
            <div>
              <span className="text-gray-400">Description:</span>
              <p>{card.desc}</p>
            </div>
          )}

          <div>
            <span className="text-gray-400">Effects:</span>
            <pre className="text-xs bg-black/40 p-2 rounded">
              {JSON.stringify(card.effects, null, 2)}
            </pre>
          </div>
        </div>

        <button onClick={onClose} className="mt-4 px-4 py-2 bg-red-500 rounded">
          Close
        </button>
      </div>
    </div>
  );
};

export default CardDetailsOverlay;
