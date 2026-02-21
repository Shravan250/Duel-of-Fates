import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { roomManager } from "./room/roomManager";
import { socketHandler } from "./socket/socketHandler";

const app = express();
app.use(cors());

const httpServer = createServer(app);

/*
 * Socket.IO Setup
 */
const io = new Server(httpServer, {
  cors: { origin: "*" },
});

roomManager.initialize(io);

/*
 * Connection Handling
 */
socketHandler(io);

const PORT = 3001;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
