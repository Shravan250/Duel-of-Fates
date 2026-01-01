import { GameEngine } from "../base/GameEngine";

export class ShieldEngine extends GameEngine {
  private playerShield: number;
  private opponentShield: number;

  // initialize shield engine
  constructor(shield: number) {
    super();
    this.playerShield = shield;
    this.opponentShield = shield;
  }

  // ? reduce shield based on damage taken
  absorbShield(amount: number, target: "player" | "opponent") {
    let absorbed = 0;
    if (target === "player") {
      absorbed = Math.min(this.playerShield, amount);
      this.playerShield = this.playerShield - absorbed;
    } else {
      absorbed = Math.min(this.opponentShield, amount);
      this.opponentShield = this.opponentShield - absorbed;
    }
    this.notify();
    return amount - absorbed;
  }

  // ? regen shield based on amount
  gainShield(amount: number, target: "player" | "opponent") {
    if (target === "player") this.playerShield = this.playerShield + amount;
    else this.opponentShield = this.opponentShield + amount;
    this.notify();
  }

  reset(shield:number) {
    this.playerShield = shield;
    this.opponentShield = shield;
    this.notify();
  }

  getShield() {
    return { player: this.playerShield, opponent: this.opponentShield };
  }
}
