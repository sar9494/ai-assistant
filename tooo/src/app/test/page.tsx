"use client";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ChevronLeft, Send } from "lucide-react";
// import { toast } from "sonner";

let socket: Socket;
export default function Home() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { received: boolean; content: string }[]
  >([]);
  const router = useRouter();
  const [file, setFile] = useState<File | undefined>();
  const [name, setName] = useState("");

  const sendMessage = () => {
    if (message !== "") {
      socket.emit("chatMessage", {
        content: message,
        room: 1,
        received: false,
        userId: 1,
      });
      console.log("sending", message);

      setMessages((prev) => [...prev, { received: false, content: message }]);
      setMessage("");
    }
  };

  const handleSubmit = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("type", "HR");

    const res = await fetch(
      "https://ai-assistant-1-1y2o.onrender.com/api/upload",
      // "http://localhost:4000/api/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    console.log(data);
  };

  useEffect(() => {
    console.log(file);
  }, [file]);

  useEffect(() => {
    setMessages([]);

    socket = io("https://ai-assistant-1-1y2o.onrender.com    ", {
      transports: ["websocket"],
    });
    socket.on("connect", () => {
      console.log("✅ Connected to socket:", socket.id);
    });
    socket.on("connect_error", (err) => {
      console.error("❌ Socket connection error:", err.message);
    });
    socket.on("chatMessage", (msg: { content: string; received: boolean }) => {
      console.log("Received message:", msg);
      setMessages((prev) => [
        ...prev,
        { received: true, content: msg.content },
      ]);
    });
    socket.emit("join_room", 1);

    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <div className="h-full ">
      <Button
        className="sticky top-0 left-0 rounded-full mb-2 p-5 bg-[#03346E]"
        onClick={() => router.push("/chat")}
      >
        <ChevronLeft />
      </Button>
      <div className="p-10 ">
        {messages.map((message, index) => {
          return (
            <p key={index} className="p-2 bg-yellow-200">
              {message.content}
            </p>
          );
        })}
      </div>
      <input
        type="text"
        name="name"
        onChange={(e) => setName(e.target.value)}
        className="border border-gray-400"
      />
      <input
        type="file"
        name="file"
        accept=".docx"
        onChange={(e) => setFile(e.target.files?.[0] || undefined)}
      />
      <button onClick={handleSubmit} className="bg-[#03346E] rounded-full p-2">
        <Send color="white" />
      </button>

      <div className="fixed bottom-0 flex w-full p-5 gap-2 items-center">
        <input
          value={message}
          type="text"
          onChange={(e) => setMessage(e.target.value)}
          className="border w-[82%] rounded-md bg-white p-1"
        />
        <button onClick={sendMessage} className="bg-[#03346E] rounded-full p-2">
          <Send color="white" />
        </button>
      </div>
    </div>
  );
}
