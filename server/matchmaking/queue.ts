import { Socket } from "socket.io";
import { roomManager } from "../room/roomManager";

/*
 * Represents a player waiting in the queue
 */
export type Player = {
  id: string;
  socket: Socket;
};

/*
 * In-memory waiting queue
 */
const waitingQueue: Player[] = [];

/**
 * Adds a player to matchmaking queue
 */
export function addPlayerToQueue(player: Player) {
  // Prevent duplicate entries
  const alreadyInQueue = waitingQueue.some((p) => p.id === player.id);
  if (alreadyInQueue) return;

  waitingQueue.push(player);

  console.log(
    `Player ${player.id} joined queue. Total waiting: ${waitingQueue.length}`,
  );

  // If at least 2 players are waiting, create a match
  if (waitingQueue.length >= 2) {
    startMatchFromQueue();
  }
}

/*
 * Removes a player from matchmaking queue
 */
export function removePlayerFromQueue(playerId: string) {
  const index = waitingQueue.findIndex((p) => p.id === playerId);

  if (index !== -1) {
    waitingQueue.splice(index, 1);
    console.log(`Player ${playerId} removed from queue`);
  }
}

/*
 * Takes first 2 players from queue and starts a match
 */
function startMatchFromQueue() {
  const playersForMatch = waitingQueue.splice(0, 2);
  if(!playersForMatch[0]||!playersForMatch[1])return
  roomManager.createRoom(playersForMatch[0],playersForMatch[1]);
}
