import { socket } from "./socket";

import { useGameStore } from "@/store/useGameStore";
import { useHealthStore } from "@/store/useHealthStore";
import { useShieldStore } from "@/store/useShieldStore";
import { useStatusStore } from "@/store/useStatusStore";
import { useMatchStore } from "@/store/useMatchStore";
import { useLogStore } from "@/store/useLogStore";

export function initializeSocketListeners() {
  socket.on("matchJoined", (state) => {
    useGameStore.getState().setRole(state.role);
    // console.log(state.role);
  });

  socket.on("gameState", (state) => {
    useMatchStore.getState().setMatchState(state.match);
    useHealthStore.getState().setHealthState(state.health);
    useShieldStore.getState().setShieldState(state.shield);
    useStatusStore.getState().setStatusState(state.status);
    useGameStore.getState().setGameState(state.deck);
    useLogStore.getState().setLogs(state.logs);
  });

  socket.on("matchLeft", (state) => {
    useMatchStore.getState().setWinner(state.winner);
  });

  socket.on("matchEnded", () => {
    // useMatchStore.getState().reset();
  });
}
