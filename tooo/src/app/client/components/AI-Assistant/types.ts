
export type Message = {
  id: string;
  content: string;
  timestamp: string;
  received: boolean;
  avatar?: string;
  name?: string;
};