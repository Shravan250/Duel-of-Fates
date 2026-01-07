import { GameEngine } from "../base/GameEngine";
import { DeckEngine } from "../deck/DeckEngine";
import { HealthEngine } from "../health/HealthEngine";
import { ShieldEngine } from "../shield/ShieldEngine";
import { CardEngine } from "../cards/CardEngine";
import { StatusEngine } from "../status/StatusEngine";

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

  private delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  constructor(
    private deckEngine: DeckEngine,
    private healthEngine: HealthEngine,
    private shieldEngine: ShieldEngine,
    private cardResolver: CardEngine,
    private statusEngine: StatusEngine
  ) {
    super();
    this.healthEngine.subscribe(() => this.checkWinCondition());
  }

  // public functions

  public startMatch() {
    console.log("Starting Match...");

    this.currentPhase = "SETUP";
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

    this.notify();

    this.transitionToPlayState();
  }

  // private functions
  private transitionToPlayState() {
    this.currentPhase = "PLAY";

    // Clear selections from previous turn
    this.deckEngine.clearSelections();
    this.selectedPlayerCard = null;
    this.selectedOpponentCard = null;

    this.resetTimer();

    this.notify();

    this.startTimer();
  }

  private startTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }

    this.timerInterval = setInterval(() => {
      this.timer -= 1;
      this.notify();

      if (this.timer <= 0) {
        if (this.timerInterval) {
          clearInterval(this.timerInterval);
        }
        this.transitionToResolveState();
      }
    }, 1000);
  }

  private resetTimer() {
    this.timer = 15;
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    this.notify();
  }

  private transitionToResolveState() {
    this.currentPhase = "RESOLVE";

    //stop timer
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }

    this.notify();

    this.selectedPlayerCard = this.deckEngine.getState().selectedPlayerCard;
    this.selectedOpponentCard = this.deckEngine.getState().selectedOpponentCard;

    if (!this.selectedPlayerCard) {
      this.selectedPlayerCard = this.deckEngine.autoSelectCard("PLAYER");
    }

    if (!this.selectedOpponentCard) {
      this.selectedOpponentCard = this.deckEngine.autoSelectCard("OPPONENT");
    }

    this.notify();

    this.resolveTurn();
  }

  // player actions
  private async resolveTurn() {
    if (!this.selectedPlayerCard || !this.selectedOpponentCard) return;

    this.beginBatch();

    await this.delay(1000);

    await this.cardResolver.resolve(
      this.selectedPlayerCard,
      this.selectedOpponentCard
    );

    this.deckEngine.tickCooldown();

    this.endBatch();

    await this.delay(2000);
    await this.statusEngine.resolveTurn();
    this.cleanupTurn();
  }

  private cleanupTurn() {
    this.selectedPlayerCard = null;
    this.selectedOpponentCard = null;
    this.currentTurn += 1;
    this.checkWinCondition();

    if (!this.isMatchOver) {
      this.transitionToPlayState();
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
  }

  public cleanup() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
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
