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

dotenv.config();

const app = express();
const httpServer = createServer(app); 

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

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
    console.log("User connected:", socket.id);

    socket.on("chatMessage", async (msg) => {
      console.log("Received message:", msg);

      socket.to(msg.room).emit("chatMessage", {
        content: msg.content,
        sender: msg.sender,
      });
    });

    socket.on("join_room", (roomId) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room ${roomId}`);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  const PORT = process.env.PORT || 4000;
  httpServer.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`🧠 GraphQL ready at http://localhost:${PORT}/graphql`);
    console.log(`💬 Socket.IO ready at ws://localhost:${PORT}`);
  });
}

startServer();
