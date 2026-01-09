import { GameEngine } from "../base/GameEngine";

type Side = "player" | "opponent";

export class ShieldEngine extends GameEngine {
  private shield: Record<Side, number>;
  private maxShield: number;

  constructor(shield: number) {
    super();
    this.shield = {
      player: shield,
      opponent: shield,
    };
    this.maxShield = shield;
  }

  // reduce shield based on damage taken
  absorbShield(amount: number, target: Side) {
    const absorbed = Math.min(this.shield[target], amount);

    this.shield = {
      ...this.shield,
      [target]: this.shield[target] - absorbed,
    };

    this.notify();
    return amount - absorbed;
  }

  // regen shield based on amount
  gainShield(amount: number, target: Side) {
    this.shield = {
      ...this.shield,
      [target]: Math.min(this.shield[target] + amount, this.maxShield),
    };

    this.notify();
  }

  reset(shield: number) {
    this.shield = {
      player: shield,
      opponent: shield,
    };
    this.maxShield = shield;
    this.notify();
  }

  swapShield() {
    const { player, opponent } = this.shield;

    this.shield = {
      player: opponent,
      opponent: player,
    };

    this.notify();
  }

  // 🔒 SAME CONTRACT AS BEFORE
  getShield() {
    return {
      player: this.shield.player,
      opponent: this.shield.opponent,
      max: this.maxShield,
    };
  }
}
