import { Request, Response } from "express";
import mammoth from "mammoth";
import fs from "fs/promises";
import { assistant } from "../../../../connectPinecone";
import prisma from "../../../../prismaClient";

export const uploadFile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.file || !req.file.path) {
      res.status(400).json({ error: "Missing file path" });
      return;
    }
    const name = req.body.name;
    const type = req.body.type;

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
      res.status(400).json({ error: "File not found" });
      return;
    }
    console.log(newFile);

    await prisma.file.create({
      data: {
        fileId: newFile[0].id,
        name,
        url: txtPath,
        type,
      },
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Upload failed" });
  }
};
