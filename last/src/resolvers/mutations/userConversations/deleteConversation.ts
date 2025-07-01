import prisma from "../../../../prismaClient";
import { Request, Response } from "express";

export const deleteConversation = async (req: Request, res: Response) => {
  const { input } = req.body;
  const { id } = input;

  try {
    if (!id) {
      throw new Error("Conversation id required");
    }
    await prisma.conversation.delete({
      where: { id: Number(id) },
    });
    res.json({
      success: true,
      message: "Conversation deleted successfully",
    });
  } catch (error) {
    throw new Error("Failed to delete message");
  }
};
