import { CardDefination, Condition, Effect } from "@/types";
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

type Side = "player" | "opponent";

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
      this.applyCardEffects("player", playerCard, playerCardInstanceId);
      this.applyCardEffects("opponent", opponentCard, opponentCardInstanceId);
    } else {
      this.applyCardEffects("opponent", opponentCard, opponentCardInstanceId);
      this.applyCardEffects("player", playerCard, playerCardInstanceId);
    }
  }

  /*
    NEW: Apply all effects from a card in order
    Replaces the if lelse  statements  
  */
  private applyCardEffects(
    role: Side,
    card: CardDefination,
    instanceId: string
  ) {
    // execute effect in order
    for (const effect of card.effects) {
      if (effect.condition) {
        if (!this.matchCondition(effect.condition, role)) {
          continue; // skipping effect if condition not met
        }
      }

      this.applyEffects(role, effect);
    }

    // Applying cooldown after all effects
    this.applyCooldownWithModifiers(instanceId, card.cooldown, role);
  }

  /*
   NEW: Apply a single effect 
   Handlesall effect types(damage, heal, shield, status, modifiers)
   */
  private applyEffects(role: "player" | "opponent", effect: Effect) {
    const target = this.resolveTarget(effect, role);

    // DAMAGE
    if (effect.damage && effect.damage > 0) {
      this.applyDamage(role, target, effect.damage);
    }

    // Shield
    if (effect.shield && effect.shield > 0) {
      this.applyShield(target, effect.shield);
    }

    // HEAL
    if (effect.heal && effect.heal > 0) {
      this.applyHeal(target, effect.heal);
    }

    //  STATUS (poison,, shieldBreak)
    if (effect.status) {
      this.applyStatusEffect(target, effect.status);
    }

    // MODIFIERS
    if (effect.modifiers) {
      this.applyModifiers(target, effect.modifiers);
    }

    // UTILITY EFFECTS
    if (effect.utility) {
      this.applyUtility(role, target, effect.utility.type);
    }
  }

  // resolving WHO THE HECK IS TARGET
  private resolveTarget(effect: Effect, role: Side): Side {
    if (effect.target === "self") return role;
    if (effect.target === "opponent") return this.invertRole(role);
    return role;
  }

  /*
    REFACtORING: Damage with multipliers
   */

  private applyDamage(attacker: Side, defender: Side, baseDamage: number) {
    const damageMultiplier = this.statusEngine.getDamageMultiplier(
      attacker,
      defender
    );
    const totalDamage = Math.floor(baseDamage * damageMultiplier);

    // Consume attackRelated modifiers
    this.statusEngine.consumeAttackModifier(attacker);
    this.statusEngine.consumeReduceIncommingAttackModifier(defender);

    // Shield absorbs => HP reduce
    const remDamage = this.shieldEngine.absorbShield(totalDamage, defender);
    if (remDamage > 0) {
      this.healthEngine.damage(remDamage, defender);
    }
  }

  /*
    REFACTORED: Shield gain with multipliers
   */
  private applyShield(target: Side, baseShield: number) {
    const shieldMuliplier = this.statusEngine.getShieldMultiplier(target);

    const totalShield = Math.floor(baseShield * shieldMuliplier);

    // consume modifiers
    this.statusEngine.consumeShieldModifier(target);
    this.statusEngine.consumeReducedShieldModifier(target);

    this.shieldEngine.gainShield(totalShield, target);
  }

  /*
    REFACTORED: Shield gain with multipliers
   */
  private applyHeal(target: Side, healAmount: number) {
    this.healthEngine.heal(healAmount, target);
  }

  /*
    REFACTORED &NEW: Apply status effects (poison, fatigue, random)
   */
  private applyStatusEffect(
    target: Side,
    status: NonNullable<Effect["status"]> // learned to use NonNullable
  ) {
    let stack = { fatigue: 0, poison: 0 };

    // Handle random selection
    if (status.random) {
      const effectKeys = Object.keys(status.random) as ("poison" | "fatigue")[];
      const chosenKey =
        effectKeys[Math.floor(Math.random() * effectKeys.length)];
      const values = status.random[chosenKey]!;
      const effectValue = values[Math.floor(Math.random() * values.length)];
      stack[chosenKey] = effectValue;
    } else {
      // Direct application
      stack = {
        poison: status.poison ?? 0,
        fatigue: status.fatigue ?? 0,
      };
    }

    this.statusEngine.applyStatus(target, stack);
  }

  /*
    NEW: Apply MOdifiers
  */
  private applyModifiers(
    target: Side,
    modifiers: NonNullable<Effect["modifiers"]>
  ) {
    this.statusEngine.applyModifiers(target, modifiers);
  }

  /*
   NEW: Apply utility effects
   */
  private applyUtility(role: Side, target: Side, utilityType: string) {
    switch (utilityType) {
      case "swap":
        this.healthEngine.swapHealth();
        this.shieldEngine.swapShield();
        break;

      case "reversal":
        this.statusEngine.transferStatus(role, target);
        break;

      default:
        console.log(`Unknown utility type: ${utilityType}`);
    }
  }

  /*
    NEW: Check if a condition is satisfied
   */
  private matchCondition(condition: Condition, role: Side): boolean {
    const hp = this.healthEngine.getHp();
    const statusState = this.statusEngine.getState();
    const shield = this.shieldEngine.getShield();
    const opponent = this.invertRole(role);

    // Check self conditions
    if (condition.self) {
      const self = condition.self;

      if (self.hpBelow !== undefined && hp[role] >= self.hpBelow) {
        return false;
      }

      if (self.hpAbove !== undefined && hp[role] <= self.hpAbove) {
        return false;
      }

      if (
        self.fatigueAbove !== undefined &&
        statusState[role].fatigue <= self.fatigueAbove
      ) {
        return false;
      }

      if (
        self.fatigueBelow !== undefined &&
        statusState[role].fatigue >= self.fatigueBelow
      ) {
        return false;
      }

      if (self.hasShield !== undefined) {
        const hasShield = shield[role] > 0;
        if (self.hasShield !== hasShield) {
          return false;
        }
      }
    }

    // Check opponent conditions
    if (condition.opponent) {
      const opp = condition.opponent;

      if (opp.hpBelow !== undefined && hp[opponent] >= opp.hpBelow) {
        return false;
      }

      if (opp.hasShield !== undefined) {
        const hasShield = shield[opponent] > 0;
        if (opp.hasShield !== hasShield) {
          return false;
        }
      }

      if (opp.hasFatigue !== undefined) {
        const hasFatigue = statusState[opponent].fatigue > 0;
        if (opp.hasFatigue !== hasFatigue) {
          return false;
        }
      }
    }

    return true;
  }

  //Cooldown & Modifiers
  private applyCooldownWithModifiers(
    instanceId: string,
    baseCooldown: number,
    role: Side
  ) {
    const modifiers = this.statusEngine.getState()[role].modifiers;
    const reduction = modifiers.cooldownReduction;

    const finalCooldown =
      reduction > 0 ? Math.max(0, baseCooldown - reduction) : baseCooldown;

    this.deckEngine.applyCooldown(
      instanceId,
      finalCooldown,
      role.toUpperCase()
    );

    if (reduction > 0) {
      this.statusEngine.consumeCooldownModifier(role);
    }
  }

  // ------------------------------------------
  // UTILITY METHODS
  // ------------------------------------------

  private getCardType(cardId: string): cardType {
    return cardId.split("_")[0] as cardType;
  }

  private getCard(cardId: string, cardType: cardType) {
    return this.typeCardMap[cardType].find((card) => {
      return card.definitionId === cardId;
    });
  }

  private invertRole(role: Side) {
    return role === "player" ? "opponent" : "player";
  }
}
