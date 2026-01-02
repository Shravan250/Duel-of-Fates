import { GameEngine } from "../base/GameEngine";

export class HealthEngine extends GameEngine {
  private playerHp: number;
  private opponentHp: number;

  // initialise Health engine
  constructor(hp: number) {
    super();
    this.playerHp = hp;
    this.opponentHp = hp;
  }

  // ? reduce health based on damage taken
  damage(amount: number, target: "player" | "opponent") {
    if (target === "player")
      this.playerHp = Math.max(0, this.playerHp - amount);
    else this.opponentHp = Math.max(0, this.opponentHp - amount);
    this.notify();
  }

  // ? regen health based on amount
  heal(amount: number, target: "player" | "opponent") {
    if (target === "player") this.playerHp = this.playerHp + amount;
    else this.opponentHp = this.opponentHp + amount;
    this.notify();
  }

  reset(hp: number) {
    this.playerHp = hp;
    this.opponentHp = hp;
    this.notify();
  }

  getHp() {
    return { player: this.playerHp, opponent: this.opponentHp };
  }
}
