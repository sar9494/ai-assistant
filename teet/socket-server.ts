import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import prisma from "./prismaClient";
import { assistant } from "./connectPinecone";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join_room", (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
  });

  socket.on("chatMessage", async (msg) => {
    socket.to(msg.room).emit("chatMessage", {
      content: msg.content,
      received: msg.received,
    });
    console.log(msg);

    const chatResp = await assistant.chat({
      messages: [{ role: "user", content: msg.content }],
      model: "gpt-4o",
    });
    socket.emit("chatMessage", {
      content: chatResp.message?.content,
      room: 1,
      received: true,
      userId: 1,
    });
    console.log(chatResp);

    const user = await prisma.user.findUnique({
      where: {
        id: msg.userId,
      },
    });
    if (user?.role === "EMPLOYEE") {
      await prisma.message.create({
        data: {
          conversationId: msg.userId,
          content: msg.content,
          received: msg.received,
        },
      });
      await prisma.message.create({
        data: {
          conversationId: msg.userId,
          content: chatResp.message?.content || "",
          received: true,
          answered:
            chatResp.message?.content?.includes("clarify") ||
            chatResp.message?.content?.includes("олдсонгүй") ||
            chatResp.message?.content?.includes("Уучлаарай") ||
            chatResp.message?.content?.includes("уучлаарай")
              ? false
              : true,
        },
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.WS_PORT || 4001;
httpServer.listen(PORT, () => {
  console.log(`WebSocket server listening on ws://localhost:${PORT}`);
});
