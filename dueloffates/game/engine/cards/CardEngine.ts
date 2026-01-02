import { CardDefination, CardInstance } from "@/types";
import { GameEngine } from "../base/GameEngine";
import {
  attackCards,
  buffDebuffCards,
  defenceCards,
  healCards,
  statusDamage,
  utilityCards,
} from "./CardDefinations";
import { HealthEngine } from "../health/HealthEngine";
import { ShieldEngine } from "../shield/ShieldEngine";
import { DeckEngine } from "../deck/DeckEngine";

type cardType =
  | "attack"
  | "defense"
  | "buff"
  | "debuff"
  | "status"
  | "utility"
  | "heal";

export class cardEngine extends GameEngine {
  private typeCardMap: Record<cardType, CardDefination[]> = {
    attack: attackCards,
    defense: defenceCards,
    buff: buffDebuffCards,
    debuff: buffDebuffCards,
    utility: utilityCards,
    status: statusDamage,
    heal: healCards,
  };
  private healthEngine: HealthEngine;
  private shieldEngine: ShieldEngine;
  private deckEngine: DeckEngine;
  constructor(
    healthEngine: HealthEngine,
    shieldEngine: ShieldEngine,
    deckEngine: DeckEngine
  ) {
    super();
    this.healthEngine = healthEngine;
    this.shieldEngine = shieldEngine;
    this.deckEngine = deckEngine;
  }
  public resolve(playerCardInstanceId: string, opponentCardInstanceId: string) {
    const playerCardInstance = this.deckEngine.getInstanceById(
      playerCardInstanceId,
      "PLAYER"
    );
    const opponentCardInstance = this.deckEngine.getInstanceById(
      opponentCardInstanceId,
      "OPPONENT"
    );

    if (!playerCardInstance || !opponentCardInstance) return;

    const playerCardType = this.getCardType(playerCardInstance.definitionId);
    const opponentCardType = this.getCardType(
      opponentCardInstance.definitionId
    );

    const playerCard = this.getCard(
      playerCardInstance.definitionId,
      playerCardType
    );
    const opponentCard = this.getCard(
      opponentCardInstance.definitionId,
      opponentCardType
    );

    if (!playerCard || !opponentCard) {
      return;
    }

    if (playerCard.priority >= opponentCard.priority) {
      this.applyEffects("player", playerCard);
      this.applyEffects("opponent", opponentCard);
    } else {
      this.applyEffects("opponent", opponentCard);
      this.applyEffects("player", playerCard);
    }
  }

  private applyEffects(role: "player" | "opponent", card: CardDefination) {
    let target: "player" | "opponent" = role;
    if (card.type === "attack") {
      target = this.invertRole(role);

      const remDamage = this.shieldEngine.absorbShield(card.damage!, target);
      remDamage > 0 && this.healthEngine.damage(remDamage, target);

    } else if (card.type === "defense") {

      this.shieldEngine.gainShield(card.shield_gain!, target);

    } else if (card.type === "heal") {

      this.healthEngine.heal(card.health_gain!, target);
      
    }
  }

  private getCardType(cardId: string): cardType {
    return cardId.split("_")[0] as cardType;
  }

  private getCard(cardId: string, cardType: cardType) {
    return this.typeCardMap[cardType].find(
      (card) => card.definitionId === cardId
    );
  }

  private invertRole(role: "player" | "opponent") {
    return role === "player" ? "opponent" : "player";
  }
}
