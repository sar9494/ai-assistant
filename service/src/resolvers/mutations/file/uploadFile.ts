import prisma from "../../../prismaClient";
import { Request, Response } from "express";
import { pinecone } from "../../../connectPinecone";
import mammoth from "mammoth";
import fs from "fs/promises";

const assistant = pinecone.Assistant("ai-assistant");

export const uploadFile = async (req: Request, res: Response) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ error: "Missing file path" });
    }

    const filePath = req.file.path;

    const result = await mammoth.extractRawText({ path: filePath });

    const text = result.value;

    const txtPath = `uploads/${Date.now()}-extracted.txt`;
    await fs.writeFile(txtPath, text, "utf-8");

    await assistant.uploadFile({
      path: txtPath,
      metadata: { uploadedBy: "admin" },
    });

    res.status(200).json({ success: true, text });
  } catch (error) {
    throw new Error("Internal server error : delete file");
  }
};
