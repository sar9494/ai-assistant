"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const schemas_1 = require("./schemas");
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const resolvers_1 = require("./resolvers");
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const prismaClient_1 = __importDefault(require("./prismaClient"));
const connectPinecone_1 = require("./connectPinecone");
const openai_1 = require("@langchain/openai");
dotenv_1.default.config();
const index = connectPinecone_1.pinecone.index("ai-assistant");
const uploadFile = async () => {
    const embeddings = new openai_1.OpenAIEmbeddings({
        openAIApiKey: "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",
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
dotenv_1.default.config();
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
app.use((0, cors_1.default)({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express_1.default.json());
const apolloServer = new server_1.ApolloServer({
    resolvers: resolvers_1.resolvers,
    typeDefs: schemas_1.typeDefs,
    introspection: true,
});
async function startServer() {
    await apolloServer.start();
    app.use("/graphql", body_parser_1.default.json(), (0, express4_1.expressMiddleware)(apolloServer));
    const io = new socket_io_1.Server(httpServer, {
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
            await prismaClient_1.default.message.create({
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
