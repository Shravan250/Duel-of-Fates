import { CardEngine } from "./engine/cards/CardEngine";
import { DeckEngine } from "./engine/deck/DeckEngine";
import { HealthEngine } from "./engine/health/HealthEngine";
import { MatchEngine } from "./engine/match/MatchEngine";
import { ShieldEngine } from "./engine/shield/ShieldEngine";
import { StatusEngine } from "./engine/status/StatusEngine";

export const healthEngine = new HealthEngine(100);
export const shieldEngine = new ShieldEngine(50);
export const deckEngine = new DeckEngine();
export const statusEngine = new StatusEngine(healthEngine, shieldEngine);
export const cardEngine = new CardEngine(
  healthEngine,
  shieldEngine,
  deckEngine,
  statusEngine
);
export const matchEngine = new MatchEngine(
  deckEngine,
  healthEngine,
  shieldEngine,
  cardEngine,
  statusEngine
);
