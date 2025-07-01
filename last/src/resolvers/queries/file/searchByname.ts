import prisma from "../../../../prismaClient";
import { Response, Request } from "express";

export const searchByName = async (req: Request, res: Response) => {
  const { input } = req.body;
  try {
    const { name } = input;
    console.log(name);

    const searchedFiles = await prisma.file.findMany({
      where: name
        ? {
            name: {
              contains: name,
              mode: "insensitive",
            },
          }
        : {},
    });

    res.json({ success: true, files: searchedFiles });
  } catch (error) {
    console.error("Search error:", error);
    throw new Error("Серверийн алдаа.");
  }
};
