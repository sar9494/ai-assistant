export type User = {
  id: number;
  email: string;
  password: string;
  createdAt: string;
  role: UserRole;
  conversation: Conversation[];
  Message: Message[];
};

export type Conversation = {
  id: number;
  title?: string | null;
  createdAt: string;
  userId: number;
  messages: Message[];
};

export type Message = {
  id: number;
  content: string;
  userId: number;
  user?: User;
  received: boolean;
  answered: boolean;
  createdAt: string;
  conversationId: number;
  Conversation?: Conversation;
};

export type File = {
  id: number;
  name: string;
  fileId: string;
  type: FileType;
  url: string;
  createdAt: string;
};
export type UserRole = "ADMIN" | "EMPLOYEE";
export type FileType = "CALENDAR" | "HR" | "COMPANY" | "TOOL" | "EMPLOYEE";
