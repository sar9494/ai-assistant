import express from "express";
import { typeDefs } from "./schemas";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { resolvers } from "./resolvers";
import { createServer } from "http";
import { Server } from "socket.io";
import prisma from "./prismaClient";
import { pinecone } from "./connectPinecone";

dotenv.config();

const assistant = pinecone.Assistant("ai-assistant");

const uploadFile = async (path: string) => {
  await assistant.uploadFile({
    path,
    metadata: { uploadedBy: "test-user" },
  });
  console.log("✅ File uploaded to Pinecone Assistant");
};

const app = express();
const httpServer = createServer(app);

app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] }));
app.use(express.json());

const apolloServer = new ApolloServer({
  resolvers,
  typeDefs,
  introspection: true,
});

app.post(
  "/api/upload",
  express.raw({ type: "multipart/form-data" }),
  async (req, res) => {
    const filepath = req.body.path;
    if (!filepath) return res.status(400).json({ error: "Missing file path" });
    await uploadFile(filepath);
    res.status(200).json({ success: true });
  }
);

async function startServer() {
  await apolloServer.start();
  app.use("/graphql", bodyParser.json(), expressMiddleware(apolloServer));

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
      console.log(chatResp);
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
            content: msg.content,
            received: msg.received,
          },
        });
        await prisma.message.create({
          data: {
            userId: msg.userId,
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
