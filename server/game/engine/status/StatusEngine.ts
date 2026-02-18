import { useDebugStore } from "@/store/useDebugStore";
import { GameEngine } from "../base/GameEngine";
import { HealthEngine } from "../health/HealthEngine";
import { ShieldEngine } from "../shield/ShieldEngine";
import { useLogStore } from "@/store/useLogStore";

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

// Debug delay for status ticks
// const STATUS_TICK_DELAY = 800;

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

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // private emitDebugEvent(
  //   side: Side,
  //   type: "poison" | "fatigue",
  //   message: string,
  //   value?: number
  // ) {
  //   useDebugStore.getState().addEvent({ side, type, message, value });
  // }

  getDamageMultiplier(attacker: Side, defender: Side) {
    const fatigueMult = 1 + this.state[defender].fatigue * 0.2;
    const attackMult = this.state[attacker].modifiers.nextAttackMultiplier;
    const incomingMult =
      this.state[defender].modifiers.incomingAttackMultiplier;

    return fatigueMult * attackMult * incomingMult;
  }

  getShieldMultiplier(side: Side) {
    const buffMult = this.state[side].modifiers.nextShieldMultiplier;
    const debuffMult = this.state[side].modifiers.halveShield ? 0.5 : 1;

    return buffMult * debuffMult;
  }

  public calculatePoisonDamage(side: Side) {
    return Math.floor(this.state[side].poison * 2.5);
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
  public async resolveTurn() {
    (["player", "opponent"] as Side[]).forEach(async (side) => {
      const poisonDamage = this.calculatePoisonDamage(side);
      const isHalveShield = this.state[side].modifiers.halveShield;

      if (poisonDamage > 0) {
        // Emit debug event for poison tick
        // this.emitDebugEvent(side, "poison", "☠️ Poison tick", poisonDamage);

        this.healthEngine.damage(poisonDamage, side);

        // Emit status triggered event
        useLogStore.getState().addEvent({
          type: "status_triggered",
          side: side,
          status: "poison",
          damage: poisonDamage,
          timestamp: Date.now(),
        });

        // Add delay to see poison damage
        // await this.delay(STATUS_TICK_DELAY);
      }

      if (isHalveShield) {
        const currentShield = this.shieldEngine.getShield()[side];
        const halvedAmount = Math.floor(currentShield / 2);

        this.shieldEngine.absorbShield(halvedAmount, side);
        this.consumeReducedShieldModifier(side);

        // Emit shield halved event
        useLogStore.getState().addEvent({
          type: "shield_halved",
          side: side,
          amount: halvedAmount,
          timestamp: Date.now(),
        });
      }

      // // emitting new objects
      // this.state = {
      //   ...this.state,
      //   [side]: {
      //     ...this.state[side],
      //     poison: this.clamp(this.state[side].poison - 1),
      //   },
      // };

      // this.state = {
      //   ...this.state,
      //   [side]: {
      //     ...this.state[side],
      //     fatigue: this.clamp(this.state[side].fatigue - 1),
      //   },
      // };
    });
    this.notify();
  }

  // applying buffs and debuffs
  public applyModifiers(side: Side, modifiers: Partial<Modifiers>) {
    this.state[side].modifiers = {
      ...this.state[side].modifiers,
      ...modifiers,
    };
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

    this.notify();
  }

  private clamp(num: number) {
    return Math.min(Math.max(num, 0), 5);
  }

  getState() {
    return this.state;
  }
}
