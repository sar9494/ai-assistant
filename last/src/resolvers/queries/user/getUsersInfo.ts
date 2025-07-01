import prisma from "../../../../prismaClient";
import { Request, Response } from "express";

export const userInformation = async (req: Request, res: Response) => {
  const { input } = req.body;
  const { userId } = input;
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
      include: { conversation: true },
    });

    res.json({ success: true, user: user });
  } catch (error) {
    throw new Error("Internet server error");
  }
};
