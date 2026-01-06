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
import { useDebugStore } from "@/store/useDebugStore";

type Side = "player" | "opponent";

// Debug delays (in milliseconds)
const DEBUG_DELAYS = {
  CARD_EFFECT: 1000, // Delay between card effects (damage, heal, shield)
  STATUS_TICK: 2000, // Delay for poison/fatigue ticks
  EFFECT_GROUP: 1500, // Small delay between effect types within same card
};

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

  /**
   * Helper: Add intentional delay for debugging/visualization
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Helper: Emit debug event to store
   */
  private emitDebugEvent(
    side: Side,
    type:
      | "damage"
      | "heal"
      | "shield"
      | "poison"
      | "fatigue"
      | "buff"
      | "debuff"
      | "utility",
    message: string,
    value?: number
  ) {
    useDebugStore.getState().addEvent({ side, type, message, value });
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
  private async applyCardEffects(
    role: Side,
    card: CardDefination,
    instanceId: string
  ) {
    // execute effect in order
    for (const effect of card.effects) {
      // T && F ,

      if (effect.condition) {
        if (!this.matchCondition(effect.condition, role)) {
          continue; // skipping effect if condition not met
        }
      }

      this.applyEffects(role, effect);

      if (effect.skipElse) {
        break;
      }
    }

    // Applying cooldown after all effects
    this.applyCooldownWithModifiers(instanceId, card.cooldown, role);
  }

  /*
   NEW: Apply a single effect 
   Handlesall effect types(damage, heal, shield, status, modifiers)
   */
  private async applyEffects(role: "player" | "opponent", effect: Effect) {
    const target = this.resolveTarget(effect, role);

    // DAMAGE
    if (effect.damage && effect.damage > 0) {
      await this.applyDamage(role, target, effect.damage);
    }

    // Shield
    if (effect.shield && effect.shield > 0) {
      await this.applyShield(target, effect.shield);
    }

    // HEAL
    if (effect.heal && effect.heal > 0) {
      await this.applyHeal(target, effect.heal);
    }

    //  STATUS (poison,, shieldBreak)
    if (effect.status) {
      await this.applyStatusEffect(target, effect.status);
    }

    // MODIFIERS
    if (effect.modifiers) {
      await this.applyModifiers(target, effect.modifiers);
    }

    // UTILITY EFFECTS
    if (effect.utility) {
      await this.applyUtility(role, target, effect.utility.type);
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

  private async applyDamage(
    attacker: Side,
    defender: Side,
    baseDamage: number
  ) {
    const damageMultiplier = this.statusEngine.getDamageMultiplier(
      attacker,
      defender
    );
    const totalDamage = Math.floor(baseDamage * damageMultiplier);

    // Emit debug event
    this.emitDebugEvent(defender, "damage", "Took damage", totalDamage);

    // Consume attackRelated modifiers
    this.statusEngine.consumeAttackModifier(attacker);
    this.statusEngine.consumeReduceIncommingAttackModifier(defender);

    // Shield absorbs => HP reduce
    const remDamage = this.shieldEngine.absorbShield(totalDamage, defender);
    if (remDamage > 0) {
      this.healthEngine.damage(remDamage, defender);
    }
    await this.delay(DEBUG_DELAYS.CARD_EFFECT);
  }

  /*
    REFACTORED: Shield gain with multipliers
   */
  private async applyShield(target: Side, baseShield: number) {
    const shieldMuliplier = this.statusEngine.getShieldMultiplier(target);

    const totalShield = Math.floor(baseShield * shieldMuliplier);

    // Emit debug event
    this.emitDebugEvent(target, "shield", "Gained shield", totalShield);

    // consume modifiers
    this.statusEngine.consumeShieldModifier(target);
    this.statusEngine.consumeReducedShieldModifier(target);

    this.shieldEngine.gainShield(totalShield, target);

    await this.delay(DEBUG_DELAYS.CARD_EFFECT);
  }

  /*
    REFACTORED: Shield gain with multipliers
   */
  private async applyHeal(target: Side, healAmount: number) {
    this.emitDebugEvent(target, "heal", "Healed", healAmount);
    this.healthEngine.heal(healAmount, target);
    await this.delay(DEBUG_DELAYS.CARD_EFFECT);
  }

  /*
    REFACTORED &NEW: Apply status effects (poison, fatigue, random)
   */
  private async applyStatusEffect(
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

      this.emitDebugEvent(
        target,
        chosenKey,
        `Applied ${chosenKey}`,
        effectValue
      );
    } else {
      // Direct application
      stack = {
        poison: status.poison ?? 0,
        fatigue: status.fatigue ?? 0,
      };

      if (stack.poison > 0) {
        this.emitDebugEvent(target, "poison", "Applied poison", stack.poison);
      }
      if (stack.fatigue > 0) {
        this.emitDebugEvent(
          target,
          "fatigue",
          "Applied fatigue",
          stack.fatigue
        );
      }
    }

    this.statusEngine.applyStatus(target, stack);

    await this.delay(DEBUG_DELAYS.CARD_EFFECT);
  }

  /*
    NEW: Apply MOdifiers
  */
  private async applyModifiers(
    target: Side,
    modifiers: NonNullable<Effect["modifiers"]>
  ) {
    // Build debug message
    const modNames = [];
    if (
      modifiers.nextAttackMultiplier &&
      modifiers.nextAttackMultiplier !== 1
    ) {
      modNames.push(`Atk x${modifiers.nextAttackMultiplier}`);
    }
    if (
      modifiers.nextShieldMultiplier &&
      modifiers.nextShieldMultiplier !== 1
    ) {
      modNames.push(`Shield x${modifiers.nextShieldMultiplier}`);
    }
    if (
      modifiers.incomingAttackMultiplier &&
      modifiers.incomingAttackMultiplier !== 1
    ) {
      modNames.push(`Incoming x${modifiers.incomingAttackMultiplier}`);
    }
    if (modifiers.cooldownReduction && modifiers.cooldownReduction > 0) {
      modNames.push(`CD -${modifiers.cooldownReduction}`);
    }
    if (modifiers.halveShield) {
      modNames.push("Shield halved");
    }

    const eventType =
      (modifiers.nextAttackMultiplier && modifiers.nextAttackMultiplier > 1) ||
      (modifiers.nextShieldMultiplier && modifiers.nextShieldMultiplier > 1) ||
      (modifiers.cooldownReduction && modifiers.cooldownReduction > 0)
        ? "buff"
        : "debuff";

    this.emitDebugEvent(target, eventType, modNames.join(", "));

    this.statusEngine.applyModifiers(target, modifiers);

    await this.delay(DEBUG_DELAYS.CARD_EFFECT);
  }

  /*
   NEW: Apply utility effects
   */
  private async applyUtility(role: Side, target: Side, utilityType: string) {
    switch (utilityType) {
      case "swap":
        this.emitDebugEvent("player", "utility", "🔄 HP/Shield swapped");
        this.emitDebugEvent("opponent", "utility", "🔄 HP/Shield swapped");
        this.healthEngine.swapHealth();
        this.shieldEngine.swapShield();
        break;

      case "reversal":
        this.emitDebugEvent(role, "utility", "🔄 Status cleared");
        this.emitDebugEvent(target, "utility", "⚠️ Status received");
        this.statusEngine.transferStatus(role, target);
        break;

      default:
        console.log(`Unknown utility type: ${utilityType}`);
    }

    await this.delay(DEBUG_DELAYS.CARD_EFFECT);
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
