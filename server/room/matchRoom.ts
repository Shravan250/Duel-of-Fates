import { CardEngine } from "../game/engine/cards/CardEngine";
import { DeckEngine } from "../game/engine/deck/DeckEngine";
import { HealthEngine } from "../game/engine/health/HealthEngine";
import { MatchEngine } from "../game/engine/match/MatchEngine";
import { ShieldEngine } from "../game/engine/shield/ShieldEngine";
import { StatusEngine } from "../game/engine/status/StatusEngine";


export class MatchRoom {
  private matchId: string;
  players: {
    player1: string;
    player2: string;
  };
  playerSockets: {
    [playerId: string]: string;
  };

  private healthEngine: HealthEngine;
  private shieldEngine: ShieldEngine;
  private deckEngine: DeckEngine;
  private statusEngine: StatusEngine;
  private cardEngine: CardEngine;
  private matchEngine: MatchEngine;

  isStarted: boolean;
  isFinished: boolean;


  constructor(matchId: string) {
    this.matchId = matchId;
    this.players = {
      player1: "",
      player2: "",
    };
    this.playerSockets = {};
    this.healthEngine = new HealthEngine(100);
    this.shieldEngine = new ShieldEngine(50);
    this.deckEngine = new DeckEngine();
    this.statusEngine = new StatusEngine(this.healthEngine, this.shieldEngine);
    this.cardEngine = new CardEngine(
      this.healthEngine,
      this.shieldEngine,
      this.deckEngine,
      this.statusEngine,
    );

    this.matchEngine = new MatchEngine(
      this.deckEngine,
      this.healthEngine,
      this.shieldEngine,
      this.cardEngine,
      this.statusEngine,
    );

    this.isStarted = true;
    this.isFinished = false;
  }

  public join(playerId: string, socketId: string) {

  if (!this.players.player1) {
    this.players.player1 = playerId;
    this.playerSockets[playerId] = socketId;

  } else if (!this.players.player2) {
    this.players.player2 = playerId;
    this.playerSockets[playerId] = socketId;

  } else {
    throw new Error("Room full");
  }

  if (this.isReady() && !this.isStarted) {
    this.matchEngine.startMatch();
    this.isStarted = true;
  }
}

  public async playCard(playerId: string, cardInstanceId: string) {
    const resolved=await this.matchEngine.selectCard(cardInstanceId, playerId === this.players.player1 ? "PLAYER" : "OPPONENT");

    if(resolved)return this.getState();

    return null;
  }

  public getState() {
    return {
      matchId: this.matchId,
      match: this.matchEngine.getState(),
      status: this.statusEngine.getState(),
      health: this.healthEngine.getHp(),
      shield: this.shieldEngine.getShield(),
      deck: this.deckEngine.getState(),
    }
  }

  public getPlayerRole(playerId: string) {
    return playerId === this.players.player1 ? "PLAYER" : "OPPONENT";
  }

  private isReady() {
    return this.players.player1 && this.players.player2;
  }

  public destroy() {
    this.matchEngine.cleanup();
  }
}
