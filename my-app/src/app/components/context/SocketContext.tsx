// contexts/SocketContext.tsx
"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  joinRoom: (roomId: number) => void;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  joinRoom: () => {},
});

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

interface SocketProviderProps {
  children: React.ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    const initSocket = () => {
      if (socketRef.current?.connected) {
        return; // Already connected
      }

      const socketUrl =
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:4000";

      console.log("🔄 Connecting to:", socketUrl);

      const socket = io(socketUrl, {
        path: "/api/socket",
        transports: ["websocket", "polling"],
        reconnection: true,
        autoConnect: true,
        withCredentials: true,
      });

      socketRef.current = socket;

      socket.on("connect", () => {
        if (!mountedRef.current) return;
        console.log("✅ Socket-д холбогдлоо:", socket.id);
        setIsConnected(true);
      });

      socket.on("disconnect", (reason) => {
        if (!mountedRef.current) return;
        console.log("❌ Socket салгалаа:", reason);
        setIsConnected(false);
      });

      socket.on("connect_error", (err) => {
        if (!mountedRef.current) return;
        console.error("❌ Socket холболтын алдаа:", err.message);
        setIsConnected(false);
      });

      socket.on("reconnect", () => {
        if (!mountedRef.current) return;
        console.log("🔄 Socket дахин холбогдлоо");
        setIsConnected(true);
      });
    };

    // Delay initialization to avoid StrictMode conflicts
    const timer = setTimeout(initSocket, 100);

    return () => {
      clearTimeout(timer);
      mountedRef.current = false;

      if (socketRef.current) {
        console.log("🧹 Socket холболтыг цэвэрлэж байна");
        socketRef.current.removeAllListeners();
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      setIsConnected(false);
    };
  }, []);

  const joinRoom = (roomId: number) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit("join_room", roomId);
      console.log(`🚪 ${roomId} өрөөнд орлоо`);
    }
  };

  const value: SocketContextType = {
    socket: socketRef.current,
    isConnected,
    joinRoom,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
