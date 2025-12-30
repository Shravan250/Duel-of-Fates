import { GameEngine } from "./GameEngine";

export class playerHPEngine extends GameEngine {
  private hp: number;

  // initialHp assign
  constructor(hp: number) {
    super();
    this.hp = hp;
  }

  // damage
  damage(amount: number) {
    this.hp = this.hp - amount;
    this.notify();
  }

  // heal
  heal(amount: number) {
    this.hp = this.hp + amount;
    this.notify();
  }

  getHP() {
    return this.hp;
  }
}
