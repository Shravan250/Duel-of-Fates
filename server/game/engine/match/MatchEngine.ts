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

  constructor(
    private deckEngine: DeckEngine,
    private healthEngine: HealthEngine,
    private shieldEngine: ShieldEngine,
    private cardResolver: CardEngine,
    private statusEngine: StatusEngine,
  ) {
    super();
    this.healthEngine.subscribe(() => this.checkWinCondition());
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

  public async selectCard(cardInstanceId: string, side: "PLAYER" | "OPPONENT") {
    this.currentPhase = "RESOLVE";

    //stop timer
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }

    await this.deckEngine.selectCard(cardInstanceId, side);

    this.selectedPlayerCard = this.deckEngine.getState().selectedPlayerCard;
    this.selectedOpponentCard = this.deckEngine.getState().selectedOpponentCard;

    // if (!this.selectedPlayerCard) {
    //   this.selectedPlayerCard = this.deckEngine.autoSelectCard("PLAYER");
    // }

    // if (!this.selectedOpponentCard) {
    //   this.selectedOpponentCard = this.deckEngine.autoSelectCard("OPPONENT");
    // }
    if (!this.selectedPlayerCard || !this.selectedOpponentCard) {
      return false;
    }
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
    this.deckEngine.clearSelections();
    this.currentTurn += 1;
    this.checkWinCondition();
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
