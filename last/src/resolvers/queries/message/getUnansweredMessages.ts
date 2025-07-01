import prisma from "../../../../prismaClient";
import { Request, Response } from "express";

export const unansweredMessages = async (req: Request, res: Response) => {
  try {
    const messages = await prisma.message.findMany({
      where: { received: false, answered: false },
    });

    res.json({ success: true, messages: messages });
  } catch (error) {
    throw new Error("Internet server error");
  }
};
