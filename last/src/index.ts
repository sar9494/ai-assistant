import express from "express";

import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";

import multer from "multer";
import { uploadFile } from "./resolvers/mutations";
import { pinecone } from "../connectPinecone";
import prisma from "../prismaClient";
import { messageRouter } from "./router/message";
import { fileRouter } from "./router/file";

const upload = multer({ dest: "uploads/" });

dotenv.config();

const assistant = pinecone.Assistant("ai-assistant");

const app = express();
const httpServer = createServer(app);

app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] }));
app.use(express.json());

// app.post("/api/upload", upload.single("file"), uploadFile);
app.use("/message", messageRouter);
app.use("/file", fileRouter);

async function startServer() {
  const io = new Server(httpServer, {
    cors: { origin: "*", methods: ["GET", "POST"] },
  });

  io.on("connection", (socket) => {
    console.log("✅ User connected:", socket.id);

    socket.on("join_room", (roomId) => {
      socket.join(roomId);
      console.log(`🚪 User ${socket.id} joined room ${roomId}`);
    });

    socket.on("chatMessage", async (msg) => {
      socket.to(msg.room).emit("chatMessage", {
        content: msg.content,
        received: msg.received,
      });
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
      const user = await prisma.user.findUnique({
        where: {
          id: msg.userId,
        },
      });
      if (user?.role === "EMPLOYEE") {
        await prisma.message.create({
          data: {
            userId: msg.userId,
            conversationId: msg.userId,
            content: msg.content,
            received: msg.received,
          },
        });
        await prisma.message.create({
          data: {
            userId: msg.userId,
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
      console.log("❌ User disconnected:", socket.id);
    });
  });

  const PORT = process.env.PORT || 4000;
  httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
    console.log(`🧠 GraphQL endpoint: http://localhost:${PORT}/graphql`);
    console.log(`💬 Socket.IO running at ws://localhost:${PORT}`);
  });
}

startServer();
