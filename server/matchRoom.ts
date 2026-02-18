import { Socket } from "socket.io";

import { bindDeckEngine } from "./game/binders/bindDeckEngine";
import { bindHealthEngine } from "./game/binders/bindHealthEngine";
import { bindShieldEngine } from "./game/binders/bindShieldEngine";
import { bindStatusEngine } from "./game/binders/bindStatusEngine";
import { bindMatchEngine } from "./game/binders/bindMatchEngine";

/*
 * Represents a player inside a match
 */
export type Player = {
  id: string;
  socket: Socket;
};

/*
 * Holds all engine controllers for a match
 */
type MatchControllers = {
  deckController: any;
  healthController: any;
  shieldController: any;
  statusController: any;
  matchController: any;
};

/*
 * Represents a single active match
 */
type Match = {
  id: string;
  players: Player[];
  controllers: MatchControllers;
};

/*
 * In-memory storage for active matches
 */
const activeMatches = new Map<string, Match>();

/*
 * Creates a new match and initializes all engines
 */
export function createMatch(matchId: string, players: Player[]) {
  if (players.length !== 2) {
    throw new Error("Match requires exactly 2 players");
  }

  console.log(`Initializing engines for match ${matchId}`);

  // Initialize all game engines
  const controllers: MatchControllers = {
    deckController: bindDeckEngine(),
    healthController: bindHealthEngine(),
    shieldController: bindShieldEngine(),
    statusController: bindStatusEngine(),
    matchController: bindMatchEngine(),
  };

  const match: Match = {
    id: matchId,
    players,
    controllers,
  };

  activeMatches.set(matchId, match);

  console.log(`Match ready: ${matchId}`);
}

/*
 * Returns a match by ID
 */
export function getMatch(matchId: string) {
  return activeMatches.get(matchId);
}

/*
 * Destroys a match and cleans up resources
 */
export function removeMatch(matchId: string) {
  const match = activeMatches.get(matchId);
  if (!match) return;

  console.log(`Cleaning up match ${matchId}`);

  // Cleanup engine subscriptions safely
  match.controllers.deckController?.unsubscribe?.();
  match.controllers.healthController?.unsubscribe?.();
  match.controllers.shieldController?.unsubscribe?.();
  match.controllers.statusController?.unsubscribe?.();
  match.controllers.matchController?.unsubscribe?.();

  activeMatches.delete(matchId);

  console.log(`Match destroyed: ${matchId}`);
}
