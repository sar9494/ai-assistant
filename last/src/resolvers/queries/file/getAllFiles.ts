import prisma from "../../../../prismaClient";
import { Request, Response } from "express";

export const files = async (req: Request, res: Response) => {
  try {
    const files = await prisma.file.findMany();
    res.json({ success: true, files: files });
  } catch (error) {
    throw new Error("Internet server error");
  }
};
