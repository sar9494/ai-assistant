import prisma from "../../../../prismaClient";
import { Request, Response } from "express";
type CreateMessageInput = {
  input: {
    content: string;
    received: boolean;
    conversationId: string | number;
    userId: string;
  };
};

export const createMessage = async (req: Request, res: Response) => {
  const { input } = req.body;
  const { content, received, conversationId, userId } = input;

  if (!content || typeof received !== "boolean" || !conversationId) {
    throw new Error("Invalid input data");
  }

  const newMessage = await prisma.message.create({
    data: {
      userId: Number(userId),
      conversationId: Number(conversationId),
      content,
      received,
    },
  });

  res.json({ success: true, message: newMessage });
};
