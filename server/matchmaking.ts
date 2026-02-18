import { Socket } from "socket.io";
import { createMatch } from "./matchRoom";

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

  const matchId = `match-${Date.now()}`;

  console.log("Creating match:", matchId);

  // Create match using game engine
  createMatch(matchId, playersForMatch);

  // Join both players to the same socket room
  playersForMatch.forEach((player) => {
    player.socket.join(matchId);

    player.socket.emit("matchFound", {
      matchId,
    });
  });
}
