import { GameEngine } from "../base/GameEngine";

export class ShieldEngine extends GameEngine {
  private shield: number;

  // initialShield assign
  constructor(shield: number) {
    super();
    this.shield = shield;
  }

  // absorb
  // loseShield(amount: number) {
  //   this.shield = this.shield - amount;
  //   this.notify();
  // }

  absorbShield(amount: number) {
    const absorbed = Math.min(this.shield, amount);
    this.shield -= absorbed;
    this.notify();
    return amount - absorbed;
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
