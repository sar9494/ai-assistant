import { assistant } from "../../../../connectPinecone";
import prisma from "../../../../prismaClient";
import { Request, Response } from "express";

export const deleteFile = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.body;
  try {
    if (!id) {
      throw new Error("File id is required");
    }

    const file = await prisma.file.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!file) {
      throw new Error("File not found");
    }

    await assistant.deleteFile(file.fileId);

    await prisma.file.delete({
      where: {
        id: Number(id),
      },
    });
    res.json({ success: true, message: "File deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting file:", error);
    throw new Error("Internal server error while deleting file");
  }
};
