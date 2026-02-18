import { GameEngine } from "../base/GameEngine";

type Side = "player" | "opponent";

export class HealthEngine extends GameEngine {
  private hp: Record<Side, number>;
  private maxHp: number;

  constructor(hp: number) {
    super();
    this.hp = {
      player: hp,
      opponent: hp,
    };
    this.maxHp = hp;
  }

  // reduce health
  damage(amount: number, target: Side) {
    this.hp = {
      ...this.hp,
      [target]: Math.max(0, this.hp[target] - amount),
    };
    this.notify();
  }

  // heal health
  heal(amount: number, target: Side) {
    this.hp = {
      ...this.hp,
      [target]: Math.min(this.hp[target] + amount, this.maxHp),
    };
    this.notify();
  }

  reset(hp: number) {
    this.hp = {
      player: hp,
      opponent: hp,
    };
    this.maxHp = hp;
    this.notify();
  }

  swapHealth() {
    const { player, opponent } = this.hp;

    this.hp = {
      player: opponent,
      opponent: player,
    };
    this.notify();
  }

  // 🔒 SAME LOGIC AS BEFORE — NOT CHANGED
  getHp() {
    return {
      player: this.hp.player,
      opponent: this.hp.opponent,
      max: this.maxHp,
    };
  }
}
