import type { Server, Socket } from "socket.io";
import { CardEngine } from "../game/engine/cards/CardEngine";
import { DeckEngine } from "../game/engine/deck/DeckEngine";
import { HealthEngine } from "../game/engine/health/HealthEngine";
import { MatchEngine } from "../game/engine/match/MatchEngine";
import { ShieldEngine } from "../game/engine/shield/ShieldEngine";
import { StatusEngine } from "../game/engine/status/StatusEngine";
import { LogEngine } from "../game/engine/log/logEngine";
import type { Player } from "../matchmaking/queue";

export class MatchRoom {
  private matchId: string;
  private io: Server;
  players: {
    player1: { id: string; socket: Socket } | null;
    player2: { id: string; socket: Socket } | null;
  };

  private healthEngine: HealthEngine;
  private shieldEngine: ShieldEngine;
  private deckEngine: DeckEngine;
  private statusEngine: StatusEngine;
  private cardEngine: CardEngine;
  private matchEngine: MatchEngine;
  private logEngine: LogEngine;

  isStarted: boolean;
  isFinished: boolean;

  constructor(matchId: string, io: Server) {
    this.matchId = matchId;
    this.io = io;
    this.players = { player1: null, player2: null };
    this.healthEngine = new HealthEngine(100);
    this.shieldEngine = new ShieldEngine(50);
    this.deckEngine = new DeckEngine();
    this.logEngine = new LogEngine();
    this.statusEngine = new StatusEngine(
      this.healthEngine,
      this.shieldEngine,
      this.logEngine,
    );
    this.cardEngine = new CardEngine(
      this.healthEngine,
      this.shieldEngine,
      this.deckEngine,
      this.statusEngine,
      this.logEngine,
    );

    this.matchEngine = new MatchEngine(
      this.deckEngine,
      this.healthEngine,
      this.shieldEngine,
      this.cardEngine,
      this.statusEngine,
    );

    this.isStarted = false;
    this.isFinished = false;
  }

  public join(player: Player) {
    if (!this.players.player1) {
      this.players.player1 = player;
      this.players.player1.socket.join(this.matchId);
    } else if (!this.players.player2) {
      this.players.player2 = player;
      this.players.player2.socket.join(this.matchId);
    } else {
      throw new Error("Room full");
    }

    player.socket.emit("matchJoined", {
      matchId: this.matchId,
      role: this.getPlayerRole(player.id),
    });

    if (this.isReady() && !this.isStarted) {
      this.matchEngine.startMatch();
      this.isStarted = true;
      this.emitState();
    }
  }

  public async playCard(playerId: string, cardInstanceId: string) {
    const resolved = await this.matchEngine.selectCard(
      cardInstanceId,
      this.getPlayerRole(playerId),
    );

    if (resolved) {
      this.emitState();
    }
  }

  public getState() {
    return {
      matchId: this.matchId,
      match: this.matchEngine.getState(),
      status: this.statusEngine.getState(),
      health: this.healthEngine.getHp(),
      shield: this.shieldEngine.getShield(),
      deck: this.deckEngine.getState(),
      logs: this.logEngine.getState(),
    };
  }

  private emitState() {
    const state = this.getState();
    this.io.to(this.matchId).emit("gameState", state);
  }

  public getPlayerRole(playerId: string) {
    return playerId === this.players.player1!.id ? "PLAYER" : "OPPONENT";
  }

  private isReady() {
    return this.players.player1 && this.players.player2;
  }

  public destroy() {
    this.matchEngine.cleanup();
  }
}
