// src/server.ts
import { createServer } from "http";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { Server as SocketIOServer } from "socket.io";
import { resolvers } from "@/resolvers";
import { uploadFile } from "@/resolvers/mutations";
import { pinecone } from "@/connectPinecone";
import prisma from "@/context";
import { typeDefs } from "@/schemas";

dotenv.config();
const app = express();
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

const upload = multer({ dest: "uploads/" });
const assistant = pinecone.Assistant("ai-assistant");

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});

async function startServer() {
  await apolloServer.start();
  app.use("/graphql", cors(), express.json(), expressMiddleware(apolloServer));

  app.post("/api/upload", upload.single("file"), uploadFile);

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
        where: { id: msg.userId },
      });

      if (user?.role === "EMPLOYEE") {
        await prisma.message.create({
          data: {
            userId: msg.userId,
            content: msg.content,
            received: msg.received,
          },
        });

        await prisma.message.create({
          data: {
            userId: msg.userId,
            content: chatResp.message?.content || "",
            received: true,
            answered: !["clarify", "олдсонгүй", "Уучлаарай", "уучлаарай"].some(
              (phrase) => chatResp.message?.content?.includes(phrase)
            ),
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
