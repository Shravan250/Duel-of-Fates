import { CardInstance } from "@/types";

type MatchPhase =
  | { state: "IDLE" }
  | { state: "SELECTING"; timeRemaining: number }
  | { state: "RESOLVING"; cards: [CardInstance, CardInstance] }
  | { state: "FINISHED"; winner: "PLAYER" | "OPPONENT" };
