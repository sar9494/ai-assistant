import prisma from "../../../../prismaClient";
import { Request, Response } from "express";

export const getConversations = async (req: Request, res: Response) => {
  const { id } = req.query;
  try {
    if (!id || isNaN(Number(id))) {
      throw new Error("Хэрэглэгчийн ID буруу байна.");
    }

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        messages: true,
      },
    });
    res.json({ success: true, data: conversation });
  } catch (error) {
    throw new Error("Серверийн алдаа.");
  }
};
