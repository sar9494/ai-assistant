"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ChevronLeft, Send } from "lucide-react";

let socket: Socket;
export default function PetCardId() {
  const { id, userId } = useParams();
  const [message, setMessage] = useState("");
  const [clicked, setClicked] = useState(false);
  const [messages, setMessages] = useState<
    { received: boolean; content: string }[]
  >([]);
  const router = useRouter();

  const sendMessage = () => {
    if (message !== "") {
      const data = {
        content: message,
        received: true,
        room: id,
      };
      socket.emit("chatMessage", data);
    }
    setMessages((prevMessages) => [
      ...prevMessages,
      { received: true, content: message },
    ]);
    setMessage("");
  };

  useEffect(() => {

    setMessages([]);

    socket = io(`${process.env.NEXT_PUBLIC_BASE_URL}`); 

    socket.on("chatMessage", (msg: { content: string; received: boolean }) => {
      console.log(msg);

      if (msg.received) {

        setMessages((prevMessages) => [
          ...prevMessages,
          {
            received: false,
            content: msg.content,
          },
        ]);
      }
    });
    socket.emit("join_room", id);

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
        {
            messages.map((message,index)=>{
                return <p key={index} className="p-2 bg-yellow-200">{message.content}</p>
            })
        }
      </div>
     
      <div
        className="fixed bottom-0 flex w-full p-5 gap-2 items-center"
        onClick={() => setClicked(true)}
      >
        <input
          value={message}
          type="text"
          onChange={(e) => setMessage(e.target.value)}
          className="border w-[82%] rounded-md bg-white p-1"
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />
        <button onClick={sendMessage} className="bg-[#03346E] rounded-full p-2">
          <Send color="white" />
        </button>
      </div>
    </div>
  );
}