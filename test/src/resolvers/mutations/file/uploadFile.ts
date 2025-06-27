import prisma from "../../../context";
import { Request, Response } from "express";
import mammoth from "mammoth";
import fs from "fs/promises";
import { pinecone } from "../../../connectPinecone";

const assistant = pinecone.Assistant("ai-assistant");

export const uploadFile = async (req: Request, res: Response) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ error: "Missing file path" });
    }
    const name = req.body.name;
    const filePath = req.file.path;

    const result = await mammoth.extractRawText({ path: filePath });

    const text = result.value;

    const txtPath = `uploads/${name}.txt`;
    await fs.writeFile(txtPath, text, "utf-8");

    await assistant.uploadFile({
      path: txtPath,
      metadata: { uploadedBy: "admin" },
    });
    const files = await assistant.listFiles();
    const newFile = files.files?.filter((file) =>
      file.name.includes(txtPath.split("/")[1])
    );
    if (!newFile) {
      return res.status(400).json({ error: "File not found" });
    }

    await prisma.file.create({
      data: {
        fileId: newFile[0].id,
        name,
        url: txtPath,
      },
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);

    res.status(500).json({ error: "Upload failed" });
  }
};
