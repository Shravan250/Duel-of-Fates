import { GameEngine } from "../base/GameEngine";
import { RawLogEvent, TurnLog } from "../../../types";
import { formatTurnLogs } from "../../../lib/battleLogFormatter";

export class LogEngine extends GameEngine {
  private currentTurn: number = 1;
  private currentTurnEvents: RawLogEvent[] = [];
  private completedTurns: TurnLog[] = [];

  //   addEvent: (event: RawLogEvent) => {
  //     set((state) => ({
  //       currentTurnEvents: [...state.currentTurnEvents, event],
  //     }));
  //   },
  public addEvent(event: RawLogEvent) {
    this.currentTurnEvents.push({
      ...event,
      timestamp: Date.now(),
    });
  }

  public finalizeTurn() {
    const formattedMessages = formatTurnLogs(
      this.currentTurnEvents,
      this.currentTurn,
    );

    const turnLog: TurnLog = {
      turnNumber: this.currentTurn,
      rawEvents: [...this.currentTurnEvents],
      formattedMessages,
    };

    this.completedTurns.push(turnLog);

    this.currentTurn++;
    this.currentTurnEvents = [];
  }

  public clearLogs() {
    this.currentTurn = 1;
    this.currentTurnEvents = [];
    this.completedTurns = [];
  }

  public getState() {
    return {
      currentTurn: this.currentTurn,
      currentTurnEvents: this.currentTurnEvents,
      completedTurns: this.completedTurns,
    };
  }
}
