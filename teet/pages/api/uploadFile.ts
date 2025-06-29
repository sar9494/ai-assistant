// pages/api/upload.ts
import multer from 'multer';
import { createRouter } from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import mammoth from 'mammoth';
import fs from 'fs/promises';
// Import your prisma and assistant instances
// import { prisma } from '../../lib/prisma'; // Adjust path as needed
// import { assistant } from '../../lib/assistant'; // Adjust path as needed

// Extend NextApiRequest to include the file property from multer
interface ExtendedNextApiRequest extends NextApiRequest {
  file?: {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    destination: string;
    filename: string;
    path: string;
    buffer: Buffer;
  };
}

// Set up multer storage
const upload = multer({ dest: 'uploads/' });

const router = createRouter<ExtendedNextApiRequest, NextApiResponse>();

// Apply multer middleware
router.use(upload.single('file'));

router.post(async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  try {
    // Check if file exists
    if (!req.file || !req.file.path) {
      return res.status(400).json({ error: "Missing file path" });
    }

    const name = req.body.name;
    const filePath = req.file.path;

    // Extract text from the uploaded document
    const result = await mammoth.extractRawText({ path: filePath });
    const text = result.value;

    // Save extracted text to a new file
    const txtPath = `uploads/${name}.txt`;
    await fs.writeFile(txtPath, text, "utf-8");

    // Upload to assistant (uncomment and adjust as needed)
    /*
    await assistant.uploadFile({
      path: txtPath,
      metadata: { uploadedBy: "admin" },
    });

    const files = await assistant.listFiles();
    const newFile = files.files?.filter((file) =>
      file.name.includes(txtPath.split("/")[1])
    );

    if (!newFile || newFile.length === 0) {
      return res.status(400).json({ error: "File not found" });
    }

    // Save to database
    await prisma.file.create({
      data: {
        fileId: newFile[0].id,
        name,
        url: txtPath,
      },
    });
    */

    res.status(200).json({ 
      success: true, 
      message: "File uploaded and processed successfully",
      textPath: txtPath 
    });

  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: "Upload failed" });
  }
});

// Handle other methods
router.all((req, res) => {
  res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
});

export default router.handler({
  onError: (err: any, req: ExtendedNextApiRequest, res: NextApiResponse) => {
    console.error(err.stack);
    res.status(500).json({ error: `Something went wrong: ${err.message}` });
  },
  onNoMatch: (req: ExtendedNextApiRequest, res: NextApiResponse) => {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

// Important: Disable Next.js body parsing for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};