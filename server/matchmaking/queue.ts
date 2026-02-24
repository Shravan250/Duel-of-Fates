import { Socket } from "socket.io";
import { roomManager } from "../room/roomManager";

export type Player = {
  id: string;
  socket: Socket;
};

const waitingQueue: Player[] = [];

export function addPlayerToQueue(player: Player) {
  // Prevent duplicate entries
  const alreadyInQueue = waitingQueue.some((p) => p.id === player.id);
  if (alreadyInQueue) return;

  waitingQueue.push(player);

  console.log(
    `Player ${player.id} joined queue. Total waiting: ${waitingQueue.length}`,
  );

  if (waitingQueue.length >= 2) {
    startMatchFromQueue();
  }
}

export function removePlayerFromQueue(playerId: string) {
  const index = waitingQueue.findIndex((p) => p.id === playerId);

  if (index !== -1) {
    waitingQueue.splice(index, 1);

    console.log(`Player ${playerId} removed from queue`);
  }
}

function startMatchFromQueue() {
  const playersForMatch = waitingQueue.splice(0, 2);

  if (!playersForMatch[0] || !playersForMatch[1]) return;
  roomManager.createRoom(playersForMatch[0], playersForMatch[1]);
}
