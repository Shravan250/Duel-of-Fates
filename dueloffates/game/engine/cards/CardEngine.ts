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
import { StatusEngine } from "../status/StatusEngine";

type cardType =
  | "attack"
  | "defense"
  | "buff"
  | "debuff"
  | "status"
  | "utility"
  | "heal";

export class CardEngine extends GameEngine {
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
  private statusEngine: StatusEngine;
  constructor(
    healthEngine: HealthEngine,
    shieldEngine: ShieldEngine,
    deckEngine: DeckEngine,
    statusEngine: StatusEngine
  ) {
    super();
    this.healthEngine = healthEngine;
    this.shieldEngine = shieldEngine;
    this.deckEngine = deckEngine;
    this.statusEngine = statusEngine;
  }
  public async resolve(
    playerCardInstanceId: string,
    opponentCardInstanceId: string
  ) {
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

    const opponentCard = this.getCard(
      opponentCardInstance.definitionId,
      opponentCardType
    );
    const playerCard = this.getCard(
      playerCardInstance.definitionId,
      playerCardType
    );

    if (!playerCard || !opponentCard) {
      return;
    }

    if (playerCard.priority >= opponentCard.priority) {
      this.applyEffects("player", playerCard, playerCardInstanceId);
      this.applyEffects("opponent", opponentCard, opponentCardInstanceId);
    } else {
      this.applyEffects("opponent", opponentCard, opponentCardInstanceId);
      this.applyEffects("player", playerCard, playerCardInstanceId);
    }
  }

  private applyEffects(
    role: "player" | "opponent",
    card: CardDefination,
    instanceId: string
  ) {
    let target: "player" | "opponent" = role;
    if (card.type === "attack") {
      target = this.invertRole(role);

      console.log("⚔️ ATTACK INITIATED");
      console.log({
        attacker: role,
        defender: target,
        baseDamage: card.damage,
        cardId: card.definitionId,
      });

      const damageMultiplier = this.statusEngine.getDamageMultiplier(
        role,
        target
      );
      const totalDamage = Math.floor(card.damage! * damageMultiplier);

      console.log("🔥 DAMAGE CALCULATION RESULT");
      console.log({
        baseDamage: card.damage,
        multiplier: damageMultiplier,
        totalDamage,
      });

      // consume modifiers
      this.statusEngine.consumeAttackModifier(role);
      this.statusEngine.consumeReduceIncommingAttackModifier(target);

      const remDamage = this.shieldEngine.absorbShield(totalDamage, target);
      remDamage > 0 && this.healthEngine.damage(remDamage, target);
    } else if (card.type === "defense") {
      const shieldMuliplier = this.statusEngine.getShieldMultiplier(target);

      const totalShield = Math.floor(card.shield_gain! * shieldMuliplier);

      console.log("🔥 SHIELD GAIN CALCULATION RESULT");
      console.log({
        baseGain: card.shield_gain,
        multiplier: shieldMuliplier,
        totalShield,
      });

      // consume modifiers
      this.statusEngine.consumeShieldModifier(target);
      this.statusEngine.consumeReducedShieldModifier(target);

      this.shieldEngine.gainShield(totalShield, target);
    } else if (card.type === "heal") {
      this.healthEngine.heal(card.health_gain!, target);
    } else if (card.type === "status damage" && card.effect) {
      let stack = { fatigue: 0, poison: 0 };

      if (card.effect.random) {
        const effectKeys = Object.keys(card.effect.random) as (
          | "poison"
          | "fatigue"
        )[];
        const chosenEffectKey =
          effectKeys[Math.floor(Math.random() * effectKeys.length)];
        const values = card.effect.random[chosenEffectKey]!;
        const effectValue = values[Math.floor(Math.random() * values.length)];

        stack[chosenEffectKey] = effectValue;
      } else {
        stack = {
          poison: card.effect.poison ?? 0,
          fatigue: card.effect.fatigue ?? 0,
        };
      }

      const target = this.invertRole(role);

      this.statusEngine.applyStatus(target, stack);
    } else if (card.type === "buff" && card.modifiers) {
      this.statusEngine.applyBuff(role, card.modifiers);
    } else if (card.type === "debuff" && card.modifiers) {
      target = this.invertRole(role);
      this.statusEngine.applyDebuff(target, card.modifiers);
    } else if (card.type === "utility") {
      this.handleUtility(card, role);
    }

    this.deckEngine.applyCooldown(
      instanceId,
      card.cooldown,
      role.toUpperCase()
    );
  }

  private handleUtility(card: CardDefination, role: "player" | "opponent") {
    if (card.name === "Swap") {
      this.healthEngine.swapHealth();
      this.shieldEngine.swapShield();
    }
    else if(card.name==='Reversal'){
      const target=this.invertRole(role);
      this.statusEngine.transferStatus(role,target);
    }
  }

  private getCardType(cardId: string): cardType {
    return cardId.split("_")[0] as cardType;
  }

  private getCard(cardId: string, cardType: cardType) {
    return this.typeCardMap[cardType].find((card) => {
      return card.definitionId === cardId;
    });
  }

  private invertRole(role: "player" | "opponent") {
    return role === "player" ? "opponent" : "player";
  }
}
