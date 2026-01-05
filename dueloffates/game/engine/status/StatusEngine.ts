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

  public calculatePoisonDamage(side: Side) {
    return this.state[side].poison * 5;
  }

  //   public applypoison(side: Side, stack: number) {
  //     this.state[side].poison = this.clamp(this.state[side].poison + stack, 0, 5);
  //     this.notify();
  //   }

  //   public reducepoison(side: Side, stack: number) {
  //     this.state[side].poison = this.clamp(this.state[side].poison - stack, 0, 5);
  //     this.notify();
  //   }

  //   public applyFatigue(side: Side, stack: number) {
  //     this.state[side].fatigue = this.clamp(
  //       this.state[side].fatigue + stack,
  //       0,
  //       5
  //     );
  //     this.notify();
  //   }

  //   public reduceFatigue(side: Side, stack: number) {
  //     this.state[side].fatigue = this.clamp(
  //       this.state[side].fatigue - stack,
  //       0,
  //       5
  //     );
  //     this.notify();
  //   }

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

      this.state[side].poison = this.clamp(this.state[side].poison - 1);
      this.state[side].fatigue = this.clamp(this.state[side].fatigue - 1);
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
    const multiplier = this.state[side].modifiers.nextAttackMultiplier;
    this.state[side].modifiers.nextAttackMultiplier = 1;
    return multiplier;
  }

  public consumeShieldModifier(side: Side) {
    const multiplier = this.state[side].modifiers.nextShieldMultiplier;
    this.state[side].modifiers.nextShieldMultiplier = 1;
    return multiplier;
  }

  public consumeCooldownModifier(side: Side) {
    const reduceBy = this.state[side].modifiers.cooldownReduction;
    this.state[side].modifiers.cooldownReduction = 0;
    return reduceBy;
  }

  public consumeReduceIncommingAttackModifier(side: Side) {
    const multiplier = this.state[side].modifiers.incomingAttackMultiplier;
    this.state[side].modifiers.incomingAttackMultiplier = 1;
    return multiplier;
  }

  private clamp(num: number) {
    return Math.min(Math.max(num, 0), 5);
  }

  getState() {
    return this.state;
  }
}
