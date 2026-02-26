import { GameEngine } from "../base/GameEngine";
import { RawLogEvent, TurnLog } from "../../../types";
import { formatTurnLogs } from "../../../lib/battleLogFormatter";

export class LogEngine extends GameEngine {
  private currentTurn: number = 1;
  private currentTurnEvents: RawLogEvent[] = [];
  private completedTurns: TurnLog[] = [];

  public addEvent(event: RawLogEvent) {
    this.currentTurnEvents.push({
      ...event,
      timestamp: Date.now(),
    });
    console.log(`Event added to turn ${this.currentTurn}:`, event);
    this.notify();
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
    console.log(
      `Turn ${turnLog.turnNumber} finalized with ${turnLog.rawEvents.length} events.`,
    );
    this.notify();
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
