// import { NextResponse } from "next/server";
// import { Server } from "socket.io";

// export async function GET(req, res) {
//   if (NextResponse?.server?.socket?.io) {
//     console.log("Server already connected");
//   } else {
//     console.log("Initializing server connection");
//     const io = new Server(NextResponse.server?.socket?.io, {
//       cors: {
//         origin: "http://localhost:3000",
//         methods: ["GET", "POST"],
//       },
//     });
//     if (NextResponse) {
//       NextResponse.server = NextResponse.server || {};
//       NextResponse.server.socket = NextResponse.server.socket || {};
//       NextResponse.server.socket.io = io;
//     }

//     io.on("connection", (socket) => {
//       console.log("Server is connected");

//       socket.on("disconnect", () => {
//         console.log("User disconnected");
//       });
//     });
//   }
//   return NextResponse.json({ message: "Socket server connected" });
// }
