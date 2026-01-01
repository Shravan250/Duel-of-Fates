import { createCardInstances, deckRandomizer } from "@/lib/helper";
import { GameEngine } from "../base/GameEngine";
import { CardDefination, CardInstance } from "@/types";

export class DeckEngine extends GameEngine {
  private playerDeck: CardDefination[] = [];
  private opponentDeck: CardDefination[] = [];
  private playerInstances: CardInstance[] = [];
  private opponentInstances: CardInstance[] = [];

  constructor() {
    super();
  }

  public InitilizeDeck() {
    this.playerDeck = deckRandomizer();
    this.opponentDeck = deckRandomizer();
    this.playerInstances = createCardInstances(this.playerDeck, "PLAYER");
    this.opponentInstances = createCardInstances(this.opponentDeck, "OPPONENT");

    this.notify();
  }

  public resetCards() {
    this.InitilizeDeck();
  }

  //getters
  public getPlayerDeck(): CardDefination[] {
    return this.playerDeck;
  }

  public getOpponenetDeck(): CardDefination[] {
    return this.opponentDeck;
  }

  public getPlayerInstances(): CardInstance[] {
    return this.playerInstances;
  }

  public getOpponentInstances(): CardInstance[] {
    return this.opponentInstances;
  }

  // getState form zustand (current)
  public getState() {
    return {
      playerDeck: this.playerDeck,
      opponentDeck: this.opponentDeck,
      playerInstances: this.playerInstances,
      opponentInstances: this.opponentInstances,
    };
  }
}
