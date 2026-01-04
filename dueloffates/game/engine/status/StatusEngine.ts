import { GameEngine } from "../base/GameEngine";
import { HealthEngine } from "../health/HealthEngine";
import { ShieldEngine } from "../shield/ShieldEngine";

type Side = "player" | "opponent";

interface StatusState {
  poison: number;
  fatigue: number;
}

export class StatusEngine extends GameEngine {
  private state: Record<Side, StatusState> = {
    player: { poison: 0, fatigue: 0 },
    opponent: { poison: 0, fatigue: 0 },
  };

  constructor(
    private healthEngine: HealthEngine,
    private shieldEngine: ShieldEngine
  ) {
    super();
  }

  getDamageMultiplier(side: Side) {
    return 1 + this.state[side].fatigue * 0.2;
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
    console.log(`[STATUS BEFORE] ${side}`, this.state[side]);

    this.state[side].fatigue = this.clamp(
      this.state[side].fatigue + stack.fatigue
    );

    this.state[side].poison = this.clamp(
      this.state[side].poison + stack.poison
    );

    console.log(`[STATUS AFTER] ${side}`, this.state[side]);

    this.notify();
  }

  // resolve turn
  public resolveTurn() {
    console.log("[STATUS RESOLVE TURN]");

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

  private clamp(num: number) {
    return Math.min(Math.max(num, 0), 5);
  }

  getState() {
    return this.state;
  }
}
