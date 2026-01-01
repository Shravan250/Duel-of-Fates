import { CardInstance } from "@/types";
import { GameEngine } from "../base/GameEngine";
import { DeckEngine } from "../deck/DeckEngine";
import { HealthEngine } from "../health/HealthEngine";
import { ShieldEngine } from "../shield/ShieldEngine";

type MatchPhase = "SETUP" | "PLAY" | "RESOLVE" | "END";

class MatchEngine extends GameEngine {
  private currentPhase: MatchPhase = "SETUP";
  private currentTurn: number = 0;
  private selectedPlayerCard: CardInstance | null = null;
  private selectedOpponentCard: CardInstance | null = null;
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

  // functions

  public startMatch() {
    console.log("Starting Match...");

    this.currentPhase = "SETUP";
    this.currentTurn = 1;
    this.winner = null;
    this.isMatchOver = false;

    // Initializing all Engiens
    this.deckEngine.InitilizeDeck();
    this.healthEngine.reset();
    this.shieldEngine.reset();

    this.notify();

    this.transitionToPlayState();
  }

  private transitionToPlayState() {
    this.currentPhase = "PLAY";
    this.notify();
    setTimeout(() => {
      this.transitionToResolveState();
    }, 15000);
  }

  private transitionToResolveState() {
    this.currentPhase = "RESOLVE";
    this.notify();

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
  private resolveTurn() {
    if (!this.selectedPlayerCard || !this.selectedOpponentCard) return;

    this.cardResolver.resolve(
      this.selectedPlayerCard,
      this.selectedOpponentCard,
      this.healthEngine,
      this.shieldEngine
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
    if (this.healthEngine.getHp("PLAYER")) {
    }
  }
}
