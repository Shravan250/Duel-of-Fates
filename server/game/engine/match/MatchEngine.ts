import { GameEngine } from "../base/GameEngine";
import { DeckEngine } from "../deck/DeckEngine";
import { HealthEngine } from "../health/HealthEngine";
import { ShieldEngine } from "../shield/ShieldEngine";
import { CardEngine } from "../cards/CardEngine";
import { StatusEngine } from "../status/StatusEngine";
import type { LogEngine } from "../log/logEngine";

type MatchPhase = "SETUP" | "PLAY" | "RESOLVE" | "END";

export class MatchEngine extends GameEngine {
  private currentPhase: MatchPhase = "SETUP";
  private currentTurn: number = 0;
  private selectedPlayerCard: string | null = null;
  private selectedOpponentCard: string | null = null;
  private winner: "PLAYER" | "OPPONENT" | null = null;
  private isMatchOver: boolean = false;
  private timer: number = 15;
  private timerInterval: NodeJS.Timeout | null = null;

  constructor(
    private deckEngine: DeckEngine,
    private healthEngine: HealthEngine,
    private shieldEngine: ShieldEngine,
    private cardResolver: CardEngine,
    private statusEngine: StatusEngine,
    private logEngine: LogEngine,
  ) {
    super();
    // this.healthEngine.subscribe(() => this.checkWinCondition());
    this.deckEngine.subscribe(() => this.notify());
    this.statusEngine.subscribe(() => this.notify());
    this.healthEngine.subscribe(() => this.notify());
    this.shieldEngine.subscribe(() => this.notify());
    this.cardResolver.subscribe(() => this.notify());
    this.logEngine.subscribe(() => this.notify());
  }

  // public functions
  public startMatch() {
    this.currentPhase = "PLAY";
    this.currentTurn = 1;
    this.winner = null;
    this.isMatchOver = false;
    this.timer = 15;

    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }

    // Initializing all Engiens
    this.deckEngine.InitilizeDeck();
    this.healthEngine.reset(100);
    this.shieldEngine.reset(50);

    this.startTimer();

    this.notify();
  }

  // private functions
  private startTimer() {
    this.stopTimer();

    this.timer = 15;

    this.timerInterval = setInterval(async () => {
      if (this.currentPhase !== "PLAY") {
        this.stopTimer();
        return;
      }

      this.timer -= 1;
      this.notify();

      if (this.timer <= 0) {
        this.stopTimer();
        await this.autoSelectCards();
      }
    }, 1000);
  }

  private stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  private startTurn() {
    this.currentPhase = "PLAY";
    this.startTimer();
    this.notify();
  }

  public async autoSelectCards() {
    if (this.currentPhase !== "PLAY") return false;

    if (!this.selectedPlayerCard) {
      this.selectedPlayerCard =
        this.deckEngine.autoSelectCard("PLAYER") ?? null;
    }

    if (!this.selectedOpponentCard) {
      this.selectedOpponentCard =
        this.deckEngine.autoSelectCard("OPPONENT") ?? null;
    }

    if (!this.selectedPlayerCard || !this.selectedOpponentCard) {
      return false;
    }

    this.currentPhase = "RESOLVE";

    this.stopTimer();
    this.notify();

    await this.resolveTurn();
    return true;
  }

  public async selectCard(cardInstanceId: string, side: "PLAYER" | "OPPONENT") {
    if (this.currentPhase !== "PLAY") return false;

    await this.deckEngine.selectCard(cardInstanceId, side);

    this.selectedPlayerCard = this.deckEngine.getState().selectedPlayerCard;
    this.selectedOpponentCard = this.deckEngine.getState().selectedOpponentCard;

    if (!this.selectedPlayerCard || !this.selectedOpponentCard) {
      return false;
    }

    this.currentPhase = "RESOLVE";
    this.stopTimer();
    this.notify();

    await this.resolveTurn();
    return true;
  }

  // player actions
  private async resolveTurn() {
    if (!this.selectedPlayerCard || !this.selectedOpponentCard) return;

    await this.cardResolver.resolve(
      this.selectedPlayerCard,
      this.selectedOpponentCard,
    );

    this.deckEngine.tickCooldown();

    await this.statusEngine.resolveTurn();

    await this.cleanupTurn();
  }

  private async cleanupTurn() {
    this.selectedPlayerCard = null;
    this.selectedOpponentCard = null;
    // this.deckEngine.clearSelections();
    this.currentTurn += 1;
    this.logEngine.finalizeTurn();
    this.checkWinCondition();

    if (!this.isMatchOver) {
      this.startTurn();
    }
  }

  private checkWinCondition() {
    const health = this.healthEngine.getHp();

    if (health.player === 0) {
      this.winner = "OPPONENT";
      this.isMatchOver = true;
      this.currentPhase = "END";
    } else if (health.opponent === 0) {
      this.winner = "PLAYER";
      this.isMatchOver = true;
      this.currentPhase = "END";
    }
    this.notify();
  }

  public cleanup() {
    this.stopTimer();
  }

  getState() {
    return {
      timer: this.timer,
      phase: this.currentPhase,
      currentTurn: this.currentTurn,
      isMatchOver: this.isMatchOver,
      winner: this.winner,
      selectedPlayerCard: this.selectedPlayerCard,
      selectedOpponentCard: this.selectedOpponentCard,
      canSelectCard: this.currentPhase === "PLAY",
    };
  }
}
