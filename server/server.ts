import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";

import { addPlayerToQueue, removePlayerFromQueue } from "./matchmaking";

const app = express();
app.use(cors());

const httpServer = createServer(app);

/*
 * Socket.IO Setup
 */
const io = new Server(httpServer, {
  cors: { origin: "*" },
});

/*
 * Connection Handling
 */
io.on("connection", (socket: Socket) => {
  console.log(`Player connected: ${socket.id}`);

  // Send confirmation back to client
  socket.emit("connected", {
    id: socket.id,
  });

  // Player joins matchmaking queue

  socket.on("joinQueue", () => {
    console.log(`joinQueue received from ${socket.id}`);

    addPlayerToQueue({
      id: socket.id,
      socket,
    });
  });

  //Handle player disconnect
  socket.on("disconnect", () => {
    console.log(`Player disconnected: ${socket.id}`);

    removePlayerFromQueue(socket.id);
  });
});

const PORT = 3001;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
