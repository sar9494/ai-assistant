import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import { createServer } from "http";
import { Server } from "socket.io";
import { createYoga, createSchema, YogaInitialContext } from "graphql-yoga";
import { PrismaClient } from "@prisma/client";

import { typeDefs } from "./schemas";
import { resolvers } from "./resolvers";
import { uploadFile } from "./resolvers/mutations";
import { pinecone } from "./connectPinecone";

dotenv.config();

const prisma = new PrismaClient();
const assistant = pinecone.Assistant("ai-assistant");

// Define your GraphQL context type
type GraphQLContext = YogaInitialContext & {
  prisma: PrismaClient;
};

const app = express();
const upload = multer({ dest: "uploads/" });
const httpServer = createServer(app);

app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] }));
app.use(express.json());

// GraphQL Yoga server with Prisma context
const yoga = createYoga<{}, GraphQLContext>({
  schema: createSchema<GraphQLContext>({
    typeDefs,
    resolvers,
  }),
  graphqlEndpoint: "/graphql",
  context: async (initialContext): Promise<GraphQLContext> => ({
    ...initialContext,
    prisma,
  }),
});

app.use("/graphql", yoga);

app.post("/api/upload", upload.single("file"), uploadFile);

// Socket.IO server setup
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

    try {
      const chatResp = await assistant.chat({
        messages: [{ role: "user", content: msg.content }],
        model: "gpt-4o",
      });

      socket.emit("chatMessage", {
        content: chatResp.message?.content || "",
        room: msg.room,
        received: true,
        userId: msg.userId,
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
            answered: !["clarify", "олдсонгүй", "уучлаарай", "Уучлаарай"].some(
              (phrase) =>
                chatResp.message?.content
                  ?.toLowerCase()
                  .includes(phrase.toLowerCase())
            ),
          },
        });
      }
    } catch (error) {
      console.error("Chat assistant error:", error);
      socket.emit("chatMessage", {
        content: "Sorry, an error occurred with the assistant.",
        room: msg.room,
        received: true,
        userId: msg.userId,
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
