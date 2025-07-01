import { Response, Request } from "express";
import prisma from "../../../../prismaClient";

export const getByType = async (req: Request, res: Response) => {
  const { type } = req.body;
  try {
    const files = await prisma.file.findMany({
      where: type,
    });
    res.json({ success: true, files: files });
  } catch (error) {
    throw new Error("Error when get by type");
  }
};
