import { io } from "socket.io-client";

function createTestPlayer(name: string) {
  const socket = io("http://localhost:3001");

  socket.on("connect", () => {
    console.log(`${name} connected as ${socket.id}`);

    // join matchmaking
    socket.emit("joinQueue");
  });

  socket.on("matchFound", ({ matchId }) => {
    console.log(`🎯 ${name} got match:`, matchId);
  });
}

// Create two fake players
createTestPlayer("PlayerA");
createTestPlayer("PlayerB");
