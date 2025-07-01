import prisma from "../../../../prismaClient";
import { Request, Response } from "express";

export const deleteMessage = async (req: Request, res: Response) => {
  const { input } = req.body;

  const { id } = input;

  try {
    if (!id) {
      throw new Error("Message id required");
    }
    await prisma.message.delete({
      where: { id: Number(id) },
    });
    res.json({ success: true, message: "Message deleted successfully" });
  } catch (error) {
    throw new Error("Failed to delete message");
  }
};
