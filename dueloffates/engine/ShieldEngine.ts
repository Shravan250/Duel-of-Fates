import { GameEngine } from "./GameEngine";

export class ShieldEngine extends GameEngine {
  private shield: number;

  // initialShield assign
  constructor(shield: number) {
    super();
    this.shield = shield;
  }

  // damage
  loseShield(amount: number) {
    this.shield = this.shield - amount;
    this.notify();
  }

  // gain
  gainShield(amount: number) {
    this.shield = this.shield + amount;
    this.notify();
  }

  getShield() {
    return this.shield;
  }
}
