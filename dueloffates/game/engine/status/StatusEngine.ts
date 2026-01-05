import { GameEngine } from "../base/GameEngine";
import { HealthEngine } from "../health/HealthEngine";
import { ShieldEngine } from "../shield/ShieldEngine";

type Side = "player" | "opponent";

export interface StatusState {
  poison: number;
  fatigue: number;
  modifiers: Modifiers;
}

interface Modifiers {
  nextAttackMultiplier: number;
  incomingAttackMultiplier: number;
  nextShieldMultiplier: number;
  cooldownReduction: number;
  halveShield: boolean;
}

export class StatusEngine extends GameEngine {
  private state: Record<Side, StatusState> = {
    player: {
      poison: 0,
      fatigue: 0,
      modifiers: {
        nextAttackMultiplier: 1,
        incomingAttackMultiplier: 1,
        nextShieldMultiplier: 1,
        cooldownReduction: 0,
        halveShield: false,
      },
    },
    opponent: {
      poison: 0,
      fatigue: 0,
      modifiers: {
        nextAttackMultiplier: 1,
        incomingAttackMultiplier: 1,
        nextShieldMultiplier: 1,
        cooldownReduction: 0,
        halveShield: false,
      },
    },
  };

  constructor(
    private healthEngine: HealthEngine,
    private shieldEngine: ShieldEngine
  ) {
    super();
  }

  getDamageMultiplier(side: Side, target: Side) {
    const fatigueMult = 1 + this.state[side].fatigue * 0.2;
    const attackMult = this.state[side].modifiers.nextAttackMultiplier;
    const incomingMult = this.state[target].modifiers.incomingAttackMultiplier;

    console.log("🧮 DAMAGE MULTIPLIER BREAKDOWN");
    console.log({
      attacker: side,
      defender: target,
      fatigueMult,
      attackBuffMultiplier: attackMult,
      defenderIncomingMultiplier: incomingMult,
      finalMultiplier: fatigueMult * attackMult * incomingMult,
    });
    console.log("────────────────────────────");

    return fatigueMult * attackMult * incomingMult;
  }

  getShieldMultiplier(side: Side) {
    const buffMult = this.state[side].modifiers.nextShieldMultiplier;
    const debuffMult = this.state[side].modifiers.halveShield ? 0.5 : 1;

    console.log("🧮 SHIELD MULTIPLIER BREAKDOWN");
    console.log({
      shieldRegainer: side,
      shieldGainMultiplier: buffMult,
      halveShield: debuffMult,
      finalMultiplier: buffMult * debuffMult,
    });
    console.log("────────────────────────────");

    return buffMult * debuffMult;
  }

  public calculatePoisonDamage(side: Side) {
    return this.state[side].poison * 5;
  }

  public applyStatus(side: Side, stack: { fatigue: number; poison: number }) {
    this.state[side].fatigue = this.clamp(
      this.state[side].fatigue + stack.fatigue
    );

    this.state[side].poison = this.clamp(
      this.state[side].poison + stack.poison
    );

    this.notify();
  }

  // resolve turn
  public resolveTurn() {
    (["player", "opponent"] as Side[]).forEach((side) => {
      const poisonDamage = this.calculatePoisonDamage(side);

      console.log(
        `[POISON] ${side}`,
        "stacks:",
        this.state[side].poison,
        "damage:",
        poisonDamage
      );

      if (poisonDamage > 0) {
        const remDamage = this.shieldEngine.absorbShield(poisonDamage, side);
        remDamage > 0 && this.healthEngine.damage(remDamage, side);
      }

      // emitting new objects
      this.state = {
        ...this.state,
        [side]: {
          ...this.state[side],
          poison: this.clamp(this.state[side].poison - 1),
        },
      };

      this.state = {
        ...this.state,
        [side]: {
          ...this.state[side],
          fatigue: this.clamp(this.state[side].fatigue - 1),
        },
      };
    });
    this.notify();
  }

  //----------------BUFF/DEBUFF LAYER-----------------------

  public applyBuff(side: Side, partialModifiers: Partial<Modifiers>) {
    this.state[side].modifiers = {
      ...this.state[side].modifiers,
      ...partialModifiers,
    };
    console.log("-------------------------------");
    console.log("BUFF", this.state);
    console.log("-------------------------------");
    this.notify();
  }

  public applyDebuff(side: Side, partialModifiers: Partial<Modifiers>) {
    this.state[side].modifiers = {
      ...this.state[side].modifiers,
      ...partialModifiers,
    };
    console.log("-------------------------------");
    console.log("Debuff", this.state);
    console.log("-------------------------------");
    this.notify();
  }

  public consumeAttackModifier(side: Side) {
    this.state = {
      ...this.state,
      [side]: {
        ...this.state[side],
        modifiers: {
          ...this.state[side].modifiers,
          nextAttackMultiplier: 1,
        },
      },
    };
    this.notify();
  }

  public consumeReduceIncommingAttackModifier(side: Side) {
    this.state = {
      ...this.state,
      [side]: {
        ...this.state[side],
        modifiers: {
          ...this.state[side].modifiers,
          incomingAttackMultiplier: 1,
        },
      },
    };
    this.notify();
  }

  public consumeShieldModifier(side: Side) {
    this.state = {
      ...this.state,
      [side]: {
        ...this.state[side],
        modifiers: {
          ...this.state[side].modifiers,
          nextShieldMultiplier: 1,
        },
      },
    };
    this.notify();
  }

  public consumeReducedShieldModifier(side: Side) {
    this.state = {
      ...this.state,
      [side]: {
        ...this.state[side],
        modifiers: {
          ...this.state[side].modifiers,
          halveShield: false,
        },
      },
    };
    this.notify();
  }

  public consumeCooldownModifier(side: Side) {
    this.state = {
      ...this.state,
      [side]: {
        ...this.state[side],
        modifiers: {
          ...this.state[side].modifiers,
          cooldownReduction: 0,
        },
      },
    };

    this.notify();
  }

  public transferStatus(side: Side, target: Side) {
    this.state = {
      ...this.state,
      [target]: {
        ...this.state[target],
        fatigue: this.state[side].fatigue + 1,
        poison: this.state[side].poison + 1,
      },
      [side]: {
        ...this.state[side],
        fatigue: 0,
        poison: 0,
      },
    };
  }

  private clamp(num: number) {
    return Math.min(Math.max(num, 0), 5);
  }

  getState() {
    return this.state;
  }
}
