import express from "express";
import { createServer } from "http";
import multer from "multer";
import dotenv from "dotenv";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { resolvers } from "../lib/resolvers";
import { uploadFile } from "../lib/resolvers/mutations";
import { typeDefs } from "../lib/schemas";
import prisma from "../prismaClient";
import { Server } from "socket.io";
import { pinecone } from "../connectPinecone";
// import { yoga } from "./app/api/graphql/route.js";

dotenv.config();

const app = express();
const httpServer = createServer(app);
const upload = multer({ dest: "uploads/" });
const assistant = pinecone.Assistant("ai-assistant");

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});
await apolloServer.start();

// ✅ Proper GraphQL middleware setup
// app.use(
//   "/api/graphql",
//   express.json(),
//   expressMiddleware(apolloServer, {
//     context: async ({ req }) => ({ token: req.headers.authorization }),
//   })
// );

// app.use("/api/graphql", yoga);

app.post("/api/upload", upload.single("file"), uploadFile);

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
          answered: !chatResp.message?.content?.match(
            /clarify|олдсонгүй|уучлаарай|Уучлаарай/
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
