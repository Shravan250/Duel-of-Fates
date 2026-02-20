import { GameEngine } from "../base/GameEngine";
import type { CardDefination, CardInstance, CardProps } from "../../../types";
import {
  formattedDeckGenerator,
  createCardInstances,
  deckRandomizer,
} from "../../../lib/helper";

export class DeckEngine extends GameEngine {
  private playerDeck: CardDefination[] = [];
  private opponentDeck: CardDefination[] = [];
  private playerInstances: CardInstance[] = [];
  private opponentInstances: CardInstance[] = [];
  private selectedPlayerCard: string | null = null;
  private selectedOpponentCard: string | null = null;

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

  public clearSelections() {
    this.selectedPlayerCard = null;
    this.selectedOpponentCard = null;
    this.notify();
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

  public getInstanceById(
    instanceId: string,
    side: "PLAYER" | "OPPONENT",
  ): CardInstance | null {
    const list =
      side === "PLAYER" ? this.playerInstances : this.opponentInstances;

    return list.find((c) => c.id === instanceId) ?? null;
  }

  public applyCooldown(instanceId: string, cooldown: number, side: string) {
    let list =
      side === "PLAYER" ? this.playerInstances : this.opponentInstances;

    const cardToUpdate = list.find((card) => card.id === instanceId);

    if (!cardToUpdate) return;

    cardToUpdate.cooldown = cooldown + 1;

    this.notify();
  }

  //reduce cooldown
  public tickCooldown() {
    const allInstances = [...this.playerInstances, ...this.opponentInstances];

    for (const card of allInstances) {
      if (card.cooldown > 0) {
        card.cooldown -= 1;
      }
    }

    this.notify();
  }

  public autoSelectCard(side: "PLAYER" | "OPPONENT") {
    //selecting the instance array
    let list =
      side === "PLAYER" ? this.playerInstances : this.opponentInstances;

    //filtering
    const remainingInstances = list.filter((c) => c.cooldown === 0);

    const selectedCard =
      remainingInstances[Math.floor(Math.random() * remainingInstances.length)];

    if (!selectedCard) return;

    if (side === "PLAYER") {
      this.selectedPlayerCard = selectedCard.id;
    } else {
      this.selectedOpponentCard = selectedCard.id;
    }

    this.notify();
    return selectedCard.id;
  }

  public selectCard(instanceId: string, side: "PLAYER" | "OPPONENT") {
    // if (this.currentPhase !== "PLAY") return;

    if (!this.canPlayCard(instanceId, side)) return;

    if (side === "PLAYER") {
      this.selectedPlayerCard = instanceId;
    } else {
      this.selectedOpponentCard = instanceId;
    }

    this.notify();
  }

  //check if player can play the card
  public canPlayCard(
    cardInstanceId: string,
    side: "PLAYER" | "OPPONENT",
  ): boolean {
    const card = this.getInstanceById(cardInstanceId, side);
    return card ? card.cooldown === 0 : false;
  }

  public cooldownRemaning(cardId: string, side: "PLAYER" | "OPPONENT") {
    const card = this.getInstanceById(cardId, side);
    return card ? card.cooldown : 0;
  }

  // getState form zustand (current)
  public getState() {
    return {
      player: formattedDeckGenerator(this.playerInstances, this.playerDeck),
      opponent: formattedDeckGenerator(
        this.opponentInstances,
        this.opponentDeck,
      ),
      playerDeck: this.playerDeck,
      opponentDeck: this.opponentDeck,
      playerInstances: this.playerInstances,
      opponentInstances: this.opponentInstances,
      selectedPlayerCard: this.selectedPlayerCard,
      selectedOpponentCard: this.selectedOpponentCard,
    };
  }
}
