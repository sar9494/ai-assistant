import prisma from "../../../../prismaClient";
import { Request, Response } from "express";

export const getConversations = async (req: Request, res: Response) => {
  const { input } = req.body;
  try {
    const { userId } = input;

    if (!userId || isNaN(Number(userId))) {
      throw new Error("Хэрэглэгчийн ID буруу байна.");
    }

    const userConversations = await prisma.conversation.findMany({
      where: {
        userId: Number(userId),
      },
      include: {
        user: true,
        messages: true,
      },
    });
    res.json({ success: true, message: "File deleted successfully" });
  } catch (error) {
    throw new Error("Серверийн алдаа.");
  }
};
