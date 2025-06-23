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
import { OpenAIEmbeddings } from "@langchain/openai";
dotenv.config();

const index = pinecone.index("ai-assistant");

const uploadFile = async () => {
  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.NEXT_PUBLIC_BASE_URL ?? "",
  });

  const record = {
    id: "rec1",
    text: "Apples are a great source of dietary fiber, which supports digestion and helps maintain a healthy gut.",
    metadata: { category: "digestive system" },
  };

  const vector = await embeddings.embedQuery(record.text);

  const upsertData = [
    {
      id: record.id,
      values: vector,
      metadata: record.metadata,
    },
  ];

  await index.upsert(upsertData);
  console.log("✅ Vector successfully uploaded to Pinecone.");
};

uploadFile();
console.log(index);

dotenv.config();

const app = express();
const httpServer = createServer(app);

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());

const apolloServer = new ApolloServer({
  resolvers,
  typeDefs,
  introspection: true,
});

async function startServer() {
  await apolloServer.start();

  app.use("/graphql", bodyParser.json(), expressMiddleware(apolloServer));

  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("✅ User connected:", socket.id);

    socket.on("join_room", (roomId) => {
      socket.join(roomId);
      console.log(`🚪 User ${socket.id} joined room ${roomId}`);
    });

    socket.on("chatMessage", async (msg) => {
      console.log("💬 Message received:", msg);

      socket.to(msg.room).emit("chatMessage", {
        content: msg.content,
        received: msg.received,
      });
      await prisma.message.create({
        data: {
          userId: msg.userId,
          content: msg.content,
          received: msg.received,
        },
      });
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
