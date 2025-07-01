import prisma from "../../../../prismaClient";
import { Request, Response } from "express";

export const createConversation = async (req: Request, res: Response) => {
  const { userId } = req.body;

  try {
    const userExists = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });

    if (!userExists) {
      throw new Error(`User does not exist`);
    }

    const newConversation = await prisma.conversation.create({
      data: {
        title: "Шинэ чат",
        userId: Number(userId),
      },
    });

    res.json({
      success: true,
      message: "Conversation created successfully",
      conversation: newConversation,
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create conversation with messages");
  }
};
