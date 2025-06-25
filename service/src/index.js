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
const multer_1 = __importDefault(require("multer"));
const mutations_1 = require("./resolvers/mutations");
const upload = (0, multer_1.default)({ dest: "uploads/" });
dotenv_1.default.config();
const assistant = connectPinecone_1.pinecone.Assistant("ai-assistant");
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
app.use((0, cors_1.default)({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] }));
app.use(express_1.default.json());
const apolloServer = new server_1.ApolloServer({
    resolvers: resolvers_1.resolvers,
    typeDefs: schemas_1.typeDefs,
    introspection: true,
});
app.post("/api/upload", upload.single("file"), mutations_1.uploadFile);
async function startServer() {
    await apolloServer.start();
    app.use("/graphql", body_parser_1.default.json(), (0, express4_1.expressMiddleware)(apolloServer));
    const io = new socket_io_1.Server(httpServer, {
        cors: { origin: "*", methods: ["GET", "POST"] },
    });
    io.on("connection", (socket) => {
        console.log("✅ User connected:", socket.id);
        socket.on("join_room", (roomId) => {
            socket.join(roomId);
            console.log(`🚪 User ${socket.id} joined room ${roomId}`);
        });
        socket.on("chatMessage", async (msg) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            socket.to(msg.room).emit("chatMessage", {
                content: msg.content,
                received: msg.received,
            });
            const chatResp = await assistant.chat({
                messages: [{ role: "user", content: msg.content }],
                model: "gpt-4o",
            });
            socket.emit("chatMessage", {
                content: (_a = chatResp.message) === null || _a === void 0 ? void 0 : _a.content,
                room: 1,
                received: true,
                userId: 1,
            });
            const user = await prismaClient_1.default.user.findUnique({
                where: {
                    id: msg.userId,
                },
            });
            if ((user === null || user === void 0 ? void 0 : user.role) === "EMPLOYEE") {
                await prismaClient_1.default.message.create({
                    data: {
                        userId: msg.userId,
                        content: msg.content,
                        received: msg.received,
                    },
                });
                await prismaClient_1.default.message.create({
                    data: {
                        userId: msg.userId,
                        content: ((_b = chatResp.message) === null || _b === void 0 ? void 0 : _b.content) || "",
                        received: true,
                        answered: ((_d = (_c = chatResp.message) === null || _c === void 0 ? void 0 : _c.content) === null || _d === void 0 ? void 0 : _d.includes("clarify")) ||
                            ((_f = (_e = chatResp.message) === null || _e === void 0 ? void 0 : _e.content) === null || _f === void 0 ? void 0 : _f.includes("олдсонгүй")) ||
                            ((_h = (_g = chatResp.message) === null || _g === void 0 ? void 0 : _g.content) === null || _h === void 0 ? void 0 : _h.includes("Уучлаарай")) ||
                            ((_k = (_j = chatResp.message) === null || _j === void 0 ? void 0 : _j.content) === null || _k === void 0 ? void 0 : _k.includes("уучлаарай"))
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
