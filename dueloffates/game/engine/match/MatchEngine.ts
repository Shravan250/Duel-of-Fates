import { CardInstance, CardProps } from "@/types";
import { GameEngine } from "../base/GameEngine";
import { DeckEngine } from "../deck/DeckEngine";
import { HealthEngine } from "../health/HealthEngine";
import { ShieldEngine } from "../shield/ShieldEngine";
import { CardEngine } from "../cards/CardEngine";

type MatchPhase = "SETUP" | "PLAY" | "RESOLVE" | "END";

export class MatchEngine extends GameEngine {
  private currentPhase: MatchPhase = "SETUP";
  private currentTurn: number = 0;
  private selectedPlayerCard: string | null = null;
  private selectedOpponentCard: string | null = null;
  private winner: "PLAYER" | "OPPONENT" | null = null;
  private isMatchOver: boolean = false;

  constructor(
    private deckEngine: DeckEngine,
    private healthEngine: HealthEngine,
    private shieldEngine: ShieldEngine,
    private cardResolver: CardEngine
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

    // Initializing all Engiens
    this.deckEngine.InitilizeDeck();
    this.healthEngine.reset(100);
    this.shieldEngine.reset(50);

    this.notify();

    this.transitionToPlayState();
  }

  public selectCard(instanceId: string, side: "PLAYER" | "OPPONENT") {
    if (this.currentPhase !== "PLAY") return;

    if (side === "PLAYER") {
      this.selectedPlayerCard = instanceId;
    } else {
      this.selectedOpponentCard = instanceId;
    }

    this.notify();
  }

  // private functions
  private transitionToPlayState() {
    this.currentPhase = "PLAY";
    this.notify();
    setTimeout(() => {
      this.transitionToResolveState();
    }, 15000);
  }

  private transitionToResolveState() {
    this.currentPhase = "RESOLVE";
    // this.notify();

    // if (!this.selectedPlayerCard) {
    //   this.selectedPlayerCard = this.deckEngine.autoSelectCard("PLAYER");
    // }

    // if (!this.selectedOpponentCard) {
    //   this.selectedOpponentCard = this.deckEngine.autoSelectCard("OPPONENT");
    // }
    if (!this.selectedPlayerCard || !this.selectedOpponentCard) {
      this.transitionToPlayState();
    }

    this.notify();
    this.resolveTurn();
  }

  // player actions
  private async resolveTurn() {
    if (!this.selectedPlayerCard || !this.selectedOpponentCard) return;

    await this.cardResolver.resolve(
      this.selectedPlayerCard,
      this.selectedOpponentCard
    );

    this.cleanupTurn();
  }

  private cleanupTurn() {
    this.selectedPlayerCard = null;
    this.selectedOpponentCard = null;
    this.currentTurn += 1;
    this.transitionToPlayState();
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
    } else {
      this.currentPhase = "PLAY";
    }
  }

  getState() {
    return {
      phase: this.currentPhase,
      currentTurn: this.currentTurn,
      isMatchOver: this.isMatchOver,
      winner: this.winner,
      canSelectCard: this.currentPhase === "PLAY",
    };
  }
}
