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


    socket.on("playCard",async ({ playerId, cardInstanceId }) => {
      const roomId = roomManager.getRoomByPlayer(playerId);
      
      if (roomId) {
        const room = roomManager.getRoom(roomId);
        if (room) {
          await room.playCard(playerId, cardInstanceId);
        }
      }
    });

    socket.on("disconnect", () => {
      console.log("Player Disconnected:", socket.id);

      removePlayerFromQueue(socket.id);

      const roomId = roomManager.getRoomByPlayer(socket.id);

      if (roomId) {
        roomManager.removeRoom(roomId);

        io.to(roomId).emit("matchEnded", {
          reason: "Player Disconnected",
        });
      }
    });
  });
}
