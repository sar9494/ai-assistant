import prisma from "../../../../prismaClient";
import { Request, Response } from "express";

export const userInformation = async (req: Request, res: Response) => {
  const { id } = req.query as { id: string };
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      include: { conversation: true },
    });

    res.json({ success: true, user: user });
  } catch (error) {
    throw new Error("Internet server error");
  }
};
