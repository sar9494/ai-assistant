import { Server } from "socket.io";
import { NextApiRequest, NextApiResponse } from "next";
import { assistant } from "../../connectPinecone";
import prisma from "../../prismaClient";

// Мессежийн интерфэйс
interface ChatMessage {
  content: string;
  room: string | number;
  received: boolean;
  userId: number;
}

// Socket.io-тай extended response type
type NextApiResponseWithSocket = NextApiResponse & {
  socket: {
    server: any & {
      io?: Server;
    };
  };
};

const SocketHandler = (req: NextApiRequest, res: NextApiResponseWithSocket) => {
  // Socket сервер аль хэдийн ажиллаж байгаа эсэхийг шалгах
  if (res.socket.server.io) {
    console.log("Socket аль хэдийн ажиллаж байна");
    res.end();
    return;
  }

  console.log("Socket эхлүүлж байна");

  // Socket.IO серверийг үүсгэх
  const io = new Server(res.socket.server, {
    path: "/api/socket",
    cors: {
      origin: ["https://ai-frontend-ruby.vercel.app", "http://localhost:3000"],
      methods: ["GET", "POST"],
      credentials: true,
    },
    transports: ["websocket", "polling"], // Transport аргуудыг тодорхойлох
  });

  res.socket.server.io = io;

  // Socket холболтын event listener-үүд
  io.on("connection", (socket) => {
    console.log("✅ Хэрэглэгч холбогдлоо:", socket.id);

    // Өрөөнд орох
    socket.on("join_room", (roomId: string) => {
      socket.join(roomId);
      console.log(`🚪 Хэрэглэгч ${socket.id} ${roomId} өрөөнд орлоо`);
    });

    // Чат мессеж боловсруулах
    socket.on("chatMessage", async (msg: ChatMessage) => {
      try {
        console.log("💬 Мессеж хүлээн авлаа:", msg);

        // Бусад хэрэглэгчдэд мессеж илгээх
        socket.to(msg.room.toString()).emit("chatMessage", {
          content: msg.content,
          received: msg.received,
          userId: msg.userId,
          room: msg.room,
          timestamp: new Date().toISOString(),
        });

        // AI хариулт авах
        const chatResp = await assistant.chat({
          messages: [{ role: "user", content: msg.content }],
          model: "gpt-4o",
        });

        const aiResponse =
          chatResp.message?.content || "Уучлаарай, хариулт олдсонгүй.";

        // AI хариултыг илгээгчид буцааж илгээх
        socket.emit("chatMessage", {
          content: aiResponse,
          room: msg.room,
          received: true,
          userId: 1, // AI-ийн ID
          timestamp: new Date().toISOString(),
          isAI: true,
        });

        // Өгөгдлийн сан руу хадгалах (зөвхөн ажилтнууд)
        const user = await prisma.user.findUnique({
          where: { id: msg.userId },
        });

        if (user?.role === "EMPLOYEE") {
          try {
            // Хэрэглэгчийн мессежийг хадгалах
            await prisma.message.create({
              data: {
                conversationId: msg.userId,
                content: msg.content,
                received: msg.received,
              },
            });

            // AI хариултыг хадгалах
            await prisma.message.create({
              data: {
                conversationId: msg.userId,
                content: aiResponse,
                received: true,
                answered: !aiResponse.match(
                  /clarify|олдсонгүй|уучлаарай|Уучлаарай|тодруулах/i
                ),
              },
            });

            console.log("💾 Мессежүүд амжилттай хадгалагдлаа");
          } catch (dbError) {
            console.error("❌ Өгөгдлийн сангийн алдаа:", dbError);
          }
        }
      } catch (error) {
        console.error("❌ Чат мессеж боловсруулахад алдаа гарлаа:", error);

        // Алдааны мессежийг клиент рүү илгээх
        socket.emit("chatMessage", {
          content: "Уучлаарай, таны мессежийг боловсруулахад алдаа гарлаа.",
          room: msg.room,
          received: true,
          userId: 1,
          error: true,
          timestamp: new Date().toISOString(),
        });
      }
    });

    // Холболт тасрах
    socket.on("disconnect", (reason) => {
      console.log("❌ Хэрэглэгч салгалаа:", socket.id, "Шалтгаан:", reason);
    });

    // Алдаа боловсруулах
    socket.on("error", (error) => {
      console.error("❌ Socket алдаа:", error);
    });
  });

  console.log("✅ Socket сервер амжилттай эхэллээ");
  res.end();
};

export default SocketHandler;
