import prisma from "../../../../prismaClient";
import { Request, Response } from "express";

export const createConversation = async (req: Request, res: Response) => {
  const { input } = req.body;
  const { userId, messages } = input;

  try {
    const userExists = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });

    if (!userExists) {
      throw new Error(`User does not exist`);
    }

    const finalTitle = messages[0].content.slice(0, 30);

    await prisma.conversation.create({
      data: {
        title: finalTitle,
        userId: Number(userId),
        messages: {
          create: messages.map(
            (msg: {
              content: string;
              received: boolean;
              answered?: boolean;
            }) => ({
              content: msg.content,
              received: msg.received,
              answered: msg.answered ?? false,
            })
          ),
        },
      },
    });

    res.json({ success: true, message: "Conversation created successfully" });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create conversation with messages");
  }
};
