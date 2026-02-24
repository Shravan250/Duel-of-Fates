import type { Server, Socket } from "socket.io";
import { addPlayerToQueue, removePlayerFromQueue } from "../matchmaking/queue";
import { roomManager } from "../room/roomManager";

export function socketHandler(io: Server) {
  io.on("connection", (socket: Socket) => {
    console.log("Player Connected:", socket.id);

    socket.on("joinQueue", () => {
      console.log(`joinQueue received from ${socket.id}`);

      addPlayerToQueue({
        id: socket.id,
        socket,
      });
    });

    socket.on("leaveQueue", () => {
      console.log(`leaveQueue received from ${socket.id}`);
      removePlayerFromQueue(socket.id);
    });

    socket.on("playCard", async ({ cardInstanceId }) => {
      const playerId = socket.id;

      const roomId = roomManager.getRoomByPlayer(playerId);

      if (roomId) {
        const room = roomManager.getRoom(roomId);
        if (room) {
          await room.playCard(playerId, cardInstanceId);
        }
      }
    });

    socket.on("playCard", async (payload) => {
      console.log("Received playCard from", socket.id, payload);
    });

    socket.on("disconnect", () => {
      console.log("Player Disconnected:", socket.id);

      removePlayerFromQueue(socket.id);

      const roomId = roomManager.getRoomByPlayer(socket.id);

      if (roomId) {
        const room = roomManager.getRoom(roomId);

        const role =
          room?.getPlayerRole(socket.id) === "PLAYER" ? "OPPONENT" : "PLAYER";

        if (room?.isFinished) {
          roomManager.removeRoom(roomId);
          io.to(roomId).emit("matchEnded", { reason: "Match Finished" });
          return;
        }
        roomManager.removeRoom(roomId);

        io.to(roomId).emit("matchLeft", {
          reason: "Player Disconnected",
          winner: role,
        });
      }
    });
  });
}
