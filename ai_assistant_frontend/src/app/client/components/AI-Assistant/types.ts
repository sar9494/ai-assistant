
export type Sender = "user" | "ai";

export type Message = {
  id: string;
  sender: Sender;
  timestamp: string;
  content: string;
}
