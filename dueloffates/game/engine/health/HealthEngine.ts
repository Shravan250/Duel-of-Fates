import { GameEngine } from "../base/GameEngine";

export class HealthEngine extends GameEngine {
  private hp: number;

  // initialHp assign
  constructor(hp: number) {
    super();
    this.hp = hp;
  }

  // damage
  damage(amount: number) {
    this.hp = Math.max(0, this.hp - amount);
    this.notify();
  }

  // heal
  heal(amount: number) {
    this.hp = this.hp + amount;
    this.notify();
  }

  getHp() {
    return this.hp;
  }
}
